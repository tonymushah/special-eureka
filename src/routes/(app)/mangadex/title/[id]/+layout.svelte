<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import type { LayoutProps } from "./$types";
	import { getContextClient } from "@urql/svelte";
	import { load } from "./layout.context";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import AfterLoadingLayout from "./AfterLoadingLayout.svelte";
	import PageError from "@mangadex/componnents/PageError.svelte";

	let { data, children }: LayoutProps = $props();
	const client = getContextClient();
	const query = createQuery({
		queryKey: ["title", data.id, "load-data"],
		async queryFn() {
			return await load(data.id, client);
		},
		networkMode: "always"
	});
</script>

{#if $query.isLoading}
	<AppTitle title="Loading title... | Special Eureka" />
	<div class="loading">
		<h1>Loading...</h1>
	</div>
{:else if $query.isSuccess}
	<AfterLoadingLayout data={$query.data}>
		{@render children()}
	</AfterLoadingLayout>
{:else if $query.isError}
	<AppTitle title="Error on loading title" />
	<PageError
		retry={() => {
			$query.refetch();
		}}
		message={$query.error.message}
	/>
{/if}

<style lang="scss">
	.loading {
		display: flex;
		height: -webkit-fill-available;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: nowrap;
		background-color: color-mix(in srgb, var(--accent) 20%, transparent 50%);
	}
</style>
