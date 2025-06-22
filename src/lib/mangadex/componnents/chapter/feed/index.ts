import type { Language, UserRole } from "@mangadex/gql/graphql";
import type { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
import type { Readable } from "svelte/store";

export type Group = {
	id: string;
	name: string;
};
export type Uploader = {
	id: string;
	roles: UserRole[];
	name: string;
};
export type Chapter = {
	chapterId: string;
	title: string | undefined;
	lang: Language;
	groups: Group[];
	uploader: Uploader;
	upload_date: Date;
	haveBeenRead: boolean;
	download_state: Readable<ChapterDownloadState>;
	comments: number;
	threadUrl?: string
};
