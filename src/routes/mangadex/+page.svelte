<script>
    import { browser, dev, building, version } from '$app/environment';
	import Graphiql from "@mangadex/components/Graphiql.svelte";

</script>
{#if dev}
    <Graphiql/>
{/if}
