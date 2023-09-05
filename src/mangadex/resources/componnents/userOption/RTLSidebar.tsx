import { Box, HStack, Switch, Text } from "@chakra-ui/react";
import useServerAutoStart from "@mangadex/resources/hooks/userOptions/RtlSidebar";
import React from "react";

export default function RtlSidebarOption(){
    const {
        query,
        toggle
    } = useServerAutoStart();
    if(query.isSuccess){
        return(
            <HStack
                onClick={() => {
                    toggle();
                }}
            >
                <Text>
                    Left
                </Text>
                <Switch
                    isChecked={query.data}
                />
                <Text>
                    Right
                </Text>
            </HStack>
        );
    }
    return (
        <React.Fragment>Loading...</React.Fragment>
    );
}