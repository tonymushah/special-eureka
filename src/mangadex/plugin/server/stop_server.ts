import { invoke } from "..";

export default async function stop_server(): Promise<string> {
    return await invoke<string>("stop_server");
}
