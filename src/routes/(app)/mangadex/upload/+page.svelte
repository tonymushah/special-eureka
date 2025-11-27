<script lang="ts">
	import { route } from "$lib/ROUTES";
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import SimpleUploadSession from "@mangadex/componnents/upload/SimpleUploadSession.svelte";
	import { sessionsIDs } from "@mangadex/stores/upload/sessions";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
</script>

<AppTitle title="Upload Sessions | MangaDex" />

<div class="layout">
	<PageTitle withReturn title="Upload Sessions" />
	<div class="content">
		<div class="sessions">
			<h2>Sessions</h2>
			<div class="sessions-list">
				{#each $sessionsIDs as id (id)}
					<SimpleUploadSession sessionId={id} />
				{:else}
					<NothingToShow />
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.layout {
		margin: 0px 1em;
	}
	.sessions-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
</style>
