import { playFahh } from "@special-eureka/core/fahh/play";
import { isAprilsFoolsDay } from "@special-eureka/core/utils/isAprilFouls";

export const fahh = $state({
	shouldPlay: isAprilsFoolsDay(),
	force: isAprilsFoolsDay()
});

export function playMDFahh() {
	if (fahh.shouldPlay) {
		playFahh();
	}
}
