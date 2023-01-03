import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { List } from "../../../../api/structures/List";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementFallback from "../../mangas/v1/MangaElementFallback";

const MangaSwipper = React.lazy(() => import("../../chapter/v1/MangaSwipper"));

export default function CustomListSwiper(props: {
    listID: string
}) {
    const key = "mdx-custom_list:" + props.listID;
    const query = useQuery(key, () => {
        return List.getListByID(props.listID);
    }, {
        "staleTime": Infinity
    })
    if (query.isLoading) {
        return (
            <Chakra.Wrap>
                <Chakra.WrapItem>
                    <MangaElementFallback />
                </Chakra.WrapItem>
                <Chakra.WrapItem>
                    <MangaElementFallback />
                </Chakra.WrapItem>
                <Chakra.WrapItem>
                    <MangaElementFallback />
                </Chakra.WrapItem>
            </Chakra.Wrap>
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
                <Chakra.Wrap>
                    <Chakra.WrapItem>
                        <MangaElementFallback />
                    </Chakra.WrapItem>
                    <Chakra.WrapItem>
                        <MangaElementFallback />
                    </Chakra.WrapItem>
                    <Chakra.WrapItem>
                        <MangaElementFallback />
                    </Chakra.WrapItem>
                </Chakra.Wrap>
            }
        >
            <MangaSwipper mangaIDS={query.data!.getMangaIDList()} />
        </React.Suspense>

    );
}
