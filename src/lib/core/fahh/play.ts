import { debounce } from "lodash";
import sound from "./sound.opus";

export const playFahh = debounce(() => {
	const audio = new Audio(sound);
	audio.play();
});
