<script lang="ts">
	import { Tabs, createStyles } from "@svelteuidev/core";
	export let icon: HTMLOrSVGElement | undefined = undefined;
	export let label: string;
	const useStyles = createStyles(() => {
		return {
			root: {
				border: "0.5rem solid var(--contrast-l1)",
				minHeight: "3em",
				minWidth: "3em",
				filter: "brightness(75%)",
				fontFamily: "var(--fonts)",
				backgroundColor: "var(--contrast-l1)",
				color: "var(--text-color)",
				fontWeight: "700",
				fontSize: "16px",
				"&.active": {
					filter: "brightness(100%)",
					border: "0.5rem solid color-mix(in srgb, var(--contrast-l1) 65%, var(--main-background))"
				}
			}
		};
	});
	$: ({ classes } = useStyles());
</script>

<Tabs.Tab {icon} {label} class={classes.root}>
	<slot />
</Tabs.Tab>
