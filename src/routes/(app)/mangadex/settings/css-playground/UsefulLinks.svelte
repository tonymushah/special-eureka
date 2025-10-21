<script lang="ts">
	import { route } from "$lib/ROUTES";
</script>

<h3>Useful links</h3>

<ul>
	<li>
		<a
			href={route("/mangadex/title/[id]", {
				id: "f9c33607-9180-4ba6-b85c-e4b5faee7192"
			})}>Official "Test" Manga</a
		>
	</li>
</ul>

<style lang="scss">
	a {
		color: var(--primary-l2);
	}
</style>
