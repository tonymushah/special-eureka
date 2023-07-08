import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button } from "@chakra-ui/react";
import { UseQueryResult } from "@tanstack/react-query";
import ChakraContainer from "./layout/Container";

export default function IsPingable_defaultError(props: {
    query: UseQueryResult<boolean, Error>
}) {
    const { query } = props;
    return (
        <ChakraContainer maxHeight={"100vh"} m={0} p={0} height={"container.md"}>
            <Alert
                status="error"
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height={"full"}
                gap={3}
            >
                <AlertIcon boxSize={"10"} />
                <AlertTitle
                    fontSize={"2xl"}
                >
                    Can&apos;t ping Mangadex API
                </AlertTitle>
                <AlertDescription>
                    <Box>
                        <Button
                            size={"lg"}
                            colorScheme={"orange"}
                            onClick={() => query.refetch()}
                            isLoading={query.fetchStatus == "fetching"}
                        >
                            Refresh
                        </Button>
                    </Box>
                </AlertDescription>
            </Alert>
        </ChakraContainer>

    );
}