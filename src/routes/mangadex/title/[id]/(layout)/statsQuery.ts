import { graphql } from "@mangadex/gql";

const query = graphql(`
    query mangaStatistics($id: UUID!) {
        statistics {
            manga {
                get(id: $id) {
                    comments {
                        threadUrl
                        repliesCount
                    }
                    followCount
                    rating {
                        bayesian
                        distrubution {
                            r1
                            r2
                            r3
                            r4
                            r5
                            r6
                            r7
                            r8
                            r9
                            r10
                        }
                    }
                }
            }
        }
    }
`);

export default query;