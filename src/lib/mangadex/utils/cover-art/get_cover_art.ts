import type { GetCoverParam } from "@mangadex/index";

export function get_cover_image_url(param: GetCoverParam): string {
	return window.__MANGADEX_UTILS__.__getCoverImageUrl(param);
}
