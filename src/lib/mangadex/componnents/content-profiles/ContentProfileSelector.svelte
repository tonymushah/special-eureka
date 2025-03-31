<script lang="ts">
	import { preventDefault } from "svelte/legacy";

	import themes, { singleUpdateMutation } from "@mangadex/content-profile/graphql/profiles";
	import { derived } from "svelte/store";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { getContextClient } from "@urql/svelte";
	import defaultThemeProfileKey from "@mangadex/content-profile/graphql/defaultProfileName";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import DangerButton from "@mangadex/componnents/theme/buttons/DangerButton.svelte";
	import { XCircleIcon } from "svelte-feather-icons";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";

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
	function deleteProfile(name: string) {
		themes.update(($themes) => {
			$themes.delete(name);
			return $themes;
		});
	}
</script>

<Title type={2}>Content Profiles</Title>

<div class="profiles">
	{#each $list as profile}
		{#if $defaultThemeProfileKey == profile.name}
			<PrimaryButton>
				<div class="inner-button">
					<p>{profile.name}</p>
					<div>
						<DangerButton
							on:click={(e) => {
								e.stopPropagation();
								deleteProfile(profile.name);
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
				on:click={() => {
					$defaultThemeProfileKey = profile.name;
				}}
			>
				<div class="inner-button">
					<p>{profile.name}</p>
					<div>
						<DangerButton
							on:click={(e) => {
								e.stopPropagation();
								deleteProfile(profile.name);
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
	{:else}
		<p>No profile available here</p>
	{/each}
</div>

<form
	onsubmit={preventDefault((e) => {
		const data = new FormData(e.currentTarget);
		const name = data.get("name");
		if (typeof name == "string") {
			if (name.length > 0) {
				addNew(name);
			}
		}
	})}
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
