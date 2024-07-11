import type { UserRole } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";
import type { Invalidator, Readable, Subscriber, Unsubscriber } from "svelte/store";

export class CurrentChapterTitle {
	title: string;
	id: string;
	constructor({ title, id }: { title: string; id: string }) {
		this.title = title;
		this.id = id;
	}
}

export class CurrentChapterUploader {
	name: string;
	id: string;
	roles: UserRole[] = [];
	constructor({ name, id, roles }: { name: string; id: string; roles?: UserRole[] }) {
		this.name = name;
		this.id = id;
		if (roles != undefined) {
			this.roles = roles;
		}
	}
}

export class CurrentChapterGroup {
	name: string;
	id: string;
	constructor({ name, id }: { name: string; id: string }) {
		this.name = name;
		this.id = id;
	}
}

export class CurrentChapterThread {
	threadUrl: string;
	comments: number = 0;
	constructor({ threadUrl, comments }: { threadUrl: string; comments?: number }) {
		this.threadUrl = threadUrl;
		if (comments != undefined) {
			this.comments = comments;
		}
	}
	public get isEmpty(): boolean {
		return this.comments == 0;
	}
}

export class CurrentChapterData {
	id: string;
	title?: string;
	chapterNumber?: string;
	volume?: string;
	isOneshot: boolean = false;
	series?: CurrentChapterTitle;
	uploader: CurrentChapterUploader;
	groups: CurrentChapterGroup[] = [];
	constructor({
		id,
		uploader,
		title,
		chapterNumber,
		isOneshot,
		series,
		groups,
		volume
	}: {
		id: string;
		uploader: CurrentChapterUploader;
		title?: string;
		chapterNumber?: string;
		isOneshot?: boolean;
		series?: CurrentChapterTitle;
		groups?: CurrentChapterGroup[];
		volume?: string;
	}) {
		this.id = id;
		this.uploader = uploader;
		if (title != undefined) {
			this.title = title;
		}
		if (chapterNumber != undefined) {
			this.chapterNumber = chapterNumber;
		}
		if (isOneshot != undefined) {
			this.isOneshot = isOneshot;
		}
		if (series != undefined) {
			this.series = series;
		}
		if (groups != undefined) {
			this.groups = groups;
		}
		if (volume != undefined) {
			this.volume = volume;
		}
	}
}

export const {
	getReadonly: getCurrentChapterData,
	get: getCurrentChapterDataWritable,
	init: initCurrentChapterData
} = generateContextStoresMethods<CurrentChapterData>(
	"CURRENT_CHAPTER_DATA",
	"The current chapter data is undefined"
);
