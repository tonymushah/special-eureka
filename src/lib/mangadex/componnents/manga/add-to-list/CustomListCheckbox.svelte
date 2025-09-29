<script lang="ts">
	import { createCheckbox, melt } from "@melt-ui/svelte";
	import { CheckIcon, MinusIcon } from "svelte-feather-icons";
	import { v4 } from "uuid";

	interface Props {
		defaultChecked?: boolean;
		name: string;
		onChange?: (value: boolean | "indeterminate") => void;
	}
	let { defaultChecked, name, onChange }: Props = $props();
	const {
		elements: { root, input },
		helpers: { isChecked, isIndeterminate },
		states: { checked }
	} = createCheckbox({
		defaultChecked
	});
	$effect(() =>
		checked.subscribe((v) => {
			onChange?.(v);
		})
	);
	const id = v4();
</script>

<form>
	<div class="input">
		<button class="checkbox" use:melt={$root} {id}>
			{#if $isIndeterminate}
				<MinusIcon class="icon" />
			{:else if $isChecked}
				<CheckIcon class="icon" />
			{/if}

			<input use:melt={$input} />
		</button>
		<label for={id}>{name}</label>
	</div>
</form>

<style lang="scss">
	.input {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
	}
	form {
		width: fit-content;
	}
	.checkbox {
		display: flex;
		width: 2em;
		height: 2em;
		appearance: none;
		align-items: center;
		justify-items: center;
		background-color: var(--accent-l1);
		color: var(--text-color);
		border: 2px solid var(--mid-tone);
		border-radius: 0.25em;
	}
</style>
