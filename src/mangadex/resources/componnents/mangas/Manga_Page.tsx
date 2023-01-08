import * as ChakraIcons from "@chakra-ui/icons";
import * as Chakra from '@chakra-ui/react';
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Button, Col, Container, Placeholder, Row } from "react-bootstrap";
import * as FontAwesome from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { useQueries, useQuery } from "react-query";
import { Await, Link } from "react-router-dom";
import { Alt_title, Author_Artists, ContentRating, Lang_and_Data, make_first_UpperCare, Status } from "../../../api/internal/Utils";
import { Author } from "../../../api/structures/Author";
import { Manga } from "../../../api/structures/Manga";
import { Statistics } from "../../../api/structures/Statistics";
import "../../css/manga/mg-p.css";
import "../../css/manga/thumbail-mg.css";
import Mangadex_cover_not_found from "../../imgs/cover-not-found.jpg";
import Mangadex_placeHolder from "../../imgs/cover-placeholder.png";
import ErrorEL1 from "../error/ErrorEL1";
import { Cover_Image_ } from "./Mainpage/Image_";

export function Statis(props: {
    src: Statistics
}) {
    let getted: Statistics = props.src;
    return (
        <Chakra.Popover
            closeOnBlur={false}
        >
            <Chakra.PopoverTrigger>
                <Chakra.Box display={"flex"} width={"fit-content"}>
                    <Chakra.Text >
                        <ChakraIcons.StarIcon />
                        &nbsp;
                        {getted.get_average()}
                    </Chakra.Text>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Chakra.Text>
                        <Chakra.Icon as={FontAwesome.FaBookmark} />
                        &nbsp;
                        <NumericFormat valueIsNumericString={true} value={getted.get_follows()} displayType={"text"} />
                    </Chakra.Text>
                </Chakra.Box>
            </Chakra.PopoverTrigger>
            <Chakra.Portal>
                <Chakra.PopoverContent>
                    <Chakra.PopoverHeader>
                        <Chakra.Text>
                            <ChakraIcons.StarIcon />
                            {getted.get_average()} ~ {getted.get_baeysian()}
                        </Chakra.Text>
                        <Chakra.Text>
                            <Chakra.Icon as={FontAwesome.FaBookmark} />
                            <NumericFormat displayType={"text"} valueIsNumericString={true} value={getted.get_follows()} />
                        </Chakra.Text>
                        <Chakra.PopoverCloseButton />
                    </Chakra.PopoverHeader>
                    <Chakra.PopoverBody>
                        <Chakra.Box
                        >
                            10 <Chakra.Progress value={(getted.get_distribution()[10] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[10]} &#41;
                        </Chakra.Box>
                        <Chakra.Box
                        >
                            9 <Chakra.Progress value={(getted.get_distribution()[9] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[9]} &#41;
                        </Chakra.Box>
                        <Chakra.Box
                        >
                            8 <Chakra.Progress value={(getted.get_distribution()[8] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[8]} &#41;
                        </Chakra.Box>
                        <Chakra.Box
                        >
                            7 <Chakra.Progress value={(getted.get_distribution()[7] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[7]} &#41;
                        </Chakra.Box>
                        <Chakra.Box
                        >
                            6 <Chakra.Progress value={(getted.get_distribution()[6] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[6]} &#41;
                        </Chakra.Box>
                        <Chakra.Box
                        >
                            5 <Chakra.Progress value={(getted.get_distribution()[5] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[5]} &#41;
                        </Chakra.Box>
                        <Chakra.Box
                        >
                            4 <Chakra.Progress value={(getted.get_distribution()[4] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[4]} &#41;
                        </Chakra.Box>
                        <Chakra.Box
                        >
                            3 <Chakra.Progress value={(getted.get_distribution()[3] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[3]} &#41;
                        </Chakra.Box>
                        <Chakra.Box
                        >
                            2 <Chakra.Progress value={(getted.get_distribution()[2] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[2]} &#41;
                        </Chakra.Box>
                        <Chakra.Box
                        >
                            1 <Chakra.Progress value={(getted.get_distribution()[1] / getted.get_distribution_sum()) * 100} />
                            &#40; {getted.get_distribution()[1]} &#41;
                        </Chakra.Box>
                    </Chakra.PopoverBody>
                </Chakra.PopoverContent>
            </Chakra.Portal>
        </Chakra.Popover>
    );
}

type MangaPageProps = {
    src: Manga,
    children: React.ReactNode
}

const ExtLink = React.lazy(async () => {
    let res = await import("../../../../commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
})

export function Manga_Page(props: MangaPageProps) {
    let title: string = "";
    const cover_key = "mdx-manga_cover-" + props.src.get_id();
    const coverQuery = useQuery(cover_key, () => {
        return props.src.get_cover_art()
    }, {
        "staleTime": Infinity
    });
    const title_query = useQuery("mdx-manga_title-" + props.src.get_id(), () => {
        return Lang_and_Data.initializeArrayByAltTitle_obj(props.src.get_alt_title());
    }, {
        "staleTime": Infinity
    });
    const authors = useQueries(
        props.src.get_authors_id().map(author_id => {
            return {
                queryKey: "mdx-author-" + author_id,
                queryFn: () => {
                    return props.src.get_author_byID(author_id);
                },
                staleTime: Infinity
            }
        })
    )
    const artistists = useQueries(
        props.src.get_artists_id().map(author_id => {
            return {
                queryKey: "mdx-author-" + author_id,
                queryFn: () => {
                    return props.src.get_artist_byID(author_id);
                },
                staleTime: Infinity
            }
        })
    )
    const manga_statistics = useQuery<Statistics, Error>("mdx-manga_stats-", () => {
        return Statistics.get_statsBy_MangaID(props.src.get_id());
    }, {
        staleTime: Infinity
    });
    function is_Author_artists_finished(): boolean {
        let all_isSuccess_Authors = authors.map<boolean>((value) => {
            return value.isSuccess;
        });
        let is_allAuthors_Success = !all_isSuccess_Authors.includes(false);
        let all_isSuccess_Artists = artistists.map<boolean>((value) => {
            return value.isSuccess;
        });
        let is_allArtists_Success = !all_isSuccess_Artists.includes(false);
        if (is_allArtists_Success == true && is_allAuthors_Success == true) {
            return true;
        } else {
            return false;
        }
    }
    if (props.src.get_title().en == null) {
        title = new Alt_title(props.src.get_alt_title()).get_quicklang()!;
    } else {
        title = props.src.get_title().en;
    }
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
                    <Chakra.Link as={Link} to={"/mangadex/author/" + element.get_id()}>{element.get_Name()}</Chakra.Link>
                )
            } else {
                returns2[index] = (
                    <Chakra.Link as={Link} to={"/mangadex/author/" + element.get_id()}>{element.get_Name()},</Chakra.Link>
                )
            }
        }
        return returns2;
    }
    function get_status_color(): React.ReactNode {
        switch (props.src.get_status()) {
            case Status.ongoing():
                return (<Button size="sm" variant="success" disabled> </Button>)
                break;
            case Status.completed():
                return (<Button size="sm" variant="info" disabled> </Button>)
                break;
            case Status.hiatus():
                return (<Button size="sm" variant="warning" disabled> </Button>)
                break;
            case Status.cancelled():
                return (<Button size="sm" variant="danger" disabled> </Button>)
                break;
            default:
                return (<></>);
                break;
        }
    }
    function build_themes_manga(): Array<React.ReactNode> {
        let index = 0;
        let returns: Array<React.ReactNode> = [];
        if (props.src.get_ranting() != undefined && props.src.get_ranting() != ContentRating.safe()) {
            if (props.src.get_ranting() == ContentRating.suggestive()) {
                returns[index] = (<Button className="mgP-top-theme d-inline-flex" variant="success" size="sm">{make_first_UpperCare(props.src.get_ranting())}</Button>);
            } else {
                returns[index] = (<Button className="mgP-top-theme d-inline-flex" variant="danger" size="sm">{make_first_UpperCare(props.src.get_ranting())}</Button>);
            }
            index = index + 1;
        }
        for (let index1 = 0; index1 < props.src.get_tags().length; index1++) {
            const element = props.src.get_tags()[index1];
            returns[index + index1] = (<Button className="mgP-top-theme d-inline-flex" variant="dark" size="sm">{element.get_name().en}</Button>)
        }
        return returns;
    }
    return (
        <Chakra.Box>
            <Chakra.Box
                backgroundImage={coverQuery.isLoading ?
                    Mangadex_placeHolder : (
                        coverQuery.isError ? Mangadex_cover_not_found : coverQuery.data!.get_Cover_image()
                    )}
                backgroundRepeat={"no-repeat"}
                backgroundPosition={{
                    sm: "0px -5em",
                    md: "center -10em",
                    lg: "center -20em",
                    xl: "center -20em",
                    '2xl': "center -20em",
                }}
                backgroundSize={"cover"}
                borderTopRadius={"10px"}
            >
                <Chakra.Box
                    backdropFilter={"auto"}
                    backdropBlur={"10px"}
                    bgGradient="linear(#FFF 75%)"
                    paddingTop={"10px"}
                >
                    <Container>
                        <Row>
                            <Col xs="3">
                                <Cover_Image_ src={coverQuery.isLoading ?
                                    Mangadex_placeHolder : (
                                        coverQuery.isError ? Mangadex_cover_not_found : coverQuery.data!.get_Cover_image()
                                    )} fallbackElement={Mangadex_placeHolder} />
                            </Col>
                            <Col xs="9" className="overflow-hidden">
                                <Chakra.Box>
                                    <Chakra.Center
                                        display={"block"}
                                    >
                                        <Chakra.Heading
                                            noOfLines={1}
                                            fontFamily={"inherit"}
                                            blendMode={"difference"}
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
                                            noOfLines={0}
                                            fontFamily={"inherit"}
                                            blendMode={"difference"}
                                            size={{
                                                base: "sm",
                                                sm: "md",
                                                md: "lg"
                                            }}
                                        >
                                            {
                                                title_query.isLoading ? <Placeholder md={6}></Placeholder> : (
                                                    title_query.isError ? <ErrorEL1 error={title_query.error} /> : (
                                                        Lang_and_Data.find_data_by_lang2l("en", title_query.data!) instanceof Lang_and_Data ?
                                                            <>{Lang_and_Data.find_data_by_lang2l("en", title_query.data!)!.get_data()}</>
                                                            :
                                                            <>{title_query.data![Math.floor(Math.random() * title_query.data!.length)].get_data()}</>
                                                    )
                                                )
                                            }
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
                                                        manga_statistics.isSuccess ? (
                                                            <Statis src={manga_statistics.data} />
                                                        ) : (
                                                            <></>
                                                        )
                                                    )
                                                )
                                            }
                                        </Chakra.Box>
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
                                            <Chakra.Box>
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
                                                            manga_statistics.isSuccess ? (
                                                                <Statis src={manga_statistics.data} />
                                                            ) : (
                                                                <></>
                                                            )
                                                        )
                                                    )
                                                }
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
            <Chakra.Box>
                {props.children}
            </Chakra.Box>
        </Chakra.Box>
    )
}

// old 
/*
 <Container>
                <Row className=" overflow-hidden h-50 " id="mg-pHeader"  >
                    <React.Suspense fallback={
                        <div id="mg-container-cover">
                            <img src={placeholder} className=" placeholder-active" id="cover-big"/>
                        </div>
                    }>
                        <Await
                            resolve={this.to_use.get_cover_art()}
                            errorElement={
                                <div id="mg-container-cover">
                                    <img src={manga_cover} id="cover-big"/>
                                </div>
                            }
                            children={(getted: Cover) => {
                                return (
                                    <div id="mg-container-cover">
                                        <img src={getted.get_CoverImage()} id="cover-big"/>
                                    </div>
                                )
                            }}
                        />
                    </React.Suspense>
                    <div id="mg-container-content">
                        <Row className="top-100">
                            <Col xs="5" sm="4" md="3" lg="3" xl="3">
                                <React.Suspense fallback={
                                    <Cover_Image_ id="top-cover" state={false} src={placeholder}/>
                                }>
                                    <Await
                                        resolve={this.to_use.get_cover_art()}
                                        errorElement={
                                            <div id="mg-container-cover">
                                                <img src={manga_cover} id="cover-big"/>
                                            </div>
                                        }
                                        children={(getted: Cover) => {
                                            return (
                                                <Cover_Image_ id="top-cover" state={false} src={getted.get_CoverImage()}/>
                                            )
                                        }}
                                    />
                                </React.Suspense>
                            </Col>
                            <Col xs="7" sm="8" md="9" lg="9" xl="9">
                                <Container>
                                    <Row className="mb-xs-1 mb-md-3 mb-lg-5 mb-sm-1">
                                        <Chakra.Heading fontFamily="Poppins" size="2xl" fontWeight="bolder" className="title-bended">{title}</Chakra.Heading>
                                    </Row>
                                    <Row className="mb-lg-5 mb-sm-1">
                                        <React.Suspense fallback={<Placeholder md={6}></Placeholder>}>
                                            <Await
                                                resolve={Lang_and_Data.initializeArrayByAltTitle_obj(this.to_use.get_alt_title())}
                                                errorElement={<div></div>}
                                                children={(getted: Array<Lang_and_Data>) => {
                                                    if(Lang_and_Data.find_data_by_lang2l("en", getted) instanceof Lang_and_Data){
                                                        return (
                                                            <Chakra.Heading fontFamily="Poppins" size="lg" className="title-bended">{Lang_and_Data.find_data_by_lang2l("en", getted)!.get_data()}</Chakra.Heading>
                                                        );
                                                    }else{
                                                        return (
                                                            <Chakra.Heading fontFamily="Poppins" size="lg" className="title-bended">{getted[Math.floor(Math.random() * getted.length)].get_data()}</Chakra.Heading>
                                                        );
                                                    }
                                                }}
                                            />
                                            
                                        </React.Suspense>
                                    </Row>
                                    <Row>
                                        <div className=" d-block h-100" >
                                            <p> </p>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div id="cover-cutter">
                                            <p> </p>
                                        </div>
                                    </Row>
                                    <Row className="mt-1">
                                        <h5>
                                            <React.Suspense fallback={
                                                <Placeholder xs={5}></Placeholder>
                                            }>
                                                <Await
                                                    resolve={this.authors_artists()}
                                                    errorElement={<span></span>}
                                                    children={(getted : Array<React.ReactNode>) => {
                                                        return (
                                                            <>
                                                                {getted}
                                                            </>
                                                        )
                                                    }}
                                                />
                                            </React.Suspense>
                                        </h5>
                                    </Row>
                                    <Row className=" mdP-top-themes mb-1">
                                        <React.Suspense fallback={<Placeholder xs={4}></Placeholder>}>
                                            <Await
                                                resolve={this.build_themes_manga()}
                                                errorElement={<span> </span>}
                                                children={(getted: Array<React.ReactNode>) => {
                                                    return (<Col>{getted}</Col>);
                                                }}
                                            />
                                        </React.Suspense>
                                    </Row>
                                    <Row>
                                        <h6>Publication : {this.get_status_color()} {make_first_UpperCare(this.to_use.get_status())}</h6>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                </div>
            </Row>
            <Row>
                {this.props.children}
            </Row>
        </Container>
*/