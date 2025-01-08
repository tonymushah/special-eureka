<script lang="ts">
	import DefaultSpan from "@mangadex/componnents/theme/texts/span/DefaultSpan.svelte";
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import PublicationStatusTag from "../../publicationStatusTag/PublicationStatusTag.svelte";
	import Description from "./content/Description.svelte";

	interface Props {
		title: string;
		status: MangaStatus;
		description: string;
	}

	let { title, status, description }: Props = $props();
</script>

<div class="content">
	<div class="title">
		<p>{title}</p>
	</div>
	<div class="publication">
		<DefaultSpan --font-size="12px">Publication : <PublicationStatusTag {status} /></DefaultSpan
		>
	</div>
	<Description {description} />
</div>

<style lang="scss">
	div.title {
		font-weight: 800;
		font-size: 16px;
	}
	div.title > p {
		display: -webkit-box;
		margin: 2px;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		overflow: hidden;
		-webkit-box-orient: vertical;
	}
	div.content {
		padding-left: 12px;
		grid-area: content;
		text-overflow: ellipsis;
		text-align: start;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-items: center;
		gap: 8px;
	}
	div.publication {
		display: flex;
	}
</style>
