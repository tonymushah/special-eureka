import { graphql } from "@mangadex/gql";

export const query = graphql(`
    query authorsSearch($params: AuthorListParams!){
        author {
            list(params: $params) {
                limit 
                offset 
                total
                data {
                    id
                    attributes {
                        name
                    }
                    relationships {
                        works {
                            id
                        }
                    }
                }
            }
        }
    }
`);