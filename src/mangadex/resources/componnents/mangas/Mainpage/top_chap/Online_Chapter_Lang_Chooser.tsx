import * as Chakra from '@chakra-ui/react';
import { Client } from "@tauri-apps/api/http";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import { Accordion, Button, Col, Container, Placeholder, Row, Spinner } from "react-bootstrap";
import { useQuery } from "react-query";
import { Await } from "react-router-dom";
import { useHTTPClient } from "../../../../../../commons-res/components/HTTPClientProvider";
import TryCatch from '../../../../../../commons-res/components/TryCatch';
import { Languages, Lang_and_Data, make_first_UpperCare, MangaLinksData } from "../../../../../api/internal/Utils";
import { Aggregate } from "../../../../../api/structures/Aggregate";
import { Author } from "../../../../../api/structures/Author";
import { Manga } from "../../../../../api/structures/Manga";
import { AggregateListOptions } from '../../../../../api/structures/SearchType/AggregateListOptions';
import { Tag } from "../../../../../api/structures/Tag";
import { get_aggregate_query } from '../../../../hooks/AgreggateStateHooks';
import { get_manga_page_authors_artists } from "../../../../hooks/MangaStateHooks";
import Chapter_Element1_byChapID from "../../../chapter/v1/Chapter_Element1_byChapID";
import ErrorEL1 from "../../../error/ErrorEL1";
import IsPingable from "../../../IsPingable";
import { TagRow } from "../../Mainpage/boutons/tag_boutons";
import { MangaPageProps } from "../../Manga_Page";
import { Aggregate_box, Aggregate_box_reverse } from "../aggregate/Aggregate_box";
import { AuthorCol } from "../boutons/author_boutons";
import { LinksRow } from "../boutons/links_boutons";
import { LAD_Tabs } from "../tabs/Lang_data_tabs";

const Manga_Page_Aggregate = React.lazy(() => import("./Manga_Page_Aggregate"));

export default function Online_Chapter_Lang_Chooser(props: MangaPageProps) {
    const [to_see_lang, setTo_see_lang] = React.useState<string | undefined>(undefined);
    const query = useQuery<Languages, Error>("mdx-lang", () => {
        return Languages.initialize()
    }, {
        staleTime: Infinity
    })
    if (query.isLoading == true && query.isRefetching) {
        return (
            <Chakra.Box m={2} bg="inherit">
                <div className=" text-center">
                    <Spinner
                        animation="border"
                    ></Spinner>
                    <br />
                    <p>Loading chapters ...</p>
                </div>
            </Chakra.Box>
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1
                error={query.error}
            />
        )
    }
    if (query.isSuccess) {
        return (
            <Chakra.Box>
                <Chakra.HStack>
                    <Chakra.Text>Language</Chakra.Text>
                    <Chakra.Menu>
                        <Chakra.MenuButton>
                            <Chakra.Button>{
                                to_see_lang == undefined ? "All" : (
                                    <>
                                        <Chakra.Box height={"fit-content"} className={"fi fi-" + query.data.getLang_byTwo_letter(to_see_lang).get_flag_icon().toLowerCase()} />
                                        {
                                            query.data.getLang_byTwo_letter(to_see_lang).get_name()
                                        }
                                    </>
                                )
                            }
                            </Chakra.Button>
                        </Chakra.MenuButton>
                        <Chakra.MenuList>
                            {
                                props.src.get_avaible_language().map((value) => (
                                    <>
                                        {
                                            value != null || value != undefined ? (
                                                <Chakra.MenuItem
                                                    onClick={() => setTo_see_lang(value)}
                                                >{
                                                        <>
                                                            <Chakra.Box height={"fit-content"} className={"fi fi-" + query.data.getLang_byTwo_letter(value).get_flag_icon().toLowerCase()} />
                                                            {
                                                                query.data.getLang_byTwo_letter(value).get_name()
                                                            }
                                                        </>
                                                    }</Chakra.MenuItem>
                                            ) : (<></>)
                                        }
                                    </>

                                ))
                            }
                        </Chakra.MenuList>
                    </Chakra.Menu>
                </Chakra.HStack>
                <Chakra.Box>
                    <React.Suspense
                        fallback={
                            <Chakra.Box m={2} bg="inherit">
                                <div className=" text-center">
                                    <Spinner
                                        animation="border"
                                    ></Spinner>
                                    <br />
                                    <p>Loading chapters ...</p>
                                </div>
                            </Chakra.Box>
                        }
                    >
                        <Manga_Page_Aggregate
                            src={props.src}
                            to_see_lang={to_see_lang == undefined ? undefined : [to_see_lang]}
                        />
                    </React.Suspense>
                </Chakra.Box>
            </Chakra.Box>
        )
    }
    return (
        <Chakra.Box m={2} bg="inherit">
            <div className=" text-center">
                <Spinner
                    animation="border"
                ></Spinner>
                <br />
                <p>Loading chapters ...</p>
            </div>
        </Chakra.Box>
    )
}
