import * as Chakra from "@chakra-ui/react";
import { useAsyncError } from "react-router";
import { JsonViewer } from "@textea/json-viewer";


export function ErrorELAsync() {
    const error = useAsyncError();
    return (
        <Chakra.Alert
            status="error"
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height={"max-content"}
        >
            <Chakra.AlertIcon />
            <Chakra.AlertTitle
            >
                We caught some error
            </Chakra.AlertTitle>
            <Chakra.AlertDescription>
                <JsonViewer value={error} />
            </Chakra.AlertDescription>
        </Chakra.Alert>
    );
}
