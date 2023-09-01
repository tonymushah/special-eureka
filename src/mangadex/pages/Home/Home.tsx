import * as Chakra from "@chakra-ui/react";
import { Api_Request } from "@mangadex/api/internal/Api_Request";
import { useTrackEvent } from "@mangadex/index";
import MangadexSpinner from "@mangadex/resources/componnents/kuru_kuru/MangadexSpinner";
import { useAppWindowTitle } from "@mangadex/resources/hooks/TauriAppWindow";
import { getClient } from "@tauri-apps/api/http";
import React from "react";
import { LoaderFunction, json } from "react-router";

const HomePageAfterPing = React.lazy(() => import("@mangadex/pages/Home/HomeAfterPing"));

function Home() {
    const setTitle = useAppWindowTitle();
    React.useEffect(() => {
        setTitle("High Quality Image, no ads | Mangadex");
    }, []);
    useTrackEvent("mangadex-index-page-entrance");
    return (
        <Chakra.Box
            margin={2}
        >
            <React.Suspense
                fallback={
                    <Chakra.AbsoluteCenter>
                        <MangadexSpinner
                            size={"lg"}
                        />
                    </Chakra.AbsoluteCenter>
                }
            >
                <HomePageAfterPing/>
            </React.Suspense>
        </Chakra.Box>
    );
}

export default Home;

export const loader: LoaderFunction = async function () {
    const { queryfn : queryFn, queryKey } = await import("./HomeAfterPing");
    const { queryClient } = await import("@mangadex/resources/query.client");
    if(await Api_Request.ping()){
        const client = await getClient();
        try{
            await queryClient.prefetchInfiniteQuery(queryKey(), () => queryFn(client, queryClient));
            return new Response(undefined, {
                status : 204,
                statusText : "Loaded"
            });
        }catch(e){
            switch (typeof e) {
                case "bigint":
                    throw json({
                        "message" : e
                    }, 500);
                case "string":
                    throw json({
                        "message" : e
                    }, 500);
                case "number":
                    throw json({
                        "message" : e
                    }, 500);
                case "boolean":
                    throw json({
                        message : e
                    }, 500);
                case "symbol":
                    throw json({
                        message : e
                    }, 500);
                case "undefined":
                    throw json({
                        message : "undefined error"
                    }, 500);
                case "object":
                    if(e instanceof Error){
                        throw new Response(JSON.stringify(e), {
                            "status" : 500,
                            "statusText" : "Error Caugth"
                        });
                    }else {
                        throw json({
                            message : e
                        }, 500);
                    }
                case "function":
                    throw json({
                        message : "undefined error"
                    }, 500);
                default:
                    throw json({
                        message : "undefined error"
                    }, 500);
            }
        }finally{
            await client.drop();
        }
    }else {
        throw json({
            "message" : "Call the mangaDex Api"
        }, {
            status : 503,
            statusText : "Ping Error"
        });
    }
};