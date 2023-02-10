import React from "react";
import { Accordion, Placeholder } from "react-bootstrap";
import { useQuery } from "react-query";
import { Lang_and_Data } from "../../../../../api/internal/Utils";
import { Manga } from "../../../../../api/structures/Manga";
import { LAD_Tabs } from "../tabs/Lang_data_tabs";

export default function Top_Chaps_Desc_Part(props: {
    src: Manga
}) {
    const manga_description_querykey = "mdx-manga:" + props.src.get_id() + "-description";
    const manga_description_query = useQuery<Array<Lang_and_Data>, Error>(manga_description_querykey, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_description());
    });
    if (manga_description_query.isIdle || manga_description_query.isLoading) {
        return (
            <Placeholder lg={12}></Placeholder>
        );
    }
    if (manga_description_query.isError) {
        return (
            <></>
        );
    }
    if (manga_description_query.isSuccess) {
        if (manga_description_query.data.length == 0) {
            return (<></>);
        }
        return (
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header> {"Manga descriptions"} </Accordion.Header>
                    <Accordion.Body>
                        <LAD_Tabs src={manga_description_query.data} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    }
    return (
        <></>
    )
}
