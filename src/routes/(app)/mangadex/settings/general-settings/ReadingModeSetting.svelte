<script lang="ts">
	import readingModeWritable from "@mangadex/gql-docs/chapter/layout-query/readingMode";
	import { ReadingMode } from "@mangadex/gql/graphql";
</script>

<div>
	<h3>Chapter reading mode:</h3>
	<select bind:value={$readingModeWritable}>
		<option value={ReadingMode.DoublePage}>Double page</option>
		<option value={ReadingMode.SinglePage}>Single page</option>
		<option value={ReadingMode.LongStrip}>Long-strip</option>
		<option value={ReadingMode.WideStrip}>Wide-strip</option>
	</select>
</div>

<section>
	<p><i>The change will be reflected to all window</i></p>
</section>

<style lang="scss">
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
	select {
		border: 3px var(--mid-tone) solid;
		font-family: var(--fonts);
		font-weight: 800;
		padding: 2px;
		border-radius: 3px;
	}
</style>
