import { IconButton } from "@chakra-ui/react";
import React from "react";
import { FiChevronsLeft } from "react-icons/fi";
import { useNavigation } from "react-router";

export default function BackButton(){
    const navigation = useNavigation();
    const [isTransition, startTransition] = React.useTransition();
    return (
        <IconButton
            aria-label="Back"
            icon={<FiChevronsLeft/>}
            isLoading={navigation.state == "loading" || isTransition}
            onClick={() => {
                startTransition(() => {
                    history.back();
                });
            }}
        />
    );
}