import { saveCoversInArchiveGQLDoc } from "@mangadex/gql-docs/cover/archive-cover-down";
import type { CoverArtSaveOption } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";
import { downloadDir } from "@tauri-apps/api/path";
import { save } from "@tauri-apps/plugin-dialog";

export type SaveCoversToArchiveParam = {
	ids: string[];
	archiveFile?: string;
	option?: CoverArtSaveOption;
};

export function saveCoversInAArchive() {
	return createMutation(() => ({
		mutationKey: ["save", "covers", "in", "archive"],
		async mutationFn(param: SaveCoversToArchiveParam) {
			let archive: string;
			if (param.archiveFile) {
				archive = param.archiveFile;
			} else {
				const res = await save({
					title: "Save covers as archives",
					defaultPath: await downloadDir(),
					filters: [
						{
							name: "ZIP Archive",
							extensions: ["zip"]
						},
						{
							name: "TAR.GZ Archive",
							extensions: ["tar.gz"]
						},
						{
							name: "TAR.ZSTD Archive",
							extensions: ["tar.zstd", "tar.zst"]
						},
						{
							name: "TAR.ZLIB Archive",
							extensions: ["tar.zlib"]
						},
						{
							name: "TAR.BZ2 archive",
							extensions: ["tar.bz2"]
						}
					]
				});
				if (res) {
					archive = res;
				} else {
					throw new Error("Nothing... selected...");
				}
			}
			const res = await client.mutation(saveCoversInArchiveGQLDoc, {
				ids: param.ids,
				archivePath: archive,
				options: param.option
			});
			if (res.error) {
				throw res.error;
			}
		}
	}));
}
