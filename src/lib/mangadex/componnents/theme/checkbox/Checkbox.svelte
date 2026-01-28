<script lang="ts">
	import { Checkbox } from "@ark-ui/svelte/checkbox";
	import { CheckIcon, Minus } from "@lucide/svelte";
	import stylesClasses from "./checkbox.module.scss";

	interface Props {
		checked?: boolean;
		label: string;
		defaultChecked?: boolean;
	}
	let { checked = $bindable(), label, defaultChecked }: Props = $props();
</script>

<Checkbox.Root bind:checked class={stylesClasses.root} {defaultChecked}>
	<Checkbox.Label class={stylesClasses.label}>{label}</Checkbox.Label>
	<Checkbox.Control class={stylesClasses.indicator}>
		<Checkbox.Indicator>
			<CheckIcon />
		</Checkbox.Indicator>
		<Checkbox.Indicator indeterminate>
			<Minus />
		</Checkbox.Indicator>
	</Checkbox.Control>
	<Checkbox.HiddenInput />
</Checkbox.Root>
