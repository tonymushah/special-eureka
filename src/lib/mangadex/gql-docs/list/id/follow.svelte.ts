import type { WritableValue } from "$lib";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { unfollowGroupMutation } from "@mangadex/gql-docs/group/id/follow";
import type { Getter, MaybeGetter } from "runed";
import { followCustomListMutation, isFollowingCustomListQuery_ } from "./follow";

export default function isFollowingCustomList(
	_id: Getter<string>,
	options?: {
		onSettled?: (error: Error | null, variables: string) => void;
		onError?: (error: Error, variables: string) => void;
		onSucess?: (variables: string) => void;
		toast?: MaybeGetter<boolean>;
	}
): WritableValue<boolean> & {
	readonly isMutating: boolean;
} {
	let toast = $derived.by(() => {
		let m = options?.toast;
		if (typeof m == "function") {
			return m();
		} else if (typeof m == "boolean") {
			return m;
		} else {
			return true;
		}
	});
	let query = isFollowingCustomListQuery_(_id)();

	let queryDerived = $derived(query.data ?? false);
	let follow_mut = followCustomListMutation();
	let unfollow_mut = unfollowGroupMutation();
	let isMutating = $derived(follow_mut.isPending || unfollow_mut.isPending);
	return {
		get isMutating() {
			return isMutating;
		},
		get value() {
			return queryDerived;
		},
		set value(value) {
			if (value) {
				follow_mut.mutate(_id(), {
					onError(error, variables) {
						if (toast) {
							addErrorToast("Cannot change custom list following status", error);
						}
						options?.onError?.(error, variables);
					},
					onSuccess(data, variables) {
						if (toast) {
							addToast({
								title: "Followed custom list",
								description: _id(),
								type: "success"
							});
						}
						options?.onSucess?.(variables);
					},
					onSettled(data, error, variables) {
						query.refetch();
						options?.onSettled?.(error, variables);
					}
				});
			} else {
				unfollow_mut.mutate(_id(), {
					onError(error, variables) {
						if (toast) {
							addErrorToast("Cannot change custom list following status", error);
						}
						options?.onError?.(error, variables);
					},
					onSuccess(data, variables) {
						if (toast) {
							addToast({
								title: "Unfollowed custom list",
								description: _id(),
								type: "warning"
							});
						}
						options?.onSucess?.(variables);
					},
					onSettled(data, error, variables) {
						query.refetch();
						options?.onSettled?.(error, variables);
					}
				});
			}
		}
	};
}
