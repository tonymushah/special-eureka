import { invoke } from "..";

export default async function is_server_started(): Promise<boolean>{
    return await invoke<boolean>("is_server_started");
}