<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import UserLink from "@mangadex/componnents/user/UserLink.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import { page } from "$app/stores";
	import { derived as storeDerived } from "svelte/store";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { children, data }: Props = $props();
	let isPrivate = $derived(data.attributes.visibility == CustomListVisibility.Private);
	let user = $derived(data.relationships.user);
	const path = storeDerived(page, ($p) => {
		let pathname = $p.url.pathname;
		if (pathname.endsWith("/")) {
			return pathname.substring(0, pathname.length - 1);
		} else {
			return pathname;
		}
	});
</script>

<div class="layout">
	<div class="top-layout">
		<h1>{data.attributes.name}</h1>
		<p>
			Visibility: {data.attributes.visibility == CustomListVisibility.Public
				? "Public"
				: "Private"}
		</p>
		<p>
			Created by <UserLink
				name={user.attributes.username}
				roles={user.attributes.roles}
				id={user.id}
			/>
		</p>
	</div>
	<nav class="custom-list-nav">
		<button
			class:active={$path ==
				route("/mangadex/list/[id]", {
					id: isPrivate ? `private:${data.id}` : data.id
				})}
			onclick={() => {
				goto(
					route("/mangadex/list/[id]", {
						id: isPrivate ? `private:${data.id}` : data.id
					})
				);
			}}
		>
			Chapters
		</button>
		<button
			class:active={route("/mangadex/list/[id]/feed", {
				id: isPrivate ? `private:${data.id}` : data.id
			})}
			onclick={() => {
				goto(
					route("/mangadex/list/[id]/feed", {
						id: isPrivate ? `private:${data.id}` : data.id
					})
				);
			}}
		>
			Feed
		</button>
	</nav>
	<MidToneLine />
	{@render children?.()}
</div>

<style lang="scss">
	.custom-list-nav {
		background-color: var(--accent);
		display: flex;
		gap: 10px;
		padding: 5px 10px;
		width: fit-content;

		button {
			transition: background-color 300ms ease-in-out;
			color: var(--text-color);
			font-family: var(--fonts);
			background-color: var(--accent-l1);
			border: none;
			font-size: 16px;
			padding: 5px 10px;
		}
		button:hover {
			background-color: var(--accent-l1-hover);
		}
		button:active {
			background-color: var(--accent-l1-active);
		}
		button.active {
			font-weight: 800;
			background-color: var(--accent-l3);
		}
		button.active:hover {
			background-color: var(--accent-l3-hover);
		}
		button.active:active {
			background-color: var(--accent-l3-active);
		}
	}
	.layout {
		margin: 0px 10px;
	}
</style>
