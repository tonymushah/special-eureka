<script lang="ts">
	import { isLogged } from "@mangadex/utils/auth";
	import logoutQMutation from "./logout";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import DangerButton from "@mangadex/componnents/theme/buttons/DangerButton.svelte";

	let mutation = logoutQMutation();
</script>

{#if $isLogged}
	<DangerButton
		type="button"
		disabled={mutation.isPending}
		onclick={() => {
			mutation.mutate(undefined, {
				onError(error) {
					addErrorToast("Cannot logout successfully", error);
				},
				onSuccess() {
					addToast({
						title: "Logout done successully"
					});
				}
			});
		}}
	>
		<p>Logout</p>
	</DangerButton>
{/if}

<style lang="scss">
	p {
		margin: 7px 11px;
	}
</style>
