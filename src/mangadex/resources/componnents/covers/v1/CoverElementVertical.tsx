import * as Chakra from "@chakra-ui/react";
import React from "react";
import { Await } from "react-router-dom";
import { Cover } from "../../../../api/structures/Cover";
import Mangadex_placeHolder from "../../../imgs/cover-placeholder.png";
import Mangadex_cover_not_found from "../../../imgs/cover-not-found.jpg";

export default function CoverElementVertical(props: {
    src: Cover
}) {
    return (
        <React.Suspense
            fallback={
                <Chakra.Skeleton
                    borderTopRadius={"10px"}
                    height={"150px"}
                />
            }
        >
            <Await
                resolve={props.src.get_CoverImage_promise()}
                errorElement={
                    <Chakra.Image
                        src={Mangadex_cover_not_found}
                        fallbackSrc={Mangadex_placeHolder}
                        borderTopRadius={"10px"}
                    />
                }
            >
                {
                    (to_show: string) => (
                        <Chakra.Image
                            src={to_show}
                            fallbackSrc={Mangadex_placeHolder}
                            borderTopRadius={"10px"}
                        />
                    )
                }
            </Await>
        </React.Suspense>
    );
}
