import { dev } from "$app/environment";
import type { ReadonlyValue } from "$lib";
import { internalSessionGQLDocs } from "@mangadex/gql-docs/upload/internal-session";
import type { InputMaybe } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { delay } from "lodash";
import type { Getter } from "runed";
import type { InternalSessionObj, InternalSessionObjCommitData } from "./sessions";

export function sessionObjStore(
	_id: Getter<string>
): ReadonlyValue<InputMaybe<InternalSessionObj>> {
	let val = $state<InputMaybe<InternalSessionObj>>(undefined);
	let id = $derived.by(_id);
	$effect.pre(() => {
		if (dev) console.log("called store func");
		const set = (v: InputMaybe<InternalSessionObj>) => {
			if (dev) console.log([`uploadSession ${id}`, v]);
			val = v;
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
	return {
		get value() {
			return val;
		}
	};
}
