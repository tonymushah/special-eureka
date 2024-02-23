<script lang="ts">
	import { graphql } from "@mangadex/gql";
	import { getContextClient, queryStore } from "@urql/svelte";

	const popular_titles_query = queryStore({
		client: getContextClient(),
		query: graphql(`
			query homePopularTitle {
				home {
					popularTitles {
						data {
							id
							attributes {
								title
								tags {
									id
									attributes {
										name
									}
								}
								contentRating
								description
							}
							relationships {
								authorArtists {
									id
									attributes {
										name
									}
								}
								coverArt {
									id
									attributes {
										fileName
									}
								}
							}
						}
					}
				}
			}
		`)
	});
	$: popular_titles = $popular_titles_query.data?.home.popularTitles.data.map((manga) => ({
		id: manga.id,
		title: manga.attributes.title["en"] ?? "",
		description: manga.attributes.description["en"] ?? ""
	}));
</script>
