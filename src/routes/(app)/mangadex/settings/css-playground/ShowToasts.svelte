<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import { addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
</script>

<div>
	<ButtonAccentOnlyLabel
		onclick={() => {
			addToast({
				title: "Toast!",
				description: "sadsada"
			});
		}}
		label="show toast"
	/>
</div>

<style lang="scss"></style>
