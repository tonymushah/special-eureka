<script lang="ts">
	import Accordion from "../Accordion.svelte";

	interface Props {
		withBorder?: boolean;
		titleBorder?: boolean;
	}

	let { withBorder = $bindable(false), titleBorder = $bindable(false) }: Props = $props();
</script>

<Accordion title="Some Accordion" bind:withBorder bind:titleBorder>
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit aut nam dolorum. Provident
		dolore, doloremque laboriosam, magni unde sapiente eum eius veniam minus pariatur eveniet
		cum commodi odit tenetur ad.
	</p>
</Accordion>

<style lang="scss">
	p {
		margin: 0px;
	}
</style>
