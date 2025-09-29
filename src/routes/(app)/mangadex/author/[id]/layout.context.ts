import type { Client } from "@urql/svelte";
import query from "@mangadex/gql-docs/author/id";

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
			biography: authorData.attributes.biography,
			imageUrl: authorData.attributes.imageUrl,
			links: {
				twitter: authorData.attributes.twitter,
				pixiv: authorData.attributes.pixiv,
				melonBook: authorData.attributes.melonBook,
				fanBox: authorData.attributes.fanBox,
				booth: authorData.attributes.booth,
				nicoVideo: authorData.attributes.nicoVideo,
				skeb: authorData.attributes.skeb,
				fantia: authorData.attributes.fantia,
				tumblr: authorData.attributes.tumblr,
				youtube: authorData.attributes.youtube,
				weibo: authorData.attributes.weibo,
				naver: authorData.attributes.naver,
				website: authorData.attributes.website
			}
		} satisfies LayoutLoadReturnData;
	}
	throw new Error("Cannot find author/artist");
}

export type LayoutData = Awaited<ReturnType<typeof load>>;
