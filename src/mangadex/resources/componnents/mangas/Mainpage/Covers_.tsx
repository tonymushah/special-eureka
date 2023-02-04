import React, { useState } from "react";
import Viewer from 'react-viewer';
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../../../api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga } from "../../../../api/structures/Manga";
import { Accordion, Tabs, Tab, Overlay, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse, Placeholder } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
import { Alt_title, Author_Artists, Lang_and_Data, Languages, Lang, make_first_UpperCare, Offset_limits } from "../../../../api/internal/Utils";
import { Cover } from "../../../../api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../../../api/structures/Author";
import { Cover_Image_, Cover_Image_2 } from "../Mainpage/Image_";
import * as Chakra from "@chakra-ui/react";
import { Volume_ } from "./aggregate/Volume";
import "flag-icons/css/flag-icons.min.css";
import { Await } from "react-router-dom";
import { TagRow, TagButton } from "../Mainpage/boutons/tag_boutons";
import { Tag } from "../../../../api/structures/Tag";
import { AuthorCol } from "./boutons/author_boutons";
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";
import { CollectionComponnent_WithQuery } from "../../Collection/Collection";
import CoverImage from "../../covers/v1/CoverImage";
import { Skeleton } from "@chakra-ui/react";

const Cover_Plus_Zoom = React.lazy(() => import("../../covers/utils/Cover_Plus_Zoom"));

type MangaPageProps = {
    src: Manga
}

export function Covers_Manga(props: MangaPageProps) {
    const client = useHTTPClient();
    const offset_limits = new Offset_limits();
    const queryKey = "mdx-manga:" + props.src.get_id() + "-covers";
    offset_limits.set_limits(25);
    return (
        <CollectionComponnent_WithQuery<Cover>
            fn={() => {
                return Cover.search({
                    offset_Limits: offset_limits,
                    mangaIDs: [
                        props.src.get_id()
                    ],
                    client: client
                })
            }}
            queryKey={queryKey}
            query_options={{
                staleTime: 1000 * 60 * 5
            }}
            onLoading={
                <Chakra.Box
                    width={"full"}
                    height={"100vh"}
                >
                    <Chakra.Center>
                        <Chakra.Spinner
                            size={"lg"}
                            thickness={"2px"}
                            color={"orange"}
                        />
                    </Chakra.Center>
                </Chakra.Box>
            }
        >
            {(getted_collection) => (
                <Chakra.Wrap>
                    {
                        getted_collection.get_data().map((value) => (
                            <Chakra.WrapItem
                                padding={"10px"}
                                width={"10em"}
                            >
                                <Chakra.Card
                                    border={"1px"}
                                    borderColor={"black"}
                                >
                                    <CoverImage
                                        isThumbail={true}
                                        size={256}
                                        src={value}
                                    />
                                </Chakra.Card>
                            </Chakra.WrapItem>
                        ))
                    }
                </Chakra.Wrap>
            )}
        </CollectionComponnent_WithQuery>
    )
}