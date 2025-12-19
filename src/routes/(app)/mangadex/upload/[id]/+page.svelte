<script lang="ts">
	import type { PageProps } from "./$types";

	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
	import SessionPage from "./SessionPage.svelte";

	let { params }: PageProps = $props();
</script>

<AppTitle title={`Upload Session ${params.id}`} />

<SessionPage sessionId={params.id} />
