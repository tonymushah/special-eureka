import * as Chakra from "@chakra-ui/react";
import {
    useQuery
} from "@tanstack/react-query";

import { Lang_and_Data } from "@mangadex/api/internal/Utils";
import { Author } from "@mangadex/api/structures/Author";
import { LAD_Tabs } from "@mangadex/resources/componnents/mangas/Mainpage/tabs/Lang_data_tabs";


export default function Author_Page_Biography(props: {
    src: Author
}) {
    const query_key = ["mdx", "author", props.src.get_id(), "biography"];
    const query = useQuery<Array<Lang_and_Data>>(query_key, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_biography());
    });
    if (query.isSuccess) {
        if (query.data.length == 0) {
            return (
                <Chakra.Text as={"i"}>No biography</Chakra.Text>
            );
        } else {
            return (
                <LAD_Tabs
                    src={query.data}
                />
            );
        }
    }
    return (
        <Chakra.Text>
            Loading biography
        </Chakra.Text>
    );
}