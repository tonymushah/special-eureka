<script lang="ts">
	import is_tag_gore from "@mangadex/utils/tags/is_tag_gore";
	import is_tag_sexual_violence from "@mangadex/utils/tags/is_tag_sexual_violence";
	import { onMount } from "svelte";
	import TagComponnent from "./TagComponnent.svelte";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import is_tag_danger from "@mangadex/utils/tags/is_tag_danger";
	let to_show: Tag[] = $state([]);
	let more = 0;
	import { createEventDispatcher } from "svelte";
	interface Props {
		limit?: number;
		tags: Tag[];
	}

	let { limit = 0, tags }: Props = $props();

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
		};
	}>();
	onMount(() => {
		const temp: Tag[] = [];
		const gore_i = tags.findIndex((t) => is_tag_gore(t.id));
		const sexual_violence_i = tags.findLastIndex((t) => is_tag_sexual_violence(t.id));
		let gore = gore_i != -1 ? tags[gore_i] : undefined;
		let sexual_violence = sexual_violence_i != -1 ? tags[sexual_violence_i] : undefined;
		if (sexual_violence) {
			temp.push(sexual_violence);
		}
		if (gore) {
			temp.push(gore);
		}
		tags.forEach((v) => {
			if (!is_tag_danger(v.id)) {
				temp.push(v);
			}
		});
		if (limit > 0 && limit < temp.length) {
			let _t = temp.splice(limit);
			more = temp.length - _t.length;
			to_show = _t;
		} else {
			to_show = temp;
		}
	});
</script>

{#if to_show}
	{#each to_show as { id, name }}
		<TagComponnent {id} {name} on:click />
	{/each}
{/if}
