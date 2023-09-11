import { invoke } from "..";

export default async function get_running_tasks(){
    return await invoke<number>("get_running_tasks");
}