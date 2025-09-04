<script lang="ts">
	import "./selecto.css";
	import contextMenu, {
		ContextMenuItemProvider
	} from "@special-eureka/core/commands/contextMenu";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import SelectionArea from "@viselect/vanilla";
	let content: HTMLElement | undefined = undefined;
	$effect(() => {
		if (content) {
			const selecto = new SelectionArea({
				selectables: ["p"],
				boundaries: [content],
				selectionAreaClass: "grid-test-selection"
			})
				.on("start", (ev) => {
					if (!ev.event?.ctrlKey && !ev.event?.metaKey) {
						ev.store.stored.forEach((d) => d.removeAttribute("data-selected"));
						ev.selection.clearSelection();
					}
				})
				.on("move", (ev) => {
					ev.store.changed.added.forEach((d) => d.setAttribute("data-selected", ""));
					ev.store.changed.removed.forEach((d) => d.removeAttribute("data-selected"));
				});

			return () => {
				selecto.destroy();
			};
		}
	});
</script>

<AppTitle title="Grid Test - Special Eureka" />

<main class="container">
	<header
		oncontextmenu={async (e) => {
			e.preventDefault();
			await contextMenu(
				[
					ContextMenuItemProvider.menuItem("Something"),
					ContextMenuItemProvider.menuItem("Other thing"),
					ContextMenuItemProvider.seperator(),
					ContextMenuItemProvider.subMenu({
						text: "Real Actions",
						items: [
							ContextMenuItemProvider.menuItem({
								text: "Console log",
								action() {
									console.log("sdasdasdsadsad");
								}
							})
						]
					})
				],
				e
			);
		}}
		role="heading"
		aria-level="1"
	>
		<h1>Header</h1>
	</header>
	<div class="content" bind:this={content}>
		<div class="inner">
			<section>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, alias doloremque?
					Eveniet est beatae debitis facilis aliquam dignissimos alias nihil, quae placeat
					quidem excepturi molestias natus quaerat inventore sunt dolorum?
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat sint doloribus
					dicta expedita! Iste animi architecto rem cupiditate odio perspiciatis odit
					voluptatum earum quasi quis quo expedita, ratione illum itaque!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos adipisci
					maiores odit ipsum, magni sit delectus blanditiis. Iste veniam sunt doloribus
					sint voluptatem reiciendis quo illo natus ab minima?
				</p>
			</section>
			<section>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, alias doloremque?
					Eveniet est beatae debitis facilis aliquam dignissimos alias nihil, quae placeat
					quidem excepturi molestias natus quaerat inventore sunt dolorum?
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat sint doloribus
					dicta expedita! Iste animi architecto rem cupiditate odio perspiciatis odit
					voluptatum earum quasi quis quo expedita, ratione illum itaque!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos adipisci
					maiores odit ipsum, magni sit delectus blanditiis. Iste veniam sunt doloribus
					sint voluptatem reiciendis quo illo natus ab minima?
				</p>
			</section>
			<section>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, alias doloremque?
					Eveniet est beatae debitis facilis aliquam dignissimos alias nihil, quae placeat
					quidem excepturi molestias natus quaerat inventore sunt dolorum?
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat sint doloribus
					dicta expedita! Iste animi architecto rem cupiditate odio perspiciatis odit
					voluptatum earum quasi quis quo expedita, ratione illum itaque!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos adipisci
					maiores odit ipsum, magni sit delectus blanditiis. Iste veniam sunt doloribus
					sint voluptatem reiciendis quo illo natus ab minima?
				</p>
			</section>
			<section>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, alias doloremque?
					Eveniet est beatae debitis facilis aliquam dignissimos alias nihil, quae placeat
					quidem excepturi molestias natus quaerat inventore sunt dolorum?
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat sint doloribus
					dicta expedita! Iste animi architecto rem cupiditate odio perspiciatis odit
					voluptatum earum quasi quis quo expedita, ratione illum itaque!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos adipisci
					maiores odit ipsum, magni sit delectus blanditiis. Iste veniam sunt doloribus
					sint voluptatem reiciendis quo illo natus ab minima?
				</p>
			</section>
			<section>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, alias doloremque?
					Eveniet est beatae debitis facilis aliquam dignissimos alias nihil, quae placeat
					quidem excepturi molestias natus quaerat inventore sunt dolorum?
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat sint doloribus
					dicta expedita! Iste animi architecto rem cupiditate odio perspiciatis odit
					voluptatum earum quasi quis quo expedita, ratione illum itaque!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos adipisci
					maiores odit ipsum, magni sit delectus blanditiis. Iste veniam sunt doloribus
					sint voluptatem reiciendis quo illo natus ab minima?
				</p>
			</section>
			<section>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, alias doloremque?
					Eveniet est beatae debitis facilis aliquam dignissimos alias nihil, quae placeat
					quidem excepturi molestias natus quaerat inventore sunt dolorum?
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat sint doloribus
					dicta expedita! Iste animi architecto rem cupiditate odio perspiciatis odit
					voluptatum earum quasi quis quo expedita, ratione illum itaque!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos adipisci
					maiores odit ipsum, magni sit delectus blanditiis. Iste veniam sunt doloribus
					sint voluptatem reiciendis quo illo natus ab minima?
				</p>
			</section>
			<section>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, alias doloremque?
					Eveniet est beatae debitis facilis aliquam dignissimos alias nihil, quae placeat
					quidem excepturi molestias natus quaerat inventore sunt dolorum?
				</p>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat sint doloribus
					dicta expedita! Iste animi architecto rem cupiditate odio perspiciatis odit
					voluptatum earum quasi quis quo expedita, ratione illum itaque!
				</p>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quos adipisci
					maiores odit ipsum, magni sit delectus blanditiis. Iste veniam sunt doloribus
					sint voluptatem reiciendis quo illo natus ab minima?
				</p>
			</section>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-areas:
			"header header header"
			"content content content"
			"content content content"
			"content content content"
			"content content content";
		height: 100cqh;
		header {
			grid-area: header;
			background-color: azure;
		}
		div.content {
			background-color: bisque;
			grid-area: content;
			overflow: scroll;

			height: -webkit-fill-available;
			div.inner {
				display: flex;
				flex-direction: column;
				height: 100%;
			}
		}
	}
	p:global([data-selected]) {
		text-decoration: wavy;
		font-style: italic;
	}
</style>
