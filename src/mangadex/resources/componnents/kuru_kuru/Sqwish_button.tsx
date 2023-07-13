import React from "react";
import invokeHerta from "./invocation";
import { Button } from "@chakra-ui/react";
import Count from "./Count";

export default function Sqwish_button(){
    const [isSqwishing, start] = React.useTransition();
    const startSqwishing = React.useCallback(() => {
        start(() => {
            invokeHerta();
        });
    }, []);
    return (
        <Button
            colorScheme={"purple"}
            onClick={startSqwishing}
            isLoading={isSqwishing}
        >
            <Count/>
        </Button>
    );
}