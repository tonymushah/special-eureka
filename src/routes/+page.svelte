<script>
	import { route } from "$lib/ROUTES";
</script>

<div class="top">
	<h1>Welcome to Special Eureka</h1>
	<div class="alert">
		<h2>If you see this page, means that you're in a prerealease version</h2>
		<p>A lot of thing can be improved, so please be patient and wait for the stable realease</p>
	</div>
	<div class="links">
		<p><a href={route("/mangadex")}>Mangadex Home</a></p>
		<p><a href={route("/mangadex-graphiql")}>Mangadex GraphiQL</a></p>
	</div>
</div>

<style lang="scss">
	div.top {
		margin: 8px;
		display: flex;
		align-content: center;
		justify-content: center;
		flex-direction: column;
		flex-wrap: wrap;
		width: 100vw;
		height: 100vh;
		text-align: center;
		.alert {
			display: flex;
			background-color: #ffb9b9;
			flex-direction: column;
			border-radius: 0.25em;
			padding: 5px;
			h2 {
				margin: 5px 0px;
			}
		}
	}
</style>
