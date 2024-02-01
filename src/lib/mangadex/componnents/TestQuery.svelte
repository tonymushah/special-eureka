<script lang="ts">
	import { graphql } from '@mangadex/gql/gql';
	import { getContextClient, queryStore } from '@urql/svelte';

	const res = queryStore({
		client: getContextClient(),
		query: graphql(/* GraphQL */ `
			query myManga {
				manga {
					random {
						id
						attributes {
                            title
                            altTitles
                            state
                            status
                        }
					}
				}
			}
		`)
	});
</script>
