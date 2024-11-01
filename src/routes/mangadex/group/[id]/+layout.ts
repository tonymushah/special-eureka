import { graphql } from "@mangadex/gql";
import type { LayoutLoad } from "./$types";
import getClient from "@mangadex/gql/urql/getClient";
import { error } from "@sveltejs/kit";

const query = graphql(`
    query groupPageQuery($id: UUID!) {
        scanlationGroup {
            getUnique(id: $id) {
                id
                attributes {
                    website
                    twitter
                    name
                    altNames
                    ircServer
                    ircChannel
                    contactEmail
                    mangaUpdates
                    focusedLanguages
                    locked
                    official
                    verified
                    exLicensed
                    publishDelay
                    createdAt
                }
                relationships {
                    leader {
                        id
                        attributes {
                            roles
                            username
                        }
                    }
                    members {
                        id
                        attributes {
                            roles
                            username
                        }
                    }
                }
            }
        }
        manga {
            list(params: {group: $id}) {
                total
            }
        }
    }
`);

export const load: LayoutLoad = async function ({ params }) {
    const id = params.id;
    const client = await getClient();
    const res = await client.query(query, {
        id
    }).toPromise();
    if (res.error) error(500, res.error.message);
    if (res.data) {
        const data = res.data;
        const groupData = data.scanlationGroup.getUnique;
        const leader = (() => {
            const inner_leader = groupData.relationships.leader;
            if (inner_leader)
                return {
                    id: inner_leader.id,
                    name: inner_leader.attributes.username,
                    roles: inner_leader.attributes.roles
                }
        })()
        return {
            id: groupData.id,
            website: groupData.attributes.website,
            twitter: groupData.attributes.twitter,
            name: groupData.attributes.name,
            altNames: groupData.attributes.altNames,
            ircServer: groupData.attributes.ircServer,
            ircChannel: groupData.attributes.ircChannel,
            email: groupData.attributes.contactEmail,
            mangaUpdates: groupData.attributes.mangaUpdates,
            focusedLanguages: groupData.attributes.focusedLanguages,
            locked: groupData.attributes.locked,
            official: groupData.attributes.official,
            verified: groupData.attributes.verified,
            exLicensed: groupData.attributes.exLicensed,
            publishDelay: groupData.attributes.publishDelay,
            createdAt: groupData.attributes.createdAt,
            leader,
            members: groupData.relationships.members.map((member) => ({
                id: member.id,
                name: member.attributes.username,
                roles: member.attributes.roles
            }))
        }
    }
    error(500, "No data??");
}