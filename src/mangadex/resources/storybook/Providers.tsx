import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./query.client";
import { Box, ChakraProvider } from "@chakra-ui/react";
import ColorMode from "../componnents/userOption/ColorMode";

export default function Providers({ children }: React.PropsWithChildren) {
    return (
        <ChakraProvider>
            <Box>
                <ColorMode/>
            </Box>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                {children}
            </QueryClientProvider>
        </ChakraProvider>
    );
}