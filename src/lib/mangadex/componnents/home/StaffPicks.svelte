<script lang="ts">
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { CoverImageQuality } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { createQuery } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onMount } from "svelte";
	import { derived as der, toStore } from "svelte/store";
	import type { StaffPicksTitle } from "./staff-picks";
	import Inner from "./staff-picks/Inner.svelte";
	import query from "./staff-picks/query";

	const client = getContextClient();
	let staff_picks = createQuery(() => ({
		queryKey: ["home", "staff-picks", "titles"],
		async queryFn() {
			const res = await client.query(query, {}).toPromise();
			if (res.data) {
				return res.data;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("no data??");
			}
		}
	}));
	const data_store = der(
		toStore(() => staff_picks),
		($store) => {
			if ($store?.data != undefined) {
				const id: string = $store.data.home.staffPicks.id;
				const mangas =
					$store.data.home.staffPicks.relationships.titles.map<StaffPicksTitle>((t) => {
						const manga_id: string = t.id;
						const cover_id: string = t.relationships.coverArt.id;
						const filename: string = t.relationships.coverArt.attributes.fileName;
						const coverImage = get_cover_art({
							client,
							cover_id,
							filename,
							manga_id,
							mode: CoverImageQuality.V256
						});
						const title =
							get_value_from_title_and_random_if_undefined(
								t.attributes.title,
								"en"
							) ?? "";
						const description =
							get_value_from_title_and_random_if_undefined(
								t.attributes.description,
								"en"
							) ?? "";
						return {
							id: manga_id,
							coverImage,
							coverImageAlt: cover_id,
							title,
							description
						};
					});
				return {
					id,
					mangas
				};
			} else {
				return undefined;
			}
		}
	);
	const execute = debounce(async () => {
		await staff_picks.refetch();
	}, 300);
	const isFetching = toStore(() => staff_picks.isFetching);
	onMount(() => {
		return defaultContentProfile.subscribe(() => execute());
	});
	const error = der(
		toStore(() => staff_picks),
		($d) => $d?.error ?? undefined
	);
</script>

<Inner {isFetching} {data_store} {error} {execute} />
