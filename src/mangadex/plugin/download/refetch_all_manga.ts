import { invoke } from "..";

export default async function refetch_all_manga() {
    const response = await invoke<string>("refetch_all_manga");
    const response_Json: {
        "result": "ok",
        "tasks": "patched",
        "type": "collection",
        "data": Array<string>
    } = JSON.parse(response);
    return response_Json;
}
