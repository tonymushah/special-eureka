import { invoke as tauri_invoke } from "@tauri-apps/api";
import { InvokeArgs } from "@tauri-apps/api/tauri";
export * from "./server";
export * from "./download";

const plugin_name = "mangadex-desktop-api"

export function getPluginName(command?: string){
    return `plugin:${plugin_name}|${command}`;
}

export function invoke<T = unknown>(command: string, args?: InvokeArgs){
  return tauri_invoke<T>(getPluginName(command), args)
}