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
import {ElectronFunctions} from "../../electron/rpc/llmRpc.ts";
import {createRendererSideBirpc} from "../utils/createRendererSideBirpc.ts";
import {llmState} from "../state/llmState.ts";
import {LlmState} from "../../electron/state/llmState.ts";


const renderedFunctions = {
    updateState(state: LlmState) {
        llmState.state = state;
    }
} as const;
export type RenderedFunctions = typeof renderedFunctions;

export const electronLlmRpc = createRendererSideBirpc<ElectronFunctions, RenderedFunctions>("llmRpc", "llmRpc", renderedFunctions);

electronLlmRpc.getState()
    .then((state) => {
        llmState.state = state;
    })
    .catch((error) => {
        console.error("Failed to get the initial state from the main process", error);
    });
