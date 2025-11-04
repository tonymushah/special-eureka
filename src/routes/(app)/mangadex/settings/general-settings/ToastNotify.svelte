<script lang="ts">
	import { toastNotify } from "@mangadex/stores/toastNotify";
</script>

<div>
	<input type="checkbox" bind:checked={$toastNotify} class="checkbox" />
	<h3>"Toast Notify"</h3>
</div>
<p>Show notification when a toast is about to show in an unfocused window</p>

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
