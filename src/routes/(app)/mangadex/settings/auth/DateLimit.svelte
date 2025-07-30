<script lang="ts">
	import getAuthExpiration from "@mangadex/utils/oauth/getAuthExpiration";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";

	let expires = $state<Date | undefined>(undefined);

	const client = getContextClient();
	onMount(async () => {
		expires = await getAuthExpiration(client);
	});
</script>

{#if expires}
	<p>
		Your auth token {#if expires < new Date()}
			have expired
		{:else}
			will expire
		{/if} at <span class="expires">{expires}</span>.
	</p>
{/if}

<style lang="scss">
	.expires {
		text-decoration: underline;
	}
</style>
