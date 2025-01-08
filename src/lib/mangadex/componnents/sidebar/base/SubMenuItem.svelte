<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import MenuBase from "./MenuBase.svelte";
	import MenuIcons from "./MenuIcons.svelte";
	import MenuLabel from "./MenuLabel.svelte";
	import MenuLink from "./MenuLink.svelte";
	export let label: string;
	export let href: string | undefined = undefined;
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
		};
	}>();
</script>

<MenuLink {href} on:click>
	<MenuBase>
		<MenuIcons>
			<slot name="icon" slot="icon" />
			<slot name="suffix-icon" slot="suffix-icon" />
			<MenuLabel {label} />
		</MenuIcons>
	</MenuBase>
</MenuLink>
