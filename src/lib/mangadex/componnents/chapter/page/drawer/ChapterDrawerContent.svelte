<script lang="ts">
	import ChangeGroups from "./content/ChangeGroups.svelte";
	import Header from "./content/Header.svelte";
	import Help from "./content/Help.svelte";
	import Line from "./content/Line.svelte";
	import Navigation from "./content/Navigation.svelte";
	import Settings from "./content/Settings.svelte";
	import Thread from "./content/Thread.svelte";
	import TopInfo from "./content/TopInfo.svelte";
	import Uploaders from "./content/Uploaders.svelte";

	interface Props {
		left?: boolean;
	}

	let { left }: Props = $props();
</script>

<div class="content">
	<Header {left} />
	<TopInfo />
	<Navigation />
	<Line />
	<Thread />
	<Uploaders />
	<ChangeGroups />
	<Line />
	<Settings />
	<Line />
	<Help />
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
