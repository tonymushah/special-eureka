import * as Chakra from "@chakra-ui/react";
import { get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex";
import TryCatch from "@commons-res/components/TryCatch";
import { Alt_title } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import MangaContextMenu from "./MangaContextMenu";

const MangaDexPath = getMangaDexPath();

export default function MangaVerticalElement(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    let title = "";
    const coverQuery = get_manga_page_cover_art_image({
        src: props.src,
        isThumbail: true
    }).query;
    //let desc: string = "";
    if (props.src.get_title().en == null) {
        title = new Alt_title(props.src.get_alt_title()).get_quicklang()!;
    } else {
        title = props.src.get_title().en;
    }
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
