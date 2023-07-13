import * as Chakra from "@chakra-ui/react";
import { Manga } from "@mangadex/api/structures/Manga";
import MangaContextMenu from "../../MangaContextMenu";
import { PropsProvider } from "../../MangaElementDef/vanilla";
import Image from "./Image";
import Title from "./Title";

export default function MangaVerticalElement(props: {
    src: Manga,
    isRefetching?: boolean,
    refetch?: () => void
}) {
    return (
        <MangaContextMenu
            mangaId={props.src.get_id()}
            refetch={props.refetch}
        >
            <PropsProvider value={{
                src: props.src
            }}>
                <Chakra.LinkBox
                    marginBottom={10}
                    width={"fit-content"}
                    backgroundColor={props.isRefetching == undefined ? "gray.100" : (props.isRefetching ? "orange.100" : "gray.100")}
                    borderRadius={"10px"}
                    border={"1px"}
                    borderColor={"gray.200"}
                    shadow={"md"}
                >
                    <Chakra.Center>
                        <Chakra.Box
                            display={
                                {
                                    base: "inline-block"
                                }
                            }
                            width={"150px"}
                        >
                            <Image/>
                            <Title/>
                        </Chakra.Box>
                    </Chakra.Center>
                </Chakra.LinkBox>
            </PropsProvider>

        </MangaContextMenu>
    );
}
