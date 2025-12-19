import { dev } from "$app/environment";
import { internalSessionGQLDocs } from "@mangadex/gql-docs/upload/internal-session";
import { internalSessionListIDsGQLDocs } from "@mangadex/gql-docs/upload/internal-session-list";
import type { InputMaybe, Language } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { delay } from "lodash";
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
	imagesUrl: string[];
};

export type InternalSessionObjCommitData = {
	chapter?: string;
	volume?: string;
	title?: string;
	translatedLanguage: Language;
	externalUrl?: string;
	publishAt?: string;
	termsAccepted?: boolean;
};

export function sessionObjStore(id: string) {
	return readable<InputMaybe<InternalSessionObj>>(undefined, (_set) => {
		if (dev) console.log("called store func");
		const set = (v: InputMaybe<InternalSessionObj>) => {
			if (dev) console.log([`uploadSession ${id}`, v]);
			_set(v);
		};
		let sub: (() => void) | undefined = undefined;
		// This delay is somewhat required
		// because if we don't delay then the `subscribe` fn will be not called is some cases...
		//
		// BUG: urql sub bugs...
		const dly = delay(() => {
			const s = client
				.subscription(internalSessionGQLDocs, {
					id
				})
				.subscribe((res) => {
					if (dev) console.log("called sub func");
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
											translatedLanguage: cData.translatedLanguage,
											volume: cData.volume ?? undefined
										} satisfies InternalSessionObjCommitData;
									} else {
										return undefined;
									}
								})(),
								imagesUrl: data.imagesUrl
							});
						}
					} else if (res.error) {
						console.error(res.error);
					} else {
						console.warn("no data received for %s", id);
					}
				});
			if (dev) console.log("got sub");
			sub = () => {
				s.unsubscribe();
			};
		}, 1);

		return () => {
			clearTimeout(dly);
			sub?.();
		};
	});
}
