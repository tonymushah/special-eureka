import { graphql } from "@mangadex/gql";

export const defaultQuery = graphql(`
    query defaultMangaSearchQuery($params: MangaListParams!) {
        manga {
            list(params: $params) {
                limit
                offset
                total
                data {
                    id 
                    attributes {
                        description
                        year
                        title
                            status
                        state
                        tags {
                            id 
                            attributes {
                                name
                            }
                        }
                        contentRating
                    }
                    relationships {
                        coverArt {
                            id
                            attributes {
                                description
                                fileName
                            }
                        }
                    }
                }
            }
        }
    }
`);

export const offlineQuery = graphql(`
    query offlineMangaSearchQuery($params: MangaListParams!) {
        manga {
            listOffline(params: $params) {
                limit
                offset
                total
                data {
                    id 
                    attributes {
                        description
                        year
                        title
                            status
                        state
                        tags {
                            id 
                            attributes {
                                name
                            }
                        }
                        contentRating
                    }
                    relationships {
                        coverArt {
                            id
                            attributes {
                                description
                                fileName
                            }
                        }
                    }
                }
            }
        }
    }
`);