<script lang="ts">
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import haikeiRed from "@special-eureka/dashboard/haikei/layered-waves-haikei-red.svg";
	import haikeiBlue from "@special-eureka/dashboard/haikei/layered-waves-haikei-blue.svg";
	import haikeiYellow from "@special-eureka/dashboard/haikei/layered-waves-haikei-violet.svg";
	import Sites from "./Sites.svelte";
	import DevNotes from "./DevNotes.svelte";
	import Updates from "./Updates.svelte";
</script>

<AppTitle title="Welcome to Special Eureka" />

<section class="sites">
	<div style:background-image={`url("${haikeiRed}")`} class="haikei">
		<Sites />
	</div>
</section>

<section class="dev-notes">
	<div style:background-image={`url("${haikeiBlue}")`} class="haikei">
		<DevNotes />
	</div>
</section>

<section class="updates">
	<div style:background-image={`url("${haikeiYellow}")`} class="haikei">
		<Updates />
	</div>
</section>

<style lang="scss">
	.sites {
		background: linear-gradient(
			90deg,
			rgba(247, 141, 167, 1) 0%,
			rgba(193, 176, 211, 1) 50%,
			rgba(142, 209, 252, 1) 100%
		);
	}
	.haikei {
		width: 100%;
		min-height: 25em;
		background-position: bottom;
		background-repeat: no-repeat;
		background-size: cover;
	}
	section {
		width: 100%;
		min-height: 25em;
	}
	.dev-notes {
		background-color: #bb004d;
		color: #ffe4e4;
	}
	.updates {
		background-color: #004cbb;
		color: #ffe4e4;
	}
</style>
