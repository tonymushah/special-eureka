<script lang="ts">
	import { CustomListVisibility } from "@mangadex/gql/graphql";
	import type { PageData } from "./$types";

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let isPrivate = $derived(data.attributes.visibility == CustomListVisibility.Private);
</script>
