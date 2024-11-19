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
import classNames from "classnames";
import {LlmState} from "../../../../electron/state/llmState.ts";
import {MarkdownContent} from "../MarkdownContent/MarkdownContent.js";
import {MessageCopyButton} from "./components/MessageCopyButton/MessageCopyButton.js";

import "./ChatHistory.css";


export function ChatHistory({simplifiedChat, generatingResult}: ChatHistoryProps) {
    return <div className="appChatHistory">
        {
            simplifiedChat.map((item, index) => {
                if (item.type === "model") {
                    const isActive = index === simplifiedChat.length - 1 && generatingResult;
                    return <>
                        <MarkdownContent key={index} className={classNames("message", "model", isActive && "active")}>
                            {item.message}
                        </MarkdownContent>
                        {
                            !isActive && <div className="buttons">
                                <MessageCopyButton text={item.message} />
                            </div>
                        }
                    </>;

                } else if (item.type === "user")
                    return <MarkdownContent key={index} className="message user">
                        {item.message}
                    </MarkdownContent>;

                return null;
            })
        }
        {
            (
                simplifiedChat.length > 0 &&
                simplifiedChat[simplifiedChat.length - 1]!.type !== "model" &&
                generatingResult
            ) &&
            <div className="message model active"/>
        }
    </div>;
}

type ChatHistoryProps = {
    simplifiedChat: LlmState["chatSession"]["simplifiedChat"],
    generatingResult: boolean
};
