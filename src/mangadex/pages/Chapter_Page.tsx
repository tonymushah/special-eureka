import React from "react";
import { Await, useParams } from "react-router-dom";
import { Chapter } from "../api/structures/Chapter";
import * as Chakra from "@chakra-ui/react"
import * as Chap from "../resources/componnents/chapter/Chapter_page";
import { ErrorELAsync } from "../resources/componnents/Error_cmp";

export default function Chapter_Page(){
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
                resolve={Chapter.get_ChapterbyId(id!)}
                errorElement={<ErrorELAsync/>}
            >
                {(getted : Chapter) => {
                    return (
                        <Chap.Chapter_page src={getted}></Chap.Chapter_page>
                    );
                }}
            </Await>
        </React.Suspense>
    );
}