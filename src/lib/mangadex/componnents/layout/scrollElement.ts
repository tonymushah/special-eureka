import { debounce } from "es-toolkit/compat";

export const scrollElementId = "mangadex-scroll-container";

export const preventScroll = debounce(() => {
	const element = document.getElementById(scrollElementId);
	if (element) element.style.overflowY = "hidden";
});

export const makeScroll = debounce(() => {
	const element = document.getElementById(scrollElementId);
	if (element) element.style.overflowY = "auto";
});