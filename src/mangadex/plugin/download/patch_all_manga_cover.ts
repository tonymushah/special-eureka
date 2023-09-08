import { invoke } from "..";

export default async function patch_all_manga_cover() {
    const response = await invoke<string>("patch_all_manga_cover");
    const response_Json: {
        "result": "ok",
        "tasks": "patched",
        "type": "collection",
        "data": Array<string>
    } = JSON.parse(response);
    return response_Json;
}
