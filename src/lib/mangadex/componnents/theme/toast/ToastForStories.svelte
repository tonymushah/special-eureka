<script lang="ts">
	import ButtonAccent from "../buttons/ButtonAccent.svelte";
	import { addToast } from "./Toaster.svelte";

	interface Props {
		title: string;
		description: string;
		color: string;
	}

	let { title, description, color }: Props = $props();
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
	onclick={() => {
		toast();
	}}
>
	Show toast
</ButtonAccent>
