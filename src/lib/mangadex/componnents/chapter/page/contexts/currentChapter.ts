import type { UserRole } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export class CurrentChapterTitle {
	title: string;
	id: string;
	isLongStrip: boolean = false;
	constructor({ title, id, isLongStrip }: { title: string; id: string; isLongStrip?: boolean }) {
		this.title = title;
		this.id = id;
		if (isLongStrip != undefined) {
			this.isLongStrip = isLongStrip;
		}
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
	thread?: CurrentChapterThread;
	canChangeGroups: boolean = false;
	constructor({
		id,
		uploader,
		title,
		chapterNumber,
		isOneshot,
		series,
		groups,
		volume,
		thread,
		canChangeGroups
	}: {
		id: string;
		uploader: CurrentChapterUploader;
		title?: string;
		chapterNumber?: string;
		isOneshot?: boolean;
		series?: CurrentChapterTitle;
		groups?: CurrentChapterGroup[];
		volume?: string;
		thread?: CurrentChapterThread;
		canChangeGroups?: boolean;
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
		if (thread != undefined) {
			this.thread = thread;
		}
		if (canChangeGroups != undefined) {
			this.canChangeGroups = canChangeGroups;
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
