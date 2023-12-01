import { Client } from "@tauri-apps/api/http";
import { Manga_with_allRelationship } from "@mangadex/api/structures/Manga";
import { Offset_limits } from "@mangadex/api/internal/Utils";


export default async function get_author_works_promise(props: {
    author_id: string;
    client: Client;
}) {
    return await Manga_with_allRelationship.search({
        offset_Limits: new Offset_limits(),
        authorOrArtist: props.author_id
    });
}
