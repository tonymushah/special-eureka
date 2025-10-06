<script lang="ts">
	import contentProfileBlur, {
		contentProfileBlurMutation
	} from "@mangadex/stores/contentProfileBlur";
</script>

<div>
	<input
		type="checkbox"
		bind:checked={$contentProfileBlur}
		disabled={contentProfileBlurMutation.isPending}
		class="checkbox"
	/>
	<h3>Blur unmatched title cover</h3>
</div>
<p>Blur title cover art that doesn't match the current content profile</p>

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
