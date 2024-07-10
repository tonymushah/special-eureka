<script lang="ts">
	import ChapterDrawer from "../ChapterDrawer.svelte";
	let open = false;
	let fixed = true;
	let left = false;
</script>

<div class="container">
	<ChapterDrawer bind:open bind:fixed bind:left>
		<div class="top-drawer">
			<h3>Chapter Title</h3>
			<h3>Manga Title</h3>
		</div>
		<div class="body-drawer">
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi placeat quas sed,
				inventore aliquid expedita non ab voluptatem possimus tenetur quibusdam praesentium
				amet recusandae esse. Voluptate inventore ad numquam odio?
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus delectus
				quidem illum asperiores id tempore, magni perspiciatis iusto commodi odio ducimus ea
				inventore, soluta eius praesentium maiores vel animi nemo?
			</p>
		</div>
		<div class="content" class:left slot="content">
			<div class="buttons" class:left>
				<button
					on:click={() => {
						open = !open;
					}}
				>
					Open
				</button>
				<button
					on:click={() => {
						fixed = !fixed;
					}}
				>
					Fixed
				</button>
				<button
					on:click={() => {
						left = !left;
					}}
				>
					{#if left}
						Left
					{:else}
						Right
					{/if}
				</button>
			</div>

			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam dolor delectus saepe
				ex laboriosam nihil dignissimos, fuga, dolorum aliquid quod ullam aut natus officiis
				quis omnis similique molestiae suscipit corporis.
			</p>
		</div>
	</ChapterDrawer>
</div>

<style lang="scss">
	.container {
		height: 100vh;
	}
	.content {
		display: block;
	}
	.content.left {
		display: flex;
		align-items: end;
		flex-direction: column;
		margin-left: 10px;
	}
</style>
