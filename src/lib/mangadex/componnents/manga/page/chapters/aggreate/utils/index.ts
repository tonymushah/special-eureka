import { dev } from "$app/environment";
import ChapterElement1 from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
import getChapterDownloadState from "@mangadex/componnents/home/latest-updates/getChapterDownloadState";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import chapterTitle from "@mangadex/utils/chapter/title";
import type { ComponentProps } from "svelte";
import { v7 } from "uuid";
import { chapterCommentsQuery, getMangaAggregateChapterQuery } from "./query";

export async function fetchChapters({
	ids,
	feedContent,
	lastChapter,
	lastVolume
}: {
	ids: string[];
	feedContent?: boolean;
	lastChapter?: string;
	lastVolume?: string;
}) {
	const result = await client
		.query(getMangaAggregateChapterQuery, {
			ids,
			feedContent
		})
		.toPromise();
	if (result.error) {
		throw result.error;
	}
	if (dev) mangadexQueryClient.setQueryData(["getMangaAggregateChapterQuery", v7()], () => result);
	const chapters = result.data?.chapter.list.data.map<ComponentProps<typeof ChapterElement1>>(
		(c) => {
			let isLastChapter = false;
			if (lastChapter) {
				isLastChapter = c.attributes.chapter == lastChapter;
			}
			let isLastVolume = false;
			if (lastVolume) {
				isLastVolume = c.attributes.volume == lastVolume;
			}
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
				groups,
				end: isLastChapter && isLastVolume
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
