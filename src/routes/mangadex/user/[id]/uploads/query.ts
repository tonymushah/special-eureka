import { graphql } from "@mangadex/gql";

export const query = graphql(`
    query userUploadsFeed($user: UUID!, $translatedLanguages: [Language!]! = [], $offset: Int, $limit: Int, $order: ChapterSortOrder! = {publishAt: DESCENDING}, $mangaListParams: MangaListParams = {}) {
        chapter {
            listWithGroupByManga(
                chapterListParams: {offset: $offset, limit: $limit, translatedLanguages: $translatedLanguages, uploaders: [$user], order: $order}
                mangaListParams: $mangaListParams
            ) {
                limit
                offset
                total
                data {
                    manga {
                        id
                        attributes {
                            title
                            originalLanguage
                            lastVolume
                            lastChapter
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
                    chapters {
                        id
                        attributes {
                            title
                            chapter
                            volume
                            translatedLanguage
                            externalUrl
                            createdAt
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
                                    roles
                                    username
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);
