<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import MangaDexTabs from "@mangadex/componnents/theme/tabs/MangaDexTabs.svelte";
	import { TabContent } from "@ark-ui/svelte";
	import BlacklistedAuthorArtistsList from "@mangadex/componnents/blacklist/list/author-artists/BlacklistedAuthorArtistsList.svelte";
	import BlacklistedScanlationGroupList from "@mangadex/componnents/blacklist/list/scanlation-groups/BlacklistedScanlationGroupList.svelte";
	import BlacklistedUsersList from "@mangadex/componnents/blacklist/list/users/BlacklistedUsersList.svelte";
	import BlacklistedLabelsList from "@mangadex/componnents/blacklist/list/labels/BlacklistedLabelsList.svelte";
</script>

<PageTitle title="Blacklist" titleType={1} withReturn />

<MangaDexTabs
	noLine
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
		},
		{
			id: "labels",
			title: "Labels"
		}
	]}
	lazyMount
	unmountOnExit
	defaultValue="author-artists"
>
	<TabContent value="author-artists">
		<BlacklistedAuthorArtistsList />
	</TabContent>
	<TabContent value="scanlation-groups">
		<BlacklistedScanlationGroupList />
	</TabContent>
	<TabContent value="users">
		<BlacklistedUsersList />
	</TabContent>
	<TabContent value="labels">
		<BlacklistedLabelsList />
	</TabContent>
</MangaDexTabs>
