<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";
	import { fade } from "svelte/transition";
	import mangadexLogo from "@mangadex/assets/mangadex-logo.svg";
	import { type Routes } from "$lib/ROUTES";
	import { goto } from "$app/navigation";
	import { isLinuxStore } from "@special-eureka/core/commands/isLinux";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import openNewWindow from "@special-eureka/core/commands/openNewWindow";
	import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
	import { openUrl } from "@tauri-apps/plugin-opener";
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
	let sites: {
		title: string;
		route: Routes;
		img: string;
		website?: string;
	}[] = [
		{
			title: "MangaDex",
			route: "/mangadex",
			img: mangadexLogo,
			website: "https://mangadex.org/"
		}
	];
</script>

<section>
	<div class="title">
		<h2>Sites<i>??</i></h2>
		<p><i>Only MD but yeah... i plan to add more :)</i></p>
	</div>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="body" onmousemove={mousemove} onmouseleave={mouseleave}>
		<!-- the blob doesn't work well on linux -->
		{#if m && !$isLinuxStore}
			<div transition:fade class="blob" style:transform="translate({m.x}px, {m.y}px)"></div>
		{/if}
		<div class="card-container">
			{#each sites as site}
				<div
					class="card"
					role="button"
					tabindex="0"
					onclick={() => {
						goto(site.route);
					}}
					onkeypress={(e) => {
						if (e.key == "Enter") {
							goto(site.route);
						}
					}}
					oncontextmenu={registerContextMenuEvent({
						includeContext: false,
						preventDefault: true,
						stopPropagation: true,
						additionalMenus() {
							return [
								ContextMenuItemProvider.menuItem({
									text: "Open",
									action() {
										goto(site.route);
									}
								}),
								ContextMenuItemProvider.menuItem({
									text: "Open in a new window",
									action() {
										openNewWindow(currentLocationWithNewPath(site.route));
									}
								}),
								ContextMenuItemProvider.menuItem({
									text: "Open in the browser",
									action() {
										if (site.website) openUrl(site.website);
									},
									enabled: site.website != undefined
								})
							];
						}
					})}
				>
					<img src={site.img} alt={site.title} />
					<h2>{site.title}</h2>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="scss">
	.title {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		h2 {
			margin: 0px;
			font-style: 30px;
			text-decoration: underline;
		}
		p {
			margin: 0px;
		}
		color: #0b000f;
	}

	.body {
		padding: 5em 2em;
		margin: 0;
		position: relative;
	}
	.card-container {
		position: relative;
		margin: 0;
		padding: 0;
		display: inline-flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		align-content: center;
		flex-wrap: wrap;
		gap: 14px;
	}
	.card {
		position: relative;
		overflow: hidden;
		transition: 0.1s;
		padding: 20px;
		width: 210px;
		height: 150px;
		border-radius: 12px;
		outline: 3px solid rgb(128 128 128 / 0.2);
		background: var(--main-background);
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		img {
			width: 100px;
			height: 100px;
		}
	}
	.card:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
	.card:focus {
		outline: 3px solid rgb(128 128 128 / 0.8);
	}
	.blob {
		filter: blur(40px);
		position: absolute;
		top: -100px;
		left: -100px;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background: rgb(255, 255, 255, 0.5);
		pointer-events: none;
	}
</style>
