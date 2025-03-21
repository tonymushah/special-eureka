import { MangaStatus } from "@mangadex/gql/graphql";
import type { StatusColor } from "@mangadex/utils/types/status";

export default function get_manga_status_color(status: MangaStatus): StatusColor {
	switch (status) {
		case MangaStatus.Cancelled:
			return "red";
		case MangaStatus.Completed:
			return "blue";
		case MangaStatus.Hiatus:
			return "purple";
		case MangaStatus.Ongoing:
			return "green";
		default:
			return "gray";
	}
}
