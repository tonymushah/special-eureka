<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
				id: string;
			}
		) => any;
	}
	interface Props extends Events {
		name: string;
		id: string;
	}

	let { name, id, onclick }: Props = $props();
</script>

<ButtonBase
	with_hover
	with_active
	onclick={(e) => {
		onclick?.({
			...e,
			id
		});
	}}
	--button-color={"var(--accent-l3)"}
	--button-hover={"var(--accent-l3-hover)"}
	--button-active={"var(--accent-l3-active)"}
>
	{name}
</ButtonBase>
