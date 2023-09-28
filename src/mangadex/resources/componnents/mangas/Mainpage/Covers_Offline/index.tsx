import * as Chakra from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import { Cover } from "@mangadex/api/structures/Cover";
import { CollectionComponnent_WithQuery } from "../../../Collection/Collection";
import MangadexSpinner from "../../../kuru_kuru/MangadexSpinner";
import MangaPage_Cover from "../covers";
import { useState } from "./useState";
import { MangaPageProps } from "../Covers_";
import Manga from "@mangadex/api/structures/Manga";
import AllDownloadedMangaCovers_Cover from "@mangadex/api/structures/CollectionTypes/AllDownloadedMangaCovers_Cover";


export default function Covers_Offline(props: MangaPageProps) {
    const client = useHTTPClient();
    const { offset_limits, queryKey } = useState(props);
    return (
        <CollectionComponnent_WithQuery<Cover>
            fn={async () => {
                const getted = await Manga.getAllDownloadedCover_ofAManga(props.src.get_id(), offset_limits, client);
                const data = await Promise.all(getted.get_data().map((id) => Cover.getAOfflineCover(id)));
                return new AllDownloadedMangaCovers_Cover({
                    data,
                    limit: getted.get_limit(),
                    offset: getted.get_offset(),
                    total: getted.get_total()
                }, props.src.get_id(), client);
            }}
            queryKey={queryKey}
            query_options={{
                staleTime: 1000 * 60 * 30
            }}
            onLoading={
                <Chakra.Box
                    width={"full"}
                    height={"100vh"}
                >
                    <Chakra.Center>
                        <MangadexSpinner
                            size={"lg"}
                            thickness={"2px"}
                            color={"orange"}
                        />
                    </Chakra.Center>
                </Chakra.Box>
            }
        >
            {(getted_collection) => (
                <MangaPage_Cover covers={getted_collection.get_data()} />
            )}
        </CollectionComponnent_WithQuery>
    );
}
