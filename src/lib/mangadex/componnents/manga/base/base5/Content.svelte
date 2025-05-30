<script lang="ts">
	import Markdown from "@mangadex/componnents/markdown/Markdown.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { BookOpenIcon } from "svelte-feather-icons";

	interface Events {
		onreadClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
		onmoreInfoClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => any;
	}
	interface Props extends Events {
		title: string;
		description: string;
		isHover: boolean;
	}

	let { title, description, isHover, onmoreInfoClick, onreadClick }: Props = $props();
</script>

<div class="title has-transition" class:isHover>
	<h3>{title}</h3>
</div>
<div class="contents has-transition" class:isHover>
	<div class="description">
		<Markdown source={description} />
	</div>
	<div class="button-group">
		<PrimaryButton
			onclick={(e) => {
				onreadClick?.(e);
			}}
		>
			<div class="read-btn-content">
				<span class="book-open-icon">
					<BookOpenIcon size="18" />
				</span>
				<span> Read </span>
			</div>
		</PrimaryButton>
		<ButtonAccent
			onclick={(e) => {
				onmoreInfoClick?.(e);
			}}
		>
			More Info
		</ButtonAccent>
	</div>
</div>

<style lang="scss">
	:root {
		--transition-duration: 500ms;
		--transition-timing-function: ease-in-out;
		--width: 16em;
		--height: 23em;
		--height-c: 24em;
	}
	div.has-transition {
		transition:
			opacity var(--transition-duration) var(--transition-timing-function),
			transform var(--transition-duration) var(--transition-timing-function);
		width: var(--width);
		height: var(--height-c);
		display: flex;
		position: relative;
	}
	div.title {
		top: -24em;
		align-items: end;
		justify-content: center;
		opacity: 1;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--accent) 100%);
		border-radius: 0.25rem;
		transform: translateY(0em);
	}
	div.title > h3 {
		margin: 1em;
		font-weight: 700;
		-webkit-box-orient: vertical;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		overflow: hidden;
		text-align: center;
	}
	div.title.isHover {
		opacity: 0;
		transform: translateY(var(--height-c));
	}
	div.contents {
		top: -48em;
		opacity: 0;
		align-items: center;
		transform: translateY(var(--height-c));
		flex-direction: column;
		justify-content: center;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--accent) 50%, white 0%) 0%,
			color-mix(in srgb, var(--main-background) 70%, white 0%) 50%
		);
		gap: 5px;
	}
	div.contents > div.description {
		height: 15em;
		overflow-y: scroll;
		margin: 0px;
		padding: 10px;
	}
	div.contents.isHover {
		opacity: 1;
		transform: translateY(0em);
	}
	div.read-btn-content {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}
	div.contents > div.button-group {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
	.book-open-icon {
		width: 18px;
		height: 18px;
	}
</style>
