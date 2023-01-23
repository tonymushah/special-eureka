import React from "react";
import ReactDOM from "react-dom/client";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import "flag-icons/css/flag-icons.min.css";
import "font-awesome/css/font-awesome.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaDiscord, FaUsers } from "react-icons/fa";
import {

    QueryClient,

    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient
} from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Group, Group_WithAllRelationShip } from "../../mangadex/api/structures/Group";

import { writeText } from '@tauri-apps/api/clipboard';
import { get_manga_listBy_chapter_array, ContentRating, Lang_and_Data, make_first_UpperCare, Offset_limits, get_MangaChapter_Accordions_byChapterArray, Order, Asc_Desc } from "../../mangadex/api/internal/Utils";
import { Collection } from "../../mangadex/api/structures/Collection";
import { Manga } from "../../mangadex/api/structures/Manga";
import { CollectionComponnent_WithQuery } from "../../mangadex/resources/componnents/Collection/Collection";
import ErrorEL1 from "../../mangadex/resources/componnents/error/ErrorEL1";
import MangaElementDef from "../../mangadex/resources/componnents/mangas/v1/MangaElementDef";
import WaveHaikei from "./imgs/wave-haikei-1.svg";
import test_group from "./test_groups/ab24085f-b16c-4029-8c05-38fe16592a85_all_includes.json";
import CoverImageByCoverID from "../../mangadex/resources/componnents/covers/v1/CoverImageByCoverID";
import MangaTitle from "../../mangadex/resources/componnents/mangas/v1/MangaTitle";
import { Statistics_Manga } from "../../mangadex/api/structures/Statistics";
import { Statis } from "../../mangadex/resources/componnents/mangas/Manga_Page";
import TryCatch from "../../commons-res/components/TryCatch";
import * as ChakraIcons from "@chakra-ui/icons";
import { NumericFormat } from "react-number-format";
import * as FontAwesome from "react-icons/fa";
import ReactContextMenu from "react-jsx-context-menu"
import { Link } from "react-router-dom";
import MangaElementDef2_withID from "../../mangadex/resources/componnents/mangas/v1/MangaElementDef2_withID";
import MangaFallback2 from "../../mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import MangaElementFallback from "../../mangadex/resources/componnents/mangas/v1/MangaElementFallback";
import MangaVerticalElementFallback from "../../mangadex/resources/componnents/mangas/v1/MangaVerticalElementFallback";
import AllDownlaodedMangaConsumer from "../../mangadex/resources/componnents/download/All_downloaded_Manga_Consumer";
import MangaElementDef_wID from "../../mangadex/resources/componnents/mangas/v1/MangaElementDef_wID";
import MangaVerticalElement_wID from "../../mangadex/resources/componnents/mangas/v1/MangaVerticalElement_wID";
import MangaListByArrayMangaID from "../../mangadex/resources/componnents/mangas/v1/MangaListByArrayMangaID";
import MangaList from "../../mangadex/resources/componnents/mangas/v1/MangaList";

import TestCollection from "./test_collections/test_collection2.json";
import { Chapter } from "../../mangadex/api/structures/Chapter";
import Group_Page from "../../mangadex/resources/componnents/groups/Group_Page";

const Group_Search = React.lazy(() => import("../../mangadex/resources/componnents/groups/Group_Search"));

const JsonViewer = React.lazy(async () => {
    let res = await import("@textea/json-viewer");
    return {
        default: res.JsonViewer
    }
})

const MangaChapterAccordion_Element = React.lazy(() => import("../../mangadex/resources/componnents/mangas/v1/MangaChapterAccordion_Element"));


const ExtLink = React.lazy(async () => {
    let res = await import("../../commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
})
const ReactMarkDown = React.lazy(() => import("react-markdown"));

function build_test_chapter_array(): Array<Chapter> {
    let data: Array<Chapter> = [];
    for (let index = 0; index < TestCollection.data.length; index++) {
        const element = TestCollection.data[index];
        data[index] = Chapter.build_W_Any(element)
    }
    return data;
}

const queryClient = new QueryClient();
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
//const id_toUse = "4be9338a-3402-4f98-b467-43fb56663927";
const to_use_group = Group_WithAllRelationShip.build_wANY(test_group.data[0]);

const to_use_manga = "87ffa375-bd2c-49ba-ba0c-6d78ea07c342";

const offset_Limits_ = new Offset_limits();
offset_Limits_.set_limits(25);


test_area.render(
    <Chakra.ChakraProvider >
        <QueryClientProvider
            client={queryClient}
        >
            <ReactQueryDevtools
                initialIsOpen={false}
            />
            <Chakra.Box
                margin={10}
            >
                {/* <TryCatch
                    catch={(error) => (
                        <Chakra.Alert>
                            <Chakra.AlertIcon />
                            <Chakra.AlertTitle>{error.message}</Chakra.AlertTitle>
                            <Chakra.AlertDescription>{error.stack}</Chakra.AlertDescription>
                        </Chakra.Alert>
                    )}
                >
                    <AllDownlaodedMangaConsumer>
                        {
                            (value: Array<string>) => (
                                <MangaListByArrayMangaID src={value} />
                            )
                        }
                    </AllDownlaodedMangaConsumer>
                </TryCatch>

                   
                    <MangaElementDef2_withID mangaID={to_use_manga} />
                    */}

                <TryCatch
                    catch={(error) => (
                        <Chakra.Alert>
                            <Chakra.AlertIcon />
                            <Chakra.AlertTitle>
                                {
                                    error.name
                                }
                            </Chakra.AlertTitle>
                            <Chakra.AlertDescription>
                                {
                                    error.message
                                }
                            </Chakra.AlertDescription>
                        </Chakra.Alert>
                    )}
                >
                    <React.Suspense
                        fallback={
                            <Chakra.Box>
                                <Chakra.Center>
                                    <Chakra.Spinner/>
                                </Chakra.Center>
                            </Chakra.Box>
                        }
                    >
                        <Group_Search
                        offset_limits={offset_Limits_}
                    />
                    </React.Suspense>
                </TryCatch>


            </Chakra.Box>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
);
/**/