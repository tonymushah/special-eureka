import {
	downloadCoverInDirectoryGQLDoc,
	downloadCoversInDirectoryGQLDoc
} from "@mangadex/gql-docs/cover/dir-cover-down";
import type { CoverArtSaveOption } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";
import { downloadDir } from "@tauri-apps/api/path";
import { open } from "@tauri-apps/plugin-dialog";

export type SaveCoversParam = {
	ids: string[];
	exportDir?: string;
	option?: CoverArtSaveOption;
};

export function saveCoversInADirectory() {
	return createMutation(() => ({
		mutationKey: ["save", "covers", "in", "directory"],
		async mutationFn(param: SaveCoversParam) {
			let exportDir: string;
			if (param.exportDir) {
				exportDir = param.exportDir;
			} else {
				const res = await open({
					directory: true,
					multiple: false,
					canCreateDirectories: true,
					defaultPath: await downloadDir()
				});
				if (res) {
					exportDir = res;
				} else {
					throw new Error("Nothing... selected...");
				}
			}
			const res = await client.mutation(downloadCoversInDirectoryGQLDoc, {
				ids: param.ids,
				exportDir,
				options: param.option
			});
			if (res.error) {
				throw res.error;
			}
		}
	}));
}

export type SaveCoverParam = {
	id: string;
	exportDir?: string;
	option?: CoverArtSaveOption;
};

export function saveCoverInADirectory() {
	return createMutation(() => ({
		mutationKey: ["save", "cover", "in", "directory"],
		async mutationFn(param: SaveCoverParam) {
			let exportDir: string;
			if (param.exportDir) {
				exportDir = param.exportDir;
			} else {
				const res = await open({
					directory: true,
					multiple: false,
					canCreateDirectories: true,
					defaultPath: await downloadDir()
				});
				if (res) {
					exportDir = res;
				} else {
					throw new Error("Nothing... selected...");
				}
			}
			const res = await client.mutation(downloadCoverInDirectoryGQLDoc, {
				id: param.id,
				exportDir,
				options: param.option
			});
			if (res.error) {
				throw res.error;
			}
		}
	}));
}
