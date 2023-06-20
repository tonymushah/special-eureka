import { invoke } from "..";

export async function launch_server(): Promise<string> {
    return await invoke<string>("launch_server");
}

export async function stop_server(): Promise<string> {
    return await invoke<string>("stop_server");
}

export async function reset_queue(): Promise<string> {
    return await invoke<string>("reset_queue");
}

export async function is_server_started(): Promise<boolean>{
    return await invoke<boolean>("is_server_started");
}