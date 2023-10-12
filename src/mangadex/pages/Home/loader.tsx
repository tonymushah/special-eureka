import { Api_Request } from "@mangadex/api/internal/Api_Request";
import { LoaderFunction, json } from "react-router";
import { queryfn as queryFn } from "./HomeAfterPing/queryfn";
import { queryKey } from "./HomeAfterPing/queryKey";
import { queryClient } from "@mangadex/resources/query.client";

export const loader: LoaderFunction = async function () {
    if (await Api_Request.ping()) {
        try {
            await queryClient.prefetchQuery(queryKey(), () => queryFn(undefined, queryClient));
            return new Response(undefined, {
                status: 204,
                statusText: "Loaded"
            });
        } catch (e) {
            switch (typeof e) {
                case "bigint":
                    throw json({
                        "message": e
                    }, 500);
                case "string":
                    throw json({
                        "message": e
                    }, 500);
                case "number":
                    throw json({
                        "message": e
                    }, 500);
                case "boolean":
                    throw json({
                        message: e
                    }, 500);
                case "symbol":
                    throw json({
                        message: e
                    }, 500);
                case "undefined":
                    throw json({
                        message: "undefined error"
                    }, 500);
                case "object":
                    if (e instanceof Error) {
                        throw new Response(JSON.stringify(e), {
                            "status": 500,
                            "statusText": "Error Caugth"
                        });
                    } else {
                        throw json({
                            message: e
                        }, 500);
                    }
                case "function":
                    throw json({
                        message: "undefined error"
                    }, 500);
                default:
                    throw json({
                        message: "undefined error"
                    }, 500);
            }
        }
    } else {
        throw json({
            "message": "Call the mangaDex Api"
        }, {
            status: 503,
            statusText: "Ping Error"
        });
    }
};
