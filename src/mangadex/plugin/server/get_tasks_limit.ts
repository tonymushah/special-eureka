import { invoke } from "..";

export default async function get_tasks_limit(){
    return await invoke<number>("get_tasks_limit");
}