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
import {CSSProperties} from "react";
import classNames from "classnames";
import {LoadFileIconSVG} from "../../../icons/LoadFileIconSVG.tsx";
import {DeleteIconSVG} from "../../../icons/DeleteIconSVG.tsx";
import {DatabaseIconSVG} from "../../../icons/DatabaseIconSVG.tsx";

import "./Header.css";


export function Header({appVersion, canShowCurrentVersion, modelName, onLoadClick, knowledgeBasePath, onUploadClick, loadPercentage, onResetChatClick}: HeaderProps) {
    return <div className="appHeader">
        <div className="panel model">
            <div
                className={classNames("progress", loadPercentage === 1 && "hide")}
                style={{
                    "--progress": loadPercentage != null ? (loadPercentage * 100) : undefined
                } as CSSProperties}
            />

            {
                modelName != null &&
                <div className="modelName">{modelName}</div>
            }
            {
                modelName == null &&
                <div className="noModel">No model loaded</div>
            }

            <button
                className="resetChatButton"
                disabled={onResetChatClick == null}
                onClick={onResetChatClick}
            >
                <DeleteIconSVG className="icon"/>
            </button>
            <button className="loadModelButton" onClick={onLoadClick} disabled={onLoadClick == null}>
                <LoadFileIconSVG className="icon"/>
            </button>
        </div>
        <div className="spacer"/>
        <div className="panel path">
        {
                knowledgeBasePath != null &&
                <div className="pathName">{knowledgeBasePath}</div>
            }
            {
                knowledgeBasePath == null &&
                <div className="noPath">Use Knowledge Base</div>
            }
            <button
                className="resetChatButton"
                disabled={onResetChatClick == null}
                onClick={onResetChatClick}
            >
                <DeleteIconSVG className="icon"/>
            </button>
            <button
                    className="uploadButton"
                    onClick={onUploadClick}
                    disabled={onUploadClick == null}
                >
                    <DatabaseIconSVG className="icon"/>
            </button>
        </div>
        
        {/* <UpdateBadge
            appVersion={appVersion}
            canShowCurrentVersion={canShowCurrentVersion}
        /> */}
    </div>;
}

type HeaderProps = {
    appVersion?: string,
    canShowCurrentVersion?: boolean,
    modelName?: string,
    onLoadClick?(): void,
    knowledgeBasePath?: string,
    onUploadClick?(): void,
    loadPercentage?: number,
    onResetChatClick?(): void
};
