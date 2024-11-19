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
import {useEffect, useState} from "react";
import {State} from "lifecycle-utils";

export function useExternalState<const StateType, const R>(state: State<StateType>, selector: ((state: StateType) => R)): R;
export function useExternalState<const StateType>(state: State<StateType>): StateType;
export function useExternalState<const StateType>(state: State<StateType>, selector?: ((state: StateType) => any) | null): StateType {
    const [currentState, setCurrentState] = useState(() => (
        selector == null
            ? state.state
            : selector(state.state)
    ));

    useEffect(() => {
        return state.createChangeListener((newState) => {
            setCurrentState(
                selector == null
                    ? newState
                    : selector(newState)
            );
        }, true).dispose;
    }, [state]);

    return currentState;
}
