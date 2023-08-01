import * as Chakra from "@chakra-ui/react";
import { getMangaDexPath } from "@mangadex/index";
import React from "react";
import { Link } from "react-router-dom";
import { Author_Artists_Cmp_via_manga } from "../../../Manga_Page/Author_Artists_Cmp";
import { useProps } from "../../MangaElementDef/vanilla";

const MangaDexPath = getMangaDexPath();

export default function AuthorArtists() {
    const { src } = useProps();
    return (
        <Chakra.Heading fontFamily={"inherit"} size={"md"} marginTop={5}>
            <Author_Artists_Cmp_via_manga manga={src}
                onLoading={
                    <Chakra.SkeletonText skeletonHeight='2' />
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
                                    }}
                                    key={`${src.get_id()}-author_artist-${index}`}
                                    as={Link}
                                    to={MangaDexPath + "/author/" + element.get_id()}
                                >
                                    {element.get_Name()}
                                </Chakra.Link>
                            );
                        } else {
                            return (
                                <React.Fragment key={`${src.get_id()}-author_artist-${index}`}>
                                    <Chakra.Link color={"black"}
                                        textDecoration={"none"}
                                        _hover={{
                                            color: "orange",
                                            textDecoration: "none"
                                        }}
                                        as={Link}
                                        to={MangaDexPath + "/author/" + element.get_id()}
                                    >
                                        {element.get_Name()}
                                    </Chakra.Link>
                                    ,&nbsp;
                                </React.Fragment>
                            );
                        }
                    }))
                }
            </Author_Artists_Cmp_via_manga>
        </Chakra.Heading>
    );
}