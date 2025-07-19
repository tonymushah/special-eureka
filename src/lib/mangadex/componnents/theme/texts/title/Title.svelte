<script lang="ts">
	interface Props {
		type?: 1 | 2 | 3 | 4 | 5 | 6;
		children?: import("svelte").Snippet;
		onclick?: () => void;
	}

	let { type = 2, children, onclick }: Props = $props();
	let hasOnClickEvent = $derived(onclick != undefined && typeof onclick == "function");
</script>

{#if type == 1}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<h1 class="title" {onclick} tabindex={hasOnClickEvent ? 0 : undefined} class:hasOnClickEvent>
		{@render children?.()}
	</h1>
{:else if type == 2}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<h2 class="title" {onclick} tabindex={hasOnClickEvent ? 0 : undefined} class:hasOnClickEvent>
		{@render children?.()}
	</h2>
{:else if type == 3}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<h3 class="title" {onclick} tabindex={hasOnClickEvent ? 0 : undefined} class:hasOnClickEvent>
		{@render children?.()}
	</h3>
{:else if type == 4}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<h4 class="title" {onclick} tabindex={hasOnClickEvent ? 0 : undefined} class:hasOnClickEvent>
		{@render children?.()}
	</h4>
{:else if type == 5}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<h5 class="title" {onclick} tabindex={hasOnClickEvent ? 0 : undefined} class:hasOnClickEvent>
		{@render children?.()}
	</h5>
{:else if type == 6}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<h6 class="title" {onclick} tabindex={hasOnClickEvent ? 0 : undefined} class:hasOnClickEvent>
		{@render children?.()}
	</h6>
{/if}

<style lang="scss">
	.title {
		color: var(--text-color);
		font-family: var(--fonts);
		margin: var(--title-margin);
	}
	.title.hasOnClickEvent:hover {
		text-decoration: underline;
	}
	.title.hasOnClickEvent:active {
		color: var(--primary-l2);
	}
	.title.hasOnClickEvent:focus {
		background-color: var(--accent-l4);
		border-radius: 0.5em;
	}
	.title.hasOnClickEvent:focus:hover {
		background-color: var(--accent-l4-hover);
	}
	.title.hasOnClickEvent:focus:active {
		background-color: var(--accent-l4-active);
	}
</style>
