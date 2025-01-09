import { graphql } from "../gql";

const sideDirGQLDoc = graphql(/* GraphQL */ `
	subscription rtlSidebarSub {
		watchSidebarDirection
	}
`);

export default sideDirGQLDoc;
