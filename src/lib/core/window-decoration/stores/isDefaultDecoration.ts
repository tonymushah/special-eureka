import toggleDecoration from "@special-eureka/cover/commands/toggleDecoration";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import { readable, type Readable } from "svelte/store";
const appWindow = getCurrentWebviewWindow();

const isDefaultDecoration = readable(true, (set) => {
	appWindow.isDecorated().then(set);
	const unlisten = appWindow.listen<boolean>("decoration", () => {
		appWindow.isDecorated().then(set);
	});
	return () => {
		unlisten.then((u) => u());
	};
});

export async function setDecoration(isDecorated: boolean) {
	await toggleDecoration(isDecorated);
}

export default isDefaultDecoration satisfies Readable<boolean>;
