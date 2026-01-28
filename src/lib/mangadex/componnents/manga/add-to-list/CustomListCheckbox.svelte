<script lang="ts">
	import Checkbox from "@mangadex/componnents/theme/checkbox/Checkbox.svelte";

	interface Props {
		defaultChecked?: boolean;
		name: string;
		onChange?: (value: boolean | "indeterminate") => void;
	}
	let checked: boolean | undefined = $state();
	let { name, onChange, defaultChecked }: Props = $props();
	$effect(() => {
		if (typeof checked == "boolean") {
			onChange?.(checked);
		}
	});
</script>

<Checkbox label={name} bind:checked {defaultChecked} />
