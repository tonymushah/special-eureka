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
import { Button, Placeholder } from "react-bootstrap";

const MangaDexPath = getMangaDexPath()

const ReactMarkDown = React.lazy(() => import("react-markdown"));

export default function MangaPopularElement(props: {
    src: Manga
}) {
    const coverQuery = get_manga_page_cover_art_image(props).query;
    const {
        manga_description_query
    } = get_manga_description(props);
    const {
        authors,
        artistists,
        is_Author_artists_finished
    } = get_manga_page_authors_artists(props);
    function authors_artists(): Array<React.ReactNode> {
        let returns: Author_Artists = new Author_Artists(authors.map<Author>((value) => {
            return value.data!;
        }), artistists.map<Author>((value) => {
            return value.data!;
        }));
        let returns2: Array<React.ReactNode> = new Array<React.ReactNode>(returns.filtred.length);
        for (let index = 0; index < returns.filtred.length; index++) {
            const element = returns.filtred[index];
            if (index == (returns.filtred.length - 1)) {
                returns2[index] = (
                    <Chakra.Link
                    //as={Link} 
                    //to={MangaDexPath + "/author/" + element.get_id()}
                    >{element.get_Name()}</Chakra.Link>
                )
            } else {
                returns2[index] = (
                    <>
                        <Chakra.Link
                        //as={Link} 
                        //to={MangaDexPath + "/author/" + element.get_id()}
                        >{element.get_Name()}</Chakra.Link>
                        ,&nbsp;
                    </>
                )
            }
        }
        return returns2;
    }
    function build_themes_manga(): Array<React.ReactNode> {
        let index = 0;
        let returns: Array<React.ReactNode> = [];
        if (props.src.get_ranting() != undefined && props.src.get_ranting() != ContentRating.safe()) {
            if (props.src.get_ranting() == ContentRating.suggestive()) {
                returns[index] = (<Button style={{
                    fontWeight: 700,
                    margin: "1px",
                    padding: "2px"
                }} className="d-inline-flex" variant="success" size="sm">{make_first_UpperCare(props.src.get_ranting())}</Button>);
            } else {
                returns[index] = (<Button style={{
                    fontWeight: 700,
                    margin: "1px",
                    padding: "2px"
                }} className="d-inline-flex" variant="danger" size="sm">{make_first_UpperCare(props.src.get_ranting())}</Button>);
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < props.src.get_tags().length; index1++) {
            const element = props.src.get_tags()[index1];
            returns[index + index1] = (<Button style={{
                fontWeight: 700,
                margin: "1px",
                padding: "2px"
            }} className="d-inline-flex" variant="dark" size="sm">{element.get_name().en}</Button>)
        }
        return returns;
    }
    return (
        <Chakra.Card
            backgroundImage={{ base: "none", md: coverQuery.isSuccess == true ? coverQuery.data : CoverPlaceHolder }}
            backgroundRepeat={"no-repeat"}
            backgroundSize={"cover"}
            backgroundPosition={"0px -400px"}
            minW={"md"}
            margin={5}
        >
            <Chakra.Card
                background={"none"}
                backdropFilter='auto'
                backdropBlur={"10px"}
                backdropBrightness={"1.1"}
                direction={"row"}
                variant={"outline"}
            >
                <Chakra.Image
                    src={coverQuery.isSuccess == true ? coverQuery.data : CoverPlaceHolder}
                    maxW={"200px"}
                    minW={"100px"}
                    margin={"10px"}
                    boxShadow={"lg"}
                    borderRadius={"10px"}
                />
                <Chakra.CardBody>
                    <Chakra.Heading fontFamily={"inherit"} noOfLines={2}>
                        <MangaTitle src={props.src} />
                    </Chakra.Heading>
                    <Chakra.Text
                        noOfLines={0}
                        padding={0}
                        margin={0}
                    >
                        {
                            build_themes_manga().map((value) => value)
                        }
                    </Chakra.Text>
                    {
                        manga_description_query.isLoading || manga_description_query.isIdle ? (
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
                                    >
                                        <TryCatch
                                            catch={(e) => (
                                                <ErrorEL1 error={e} />
                                            )}
                                        >
                                            <ReactMarkDown
                                                children={manga_description_query.data[0].get_data()}
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
                                                        )
                                                    },
                                                    p(node){
                                                        return(
                                                            <Chakra.Text
                                                                noOfLines={3}
                                                                marginBottom={"1px"}
                                                                fontSize={"md"}
                                                            >
                                                                {node.children}
                                                            </Chakra.Text>
                                                        )
                                                    }
                                                }}
                                            />
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
                    <Chakra.Heading fontFamily={"inherit"} size={"md"} marginTop={5} fontFamily={"inherit"}>
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
    )
}