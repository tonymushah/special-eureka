import * as Chakra from "@chakra-ui/react";
import { get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex/index";
import TryCatch from "@commons-res/components/TryCatch";
import { Manga } from "@mangadex/api/structures/Manga";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import MangaContextMenu from "../MangaContextMenu";
import { useMangaTitle } from "../MangaTitle";

const MangaDexPath = getMangaDexPath();

export default function MangaVerticalElement(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    const title = useMangaTitle({
        src : props.src
    });
    const coverQuery = get_manga_page_cover_art_image({
        src: props.src,
        isThumbail: true
    }).query;
    return (
        <MangaContextMenu
            mangaId={props.src.get_id()}
            refetch={props.refetch}
        >
            <Chakra.LinkBox
                marginBottom={10}
                width={"fit-content"}
                backgroundColor={props.isRefetching == undefined ? "gray.100" : (props.isRefetching ? "orange.100" : "gray.100")}
                borderRadius={"10px"}
                border={"1px"}
                borderColor={"gray.200"}
                shadow={"md"}
            >
                <Chakra.Center>
                    <Chakra.Box
                        display={
                            {
                                base: "inline-block"
                            }
                        }
                        width={"150px"}
                    >
                        {
                            coverQuery.isLoading ? (
                                <Chakra.Skeleton
                                    borderTopRadius={"10px"}
                                    height={"150px"}
                                />
                            ) : null
                        }
                        {
                            coverQuery.isError ? (
                                <Chakra.Image
                                    src={Mangadex_cover_not_found}
                                    fallbackSrc={Mangadex_placeHolder}
                                    borderTopRadius={"10px"}
                                />
                            ) : null
                        }
                        {
                            coverQuery.isSuccess ? (
                                <Chakra.Image
                                    src={coverQuery.data}
                                    fallbackSrc={Mangadex_placeHolder}
                                    borderTopRadius={"10px"}
                                />
                            ) : null
                        }
                        <Chakra.Center>
                            <Chakra.Heading
                                //textAlign={"center"}
                                size={"md"}
                                noOfLines={2}
                                margin={"15px"}
                                fontFamily={"inherit"}
                            >
                                <TryCatch catch={() => (
                                    <Chakra.LinkOverlay>
                                        {title}
                                    </Chakra.LinkOverlay>
                                )}>
                                    <Chakra.LinkOverlay
                                        as={Link}
                                        to={MangaDexPath + "/manga/" + props.src.get_id()}
                                        color={"black"}
                                        textDecoration={"none"}
                                        _hover={{
                                            color : "orange",
                                            textDecoration : "none"
                                        }}
                                    >
                                        {title}
                                    </Chakra.LinkOverlay>
                                </TryCatch>
                            </Chakra.Heading>
                        </Chakra.Center>
                    </Chakra.Box>
                </Chakra.Center>
            </Chakra.LinkBox>
        </MangaContextMenu>
    );
}
