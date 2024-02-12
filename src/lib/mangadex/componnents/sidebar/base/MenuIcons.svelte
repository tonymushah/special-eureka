<script lang="ts">
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { sub_end } from "@mangadex/utils";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { onDestroy } from "svelte";
	import { v4 } from "uuid";
	const sub_id = v4();
	const rlt_sub = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {
			sub_id
		}
	});
	onDestroy(() => {
		sub_end(sub_id);
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
