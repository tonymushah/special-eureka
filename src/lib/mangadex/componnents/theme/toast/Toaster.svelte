<script lang="ts" module>
	export type ToastData = {
		title: string;
		description: string;
		color: string;
	};

	const {
		elements: { content, title, description, close },
		helpers,
		states: { toasts },
		actions: { portal }
	} = createToaster<ToastData>();

	export const addToast = helpers.addToast;
</script>

<script lang="ts">
	import { createToaster, melt } from "@melt-ui/svelte";
</script>

<div use:portal>
	{#each $toasts as { id, data } (id)}
		<div use:melt={$content(id)}>
			<div>
				<div>
					<h3 use:melt={$title(id)}>
						{data.title}
						<span style:color={data.color}></span>
					</h3>
					<div use:melt={$description(id)}>
						{data.description}
					</div>
				</div>
				<button use:melt={$close(id)} aria-label="close notification"> X </button>
			</div>
		</div>
	{/each}
</div>
