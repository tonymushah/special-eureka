import { derived, type Readable } from "svelte/store";
import { getChapterImagesRatioContext } from "../../../contexts/images-double-ratio";
import getImageRatio from "./getImageRatio";

export function getChapterImagesRatioStore(images: Readable<string[]>): Readable<Map<string, number>> {
	return derived(
		images,
		($imgs, set, update) => {
			Promise.allSettled(
				$imgs.map(async (img) => {
					return [img, await getImageRatio(img)];
				})
			).then((results) => {
				update((inner) => {
					inner.clear();
					return inner;
				});
				results.forEach((res) => {
					if (res.status == "fulfilled") {
						update((inner) => {
							const [img, ratio] = res.value;
							inner.set(img, ratio);
							return inner;
						});
					}
				});
			});
			/*update((inner) => {
				$imgs.forEach((img) => {
					getImageRatio(img).then((ratio) => {
						inner.set(img, ratio);
					});
				});
				return inner;
			});*/
		},
		new Map()
	);
}

export default function getChapterImagesRatio(): Readable<Map<string, number>> {
	return getChapterImagesRatioContext()
}
