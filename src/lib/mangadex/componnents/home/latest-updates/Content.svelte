<script lang="ts">
	import type { RecentlyAddedHomeQuery } from "@mangadex/gql/graphql";
	import type { ResMapInnerInner } from ".";

	export let chapters: RecentlyAddedHomeQuery;
	export let covers: Map<string, ResMapInnerInner> | undefined = undefined;
</script>

<div class="content"></div>
