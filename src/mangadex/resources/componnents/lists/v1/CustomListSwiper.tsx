import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { List } from "@mangadex/api/structures/List";
import ErrorEL1 from "../../error/ErrorEL1";
import MangadexSpinner from "../../kuru_kuru/MangadexSpinner";

const MangaSwipperWithMangaObjects = React.lazy(() => import("../../mangas/v1/MangaSwipperWithMangaObjects"));

const CustomListSwiperSuspense = React.lazy(() => import("./CustomListSuspense"));

export default function CustomListSwiper(props: {
    listID: string
}) {
    const client = useHTTPClient();
    const key = ["mdx", "custom_list", props.listID];
    const query = useQuery<List, Error>(key, () => {
        return List.getListByID_includes_manga(props.listID, client);
        
    }, {
        "staleTime": Infinity
    });
    if (query.isLoading) {
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
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        );
    }
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
            <MangaSwipperWithMangaObjects mangaArray={query.data!.get_manga_array()} />
        </React.Suspense>

    );
}
