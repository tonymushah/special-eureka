<script lang="ts">
	import Title from "./Title.svelte";
	interface Props {
		innerText: string;
		type?: 1 | 2 | 3 | 4 | 5 | 6;
	}

	let { innerText, type = 2 }: Props = $props();
</script>

<Title {type}>
	{innerText}
</Title>
