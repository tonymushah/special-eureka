<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import MangaDexTabs from "@mangadex/componnents/theme/tabs/MangaDexTabs.svelte";
	import { TabContent } from "@ark-ui/svelte";
</script>

<PageTitle title="Blacklist" titleType={1} withReturn />

<MangaDexTabs
	triggers={[
		{
			id: "author-artists",
			title: "Authors & Artists"
		},
		{
			id: "scanlation-groups",
			title: "Scanlation Groups"
		},
		{
			id: "users",
			title: "Users (aka Uploaders)"
		}
	]}
	lazyMount
	unmountOnExit
	defaultValue="author-artists"
>
	<TabContent value="author-artists"></TabContent>
	<TabContent value="scanlation-groups"></TabContent>
	<TabContent value="users"></TabContent>
</MangaDexTabs>
