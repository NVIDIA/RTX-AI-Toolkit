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
import axios from 'axios';

import { tavily } from '@tavily/core';
import { defineChatSessionFunction } from "node-llama-cpp";

const ACCUWEATHER_API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY;
const TAVILY_API_KEY = import.meta.env.VITE_TAVILY_API_KEY;
const LOCATION_SEARCH_URL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
const CURRENT_CONDITIONS_URL = 'http://dataservice.accuweather.com/currentconditions/v1';

type WeatherResponse = {
    location: string;
    temperature: number;
    description: string;
};

async function getLocationKey(location: string): Promise<string | null> {
    try {
        const response = await axios.get(LOCATION_SEARCH_URL, {
            params: {
                q: location,
                apikey: ACCUWEATHER_API_KEY
            }
        });

        const locations = response.data;
        if (locations.length > 0) {
            return locations[0].Key; // Return the location key of the first matched location
        } else {
            console.error(`Location "${location}" not found.`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching location key:', error);
        return null;
    }
}

export const functions = {
    getCurrentWeather: defineChatSessionFunction({
        description: "Get the current weather in a location",
        params: {
            type: "object",
            properties: {
                name: {
                    type: "string"
                },
            }
        },
        async handler(params) {
            try {
                const locationKey = await getLocationKey(params.name.toLowerCase());
                if (!locationKey) {
                    return `Could not find location key for "${location}".`;
                }
        
                const response = await axios.get(`${CURRENT_CONDITIONS_URL}/${locationKey}`, {
                    params: {
                        apikey: ACCUWEATHER_API_KEY
                    }
                });
        
                const weatherData = response.data[0];
                
                // Extract relevant weather information
                const weather: WeatherResponse = {
                    location: params.name.toLowerCase(),
                    temperature: weatherData.Temperature.Metric.Value,
                    description: weatherData.WeatherText,
                };
        
                return weather;
            } catch (error) {
                console.error('Error fetching weather data:', error);
                return `Could not retrieve weather for "${location}". Please try again.`;
            }
        }
    }),
    search_internet_for_current_events: defineChatSessionFunction({
        description: "Search for current events and more information",
        params: {
            type: "object",
            properties: {
                question: {
                    type: "string"
                },
            }
        },
        async handler(params) {
            try {
                const searchOptions = {
                    search_depth:  "basic",
                    include_images:  false,
                    include_answer: false,
                    max_results: 5,
                  } as any;
                
                const tvly = tavily({ apiKey: TAVILY_API_KEY });

                const context = tvly.searchContext(params.question, searchOptions);
        
                return context;
            } catch (error) {
                console.error('Error fetching more context:', error);
                return `Could not search for more context. Please try again.`;
            }
        }
    }),
};