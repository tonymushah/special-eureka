import * as Chakra from "@chakra-ui/react";
import { ContentRating, make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { MangaPageProps } from "../Manga_Page";
import Consumer from "@commons-res/components/Consumer";

export default function MangaTags(props: MangaPageProps & {
    children : (nodes : Array<React.ReactNode>) => React.ReactNode
}){
    function build_themes_manga(): Array<React.ReactNode> {
        let index = 0;
        const returns: Array<React.ReactNode> = [];
        if (props.src.get_ranting() != undefined && props.src.get_ranting() != ContentRating.safe()) {
            if (props.src.get_ranting() == ContentRating.suggestive()) {
                returns[index] = (<Chakra.Tag colorScheme={"green"}>{make_first_UpperCare(props.src.get_ranting())}</Chakra.Tag>);
            } else {
                returns[index] = (<Chakra.Tag colorScheme={"red"}>{make_first_UpperCare(props.src.get_ranting())}</Chakra.Tag>);
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < props.src.get_tags().length; index1++) {
            const element = props.src.get_tags()[index1];
            returns[index + index1] = (<Chakra.Tag colorScheme={"gray"}>{element.get_name().en}</Chakra.Tag>);
        }
        return returns;
    }
    return (
        <Consumer to_consume={build_themes_manga()}>
            {
                props.children
            }
        </Consumer>
    );
}