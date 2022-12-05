import React from "react";
import ReactDOM from "react-dom/client";
import { Api_Request, Api_RequestERROR } from "../../mangadex/api/internal/Api_Request"
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { Body } from "@tauri-apps/api/http";
import { Manga, Manga_with_allRelationship } from "../../mangadex/api/structures/Manga";
//import MangaList from "../../mangadex/api/tsx/MangaList";
import { Accordion, Spinner, Button, ButtonGroup, Card, CardGroup, Container, ProgressBar, Row, Col, Collapse } from "react-bootstrap";
import * as FontAwesome from "@fortawesome/react-fontawesome";
//import El_Manga_simple2 from "../../mangadex/api/tsx/Manga2";
import { Alt_title, Author_Artists, Lang_and_Data, Offset_limits } from "../../mangadex/api/internal/Utils";
import { Cover } from "../../mangadex/api/structures/Cover";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Author } from "../../mangadex/api/structures/Author";
import "font-awesome/css/font-awesome.css"
import { Chapter } from "../../mangadex/api/structures/Chapter";
import * as Chakra from "@chakra-ui/react";
import { Chapter_page } from "./Chapter_page";
import { Await, useAsyncError } from "react-router-dom";
import { ErrorELAsync, ErrorELAsync1, ErrorELAsyncWithStack } from "../../mangadex/resources/componnents/Error_cmp";
import * as ChakraIcon from "@chakra-ui/icons";
import Mangadex_placeHolder from "../../mangadex/resources/imgs/cover-placeholder.png";
import Mangadex_cover_not_found from "../../mangadex/resources/imgs/cover-not-found.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination, FreeMode } from "swiper";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
function ErrorEL(props) {
    let error: any = useAsyncError();
    return (
        <Chakra.Alert status="error">
            <Chakra.AlertIcon></Chakra.AlertIcon>
            <Chakra.AlertTitle>We caught some error</Chakra.AlertTitle>
            <Chakra.AlertDescription>{error.message}</Chakra.AlertDescription>
        </Chakra.Alert>
    )
}



function MangaElementFallback() {
    return (
        <Chakra.Box
            width={"fit-content"}
            backgroundColor={"gray.100"}
            borderRadius={"10px"}
        >
            <Chakra.Center>
                <Chakra.Box
                    display={
                        {
                            base: "inline-block",
                            md: "none"
                        }
                    }
                    width={"150px"}
                >
                    <Chakra.Skeleton
                        borderTopRadius={"10px"}
                        height={"150px"}
                    />
                    <Chakra.Skeleton
                        borderBottomRadius={"10px"}
                    >
                        <Chakra.Center>
                            <Chakra.Heading
                                //textAlign={"center"}
                                size={"md"}
                                noOfLines={2}
                                margin={"15px"}
                            >
                                Loading...
                            </Chakra.Heading>
                        </Chakra.Center>
                    </Chakra.Skeleton>
                </Chakra.Box>
                <Chakra.Skeleton
                    borderRadius={"10px"}
                >
                    <Chakra.Box
                        width={"fit-content"}
                        display={
                            {
                                base: "none",
                                md: "inline-block"
                            }
                        }
                    >
                        <Chakra.Grid
                            width={{
                                base: "400px"
                            }}
                            templateRows='repeat(3)'
                            templateColumns='repeat(12, 1fr)'
                            columnGap={3}
                            rowGap={1}
                            paddingRight={"10px"}
                        >
                            <Chakra.GridItem
                                rowSpan={2}
                                colSpan={4}
                            >
                                <Chakra.Skeleton
                                    borderTopLeftRadius={"10px"}
                                    borderBottomLeftRadius={"10px"}
                                    height={"full"}
                                />
                            </Chakra.GridItem>
                            <Chakra.GridItem
                                rowSpan={1}
                                colSpan={8}
                            >
                                <Chakra.Heading
                                    noOfLines={2}
                                    marginTop={"5px"}
                                    size={
                                        {
                                            base: "lg",
                                            lg: "lg"
                                        }
                                    }
                                > Loading </Chakra.Heading>
                            </Chakra.GridItem>
                            <Chakra.GridItem
                                rowSpan={1}
                                colSpan={8}
                            >
                                <Chakra.Text
                                    noOfLines={3}
                                    marginBottom={"5px"}
                                >
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi ipsum molestias fuga officia earum eaque, perspiciatis molestiae illo soluta placeat quisquam? Omnis, quasi necessitatibus dolore eaque incidunt enim doloribus ea.
                                </Chakra.Text>
                            </Chakra.GridItem>
                        </Chakra.Grid>
                    </Chakra.Box>
                </Chakra.Skeleton>
            </Chakra.Center >
        </Chakra.Box >
    )
}

function MangaElement() {
    return (
        <Chakra.Box
            marginBottom={10}
            width={"fit-content"}
            backgroundColor={"gray.100"}
            borderRadius={"10px"}
        >
            <Chakra.Center>
                <Chakra.Box
                    display={
                        {
                            base: "inline-block",
                            md: "none"
                        }
                    }
                    width={"150px"}
                >
                    <Chakra.Image
                        src="./imgs/3c04f031-7ed0-46ad-afa4-77f6846301e4.jpg"
                        fallbackSrc={Mangadex_placeHolder}
                        borderTopRadius={"10px"}
                    />
                    <Chakra.Center>
                        <Chakra.Heading
                            //textAlign={"center"}
                            size={"md"}
                            noOfLines={2}
                            margin={"15px"}
                        > Fuufu Ijou, Koibito Miman </Chakra.Heading>
                    </Chakra.Center>
                </Chakra.Box>
                <Chakra.Box
                    width={"fit-content"}
                    display={
                        {
                            base: "none",
                            md: "inline-block"
                        }
                    }
                >
                    <Chakra.Grid
                        width={{
                            base: "400px"
                        }}
                        templateRows='repeat(3)'
                        templateColumns='repeat(12, 1fr)'
                        columnGap={3}
                        rowGap={1}
                        paddingRight={"10px"}
                    >
                        <Chakra.GridItem
                            rowSpan={2}
                            colSpan={4}
                        >
                            <Chakra.Image
                                src="./imgs/3c04f031-7ed0-46ad-afa4-77f6846301e4.jpg"
                                fallbackSrc={Mangadex_placeHolder}
                                borderTopLeftRadius={"10px"}
                                borderBottomLeftRadius={"10px"}
                            />
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            rowSpan={1}
                            colSpan={8}
                        >
                            <Chakra.Heading
                                noOfLines={2}
                                marginTop={"5px"}
                                size={
                                    {
                                        base: "lg",
                                        lg: "lg"
                                    }
                                }
                            > Fuufu Ijou, Koibito Miman </Chakra.Heading>
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            rowSpan={1}
                            colSpan={8}
                        >
                            <Chakra.Text
                                noOfLines={3}
                                marginBottom={"5px"}
                            >
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi ipsum molestias fuga officia earum eaque, perspiciatis molestiae illo soluta placeat quisquam? Omnis, quasi necessitatibus dolore eaque incidunt enim doloribus ea.
                            </Chakra.Text>
                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Chakra.Box>
            </Chakra.Center>
        </Chakra.Box>
    )
}

function CoverElementVertical(props: {
    src: Cover
}) {
    return (
        <React.Suspense
            fallback={
                <Chakra.Skeleton
                    borderTopRadius={"10px"}
                    height={"150px"}
                />
            }
        >
            <Await
                resolve={props.src.get_CoverImage_promise()}
                errorElement={
                    <Chakra.Image
                        src={Mangadex_cover_not_found}
                        fallbackSrc={Mangadex_placeHolder}
                        borderTopRadius={"10px"}
                    />
                }
            >
                {
                    (to_show: string) => (
                        <Chakra.Image
                            src={to_show}
                            fallbackSrc={Mangadex_placeHolder}
                            borderTopLeftRadius={"10px"}
                            borderBottomLeftRadius={"10px"}
                        />
                    )
                }
            </Await>
        </React.Suspense>
    );
}

function CoverElementVertical2(props: {
    src: Cover
}) {
    return (
        <React.Suspense
            fallback={
                <Chakra.Skeleton
                    borderTopLeftRadius={"10px"}
                    borderBottomLeftRadius={"10px"}
                    height={"full"}
                />
            }
        >
            <Await
                resolve={props.src.get_CoverImage_promise()}
                errorElement={
                    <Chakra.Image
                        src={Mangadex_cover_not_found}
                        fallbackSrc={Mangadex_placeHolder}
                        borderTopLeftRadius={"10px"}
                        borderBottomLeftRadius={"10px"}
                    />
                }
            >
                {
                    (to_show: string) => (
                        <Chakra.Image
                            src={to_show}
                            fallbackSrc={Mangadex_placeHolder}
                            borderTopLeftRadius={"10px"}
                            borderBottomLeftRadius={"10px"}
                        />
                    )
                }
            </Await>
        </React.Suspense>
    );
}

function MangaElementDef(props: {
    src: Manga
}) {
    let title: string = "";
    //let desc: string = "";
    if (props.src.get_title().en == null) {
        title = new Alt_title(props.src.get_alt_title()).get_quicklang()!;
    } else {
        title = props.src.get_title().en;
    }
    return (
        <Chakra.Box
            marginBottom={10}
            width={"fit-content"}
            backgroundColor={"gray.100"}
            borderRadius={"10px"}
        >
            <Chakra.Center>
                <Chakra.Box
                    display={
                        {
                            base: "inline-block",
                            md: "none"
                        }
                    }
                    width={"150px"}
                >
                    <React.Suspense
                        fallback={
                            <Chakra.Skeleton
                                borderTopRadius={"10px"}
                                height={"150px"}
                            />
                        }
                    >
                        <Await
                            resolve={props.src.get_cover_art()}
                            errorElement={
                                <Chakra.Image
                                    src={Mangadex_cover_not_found}
                                    fallbackSrc={Mangadex_placeHolder}
                                    borderTopRadius={"10px"}
                                />
                            }
                        >
                            {
                                (getted_cover: Cover) => {
                                    return (
                                        <CoverElementVertical src={getted_cover} />
                                    );
                                }
                            }
                        </Await>
                    </React.Suspense>
                    <Chakra.Center>
                        <Chakra.Heading
                            //textAlign={"center"}
                            size={"md"}
                            noOfLines={2}
                            margin={"15px"}
                        > {title} </Chakra.Heading>
                    </Chakra.Center>
                </Chakra.Box>
                <Chakra.Box
                    width={"fit-content"}
                    display={
                        {
                            base: "none",
                            md: "inline-block"
                        }
                    }
                >
                    <Chakra.Grid
                        width={{
                            base: "400px"
                        }}
                        templateRows='repeat(3)'
                        templateColumns='repeat(12, 1fr)'
                        columnGap={3}
                        rowGap={1}
                        paddingRight={"10px"}
                    >
                        <Chakra.GridItem
                            rowSpan={2}
                            colSpan={4}
                        >
                            <React.Suspense
                                fallback={
                                    <Chakra.Skeleton
                                        borderTopLeftRadius={"10px"}
                                        borderBottomLeftRadius={"10px"}
                                        height={"full"}
                                    />
                                }
                            >
                                <Await
                                    resolve={props.src.get_cover_art()}
                                    errorElement={
                                        <Chakra.Image
                                            src={Mangadex_cover_not_found}
                                            fallbackSrc={Mangadex_placeHolder}
                                            borderTopLeftRadius={"10px"}
                                            borderBottomLeftRadius={"10px"}
                                        />
                                    }
                                >
                                    {
                                        (getted_cover: Cover) => {
                                            return (
                                                <CoverElementVertical2 src={getted_cover} />
                                            );
                                        }
                                    }
                                </Await>
                            </React.Suspense>
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            rowSpan={1}
                            colSpan={8}
                        >
                            <Chakra.Heading
                                noOfLines={2}
                                marginTop={"5px"}
                                size={
                                    {
                                        base: "lg",
                                        lg: "lg"
                                    }
                                }
                            > {title} </Chakra.Heading>
                        </Chakra.GridItem>
                        <Chakra.GridItem
                            rowSpan={1}
                            colSpan={8}
                        >
                            <React.Suspense
                                fallback={
                                    <Chakra.Skeleton
                                        height={"full"}
                                        //borderTopLeftRadius={"10px"}
                                        borderBottomRightRadius={"10px"}
                                    />
                                }
                            >
                                <Await
                                    resolve={Lang_and_Data.initializeByDesc(props.src.get_description())}
                                    errorElement={<ErrorELAsync />}
                                    children={(getted: Array<Lang_and_Data>) => {
                                        return (
                                            <Chakra.Text
                                                noOfLines={3}
                                                marginBottom={"5px"}
                                            >
                                                {getted[0].get_data()}
                                            </Chakra.Text>
                                        );
                                    }}
                                />
                            </React.Suspense>

                        </Chakra.GridItem>
                    </Chakra.Grid>
                </Chakra.Box>
            </Chakra.Center>
        </Chakra.Box>
    )
}

function MangaElementDef_wID(props: {
    mangaID: string
}) {
    return (
        <React.Suspense
            fallback={
                <MangaElementFallback />
            }
        >
            <Await
                resolve={Manga.getMangaByID(props.mangaID)}
                errorElement={
                    <Chakra.Box
                        width={"fit-content"}
                        backgroundColor={"gray.100"}
                        borderRadius={"10px"}
                    >
                        <ErrorELAsync1 />
                    </Chakra.Box>
                }
            >
                {(getted: Manga) => (<MangaElementDef src={getted} />)}
            </Await>
        </React.Suspense>
    )
}

function MangaWarp() {
    return (
        <Chakra.Wrap>
            <Chakra.WrapItem>
                <MangaElement />
            </Chakra.WrapItem>
            <Chakra.WrapItem>
                <MangaElement />
            </Chakra.WrapItem>
            <Chakra.WrapItem>
                <MangaElement />
            </Chakra.WrapItem>
            <Chakra.WrapItem>
                <MangaElement />
            </Chakra.WrapItem>
            <Chakra.WrapItem>
                <MangaElement />
            </Chakra.WrapItem>
            <Chakra.WrapItem>
                <MangaElement />
            </Chakra.WrapItem>
            <Chakra.WrapItem>
                <MangaElement />
            </Chakra.WrapItem>
            <Chakra.WrapItem>
                <MangaElement />
            </Chakra.WrapItem>
            <Chakra.WrapItem>
                <MangaElement />
            </Chakra.WrapItem>
        </Chakra.Wrap>
    )
}

function MangaSwipper() {
    return (
        <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            pagination={{
                clickable: true,
                dynamicBullets: true
            }}
            grabCursor={true}
            mousewheel={true}
            modules={[Pagination, Autoplay, Mousewheel, FreeMode]}
            breakpoints={
                {
                    374: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    535: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    733: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    786: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1222: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1300: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    }
                }
            }
        >
            <SwiperSlide>
                <MangaElementFallback />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElement />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElementFallback />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElement />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElementFallback />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElement />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElementFallback />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElement />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElementFallback />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElement />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElementFallback />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElement />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElementFallback />
            </SwiperSlide>
            <SwiperSlide>
                <MangaElement />
            </SwiperSlide>
        </Swiper>
    )
}
function AllDownlaodedMangaList() {
    return (
        <React.Suspense
            fallback={
                <Chakra.Center>
                    <Chakra.Spinner />
                </Chakra.Center>
            }
        >
            <Await
                resolve={Manga.getAllDownloadedMangaID()}
                errorElement={<ErrorELAsync1 />}
            >
                {(getted: Array<string>) => {
                    if (getted != null && getted.length > 0) {
                        return (
                            <>
                                <Chakra.Heading>List of Downloaded Manga</Chakra.Heading>
                                <Chakra.Wrap>
                                    {
                                        getted.map((value: string, index : number) => (
                                            <Chakra.WrapItem key={`allDownloaded${index}`}>
                                                <MangaElementDef_wID mangaID={value} />
                                            </Chakra.WrapItem>
                                        ))
                                    }
                                </Chakra.Wrap>
                            </>
                        )
                    } else {
                        return (
                            <>
                                <Chakra.Heading>List of Downloaded Manga</Chakra.Heading>
                                <Chakra.Text>Seem like we have nothing here</Chakra.Text>
                            </>
                        )
                    }

                }}
            </Await>
        </React.Suspense>
    )
}

const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
test_area.render(
    <Chakra.ChakraProvider>
        <Chakra.Box
            margin={10}
        >
            
            <AllDownlaodedMangaList />
        </Chakra.Box>
    </Chakra.ChakraProvider>
);
