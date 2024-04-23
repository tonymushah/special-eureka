import { graphql } from "@mangadex/gql";

const mangaAggregateQuery = graphql(`
    query mangaAggregate($id: UUID!, $size: Int = 3) {
        manga {
            aggregate(params: {mangaId: $id}) {
                chunked(chunkSize: $size) {
                    ids
                    volumes {
                        volume
                        count
                        chapters {
                            chapter
                            count
                            ids
                        }
                    }
                }
            }
        }
    }
`);


export default mangaAggregateQuery