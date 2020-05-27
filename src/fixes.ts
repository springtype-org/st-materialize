import {globalThis} from "springtype/core";
import {matGetConfig, WINDOW_MAT_CONFIG_KEY} from "./config";

const MAT_FIXES = 'fixes';

//load configuration
matGetConfig() ;

if (!globalThis[WINDOW_MAT_CONFIG_KEY][MAT_FIXES]) {
    const fixViewPortHeight = () => {
        // vh fix for mobile browsers
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
    fixViewPortHeight();
    globalThis[WINDOW_MAT_CONFIG_KEY][MAT_FIXES] = {viewport: fixViewPortHeight};
    window.addEventListener('resize', fixViewPortHeight);
}
