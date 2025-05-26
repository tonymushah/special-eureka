import { client } from "@mangadex/gql/urql";
import { chapterCommentsQuery, getMangaAggregateChapterQuery } from "./query";
import type { ComponentProps } from "svelte";
import chapterTitle from "@mangadex/utils/chapter/title";
import getChapterDownloadState from "@mangadex/componnents/home/latest-updates/getChapterDownloadState";
import ChapterElement1 from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";

export async function fetchChapters(ids: string[]) {
	const result = await client
		.query(getMangaAggregateChapterQuery, {
			ids
		})
		.toPromise();
	if (result.error) {
		throw result.error;
	}
	const chapters = result.data?.chapter.list.data.map<ComponentProps<typeof ChapterElement1>>(
		(c) => {
			const title = chapterTitle({
				chapter: c.attributes.chapter,
				title: c.attributes.title
			});
			const groups = c.relationships.scanlationGroups.map((group) => ({
				id: group.id,
				name: group.attributes.name
			}));
			const user = c.relationships.user;
			const uploader = {
				id: user.id,
				roles: user.attributes.roles,
				name: user.attributes.username
			};
			return {
				id: c.id,
				title,
				lang: c.attributes.translatedLanguage,
				uploader,
				upload_date: new Date(c.attributes.readableAt),
				download_state: getChapterDownloadState({
					id: c.id,
					client
				}),
				groups
			};
		}
	);
	return chapters;
}

export async function fetchComments(ids: string[]) {
	const res = await client
		.query(chapterCommentsQuery, {
			ids
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
	const ret: { id: string; stats: { threadUrl: string; comments: number } }[] = [];
	res.data?.statistics.chapter.list.forEach((d) => {
		const c = d.comments;
		if (c != null || c != undefined) {
			ret.push({
				id: d.id,
				stats: {
					threadUrl: c.threadUrl,
					comments: c.repliesCount
				}
			});
		}
	});
	return ret;
}
