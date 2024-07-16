<script lang="ts">
	import SomeDiv from "../SomeDiv.svelte";

	export let alignItems = "center";
	export let display = "flex";
	export let justifyContent = "center";
</script>

<SomeDiv
	--button-align-items={alignItems}
	--button-display={display}
	--button-justify-content={justifyContent}
>
	<slot />
</SomeDiv>
