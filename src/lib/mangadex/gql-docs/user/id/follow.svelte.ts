import type { WritableValue } from "$lib";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import type { Getter, MaybeGetter } from "runed";
import { followUserMutation, isFollowingUserQuery_, unfollowUserMutation } from "./follow";

export default function isFollowingUser(
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
	let query = isFollowingUserQuery_(_id)();
	let queryDerived = $derived(query.data ?? false);
	let follow_mut = followUserMutation();
	let unfollow_mut = unfollowUserMutation();
	let isMutating = $derived(follow_mut.isPending || unfollow_mut.isPending);
	let id = $derived.by(_id);
	return {
		get value() {
			return queryDerived;
		},
		set value(value) {
			if (value) {
				follow_mut.mutate(id, {
					onError(error, variables) {
						query.refetch();
						if (toast) {
							addErrorToast("Cannot change user following status", error);
						}
						options?.onError?.(error, variables);
					},
					onSuccess(data, variables) {
						if (toast) {
							addToast({
								title: "Followed user",
								description: id,
								type: "success"
							});
						}
						query.refetch();
						options?.onSucess?.(variables);
					},
					onSettled(data, error, variables) {
						query.refetch();
						options?.onSettled?.(error, variables);
					}
				});
			} else {
				unfollow_mut.mutate(id, {
					onError(error, variables) {
						if (toast) {
							addErrorToast("Cannot change user following status", error);
						}
						options?.onError?.(error, variables);
					},
					onSuccess(data, variables) {
						if (toast) {
							addToast({
								title: "Unfollowed user",
								description: id,
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
