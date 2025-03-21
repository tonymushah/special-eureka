import { MangaStatus } from "@mangadex/gql/graphql";

export default function getText(status: MangaStatus): string | undefined {
	switch (status) {
		case MangaStatus.Cancelled:
			return "Cancelled";
		case MangaStatus.Completed:
			return "Completed";
		case MangaStatus.Hiatus:
			return "Hiatus";
		case MangaStatus.Ongoing:
			return "Ongoing";
		default:
			break;
	}
}
