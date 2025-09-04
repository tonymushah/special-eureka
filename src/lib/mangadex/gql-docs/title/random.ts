import { graphql } from "@mangadex/gql";

const query = graphql(`
	query randomTitle($options: MangaRandomParams) {
		manga {
			random(params: $options) {
				id
			}
		}
	}
`);

export default query;
