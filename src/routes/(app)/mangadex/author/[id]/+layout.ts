import query from "@mangadex/gql-docs/author/id";
import getClient from "@mangadex/gql/urql/getClient";
import { error } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

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

export const load: LayoutLoad = async ({ params }) => {
	const id = params.id;
	const client = await getClient();
	const res = await client
		.query(query, {
			id
		})
		.toPromise();
	if (res.error) {
		error(500, {
			message: res.error.message
		});
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
	error(500, {
		message: "No data is guess"
	});
};
