import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { appWindow } from "@tauri-apps/api/window";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";
import * as FontAwesome from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getMangaDexPath } from "@mangadex";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import TryCatch from "@commons-res/components/TryCatch";
import { Alt_title, Author_Artists, ContentRating, Lang_and_Data, make_first_UpperCare, Status } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import { Manga } from "@mangadex/api/structures/Manga";
import { Statistics_Manga } from "@mangadex/api/structures/Statistics";
import { get_manga_page_authors_artists, get_manga_page_cover_art_image, get_manga_page_titles } from "@mangadex/resources/hooks/MangaStateHooks";
import Mangadex_cover_not_found from "@mangadex/resources/imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import { Cover_Image_ } from "@mangadex/resources/componnents/mangas/Mainpage/Image_";
import Statis from "@mangadex/resources/componnents/mangas/Statistics/Statis";
import MangaTitle from "@mangadex/resources/componnents/mangas/v1/MangaTitle";

const IsPingable = React.lazy(() => import("@mangadex/resources/componnents/IsPingable"));

//const Statis = React.lazy(() => import());

const MangaDexPath = getMangaDexPath();

export type MangaPageProps = {
    src: Manga
}

const ExtLink = React.lazy(async () => {
    const res = await import("@commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
});

function Manga_Page_Statis(props: React.PropsWithChildren<MangaPageProps>) {
    const client = useHTTPClient();
    const manga_statistics = useQuery<Statistics_Manga, Error>(["mdx", "manga", props.src.get_id(), "statistics"], () => {
        return Statistics_Manga.get_statsBy_MangaID(props.src.get_id(), client);
    }, {
        staleTime: Infinity
    });
    return (
        <Chakra.Box
            display={{
                base: "inherit",
                lg: "none"
            }}
        >
            {
                manga_statistics.isLoading ? (
                    <Chakra.Skeleton
                        height={"20px"}
                        width={"md"}
                    />
                ) : (
                    manga_statistics.isError ? (
                        <Chakra.Alert status={"error"}>
                            <Chakra.AlertIcon />
                            <Chakra.AlertTitle>Error on loading Stats</Chakra.AlertTitle>
                            <Chakra.AlertDescription>{manga_statistics.error.message}</Chakra.AlertDescription>
                        </Chakra.Alert>
                    ) : (
                        manga_statistics.isSuccess == true ? (
                            <>
                                <Statis src={manga_statistics.data}>
                                    {
                                        (getted: Statistics_Manga) => (
                                            <Chakra.Box>
                                                <Chakra.Box display={{
                                                    base: "none",
                                                    xl: "block"
                                                }}>
                                                    <Chakra.Box display={"flex"} width={"fit-content"}>
                                                        <Chakra.Text textAlign={"center"}>
                                                            <ChakraIcons.StarIcon />
                                                            &nbsp;
                                                            {getted.get_average()}
                                                        </Chakra.Text>
                                                        &nbsp;
                                                        &nbsp;
                                                        <Chakra.Text textAlign={"center"}>
                                                            <Chakra.Icon as={FontAwesome.FaBookmark} />
                                                            &nbsp;
                                                            <NumericFormat valueIsNumericString={true} value={getted.get_follows()} displayType={"text"} />
                                                        </Chakra.Text>
                                                        &nbsp;
                                                        &nbsp;
                                                        <Chakra.Text textAlign={"center"}>
                                                            <ChakraIcons.ChatIcon />
                                                            &nbsp;
                                                            {
                                                                getted.comments !== undefined && getted.comments !== null ? (
                                                                    <>{getted.comments.repliesCount}</>
                                                                ) : (
                                                                    <>0</>
                                                                )
                                                            }
                                                        </Chakra.Text>
                                                    </Chakra.Box>
                                                </Chakra.Box>
                                                <Chakra.Box display={{
                                                    base: "block",
                                                    xl: "none"
                                                }}>
                                                    <Chakra.Tag>Stats</Chakra.Tag>
                                                </Chakra.Box>
                                            </Chakra.Box>
                                        )
                                    }
                                </Statis>
                            </>
                        ) : (
                            <></>
                        )
                    )
                )
            }
        </Chakra.Box>
    );
}

export function Manga_Page(props: React.PropsWithChildren<MangaPageProps>) {
    let title = "";
    const client = useHTTPClient();
    const { title_query } = get_manga_page_titles(props);
    const {
        authors,
        artistists,
        is_Author_artists_finished
    } = get_manga_page_authors_artists(props);
    const coverQuery = get_manga_page_cover_art_image(props).query;
    if (props.src.get_title().en == null) {
        title = new Alt_title(props.src.get_alt_title()).get_quicklang()!;
    } else {
        title = props.src.get_title().en;
    }
    appWindow.setTitle(`${title} | Mangadex`).then();
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
                    <Chakra.Link as={Link} to={MangaDexPath + "/author/" + element.get_id()}>{element.get_Name()}</Chakra.Link>
                );
            } else {
                returns2[index] = (
                    <>
                        <Chakra.Link as={Link} to={MangaDexPath + "/author/" + element.get_id()}>{element.get_Name()}</Chakra.Link>
                        ,&nbsp;
                    </>
                );
            }
        }
        return returns2;
    }
    function get_status_color(): React.ReactNode {
        switch (props.src.get_status()) {
            case Status.ongoing():
                return (<Chakra.Tag colorScheme="green"> {make_first_UpperCare(props.src.get_status())} </Chakra.Tag>);
                break;
            case Status.completed():
                return (<Chakra.Tag colorScheme="teal"> {make_first_UpperCare(props.src.get_status())} </Chakra.Tag>);
                break;
            case Status.hiatus():
                return (<Chakra.Tag colorScheme="purple"> {make_first_UpperCare(props.src.get_status())} </Chakra.Tag>);
                break;
            case Status.cancelled():
                return (<Chakra.Tag colorScheme="red"> {make_first_UpperCare(props.src.get_status())} </Chakra.Tag>);
                break;
            default:
                return (<></>);
                break;
        }
    }
    function build_themes_manga(): Array<React.ReactNode> {
        let index = 0;
        const returns: Array<React.ReactNode> = [];
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
                }} className=" d-inline-flex" variant="danger" size="sm">{make_first_UpperCare(props.src.get_ranting())}</Button>);
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < props.src.get_tags().length; index1++) {
            const element = props.src.get_tags()[index1];
            returns[index + index1] = (<Button style={{
                fontWeight: 700,
                margin: "1px",
                padding: "2px"
            }} className="d-inline-flex" variant="dark" size="sm">{element.get_name().en}</Button>);
        }
        return returns;
    }
    return (
        <Chakra.Box>
            <Chakra.Box
                backgroundImage={coverQuery.isLoading ?
                    Mangadex_placeHolder : (
                        coverQuery.isError ? Mangadex_cover_not_found : coverQuery.data!
                    )}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={{
                    sm: "0px -5em",
                    md: "center -10em",
                    lg: "center -20em",
                    xl: "center -20em",
                    "2xl": "center -20em",
                }}
                backgroundSize={"cover"}
                borderTopRadius={"10px"}
            >
                <Chakra.Box
                    backdropFilter='auto'
                    backdropBlur={"20px"}
                    backdropBrightness={"1.1"}
                >
                    <Chakra.Box
                        padding={5}
                        background={"rgba(255, 255,255, 0.2)"}
                    >
                        <Container>
                            <Row>
                                <Col xs="3">
                                    <Cover_Image_ src={coverQuery.isLoading ?
                                        Mangadex_placeHolder : (
                                            coverQuery.isError ? Mangadex_cover_not_found : coverQuery.data!
                                        )} fallbackElement={Mangadex_placeHolder} />
                                </Col>
                                <Col xs="9">
                                    <Chakra.Box>
                                        <Chakra.Center
                                            display={"block"}
                                        >
                                            <Chakra.Heading
                                                noOfLines={2}
                                                fontFamily={"inherit"}
                                                size={{
                                                    base: "md",
                                                    sm: "lg",
                                                    md: "2xl",
                                                    lg: "3xl"
                                                }}
                                            >
                                                {
                                                    title
                                                }
                                            </Chakra.Heading>
                                            <Chakra.Heading
                                                noOfLines={2}
                                                fontFamily={"inherit"}
                                                size={{
                                                    base: "sm",
                                                    sm: "md",
                                                    md: "lg"
                                                }}
                                            >
                                                <MangaTitle
                                                    src={props.src}
                                                />
                                            </Chakra.Heading>
                                            <Chakra.Text>
                                                {
                                                    !is_Author_artists_finished() ? (
                                                        <Placeholder md={6}></Placeholder>
                                                    ) : (
                                                        authors_artists()
                                                    )
                                                }
                                                {/* <React.Suspense fallback={<Placeholder md={6}></Placeholder>}>
                                                <Await
                                                    resolve={authors_artists()}
                                                    errorElement={<div></div>}
                                                    children={(getted: Array<React.ReactNode>) => {
                                                        return (
                                                            <>
                                                                {
                                                                    getted.map((value) => (
                                                                        <>{value}</>
                                                                    ))
                                                                }
                                                            </>
                                                        )
                                                    }}
                                                />
                                            </React.Suspense> */}
                                            </Chakra.Text>

                                            <Chakra.Box
                                                display={{
                                                    base: "none",
                                                    lg: "inherit"
                                                }}
                                            >
                                                <Chakra.Text
                                                    fontWeight={"bold"}
                                                    padding={0}
                                                    margin={0}
                                                >
                                                    <Chakra.Center
                                                        width={"fit-content"}
                                                    >
                                                        Publication :
                                                        &nbsp;
                                                        {
                                                            props.src.get_year() ?? ""
                                                        }
                                                        &nbsp;
                                                        {
                                                            get_status_color()
                                                        }
                                                        &nbsp;
                                                    </Chakra.Center>
                                                </Chakra.Text>
                                                <Chakra.Text
                                                    noOfLines={0}
                                                    padding={0}
                                                    margin={0}
                                                >
                                                    {
                                                        build_themes_manga().map((value) => value)
                                                    }
                                                </Chakra.Text>
                                                <Chakra.Box>
                                                    <React.Suspense
                                                        fallback={
                                                            <Chakra.Button
                                                                isLoading
                                                                colorScheme={"orange"}
                                                                loadingText={"Loading..."}
                                                            />
                                                        }
                                                    >
                                                        <ExtLink
                                                            href={"https://mangadex.org/title/" + props.src.get_id()}
                                                        >
                                                            <Chakra.Button
                                                                colorScheme={"orange"}
                                                                rightIcon={<ChakraIcons.ExternalLinkIcon />}
                                                            >
                                                                Open to Mangadex
                                                            </Chakra.Button>
                                                        </ExtLink>
                                                    </React.Suspense>
                                                </Chakra.Box>
                                                <Chakra.Box>
                                                    <React.Suspense
                                                        fallback={
                                                            <Chakra.Skeleton
                                                                height={"20px"}
                                                                width={"md"}
                                                            />
                                                        }
                                                    >
                                                        <IsPingable
                                                            client={client}
                                                            onError={() => (
                                                                <></>
                                                            )}
                                                            onLoading={
                                                                <Chakra.Skeleton
                                                                    height={"20px"}
                                                                    width={"md"}
                                                                />
                                                            }
                                                            onSuccess={() => (
                                                                <TryCatch
                                                                    catch={(error) => (
                                                                        <Chakra.Box>
                                                                            <Chakra.Text>{error.message}</Chakra.Text>
                                                                            <Chakra.Box>{error.stack}</Chakra.Box>
                                                                        </Chakra.Box>
                                                                    )}
                                                                >
                                                                    <Manga_Page_Statis
                                                                        src={props.src}
                                                                    />
                                                                </TryCatch>
                                                            )}
                                                        />
                                                    </React.Suspense>
                                                </Chakra.Box>
                                            </Chakra.Box>
                                        </Chakra.Center>
                                    </Chakra.Box>
                                </Col>
                            </Row>
                            <Chakra.Box
                                display={{
                                    base: "inherit",
                                    lg: "none"
                                }}
                            >
                                <>
                                    <Row>
                                        <Chakra.Text
                                            fontWeight={"bold"}
                                            padding={0}
                                            margin={0}
                                        >
                                            <Chakra.Center
                                                width={"fit-content"}
                                            >
                                                Publication :
                                                &nbsp;
                                                {
                                                    get_status_color()
                                                }
                                                &nbsp;
                                                {
                                                    make_first_UpperCare(props.src.get_status())
                                                }
                                            </Chakra.Center>
                                        </Chakra.Text>
                                        <Chakra.Text
                                            noOfLines={0}
                                            padding={0}
                                            margin={0}
                                        >
                                            {
                                                build_themes_manga().map((value) => value)
                                            }
                                        </Chakra.Text>
                                        <Chakra.Box>
                                            <React.Suspense
                                                fallback={
                                                    <Chakra.Button
                                                        isLoading
                                                        colorScheme={"orange"}
                                                        loadingText={"Loading..."}
                                                    />
                                                }
                                            >
                                                <ExtLink
                                                    href={"https://mangadex.org/title/" + props.src.get_id()}
                                                >
                                                    <Chakra.Button
                                                        colorScheme={"orange"}
                                                        rightIcon={<ChakraIcons.ExternalLinkIcon />}
                                                    >
                                                        Open to Mangadex
                                                    </Chakra.Button>
                                                </ExtLink>
                                            </React.Suspense>
                                        </Chakra.Box>
                                    </Row>
                                </>
                            </Chakra.Box>
                        </Container>
                    </Chakra.Box>
                </Chakra.Box>
            </Chakra.Box>
            <Chakra.Box>
                {props.children}
            </Chakra.Box>
        </Chakra.Box>
    );
}
