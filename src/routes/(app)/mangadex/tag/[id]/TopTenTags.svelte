<script lang="ts">
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import tagTopTenQuery from "@mangadex/gql-docs/tag/page/topTen";
	import { client } from "@mangadex/gql/urql";
	import { createQuery } from "@tanstack/svelte-query";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();

	const topTen = createQuery({
		queryKey: ["tag-page", id, "top-ten"],
		async queryFn() {
			const res = await client
				.query(tagTopTenQuery, {
					id
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.tag.page.topTen;
			} else {
				throw new Error("no data??");
			}
		}
	});

	$effect(() =>
		defaultContentProfile.subscribe(() => {
			$topTen.refetch();
		})
	);
</script>

<h4>Trending <i>idk...</i></h4>

{#if $topTen.data}
	<swiper-container slides-per-view={2} loop="true">
		{#each $topTen.data as title}{/each}
	</swiper-container>
{:else if $topTen.isLoading}
	<section class="loading">
		<p>Loading...</p>
	</section>
{/if}
