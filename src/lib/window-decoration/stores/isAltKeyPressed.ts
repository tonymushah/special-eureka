import { writable } from "svelte/store";

const isAltKeyPressed = writable(false, (set) => {
	const e: (ev: KeyboardEvent) => void = (ev) => {
		set(ev.altKey);
	};
	window.addEventListener("keydown", e);
	return () => {
		window.removeEventListener("keydown", e);
	};
});

export default isAltKeyPressed;
