import * as Chakra from "@chakra-ui/react";

import { Author } from "@mangadex/api/structures/Author";
import { LAD_Tabs } from "@mangadex/resources/componnents/mangas/Mainpage/tabs/Lang_data_tabs";
import { useState } from "./useState";


export default function Author_Page_Biography(props: {
    src: Author
}) {
    const query = useState(props);
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


