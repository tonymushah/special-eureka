<script lang="ts">
	import ButtonAccent from "../buttons/ButtonAccent.svelte";
	import { addToast } from "./Toaster.svelte";

	export let title: string;
	export let description: string;
	export let color: string;
	function toast() {
		addToast({
			data: {
				title,
				description,
				color
			}
		});
	}
</script>

<ButtonAccent
	on:click={() => {
		toast();
	}}
>
	Show toast
</ButtonAccent>
