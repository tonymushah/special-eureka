import { autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";

async function update({
	triggerElement,
	menuElement
}: { triggerElement?: HTMLElement; menuElement?: HTMLElement } = {}) {
	if (triggerElement && menuElement) {
		const { x, y } = await computePosition(triggerElement, menuElement, {
			placement: "bottom",
			middleware: [
				offset(3),
				flip(),
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
	setOpen,
	sameWidth,
	closeOnOutClick
}: {
	open: () => boolean;
	triggerElement?: () => HTMLElement | undefined;
	menuElement?: () => HTMLElement | undefined;
	showMenuDisplay?: string;
	hideMenuDisplay?: string;
	closeOnClick?: boolean;
	setOpen?: (o: boolean) => void;
	sameWidth?: boolean;
	closeOnOutClick?: boolean;
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
		if (menu && trigger) {
			menu.style.display = showMenuDisplay ?? "block";
			if (sameWidth) menu.style.width = `${trigger.clientWidth}px`;
			innerUpdate();
		}
	};
	const hideMenu = () => {
		if (menu) {
			menu.style.display = hideMenuDisplay ?? "";
			menu.style.width = "";
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
		if (menu && closeOnOutClick && open == true && trigger) {
			const menuEvClick = (_e: MouseEvent) => {
				if (_e.target instanceof Node) {
					if (!menu.contains(_e.target) && !trigger.contains(_e.target)) {
						setOpen?.(false);
					}
				}
			};
			window.addEventListener("click", menuEvClick);
			return () => {
				window.removeEventListener("click", menuEvClick);
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
