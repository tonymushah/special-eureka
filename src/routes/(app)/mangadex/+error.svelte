<script lang="ts">
	import { page } from "$app/stores";
	import PageError from "@mangadex/componnents/PageError.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
</script>

<AppTitle title={$page.error?.title ?? "MangaDex Page Error"} />

<PageError message={$page.error?.message} />
