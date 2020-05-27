import {TYPE_STRING} from "springtype/core/lang";

export const resolveRequire = (srcOrModule: string | { default: string }): string => {
    if (typeof srcOrModule === TYPE_STRING) {
        return srcOrModule as string;
    } else {
        return (srcOrModule as any).default
    }
}