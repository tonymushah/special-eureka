import { graphql } from "../gql";

const sideDirGQLDoc = graphql(/* GraphQL */`
    subscription rtlSidebarSub($sub_id: UUID!) {
        watchSidebarDirection(subId: $sub_id)
    }
`)

export default sideDirGQLDoc;