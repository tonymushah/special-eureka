import React from "react";
import { Await, useNavigate } from "react-router-dom";
import { getMangaDexPath, Mangadex_suspense } from "../..";
import { useHTTPClient } from "../../../commons-res/components/HTTPClientProvider";
import { Manga } from "../../api/structures/Manga";
import { ErrorELAsync1 } from "../../resources/componnents/Error_cmp";

export default function Random_Manga() {
        const client = useHTTPClient();
        const MangaDexPath = getMangaDexPath();
        return (
            <Mangadex_suspense>
                <Await
                    resolve={Manga.getRandom(client)}
                    errorElement={<ErrorELAsync1 />}
                >
                    {(getted1: Manga) => {
                        let navigate = useNavigate();
                        React.useEffect(() => {
                            navigate(MangaDexPath + "/manga/" + getted1.get_id())
                        });
                        return (<></>);
                    }}
                </Await>
            </Mangadex_suspense>
        )
    }