import { graphql } from "@mangadex/gql";

export const userMeSubDoc = graphql(`
    subscription userMe($sub_id: UUID!) {
        watchUserMe(subId: $sub_id) {
            username
            roles
        }
    }
`);

export const isLoggedSubDoc = graphql(`
    subscription isLogged($sub_id: UUID!) {
        watchIsLogged(subId: $sub_id)
    }  
`);