<script lang="ts">
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { Portal } from "@ark-ui/svelte/portal";
	import { Select } from "@ark-ui/svelte/select";
	import { ChevronDownIcon, FunnelX } from "@lucide/svelte";
	import cssMod from "./select.module.scss";
	interface Props {
		value?: string[];
		collection: Select.ListCollection<string>;
	}
	let { collection, value = $bindable() }: Props = $props();
</script>

<!--bind:value={
		() => {
			const inner = $sort;
			if (inner) {
				const val = sortDataReversed.get(inner);
				if (val) {
					return [val];
				}
			}
		},
		(v) => {
			console.debug(v);
			if (v) {
				if (v.length >= 1) {
					const inner = sortDataMap.get(v[0]);

					if (inner) {
						sort.set(inner);
					}
				}
			}
		}
	} -->
<Select.Root {collection} bind:value>
	<Select.Control class={cssMod.control}>
		<Select.Trigger class={cssMod.trigger}>
			<Select.ValueText placeholder="..." />
			<Select.Indicator>
				<ChevronDownIcon />
			</Select.Indicator>
		</Select.Trigger>
		<Select.ClearTrigger>
			<FunnelX />
		</Select.ClearTrigger>
	</Select.Control>
	<Portal>
		<MangaDexVarThemeProvider>
			<Select.Positioner>
				<Select.Content class={cssMod.menu}>
					<Select.ItemGroup>
						<Select.ItemGroupLabel>Sort by</Select.ItemGroupLabel>
						{#each collection.items as item}
							<Select.Item {item}>
								<Select.ItemText>{item}</Select.ItemText>
								<Select.ItemIndicator>✓</Select.ItemIndicator>
							</Select.Item>
						{/each}
					</Select.ItemGroup>
				</Select.Content>
			</Select.Positioner>
		</MangaDexVarThemeProvider>
	</Portal>
	<Select.HiddenSelect />
</Select.Root>
