import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { readable } from "svelte/store";

export type Update = {
	version: string;
	current_version: string;
	description?: string | null;
	publish_date?: string | null;
};

export async function check_for_updates(): Promise<Update | null> {
	const res = await invoke<Update | null>("check_for_updates");
	return res;
}

export async function download_and_install_updates(): Promise<void> {
	await invoke("download_and_install_updates");
}

const UPDATE_PAYLOAD_EVENT_KEY = "special-eureka://update-state";

export type UpdatePayload =
	| "Starting"
	| {
			Downloading: {
				downloaded: number;
				content_lenght?: number | undefined;
			};
	  }
	| "Finished";

export const updateState = readable<UpdatePayload | null>(null, (set) => {
	const unlisten_fn = listen<UpdatePayload>(UPDATE_PAYLOAD_EVENT_KEY, (e) => {
		set(e.payload);
	});
	return () => {
		unlisten_fn.then((u) => {
			u();
		});
	};
});
