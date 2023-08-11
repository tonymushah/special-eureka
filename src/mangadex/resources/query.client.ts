import { QueryClient } from "@tanstack/react-query";
import { trackEvent } from "..";

export const queryClient = new QueryClient({
    "defaultOptions": {
        "queries": {
            retry(failureCount) {
                if (failureCount >= 3) {
                    return false;
                } else {
                    return true;
                }
            },
            staleTime: Infinity,
            onError(e) {
                if (typeof e == "string") {
                    trackEvent("special-eureka-mangadex-query-error", {
                        error: e
                    });
                } else if (typeof e == "object") {
                    if (e instanceof Error) {
                        trackEvent("special-eureka-mangadex-query-error", {
                            "error-message": e.message,
                            "error-name": e.name
                        });
                    }
                }
                window.Sentry.captureException(e);
            },
            "networkMode": "always",
            cacheTime: 1000 * 60 * 3
        },
        "mutations": {
            "networkMode": "always"
        }
    }
});