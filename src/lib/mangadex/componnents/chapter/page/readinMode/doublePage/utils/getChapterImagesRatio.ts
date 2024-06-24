import { derived, type Readable } from "svelte/store";
import { getChapterImageContext } from "../../../contexts/images";
import getImageRatio from "./getImageRatio";

export default function getChapterImagesRatio(): Readable<[string[], Map<string, number>]> {
	const images = getChapterImageContext();
	return derived(
		images,
		($imgs, set, update) => {
			set([$imgs, new Map()]);
			$imgs.forEach((img) => {
				getImageRatio(img).then((ratio) => {
					update((inner) => {
						inner[1].set(img, ratio);
						return inner;
					});
				});
			});
		},
		[new Array<string>(), new Map()]
	);
}
