import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useNavigation } from "react-router";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function GoBackButton() {
    const [isTranstion, startTransition] = React.useTransition();
    const navigation = useNavigation();
    return (
        <Chakra.Button onClick={() => {
            startTransition(() => {
                history.back();
            });
        }}
            isLoading={isTranstion || navigation.state == "loading"}
            leftIcon={<ArrowBackIcon />}
        >
            Go back
        </Chakra.Button>
    );
}
