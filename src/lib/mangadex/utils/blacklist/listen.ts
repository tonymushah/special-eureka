import { getCurrentWebview } from "@tauri-apps/api/webview";

export function listenToBlacklistChange(listener: () => void): () => void {
	let maybe_unlisten = getCurrentWebview().listen("org.mangadex.blacklist.change", () => {
		listener();
	});
	return () => {
		maybe_unlisten.then((d) => d());
	};
}
