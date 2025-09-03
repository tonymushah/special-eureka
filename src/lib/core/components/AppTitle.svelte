<script lang="ts">
	import { getCurrentWindow } from "@tauri-apps/api/window";

	interface Props {
		title: string;
	}
	let { title }: Props = $props();

	const currentWindow = getCurrentWindow();
	$effect(() => {
		currentWindow.setTitle(title).catch(console.error);
		document.title = title;
	});
</script>
