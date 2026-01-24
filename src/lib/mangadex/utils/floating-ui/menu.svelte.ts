import { autoPlacement, autoUpdate, computePosition, offset, shift } from "@floating-ui/dom";

async function update({
	triggerElement,
	menuElement
}: { triggerElement?: HTMLElement; menuElement?: HTMLElement } = {}) {
	if (triggerElement && menuElement) {
		const { x, y } = await computePosition(triggerElement, menuElement, {
			middleware: [
				offset(6),
				autoPlacement(),
				shift({
					padding: 5
				})
			]
		});
		Object.assign(menuElement.style, {
			left: `${x}px`,
			top: `${y}px`
		});
	}
}

export function floatingUImenu({
	open: _open,
	triggerElement,
	menuElement,
	showMenuDisplay,
	hideMenuDisplay,
	closeOnClick,
	setOpen
}: {
	open: () => boolean;
	triggerElement?: () => HTMLElement | undefined;
	menuElement?: () => HTMLElement | undefined;
	showMenuDisplay?: string;
	hideMenuDisplay?: string;
	closeOnClick?: boolean;
	setOpen?: (o: boolean) => void;
}) {
	const trigger = $derived(triggerElement?.());
	const menu = $derived(menuElement?.());
	const innerUpdate = () => {
		return update({
			triggerElement: trigger,
			menuElement: menu
		});
	};
	const showMenu = () => {
		if (menu) {
			menu.style.display = showMenuDisplay ?? "block";
			innerUpdate();
		}
	};
	const hideMenu = () => {
		if (menu) {
			menu.style.display = hideMenuDisplay ?? "";
		}
	};
	const open = $derived(_open());
	$effect(() => {
		if (menu && closeOnClick) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const menuEvClick = (_e: MouseEvent) => {
				setOpen?.(false);
			};
			menu.addEventListener("click", menuEvClick);
			return () => {
				menu.removeEventListener("click", menuEvClick);
			};
		}
	});
	$effect(() => {
		if (open == true) {
			showMenu();
			if (trigger && menu) {
				return autoUpdate(trigger, menu, innerUpdate);
			}
		} else {
			hideMenu();
		}
	});
}
