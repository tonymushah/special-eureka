import type { WritableValue } from "$lib";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import type { Getter, MaybeGetter } from "runed";
import { followGroupMutation, isFollowingGroupQuery_, unfollowGroupMutation } from "./follow";

export default function isFollowingGroup(
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
	let query = isFollowingGroupQuery_(_id)();
	const queryDerived = $derived(query.data ?? false);
	let follow_mut = followGroupMutation();
	let unfollow_mut = unfollowGroupMutation();
	let isMutating = $derived(follow_mut.isPending || unfollow_mut.isPending);
	return {
		get value() {
			return queryDerived;
		},
		set value(value) {
			if (value) {
				follow_mut.mutate(_id(), {
					onError(error, variables, context) {
						if (toast) {
							addErrorToast("Cannot change scanlation group following status", error);
						}
						options?.onError?.(error, variables);
					},
					onSuccess(data, variables) {
						if (toast) {
							addToast({
								title: "Followed scanlation group",
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
							addErrorToast("Cannot change scanlation group following status", error);
						}
						options?.onError?.(error, variables);
					},
					onSuccess(data, variables) {
						if (toast) {
							addToast({
								title: "Unfollowed scanlation group",
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
		},
		get isMutating() {
			return isMutating;
		}
	};
}
