<script lang="ts">
	import { createQuery, type CreateQueryOptions } from "@tanstack/svelte-query";
	import type { LayoutProps } from "./$types";
	import { CombinedError, getContextClient } from "@urql/svelte";
	import { load } from "./layout.context";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import LoadingPage from "@mangadex/componnents/pages/LoadingPage.svelte";
	import AfterLoadingLayout from "./AfterLoadingLayout.svelte";
	import PageError from "@mangadex/componnents/PageError.svelte";

	let { data, children }: LayoutProps = $props();
	const client = getContextClient();
	let query = createQuery(() => {
		return {
			queryKey: ["chapter", data.id, "load", JSON.stringify(data)],
			networkMode: "always",
			async queryFn() {
				return load({
					id: data.id,
					isEnd: data.isEnd,
					client,
					startPage: data.startPage
				});
			}
		} satisfies CreateQueryOptions;
	});
</script>

{#if query.isLoading}
	<AppTitle title="Loading chapter... | MangaDex" />
	<LoadingPage />
{:else if query.isSuccess}
	<AfterLoadingLayout data={query.data}>
		{@render children()}
	</AfterLoadingLayout>
{:else if query.isError}
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
