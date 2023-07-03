// TODO Custom window decorations 

import { Box, ButtonGroup } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CloseButton from "./CloseButton";
import MinMaxButton from "./MaxMinButton";

const queryClient = new QueryClient();


export default function BoxDecoration() {
    return (
        <QueryClientProvider client={queryClient}>
            <Box position={"fixed"} display={"flex"} data-tauri-drag-region zIndex={"banner"} justifyContent={"flex-end"} background={"gray.50"} top={0} left={0} right={0}>
                <Box borderBottomLeftRadius={"10px"}>
                    <ButtonGroup isAttached variant='outline'>
                        <MinMaxButton />
                        <CloseButton />
                    </ButtonGroup>
                </Box>
            </Box>
        </QueryClientProvider>
    );
}