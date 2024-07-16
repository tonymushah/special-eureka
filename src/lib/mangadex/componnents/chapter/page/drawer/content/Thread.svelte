<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import Icon from "./thread/Icon.svelte";
	import { fireChapterThreadEvent } from "../../contexts/previousNextEventTarget";
	import { derived } from "svelte/store";
	import { getCurrentChapterData } from "../../contexts/currentChapter";
	const label = derived(getCurrentChapterData(), ($current) => {
		const thread = $current.thread;
		if (thread == undefined) {
			return "First to comment ;)";
		} else if (thread.isEmpty) {
			return "First to comment ;)";
		} else {
			let isMore = thread.comments > 1 ? "Comments" : "Comment";
			return `${thread.comments} ${isMore}`;
		}
	});
</script>

<section>
	<ButtonAccentOnlyLabel
		on:click={fireChapterThreadEvent}
		variant="3"
		icon={Icon}
		label={$label}
	/>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
