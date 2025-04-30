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
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();

	const currentChapterPage = getChapterCurrentPageContext();
	const images_context = getChapterImageContext();
	let next = $derived(function () {
		if ($currentChapterPage < $images_context.length - 1) {
			$currentChapterPage++;
		} else {
			fireChapterNextEvent();
		}
	});
	let previous = $derived(function () {
		if ($currentChapterPage > 0) {
			$currentChapterPage--;
		} else {
			fireChapterPreviousEvent();
		}
	});
	const variant = "2";
</script>

<ButtonAccent {variant} onclick={previous}>
	<ArrowUpIcon />
</ButtonAccent>

{@render children?.()}

<ButtonAccent {variant} onclick={next}>
	<ArrowDownIcon />
</ButtonAccent>
