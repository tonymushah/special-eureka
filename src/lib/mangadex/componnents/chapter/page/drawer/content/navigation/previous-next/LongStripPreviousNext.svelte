<script lang="ts">
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import { getChapterImageContext } from "@mangadex/componnents/chapter/page/contexts/images";
	import {
		fireChapterNextEvent,
		fireChapterPreviousEvent
	} from "@mangadex/componnents/chapter/page/contexts/previousNextEventTarget";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import {
		ArrowDownIcon,
		ArrowLeftIcon,
		ArrowRightIcon,
		ArrowUpIcon
	} from "svelte-feather-icons";

	const currentChapterPage = getChapterCurrentPageContext();
	const images_context = getChapterImageContext();
	$: next = function () {
		if ($currentChapterPage < $images_context.length - 1) {
			$currentChapterPage++;
		} else {
			fireChapterNextEvent();
		}
	};
	$: previous = function () {
		if ($currentChapterPage > 0) {
			$currentChapterPage--;
		} else {
			fireChapterPreviousEvent();
		}
	};
</script>

<ButtonAccent on:click={previous}>
	<ArrowUpIcon />
</ButtonAccent>

<slot />

<ButtonAccent on:click={next}>
	<ArrowDownIcon />
</ButtonAccent>
