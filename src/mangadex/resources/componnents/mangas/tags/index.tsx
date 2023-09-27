import * as Chakra from "@chakra-ui/react";
import { ContentRating, make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { MangaPageProps } from "../Manga_Page";
import Consumer from "@commons-res/components/Consumer";
import React from "react";

export default function MangaTags(props: MangaPageProps & {
    children: (nodes: Array<React.ReactNode>) => React.ReactNode
}) {
    const build_themes_manga = React.useMemo<Array<React.ReactNode>>(() => {
        const returns: Array<React.ReactNode> = [];
        let hasInitialTag = false;
        if (props.src.get_ranting() != undefined && props.src.get_ranting() != ContentRating.safe()) {
            if (props.src.get_ranting() == ContentRating.suggestive()) {
                returns.push(<Chakra.Tag variant={"solid"} colorScheme={"green"}>{make_first_UpperCare(props.src.get_ranting())}</Chakra.Tag>);
            } else {
                returns.push(<Chakra.Tag variant={"solid"} colorScheme={"red"}>{make_first_UpperCare(props.src.get_ranting())}</Chakra.Tag>);
            }
            hasInitialTag = true;
        }
        const tags = props.src.get_tags();
        for (let index1 = 0; index1 < tags.length; index1++) {
            const element = tags[index1];
            if(element.get_id() == "97893a4c-12af-4dac-b6be-0dffb353568e" || element.get_id() == "b29d6a3d-1569-4e7a-8caf-7557bc92cd5d"){
                const tag = <Chakra.Tag variant={"solid"} colorScheme={"red"}>{element.get_name().en}</Chakra.Tag>;
                if(hasInitialTag){
                    returns.splice(1, 0, tag);
                }else{
                    returns.splice(0, 0, tag);
                }   
            }else{
                returns.push(<Chakra.Tag variant={"solid"} colorScheme={"gray"}>{element.get_name().en}</Chakra.Tag>);
            }
        }
        return returns;
    }, []);
    return (
        <Consumer to_consume={build_themes_manga}>
            {
                props.children
            }
        </Consumer>
    );
}