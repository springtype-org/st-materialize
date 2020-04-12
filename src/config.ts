import {st} from "springtype/core";

export interface MatConfig {
    setValidClass: boolean;
    validationDebounceTimeInMs: number;
    validationEventListener: Array<string>;
}

export const matDefaultConfig: MatConfig = {
    setValidClass: false,
    validationDebounceTimeInMs: 250,
    validationEventListener: ['change', 'keyup']};

export const matSetConfig = (config: MatConfig = matDefaultConfig) => {
    (st as any).mat = config;
};

export const matGetConfig = (): MatConfig => {
    return (st as any).mat || matDefaultConfig
};