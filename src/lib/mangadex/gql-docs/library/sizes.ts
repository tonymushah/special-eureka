import { graphql } from "@mangadex/gql/gql";

const librarySizeQuery = graphql(`
	query librarySize {
		library {
			size {
				unfiltered
				completed
				dropped
				planToRead
				reading
				reReading
				onHold
			}
		}
	}
`);

export default librarySizeQuery;
