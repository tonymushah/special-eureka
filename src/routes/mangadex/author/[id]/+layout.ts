import { graphql } from "@mangadex/gql";

const query = graphql(`
    query authorPageQuery($id: UUID!) {
        author {
            get(id: $id) {
                id
                attributes {
                    name
                    imageUrl
                    biography
                    twitter
                    pixiv
                    melonBook
                    fanBox
                    booth
                    nicoVideo
                    skeb
                    fantia
                    tumblr
                    youtube
                    weibo
                    naver
                    website
                }
            }
        }
        manga {
            list(params: {authorOrArtist: $id}) {
                total
            }
        }
    }
`);