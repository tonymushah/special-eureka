<script lang="ts">
	import PageTitle from "@mangadex/componnents/pages/PageTitle.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import SearchContent from "./SearchContent.svelte";
</script>

<AppTitle title="Following scanlation groups | Mangadex" />
<div>
	<PageTitle withReturn title="Following scanlation groups" />

	<SearchContent />
</div>

<style lang="scss">
	div {
		margin: 0px 16px;
	}
</style>
