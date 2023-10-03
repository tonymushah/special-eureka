import * as Chakra from "@chakra-ui/react";
import UserOptions from "@mangadex/api/internal/UserOptions";
import { Offset_limits, Order } from "@mangadex/api/internal/Utils";
import { Chapter } from "@mangadex/api/structures/Chapter";
import CollectionComponnent_WithQuery from "@mangadex/resources/componnents/Collection/CollectionComponnent_WithQuery";
import ChapterArrayToAccordion from "@mangadex/resources/componnents/mangas/v1/ChapterArrayToAccordion";
import { Client } from "@tauri-apps/api/http";
import React from "react";
import { Title } from "./Title";

export function OnSuccess({ userOption, offset_limit, client, queryKey }: { userOption: UserOptions; offset_limit: Offset_limits; client: Client; queryKey: string[]; }) {
    return (
        <Chakra.Box>
            <Title queryKey={queryKey} />
            <Chakra.Box>
                <CollectionComponnent_WithQuery<Chapter>
                    fn={async () => {
                        const userLanguages = await userOption.getLanguages();
                        return await Chapter.search({
                            offset_limits: offset_limit,
                            order: new Order("desc"),
                            client: client,
                            translatedLanguage: userLanguages.map((lang) => lang.get_two_letter())
                        });
                    }}
                    queryKey={queryKey}
                >
                    {(data) => (
                        <React.Fragment>
                            <Chakra.VStack alignItems={"start"}>
                                <ChapterArrayToAccordion value={data.get_data()}/>
                            </Chakra.VStack>
                        </React.Fragment>
                    )}
                </CollectionComponnent_WithQuery>
            </Chakra.Box>
        </Chakra.Box>
    );
}
