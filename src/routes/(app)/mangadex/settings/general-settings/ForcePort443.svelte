<script lang="ts">
	import forcePort443, { forcePort443Mutation } from "@mangadex/stores/forcePort443";
</script>

<div>
	<input
		type="checkbox"
		bind:checked={$forcePort443}
		disabled={forcePort443Mutation.isPending}
		class="checkbox"
	/>
	<h3>Use Port 443 for MangaDex@Home</h3>
</div>
<p>
	If you are having issues loading images on a school or corporate network, this setting may help.
</p>

<style lang="scss">
	.checkbox {
		width: 24px;
		height: 24px;
	}
	div {
		display: flex;
		align-items: center;
		gap: 6px;
		h3 {
			margin: 0px;
		}
	}
	p {
		margin: 0px;
	}
</style>
