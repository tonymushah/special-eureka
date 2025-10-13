import { exportChapterPage } from "@mangadex/gql-docs/chapter/page-export";
import type { DownloadMode } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { downloadDir } from "@tauri-apps/api/path";
import { save } from "@tauri-apps/plugin-dialog";

export const exportPageMutationLoader = () => createMutation(() => ({
	mutationKey: ["export", "chapter", "page"],
	async mutationFn({ id, mode, exportPath: path, page }: {
		id: string,
		mode?: DownloadMode,
		exportPath?: string,
		page: number
	}) {
		let exportPath: string;
		if (path) {
			exportPath = path
		} else {
			const path = await save({
				defaultPath: await downloadDir(),
				canCreateDirectories: true
			});
			if (path != null) {
				exportPath = path;
			} else {
				throw new Error("No path selected");
			}
		}
		const res = await client.mutation(exportChapterPage, {
			id,
			mode,
			page,
			exportPath
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	},
	networkMode: "always"
}), () => mangadexQueryClient);
