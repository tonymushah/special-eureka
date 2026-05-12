import { debounce } from "es-toolkit/compat";
import sound from "./sound.opus";

export const playFahh = debounce(() => {
	const audio = new Audio(sound);
	audio.play();
});