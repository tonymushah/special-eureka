<script lang="ts">
	import { flip } from "svelte/animate";
	import type { ReportData } from "../types";
	import { crossfade, fade } from "svelte/transition";
	import type { MouseEventHandler } from "svelte/elements";
	import { isLinuxStore } from "@special-eureka/core/commands/isLinux";
	import { dev } from "$app/environment";
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import TimeAgo from "@mangadex/componnents/TimeAgo.svelte";
	import { ReportStatus } from "@mangadex/gql/graphql";
	import StatusBadge from "@mangadex/componnents/theme/tag/StatusBadge.svelte";
	interface Props {
		data: ReportData[];
	}
	let { data }: Props = $props();
	const [send, receive] = crossfade({
		fallback: (node) => fade(node)
	});
	let m: {
		x: number;
		y: number;
	} | null = $state(null);
	const mousemove: MouseEventHandler<HTMLElement> = function (event) {
		let r = event.currentTarget.getBoundingClientRect();
		m = { x: event.clientX - r.left, y: event.clientY - r.top };
	};
	const mouseleave: MouseEventHandler<HTMLElement> = function () {
		m = null;
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="body" onmousemove={mousemove} onmouseleave={mouseleave}>
	{#if ($isLinuxStore || dev) && m}
		<div transition:fade class="blob" style:transform="translate({m.x}px, {m.y}px)"></div>
	{/if}

	<section>
		{#each data as report (report.id)}
			<article
				animate:flip
				out:send={{
					key: report.id
				}}
				in:receive={{
					key: report.id
				}}
			>
				<p><strong>Object Id:</strong> {report.objectId}</p>
				<p>
					Status: {#if report.status == ReportStatus.Accepted || report.status == ReportStatus.Autoresolved}
						<StatusBadge color="green">
							{report.status}
						</StatusBadge>
					{:else if report.status == ReportStatus.Waiting}
						<StatusBadge color="yellow">
							{report.status}
						</StatusBadge>
					{:else if report.status == ReportStatus.Refused}
						<StatusBadge color="red">
							{report.status}
						</StatusBadge>
					{/if}
				</p>
				<details>
					<summary>Details</summary>
					<div>
						<Markdown source={report.details} />
					</div>
				</details>
				<p class="created">
					Created &nbsp; <span> <TimeAgo date={new Date(report.createdAt)} /></span>
				</p>
				<span>Report ID: {report.id}</span>
			</article>
		{/each}
	</section>
</div>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";

	.blob {
		filter: blur(40px);
		position: absolute;
		top: -100px;
		left: -100px;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--primary-l2) 50%, transparent 50%);
		pointer-events: none;
	}
	.body {
		margin: 0;
		position: relative;
	}
	section {
		position: relative;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 14px;
	}
	@include bp.media-only-screen-breakpoint-down(map.get(bp.$grid-breakpoints, "lg")) {
		section {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	article {
		display: grid;
		border: 3px dashed var(--mid-tone);
		border-radius: 0.25em;
		padding: 8px;
		gap: 4px;
		background-color: var(--accent);
		transition:
			transform ease-in-out 50ms,
			background-color ease-in-out 50ms;
		p {
			margin: 0px;
		}
		.created {
			display: flex;
			align-items: center;
			flex-direction: row;
		}
	}
	article:hover {
		transform: scale(1.05);
		background-color: var(--accent-hover);
		border: 3px solid var(--mid-tone);
	}
</style>
