import { graphql } from "@mangadex/gql";
import type { LayoutLoad } from "./$types";
import getClient from "@mangadex/gql/urql/getClient";

const query = graphql(`
    query userPageQuery($id: UUID!) {
        user {
            get(id: $id) {
                id 
                attributes {
                    username 
                    roles
                }
                relationships {
                    groups {
                        id
                        attributes {
                            name
                        }
                        relationships {
                            leader {
                                id
                            }
                        }
                    }
                }
            }
        }
        chapter {
            list(params: {
                uploaders:  [$id]
            }) {
                total
            }
        }
    }
`);

export const load: LayoutLoad = async function ({ params }) {
    const { id } = params;
    const client = await getClient();
    const res = await client.query(query, {
        id
    }).toPromise();
    if (res.error) {
        throw res.error
    }
    if (res.data) {
        const data = res.data;
        return {
            id,
            username: data.user.get.attributes.username,
            roles: data.user.get.attributes.roles,
            uploads: data.chapter.list.total,
            groups: data.user.get.relationships.groups.map((group) => ({
                id: group.id,
                name: group.attributes.name,
                isLeader: group.relationships.leader?.id == id
            }))
        }
    }
    throw new Error("No result data got");
}