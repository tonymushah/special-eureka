<script lang="ts">
	import { route } from "$lib/ROUTES";
	import type { UserRole } from "@mangadex/gql/graphql";
	import Link from "../theme/links/Link.svelte";
	import UserRolesComp from "./UserRolesComp.svelte";

	interface Props {
		id: string;
		roles?: UserRole[];
		name: string;
	}
	let { id, roles, name }: Props = $props();
</script>

<Link
	href={route("/mangadex/user/[id]", {
		id
	})}
	variant="base"
	ext_href={`https://mangadex.org/user/${id}`}
>
	<UserRolesComp {roles}>
		{name}
	</UserRolesComp>
</Link>
