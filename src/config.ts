import {globalThis} from "springtype/core";
export const WINDOW_MAT_CONFIG_KEY = '$mat';

export interface MatConfig {
    setValidClass: boolean;
    validationDebounceTimeInMs: number;
    validationEventListener: Array<string>;
}

export const matDefaultConfig: MatConfig = {
    setValidClass: false,
    validationDebounceTimeInMs: 250,
    validationEventListener: ['change', 'keyup'],
};

globalThis[WINDOW_MAT_CONFIG_KEY] = matDefaultConfig;

export const matSetConfig = (config: MatConfig = matDefaultConfig) => {
    globalThis[WINDOW_MAT_CONFIG_KEY] = config;
};

export const matGetConfig = (): MatConfig => {
    return globalThis[WINDOW_MAT_CONFIG_KEY]
};




