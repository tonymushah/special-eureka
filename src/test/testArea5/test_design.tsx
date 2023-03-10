import * as Chakra from "@chakra-ui/react";
import { getClient } from "@tauri-apps/api/http";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Composition } from "remotion";
import { Swiper, SwiperSlide } from "swiper/react";
import HTTPClientProvider_Query from "@commons-res/components/HTTPClientProvider_Query";
import TryCatch from "@commons-res/components/TryCatch";
import Api_Request from "../../mangadex/api/offline/DeskApiRequest";
import { Manga } from "@mangadex/api/structures/Manga";
import "swiper/css/bundle"
import AllDownlaodedMangaConsumer from "@mangadex/resources/componnents/download/All_downloaded_Manga_Consumer";
import MangaElementDef_wID from "@mangadex/resources/componnents/mangas/v1/MangaElementDef_wID";
import { FreeMode, Keyboard, Navigation } from "swiper"
import App from "./dnd/App";
import { get_manga_byId, get_manga_description, get_manga_page_authors_artists, get_manga_page_cover_art_image } from "@mangadex/resources/hooks/MangaStateHooks";
import { CardBody, Heading } from "@chakra-ui/react";
import MangaFallback2 from "@mangadex/resources/componnents/mangas/v1/MangaElement2Fallback";
import MangaTitle from "@mangadex/resources/componnents/mangas/v1/MangaTitle";
import CoverPlaceHolder from "@mangadex/resources/imgs/cover-placeholder.png";
import ErrorEL1 from "@mangadex/resources/componnents/error/ErrorEL1";
import { ExtLink } from "@commons-res/components/ExtLink";
import { Button, Placeholder } from "react-bootstrap";
import { Author_Artists, ContentRating, make_first_UpperCare, Status } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import { getMangaDexPath } from "@mangadex";
import MangaPopularElementByMangaId from "@mangadex/resources/componnents/mangas/v1/MangadexPopularElement/ById";

const test_area = ReactDOM.createRoot(document.getElementById("test_area")!);
const queryClient = new QueryClient()

test_area.render(
    <Chakra.ChakraProvider>
        <QueryClientProvider
            client={queryClient}
        >
            <ReactQueryDevtools />
            <HTTPClientProvider_Query
                value={getClient()}
                onLoading={
                    <Chakra.Box
                        width={"100%"}
                        height={"100vh"}
                    >
                        <Chakra.AbsoluteCenter>
                            <Chakra.Spinner
                                size="xl"
                                color='orange.500'
                                thickness='4px'
                            />
                        </Chakra.AbsoluteCenter>
                    </Chakra.Box>
                }
                onError={(error) => (
                    <Chakra.Box
                        width={"100%"}
                        height={"100vh"}
                    >
                        <Chakra.AbsoluteCenter>
                            <Chakra.Box >
                                <Chakra.Alert>
                                    <Chakra.AlertIcon />
                                    <Chakra.AlertTitle>Error on Loading HTTPClient</Chakra.AlertTitle>
                                </Chakra.Alert>
                            </Chakra.Box>
                        </Chakra.AbsoluteCenter>
                    </Chakra.Box>
                )}
            >
                <AllDownlaodedMangaConsumer>
                    {(ids) => (
                        <Swiper
                            navigation={true}
                            keyboard={true}
                            modules={[Navigation, Keyboard]}
                        >
                            {ids.map((id) => (
                                <SwiperSlide>
                                    <MangaPopularElementByMangaId mangaID={id} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </AllDownlaodedMangaConsumer>
            </HTTPClientProvider_Query>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
)


