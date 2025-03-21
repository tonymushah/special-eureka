<script>
	import { TagGroup } from "@mangadex/gql/graphql";
	import TagsSelectorBase from "./tags/TagsSelectorBase.svelte";
</script>

<TagsSelectorBase title="Content" group={TagGroup.Content} />

<TagsSelectorBase title="Format" group={TagGroup.Format} />

<TagsSelectorBase title="Genre" group={TagGroup.Genre} />

<TagsSelectorBase title="Theme" group={TagGroup.Theme} />
