<script lang="ts">
	import { client } from "@mangadex/gql/urql";
	import { SvelteUIProvider } from "@svelteuidev/core";
	import { setContextClient } from "@urql/svelte";

    setContextClient(client);
</script>

<SvelteUIProvider>
    <slot/>
</SvelteUIProvider>