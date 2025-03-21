<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { isLongStrip } from "../../../../contexts/currentChapterReadingMode";
	import {
		fireChapterNextEvent,
		fireChapterPreviousEvent
	} from "../../../../contexts/previousNextEventTarget";
	import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { getCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	const direction = getCurrentChapterDirection();
	const isLong = isLongStrip();
	let next = $derived(function () {
		fireChapterNextEvent();
	});
	let previous = $derived(function () {
		fireChapterPreviousEvent();
	});
	let onNext = $derived(function () {
		if (!$isLong) {
			switch ($direction) {
				case ReadingDirection.Ltr:
					next();
					break;
				case ReadingDirection.Rtl:
					previous();
					break;
				default:
					break;
			}
		} else {
			next();
		}
	});
	let onPrevious = $derived(function () {
		if (!$isLong) {
			switch ($direction) {
				case ReadingDirection.Ltr:
					previous();
					break;
				case ReadingDirection.Rtl:
					next();
					break;
				default:
					break;
			}
		} else {
			previous();
		}
	});
	const variant = "2";
</script>

<ButtonAccent {variant} on:click={onPrevious}>
	<ArrowLeftIcon />
</ButtonAccent>

{@render children?.()}

<ButtonAccent {variant} on:click={onNext}>
	<ArrowRightIcon />
</ButtonAccent>
