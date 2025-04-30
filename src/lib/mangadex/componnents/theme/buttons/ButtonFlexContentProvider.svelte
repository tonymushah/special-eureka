<script lang="ts">
	import SomeDiv from "../SomeDiv.svelte";

	interface Props {
		alignItems?: string;
		display?: string;
		justifyContent?: string;
		children?: import("svelte").Snippet;
	}

	let {
		alignItems = "center",
		display = "flex",
		justifyContent = "center",
		children
	}: Props = $props();
</script>

<SomeDiv
	--button-align-items={alignItems}
	--button-display={display}
	--button-justify-content={justifyContent}
>
	{@render children?.()}
</SomeDiv>
