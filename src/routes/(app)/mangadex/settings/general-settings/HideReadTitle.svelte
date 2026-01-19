<script lang="ts">
	import { hideReadTitle } from "@mangadex/stores/hide-read-title";
</script>

<div>
	<input type="checkbox" bind:checked={$hideReadTitle} class="checkbox" />
	<h3>Hide read titles</h3>
</div>
<p>
	Just as it says, <b>hide read titles</b> on author works list, MD list titles list and feed and scanlation
	group titles list and feed.
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
