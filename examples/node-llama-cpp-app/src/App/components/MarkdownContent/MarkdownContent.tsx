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
import {useLayoutEffect, useRef} from "react";
import markdownit from "markdown-it";
import hljs from "highlight.js";

import "./MarkdownContent.css";

const md = markdownit({
    highlight(str, lang): string {
        if (hljs.getLanguage(lang) != null) {
            try {
                return hljs.highlight(str, {language: lang}).value;
            } catch (err) {
                // do nothing
            }
        }

        return hljs.highlightAuto(str).value;
    }
});

export function MarkdownContent({children, className}: MarkdownContentProps) {
    const divRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (divRef.current == null)
            return;

        divRef.current.innerHTML = md.render(children ?? "");
    }, [children]);

    return <div
        className={className}
        ref={divRef}
    />;
}

type MarkdownContentProps = {
    className?: string,
    children: string
};
