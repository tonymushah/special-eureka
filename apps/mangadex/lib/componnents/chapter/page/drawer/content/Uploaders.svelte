<script lang="ts">
	import GroupsUploaders from "./uploaders/GroupsUploaders.svelte";
	import Uploader from "./uploaders/Uploader.svelte";
</script>

<section>
	<p>Uploaded by</p>
	<GroupsUploaders />
	<Uploader />
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 5px;
		p {
			margin: 0;
		}
	}
</style>
