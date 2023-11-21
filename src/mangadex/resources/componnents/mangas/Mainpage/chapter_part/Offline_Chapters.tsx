import * as Chakra from "@chakra-ui/react";
import "flag-icons/css/flag-icons.min.css";
import React from "react";
import Chapter_Element1_byChapID from "@mangadex/resources/componnents/chapter/v1/Chapter_Element1_byChapID";
import { MangaPageProps } from "../../Manga_Page";
import Loading from "../loading";

const All_downloaded_Chapter_manga = React.lazy(() => import("@mangadex/resources/componnents/download/All_downloaded_Chapter_manga"));

export default function Offline_Chapters(props: MangaPageProps) {
    return (
        <Chakra.TabPanel>

            <React.Suspense
                fallback={
                    <Chakra.Box m={2} bg="inherit">
                        <Loading/>
                    </Chakra.Box>
                }
            >
                <All_downloaded_Chapter_manga
                    mangaID={props.src.get_id()}
                >
                    {(getted: Array<string>) => (
                        <Chakra.VStack>
                            {
                                getted.map((value: string) => (
                                    <Chapter_Element1_byChapID key={value} id={value} />
                                ))
                            }
                        </Chakra.VStack>
                    )}
                </All_downloaded_Chapter_manga>
            </React.Suspense>
        </Chakra.TabPanel>
    );
}
