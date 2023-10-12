import { Box, Switch } from "@chakra-ui/react";
import useServerAutoStart from "@mangadex/resources/hooks/userOptions/ServerAutoStart";
import React from "react";

export default function ServerAutoStart(){
    const {
        query,
        toggle
    } = useServerAutoStart();
    if(query.isSuccess){
        return(
            <Box
                onClick={() => {
                    toggle();
                }}
            >
                <Switch
                    isChecked={query.data}
                />
            </Box>
        );
    }
    return (
        <React.Fragment>Loading...</React.Fragment>
    );
}