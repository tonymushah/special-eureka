import * as Chakra from "@chakra-ui/react";
import ChakraContainer from "../../layout/Container";
import RefreshAndBackButtons from "./RefreshAndBackButtons";
import { JsonViewer } from "@textea/json-viewer";

export default function ShowUnknownError({ error }: {
    error: unknown;
}) {
    return (
        <ChakraContainer width={"100%"} maxHeight={"100vh"} height={"container.md"}>
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
                <Chakra.AlertTitle
                    fontSize={"2xl"}
                >
                    Unknown Error caught
                </Chakra.AlertTitle>
                <Chakra.AlertDescription>
                    <JsonViewer value={error}/>
                    <RefreshAndBackButtons />
                </Chakra.AlertDescription>
            </Chakra.Alert>
        </ChakraContainer>
    );
}
