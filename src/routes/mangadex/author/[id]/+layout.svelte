<script lang="ts">
	import UsersPageBase from "@mangadex/componnents/users/page/UsersPageBase.svelte";
	import type { LayoutData } from "./$types";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { writeText } from "@tauri-apps/api/clipboard";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { open as shellOpen } from "@tauri-apps/api/shell";
	import { ExternalLinkIcon } from "svelte-feather-icons";
	import AuthorLinkButtons from "./AuthorLinkButtons.svelte";

	export let data: LayoutData;
	$: description = get_value_from_title_and_random_if_undefined(data.biography, "en");
</script>

<UsersPageBase title={data.name} {description}>
	<div slot="left" class="buttons">
		<ButtonAccent
			isBase
			on:click={() => {
				shellOpen(`https://mangadex.org/user/${data.id}`);
			}}
		>
			<p><ExternalLinkIcon /> Open in browser</p>
		</ButtonAccent>
		<AuthorLinkButtons links={data.links} />
	</div>
	<div slot="top-right">
		<p>
			Author ID: <span
				on:keydown={() => {}}
				role="button"
				tabindex={0}
				on:click={() => {
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
	<div slot="right">
		<section class="content">
			<slot />
		</section>
	</div>
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
