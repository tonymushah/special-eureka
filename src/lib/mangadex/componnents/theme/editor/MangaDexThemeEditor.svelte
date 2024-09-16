<script>
	import MangaDexThemeEditorInner from "./MangaDexThemeEditorInner.svelte";
</script>

<div class="editor">
	<MangaDexThemeEditorInner>
		<svelte:fragment slot="profile">
			<slot name="profile" />
		</svelte:fragment>
	</MangaDexThemeEditorInner>
</div>

<style lang="scss">
	.editor {
		background-color: var(--main-background);
		border: 3px solid var(--mid-tone);
		border-radius: 8px;
		padding: 8px;
		transition: box-shadow 400ms ease-in-out;
		box-shadow: 0 4px 0 var(--mid-tone);
	}
	.editor:hover {
		box-shadow: 0 2px 0 var(--mid-tone);
	}
</style>
