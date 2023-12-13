import * as Chakra from "@chakra-ui/react";
import { getMangaDexPath } from "@mangadex/index";
import GridLayout from "./GridLayout";
import Laoyut from "./Layout";
import { Props, PropsProvider } from "./Props";
import React from "react";
import GridFallBackImage from "../../MangaElementFallback/GridFallBackImage";
import GridTitleFallback from "../../MangaElementFallback/GridTitleFallback";
import GridTagFallback from "../../MangaElementFallback/GridTagFallback";
import GridDescriptionFallback from "../../MangaElementFallback/GridDescriptionFallback";

const Image = React.lazy(() => import("./Image"));

const TryCatchTitle = React.lazy(() => import("./TryCatchTitle"));

const Publication = React.lazy(() => import("./Publication"));

const Description = React.lazy(() => import("./Description"));

export const MangaDexPath = getMangaDexPath();

export default function MangaElementDef_without_Context_Menu(props: Props) {
    return (

        <Chakra.Box
            display={"flex"}
            width={"min-content"}
        >
            <PropsProvider value={props}>
                <Laoyut>
                    <Chakra.Center
                    >
                        <Chakra.Box
                            width={"fit-content"}
                        >
                            <GridLayout>
                                <React.Suspense
                                    fallback={<GridFallBackImage />}
                                >
                                    <Chakra.GridItem
                                        rowSpan={3}
                                        colSpan={4}
                                    >
                                        <Image />
                                    </Chakra.GridItem>
                                </React.Suspense>
                                <React.Suspense
                                    fallback={<GridTitleFallback />}
                                >
                                    <Chakra.GridItem
                                        rowSpan={1}
                                        colSpan={8}
                                    >
                                        <TryCatchTitle />
                                    </Chakra.GridItem>
                                </React.Suspense>
                                <React.Suspense
                                    fallback={<GridTagFallback />}
                                >
                                    <Chakra.GridItem
                                        rowSpan={1}
                                        colSpan={8}
                                    >
                                        <Publication />
                                    </Chakra.GridItem>
                                </React.Suspense>
                                <React.Suspense
                                    fallback={<GridDescriptionFallback />}
                                >
                                    <Chakra.GridItem
                                        rowSpan={1}
                                        colSpan={8}
                                    >
                                        <Description />
                                    </Chakra.GridItem>
                                </React.Suspense>
                            </GridLayout>
                        </Chakra.Box>
                    </Chakra.Center>
                </Laoyut>
            </PropsProvider>
        </Chakra.Box>
    );
}
