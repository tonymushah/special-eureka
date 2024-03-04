<script>
	import LatestUpdates from "@mangadex/componnents/home/LatestUpdates.svelte";
	import PopularTitles from "@mangadex/componnents/home/PopularTitles.svelte";
	import StaffPicks from "@mangadex/componnents/home/StaffPicks.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
</script>

<div class="popular-titles">
	<PopularTitles />
</div>

<MidToneLine />

<div class="latest-updates">
	<LatestUpdates />
</div>

<MidToneLine />

<div class="staff-picks">
	<StaffPicks />
</div>

<MidToneLine />

<style lang="scss">
	div.popular-titles {
		margin-top: 0.5em;
	}
</style>
