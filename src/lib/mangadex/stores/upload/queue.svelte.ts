import type { ReadonlyValue } from "$lib";
import { internalQueueEntryStateGQLDocs } from "@mangadex/gql-docs/upload/internal-queue-entry-state";
import { InternUploadQueueState, type InputMaybe } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { delay } from "lodash";
import type { Getter } from "runed";
import type { QueueEntryState } from "./queue";

export function queueEntryState(_id: Getter<string>): ReadonlyValue<InputMaybe<QueueEntryState>> {
	let val = $state<InputMaybe<QueueEntryState>>(undefined);
	let id = $derived.by(_id);
	$effect.pre(() => {
		let unsub: (() => void) | undefined = undefined;
		const dl = delay(() => {
			const sub = client
				.subscription(internalQueueEntryStateGQLDocs, {
					id
				})
				.subscribe((res) => {
					if (res.data) {
						const state = res.data.watchInternalUploadQueueState;
						if (state == null || state == undefined) {
							val = null;
						} else {
							switch (state) {
								case InternUploadQueueState.Pending:
									val = {
										state: "Pending",
										error: undefined
									};
									break;
								case InternUploadQueueState.Uploading:
									val = {
										state: "Uploading",
										error: undefined
									};
									break;
								default:
									break;
							}
						}
					} else if (res.error) {
						val = {
							state: "Error",
							error: res.error
						};
					}
				});
			unsub = () => sub.unsubscribe();
		}, 1);

		return () => {
			clearTimeout(dl);
			unsub?.();
		};
	});
	return {
		get value() {
			return val;
		}
	};
}
