import query from "@mangadex/gql-docs/author/id";
import { transformToStringRecord } from "@mangadex/utils/transformToStringRecord";
import type { Client } from "@urql/svelte";

export type AuthorLinks = {
	twitter?: string;
	pixiv?: string;
	melonBook?: string;
	fanBox?: string;
	booth?: string;
	nicoVideo?: string;
	skeb?: string;
	fantia?: string;
	tumblr?: string;
	youtube?: string;
	weibo?: string;
	naver?: string;
	website?: string;
};

export type LayoutLoadReturnData = {
	id: string;
	titles: number;
	biography: Record<string, string>;
	imageUrl?: string;
	banner?: string;
	name: string;
	links: AuthorLinks;
	isBlocked: boolean;
};

export async function load({ id, client }: { id: string; client: Client }) {
	const res = await client
		.query(query, {
			id
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
	if (res.data) {
		const data = res.data;
		const authorData = data.author.get;
		return {
			id: authorData.id,
			titles: data.manga.list.total,
			name: authorData.attributes.name,
			biography: transformToStringRecord(authorData.attributes.biography),
			imageUrl: authorData.attributes.imageUrl ?? undefined,
			links: {
				twitter: authorData.attributes.twitter ?? undefined,
				pixiv: authorData.attributes.pixiv ?? undefined,
				melonBook: authorData.attributes.melonBook ?? undefined,
				fanBox: authorData.attributes.fanBox ?? undefined,
				booth: authorData.attributes.booth ?? undefined,
				nicoVideo: authorData.attributes.nicoVideo ?? undefined,
				skeb: authorData.attributes.skeb ?? undefined,
				fantia: authorData.attributes.fantia ?? undefined,
				tumblr: authorData.attributes.tumblr ?? undefined,
				youtube: authorData.attributes.youtube ?? undefined,
				weibo: authorData.attributes.weibo ?? undefined,
				naver: authorData.attributes.naver ?? undefined,
				website: authorData.attributes.website ?? undefined
			},
			isBlocked: authorData.isBlocked
		} satisfies LayoutLoadReturnData;
	}
	throw new Error("Cannot find author/artist");
}

export type LayoutData = Awaited<ReturnType<typeof load>>;