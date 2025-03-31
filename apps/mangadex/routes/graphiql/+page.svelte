<script lang="ts">
	const graphiQL = import("@mangadex/componnents/GraphiQL.svelte").then((g) => g.default);
</script>

{#await graphiQL}
	<p>Loading...</p>
{:then GraphiQL}
	<svelte:component this={GraphiQL} />
{/await}
