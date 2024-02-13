<script lang="ts">
	import Title from "./Title.svelte";
	export let innerText: string;
	export let type: 1 | 2 | 3 | 4 | 5 | 6 = 2;
</script>

<Title {type}>
	{innerText}
</Title>
