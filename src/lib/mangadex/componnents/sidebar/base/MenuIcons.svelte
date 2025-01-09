<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { getContextClient, subscriptionStore } from "@urql/svelte";

	const rlt_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {}
	});
	$: rtl = $rlt_sub.data?.watchSidebarDirection == Direction.Rtl;
</script>

{#if !rtl}
	<div class="icon">
		<slot name="icon" />
	</div>
{:else}
	<div class="suffix-icon">
		<slot name="suffix-icon" />
	</div>
{/if}

<slot />

{#if rtl}
	<div class="icon">
		<slot name="icon" />
	</div>
{:else}
	<div class="suffix-icon">
		<slot name="suffix-icon" />
	</div>
{/if}
