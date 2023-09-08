import { invoke } from "..";

export default async function reset_queue(): Promise<string> {
    return await invoke<string>("reset_queue");
}