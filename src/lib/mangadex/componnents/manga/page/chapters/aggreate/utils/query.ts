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

export const getMangaAggregateChapterQuery = graphql(`
    query getMangaAggregateChapter($ids: [UUID!]!) {
        chapter {
            list(params: {chapterIds: $ids}) {
                data {
                    id
                    attributes {
                        title
                        volume
                        chapter
                        translatedLanguage
                        readableAt
                    }
                    relationships {
                        scanlationGroups {
                            id
                            attributes {
                                name
                            }
                        }
                        user {
                            id
                            attributes {
                                username
                                roles
                            }
                        }
                    }
                }
            }
        }
    }
`);

export const chapterCommentsQuery = graphql(`
    query chapterAggregateComments($ids: [UUID!]!) {
        statistics {
            chapter {
                list(ids: $ids) {
                    id
                    comments {
                        threadUrl
                        repliesCount
                    }
                }
            }
        }
    }
`);