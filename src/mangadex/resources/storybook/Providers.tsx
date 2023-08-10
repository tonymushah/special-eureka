import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./query.client";
import { ChakraProvider } from "@chakra-ui/react";

export default function Providers({ children }: React.PropsWithChildren) {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                {children}
            </QueryClientProvider>
        </ChakraProvider>
    );
}