<script lang="ts">
	import MangaDexTabs from "@mangadex/componnents/theme/tabs/MangaDexTabs.svelte";
	import Chapters from "./(states)/Chapters.svelte";
	import Mangas from "./(states)/Mangas.svelte";
	import Covers from "./(states)/Covers.svelte";
	import { TabContent } from "@ark-ui/svelte/tabs";
</script>

<MangaDexTabs
	triggers={[
		{
			id: "chapters",
			title: "Chapters"
		},
		{
			id: "mangas",
			title: "Mangas"
		},
		{
			id: "covers",
			title: "Covers"
		}
	]}
	defaultValue="chapters"
	lazyMount
	unmountOnExit
>
	<TabContent value="chapters">
		<div>
			<Chapters />
		</div>
	</TabContent>
	<TabContent value="mangas">
		<div>
			<Mangas />
		</div>
	</TabContent>
	<TabContent value="covers">
		<div>
			<Covers />
		</div>
	</TabContent>
</MangaDexTabs>
