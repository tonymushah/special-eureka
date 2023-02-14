import * as Chakra from "@chakra-ui/react";
import { getClient } from "@tauri-apps/api/http";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Composition } from "remotion";
import { Swiper, SwiperSlide } from "swiper/react";
import HTTPClientProvider_Query from "../../commons-res/components/HTTPClientProvider_Query";
import TryCatch from "../../commons-res/components/TryCatch";
import Api_Request from "../../mangadex/api/offline/DeskApiRequest";
import { Manga } from "../../mangadex/api/structures/Manga";
import "swiper/css/bundle"
import AllDownlaodedMangaConsumer from "../../mangadex/resources/componnents/download/All_downloaded_Manga_Consumer";
import MangaElementDef_wID from "../../mangadex/resources/componnents/mangas/v1/MangaElementDef_wID";
import { FreeMode } from "swiper"
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
                    {
                        (mangas) => (
                            <Swiper
                                slidesPerGroupAuto={true}
                                slidesPerView={"auto"}
                                spaceBetween={20}
                                freeMode={true}
                                modules={[FreeMode]}
                            >
                                {
                                    mangas.map((value, index) => (
                                        <SwiperSlide
                                            key={index}
                                            style={{
                                                display : "inline-block",
                                                width : "min-content"
                                            }}
                                        >
                                            <MangaElementDef_wID
                                                mangaID={value}
                                            />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        )
                    }
                </AllDownlaodedMangaConsumer>
            </HTTPClientProvider_Query>
        </QueryClientProvider>
    </Chakra.ChakraProvider>
)


