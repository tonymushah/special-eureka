import { graphql } from "@mangadex/gql";

const getRelatedTitlesDataQuery = graphql(`
    query getRelatedTitlesData($ids: [UUID!]!) {
        manga {
            list(params: {mangaIds: $ids}) {
                data {
                    id
                    attributes {
                        title
                        status
                        description
                    }
                    relationships {
                        coverArt {
                            id
                            attributes {
                                fileName
                            }
                        }
                    }
                }
            }
        }
    }
`);

export default getRelatedTitlesDataQuery;