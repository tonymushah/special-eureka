<script>
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import FormInput from "@mangadex/componnents/theme/form/input/FormInput.svelte";
	import { FilterIcon, SearchIcon } from "svelte-feather-icons";
</script>

<form on:submit|preventDefault={() => {}}>
	<div class="input">
		<FormInput name="title" widthFull />
	</div>
	<div class="buttons">
		<ButtonAccent variant="accent" isBase>
			<div class="icons">
				<FilterIcon />
			</div>
		</ButtonAccent>
	</div>
	<div class="buttons">
		<PrimaryButton variant="1" isBase type="submit">
			<div class="icons">
				<SearchIcon />
			</div>
		</PrimaryButton>
	</div>
</form>

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
