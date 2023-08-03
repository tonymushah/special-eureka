import * as Sentry from "@sentry/browser";
import { defaultOptions } from "./index";

declare global {
    interface Window {
        Sentry: typeof Sentry;
    }
}

window.Sentry = Sentry;

export function init_sentry() {
    window.Sentry.init({
        ...defaultOptions,
        // We replace this with true or false before injecting this code into the browser
        debug: true,
    });
}