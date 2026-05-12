import { graphql } from "@mangadex/gql/gql";

const sidebarDir = graphql(`
	query getSidebarDir {
		userOption {
			getSidebarDirection
		}
	}
`);

export default sidebarDir;