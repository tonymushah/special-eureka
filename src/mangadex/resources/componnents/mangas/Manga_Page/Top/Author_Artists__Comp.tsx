import * as Chakra from "@chakra-ui/react";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";
import { Link } from "react-router-dom";
import { useProps } from "../../v1/MangaElementDef/vanilla";
import { Author_Artists_Cmp_via_manga } from "../Author_Artists_Cmp";
import { useMangaDexPath } from "@mangadex/index";

export default function Author_Artists__Comp() {
    const { src } = useProps();
    const MangaDexPath = useMangaDexPath();
    return (
        <Author_Artists_Cmp_via_manga manga={src}
            onLoading={
                <Chakra.SkeletonText />
            }
        >
            {
                (authors_artists) => (authors_artists.map((value, index, array) => {
                    const element = value;
                    if (index == (array.length - 1)) {
                        return (
                            <Chakra.Link color={"black"}
                                textDecoration={"none"}
                                _hover={{
                                    color: "orange",
                                    textDecoration: "none"
                                }} key={`${src.get_id()}-author_artist-${index}`} as={Link} to={MangaDexPath + "/author/" + element.get_id()}>{element.get_Name()}</Chakra.Link>
                        );
                    } else {
                        return (
                            <React.Fragment key={`${src.get_id()}-author_artist-${index}`}>
                                <Chakra.Link color={"black"}
                                    textDecoration={"none"}
                                    _hover={{
                                        color: "orange",
                                        textDecoration: "none"
                                    }} as={Link} to={MangaDexPath + "/author/" + element.get_id()}>{element.get_Name()}</Chakra.Link>
                                ,&nbsp;
                            </React.Fragment>
                        );
                    }
                }))
            }
        </Author_Artists_Cmp_via_manga>
    );
}