import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useNavigate, useNavigation } from "react-router";
import { RepeatIcon } from "@chakra-ui/icons";

export function RefreshButton() {
    const [isTranstion, startTransition] = React.useTransition();
    const navigation = useNavigation();
    const navigate = useNavigate();
    return (
        <Chakra.Button
            onClick={() => {
                startTransition(() => {
                    navigate(".");
                });
            }}
            leftIcon={<RepeatIcon />}
            colorScheme={"orange"}
            isLoading={isTranstion || navigation.state == "loading"}
        >
            Refresh
        </Chakra.Button>
    );
}
