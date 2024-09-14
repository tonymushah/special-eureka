<script>
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import SettingsItem from "./SettingsItem.svelte";
	import { route } from "$lib/ROUTES";
	import ThemeIcon from "./(icons)/ThemeIcon.svelte";
</script>

<Title type={1}>Settings</Title>

<div class="settings">
	<SettingsItem
		title="Themes"
		description="Add, Edit, Delete theme profiles to edit MangaDex Colors and more!"
		href={route("/mangadex/settings/themes")}
		icon={ThemeIcon}
	/>
</div>

<style lang="scss">
	.settings {
		--grid-columns: 4;
		display: grid;
		gap: 10px;
		grid-template-columns: repeat(var(--grid-columns), calc(100% / var(--grid-columns)));
	}
</style>
