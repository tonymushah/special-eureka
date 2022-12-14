import * as Chakra from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { List } from "../../../../api/structures/List";
import MangaSwipper from "../../chapter/v1/MangaSwipper";
import ErrorEL1 from "../../error/ErrorEL1";
import MangaElementFallback from "../../mangas/v1/MangaElementFallback";

export default function CustomListSwiper(props : {
    listID : string
}){
    const key = "mdx-custom_list:" + props.listID;
    const query = useQuery(key, () => {
        return List.getListByID(props.listID);
    }, {
        "staleTime" : Infinity
    })
    if (query.isLoading) {
        return(
            <Chakra.Wrap>
                <Chakra.WrapItem>
                    <MangaElementFallback/>
                </Chakra.WrapItem>
                <Chakra.WrapItem>
                    <MangaElementFallback/>
                </Chakra.WrapItem>
                <Chakra.WrapItem>
                    <MangaElementFallback/>
                </Chakra.WrapItem>
            </Chakra.Wrap>
        )
    }
    if(query.isError){
        return(
            <ErrorEL1 error={query.error}/>
        )
    }
    return (
        <MangaSwipper mangaIDS={query.data!.getMangaIDList()}/>
    );
}
