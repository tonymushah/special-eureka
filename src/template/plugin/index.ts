import { invoke as tauri_invoke, InvokeArgs } from "@tauri-apps/api/tauri";

const plugin_name = "speu-bilibili-comics";

export function getPluginName(command? : string){
  if(command == undefined){
    return plugin_name;
  }
  return `plugin:${plugin_name}|${command}`;
}

export function invoke<T = unknown>(command: string, args?: InvokeArgs){
  return tauri_invoke<T>(getPluginName(command), args);
}

export async function execute() {
  await invoke("execute");
}