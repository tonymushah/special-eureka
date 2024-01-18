<script lang="ts">
	import { client } from "@mangadex/gql/urql";
	import { setContextClient } from "@urql/svelte";

    setContextClient(client);
</script>

<slot/>