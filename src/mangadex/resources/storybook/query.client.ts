import { QueryClient } from "@tanstack/react-query";

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
            "networkMode": "always",
            cacheTime: 1000 * 60 * 3
        },
        "mutations": {
            "networkMode": "always"
        }
    }
});