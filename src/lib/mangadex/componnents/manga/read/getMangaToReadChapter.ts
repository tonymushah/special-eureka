import type { Chapter } from "@mangadex/componnents/chapter/feed";
import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { getMangaAggregateChapterQuery } from "../page/chapters/aggreate/utils/query";
import chapterTitle from "@mangadex/utils/chapter/title";
import getChapterDownloadState from "@mangadex/componnents/home/latest-updates/getChapterDownloadState";
import { readable, type Readable } from "svelte/store";

const aggregateQuery = graphql(`
	query getMangatoReadAggregate($id: UUID!) {
		manga {
			aggregate(params: { mangaId: $id }) {
				default {
					volumes {
						volume
						chapters {
							ids
							count
							chapter
						}
					}
				}
			}
		}
	}
`);

async function getMangaToReadChapter(manga_id: string): Promise<Chapter[]> {
	const aggregateRes = await (async () => {
		const aggregateRes = await client
			.query(aggregateQuery, {
				id: manga_id
			})
			.toPromise();
		if (aggregateRes.data) {
			return aggregateRes.data;
		} else if (aggregateRes.error) {
			throw aggregateRes.error;
		} else {
			throw new Error("no data??");
		}
	})();
	const first_volume = aggregateRes.manga.aggregate.default.volumes.at(0)?.chapters.at(0)?.ids;
	if (first_volume?.length == 0 || first_volume == undefined) {
		return [];
	}
	const chapters = await (async () => {
		const res = await client
			.query(getMangaAggregateChapterQuery, {
				ids: first_volume
			})
			.toPromise();
		if (res.data) {
			return res.data;
		} else if (res.error) {
			throw res.error;
		} else {
			throw new Error("no data");
		}
	})();
	return chapters.chapter.list.data.map<Chapter>((c) => {
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
			chapterId: c.id,
			title,
			lang: c.attributes.translatedLanguage,
			uploader,
			upload_date: new Date(c.attributes.readableAt),
			download_state: getChapterDownloadState({
				id: c.id,
				client
			}),
			groups,
			comments: 0
		} satisfies Chapter;
	});
}

export default getMangaToReadChapter;

export function hasChapterToRead(manga_id: string): Readable<boolean> {
	return readable(false, (set) => {
		getMangaToReadChapter(manga_id).then((e) => {
			set(e.length != 0);
		});
	});
}
