<script lang="ts">
	import { getCurrentWindow } from "@tauri-apps/api/window";

	interface Props {
		title: string;
		head?: boolean;
	}
	let { title, head }: Props = $props();

	const currentWindow = getCurrentWindow();
	$effect(() => {
		currentWindow.setTitle(title).catch(console.error);
		document.title = title;
	});
</script>

<svelte:head>
	{#if head}
		<title>{title}</title>
	{/if}
</svelte:head>
