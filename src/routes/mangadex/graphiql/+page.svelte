<script lang="ts">
	import PageError from "@mangadex/componnents/PageError.svelte";
</script>

<!-- TODO find a way to fix this -->
<!--
<svelte:boundary>
	{#snippet failed(err)}
		<PageError
			message={err instanceof Error
				? err.message
				: typeof err == "string"
					? err
					: "This graphiql page is now disabled because f*ck React with their hooks policy."}
		/>
	{/snippet}
	{#await import("@mangadex/componnents/GraphiQL.svelte").then((d) => d.default) then GraphiQL}
		<GraphiQL />
	{/await}
</svelte:boundary>
-->
<PageError
	message={"This graphiql page is now disabled because f*ck React with their hooks policy."}
/>
