<main class="container">
	<header>
		<h1>Header</h1>
	</header>
	<div class="content">
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
</style>
