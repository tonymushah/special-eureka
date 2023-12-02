import React from "react";
import { MangaPageProps } from "../Manga_Page";
import { Status, make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Tag } from "@chakra-ui/react";

export const Get_status_color = React.memo(function Get_status_color(props: MangaPageProps) {
    switch (props.src.get_status()) {
        case Status.ongoing():
            return (<Tag colorScheme="green"> {make_first_UpperCare(props.src.get_status())} </Tag>);
            break;
        case Status.completed():
            return (<Tag colorScheme="teal"> {make_first_UpperCare(props.src.get_status())} </Tag>);
            break;
        case Status.hiatus():
            return (<Tag colorScheme="purple"> {make_first_UpperCare(props.src.get_status())} </Tag>);
            break;
        case Status.cancelled():
            return (<Tag colorScheme="red"> {make_first_UpperCare(props.src.get_status())} </Tag>);
            break;
        default:
            return (<React.Fragment />);
            break;
    }
});