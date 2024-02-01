<script lang="ts">
	import { sub_end } from "@mangadex/utils";
	import { graphql } from "@mangadex/gql/gql";
    import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { onDestroy } from "svelte";
	import { v4 } from "uuid";
	import TestSubAuth from "./TestSubAuth.svelte";
    const sub_id = v4()
    let store = subscriptionStore({
        client: getContextClient(),
        query: graphql(/* GraphQL */
        `
            subscription isAppMounted($sub_id: UUID!) {
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

<TestSubAuth/>