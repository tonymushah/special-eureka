import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useHTTPClient } from "../../../../../commons-res/components/HTTPClientProvider";
import { List } from "../../../../api/structures/List";
import ErrorEL1 from "../../error/ErrorEL1";

const MangaSwipper = React.lazy(() => import("../../chapter/v1/MangaSwipper"));

const CustomListSwiperSuspense = React.lazy(() => import("./CustomListSuspense"));

export default function CustomListSwiper(props: {
    listID: string
}) {
    const client = useHTTPClient();
    const key = "mdx-custom_list:" + props.listID;
    const query = useQuery<List, Error>(key, () => {
        return List.getListByID(props.listID, client);
    }, {
        "staleTime": Infinity
    })
    if (query.isLoading) {
        return (
            <React.Suspense
                fallback={
                    <Chakra.Box>
                        <Chakra.Center>
                            <Chakra.Spinner
                                size={"xl"}
                            />
                        </Chakra.Center>
                    </Chakra.Box>
                }
            >
                <CustomListSwiperSuspense />
            </React.Suspense>
        )
    }
    if (query.isError) {
        return (
            <ErrorEL1 error={query.error} />
        )
    }
    return (
        <React.Suspense
            fallback={
                <React.Suspense
                    fallback={
                        <Chakra.Box>
                            <Chakra.Center>
                                <Chakra.Spinner
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
            <MangaSwipper mangaIDS={query.data!.getMangaIDList()} />
        </React.Suspense>

    );
}
