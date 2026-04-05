import type { UnlistenFn } from "@tauri-apps/api/event";
import { getCurrentWebview } from "@tauri-apps/api/webview";

const EVENT = "special-eureka://uploads-might-requires-some-staff-approvals";

export function listenToUploadsMightRequiresSomeStaffApprovals(fun: () => {}): UnlistenFn {
	const maybeUnlisten = getCurrentWebview().listen<boolean>(EVENT, (_ev) => {
		fun();
	});
	return () => {
		maybeUnlisten.then((u) => u()).catch(console.warn);
	};
}
