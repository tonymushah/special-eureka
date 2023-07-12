import { Skeleton, Text } from "@chakra-ui/react";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import { useProps_manga_description } from ".";

export default function Description() {
    const { collapsed, broken } = useProSidebar();
    const { manga_description_query } = useProps_manga_description();
    if (manga_description_query.isLoading) {
        return (
            <Skeleton
                height={"full"}
                //borderTopLeftRadius={"10px"}
                borderBottomRightRadius={"10px"}
            />
        );
    } else {
        if (manga_description_query.isSuccess) {
            if (manga_description_query.data.length == 0) {
                return (
                    <React.Fragment />
                );
            } else {
                return (
                    <Text
                        noOfLines={3}
                        marginBottom={"1px"}
                        fontSize={collapsed && !broken ? "sm" : "xs"}
                    >
                        {manga_description_query.data[0].get_data()}
                    </Text>
                );
            }
        }
    }
    if (manga_description_query.isError) {
        return (
            <ErrorEL1 error={manga_description_query.error} />
        );
    } else {
        return (<React.Fragment />);
    }
}