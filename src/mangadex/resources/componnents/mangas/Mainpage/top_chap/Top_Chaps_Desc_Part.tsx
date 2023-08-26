import React from "react";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Lang_and_Data } from "@mangadex/api/internal/Utils";
import { Manga } from "@mangadex/api/structures/Manga";
import { LAD_Tabs } from "../tabs/Lang_data_tabs";

export default function Top_Chaps_Desc_Part(props: {
    src: Manga
}) {
    // [ ] Refactor into a function 
    const manga_description_querykey = ["mdx", "manga", props.src.get_id(), "description"];
    const manga_description_query = useQuery<Array<Lang_and_Data>, Error>(manga_description_querykey, () => {
        return Lang_and_Data.initializeByDesc(props.src.get_description());
    });
    if (manga_description_query.fetchStatus == "fetching" || manga_description_query.isLoading) {
        return (
            <Skeleton/>
        );
    }
    if (manga_description_query.isError) {
        return (
            <React.Fragment/>
        );
    }
    if (manga_description_query.isSuccess) {
        if (manga_description_query.data.length == 0) {
            return (<></>);
        }
        return (
            <Accordion allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton> 
                            <Box as="span" flex='1' textAlign='left'>
                                Manga descriptions
                            </Box>
                            <AccordionIcon/>
                        </AccordionButton>
                    </h2>
                    
                    <AccordionPanel>
                        <LAD_Tabs src={manga_description_query.data} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        );
    }
    return (
        <></>
    );
}
