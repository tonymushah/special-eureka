<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import SimpleUploadSession from "@mangadex/componnents/upload/SimpleUploadSession.svelte";
	import { queueOrderIDs } from "@mangadex/stores/upload/queue";
	import { sessionsIDs } from "@mangadex/stores/upload/sessions";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
</script>

<AppTitle title="Upload Sessions | MangaDex" />

<div class="layout">
	<PageTitle withReturn title="Upload Sessions" />
	<div class="content">
		<div class="sessions">
			<h2>Sessions</h2>
			<div class="list" class:empty={$sessionsIDs.length == 0}>
				{#each $sessionsIDs as id (id)}
					<SimpleUploadSession sessionId={id} />
				{:else}
					<NothingToShow />
				{/each}
			</div>
		</div>
		<div class="queue">
			<h2>Queue</h2>
			<div class="list" class:empty={$queueOrderIDs.length == 0}>
				{#each $queueOrderIDs as queueId (`q-${queueId}`)}{:else}
					<NothingToShow />
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";

	.layout {
		margin: 0px 1em;
	}
	.list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.list.empty {
		align-items: center;
		justify-content: center;
	}
	.content {
		display: grid;
		gap: 14px;
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "lg")) {
		.content {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
