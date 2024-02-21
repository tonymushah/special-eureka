<script>
	import NewWindowIcon from "../base/stories/NewWindowIcon.svelte";
	import PreviousIcon from "../base/stories/PreviousIcon.svelte";
	import { HomeIcon } from "svelte-feather-icons";
	import ContextMenu from "../ContextMenu.svelte";
</script>

<ContextMenu
	items={[
		{
			icon: PreviousIcon,
			label: "Previous"
		},
		{
			icon: NewWindowIcon,
			label: "New Window"
		},
		{
			icon: HomeIcon,
			label: "ToHome"
		}
	]}
	tabindex={0}
>
	<div class="test">With context Menu div</div>
</ContextMenu>

<style lang="scss">
	.test {
		width: 250px;
		height: 250px;
		display: flex;
		color: var(--text-color);
		align-items: center;
		justify-content: center;
	}
</style>
