<script>
	import MangaDexThemeEditorInner from "@mangadex/componnents/theme/editor/MangaDexThemeEditorInner.svelte";
	import ThemeProfilesSelector from "@mangadex/componnents/theme/profiles/ThemeProfilesSelector.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
</script>

<AppTitle title="Themes - MangaDex" />

<section class="profiles">
	<ThemeProfilesSelector />
</section>
<section class="editor">
	<MangaDexThemeEditorInner />
</section>
