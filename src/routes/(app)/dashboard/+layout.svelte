<script lang="ts">
	import tauriTheme from "@special-eureka/core/utils/theme";
	import { fonts, style } from "@special-eureka/core/window-decoration/WindowDecoration.svelte";
	import { getVersion } from "@tauri-apps/api/app";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import { onMount, type Snippet } from "svelte";
	import { GithubIcon } from "svelte-feather-icons";
	import haikeiREd from "@special-eureka/dashboard/haikei/animated-1.svg";
	import { QueryClientProvider } from "@tanstack/svelte-query";
	import { SvelteQueryDevtools } from "@tanstack/svelte-query-devtools";

	interface Props {
		children?: Snippet;
	}
	let { children }: Props = $props();
	onMount(async () => {
		const { defaultBehavior } = await import(
			"@special-eureka/core/window-decoration/stores/decorations.svelte"
		);
		defaultBehavior();
	});
	$effect(() => {
		switch ($tauriTheme) {
			case "light":
				style.update(($style) => {
					$style.background = "#f6d7ff";
					$style.backgroundOnHover = "#beb2ce";
					$style.textColor = "#38004c";
					$style.menuBackground = {
						default: "#ffe23e",
						active: "#ffe862",
						hover: "#f6be78"
					};
					$style.closeBackground = {
						hover: "#ff5a5a",
						active: "#ffa6a6",
						default: "#ffc7c7"
					};
					$style.maxBackground = {
						default: "#a7bfff",
						active: "#648fff",
						hover: "#0047ff"
					};
					$style.minBackground = {
						hover: "#e2d244",
						default: "#fff59e",
						active: "#ffea3e"
					};
					return $style;
				});
				break;
			case "dark":
				style.update(($style) => {
					$style.background = "#470060";
					$style.backgroundOnHover = "#230030";
					$style.textColor = "#f4d4ff";
					$style.menuBackground = {
						default: "#001b7f",
						active: "#000b35",
						hover: "#003498"
					};
					$style.closeBackground = {
						hover: "#ff1b1b",
						active: "#350808",
						default: "#6d0b0b"
					};
					$style.maxBackground = {
						default: "#001e6d",
						active: "#021136",
						hover: "#0047ff"
					};
					$style.minBackground = {
						active: "#413e00",
						default: "#5b5800",
						hover: "#d4d50f"
					};
					return $style;
				});
				break;
		}
	});
</script>

<QueryClientProvider>
	<SvelteQueryDevtools />
	<main
		class:light={$tauriTheme == "light"}
		class:dark={$tauriTheme == "dark"}
		style:--fonts={$fonts}
	>
		<section class="top" style={`--top-background-image: url("${haikeiREd}");`}>
			<h1>Welcome to Special Eureka</h1>
			{#await getVersion()}
				<h2><i>Getting version...</i></h2>
			{:then version}
				<h2>Currently in version {version}</h2>
			{/await}
			<p><i>I am so back...</i></p>
			<div class="buttons">
				<button
					class="github"
					onclick={() => {
						openUrl("https://github.com/tonymushah/special-eureka");
					}}
				>
					<GithubIcon />
					Github
				</button>
				<button
					class="toggle-theme"
					onclick={() => {
						tauriTheme.update((theme) => {
							switch (theme) {
								case "light":
									return "dark";
								case "dark":
									return "light";
							}
						});
					}}
				>
					Toggle theme
				</button>
			</div>
		</section>
		{@render children?.()}
	</main>
</QueryClientProvider>

<style lang="scss">
	.buttons {
		display: flex;
		gap: 12px;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
	.toggle-theme {
		--secondary: #006fff;
		background-color: color-mix(in srgb, var(--secondary) 10%, transparent 90%);
		color: var(--secondary);
		font-family:
			"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
		font-size: 20px;
		border: 3px solid var(--secondary);
		border-radius: 3px;
		align-items: center;
		display: flex;
		justify-content: center;
		padding: 8px 12px;
		gap: 6px;
		box-shadow: 0px 3px 0px var(--secondary);
		font-weight: 900;
	}
	.toggle-theme:hover {
		background-color: color-mix(in srgb, var(--secondary) 20%, transparent 80%);
	}
	.toggle-theme:active {
		transform: translateY(3px);
		box-shadow: none;
	}
	.github {
		background-color: #fff;
		color: #000;
		font-family:
			"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
		font-size: 20px;
		border: 3px solid #000;
		border-radius: 3px;
		align-items: center;
		display: flex;
		justify-content: center;
		padding: 8px 12px;
		gap: 6px;
		box-shadow: 0px 3px 0px #000;
		font-weight: 900;
	}
	.github:hover {
		background-color: #dadada;
	}
	.github:active {
		transform: translateY(3px);
		box-shadow: none;
	}
	.top {
		width: 100%;
		display: flex;
		min-height: 25em;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background-repeat: no-repeat;
		background-size: contain;
		background-position: bottom;
		background-image: var(--top-background-image);
		h1 {
			font-size: 36px;
			margin: 0px;
		}
	}
	main {
		height: -webkit-fill-available;
		overflow: scroll;
		font-family: var(--fonts);
		background-color: var(--main-background);
		color: var(--color);
	}
	main.light {
		--main-background: #ffe4e4;
		--color: #38004c;
		--primary: #ffed4d;
		--secondary: #326aff;
	}
	main.dark {
		--main-background: #38004c;
		--color: #f4d4ff;
		--primary: #326afe;
		--secondary: #ff5a5a;
	}
</style>
