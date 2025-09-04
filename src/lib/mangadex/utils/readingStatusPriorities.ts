import { MaltitlePriority, type ReadingStatusPriorities } from "@mangadex/gql/graphql";

export default function defaultReadingStatusPriorities(): ReadingStatusPriorities {
	return {
		completed: MaltitlePriority.Low,
		dropped: MaltitlePriority.Low,
		onHold: MaltitlePriority.Medium,
		planToRead: MaltitlePriority.Medium,
		reReading: MaltitlePriority.High,
		reading: MaltitlePriority.High
	};
}
