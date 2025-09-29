import query from "@mangadex/gql-docs/group/id";
import getClient from "@mangadex/gql/urql/getClient";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async function ({ params }) {
	const id = params.id;
	const client = await getClient();
	const res = await client
		.query(query, {
			id
		})
		.toPromise();
	if (res.error) error(500, res.error.message);
	if (res.data) {
		const data = res.data;
		const groupData = data.scanlationGroup.getUnique;
		const mangaListData = data.manga.list;
		const groupStatisticsData = data.statistics.group.get;
		const chapterListData = data.chapter.list;
		const leader = (() => {
			const inner_leader = groupData.relationships.leader;
			if (inner_leader)
				return {
					id: inner_leader.id,
					name: inner_leader.attributes.username,
					roles: inner_leader.attributes.roles
				};
		})();
		return {
			id: groupData.id,
			description: groupData.attributes.description,
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
			createdAt: new Date(groupData.attributes.createdAt),
			leader,
			members: groupData.relationships.members.map((member) => ({
				id: member.id,
				name: member.attributes.username,
				roles: member.attributes.roles,
				isLeader: member.id == leader?.id
			})),
			titles: mangaListData.total,
			uploads: chapterListData.total,
			comments: groupStatisticsData.comments,
			discord: groupData.attributes.discord
		};
	}
	error(500, "No data??");
};
