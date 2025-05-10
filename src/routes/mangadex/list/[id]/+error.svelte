<script lang="ts">
	import { page } from "$app/stores";
	import PageError from "@mangadex/componnents/PageError.svelte";
</script>

<PageError message={$page.error?.message} />
