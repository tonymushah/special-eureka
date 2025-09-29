<script lang="ts">
	import { ContentRating } from "@mangadex/gql/graphql";
	import DangerBadgeOnlyLabel from "../theme/tag/DangerBadgeOnlyLabel.svelte";
	import { lowerCase, startCase } from "lodash";
	import StatusBadgeOnlyLabel from "../theme/tag/StatusBadgeOnlyLabel.svelte";
	import AccentBadgeOnlyLabel from "../theme/tag/AccentBadgeOnlyLabel.svelte";

	interface Props {
		contentRating?: ContentRating;
	}
	let { contentRating = ContentRating.Safe }: Props = $props();
</script>

{#if ContentRating.Erotica == contentRating || ContentRating.Pornographic == contentRating}
	<DangerBadgeOnlyLabel label={startCase(lowerCase(contentRating))} />
{:else if ContentRating.Suggestive == contentRating}
	<StatusBadgeOnlyLabel color="green" label={startCase(lowerCase(contentRating))} />
{:else}
	<AccentBadgeOnlyLabel label={"Safe"} />
{/if}
