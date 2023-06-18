import * as Chakra from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import TryCatch from "@commons-res/components/TryCatch";
import { getMangaDexPath } from "@mangadex";
import { Author_Artists, ContentRating, make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import { Manga } from "@mangadex/api/structures/Manga";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import MangaTitle from "@mangadex/resources/componnents/mangas/v1/MangaTitle";
import { get_manga_description, get_manga_page_authors_artists, get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import CoverPlaceHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import React from "react";
import { Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";

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
    const {
        authors,
        artistists,
        is_Author_artists_finished
    } = get_manga_page_authors_artists(props);
    function authors_artists(): Array<React.ReactNode> {
        const returns: Author_Artists = new Author_Artists(authors.map<Author>((value) => {
            return value.data!;
        }), artistists.map<Author>((value) => {
            return value.data!;
        }));
        const returns2: Array<React.ReactNode> = new Array<React.ReactNode>(returns.filtred.length);
        for (let index = 0; index < returns.filtred.length; index++) {
            const element = returns.filtred[index];
            if (index == (returns.filtred.length - 1)) {
                returns2[index] = (
                    <TryCatch
                        catch={() => (
                            <Chakra.Link
                                color={"black"}
                                textDecoration={"none"}
                                _hover={{
                                    color: "orange",
                                    textDecoration: "none"
                                }}
                            //as={Link} 
                            //to={MangaDexPath + "/author/" + element.get_id()}
                            >
                                {element.get_Name()}
                            </Chakra.Link>
                        )}
                    >
                        <Chakra.Link
                            color={"black"}
                            textDecoration={"none"}
                            _hover={{
                                color: "orange",
                                textDecoration: "none"
                            }}
                            as={Link}
                            to={MangaDexPath + "/author/" + element.get_id()}
                        >{element.get_Name()}</Chakra.Link>
                    </TryCatch>
                );
            } else {
                returns2[index] = (
                    <>
                        <TryCatch
                            catch={() => (
                                <Chakra.Link
                                    //as={Link} 
                                    //to={MangaDexPath + "/author/" + element.get_id()}
                                    color={"black"}
                                    textDecoration={"none"}
                                    _hover={{
                                        color: "orange",
                                        textDecoration: "none"
                                    }}
                                >
                                    {element.get_Name()}
                                </Chakra.Link>
                            )}
                        >
                            <Chakra.Link
                                as={Link}
                                to={MangaDexPath + "/author/" + element.get_id()}
                                color={"black"}
                                textDecoration={"none"}
                                _hover={{
                                    color: "orange",
                                    textDecoration: "none"
                                }}
                            >{element.get_Name()}</Chakra.Link>
                        </TryCatch>
                        ,&nbsp;
                    </>
                );
            }
        }
        return returns2;
    }
    function build_themes_manga(): Array<React.ReactNode> {
        let index = 0;
        const returns: Array<React.ReactNode> = [];
        if (props.src.get_ranting() != undefined && props.src.get_ranting() != ContentRating.safe()) {
            if (props.src.get_ranting() == ContentRating.suggestive()) {
                returns[index] = (
                    <Chakra.Tag colorScheme="green" size="sm">
                        {make_first_UpperCare(props.src.get_ranting())}
                    </Chakra.Tag>);
            } else {
                returns[index] = (
                    <Chakra.Tag colorScheme="red" size="sm">
                        <Chakra.TagLabel>{make_first_UpperCare(props.src.get_ranting())}</Chakra.TagLabel>
                    </Chakra.Tag>
                );
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < props.src.get_tags().length; index1++) {
            const element = props.src.get_tags()[index1];
            returns[index + index1] = (
                <Chakra.Tag colorScheme={"gray"} size="sm">
                    <Chakra.TagLabel>
                        {element.get_name().en}
                    </Chakra.TagLabel>
                </Chakra.Tag>
            );
        }
        return returns;
    }
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
                        <Chakra.Wrap>
                            {
                            build_themes_manga().map((value) => (
                                <Chakra.WrapItem key={`${Math.random()}`}>{value}</Chakra.WrapItem>
                            ))
                            }
                        </Chakra.Wrap>
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
                        {
                            !is_Author_artists_finished() ? (
                                <Placeholder md={6}></Placeholder>
                            ) : (
                                authors_artists()
                            )
                        }
                    </Chakra.Heading>
                </Chakra.CardBody>
            </Chakra.Card>
        </Chakra.Card>
    );
}