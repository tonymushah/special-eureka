<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { isLongStrip } from "../../../../contexts/currentChapterReadingMode";
	import {
		fireChapterNextEvent,
		fireChapterPreviousEvent
	} from "../../../../contexts/previousNextEventTarget";
	import {
		readingDirection as direction,
		ReadingDirection
	} from "../../../../stores/readingDirection";
	import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";
	const isLong = isLongStrip();
	$: next = function () {
		fireChapterNextEvent();
	};
	$: previous = function () {
		fireChapterPreviousEvent();
	};
	$: onNext = function () {
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
	};
	$: onPrevious = function () {
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
	};
</script>

<ButtonAccent on:click={onPrevious}>
	<ArrowLeftIcon />
</ButtonAccent>

<slot />

<ButtonAccent on:click={onNext}>
	<ArrowRightIcon />
</ButtonAccent>
