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
				return new Promise<string>((res) => {
					let image = new Image();
					image.addEventListener("error", () => {
						res(coverNotFound);
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
