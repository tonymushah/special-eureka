import { internalQueueEntryStateGQLDocs } from "@mangadex/gql-docs/upload/internal-queue-entry-state";
import { internalSessionQueueOrderIDsGQLDocs } from "@mangadex/gql-docs/upload/internal-queue-order";
import { InternUploadQueueState, type InputMaybe } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import type { CombinedError } from "@urql/svelte";
import { readable } from "svelte/store";

export const queueOrderIDs = readable<string[]>([], (set) => {
	const sub = client.subscription(internalSessionQueueOrderIDsGQLDocs, {}).subscribe((res) => {
		if (res.data) {
			set(res.data.watchInternalUploadQueueListIds);
		} else if (res.error) {
			console.error(res.error);
		}
		return () => {
			sub.unsubscribe();
		};
	});
});

export type QueueEntryState =
	| {
			state: "Pending";
			error: undefined;
	  }
	| {
			state: "Uploading";
			error: undefined;
	  }
	| {
			state: "Error";
			error: CombinedError;
	  };

export function queueEntryState(id: string) {
	return readable<InputMaybe<QueueEntryState>>(undefined, (set) => {
		const sub = client
			.subscription(internalQueueEntryStateGQLDocs, {
				id
			})
			.subscribe((res) => {
				if (res.data) {
					const state = res.data.watchInternalUploadQueueState;
					if (state == null || state == undefined) {
						set(null);
					} else {
						switch (state) {
							case InternUploadQueueState.Pending:
								set({
									state: "Pending",
									error: undefined
								});
								break;
							case InternUploadQueueState.Uploading:
								set({
									state: "Uploading",
									error: undefined
								});
								break;
							default:
								break;
						}
					}
				} else if (res.error) {
					set({
						state: "Error",
						error: res.error
					});
				}
			});
		return () => {
			sub.unsubscribe();
		};
	});
}
