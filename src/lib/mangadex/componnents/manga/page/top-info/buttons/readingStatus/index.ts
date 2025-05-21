import type { ReadingStatus } from "@mangadex/gql/graphql";

export type ReadingStatusEventDetail = {
	readingStatus: ReadingStatus | undefined;
	isFollowing: boolean;
	closeDialog?: () => void
};
