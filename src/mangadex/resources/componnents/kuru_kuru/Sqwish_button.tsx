import React from "react";
import invokeHerta from "./invocation";
import { useClickCount } from "./atom";
import { Button } from "@chakra-ui/react";

export default function Sqwish_button(){
    const [isSqwishing, start] = React.useTransition();
    const startSqwishing = React.useCallback(() => {
        start(() => {
            invokeHerta();
        });
    }, []);
    const [clickCount, ] = useClickCount();
    return (
        <Button
            colorScheme={"purple"}
            onClick={startSqwishing}
            isLoading={isSqwishing}
        >
            {
                clickCount
            }
        </Button>
    );
}