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
	<PageTitle title="Updates" withReturn titleType={1} />
	<AppTitle title="Followed Titles Updates" />
	{@render children?.()}
</div>

<style lang="scss">
	.container {
		margin: 0px 10px;
	}
</style>
