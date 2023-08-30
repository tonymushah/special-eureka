import * as Chakra from "@chakra-ui/react";
import React from "react";
import MangaElementDef_wID from "../mangas/v1/MangaElementDef_wID";
import AllDownlaodedMangaConsumer from "./All_downloaded_Manga_Consumer";

export default function AllDownlaodedMangaList() {
    return (
        <AllDownlaodedMangaConsumer>
            {
                (value) => (
                    <React.Fragment>
                        {
                            value.map((value) => (
                                <React.Fragment key={JSON.stringify(value)}>
                                    {
                                        value.get_data().map((value, index) => (
                                            <Chakra.WrapItem key={`allDownloaded${index}`}>
                                                <MangaElementDef_wID mangaID={value} />
                                            </Chakra.WrapItem>
                                        ))
                                    }
                                </React.Fragment>
                            ))
                        }
                    </React.Fragment>
                )
            }
        </AllDownlaodedMangaConsumer>
    );

}
