<script lang="ts">
	import { arrow, computePosition, flip, offset, shift } from "@floating-ui/dom";
	import MangaDexFlagIcon from "@mangadex/componnents/FlagIcon.svelte";
	import TimeAgo from "@mangadex/componnents/TimeAgo.svelte";
	import {
		cancelDownloadMutation,
		downloadMutation,
		hasChapterDownloadingFailed,
		isChapterDownloaded,
		isChapterDownloading
	} from "@mangadex/download/chapter";
	import type { Language, UserRole } from "@mangadex/gql/graphql";
	import chapterElementContextMenuItems from "@mangadex/utils/context-menu/chapter";
	import registerContextMenuEvent, {
		setContextMenuContext
	} from "@special-eureka/core/utils/contextMenuContext";
	import { debounce } from "lodash";
	import {
		CheckIcon,
		DownloadCloudIcon,
		DownloadIcon,
		UserIcon,
		UsersIcon,
		XIcon
	} from "svelte-feather-icons";

	type Group = {
		id: string;
		name: string;
	};
	type Uploader = {
		id: string;
		roles: UserRole[];
		name: string;
	};
	type MouseEnvDiv = MouseEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	type KeyboardEnvDiv = KeyboardEvent & {
		currentTarget: HTMLDivElement & EventTarget;
	};
	interface Chapter2Events {
		ondownload?: (
			ev: MouseEnvDiv & {
				id: string;
			}
		) => any;
		ondownloadKeyPress?: (
			ev: KeyboardEnvDiv & {
				id: string;
			}
		) => any;
	}
	interface Props extends Chapter2Events {
		id: string;
		chapterTitle?: string | undefined;
		lang: Language;
		groups?: Group[];
		uploader: Uploader;
		upload_date: Date;
	}

	let {
		id,
		chapterTitle = undefined,
		lang = $bindable(),
		groups = [],
		uploader,
		upload_date,
		ondownload,
		ondownloadKeyPress
	}: Props = $props();

	let layout: HTMLDivElement | undefined = $state();
	let tooltip: HTMLDivElement | undefined = $state(undefined);
	let arrowElement: HTMLDivElement | undefined = $state(undefined);

	async function update() {
		if (layout && tooltip && arrowElement) {
			const { x, y, placement, middlewareData } = await computePosition(layout, tooltip, {
				placement: "bottom",
				middleware: [
					offset(6),
					flip(),
					shift({
						padding: 5
					}),
					arrow({
						element: arrowElement
					})
				]
			});
			Object.assign(tooltip.style, {
				left: `${x}px`,
				top: `${y}px`
			});
			const arrow_ = middlewareData.arrow;
			if (arrow_) {
				const { x: arrowX, y: arrowY } = arrow_;
				const staticSide = {
					top: "bottom",
					right: "left",
					bottom: "top",
					left: "right"
				}[placement.split("-")[0]];

				Object.assign(arrowElement.style, {
					left: arrowX != null ? `${arrowX}px` : "",
					top: arrowY != null ? `${arrowY}px` : "",
					right: "",
					bottom: "",
					// @ts-ignore
					[staticSide]: "-4px"
				});
			}
		}
	}
	function showTooltip() {
		if (tooltip) {
			tooltip.style.display = "block";
			update();
		}
	}

	function hideTooltip() {
		if (tooltip) {
			tooltip.style.display = "";
		}
	}

	/// TODO implement quality

	const isDownloading = isChapterDownloading({
		id
	});

	const hasFailed = hasChapterDownloadingFailed({
		id
	});

	const is_downloaded = isChapterDownloaded({
		id
	});

	const handle_download_event = debounce(async function () {
		if ($isDownloading) {
			await cancelDownloadMutation.mutateAsync(id);
		} else {
			await downloadMutation.mutateAsync({
				id
			});
		}
	});
	setContextMenuContext(() => {
		return chapterElementContextMenuItems({
			id,
			groups,
			uploader
		});
	}, true);
</script>

<div
	role="article"
	class="layout chapter-element"
	bind:this={layout}
	onmouseenter={showTooltip}
	onmouseleave={hideTooltip}
	onfocus={showTooltip}
	onblur={hideTooltip}
	data-chapter-id={id}
>
	<div
		class="state buttons"
		role="button"
		onclick={async (e) => {
			ondownload?.({ ...e, id });
			await handle_download_event();
		}}
		onkeypress={async (e) => {
			ondownloadKeyPress?.({ ...e, id });
			if (e.key == "Enter") {
				await handle_download_event();
			}
		}}
		tabindex={0}
	>
		{#if $is_downloaded}
			<CheckIcon />
		{:else if $isDownloading}
			<DownloadCloudIcon />
		{:else if $hasFailed}
			<XIcon />
		{:else}
			<DownloadIcon />
		{/if}
	</div>
	<div class="title-groups">
		<div class="title">
			<div class="flag-icon">
				<MangaDexFlagIcon bind:lang />
			</div>
			<a
				href={`/mangadex/chapter/${id}`}
				oncontextmenu={registerContextMenuEvent({
					preventDefault: true
				})}><h4>{chapterTitle}</h4></a
			>
		</div>
		<p>
			<TimeAgo date={upload_date} />
		</p>
	</div>
</div>

<div class="tooltip" role="tooltip" bind:this={tooltip}>
	<div class="date-uploader">
		<div class="groups">
			<div class="buttons" role="button">
				<UsersIcon />
			</div>
			{#if groups.length != 0}
				{#each groups as { id, name }}
					<a href={`/mangadex/scanlation-group/${id}`}>{name}</a>
				{/each}
			{:else}
				<i>No Groups</i>
			{/if}
		</div>
		<a href="/" class="uploader">
			<UserIcon />
			{uploader.name}
		</a>
	</div>
	<div class="arrow" bind:this={arrowElement}></div>
</div>

<style lang="scss">
	.buttons {
		transition: background-color 300ms ease-in-out;
	}
	.buttons:hover {
		background-color: var(--accent-l1-hover);
	}
	.buttons:active {
		background-color: var(--accent-l1-active);
	}
	.layout {
		display: flex;
		flex-direction: row;
		align-self: start;
		column-gap: 20px;
		color: var(--text-color);
		padding: 5px;
		transition: background-color 300ms ease-in-out;
		border-radius: 0.5rem;
	}
	.layout > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.title-groups > div > a > h4 {
		margin: 0px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		overflow: hidden;
	}
	.title-groups {
		flex-grow: 3;
		display: flex;
		flex-direction: column;
	}
	.groups {
		display: flex;
		align-content: center;
		justify-content: center;
		gap: 5px;
	}
	.title-groups > p {
		margin: 0px;
	}
	.title {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
	.layout:hover {
		background-color: var(--accent-hover);
	}
	a {
		color: var(--text-color);
		text-decoration: none;
	}
	.arrow {
		position: absolute;
		background: var(--accent-l5);
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
	}
	.tooltip {
		display: none;
		background: var(--accent-l5);
		color: var(--text-color);
		font-weight: bold;
		padding: 5px;
		border-radius: 4px;
		font-size: 90%;
		width: max-content;
		position: absolute;
		top: 0;
		left: 0;
	}
	.tooltip:hover {
		background: var(--accent-l5-hover);
	}
	.uploader {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	:root {
		--layout-width: 50vw;
	}
	.chapter-element:global([data-selecto-selected]) {
		background-color: color-mix(in srgb, var(--primary) 50%, transparent 50%);
	}
</style>
