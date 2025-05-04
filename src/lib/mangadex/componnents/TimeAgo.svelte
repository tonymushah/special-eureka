<script lang="ts">
	import { sysLocaleStore } from "$lib/commands/sys_locale";
	import { cancel as timeCancel, render as timeRender } from "timeago.js";
	let timeago: HTMLTimeElement | undefined = $state();
	$effect(() => {
		if (timeago) {
			timeRender(timeago, $sysLocaleStore ?? undefined);
			return () => {
				if (timeago) {
					timeCancel(timeago);
				}
			};
		}
	});
	interface Props {
		date: Date;
	}

	let { date }: Props = $props();
</script>

<timeago datetime={date.toDateString()} bind:this={timeago}></timeago>
