import * as Chakra from "@chakra-ui/react";
import MangaStatus from "@mangadex/api/enums/MangaStatus";
import { Lang_and_Data, MangaLinksData, make_first_UpperCare } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { Tag } from "@mangadex/api/structures/Tag";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Await } from "react-router-dom";
import { TagRow } from "../Mainpage/boutons/tag_boutons";
import { MangaPageProps } from "../Manga_Page";
import { LinksRow } from "./boutons/links_boutons";

const Aggregate_Chapters = React.lazy(() => import("./top_chap/Aggregate_Chapters"));

const CollapseHeight = React.lazy(() => import("./top_chap/CollapseHeight"));

const Author_Artists = React.lazy(() => import("./top_chap/Author_Artists"));

const Top_Chaps_Desc_Part = React.lazy(() => import("./top_chap/Top_Chaps_Desc_Part"));

export class Top_Chaps extends React.Component<MangaPageProps>{
    private to_use: Manga;
    //private _cover: Cover;
    public constructor(props: MangaPageProps) {
        super(props);
        this.to_use = this.props.src;
    }
    public async build_altTitle(): Promise<Array<React.ReactNode>> {
        const altTitle_inLang: Array<Lang_and_Data> = await Lang_and_Data.initializeArrayByAltTitle_obj(this.to_use.get_alt_title());
        const returns: Array<React.ReactNode> = Array<React.ReactNode>(altTitle_inLang.length);
        for (let index = 0; index < altTitle_inLang.length; index++) {
            const element = altTitle_inLang[index];
            returns[index] = (
                <span>
                    <Chakra.Tooltip
                        hasArrow
                        label={element.get_language().get_name()}
                    >
                        <span className={"fi fi-" + element.get_language().get_flag_icon().toLowerCase()}></span>
                    </Chakra.Tooltip>
                    &nbsp;
                    {element.get_data()}
                </span>);
        }
        return returns;
    }
    public render(): React.ReactNode {
        let links: MangaLinksData | null = null;
        try {
            links = MangaLinksData.build_wAny(this.to_use.get_links());
            // eslint-disable-next-line no-empty
        } catch (error) { }

        return (
            <Chakra.Box>

                <Chakra.Box className="mg-top-content">

                    <Chakra.Box>
                        <React.Suspense
                            fallback={
                                <Chakra.Box m={2} bg="inherit">
                                    <div className=" text-center">
                                        <Chakra.Spinner
                                            animation="border"
                                        />
                                        <br />
                                        <p>Loading Description...</p>
                                    </div>
                                </Chakra.Box>
                            }
                        >
                            <Top_Chaps_Desc_Part src={this.to_use} />
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
                        <CollapseHeight>
                            <Chakra.GridItem
                                display={{
                                    base: "none",
                                    sm: "block"
                                }}
                                colSpan={{
                                    md: 4,
                                    lg: 4
                                }}
                            >
                                <Chakra.VStack>
                                    <React.Suspense
                                        fallback={
                                            <Chakra.Box m={2} bg="inherit">
                                                <div className=" text-center">
                                                    <Chakra.Spinner
                                                        animation="border"
                                                    />
                                                    <br />
                                                    <p>Loading Authors ...</p>
                                                </div>
                                            </Chakra.Box>
                                        }
                                    >
                                        <Author_Artists src={this.to_use} />
                                    </React.Suspense>
                                    <React.Fragment>
                                        <React.Suspense fallback={
                                            <Chakra.Box>
                                            </Chakra.Box>
                                        }>
                                            <Await
                                                resolve={this.to_use.get_async_genre()}
                                                errorElement={<div> </div>}
                                            >
                                                {(getted: Array<Tag>) => {
                                                    return (<TagRow title="Genre" src={getted} />);
                                                }}
                                            </Await>
                                        </React.Suspense>
                                    </React.Fragment>
                                    <React.Fragment>
                                        <React.Suspense fallback={
                                            <Chakra.Box>
                                            </Chakra.Box>
                                        }>
                                            <Await
                                                resolve={this.to_use.get_async_theme()}
                                                errorElement={
                                                    <React.Fragment>
                                                        <div> </div>
                                                    </React.Fragment>
                                                }
                                            >
                                                {(getted: Array<Tag>) => {
                                                    return (<TagRow title="Theme" src={getted} />);
                                                }}
                                            </Await>
                                        </React.Suspense>
                                    </React.Fragment>
                                    <React.Fragment>
                                        <React.Suspense fallback={
                                            <Chakra.Box>
                                            </Chakra.Box>
                                        }>
                                            <Await
                                                resolve={this.to_use.get_async_format()}
                                                errorElement={<div> </div>}
                                            >
                                                {(getted: Array<Tag>) => {
                                                    return (<TagRow title="Format" src={getted} />);
                                                }}
                                            </Await>
                                        </React.Suspense>
                                    </React.Fragment>
                                    <React.Fragment>
                                        <React.Suspense fallback={
                                            <Chakra.Box>
                                            </Chakra.Box>
                                        }>
                                            <Await
                                                resolve={this.to_use.get_async_content()}
                                                errorElement={<div> </div>}
                                            >
                                                {(getted: Array<Tag>) => {
                                                    return (<TagRow title="Content" src={getted} />);
                                                }}
                                            </Await>
                                        </React.Suspense>
                                    </React.Fragment>
                                    {
                                        this.to_use.get_demographic() != null ? (
                                            <Chakra.Box>
                                                <h5>Demographics</h5>
                                                <Chakra.Wrap>
                                                    <Chakra.WrapItem>
                                                        <Chakra.Button
                                                            style={{
                                                                fontWeight: "800"
                                                            }}
                                                            className="m-1" variant={"solid"} colorScheme={"blackAlpha"} size="sm">{make_first_UpperCare(this.to_use.get_demographic()!)}</Chakra.Button>
                                                    </Chakra.WrapItem>
                                                </Chakra.Wrap>
                                            </Chakra.Box>
                                        ) : (
                                            <React.Fragment />
                                        )
                                    }

                                    <React.Fragment>
                                        {
                                            links == null ? (<React.Fragment></React.Fragment>) : (<LinksRow src={links.read_or_buy()} title="Read or Buy" />)
                                        }
                                    </React.Fragment>
                                    <React.Fragment>
                                        {
                                            links == null ? (<React.Fragment></React.Fragment>) : (<LinksRow src={links.track()} title="Track" />)
                                        }
                                    </React.Fragment>
                                    <Chakra.Box>
                                        <h5>Atlernative Titles</h5>
                                        <React.Suspense fallback={
                                            <Chakra.Spinner animation="border"/>
                                        }>
                                            <Await
                                                resolve={this.build_altTitle()}
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
                                    <Chakra.Box>
                                        {
                                            this.props.src.get_status_enum() == MangaStatus.completed ? (
                                                <React.Fragment>
                                                    <Chakra.Text fontWeight={"bold"}>Latest Chapter : Volume {
                                                        this.props.src.get_last_volume() ?? "none"
                                                    } Chapter {
                                                            this.props.src.get_last_chapter() ?? "none"
                                                        }
                                                    </Chakra.Text>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment></React.Fragment>
                                            )
                                        }
                                    </Chakra.Box>
                                </Chakra.VStack>
                            </Chakra.GridItem>
                        </CollapseHeight>
                    </React.Suspense>
                    <Chakra.GridItem 
                        colSpan={{
                            base : 12,
                            sm : 12,
                            md : 8,
                            lg : 8
                        }}
                        display={{
                            sm : "block"
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
                            <Aggregate_Chapters src={this.props.src} />
                        </React.Suspense>
                    </Chakra.GridItem>
                </Chakra.Grid>
            </Chakra.Box>
        );
    }
}