import * as Chakra from "@chakra-ui/react";
import React from "react";
import ErrorEL1 from "../../../error/ErrorEL1";
import MangadexSpinner from "../../../kuru_kuru/MangadexSpinner";
import { useState } from "./useState";

const MangaSwipperWithMangaObjects = React.lazy(() => import("../../../mangas/v1/MangaSwipperWithMangaObjects"));

const CustomListSwiperSuspense = React.lazy(() => import("../CustomListSuspense"));

export default function CustomListSwiper(props: {
    listID: string
}) {
    const query = useState(props);
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
    if (query.isSuccess) {
        return (
            <React.Suspense
                fallback={
                    <React.Suspense
                        fallback={
                            <Chakra.Box>
                                <Chakra.Center>
                                    <MangadexSpinner
                                        size={"xl"}
                                    />
                                </Chakra.Center>
                            </Chakra.Box>
                        }
                    >
                        <CustomListSwiperSuspense />
                    </React.Suspense>
                }
            >
                <MangaSwipperWithMangaObjects mangaArray={query.data.get_manga_array()} />
            </React.Suspense>
        );
    }
    return (
        <React.Suspense
            fallback={
                <Chakra.Box>
                    <Chakra.Center>
                        <MangadexSpinner
                            size={"xl"}
                        />
                    </Chakra.Center>
                </Chakra.Box>
            }
        >
            <CustomListSwiperSuspense />
        </React.Suspense>
    );
}
