<script lang="ts">
	import type { CurrentLoggedLists } from "@mangadex/gql/graphql";
	import pageLimit from "@mangadex/stores/page-limit";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	import {
		createInfiniteQuery,
		createMutation,
		type CreateInfiniteQueryOptions
	} from "@tanstack/svelte-query";
	import { derived as der } from "svelte/store";
	import type { CurrentUserCustomListItemData } from "./content";
	import executeSearchQuery from "./content";
	import { getContextClient } from "@urql/svelte";
	import type { ActionMode } from ".";
	import { debounce } from "lodash";

	const client = getContextClient();

	interface Props {
		mutate?: (manga_id: string) => Promise<void> | undefined;
		isMutating?: boolean;
		mangaId: string;
	}
	let { mutate = $bindable(), isMutating = $bindable(), mangaId }: Props = $props();
	const query = createInfiniteQuery(
		der(pageLimit, (limit) => {
			return {
				queryKey: ["current", "user", "custom-list", "for-add-to-list", `limit:${limit}`],
				initialPageParam: {
					offset: 0,
					limit
				} satisfies CurrentLoggedLists,
				async queryFn({ pageParam }) {
					return await executeSearchQuery(client, pageParam);
				},
				getNextPageParam(lastPage, _allPages, lastPageParam) {
					let limit = lastPage.paginationData.limit;
					let next_offset = limit + lastPage.paginationData.offset;
					if (next_offset > lastPage.paginationData.total) {
						return null;
					} else {
						return {
							...lastPageParam,
							offset: next_offset,
							limit
						};
					}
				}
			} satisfies CreateInfiniteQueryOptions<
				AbstractSearchResult<CurrentUserCustomListItemData>,
				Error,
				AbstractSearchResult<CurrentUserCustomListItemData>,
				AbstractSearchResult<CurrentUserCustomListItemData>,
				readonly string[],
				CurrentLoggedLists
			>;
		})
	);

	let selectedListMap = $state(new Map<string, ActionMode>());
	$effect(() => {
		mutate = debounce(async (manga_id: string) => {});
	});
</script>
