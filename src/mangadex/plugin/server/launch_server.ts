import { invoke } from "..";

export default async function launch_server(): Promise<string> {
    return await invoke<string>("launch_server");
}
