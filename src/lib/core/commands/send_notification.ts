import { invoke } from "@tauri-apps/api/core";

export type Urgency = "Low" | "Normal" | "Critical";

export type Notification = {
	summary: string;
	body?: string | null;
	timeout?: string | null;
	urgency?: Urgency | null;
};

export async function send_notification(notification: Notification) {
	await invoke("send_notification", {
		notification
	});
}
