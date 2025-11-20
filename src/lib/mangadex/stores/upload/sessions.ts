import { internalSessionGQLDocs } from "@mangadex/gql-docs/upload/internal-session";
import { internalSessionListIDsGQLDocs } from "@mangadex/gql-docs/upload/internal-session-list";
import type { InputMaybe, Language } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { readable } from "svelte/store";

export const sessionsIDs = readable<string[]>([], (set) => {
	const sub = client.subscription(internalSessionListIDsGQLDocs, {}).subscribe((res) => {
		if (res.data) {
			set(res.data.watchInternalUploadSessionsListIds);
		} else if (res.error) {
			console.error(res.error);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});

export type InternalSessionObj = {
	mangaId: string;
	groups: string[];
	images: string[];
	commitData?: InternalSessionObjCommitData;
};

export type InternalSessionObjCommitData = {
	chapter?: string;
	title?: string;
	translatedLanguage: Language;
	externalUrl?: string;
	publishAt?: string;
	termsAccepted?: boolean;
};

export function sessionObjStore(id: string) {
	return readable<InputMaybe<InternalSessionObj>>(null, (set) => {
		const sub = client
			.subscription(internalSessionGQLDocs, {
				id
			})
			.subscribe((res) => {
				if (res.data) {
					const data = res.data.watchInternalUploadSessionObj;
					if (data == null || data == undefined) {
						set(null);
					} else {
						set({
							mangaId: data.mangaId,
							images: data.images,
							groups: data.groups,
							commitData: (() => {
								const cData = data.commitData;
								if (cData) {
									return {
										chapter: cData.chapter ?? undefined,
										externalUrl: cData.externalUrl,
										publishAt: cData.publishAt,
										termsAccepted: cData.termsAccepted ?? undefined,
										title: cData.title ?? undefined,
										translatedLanguage: cData.translatedLanguage
									} satisfies InternalSessionObjCommitData;
								} else {
									return undefined;
								}
							})()
						});
					}
				} else if (res.error) {
					console.error(res.error);
				}
			});
		return () => {
			sub.unsubscribe();
		};
	});
}
