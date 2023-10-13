import * as Chakra from "@chakra-ui/react";
import ChakraContainer from "../../layout/Container";
import RefreshReportAndBackButtons from "./RefreshReportAndBackButtons";

export default function ShowErrorDefault({ error }: {
    error: Error;
}) {
    return (
        <ChakraContainer maxHeight={"100vh"} width={"100%"} height={"container.md"}>
            <Chakra.Alert
                status="error"
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height={"full"}
                gap={3}
            >
                <Chakra.AlertIcon boxSize={"10"} />
                <Chakra.AlertTitle fontSize={"2xl"}>
                    {error.name}
                </Chakra.AlertTitle>
                <Chakra.AlertDescription>
                    <Chakra.VStack>
                        <Chakra.Box>
                            <Chakra.Text>{error.message}</Chakra.Text>
                        </Chakra.Box>
                        <Chakra.Box>
                            <RefreshReportAndBackButtons error={error} />
                        </Chakra.Box>
                    </Chakra.VStack>
                </Chakra.AlertDescription>
            </Chakra.Alert>
        </ChakraContainer>
    );
}
