import { Asc_Desc, Offset_limits, Order } from "@mangadex/api/internal/Utils";
import UserOptions from "@mangadex/api/internal/UserOptions";
import GetChapterByIdResult from "@mangadex/api/structures/additonal_types/GetChapterByIdResult";
import { Chapter } from "@mangadex/api/structures/Chapter";
import { get_chapter_queryKey } from "@mangadex/resources/hooks/ChapterStateHooks/get_chapter_queryKey";
import { QueryClient } from "@tanstack/react-query";
import { Client } from "@tauri-apps/api/http";


export async function queryFn({ offset_Limits, id, client, queryClient }: {
    offset_Limits: Offset_limits;
    id: string;
    client?: Client;
    queryClient: QueryClient;
}) {
    const userOptions = new UserOptions();
    const languages = await userOptions.getLanguages();
    const search_result = await Chapter.search({
        offset_limits: offset_Limits,
        "group": [
            id
        ],
        order: new Order(Asc_Desc.desc()),
        translatedLanguage: languages.map((value) => value.get_two_letter()),
        client: client
    });
    search_result.get_data().forEach((chapter) => {
        Chapter.downloaded(chapter.get_id(), client).then((value) => {
            const queryKey = get_chapter_queryKey({
                id: chapter.get_id()
            });
            queryClient.setQueryData<GetChapterByIdResult>(queryKey, {
                "data": chapter,
                hasFailed: value.hasFailed,
                "isDownloaded": value.isDownloaded
            });
        });
    });
    return search_result;
}
