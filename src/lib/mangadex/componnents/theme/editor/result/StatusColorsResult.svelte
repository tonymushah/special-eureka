<script>
	import StatusBadgeOnlyLabel from "../../tag/StatusBadgeOnlyLabel.svelte";
</script>

<section>
	<StatusBadgeOnlyLabel label="Some Red Badge" color="red" />
	<StatusBadgeOnlyLabel label="A Green Badge" color="green" />
	<StatusBadgeOnlyLabel label="The Yellow Badge" color="yellow" />
	<StatusBadgeOnlyLabel label="Another blue Badge" color="blue" />
	<StatusBadgeOnlyLabel label="Who cares about the Grey Badge?" color="gray" />
	<StatusBadgeOnlyLabel label="The Doujinshi Badge" color="purple" />
</section>

<style lang="scss">
	section {
		display: flex;
		gap: 5px;
		flex-wrap: wrap;
		flex-direction: row;
	}
</style>
