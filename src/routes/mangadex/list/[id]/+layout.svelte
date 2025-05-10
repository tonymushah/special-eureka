<script lang="ts">
	import type { Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import UserLink from "@mangadex/componnents/user/UserLink.svelte";

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { children, data }: Props = $props();
	let user = $derived(data.relationships.user);
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
	{@render children?.()}
</div>
