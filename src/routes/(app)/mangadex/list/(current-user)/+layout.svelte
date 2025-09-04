<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="container">
	<PageTitle withReturn titleType={1}>Your Mangadex Custom Lists</PageTitle>
	<AppTitle title="Your MangaDex Custom Lists - MangaDex" />
	{@render children?.()}
</div>

<style lang="scss">
	.container {
		margin: 0px 10px;
	}
</style>
