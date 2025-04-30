<script lang="ts">
	import MidToneParagraph from "../MidToneParagraph.svelte";
	interface Props {
		innerText: string;
	}

	let { innerText }: Props = $props();
</script>

<MidToneParagraph>
	{innerText}
</MidToneParagraph>
