import { graphql } from "@mangadex/gql/exports";
import type { Client } from "@urql/svelte";
import { reduce } from "lodash";

export const chaptersStatsQuery = graphql(`
	query chaptersStats($ids: [UUID!]!) {
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

export type ChapterCommentData = {
	threadUrl: string;
	repliesCount: number;
};

export default async function get_chapters_stats(
	client: Client,
	ids: string[],
	ignoreError: boolean = false
): Promise<Map<string, ChapterCommentData>> {
	const res = await client
		.query(chaptersStatsQuery, {
			ids
		})
		.toPromise();
	if (res.error && !ignoreError) {
		throw res.error;
	}
	if (res.data) {
		return reduce(
			res.data.statistics.chapter.list,
			(acc, item) => {
				if (item.comments)
					acc.set(item.id, {
						threadUrl: item.comments.threadUrl,
						repliesCount: item.comments.repliesCount
					});
				return acc;
			},
			new Map<string, ChapterCommentData>()
		);
	}
	return new Map<string, ChapterCommentData>();
}
