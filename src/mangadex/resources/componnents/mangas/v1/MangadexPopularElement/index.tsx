import * as Chakra from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import TryCatch from "@commons-res/components/TryCatch";
import { Manga } from "@mangadex/api/structures/Manga";
import { getMangaDexPath } from "@mangadex/index";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MangaTitle from "@mangadex/resources/componnents/mangas/v1/MangaTitle";
import { get_manga_description, get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import CoverPlaceHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import React from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import MangaTags from "../../tags";
import { Author_Artists_Cmp_via_manga } from "../../Manga_Page/Author_Artists_Cmp";

const MangaDexPath = getMangaDexPath();

const ReactMarkDown = React.lazy(() => import("react-markdown"));

export default function MangaPopularElement(props: {
    src: Manga
}) {
    const coverQuery = get_manga_page_cover_art_image({
        src: props.src,
        isThumbail: true
    }).query;
    const {
        manga_description_query
    } = get_manga_description(props);
    return (
        <Chakra.Card
            backgroundImage={{ base: "none", lg: coverQuery.isSuccess == true ? coverQuery.data : CoverPlaceHolder }}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundPosition={"0px -400px"}
            minW={"md"}
            margin={5}
        >
            <Chakra.Card
                background={"rgba(255, 255,255, 0.5)"}
                backdropFilter='auto'
                backdropBlur={"20px"}
                backdropBrightness={"1.1"}
                direction={"row"}
                variant={"outline"}
            >
                <Chakra.Image
                    src={coverQuery.isSuccess == true ? coverQuery.data : CoverPlaceHolder}
                    objectFit={"contain"}
                    maxW={"200px"}
                    margin={"10px"}
                    boxShadow={"lg"}
                    borderRadius={"10px"}
                />
                <Chakra.CardBody>
                    <TryCatch
                        catch={() => (
                            <Chakra.Heading fontFamily={"inherit"} noOfLines={2}>
                                <MangaTitle src={props.src} />
                            </Chakra.Heading>
                        )}
                    >
                        <Chakra.Heading
                            fontFamily={"inherit"}
                            noOfLines={2}
                            as={Link}
                            to={MangaDexPath + "/manga/" + props.src.get_id()}
                            textDecoration={"none"}
                            color={"black"}
                            _hover={{
                                color: "orange",
                                textDecoration: "none"
                            }}
                        >
                            <MangaTitle src={props.src} />
                        </Chakra.Heading>
                    </TryCatch>
                    <Chakra.Text
                        noOfLines={0}
                        padding={0}
                        margin={0}
                    >
                        <MangaTags src={props.src}>
                            {
                                (nodes) => (
                                    <Chakra.Wrap>
                                        {
                                            nodes.map((value) => (
                                                <Chakra.WrapItem key={`${v4()}`}>
                                                    {
                                                        value
                                                    }
                                                </Chakra.WrapItem>
                                            ))
                                        }
                                    </Chakra.Wrap>
                                )
                            }
                        </MangaTags>
                    </Chakra.Text>
                    {
                        manga_description_query.isLoading && manga_description_query.fetchStatus == "fetching" ? (
                            <Chakra.SkeletonText
                                height={"20px"}
                                //borderTopLeftRadius={"10px"}
                                borderBottomRightRadius={"10px"}
                            />
                        ) : (
                            manga_description_query.isSuccess ? (
                                manga_description_query.data.length == 0 ? (
                                    <></>
                                ) : (
                                    <Chakra.Box
                                        maxH={"200px"}
                                        overflowY={"clip"}
                                    >
                                        <TryCatch
                                            catch={(e) => (
                                                <ErrorEL1 error={e} />
                                            )}
                                        >
                                            <ReactMarkDown
                                                components={{
                                                    a(node) {
                                                        return (
                                                            <React.Suspense
                                                                fallback={<Chakra.Skeleton width={"10px"} height={"10px"} />}
                                                            >
                                                                {
                                                                    node.href == undefined ? (
                                                                        <Chakra.Link>{node.children}</Chakra.Link>
                                                                    ) : (
                                                                        <ExtLink href={node.href}>
                                                                            <Chakra.Link>{node.children}</Chakra.Link>
                                                                        </ExtLink>
                                                                    )
                                                                }
                                                            </React.Suspense>
                                                        );
                                                    },
                                                    p(node) {
                                                        return (<Chakra.Text m={0}>{node.children}</Chakra.Text>);
                                                    }
                                                }}
                                            >
                                                {manga_description_query.data[0].get_data()}
                                            </ReactMarkDown>
                                        </TryCatch>
                                    </Chakra.Box>
                                )
                            ) : (
                                manga_description_query.isError ? (
                                    <ErrorEL1 error={manga_description_query.error} />
                                ) : (
                                    <></>
                                )
                            )
                        )
                    }
                    <Chakra.Heading fontFamily={"inherit"} size={"md"} marginTop={5}>
                        <Author_Artists_Cmp_via_manga manga={props.src}
                            onLoading={
                                <Chakra.SkeletonText skeletonHeight='2'/>
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
                                                }} key={`${props.src.get_id()}-author_artist-${index}`} as={Link} to={MangaDexPath + "/author/" + element.get_id()}>{element.get_Name()}</Chakra.Link>
                                        );
                                    } else {
                                        return (
                                            <React.Fragment key={`${props.src.get_id()}-author_artist-${index}`}>
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
                    </Chakra.Heading>
                </Chakra.CardBody>
            </Chakra.Card>
        </Chakra.Card>
    );
}