import * as Chakra from "@chakra-ui/react";
import React from "react";
import {
    useQuery
} from 'react-query';

import { Lang_and_Data } from "../../../api/internal/Utils";
import { Author } from "../../../api/structures/Author";
import { LAD_Tabs } from "../../../resources/componnents/mangas/Mainpage/tabs/Lang_data_tabs";


const ExtLink = React.lazy(async () => {
    let res = await import("../../../../commons-res/components/ExtLink");
    return {
        default: res.ExtLink
    };
})


export default function Author_Page_Biography(props: {
    src: Author
}) {
    const query_key = "mdx-author:" + props.src.get_id() + "-biography";
    const query = useQuery<Array<Lang_and_Data>>(query_key, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_biography())
    })
    if (query.isSuccess) {
        if (query.data.length == 0) {
            return (
                <Chakra.Text as={'i'}>No biography</Chakra.Text>
            )
        } else {
            return (
                <LAD_Tabs
                    src={query.data}
                />
            )
        }
    }
    return (
        <Chakra.Text>
            Loading biography
        </Chakra.Text>
    )
}