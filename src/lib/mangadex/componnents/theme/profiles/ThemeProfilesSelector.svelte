<script lang="ts">
	import themes, { singleUpdateMutation } from "@mangadex/theme/graphql/themes";
	import { derived } from "svelte/store";
	import Title from "../texts/title/Title.svelte";
	import { getContextClient } from "@urql/svelte";
	import defaultThemeProfileKey from "@mangadex/theme/graphql/defaultThemeProfileKey";
	import SomeDiv from "../SomeDiv.svelte";
	import PrimaryButton from "../buttons/PrimaryButton.svelte";
	import DangerButton from "../buttons/DangerButton.svelte";
	import { XCircleIcon } from "svelte-feather-icons";
	import ButtonAccent from "../buttons/ButtonAccent.svelte";
	import FormInput from "../form/input/FormInput.svelte";

	const client = getContextClient();
	const list = derived(themes, ($ths) =>
		Array.from($ths.entries()).map(([name, value]) => ({ name, value }))
	);
	async function addNew(name: string) {
		await client.mutation(singleUpdateMutation, {
			name
		});
		defaultThemeProfileKey.set(name);
	}
	function deleteTheme(name: string) {
		themes.update(($themes) => {
			$themes.delete(name);
			return $themes;
		});
	}
</script>

<Title type={2}>Theme Profiles</Title>

<div class="profiles">
	{#each $list as profile}
		<SomeDiv
			--accent={profile.value.accents.default.default}
			--accent-hover={profile.value.accents.default.hover}
			--accent-active={profile.value.accents.default.active}
			--primary={profile.value.primary.primary}
			--text-color={profile.value.textColor}
			--danger={profile.value.danger.default}
		>
			{#if $defaultThemeProfileKey == profile.name}
				<PrimaryButton>
					<div class="inner-button">
						<p>{profile.name}</p>
						<DangerButton
							on:click={(e) => {
								e.stopPropagation();
								deleteTheme(profile.name);
							}}
						>
							<div class="delete-icon">
								<XCircleIcon />
							</div>
						</DangerButton>
					</div>
				</PrimaryButton>
			{:else}
				<ButtonAccent
					on:click={() => {
						$defaultThemeProfileKey = profile.name;
					}}
				>
					<div class="inner-button">
						<p>{profile.name}</p>
						<DangerButton
							on:click={(e) => {
								e.stopPropagation();
								deleteTheme(profile.name);
							}}
						>
							<div class="delete-icon">
								<XCircleIcon />
							</div>
						</DangerButton>
					</div>
				</ButtonAccent>
			{/if}
		</SomeDiv>
	{:else}
		<p>No profile available here</p>
	{/each}
</div>

<form
	on:submit|preventDefault={(e) => {
		const data = new FormData(e.currentTarget);
		const name = data.get("name");
		if (typeof name == "string") {
			if (name.length > 0) {
				addNew(name);
			}
		}
	}}
>
	<div>
		<FormInput widthFull inputProps={{
			name:"name", placeholder:"The New Theme Profile Name"
		}}  />
	</div>

	<PrimaryButton type="submit">
		<p>Add</p>
	</PrimaryButton>
</form>

<style lang="scss">
	.inner-button {
		display: flex;
		gap: 5px;
		margin: 0px 10px;
		.delete-icon {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	form {
		display: flex;
		gap: 10px;
		div {
			width: 500px;
			display: flex;
		}
		p {
			margin: 0px 10px;
		}
	}
	.profiles {
		display: flex;
		flex-direction: row;
		gap: 10px;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}
</style>
