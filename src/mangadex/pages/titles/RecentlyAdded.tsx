import React from "react"
import { Asc_Desc, Offset_limits, Order } from "../../api/internal/Utils"
import * as Chakra from "@chakra-ui/react"
import { CollectionComponnent_WithQuery } from "../../resources/componnents/Collection/Collection";
import { Manga } from "../../api/structures/Manga";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Mangadex_suspense } from "../..";
import { Container } from "react-bootstrap";
import { appWindow } from "@tauri-apps/api/window";

const MangaList = React.lazy(() => import("../../resources/componnents/mangas/v1/MangaList"));
const IsPingable = React.lazy(() => import("../../resources/componnents/IsPingable"));
const IsPingable_defaultError = React.lazy(() => import("../../resources/componnents/IsPingable_defaultError"))

export default function RecentlyAdded() {
    const offset_limit = new Offset_limits();
    offset_limit.set_limits(25);
    const client = useHTTPClient();
    const queryKey = "mdx-recently-added";
    appWindow.setTitle("Recently Added | Mangadex");
    return (
        <Mangadex_suspense>
            <IsPingable
                onLoading={
                    <Chakra.Box
                        width={"full"}
                        height={"100vh"}
                    >
                        <Chakra.Center>
                            <Chakra.Spinner
                                size={"lg"}
                                thickness={"2px"}
                                color={"orange"}
                            />
                        </Chakra.Center>
                    </Chakra.Box>
                }
                client={client}
                onError={(query) => (
                    <Mangadex_suspense>
                        <IsPingable_defaultError
                            query={query}
                        />
                    </Mangadex_suspense>
                )}
                onSuccess={() => (
                    <Container>
                        <Chakra.Box>
                            <Chakra.Heading
                                fontFamily={"inherit"}
                            >
                                Recently Added
                            </Chakra.Heading>
                            <Chakra.Box>
                                <CollectionComponnent_WithQuery<Manga>
                                    fn={() => {
                                        return Manga.search({
                                            offset_Limits: offset_limit,
                                            order: new Order(Asc_Desc.desc()),
                                            client: client
                                        });
                                    }}
                                    queryKey={queryKey}
                                >
                                    {
                                        (collection) => (
                                            <Mangadex_suspense>
                                                <MangaList
                                                    src={collection.get_data()}
                                                />
                                            </Mangadex_suspense>
                                        )
                                    }
                                </CollectionComponnent_WithQuery>
                            </Chakra.Box>
                        </Chakra.Box>
                    </Container>
                )}
            />
        </Mangadex_suspense>
    )
}