<script lang="ts">
	import { createQuery } from "@tanstack/svelte-query";
	import type { LayoutProps } from "./$types";
	import { CombinedError, getContextClient } from "@urql/svelte";
	import { load } from "./layout.context";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import AfterLoadingLayout from "./AfterLoadingLayout.svelte";
	import PageError from "@mangadex/componnents/PageError.svelte";
	import LoadingPage from "@mangadex/componnents/pages/LoadingPage.svelte";

	let { data, children }: LayoutProps = $props();
	const client = getContextClient();
	let query = createQuery(() => ({
		queryKey: ["author", data.id, "load"],
		async queryFn() {
			return await load({
				id: data.id,
				client
			});
		}
	}));
</script>

{#if query.isLoading}
	<AppTitle title="Loading author" />
	<LoadingPage />
{:else if query.isSuccess}
	<AfterLoadingLayout data={query.data}>
		{@render children()}
	</AfterLoadingLayout>
{:else if query.isError}
	<AppTitle title="Error on loading error" />
	<PageError
		message={query.error.message}
		extensions={query.error instanceof CombinedError
			? query.error.graphQLErrors.map((e) => e.extensions)
			: undefined}
		retry={() => {
			query.refetch();
		}}
	/>
{/if}
