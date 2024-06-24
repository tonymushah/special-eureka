import { derived, type Readable } from "svelte/store";
import { getChapterImageContext } from "../../../contexts/images";
import getImageRatio from "./getImageRatio";

export default function getChapterImagesRatio(): Readable<Map<string, number>> {
	const images = getChapterImageContext();
	return derived(
		images,
		($imgs, set, update) => {
			$imgs.forEach((img) => {
				getImageRatio(img).then((ratio) => {
					update((inner) => {
						inner.set(img, ratio);
						return inner;
					});
				});
			});
		},
		new Map()
	);
}
