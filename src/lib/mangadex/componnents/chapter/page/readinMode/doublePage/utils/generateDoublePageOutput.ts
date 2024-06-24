import { a } from "vitest/dist/suite-UrZdHRff.js";
import type { ChapterDoublePageImage } from "./getChapterImagesAsDoublePage";

export default function generateDoublePageOutput(
	iratios: Map<string, number>
): ChapterDoublePageImage[] {
	const output: Array<ChapterDoublePageImage> = [];
	let accumalator: string[] = [];
	function push_acc_to_out1() {
		if (accumalator.length == 1) {
			output.push(accumalator[0]);
		} else if (accumalator.length == 2) {
			output.push([accumalator[0], accumalator[1]]);
		}
		accumalator = [];
	}
	function push_acc_to_out2() {
		if (accumalator.length == 2) {
			output.push([accumalator[0], accumalator[1]]);
			accumalator = [];
		}
	}
	iratios.forEach((value, key) => {
		if (value < 1) {
			accumalator.push(key);
		} else {
			push_acc_to_out1();
			output.push(key);
		}
		push_acc_to_out2();
	});
	push_acc_to_out1();
	return output;
}
