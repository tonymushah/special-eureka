import coverNotFound from "@mangadex/assets/artworks/cover-not-found.jpg";
import type { GetCoverParam } from "@mangadex/index";
import { createQuery } from "@tanstack/svelte-query";
import { get_cover_image_url } from "./get_cover_art";

export function get_cover_image(_param: () => GetCoverParam) {
	return createQuery(() => {
		const base_url = get_cover_image_url(_param());
		return {
			queryKey: ["cover-image", base_url],
			queryFn() {
				return new Promise<string>((res, rej) => {
					let image = new Image();
					image.addEventListener("error", (ev) => {
						rej(ev.error);
					});
					image.addEventListener("load", () => {
						res(base_url);
					});
					image.src = base_url;
				});
			},
			networkMode: "always"
		};
	});
}

export function get_cover_image_auto_handle_error(_param: () => GetCoverParam) {
	let query = get_cover_image(_param);
	return $derived.by(() => {
		if (query.isSuccess) return query.data;
		if (query.isError) return coverNotFound;
	});
}
