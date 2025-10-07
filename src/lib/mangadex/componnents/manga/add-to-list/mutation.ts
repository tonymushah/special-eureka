import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import type { Client } from "@urql/svelte";
import { mutation } from "./query";
import { ActionMode } from ".";

export const mutationQueryMutation = () => createMutation(() => ({
	mutationKey: ["title", "add-to-list"],
	async mutationFn({
		title,
		selectedListMap,
		client
	}: {
		selectedListMap: Map<string, ActionMode>,
		title: string,
		client: Client
	}) {
		const addTo = Array.from(
			selectedListMap
				.entries()
				.filter(([_, mode]) => mode == ActionMode.Add)
				.map(([id, _]) => id)
		);
		const removeFrom = Array.from(
			selectedListMap
				.entries()
				.filter(([_, mode]) => mode == ActionMode.Remove)
				.map(([id, _]) => id)
		);
		const res = await client
			.mutation(mutation, {
				addTo,
				removeFrom,
				manga_id: title
			})
			.toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}), () => mangadexQueryClient);