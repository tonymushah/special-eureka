<script lang="ts">
	import DangerBadgeOnlyLabel from "@mangadex/componnents/theme/tag/DangerBadgeOnlyLabel.svelte";
	import { isLogged } from "@mangadex/utils/auth";
	import logoutQMutation from "./logout";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";

	let mutation = logoutQMutation();
</script>

{#if $isLogged}
	<DangerBadgeOnlyLabel
		label="Logout"
		type="button"
		disabled={mutation.isPending}
		onclick={() => {
			mutation.mutate(undefined, {
				onError(error) {
					addErrorToast("Cannot logout successfully", error);
				},
				onSuccess() {
					addToast({
						data: {
							title: "Logout done successully"
						}
					});
				}
			});
		}}
	/>
{/if}
