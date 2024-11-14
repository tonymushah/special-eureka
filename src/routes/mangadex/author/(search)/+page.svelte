<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import { SearchIcon } from "svelte-feather-icons";
	import { readonly, writable } from "svelte/store";
	import SearchContent from "./SearchContent.svelte";
	let realTime = false;
	let inputName = "";
	const authorName = writable<string | undefined>(undefined);
	$: {
		if (realTime) {
			authorName.set(inputName);
		}
	}
</script>

<section class="title">
	<Title>Authors</Title>
</section>

<section>
	<form
		on:submit|preventDefault={() => {
			if (!realTime) {
				authorName.set(inputName);
			}
		}}
	>
		<div class="input">
			<FormInput
				inputProps={{
					placeholder: "Author name"
				}}
				bind:value={inputName}
				widthFull
			/>
		</div>
		<article
			class="buttons"
			on:contextmenu|preventDefault={() => {
				realTime = !realTime;
			}}
		>
			{#if realTime}
				<ButtonAccent variant="accent" isBase type="submit">
					<div class="icons">
						<SearchIcon />
					</div>
				</ButtonAccent>
			{:else}
				<PrimaryButton variant="1" isBase type="submit">
					<div class="icons">
						<SearchIcon />
					</div>
				</PrimaryButton>
			{/if}
		</article>
	</form>
</section>

<MidToneLine />

<section>
	<SearchContent authorName={readonly(authorName)} />
</section>

<style lang="scss">
	.icons {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	form {
		display: flex;
		flex-direction: row;
		gap: 10px;
		.input {
			display: flex;
			flex-grow: 4;
		}
	}
</style>
