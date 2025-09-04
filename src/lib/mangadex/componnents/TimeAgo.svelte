<script lang="ts">
	import { sysLocaleStore } from "@special-eureka/core/commands/sys_locale";
	import { makeAsUTCDate } from "@mangadex/utils";
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
		asDateUTC?: boolean;
	}

	let { date, asDateUTC = true }: Props = $props();
	let to_use_date = $derived(asDateUTC ? makeAsUTCDate(date) : date);
</script>

<timeago datetime={to_use_date.toJSON()} bind:this={timeago}></timeago>

<style>
	timeago {
		width: max-content;
		display: block;
	}
</style>
