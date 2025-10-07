<script>
	import LatestUpdates from "@mangadex/componnents/home/LatestUpdates.svelte";
	import PopularTitles from "@mangadex/componnents/home/PopularTitles.svelte";
	import RecentlyAdded from "@mangadex/componnents/home/RecentlyAdded.svelte";
	import Seasonal from "@mangadex/componnents/home/Seasonal.svelte";
	import StaffPicks from "@mangadex/componnents/home/StaffPicks.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
</script>

<AppTitle title="MangaDex - Special Eureka" />

<section class="popular-titles">
	<PopularTitles />
</section>

<MidToneLine />

<section class="latest-updates">
	<LatestUpdates />
</section>

<MidToneLine />

<section class="staff-picks">
	<StaffPicks />
</section>

<MidToneLine />

<section class="seasonal">
	<Seasonal />
</section>
<MidToneLine />

<section class="recently-added">
	<RecentlyAdded />
</section>

<style lang="scss">
	section.popular-titles {
		margin-top: 0.5em;
	}
	section.recently-added {
		padding-bottom: 0.5em;
	}
</style>
