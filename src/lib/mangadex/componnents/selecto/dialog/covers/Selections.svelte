<script lang="ts">
	import ImageElement from "./selections/ImageElement.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";

	interface Props {
		covers?: string[];
	}
	let { covers = $bindable([]) }: Props = $props();
</script>

<div class:empty={covers.length == 0} class="covers">
	{#each covers as cover (`selecto-${cover}`)}
		<ImageElement
			coverId={cover}
			onclick={() => {
				covers = covers.filter((id) => id != cover);
			}}
		/>
	{:else}
		<NothingToShow />
	{/each}
</div>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";
	.covers {
		display: grid;
		/* grid-template-columns: repeat(5, 1fr); */
		gap: 6px;
		max-height: 100%;
		overflow-y: scroll;
		padding: 6px;
	}
	.covers.empty {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* @include bp.media-only-screen-breakpoint-down(map.get(bp.$grid-breakpoints, "md")) {
		.covers {
			grid-template-columns: repeat(3, 1fr);
		}
	} */
	@include bp.media-only-screen-breakpoint-down(map.get(bp.$grid-breakpoints, "lg")) {
		.covers {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@include bp.media-only-screen-breakpoint-down(map.get(bp.$grid-breakpoints, "xl")) {
		.covers {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "xl")) {
		.covers {
			grid-template-columns: repeat(5, 1fr);
		}
	}
</style>
