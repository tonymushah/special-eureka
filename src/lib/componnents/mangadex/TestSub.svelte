<script lang="ts">
	import { sub_end } from "$lib/utils/mangadex";
	import { graphql } from "@mangadex/gql/gql";
    import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { onDestroy } from "svelte";
	import { v4 } from "uuid";
    const sub_id = v4()
    let store = subscriptionStore({
        client: getContextClient(),
        query: graphql(/* GraphQL */
        `
            subscription isLogged($sub_id: UUID!) {
                watchIsAppMounted(subId: $sub_id)
            }
        `),
        variables: {
            sub_id
        }
    });
    onDestroy(async () => {
        await sub_end(sub_id);
    })
</script>

{#if $store.data?.watchIsAppMounted}
    <p>Offline mounted</p>
{:else}
    <p>Offline not mounted</p>
{/if}