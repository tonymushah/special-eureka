<script lang="ts">
	import AddToListButton from "./buttons/AddToListButton.svelte";
	import DownloadButton from "./buttons/DownloadButton.svelte";
	import ReadButton from "./buttons/ReadButton.svelte";
	import type { ReadingStatusEventDetail } from "./buttons/readingStatus";
	import ReadingStatusButton from "./buttons/ReadingStatusButton.svelte";
	import ReportButton from "./buttons/ReportButton.svelte";
	import StarButton from "./buttons/StarButton.svelte";
	import UploadButton from "./buttons/UploadButton.svelte";
	type ClickEventHandler = (
		ev: MouseEvent & {
			currentTarget: EventTarget & HTMLElement;
		}
	) => any;
	interface Events {
		onreadingStatus?: (ev: ReadingStatusEventDetail) => any;
		onrating?: (ev: number) => any;
		ondownload?: ClickEventHandler;
		ondelete?: ClickEventHandler;
		onaddToList?: ClickEventHandler;
		onread?: ClickEventHandler;
		onreport?: ClickEventHandler;
		onupload?: ClickEventHandler;
		ondownloading?: ClickEventHandler;
	}
	interface Props extends Events {
		closeDialogOnAdd?: boolean;
	}
	let {
		onaddToList,
		ondelete,
		ondownload,
		ondownloading,
		onrating,
		onread,
		onreadingStatus,
		onreport,
		onupload,
		closeDialogOnAdd
	}: Props = $props();
</script>

<div class="button-group">
	<ReadingStatusButton {onreadingStatus} {closeDialogOnAdd} />
	<DownloadButton {ondelete} {ondownload} {ondownloading} />
	<StarButton onselect={onrating} />
	<AddToListButton onclick={onaddToList} />
	<ReadButton onclick={onread} />
	<ReportButton onclick={onreport} />
	<UploadButton onclick={onupload} />
</div>

<style lang="scss">
	.button-group {
		display: flex;
		gap: 10px;
	}
</style>
