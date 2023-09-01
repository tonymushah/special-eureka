import GetChapterByIdResult from "@mangadex/api/structures/additonal_types/GetChapterByIdResult";
import { open } from "@tauri-apps/api/shell";
import { LoaderFunction, json } from "react-router";

export const loader: LoaderFunction = async function ({ params }) {
    const { get_chapter_queryKey } = await import("@mangadex/resources/hooks/ChapterStateHooks/get_chapter_queryKey");
    const { getClient } = await import("@tauri-apps/api/http");
    const client = await getClient();
    const { queryClient } = await import("@mangadex/resources/query.client");
    const { Chapter, Chapter_withAllIncludes } = await import("@mangadex/api/structures/Chapter");
    const { id } = params;
    if (id != undefined) {
        const queryKey = get_chapter_queryKey({
            id
        });
        const load = async function () {
            const data = await queryClient.fetchQuery(queryKey, () => Chapter.get_ChapterbyId(id, client));
            const externalUrl = data.data.get_externalUrl();
            if (data.isDownloaded && data.hasFailed) {
                throw json({
                    "message": "Some images are missing ! Please re-download it please"
                }, {
                    status: 403,
                    statusText: "Missing images"
                });
            } else if (externalUrl != undefined) {
                await open(externalUrl);
                throw json({
                    "message": "This chapter redirects into an external url."
                }, {
                    status: 405,
                    statusText: "External Url Chapter"
                });
            } else {
                return new Response(null, {
                    status: 204,
                    statusText: "Loaded"
                });
            }
        };
        try {
            const inner_query = queryClient.getQueryData<GetChapterByIdResult>(queryKey);
            if (inner_query != undefined) {
                if (inner_query.isDownloaded && inner_query.hasFailed) {
                    throw json({
                        "message": "Some images are missing ! Please re-download it please"
                    }, {
                        status: 403,
                        statusText: "Missing images"
                    });
                } else {
                    const chapter = inner_query.data;
                    const externalUrl = chapter.get_externalUrl();
                    if (externalUrl != undefined) {
                        await open(externalUrl);
                        throw json({
                            "message": "This chapter redirects into an external url. "
                        }, {
                            status: 405,
                            statusText: "External Url Chapter"
                        });
                    } else
                        if (chapter instanceof Chapter_withAllIncludes) {
                            return new Response(null, {
                                status: 204,
                                statusText: "Loaded"
                            });
                        } else if (chapter.get_relationships() == undefined || (chapter.get_relationships() ?? []).length <= 0) {
                            return await load();
                        } else {
                            return new Response(null, {
                                status: 204,
                                statusText: "Loaded"
                            });
                        }
                }
            } else {
                return await load();
            }
        } catch (error) {
            if (error instanceof Error || error instanceof Response) {
                throw error;
            } else {
                throw new Response(JSON.stringify(error), {
                    status: 500,
                    statusText: "Loader error"
                });
            }
        }


    } else {
        throw new Response(null, {
            status: 404,
            statusText: "Chapter ID Not Found"
        });
    }
};