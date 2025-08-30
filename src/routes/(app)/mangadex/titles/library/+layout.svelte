<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { route } from "$lib/ROUTES";
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import getCurrentUserLibrarySize from "@mangadex/stores/library/size";
	import type { Snippet } from "svelte";
	import { derived as der } from "svelte/store";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	const size = getCurrentUserLibrarySize();
	$effect.pre(() =>
		size.subscribe((d) => {
			if (d.error != null && d.error != undefined) {
				addErrorToast("Cannot fetch library sizes", d.error);
			}
		})
	);
	const unfiltered = der(size, (size) => size.data?.unfiltered);
	const completed = der(size, (size) => size.data?.completed);
	const dropped = der(size, (size) => size.data?.dropped);
	const onHold = der(size, (size) => size.data?.onHold);
	const planToRead = der(size, (size) => size.data?.planToRead);
	const reReading = der(size, (size) => size.data?.reReading);
	const reading = der(size, (size) => size.data?.reading);
</script>

<div class="top-layout">
	<section class="title">
		<PageTitle title={"Library"} withReturn />
	</section>
	<section class="layout" class:isRtl={$isSidebarRtl}>
		<section class="tabs-layout">
			<div class="tabs">
				<ButtonAccent
					isBase
					variant={page.url.pathname == route("/mangadex/titles/library") ? "5" : "2"}
					onclick={() => {
						goto(route("/mangadex/titles/library"));
					}}
				>
					<span class="tab-section-text">
						All
						{#if $unfiltered}
							({$unfiltered})
						{/if}
					</span>
				</ButtonAccent>
				<ButtonAccent
					isBase
					variant={page.url.pathname == route("/mangadex/titles/library/reading")
						? "5"
						: "2"}
					onclick={() => {
						goto(route("/mangadex/titles/library/reading"));
					}}
				>
					<span class="tab-section-text">
						Reading
						{#if $reading}
							({$reading})
						{/if}
					</span>
				</ButtonAccent>
				<ButtonAccent
					isBase
					variant={page.url.pathname == route("/mangadex/titles/library/plan-to-read")
						? "5"
						: "2"}
					onclick={() => {
						goto(route("/mangadex/titles/library/plan-to-read"));
					}}
				>
					<span class="tab-section-text">
						Plan to Read
						{#if $planToRead}
							({$planToRead})
						{/if}
					</span>
				</ButtonAccent>
				<ButtonAccent
					isBase
					variant={page.url.pathname == route("/mangadex/titles/library/on-hold")
						? "5"
						: "2"}
					onclick={() => {
						goto(route("/mangadex/titles/library/on-hold"));
					}}
				>
					<span class="tab-section-text">
						On hold
						{#if $onHold}
							({$onHold})
						{/if}
					</span>
				</ButtonAccent>
				<ButtonAccent
					isBase
					variant={page.url.pathname == route("/mangadex/titles/library/completed")
						? "5"
						: "2"}
					onclick={() => {
						goto(route("/mangadex/titles/library/completed"));
					}}
				>
					<span class="tab-section-text">
						Completed
						{#if $completed}
							({$completed})
						{/if}
					</span>
				</ButtonAccent>
				<ButtonAccent
					isBase
					variant={page.url.pathname == route("/mangadex/titles/library/re-reading")
						? "5"
						: "2"}
					onclick={() => {
						goto(route("/mangadex/titles/library/re-reading"));
					}}
				>
					<span class="tab-section-text">
						Re-Reading
						{#if $reReading}
							({$reReading})
						{/if}
					</span>
				</ButtonAccent>
				<ButtonAccent
					isBase
					variant={page.url.pathname == route("/mangadex/titles/library/dropped")
						? "5"
						: "2"}
					onclick={() => {
						goto(route("/mangadex/titles/library/dropped"));
					}}
				>
					<span class="tab-section-text">
						Dropped
						{#if $dropped}
							({$dropped})
						{/if}
					</span>
				</ButtonAccent>
				<ButtonAccent
					isBase
					variant={page.url.pathname ==
					route("/mangadex/titles/library/export/my-anime-list")
						? "5"
						: "2"}
					onclick={() => {
						goto(route("/mangadex/titles/library/export/my-anime-list"));
					}}
				>
					<span class="tab-section-text mal">
						Export as <br /> a My Anime List File
					</span>
				</ButtonAccent>
				<ButtonAccent
					isBase
					variant={page.url.pathname == route("/mangadex/titles/library/export/csv")
						? "5"
						: "2"}
					onclick={() => {
						goto(route("/mangadex/titles/library/export/csv"));
					}}
				>
					<span class="tab-section-text"> Export as CSV </span>
				</ButtonAccent>
			</div>
		</section>

		<section class="content">
			{@render children?.()}
		</section>
	</section>
</div>

<style lang="scss">
	.top-layout {
		--layout-margin-x: 1.25em;
		--layout-margin-y: 0.5em;
		padding-left: var(--layout-margin-x);
		padding-right: var(--layout-margin-x);
		padding-bottom: var(--layout-margin-y);
		padding-top: var(--layout-margin-y);
		display: flex;
		flex-direction: column;
		height: -webkit-fill-available;
	}
	.tabs-layout {
		width: fit-content;
	}
	.tabs {
		display: grid;
		gap: 6px;
	}
	.layout {
		display: flex;
		flex-direction: row-reverse;
		width: 100%;
		gap: 2px;
		height: -webkit-fill-available;
		.content {
			width: 100%;
		}
	}
	.layout.isRtl {
		flex-direction: row;
	}
	.tab-section-text {
		white-space: nowrap;
		padding: 0px 12px;
	}
	.tab-section-text.mal {
		white-space: auto;
	}
</style>
