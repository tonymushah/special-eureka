<script lang="ts">
	import ContentWarning from "./ContentWarning.svelte";
	import CoverBlur from "./CoverBlur.svelte";
	import ForcePort443 from "./ForcePort443.svelte";
	import IsDataSaver from "./IsDataSaver.svelte";
	import PageLimit from "./PageLimit.svelte";
	import ReadingModeSetting from "./ReadingModeSetting.svelte";
</script>

<div class="layout">
	<section>
		<PageLimit />
	</section>
	<hr />
	<section>
		<ForcePort443 />
	</section>
	<hr />
	<section>
		<IsDataSaver />
	</section>
	<hr />
	<section>
		<ContentWarning />
	</section>
	<hr />
	<section>
		<CoverBlur />
	</section>
	<hr />
	<section>
		<ReadingModeSetting />
	</section>
</div>

<style lang="scss">
	.layout {
		display: grid;
		gap: 4px;
		hr {
			width: 100%;
			color: var(--mid-tone);
			background-color: var(--mid-tone);
		}
	}
</style>
