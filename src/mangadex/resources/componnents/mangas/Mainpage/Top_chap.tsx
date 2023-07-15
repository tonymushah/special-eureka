import * as Chakra from "@chakra-ui/react";
import MangaStatus from "@mangadex/api/enums/MangaStatus";
import { Lang_and_Data, MangaLinksData, make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Tag } from "@mangadex/api/structures/Tag";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Await } from "react-router-dom";
import { TagRow } from "../Mainpage/boutons/tag_boutons";
import { MangaPageProps } from "../Manga_Page";
import { LinksRow } from "./boutons/links_boutons";
import Loading from "./loading";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";

const Aggregate_Chapters = React.lazy(() => import("./top_chap/Aggregate_Chapters"));

const CollapseHeight = React.lazy(() => import("./top_chap/CollapseHeight"));

const Author_Artists = React.lazy(() => import("./top_chap/Author_Artists"));

const Top_Chaps_Desc_Part = React.lazy(() => import("./top_chap/Top_Chaps_Desc_Part"));

export function Top_Chaps(props: MangaPageProps) {
    const build_altTitle = React.useCallback(async () => {
        const altTitle_inLang: Array<Lang_and_Data> = await Lang_and_Data.initializeArrayByAltTitle_obj(props.src.get_alt_title());
        const returns: Array<React.ReactNode> = Array<React.ReactNode>(altTitle_inLang.length);
        for (let index = 0; index < altTitle_inLang.length; index++) {
            const element = altTitle_inLang[index];
            returns[index] = (
                <Chakra.Box>
                    <Chakra.Tooltip
                        hasArrow
                        label={element.get_language().get_name()}
                    >
                        <span className={"fi fi-" + element.get_language().get_flag_icon().toLowerCase()}></span>
                    </Chakra.Tooltip>
                    &nbsp;
                    {element.get_data()}
                </Chakra.Box>);
        }
        return returns;
    }, [props.src]);
    const links = React.useMemo(() => {
        try {
            return MangaLinksData.build_wAny(props.src.get_links());
            // eslint-disable-next-line no-empty
        } catch (error) {
            return null;
        }
    }, [props.src]);
    return (
        <Chakra.Box>

            <Chakra.Box>

                <Chakra.Box>
                    <React.Suspense
                        fallback={
                            <Chakra.Box m={2} bg="inherit">
                                <Loading />
                            </Chakra.Box>
                        }
                    >
                        <Top_Chaps_Desc_Part src={props.src} />
                    </React.Suspense>
                </Chakra.Box>
            </Chakra.Box>
            <Chakra.Grid templateColumns={"repeat(12, 1fr)"} className="mg-top-content">
                <React.Suspense
                    fallback={<Chakra.Alert status="loading">
                        <Chakra.AlertIcon />
                        <Chakra.AlertTitle>Loading...</Chakra.AlertTitle>
                    </Chakra.Alert>}
                >

                    <Chakra.GridItem
                        colSpan={{
                            base: 12,
                            md: 4,
                            lg: 4
                        }}
                    >
                        <CollapseHeight>
                            <Chakra.Wrap spacingX={{
                                lg: 2
                            }}>
                                <Chakra.WrapItem>
                                    <React.Suspense
                                        fallback={
                                            <Chakra.Box m={2} bg="inherit">
                                                <Chakra.Alert status="loading" variant="left-accent">
                                                    <Chakra.AlertIcon />
                                                    <Chakra.AlertTitle>Loading Author and Artists...</Chakra.AlertTitle>
                                                </Chakra.Alert>
                                            </Chakra.Box>
                                        }
                                    >
                                        <Author_Artists src={props.src} />
                                    </React.Suspense>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <React.Fragment>
                                        <React.Suspense fallback={
                                            <Chakra.Alert status="loading" variant="left-accent">
                                                <Chakra.AlertIcon />
                                                <Chakra.AlertTitle>Loading Genre...</Chakra.AlertTitle>
                                            </Chakra.Alert>
                                        }>
                                            {
                                                <TagRow title="Genre" src={props.src.get_genre()} />
                                            }
                                        </React.Suspense>
                                    </React.Fragment>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <React.Fragment>
                                        <React.Suspense fallback={
                                            <Chakra.Alert status="loading" variant="left-accent">
                                                <Chakra.AlertIcon />
                                                <Chakra.AlertTitle>Loading Theme...</Chakra.AlertTitle>
                                            </Chakra.Alert>
                                        }>
                                            <Await
                                                resolve={props.src.get_async_theme()}
                                                errorElement={
                                                    <React.Fragment>
                                                    </React.Fragment>
                                                }
                                            >
                                                {(getted: Array<Tag>) => {
                                                    return (<TagRow title="Theme" src={getted} />);
                                                }}
                                            </Await>
                                        </React.Suspense>
                                    </React.Fragment>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <React.Fragment>
                                        <React.Suspense fallback={
                                            <Chakra.Alert status="loading" variant="left-accent">
                                                <Chakra.AlertIcon />
                                                <Chakra.AlertTitle>Loading format...</Chakra.AlertTitle>
                                            </Chakra.Alert>
                                        }>
                                            <Await
                                                resolve={props.src.get_async_format()}
                                                errorElement={<div> </div>}
                                            >
                                                {(getted: Array<Tag>) => {
                                                    return (<TagRow title="Format" src={getted} />);
                                                }}
                                            </Await>
                                        </React.Suspense>
                                    </React.Fragment>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <React.Fragment>
                                        <React.Suspense fallback={
                                            <Chakra.Alert status="loading" variant="left-accent">
                                                <Chakra.AlertIcon />
                                                <Chakra.AlertTitle>Loading Content...</Chakra.AlertTitle>
                                            </Chakra.Alert>
                                        }>
                                            <Await
                                                resolve={props.src.get_async_content}
                                                errorElement={<div> </div>}
                                            >
                                                {(getted: Array<Tag>) => {
                                                    return (<TagRow title="Content" src={getted} />);
                                                }}
                                            </Await>
                                        </React.Suspense>
                                    </React.Fragment>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    {
                                        props.src.get_demographic() != null ? (
                                            <Chakra.Box>
                                                <Chakra.Heading fontFamily={"inherit"} size={"md"}>Demographics</Chakra.Heading>
                                                <Chakra.Wrap>
                                                    <Chakra.WrapItem>
                                                        <Chakra.Button
                                                            style={{
                                                                fontWeight: "800"
                                                            }}
                                                            className="m-1" variant={"solid"} colorScheme={"blackAlpha"} size="sm">{make_first_UpperCare(props.src.get_demographic()!)}</Chakra.Button>
                                                    </Chakra.WrapItem>
                                                </Chakra.Wrap>
                                            </Chakra.Box>
                                        ) : (
                                            <React.Fragment />
                                        )
                                    }
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <React.Fragment>
                                        {
                                            links == null ? (<React.Fragment></React.Fragment>) : (<LinksRow src={links.read_or_buy()} title="Read or Buy" />)
                                        }
                                    </React.Fragment>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <React.Fragment>
                                        {
                                            links == null ? (<React.Fragment></React.Fragment>) : (<LinksRow src={links.track()} title="Track" />)
                                        }
                                    </React.Fragment>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <Chakra.Box>
                                        <Chakra.Heading fontFamily={"inherit"} size={"md"}>Atlernative Titles</Chakra.Heading>
                                        <React.Suspense fallback={
                                            <MangadexSpinner />
                                        }>
                                            <Await
                                                resolve={build_altTitle()}
                                                errorElement={<React.Fragment> </React.Fragment>}
                                            >
                                                {(getted: Array<React.ReactNode>) => {
                                                    return (
                                                        <React.Fragment>
                                                            {getted}
                                                        </React.Fragment>
                                                    );
                                                }}
                                            </Await>
                                        </React.Suspense>
                                    </Chakra.Box>
                                </Chakra.WrapItem>
                                <Chakra.WrapItem>
                                    <Chakra.Box>
                                        {
                                            props.src.get_status_enum() == MangaStatus.completed ? (
                                                <React.Fragment>
                                                    <Chakra.Text fontWeight={"bold"}>Latest Chapter : Volume {
                                                        props.src.get_last_volume() ?? "none"
                                                    } Chapter {
                                                            props.src.get_last_chapter() ?? "none"
                                                        }
                                                    </Chakra.Text>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment />
                                            )
                                        }
                                    </Chakra.Box>
                                </Chakra.WrapItem>
                            </Chakra.Wrap>
                        </CollapseHeight>
                    </Chakra.GridItem>
                </React.Suspense>
                <Chakra.GridItem
                    colSpan={{
                        base: 12,
                        sm: 12,
                        md: 8,
                        lg: 8
                    }}
                    display={{
                        sm: "block"
                    }}
                >
                    <React.Suspense
                        fallback={
                            <Chakra.Alert status="loading">
                                <Chakra.AlertIcon />
                                <Chakra.AlertTitle>Loading...</Chakra.AlertTitle>
                            </Chakra.Alert>
                        }
                    >
                        <Aggregate_Chapters src={props.src} />
                    </React.Suspense>
                </Chakra.GridItem>
            </Chakra.Grid>
        </Chakra.Box>
    );
}
