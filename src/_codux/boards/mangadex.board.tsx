import { createBoard } from '@wixc3/react-board';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';

export default createBoard({
    name: 'Mangadex',
    Board: () => <ChakraProvider>
        <Box>
            <Text></Text>
        </Box>
    </ChakraProvider>,
    environmentProps: {
        windowHeight: 518,
        canvasWidth: 299
    }
});
