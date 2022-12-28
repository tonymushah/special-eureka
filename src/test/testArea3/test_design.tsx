import React from "react";
import ReactDOM from "react-dom/client";
import { Manga } from "../../mangadex/api/structures/Manga";
//import MangaList from "../../mangadex/api/tsx/MangaList";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import "font-awesome/css/font-awesome.css";
import {

    QueryClient,

    QueryClientProvider, useQuery
} from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import { Await, useAsyncError } from "react-router-dom";
import Timeago from "react-timeago";
import { Autoplay, FreeMode, Mousewheel, Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Lang } from "../../mangadex/api/internal/Utils";
import { Chapter } from "../../mangadex/api/structures/Chapter";
import { Group } from "../../mangadex/api/structures/Group";
import { List } from "../../mangadex/api/structures/List";
import { User } from "../../mangadex/api/structures/User";
import { ErrorELAsync1 } from "../../mangadex/resources/componnents/Error_cmp";
import MangaElementDef_wID from "../../mangadex/resources/componnents/mangas/v1/MangaElementDef_wID";
import MangaElementFallback from "../../mangadex/resources/componnents/mangas/v1/MangaElementFallback";
import Mangadex_placeHolder from "../../mangadex/resources/imgs/cover-placeholder.png";
import MangaElementDef_WChildren from "../../mangadex/resources/componnents/mangas/v1/MangaElementDef_WChildren";
import Chapter_Element1 from "../../mangadex/resources/componnents/chapter/v1/Chapter_Element1";
import MangaFeedElement_byChapID from "../../mangadex/resources/componnents/chapter/v1/MangaFeedElement_byChapID";
import ErrorEL1 from "../../mangadex/resources/componnents/error/ErrorEL1";
import MangaSwipper from "../../mangadex/resources/componnents/chapter/v1/MangaSwipper";

function MangaWarpW_idList(props : {
    mangaIDarray: Array<string>
}){
    return(
        <Chakra.Wrap>
            {
                props.mangaIDarray.map((value : string) => (
                    <Chakra.WrapItem>
                        <MangaElementDef_wID
                            mangaID={value}
                        />
                    </Chakra.WrapItem>
                ))
            }
        </Chakra.Wrap>
    )
}

function MangaWarpW_manga(props : {
    mangaIDarray: Array<Manga>
}){
    return(
        <Chakra.Wrap>
            {
                props.mangaIDarray.map((value : Manga) => (
                    <Chakra.WrapItem>
                        <MangaElementDef src={value}/>
                    </Chakra.WrapItem>
                ))
            }
        </Chakra.Wrap>
    )
}

function All_downloaded_chapter() {
    return (
        <React.Suspense
            fallback={
                <Chakra.Center>
                    <Chakra.Spinner />
                </Chakra.Center>
            }
        >
            <Await
                resolve={Chapter.getAll_downloaded_chap()}
                errorElement={<ErrorELAsync1 />}
            >
                {
                    (getted: Array<string>) => {
                        return (
                            <Chakra.Wrap>
                                {
                                    getted.map((value: string) => (
                                        <Chakra.WrapItem>
                                            <MangaFeedElement_byChapID id={value}/>
                                        </Chakra.WrapItem>
                                    ))
                                }
                            </Chakra.Wrap>
                        );
                    }
                }
            </Await>
        </React.Suspense>
    );
}

function LongStrip(props: {
    chapID: string,
    src: Array<string>,
}) {
    return (
        <Chakra.Box>
            <Chakra.Box
            >
                {
                    props.src.map((value: string, index: number) => (
                        <Chakra.Box
                            id={"page_nb" + index}
                        >
                            <React.Suspense
                                fallback={
                                    <Chakra.Box
                                        margin={"15em"}
                                    >
                                        <Chakra.Center>
                                            <Chakra.Spinner
                                                thickness='10px'
                                                speed='0.65s'
                                                emptyColor='gray.200'
                                                color='orange.500'
                                                size='xl'
                                            />
                                        </Chakra.Center>
                                    </Chakra.Box>
                                }
                            >
                                <Await
                                    resolve={Chapter.getAOfflineChapter_Data_Image(props.chapID, value)}
                                    errorElement={<ErrorELAsync1 />}
                                >
                                    {
                                        (getted_value: string) => (
                                            <Chakra.Image
                                                fallback={
                                                    <Chakra.Box
                                                        margin={"15em"}
                                                    >
                                                        <Chakra.Center>
                                                            <Chakra.Spinner
                                                                thickness='10px'
                                                                speed='0.65s'
                                                                emptyColor='gray.200'
                                                                color='orange.500'
                                                                size='xl'
                                                            />
                                                        </Chakra.Center>
                                                    </Chakra.Box>
                                                }
                                                src={getted_value}
                                            />
                                        )
                                    }
                                </Await>
                            </React.Suspense>
                        </Chakra.Box>
                    ))
                }
            </Chakra.Box>
        </Chakra.Box>
    )
}

function Offline_Chapter_reading(props: {
    chapter: Chapter
}) {
    const [position, setPosition] = React.useState(0);
    const page_numbers = props.chapter.get_pages();
    function move_to_page(page_number: number) {
        document.getElementById("page_nb" + page_number)!.scrollIntoView();
        setPosition(page_number);
    }
    return (
        <Chakra.Box
        >

            <React.Suspense
                fallback={
                    <Chakra.Center>
                        <Chakra.Spinner
                            thickness='10px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='orange.500'
                            size='xl'
                        />
                    </Chakra.Center>
                }
            >
                <Await
                    resolve={Chapter.getAOfflineChapter_Data(props.chapter.get_id())}
                    errorElement={<ErrorELAsync1 />}
                >
                    {(getted: Array<string>) => {
                        return (
                            <>
                                <LongStrip
                                    chapID={props.chapter.get_id()}
                                    src={getted}
                                />
                            </>
                        )
                    }}
                </Await>
            </React.Suspense>
        </Chakra.Box>
    );
}

function Test_Chapter_Reading() {
    return (
        <React.Suspense
            fallback={
                <Chakra.Center>
                    <Chakra.Spinner
                        thickness='10px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='orange.500'
                        size='xl'
                    />
                </Chakra.Center>
            }
        >
            <Await
                resolve={Chapter.getAOfflineChapter(id_toUse)}
                errorElement={<ErrorELAsync1 />}
            >
                {(getted: Chapter) => {
                    return (
                        <Chakra.Box>
                            <Offline_Chapter_reading chapter={getted} />
                        </Chakra.Box>
                    )
                }}
            </Await>
        </React.Suspense>
    )
}

const customTheme = Chakra.extendTheme({
    semanticTokens: {
        colors: {
            error: 'red.500',
            text: {
                default: 'gray.900',
                _dark: 'gray.50',
            },
        },
    },
})

const queryClient = new QueryClient();
const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
const id_toUse = "4be9338a-3402-4f98-b467-43fb56663927";
test_area.render(
    <Chakra.ChakraProvider theme={customTheme}>
        <QueryClientProvider
            client={queryClient}
        >
            <ReactQueryDevtools
                initialIsOpen={false}
            />
                <Chakra.Box
                    margin={10}
                >
                    <All_downloaded_chapter/>
                </Chakra.Box>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
);
