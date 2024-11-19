/*
 * SPDX-FileCopyrightText: Copyright (c) 2024 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import path from "node:path";
import {
    getLlama, Llama, LlamaChatSession, LlamaChatSessionPromptCompletionEngine, LlamaContext, LlamaContextSequence, LlamaEmbedding, LlamaEmbeddingContext, LlamaModel
} from "node-llama-cpp";
import {withLock, State} from "lifecycle-utils";
import {functions} from "./functions.ts"
import packageJson from "../../package.json";

const customSystemPrompt = "You are a helpful AI assistant named Claudia. You have access to some tools which you can use if you need to. If you do not know the answer even after using the tools, do not make up an answer. You may instead ask any clarifying questions"
export const llmState = new State<LlmState>({
    appVersion: packageJson.version,
    llama: {
        loaded: false
    },
    model: {
        loaded: false
    },
    context: {
        loaded: false
    },
    embeddingContext: {
        loaded: false
    },
    knowledgeBase: {
        ingested: false
    },
    contextSequence: {
        loaded: false
    },
    chatSession: {
        loaded: false,
        generatingResult: false,
        simplifiedChat: [],
        draftPrompt: {
            prompt: "",
            completion: ""
        }
    }
});

export type LlmState = {
    appVersion?: string,
    llama: {
        loaded: boolean,
        error?: string
    },
    selectedModelFilePath?: string,
    model: {
        loaded: boolean,
        loadProgress?: number,
        name?: string,
        error?: string
    },
    context: {
        loaded: boolean,
        error?: string
    },
    embeddingContext: {
        loaded: boolean,
        error?: string,

    },
    knowledgeBase: {
        ingested: boolean,
        pathName?: string,
        error?: string
    },
    contextSequence: {
        loaded: boolean,
        error?: string
    },
    chatSession: {
        loaded: boolean,
        generatingResult: boolean,
        simplifiedChat: SimplifiedChatItem[],
        draftPrompt: {
            prompt: string,
            completion: string
        }
    }
};

type SimplifiedChatItem = {
    type: "user" | "model",
    message: string
};

let llama: Llama | null = null;
let model: LlamaModel | null = null;
let context: LlamaContext | null = null;
let contextSequence: LlamaContextSequence | null = null;
let embeddingContext : LlamaEmbeddingContext | null = null;
let chatSession: LlamaChatSession | null = null;
let chatSessionCompletionEngine: LlamaChatSessionPromptCompletionEngine | null = null;
let promptAbortController: AbortController | null = null;
let inProgressResponse: string = "";

export const llmFunctions = {
    async loadLlama() {
        await withLock(llmFunctions, "llama", async () => {
            if (llama != null) {
                try {
                    await llama.dispose();
                    llama = null;
                } catch (err) {
                    console.error("Failed to dispose llama", err);
                }
            }

            try {
                llmState.state = {
                    ...llmState.state,
                    llama: {loaded: false}
                };

                llama = await getLlama();
                llmState.state = {
                    ...llmState.state,
                    llama: {loaded: true}
                };

                llama.onDispose.createListener(() => {
                    llmState.state = {
                        ...llmState.state,
                        llama: {loaded: false}
                    };
                });
            } catch (err) {
                console.error("Failed to load llama", err);
                llmState.state = {
                    ...llmState.state,
                    llama: {
                        loaded: false,
                        error: String(err)
                    }
                };
            }
        });
    },
    async loadModel(modelPath: string) {
        await withLock(llmFunctions, "model", async () => {
            if (llama == null)
                throw new Error("Llama not loaded");

            if (model != null) {
                try {
                    await model.dispose();
                    model = null;
                } catch (err) {
                    console.error("Failed to dispose model", err);
                }
            }

            try {
                llmState.state = {
                    ...llmState.state,
                    model: {
                        loaded: false,
                        loadProgress: 0
                    }
                };

                model = await llama.loadModel({
                    modelPath,
                    onLoadProgress(loadProgress: number) {
                        llmState.state = {
                            ...llmState.state,
                            model: {
                                ...llmState.state.model,
                                loadProgress
                            }
                        };
                    }
                });
                llmState.state = {
                    ...llmState.state,
                    model: {
                        loaded: true,
                        loadProgress: 1,
                        name: path.basename(modelPath)
                    }
                };

                model.onDispose.createListener(() => {
                    llmState.state = {
                        ...llmState.state,
                        model: {loaded: false}
                    };
                });
            } catch (err) {
                console.error("Failed to load model", err);
                llmState.state = {
                    ...llmState.state,
                    model: {
                        loaded: false,
                        error: String(err)
                    }
                };
            }
        });
    },
    async createContext() {
        await withLock(llmFunctions, "context", async () => {
            if (model == null)
                throw new Error("Model not loaded");

            if (context != null) {
                try {
                    await context.dispose();
                    context = null;
                } catch (err) {
                    console.error("Failed to dispose context", err);
                }
            }

            try {
                llmState.state = {
                    ...llmState.state,
                    context: {loaded: false}
                };

                context = await model.createContext();
                llmState.state = {
                    ...llmState.state,
                    context: {loaded: true}
                };

                context.onDispose.createListener(() => {
                    llmState.state = {
                        ...llmState.state,
                        context: {loaded: false}
                    };
                });
            } catch (err) {
                console.error("Failed to create context", err);
                llmState.state = {
                    ...llmState.state,
                    context: {
                        loaded: false,
                        error: String(err)
                    }
                };
            }
        });
    },
    async createContextSequence() {
        await withLock(llmFunctions, "contextSequence", async () => {
            if (context == null)
                throw new Error("Context not loaded");

            try {
                llmState.state = {
                    ...llmState.state,
                    contextSequence: {loaded: false}
                };

                contextSequence = context.getSequence();
                llmState.state = {
                    ...llmState.state,
                    contextSequence: {loaded: true}
                };

                contextSequence.onDispose.createListener(() => {
                    llmState.state = {
                        ...llmState.state,
                        contextSequence: {loaded: false}
                    };
                });
            } catch (err) {
                console.error("Failed to get context sequence", err);
                llmState.state = {
                    ...llmState.state,
                    contextSequence: {
                        loaded: false,
                        error: String(err)
                    }
                };
            }
        });
    },
    async createEmbeddingContext() {
        await withLock(llmFunctions, "embeddingContext", async () => {
            if (model == null)
                throw new Error("Model not loaded");

            if (embeddingContext != null) {
                try {
                    await embeddingContext.dispose();
                    embeddingContext = null;
                } catch (err) {
                    console.error("Failed to dispose context", err);
                }
            }

            try {
                llmState.state = {
                    ...llmState.state,
                    embeddingContext: {loaded: false}
                };

                embeddingContext = await model.createEmbeddingContext();
                llmState.state = {
                    ...llmState.state,
                    embeddingContext: {loaded: true}
                };

                embeddingContext.onDispose.createListener(() => {
                    llmState.state = {
                        ...llmState.state,
                        embeddingContext: {loaded: false}
                    };
                });
            } catch (err) {
                console.error("Failed to create embedding context", err);
                llmState.state = {
                    ...llmState.state,
                    embeddingContext: {
                        loaded: false,
                        error: String(err)
                    }
                };
            }
        });
    },
    chatSession: {
        async createChatSession() {
            await withLock(llmFunctions, "chatSession", async () => {
                if (contextSequence == null)
                    throw new Error("Context sequence not loaded");

                if (chatSession != null) {
                    try {
                        chatSession.dispose();
                        chatSession = null;
                        chatSessionCompletionEngine = null;
                    } catch (err) {
                        console.error("Failed to dispose chat session", err);
                    }
                }

                try {
                    llmState.state = {
                        ...llmState.state,
                        chatSession: {
                            loaded: false,
                            generatingResult: false,
                            simplifiedChat: [],
                            draftPrompt: llmState.state.chatSession.draftPrompt
                        }
                    };

                    llmFunctions.chatSession.resetChatHistory(false);

                    try {
                        await chatSession?.preloadPrompt("", {
                            signal: promptAbortController?.signal
                        });
                    } catch (err) {
                        // do nothing
                    }
                    chatSessionCompletionEngine?.complete(llmState.state.chatSession.draftPrompt.prompt);

                    llmState.state = {
                        ...llmState.state,
                        chatSession: {
                            ...llmState.state.chatSession,
                            loaded: true
                        }
                    };
                } catch (err) {
                    console.error("Failed to create chat session", err);
                    llmState.state = {
                        ...llmState.state,
                        chatSession: {
                            loaded: false,
                            generatingResult: false,
                            simplifiedChat: [],
                            draftPrompt: llmState.state.chatSession.draftPrompt
                        }
                    };
                }
            });
        },
        async prompt(message: string) {
            await withLock(llmFunctions, "chatSession", async () => {
                if (chatSession == null)
                    throw new Error("Chat session not loaded");

                llmState.state = {
                    ...llmState.state,
                    chatSession: {
                        ...llmState.state.chatSession,
                        generatingResult: true,
                        draftPrompt: {
                            prompt: "",
                            completion: ""
                        }
                    }
                };
                promptAbortController = new AbortController();

                llmState.state = {
                    ...llmState.state,
                    chatSession: {
                        ...llmState.state.chatSession,
                        simplifiedChat: getSimplifiedChatHistory(true, message)
                    }
                };
                await chatSession.prompt(message, {
                    signal: promptAbortController.signal,
                    stopOnAbortSignal: true,
                    functions: functions,
                    onTextChunk(chunk) {
                        inProgressResponse += chunk;

                        llmState.state = {
                            ...llmState.state,
                            chatSession: {
                                ...llmState.state.chatSession,
                                simplifiedChat: getSimplifiedChatHistory(true, message)
                            }
                        };
                    }
                });
                llmState.state = {
                    ...llmState.state,
                    chatSession: {
                        ...llmState.state.chatSession,
                        generatingResult: false,
                        simplifiedChat: getSimplifiedChatHistory(false),
                        draftPrompt: {
                            ...llmState.state.chatSession.draftPrompt,
                            completion: chatSessionCompletionEngine?.complete(llmState.state.chatSession.draftPrompt.prompt) ?? ""
                        }
                    }
                };
                inProgressResponse = "";
            });
        },
        stopActivePrompt() {
            promptAbortController?.abort();
        },
        resetChatHistory(markAsLoaded: boolean = true) {
            if (contextSequence == null)
                return;
            chatSession?.dispose();
            chatSession = new LlamaChatSession({
                contextSequence,
                systemPrompt: customSystemPrompt,
                autoDisposeSequence: false,

            });
            chatSessionCompletionEngine = chatSession.createPromptCompletionEngine({
                onGeneration(prompt, completion) {
                    if (llmState.state.chatSession.draftPrompt.prompt === prompt) {
                        llmState.state = {
                            ...llmState.state,
                            chatSession: {
                                ...llmState.state.chatSession,
                                draftPrompt: {
                                    prompt,
                                    completion
                                }
                            }
                        };
                    }
                }
            });

            llmState.state = {
                ...llmState.state,
                chatSession: {
                    loaded: markAsLoaded
                        ? true
                        : llmState.state.chatSession.loaded,
                    generatingResult: false,
                    simplifiedChat: [],
                    draftPrompt: {
                        prompt: llmState.state.chatSession.draftPrompt.prompt,
                        completion: chatSessionCompletionEngine.complete(llmState.state.chatSession.draftPrompt.prompt) ?? ""
                    }
                }
            };

            chatSession.onDispose.createListener(() => {
                llmState.state = {
                    ...llmState.state,
                    chatSession: {
                        loaded: false,
                        generatingResult: false,
                        simplifiedChat: [],
                        draftPrompt: llmState.state.chatSession.draftPrompt
                    }
                };
            });
        },
        setDraftPrompt(prompt: string) {
            if (chatSessionCompletionEngine == null)
                return;

            llmState.state = {
                ...llmState.state,
                chatSession: {
                    ...llmState.state.chatSession,
                    draftPrompt: {
                        prompt: prompt,
                        completion: chatSessionCompletionEngine.complete(prompt) ?? ""
                    }
                }
            };
        }
    },
    embeddingContext: {
        async embedDocuments(documents: readonly string[]) {
            await withLock(llmFunctions, "embeddingContext", async () => {
                if (embeddingContext == null)
                    throw new Error("Embedding context not created");

                const embeddings = new Map<string, LlamaEmbedding>();
                await Promise.all(
                    documents.map(async (document) => {
                        const embedding = await embeddingContext?.getEmbeddingFor(document);
                        if (embedding) {
                            embeddings.set(document, embedding);
                        }
            
                        console.debug(
                            `${embeddings.size}/${documents.length} documents embedded`
                        );
                    })
                );
            
                return embeddings;
            }
        )},  
    }
} as const;

function getSimplifiedChatHistory(generatingResult: boolean, currentPrompt?: string) {
    if (chatSession == null)
        return [];

    const chatHistory: SimplifiedChatItem[] = chatSession.getChatHistory()
        .flatMap((item): SimplifiedChatItem[] => {
            if (item.type === "system")
                return [];
            else if (item.type === "user")
                return [{type: "user", message: item.text}];
            else if (item.type === "model")
                return [{
                    type: "model",
                    message: item.response
                        .filter((value) => typeof value === "string")
                        .join("")
                }];

            void (item satisfies never); // ensure all item types are handled
            return [];
        });

    if (generatingResult && currentPrompt != null) {
        chatHistory.push({
            type: "user",
            message: currentPrompt
        });

        if (inProgressResponse.length > 0)
            chatHistory.push({
                type: "model",
                message: inProgressResponse
            });
    }

    return chatHistory;
}
