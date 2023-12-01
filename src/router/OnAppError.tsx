import * as Chakra from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import React from "react";

function OnError(error: Error) {
    return (
        <Chakra.Box
            height="100vh"
            width="full"
        >
            <Chakra.AbsoluteCenter>
                <Chakra.Box textAlign="center">
                    <Chakra.Heading>
                        Error on loading the app
                    </Chakra.Heading>

                    <Chakra.Text>
                        Error Details
                    </Chakra.Text>

                    <Chakra.Alert status="error">
                        <Chakra.AlertIcon />

                        <Chakra.AlertTitle>
                            {error.name}
                        </Chakra.AlertTitle>

                        <Chakra.AlertDescription>
                            {error.message}
                        </Chakra.AlertDescription>
                    </Chakra.Alert>
                </Chakra.Box>
            </Chakra.AbsoluteCenter>
        </Chakra.Box>
    );
}

export default function OnAppError({ children }: React.PropsWithChildren) {
    return (
        <TryCatch
            catch={OnError}
        >
            {children}
        </TryCatch>
    );
}