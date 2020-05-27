import {globalThis} from "springtype/core";
export const WINDOW_MAT_CONFIG_KEY = '$mat';

export interface MatConfig {
    setValidClass: boolean;
}

export const matDefaultConfig: MatConfig = {
    setValidClass: false,
};

globalThis[WINDOW_MAT_CONFIG_KEY] = matDefaultConfig;

export const matSetConfig = (config: MatConfig = matDefaultConfig) => {
    globalThis[WINDOW_MAT_CONFIG_KEY] = config;
};

export const matGetConfig = (): MatConfig => {
    return globalThis[WINDOW_MAT_CONFIG_KEY]
};




