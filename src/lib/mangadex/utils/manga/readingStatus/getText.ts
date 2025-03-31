import { ReadingStatus } from "@mangadex/gql/graphql";

export default function getText(status: ReadingStatus | undefined): string | undefined {
	switch (status) {
		case ReadingStatus.Reading:
			return "Reading";
		case ReadingStatus.Completed:
			return "Completed";
		case ReadingStatus.Dropped:
			return "Dropped";
		case ReadingStatus.OnHold:
			return "On Hold";
		case ReadingStatus.PlanToRead:
			return "Plan to Read";
		case ReadingStatus.ReReading:
			return "Re-Reading";
		default:
			return undefined;
	}
}
