export type TopMangaStatsInner = {
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
	6: number;
	7: number;
	8: number;
	9: number;
	10: number;
};

export type TopMangaCommentsInfo = {
	value: number;
	threadId: string;
};

export type TopMangaStatistics = {
	average: number;
	inner: TopMangaStatsInner;
	follows: number;
	comments: TopMangaCommentsInfo;
};
