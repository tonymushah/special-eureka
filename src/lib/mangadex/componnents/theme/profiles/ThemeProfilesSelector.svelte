<script lang="ts">
	import defaultThemeProfileKey from "@mangadex/theme/graphql/defaultThemeProfileKey";
	import themes, { singleUpdateMutation } from "@mangadex/theme/graphql/themes";
	import { getContextClient } from "@urql/svelte";
	import { XCircleIcon } from "svelte-feather-icons";
	import { derived } from "svelte/store";
	import SomeDiv from "../SomeDiv.svelte";
	import ButtonAccent from "../buttons/ButtonAccent.svelte";
	import DangerButton from "../buttons/DangerButton.svelte";
	import PrimaryButton from "../buttons/PrimaryButton.svelte";
	import FormInput from "../form/input/FormInput.svelte";
	import Title from "../texts/title/Title.svelte";

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
			--mid-tone={profile.value.mid_tone}
		>
			{#if $defaultThemeProfileKey == profile.name}
				<PrimaryButton>
					<div class="inner-button">
						<p>{profile.name}</p>
						<div>
							<DangerButton
								onclick={(e) => {
									e.stopPropagation();
									deleteTheme(profile.name);
								}}
							>
								<div class="delete-icon">
									<XCircleIcon />
								</div>
							</DangerButton>
						</div>
					</div>
				</PrimaryButton>
			{:else}
				<ButtonAccent
					onclick={() => {
						$defaultThemeProfileKey = profile.name;
					}}
				>
					<div class="inner-button">
						<p>{profile.name}</p>
						<div>
							<DangerButton
								onclick={(e) => {
									e.stopPropagation();
									deleteTheme(profile.name);
								}}
							>
								<div class="delete-icon">
									<XCircleIcon />
								</div>
							</DangerButton>
						</div>
					</div>
				</ButtonAccent>
			{/if}
		</SomeDiv>
	{:else}
		<p>No profile available here</p>
	{/each}
</div>

<form
	onsubmit={(e) => {
		e.preventDefault();
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
		<FormInput
			widthFull
			inputProps={{
				name: "name",
				placeholder: "The New Theme Profile Name"
			}}
		/>
	</div>

	<PrimaryButton type="submit">
		<p>Add</p>
	</PrimaryButton>
</form>

<style lang="scss">
	.inner-button {
		display: flex;
		gap: 12px;
		margin: 0px 10px;
		align-items: center;
		.delete-icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: min-content;
			padding: 0.25em 0.125em;
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
