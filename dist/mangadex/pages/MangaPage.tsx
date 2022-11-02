import React from "react";
import ReactDOM from 'react-dom/client';
import { Await, useParams } from "react-router-dom";
import * as Chakra from "@chakra-ui/react"
import { Manga } from "../api/structures/Manga";
import { ErrorELAsync } from "../resources/componnents/Error_cmp";
import { Manga_Page } from "../resources/componnents/mangas/Manga_Page";
function MangaPage(props){
    let { id } = useParams();
    return (
        <React.Suspense
            fallback={
                <Chakra.Box
                    display={"block"}
                >
                    <Chakra.AbsoluteCenter>
                        <Chakra.Spinner 
                            size="xl"
                            color='orange.500'
                            thickness='4px'
                        />
                    </Chakra.AbsoluteCenter>
                </Chakra.Box>
            }
        >
            <Await
                resolve={Manga.getMangaByID(id!)}
                errorElement={
                    <ErrorELAsync></ErrorELAsync>
                }
            >
                {(getted : Manga) => {
                    return (
                        <Manga_Page
                            src={getted}
                        />
                    )
                }}
            </Await>
        </React.Suspense>
    )
}

export default MangaPage