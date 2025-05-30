import { ContextMenuItemProvider } from "$lib/commands/contextMenu";
import { delay } from "lodash";

const defaultContextMenuContent = () => [
	ContextMenuItemProvider.menuItem({
		text: "Back",
		action() {
			history.back();
		}
	}),
	ContextMenuItemProvider.menuItem({
		text: "Forward",
		action() {
			history.forward();
		}
	}),
	ContextMenuItemProvider.menuItem({
		text: "Reload",
		action() {
			delay(() => {
				location.reload();
			}, 20);
		}
	})
];

export default defaultContextMenuContent;
