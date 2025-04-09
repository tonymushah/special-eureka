<script lang="ts">
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import SettingsItem from "./SettingsItem.svelte";
	import { route } from "$lib/ROUTES";
	import ThemeIcon from "./(icons)/ThemeIcon.svelte";
	import type { ComponentProps } from "svelte";
	import AuthIcon from "./(icons)/AuthIcon.svelte";
	import ContentIcon from "./(icons)/ContentIcon.svelte";
	import ArchiveIcon from "./(icons)/ArchiveIcon.svelte";
	import PlaygroundIcon from "./(icons)/PlaygroundIcon.svelte";
	let settings: ComponentProps<typeof SettingsItem>[] = [
		{
			title: "Themes",
			description: "Add, Edit, Delete theme profiles to edit MangaDex Colors and more!",
			href: route("/mangadex/settings/themes"),
			icon: ThemeIcon
		},
		{
			title: "Authentification",
			description: "Log in or out from MangaDex",
			href: route("/mangadex/settings/auth"),
			icon: AuthIcon
		},
		{
			title: "Content Profile",
			description: "Add, edit, Delete content profile to edit Mangadex contents",
			href: route("/mangadex/settings/content-profiles"),
			icon: ContentIcon
		},
		{
			title: "Offline Data",
			description: "Update offline data config",
			href: route("/mangadex/settings/offline-data"),
			icon: ArchiveIcon
		},
		{
			title: "Developer Playground",
			description: "Design tests etc...",
			href: route("/mangadex/settings/css-playground"),
			icon: PlaygroundIcon
		}
	];
</script>

<Title type={1}>Settings</Title>

<div class="settings">
	{#each settings as cog}
		<SettingsItem {...cog} />
	{/each}
</div>

<style lang="scss">
	@media (width <= 900px) {
		:root {
			--grid-columns: 3;
		}
	}
	@media (width > 900px) {
		:root {
			--grid-columns: 4;
		}
	}

	.settings {
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(var(--grid-columns), 1fr);
	}
</style>
