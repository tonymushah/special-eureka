import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
import { Tag } from "@mangadex/api/structures/Tag";
import { get_all_tag } from "@mangadex/resources/hooks/TagStateHooks";
import React from "react";

export default function AllTagConsumer(props : {
    children : (tags : Array<Tag>) => React.ReactNode
}) {
    const { query } = get_all_tag();
    if(query.isSuccess) {
        return (
            <React.Fragment>
                {props.children(query.data)}
            </React.Fragment>
        );
    }
    return (
        <Alert
            status="loading"
        >
            <AlertIcon/>
            <AlertTitle>Loading</AlertTitle>
        </Alert>
    );
}