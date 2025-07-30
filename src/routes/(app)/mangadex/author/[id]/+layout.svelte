<script lang="ts">
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import type { LayoutData } from "./$types";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { writeText } from "@tauri-apps/plugin-clipboard-manager";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { openUrl as shellOpen } from "@tauri-apps/plugin-opener";
	import { ExternalLinkIcon } from "svelte-feather-icons";
	import AuthorLinkButtons from "./AuthorLinkButtons.svelte";

	interface Props {
		data: LayoutData;
		children?: import("svelte").Snippet;
	}

	let { data, children }: Props = $props();
	let description = $derived(get_value_from_title_and_random_if_undefined(data.biography, "en"));
</script>

<UsersPageBase title={data.name} {description}>
	{#snippet _left()}
		<div class="buttons">
			<ButtonAccent
				isBase
				onclick={() => {
					shellOpen(`https://mangadex.org/author/${data.id}`);
				}}
			>
				<p><ExternalLinkIcon /> Open in browser</p>
			</ButtonAccent>
			<AuthorLinkButtons links={data.links} />
		</div>
	{/snippet}
	{#snippet topRight()}
		<div>
			<p>
				Author ID: <span
					onkeydown={() => {}}
					role="button"
					tabindex={0}
					onclick={() => {
						writeText(data.id);
					}}
					class="copiable">{data.id}</span
				>
			</p>
			<section class="uploads">
				<p>
					{data.titles}
					<span>
						work{#if data.titles > 1}s{/if}
					</span>
				</p>
			</section>
		</div>
	{/snippet}

	{#snippet _right()}
		<div>
			<section class="content">
				{@render children?.()}
			</section>
		</div>
	{/snippet}
</UsersPageBase>

<style lang="scss">
	.buttons {
		display: grid;
		gap: 10px;
		margin: 10px;
		p {
			display: flex;
			gap: 8px;
			margin: 0px;
			font-weight: 700;
			font-size: 1.125em;
			align-items: center;
			justify-content: center;
		}
	}
	.copiable:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.content {
		margin-top: 8px;
	}
</style>
