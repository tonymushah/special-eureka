<script lang="ts">
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import SettingsItem from "./SettingsItem.svelte";
	import { route } from "$lib/ROUTES";
	import ThemeIcon from "./(icons)/ThemeIcon.svelte";
	import type { ComponentProps } from "svelte";
	import AuthIcon from "./(icons)/AuthIcon.svelte";
	import ContentIcon from "./(icons)/ContentIcon.svelte";
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
	.settings {
		--grid-columns: 4;
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(var(--grid-columns), calc(100% / var(--grid-columns)));
	}
</style>
