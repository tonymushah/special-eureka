<script lang="ts">
	import Accordion from "../Accordion.svelte";

	export let withBorder = false;
</script>

<Accordion title="Some Accordion" bind:withBorder>
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
