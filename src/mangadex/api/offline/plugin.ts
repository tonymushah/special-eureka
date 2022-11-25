import { invoke } from '@tauri-apps/api/tauri'

export async function launch_server() : Promise<string> {
  return await invoke<string>('plugin:mangadex-desktop-api|launch_server');
}

export async function stop_server() : Promise<string> {
  return await invoke<string>('plugin:mangadex-desktop-api|stop_server');
}