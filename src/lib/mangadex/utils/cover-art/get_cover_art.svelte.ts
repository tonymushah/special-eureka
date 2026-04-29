import coverNotFound from "@mangadex/assets/artworks/cover-not-found.jpg";
import { mangadexQueryClient, type GetCoverParam } from "@mangadex/index";
import { createQuery } from "@tanstack/svelte-query";
import { delay } from "lodash";
import type { Getter } from "runed";
import { get_cover_image_url } from "./get_cover_art";

function load_image(base_url: string) {
	return new Promise<string>((res, rej) => {
		delay(() => {
			let image = new Image();
			image.addEventListener("error", (ev) => {
				rej(ev.error);
			});
			image.addEventListener("load", () => {
				res(base_url);
			});
			image.src = base_url;
		}, 10);
	});
}

export function get_cover_image(_param: () => GetCoverParam, disabled?: Getter<boolean>) {
	let base_url = $derived.by(() => get_cover_image_url(_param()));
	return createQuery(
		() => ({
			queryKey: ["cover-image", base_url],
			async queryFn() {
				return await load_image(base_url).then((e) => {
					// console.log(`loaded ${e}`);
					return e;
				});
			},
			disabled: disabled?.(),
			// 15 mins
			staleTime: 15 * 60 * 1000
			// networkMode: "always"
		}),
		() => mangadexQueryClient
	);
}

export function get_cover_image_auto_handle_error(
	_param: () => GetCoverParam,
	disabled?: Getter<boolean>
) {
	let query = get_cover_image(_param, disabled);
	let maybe_url = $derived.by(() => {
		if (query.isSuccess) {
			return query.data;
		} else if (query.isError) {
			return coverNotFound;
		} else {
			return undefined;
		}
	});
	return {
		get value() {
			return maybe_url;
		}
	};
}
