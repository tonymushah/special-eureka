/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type AccentInput = {
	active: string;
	default: string;
	hover: string;
};

export type AccentsInput = {
	default: AccentInput;
	l1: AccentInput;
	l2: AccentInput;
	l3: AccentInput;
	l4: AccentInput;
	l5: AccentInput;
};

export type AuthorListParams = {
	authorIds?: Array<string>;
	includes?: Array<ReferenceExpansionResource>;
	limit?: number | null | undefined;
	name?: string | null | undefined;
	offset?: number | null | undefined;
	order?: AuthorSortOrder | null | undefined;
};

export type AuthorSortOrder = { name: OrderDirection };

export type BlacklistAuthorsArtistsListParam = {
	authorName?: string | null | undefined;
	insertedBefore?: string | null | undefined;
	insertedSince?: string | null | undefined;
	limit?: number | null | undefined;
	offset?: number | null | undefined;
	order?: SortDirection | null | undefined;
};

export type BlacklistLabelsListParam = {
	insertedBefore?: string | null | undefined;
	insertedSince?: string | null | undefined;
	labelName?: string | null | undefined;
	limit?: number | null | undefined;
	offset?: number | null | undefined;
	order?: SortDirection | null | undefined;
};

export type BlacklistScanlationGroupsListParam = {
	insertedBefore?: string | null | undefined;
	insertedSince?: string | null | undefined;
	limit?: number | null | undefined;
	offset?: number | null | undefined;
	order?: SortDirection | null | undefined;
	scanlationGroupsName?: string | null | undefined;
};

export type BlacklistUserListParam = {
	insertedBefore?: string | null | undefined;
	insertedSince?: string | null | undefined;
	limit?: number | null | undefined;
	offset?: number | null | undefined;
	order?: SortDirection | null | undefined;
	username?: string | null | undefined;
};

export type ButtonAccentInput = {
	alternate: string;
	default: string;
};

export enum ChapterFeedStyle {
	CoverFull = "COVER_FULL",
	CoverLess = "COVER_LESS"
}

export type ChapterSortOrder =
	| {
			chapter: OrderDirection;
			createdAt?: never;
			publishAt?: never;
			readableAt?: never;
			updatedAt?: never;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt: OrderDirection;
			publishAt?: never;
			readableAt?: never;
			updatedAt?: never;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt?: never;
			publishAt: OrderDirection;
			readableAt?: never;
			updatedAt?: never;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt?: never;
			publishAt?: never;
			readableAt: OrderDirection;
			updatedAt?: never;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt?: never;
			publishAt?: never;
			readableAt?: never;
			updatedAt: OrderDirection;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt?: never;
			publishAt?: never;
			readableAt?: never;
			updatedAt?: never;
			volume: OrderDirection;
	  };

export type ContentProfileEntryInput = {
	name: string;
	value: ContentProfileInput;
};

export type ContentProfileInput = {
	contentRating?: Array<ContentRating>;
	excludedGroups?: Array<string>;
	excludedOriginalLanguage?: Array<Language>;
	excludedTags?: Array<string>;
	excludedTagsMode?: TagSearchMode | null | undefined;
	excludedUploaders?: Array<string>;
	includedTags?: Array<string>;
	includedTagsMode?: TagSearchMode | null | undefined;
	originalLanguages?: Array<Language>;
	publicationDemographic?: Array<Demographic>;
	status?: Array<MangaStatus>;
	translatedLanguages?: Array<Language>;
};

export enum ContentProfileWarningMode {
	Always = "ALWAYS",
	/** Always unless the title is in the library */
	Autl = "AUTL",
	/** Always unless the title is in the library and not dropped */
	AutlNd = "AUTL_ND",
	Never = "NEVER"
}

export enum ContentRating {
	Erotica = "EROTICA",
	Pornographic = "PORNOGRAPHIC",
	Safe = "SAFE",
	Suggestive = "SUGGESTIVE"
}

export type ContrastInput = {
	l1: string;
};

export type CoverArtResizeOption =
	| { height: number; width?: never }
	| { height?: never; width: number };

export type CoverArtSaveOption = {
	format?: CoverImageFormat | null | undefined;
	resizePercentage?: CoverArtResizeOption | null | undefined;
};

export enum CoverDownloadingState {
	FetchingData = "FETCHING_DATA",
	FetchingImage = "FETCHING_IMAGE",
	Preloading = "PRELOADING"
}

export enum CoverImageFormat {
	Avif = "AVIF",
	Jpeg = "JPEG",
	Png = "PNG",
	Webp = "WEBP"
}

export type CreateBlacklistLabelParam = {
	description?: string | null | undefined;
	labelName: string;
};

export type CreateReportParam = {
	category: ReportCategory;
	/** Optional notes about why this is being reported. */
	details?: string | null | undefined;
	/**
	 * The ID from the category type.
	 *
	 * For example, if the category is "manga", this should be a manga UUID.
	 */
	objectId: string;
	/**
	 * The report reason ID for sub-categorization.
	 *
	 * For example, if a manga was being reported for being a troll entry, the specific reason ID should be used, obtained from the [list report reasons endpoint](crate::v5::report::list).
	 */
	reason: string;
};

export type CurrentLoggedLists = {
	limit?: number | null | undefined;
	offset?: number | null | undefined;
};

export type CustomListMangaFeedParams = {
	contentRating?: Array<ContentRating>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	createdAtSince?: string | null | undefined;
	/** Groups to exclude from the results. */
	excludedGroups?: Array<string>;
	excludedOriginalLanguage?: Array<Language>;
	/** Uploaders to exclude from the results. */
	excludedUploaders?: Array<string>;
	includeEmptyPages?: IncludeFuturePages | null | undefined;
	includeExternalUrl?: IncludeExternalUrl | null | undefined;
	includeFuturePublishAt?: IncludeFuturePublishAt | null | undefined;
	/**
	 * Flag to include future chapter updates in the results.
	 *
	 * Default: `IncludeFutureUpdates::Include` (1)
	 */
	includeFutureUpdates?: IncludeFutureUpdates | null | undefined;
	includeUnavailable?: IncludeUnvailable | null | undefined;
	includes?: Array<ReferenceExpansionResource>;
	limit?: number | null | undefined;
	listId: string;
	offset?: number | null | undefined;
	order?: MangaFeedSortOrder | null | undefined;
	originalLanguage?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	publishAtSince?: string | null | undefined;
	translatedLanguage?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	updatedAtSince?: string | null | undefined;
};

export enum CustomListVisibility {
	Private = "PRIVATE",
	Public = "PUBLIC"
}

export type DangerColorInput = {
	default: string;
	l1: string;
	l2: string;
};

export enum DatePeriod {
	AllTime = "ALL_TIME",
	Past_2Weeks = "PAST_2_WEEKS",
	Past_6Months = "PAST_6_MONTHS",
	ThisMonth = "THIS_MONTH",
	ThisWeek = "THIS_WEEK",
	ThisYear = "THIS_YEAR"
}

/** Target demographic for manga. */
export enum Demographic {
	Josei = "JOSEI",
	None = "NONE",
	Seinen = "SEINEN",
	Shoujo = "SHOUJO",
	Shounen = "SHOUNEN"
}

export enum Direction {
	Ltr = "LTR",
	Rtl = "RTL"
}

export enum DownloadMode {
	DataSaver = "DATA_SAVER",
	Normal = "NORMAL"
}

export enum DrawerMode {
	Pinned = "PINNED",
	Unpinned = "UNPINNED"
}

export type ExportCustomListsToCsvOptions = {
	exportPath: string;
	ids: Array<string>;
	includeForumUrl?: boolean | null | undefined;
	includeMdScore?: boolean | null | undefined;
	includePrivate?: boolean | null | undefined;
	includeReadChapters?: boolean | null | undefined;
	includeReadVolumes?: boolean | null | undefined;
	includeReadingStatus?: boolean | null | undefined;
	includeScores?: boolean | null | undefined;
};

export type ExportIdsLibraryToCsvOptions = {
	exportPath: string;
	ids: Array<string>;
	includeForumUrl?: boolean | null | undefined;
	includeMdScore?: boolean | null | undefined;
	includeReadChapters?: boolean | null | undefined;
	includeReadVolumes?: boolean | null | undefined;
	includeReadingStatus?: boolean | null | undefined;
	includeScores?: boolean | null | undefined;
};

export type ExportMdLibraryToCsvOptions = {
	excludeContentProfile?: boolean | null | undefined;
	exportPath: string;
	hasAvailableChapters?: boolean | null | undefined;
	includeForumUrl?: boolean | null | undefined;
	includeMdScore?: boolean | null | undefined;
	includeReadChapters?: boolean | null | undefined;
	includeReadVolumes?: boolean | null | undefined;
	includeScores?: boolean | null | undefined;
};

export enum ForumThreadType {
	Chapter = "CHAPTER",
	Group = "GROUP",
	Manga = "MANGA"
}

export type GroupSortOrder =
	| {
			createdAt: OrderDirection;
			followedCount?: never;
			latestUploadedChapter?: never;
			name?: never;
			relevance?: never;
			updatedAt?: never;
	  }
	| {
			createdAt?: never;
			followedCount: OrderDirection;
			latestUploadedChapter?: never;
			name?: never;
			relevance?: never;
			updatedAt?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter: OrderDirection;
			name?: never;
			relevance?: never;
			updatedAt?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			name: OrderDirection;
			relevance?: never;
			updatedAt?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			name?: never;
			relevance: OrderDirection;
			updatedAt?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			name?: never;
			relevance?: never;
			updatedAt: OrderDirection;
	  };

export enum ImageFit {
	Default = "DEFAULT",
	Heigth = "HEIGTH",
	Width = "WIDTH"
}

export enum IncludeExternalUrl {
	Exclude = "EXCLUDE",
	Include = "INCLUDE"
}

export enum IncludeFuturePages {
	Exclude = "EXCLUDE",
	Include = "INCLUDE"
}

export enum IncludeFuturePublishAt {
	Exclude = "EXCLUDE",
	Include = "INCLUDE"
}

export enum IncludeFutureUpdates {
	Exclude = "EXCLUDE",
	Include = "INCLUDE"
}

export enum IncludeUnvailable {
	Exclude = "EXCLUDE",
	Include = "INCLUDE"
}

export type IndicatorColorInput = {
	blue: string;
};

export enum InternUploadQueueState {
	Pending = "PENDING",
	Uploading = "UPLOADING"
}

export type InternUploadSessionCommitDataInput = {
	chapter?: string | null | undefined;
	externalUrl?: string | null | undefined;
	publishAt?: string | null | undefined;
	/** Required after the May 15th incident */
	termsAccepted?: boolean | null | undefined;
	title?: string | null | undefined;
	translatedLanguage: Language;
	volume?: string | null | undefined;
};

/** Languages supported by MangaDex. */
export enum Language {
	Afrikaans = "AFRIKAANS",
	Albanian = "ALBANIAN",
	Arabic = "ARABIC",
	Azerbaijani = "AZERBAIJANI",
	Basque = "BASQUE",
	Belarusian = "BELARUSIAN",
	Bengali = "BENGALI",
	Bulgarian = "BULGARIAN",
	Burmese = "BURMESE",
	Catalan = "CATALAN",
	ChineseRomanized = "CHINESE_ROMANIZED",
	ChineseSimplified = "CHINESE_SIMPLIFIED",
	ChineseTraditional = "CHINESE_TRADITIONAL",
	Chuvash = "CHUVASH",
	Croatian = "CROATIAN",
	Czech = "CZECH",
	Danish = "DANISH",
	Dutch = "DUTCH",
	English = "ENGLISH",
	Esperanto = "ESPERANTO",
	Estonian = "ESTONIAN",
	Filipino = "FILIPINO",
	Finnish = "FINNISH",
	French = "FRENCH",
	Georgian = "GEORGIAN",
	German = "GERMAN",
	Greek = "GREEK",
	Hebrew = "HEBREW",
	Hindi = "HINDI",
	Hungarian = "HUNGARIAN",
	Indonesian = "INDONESIAN",
	Irish = "IRISH",
	Italian = "ITALIAN",
	Japanese = "JAPANESE",
	JapaneseRomanized = "JAPANESE_ROMANIZED",
	Javanese = "JAVANESE",
	Jp = "JP",
	Kazakh = "KAZAKH",
	Korean = "KOREAN",
	KoreanRomanized = "KOREAN_ROMANIZED",
	Latin = "LATIN",
	Lithuanian = "LITHUANIAN",
	Malagasy = "MALAGASY",
	Malay = "MALAY",
	Mongolian = "MONGOLIAN",
	Nepali = "NEPALI",
	NiloSaharan = "NILO_SAHARAN",
	Norwegian = "NORWEGIAN",
	Persian = "PERSIAN",
	Polish = "POLISH",
	PortugueseBrazilian = "PORTUGUESE_BRAZILIAN",
	PortuguesePortugal = "PORTUGUESE_PORTUGAL",
	Romanian = "ROMANIAN",
	Romansh = "ROMANSH",
	Russian = "RUSSIAN",
	SerboCroatian = "SERBO_CROATIAN",
	Slovak = "SLOVAK",
	Slovenian = "SLOVENIAN",
	SpanishCastilian = "SPANISH_CASTILIAN",
	SpanishLatinAmerican = "SPANISH_LATIN_AMERICAN",
	Swedish = "SWEDISH",
	Tamil = "TAMIL",
	Telugu = "TELUGU",
	Thai = "THAI",
	Turkish = "TURKISH",
	Ukrainian = "UKRAINIAN",
	Unknown = "UNKNOWN",
	Urdu = "URDU",
	Uzbek = "UZBEK",
	Vietnamese = "VIETNAMESE"
}

export type ListReportParams = {
	category?: ReportCategory | null | undefined;
	limit?: number | null | undefined;
	objectId?: string | null | undefined;
	offset?: number | null | undefined;
	order?: ReportSortOrder | null | undefined;
	reasonId?: string | null | undefined;
	status?: ReportStatus | null | undefined;
};

export enum MaltitlePriority {
	High = "HIGH",
	Low = "LOW",
	Medium = "MEDIUM"
}

export type MangaDexThemeInput = {
	accents: AccentsInput;
	button: ButtonAccentInput;
	contrast: ContrastInput;
	danger: DangerColorInput;
	indication: IndicatorColorInput;
	mainBackground: string;
	midTone: string;
	primary: PrimaryColorInput;
	scheme?: ThemeScheme | null | undefined;
	scrollbar: ScrollbarColorInput;
	status: StatusColorInput;
	textColor: string;
};

export enum MangaDonwloadingState {
	FetchingData = "FETCHING_DATA",
	Preloading = "PRELOADING"
}

/** This is for a feature that allows you to download titles with some extras... */
export enum MangaDownloadExtras {
	/**
	 * Download with all chapters available
	 *
	 * NOTE: The current implement *only* download all chapters that match the current content profile.
	 */
	AllChapters = "ALL_CHAPTERS",
	/**
	 * Re-download all failed chapters
	 *
	 * Only the one matching the current content profile
	 */
	Failed = "FAILED",
	/**
	 * Download with all chapters that is marked as unread.
	 *
	 * NOTE: This will not work if the user is not logged in.
	 * Also this one also *only* download all *unread* chapters that match the current content profile.
	 */
	Unreads = "UNREADS",
	/**
	 * Download all undownloaded chapters
	 *
	 * NOTE: _Again_, this will *only* download undownloaded that match the current content profile.
	 */
	UnDownloadeds = "UN_DOWNLOADEDS",
	/**
	 * Re-download all un-read failed chapters
	 *
	 * Only the one matching the current content profile
	 */
	UnReadFailed = "UN_READ_FAILED",
	/**
	 * Download all unread undownloaded chapters.
	 *
	 * Only the one matching the current content profile
	 */
	UnReadUnDownloadeds = "UN_READ_UN_DOWNLOADEDS"
}

export type MangaFeedSortOrder =
	| {
			chapter: OrderDirection;
			createdAt?: never;
			publishAt?: never;
			readableAt?: never;
			updatedAt?: never;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt: OrderDirection;
			publishAt?: never;
			readableAt?: never;
			updatedAt?: never;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt?: never;
			publishAt: OrderDirection;
			readableAt?: never;
			updatedAt?: never;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt?: never;
			publishAt?: never;
			readableAt: OrderDirection;
			updatedAt?: never;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt?: never;
			publishAt?: never;
			readableAt?: never;
			updatedAt: OrderDirection;
			volume?: never;
	  }
	| {
			chapter?: never;
			createdAt?: never;
			publishAt?: never;
			readableAt?: never;
			updatedAt?: never;
			volume: OrderDirection;
	  };

export enum MangaInfosPositions {
	BeneathDescription = "BENEATH_DESCRIPTION",
	Left = "LEFT",
	Right = "RIGHT"
}

export type MangaListParams = {
	artists?: Array<string>;
	authorOrArtist?: string | null | undefined;
	authors?: Array<string>;
	/** A list of languages that the manga is translated into. */
	availableTranslatedLanguage?: Array<Language>;
	contentRating?: Array<ContentRating>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	createdAtSince?: string | null | undefined;
	/** A list of original languages to exclude. */
	excludedOriginalLanguage?: Array<Language>;
	excludedTags?: Array<string>;
	excludedTagsMode?: TagSearchMode | null | undefined;
	/** Scanlation group ID. */
	group?: string | null | undefined;
	hasAvailableChapters?: boolean | null | undefined;
	hasUnavailableChapters?: boolean | null | undefined;
	includedTags?: Array<string>;
	includedTagsMode?: TagSearchMode | null | undefined;
	limit?: number | null | undefined;
	mangaIds?: Array<string>;
	offset?: number | null | undefined;
	order?: MangaSortOrder | null | undefined;
	/** Languages the manga results are originally published in. */
	originalLanguage?: Array<Language>;
	publicationDemographic?: Array<Demographic>;
	status?: Array<MangaStatus>;
	title?: string | null | undefined;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	updatedAtSince?: string | null | undefined;
	year?: number | null | undefined;
};

export enum MangaListStyle {
	Cover = "COVER",
	Grid = "GRID",
	Rows = "ROWS"
}

export type MangaRandomParams = {
	contentRating?: Array<ContentRating>;
	excludedTags?: Array<string>;
	excludedTagsMode?: TagSearchMode | null | undefined;
	includedTags?: Array<string>;
	includedTagsMode?: TagSearchMode | null | undefined;
	includes?: Array<ReferenceExpansionResource>;
};

/**
 * Used in the `related` field of a Manga relationships.
 *
 * <https://api.mangadex.org/docs/static-data/#manga-related-enum>
 */
export enum MangaRelation {
	/** The original work this spin-off manga has been adapted from. */
	AdaptedFrom = "ADAPTED_FROM",
	/** An alternative take of the story in this manga. */
	AlternateStory = "ALTERNATE_STORY",
	/** A different version of this manga with no other specific distinction. */
	AlternateVersion = "ALTERNATE_VERSION",
	/** The original work this self-published derivative manga is based on. */
	BasedOn = "BASED_ON",
	/** A colored variant of this manga. */
	Colored = "COLORED",
	/** A self-published derivative work based on this manga. */
	Doujinshi = "DOUJINSHI",
	/** The original narrative this manga is based on. */
	MainStory = "MAIN_STORY",
	/** A monochrome variant of this manga. */
	Monochrome = "MONOCHROME",
	/** The previous entry in the same series. */
	Prequel = "PREQUEL",
	/** The original version of this manga before its official serialization. */
	Preserialization = "PRESERIALIZATION",
	/** A manga based on the same intellectual property as this manga. */
	SameFranchise = "SAME_FRANCHISE",
	/** The next entry in the same series. */
	Sequel = "SEQUEL",
	/** The official serialization of this manga. */
	Serialization = "SERIALIZATION",
	/** A manga taking place in the same fictional world as this manga. */
	SharedUniverse = "SHARED_UNIVERSE",
	/** A side work contemporaneous with the narrative of this manga. */
	SideStory = "SIDE_STORY",
	/** An official derivative work based on this manga. */
	SpinOff = "SPIN_OFF"
}

export type MangaSortOrder =
	| {
			createdAt: OrderDirection;
			followedCount?: never;
			latestUploadedChapter?: never;
			rating?: never;
			relevance?: never;
			title?: never;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount: OrderDirection;
			latestUploadedChapter?: never;
			rating?: never;
			relevance?: never;
			title?: never;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter: OrderDirection;
			rating?: never;
			relevance?: never;
			title?: never;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			rating: OrderDirection;
			relevance?: never;
			title?: never;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			rating?: never;
			relevance: OrderDirection;
			title?: never;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			rating?: never;
			relevance?: never;
			title: OrderDirection;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			rating?: never;
			relevance?: never;
			title?: never;
			updatedAt: OrderDirection;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			rating?: never;
			relevance?: never;
			title?: never;
			updatedAt?: never;
			year: OrderDirection;
	  };

/**
 * Manga state for approval.
 *
 * The purpose of these are to discourage troll entries by requiring staff approval.
 */
export enum MangaState {
	Draft = "DRAFT",
	Published = "PUBLISHED",
	Rejected = "REJECTED",
	Submitted = "SUBMITTED"
}

export enum MangaStatus {
	/** Manga has been cancelled. */
	Cancelled = "CANCELLED",
	/** Manga is completed. */
	Completed = "COMPLETED",
	/** Manga is paused from publishing new chapters. */
	Hiatus = "HIATUS",
	/** Manga is still going on. */
	Ongoing = "ONGOING"
}

export type MdcustomListsToMyAnimeListExportOption = {
	exportPath: string;
	ids: Array<string>;
	includePrivate?: boolean | null | undefined;
	includeReadChapters?: boolean | null | undefined;
	includeReadVolumes?: boolean | null | undefined;
	includeScore?: boolean | null | undefined;
	priorities?: ReadingStatusPriorities | null | undefined;
	userId: string;
	userName: string;
};

export type MdidsToMyAnimeListExportOption = {
	exportPath: string;
	ids: Array<string>;
	includeReadChapters?: boolean | null | undefined;
	includeReadVolumes?: boolean | null | undefined;
	includeScore?: boolean | null | undefined;
	priorities?: ReadingStatusPriorities | null | undefined;
	userId: string;
	userName: string;
};

export type MdlibraryToMyAnimeListExportOption = {
	excludeContentProfile?: boolean | null | undefined;
	exportPath: string;
	hasAvailableChapters?: boolean | null | undefined;
	includeReadChapters?: boolean | null | undefined;
	includeReadVolumes?: boolean | null | undefined;
	includeScore?: boolean | null | undefined;
	priorities?: ReadingStatusPriorities | null | undefined;
	userId: string;
	userName: string;
};

export type OfflineConfigInput = {
	chaptersDirectory?: string | null | undefined;
	coversDirectory?: string | null | undefined;
	dataDirectory: string;
	mangasDirectory?: string | null | undefined;
};

/** "Order by" directions for manga results. */
export enum OrderDirection {
	Ascending = "ASCENDING",
	Descending = "DESCENDING"
}

export enum PaginationStyle {
	InfiniteScroll = "INFINITE_SCROLL",
	Paged = "PAGED"
}

export type PrimaryColorInput = {
	primary: string;
	primary1: string;
	primary2: string;
};

export enum ProgressMode {
	Default = "DEFAULT",
	Floating = "FLOATING",
	Hidden = "HIDDEN"
}

export enum ReadingMode {
	DoublePage = "DOUBLE_PAGE",
	LongStrip = "LONG_STRIP",
	SinglePage = "SINGLE_PAGE",
	WideStrip = "WIDE_STRIP"
}

export enum ReadingStatus {
	Completed = "COMPLETED",
	Dropped = "DROPPED",
	OnHold = "ON_HOLD",
	PlanToRead = "PLAN_TO_READ",
	Reading = "READING",
	ReReading = "RE_READING"
}

export type ReadingStatusPriorities = {
	completed: MaltitlePriority;
	dropped: MaltitlePriority;
	onHold: MaltitlePriority;
	planToRead: MaltitlePriority;
	reReading: MaltitlePriority;
	reading: MaltitlePriority;
};

/**
 * Relationship types for reference expansion.
 *
 * <https://api.mangadex.org/docs/3-enumerations/#relationship-types>
 *
 * This should only be used with the `includes[]` query parameter.
 * For response types, refer to the [`RelationshipType` enum](crate::RelationshipType).
 */
export enum ReferenceExpansionResource {
	/** Author resource (drawers only). */
	Artist = "ARTIST",
	/** Author resource. */
	Author = "AUTHOR",
	/** Chapter resource. */
	Chapter = "CHAPTER",
	/**
	 * A Cover Art for a manga.
	 *
	 * On manga resources, only one cover art resource relation is returned,
	 * marking the primary cover if there are more than one. By default, this will be the latest
	 * volume's cover art. To see all the covers for a given manga, use the cover search endpoint.
	 */
	CoverArt = "COVER_ART",
	/** The user that created the resource */
	Creator = "CREATOR",
	/** CustomList resource. */
	CustomList = "CUSTOM_LIST",
	/** Leader of a group */
	Leader = "LEADER",
	/** Manga resource. */
	Manga = "MANGA",
	/** Member of a group */
	Member = "MEMBER",
	/** Report reason */
	Reason = "REASON",
	/** ScanlationGroup resource. */
	ScanlationGroup = "SCANLATION_GROUP",
	/** Tag resource. */
	Tag = "TAG",
	/** A Mangadex Forums Thread, */
	Thread = "THREAD",
	/** User resource. */
	User = "USER"
}

/** Report reasons for submitting reports to the MangaDex staff. */
export enum ReportCategory {
	Author = "AUTHOR",
	Chapter = "CHAPTER",
	Manga = "MANGA",
	ScanlationGroup = "SCANLATION_GROUP",
	User = "USER"
}

export type ReportSortOrder = { createdAt: OrderDirection };

/** Report reasons for submitting reports to the MangaDex staff. */
export enum ReportStatus {
	Accepted = "ACCEPTED",
	Autoresolved = "AUTORESOLVED",
	Refused = "REFUSED",
	Waiting = "WAITING"
}

export type ScanlationGroupListParams = {
	/** Language the scanlation primarily translates or uploads works into. */
	focusedLanguage?: Language | null | undefined;
	groupIds?: Array<string>;
	limit?: number | null | undefined;
	name?: string | null | undefined;
	offset?: number | null | undefined;
	order?: GroupSortOrder | null | undefined;
};

export type ScrollbarColorInput = {
	default: string;
	hovered: string;
};

export enum SidebarMode {
	Default = "DEFAULT",
	Floating = "FLOATING",
	Hidden = "HIDDEN"
}

export enum SortDirection {
	Ascending = "ASCENDING",
	Descending = "DESCENDING"
}

export type StatusColorInput = {
	blue: string;
	green: string;
	grey: string;
	purple: string;
	red: string;
	yellow: string;
};

export enum TagGroup {
	Content = "CONTENT",
	Format = "FORMAT",
	Genre = "GENRE",
	Theme = "THEME"
}

export type TagPopularList = {
	datePeriod?: DatePeriod | null | undefined;
	limit?: number | null | undefined;
	offset?: number | null | undefined;
};

/** Determines the behavior of tag interaction when including or excluding tags in the results. */
export enum TagSearchMode {
	And = "AND",
	Or = "OR"
}

export type ThemeProfileEntryInput = {
	name: string;
	value: MangaDexThemeInput;
};

export enum ThemeScheme {
	Dark = "DARK",
	Light = "LIGHT"
}

export type UserCustomListParams = {
	limit?: number | null | undefined;
	offset?: number | null | undefined;
	userId: string;
};

export type UserLibrarySectionParam = {
	artists?: Array<string> | null | undefined;
	authors?: Array<string> | null | undefined;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	createdAtSince?: string | null | undefined;
	excludeContentProfile?: boolean | null | undefined;
	hasAvailableChapters?: boolean | null | undefined;
	limit?: number | null | undefined;
	offset?: number | null | undefined;
	order?: MangaSortOrder | null | undefined;
	publicationStatus?: Array<MangaStatus> | null | undefined;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	updatedAtSince?: string | null | undefined;
	year?: number | null | undefined;
};

export type UserListParam = {
	limit?: number | null | undefined;
	offset?: number | null | undefined;
	order?: UserSortOrder | null | undefined;
	userIds?: Array<string>;
	username?: string | null | undefined;
};

/**
 * User roles that define what a user has permission to do.
 * More details at : <https://api.mangadex.org/docs/static-data/#user-roles-enum>
 */
export enum UserRole {
	/** MangaDex admins */
	RoleAdmin = "ROLE_ADMIN",
	/** Banned */
	RoleBanned = "ROLE_BANNED",
	/** Helpers contributing by filling in missing information (Description, External Links) on Manga pages on MangaDex */
	RoleContributor = "ROLE_CONTRIBUTOR",
	/** Designer */
	RoleDesigner = "ROLE_DESIGNER",
	/** MangaDex site developers */
	RoleDeveloper = "ROLE_DEVELOPER",
	/** Moderates the forum */
	RoleForumModerator = "ROLE_FORUM_MODERATOR",
	RoleGlobalModerator = "ROLE_GLOBAL_MODERATOR",
	/** Leaders of active groups on MangaDex */
	RoleGroupLeader = "ROLE_GROUP_LEADER",
	/** Member of a group */
	RoleGroupMember = "ROLE_GROUP_MEMBER",
	/** Users viewing the site without being logged in */
	RoleGuest = "ROLE_GUEST",
	/** Involved with the [MangaDex@Home](mailto:MangaDex@Home) project */
	RoleMdAtHome = "ROLE_MD_AT_HOME",
	/** Member of a group */
	RoleMember = "ROLE_MEMBER",
	/** Uploaded 500 or more chapters to MangaDex */
	RolePowerUploader = "ROLE_POWER_UPLOADER",
	/** Manages social media */
	RolePublicRelations = "ROLE_PUBLIC_RELATIONS",
	/** Staff */
	RoleStaff = "ROLE_STAFF",
	/** MangaDex Supporter */
	RoleSupporter = "ROLE_SUPPORTER",
	/** Accounts that haven't had their email address verified yet */
	RoleUnverified = "ROLE_UNVERIFIED",
	/** A normal account */
	RoleUser = "ROLE_USER",
	/** Important people that in one way or another helped MangaDex */
	RoleVip = "ROLE_VIP",
	Unknown = "UNKNOWN"
}

export type UserSortOrder = { username: OrderDirection };

export type CustomlistPageQueryQueryVariables = Exact<{
	id: string;
	private?: boolean | null | undefined;
}>;

export type CustomlistPageQueryQuery = {
	customList: {
		get: {
			id: string;
			attributes: { name: string; visibility: CustomListVisibility };
			relationships: {
				titlesIds: Array<string>;
				user: { id: string; attributes: { username: string; roles: Array<UserRole> } };
			};
		};
	};
};

export type IsChapterDownloadedQueryVariables = Exact<{
	id: string;
}>;

export type IsChapterDownloadedQuery = {
	chapter: { isDownloaded: { isDownloaded: boolean; hasFailed: boolean } };
};

export type WatchChapterDownloadStateSubscriptionVariables = Exact<{
	id: string;
}>;

export type WatchChapterDownloadStateSubscription = {
	watchDownloadState: { hasFailed: boolean; isDownloaded: boolean };
};

export type RecentlyAddedHomeQueryVariables = Exact<{ [key: string]: never }>;

export type RecentlyAddedHomeQuery = {
	home: {
		recentlyUploaded: {
			data: Array<{
				id: string;
				attributes: {
					title: string | null;
					pages: number;
					translatedLanguage: Language;
					readableAt: string | null;
					chapter: string | null;
					volume: string | null;
				};
				relationships: {
					scanlationGroups: Array<{ id: string; attributes: { name: string } }>;
					user: { id: string; attributes: { username: string; roles: Array<UserRole> } };
					manga: {
						id: string;
						attributes: {
							title: Record<string, unknown>;
							lastChapter: string | null;
							lastVolume: string | null;
						};
						relationships: { coverArt: { id: string; attributes: { fileName: string } } };
					};
				};
			}>;
		};
	};
};

export type HomePopularTitleQueryVariables = Exact<{ [key: string]: never }>;

export type HomePopularTitleQuery = {
	home: {
		popularTitles: {
			data: Array<{
				id: string;
				attributes: {
					title: Record<string, unknown>;
					contentRating: ContentRating | null;
					description: Record<string, unknown>;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					authorArtists: Array<{ id: string; attributes: { name: string } }>;
					coverArt: { id: string; attributes: { fileName: string } };
				};
			}>;
		};
	};
};

export type RecentlyAddedHomeQueryQueryVariables = Exact<{ [key: string]: never }>;

export type RecentlyAddedHomeQueryQuery = {
	home: {
		recentlyAdded: {
			data: Array<{
				id: string;
				attributes: { title: Record<string, unknown> };
				relationships: { coverArt: { id: string; attributes: { fileName: string } } };
			}>;
		};
	};
};

export type SeasonalQueryVariables = Exact<{ [key: string]: never }>;

export type SeasonalQuery = {
	home: {
		seasonal: {
			id: string;
			relationships: {
				titles: Array<{
					id: string;
					attributes: {
						title: Record<string, unknown>;
						altTitles: Array<Record<string, unknown>>;
						description: Record<string, unknown>;
					};
					relationships: { coverArt: { id: string; attributes: { fileName: string } } };
				}>;
			};
		};
	};
};

export type StaffPicksQueryVariables = Exact<{ [key: string]: never }>;

export type StaffPicksQuery = {
	home: {
		staffPicks: {
			id: string;
			relationships: {
				titles: Array<{
					id: string;
					attributes: {
						title: Record<string, unknown>;
						altTitles: Array<Record<string, unknown>>;
						state: MangaState;
						description: Record<string, unknown>;
						status: MangaStatus;
						availableTranslatedLanguages: Array<Language> | null;
					};
					relationships: { coverArt: { id: string; attributes: { fileName: string } } };
				}>;
			};
		};
	};
};

export type GetUserLoggedCustomListsQueryVariables = Exact<{
	offset?: number | null | undefined;
	limit?: number | null | undefined;
}>;

export type GetUserLoggedCustomListsQuery = {
	customList: {
		currentLoggedLists: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: { name: string; visibility: CustomListVisibility };
				relationships: { titlesIds: Array<string> };
			}>;
		};
	};
};

export type AddOrRemoveTitleToCustomListMutationVariables = Exact<{
	manga_id: string;
	addTo: Array<string> | string;
	removeFrom: Array<string> | string;
}>;

export type AddOrRemoveTitleToCustomListMutation = {
	manga: { addToListBatch: boolean; removeFromListBatch: boolean };
};

export type CreateCustomListMutationVariables = Exact<{
	mangaId: string;
	visibility: CustomListVisibility;
	name: string;
}>;

export type CreateCustomListMutation = { customList: { create: { id: string } } };

export type CreateEmptyCustomListMutationVariables = Exact<{
	visibility: CustomListVisibility;
	name: string;
}>;

export type CreateEmptyCustomListMutation = { customList: { create: { id: string } } };

export type MangaListMutationMutationVariables = Exact<{
	style: MangaListStyle;
}>;

export type MangaListMutationMutation = { userOption: { setMangaListStyle: MangaListStyle } };

export type MangaListStyleSubSubscriptionVariables = Exact<{ [key: string]: never }>;

export type MangaListStyleSubSubscription = { watchMangaListStyle: MangaListStyle };

export type MangaAggregateQueryVariables = Exact<{
	id: string;
	size?: number | null | undefined;
}>;

export type MangaAggregateQuery = {
	manga: {
		aggregate: {
			chunked: Array<{
				ids: Array<string>;
				volumes: Array<{
					volume: string;
					count: number;
					chapters: Array<{ chapter: string; count: number; ids: Array<string> }>;
				}>;
			}>;
		};
	};
};

export type GetMangaAggregateChapterQueryVariables = Exact<{
	ids: Array<string> | string;
	feedContent?: boolean | null | undefined;
}>;

export type GetMangaAggregateChapterQuery = {
	chapter: {
		list: {
			data: Array<{
				id: string;
				attributes: {
					title: string | null;
					volume: string | null;
					chapter: string | null;
					translatedLanguage: Language;
					readableAt: string | null;
				};
				relationships: {
					scanlationGroups: Array<{ id: string; attributes: { name: string } }>;
					user: { id: string; attributes: { username: string; roles: Array<UserRole> } };
				};
			}>;
		};
	};
};

export type ChapterAggregateCommentsQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type ChapterAggregateCommentsQuery = {
	statistics: {
		chapter: {
			list: Array<{ id: string; comments: { threadUrl: string; repliesCount: number } | null }>;
		};
	};
};

export type GetMangaCoversQueryVariables = Exact<{
	id: string;
	offset?: number | null | undefined;
	limit?: number | null | undefined;
}>;

export type GetMangaCoversQuery = {
	cover: {
		list: {
			total: number;
			offset: number;
			limit: number;
			data: Array<{
				id: string;
				attributes: {
					description: string;
					fileName: string;
					volume: string | null;
					locale: Language | null;
				};
			}>;
		};
	};
};

export type GetRelatedTitlesDataQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type GetRelatedTitlesDataQuery = {
	manga: {
		list: {
			data: Array<{
				id: string;
				attributes: {
					title: Record<string, unknown>;
					status: MangaStatus;
					description: Record<string, unknown>;
				};
				relationships: { coverArt: { id: string; attributes: { fileName: string } } };
			}>;
		};
	};
};

export type GetMangatoReadAggregateQueryVariables = Exact<{
	id: string;
}>;

export type GetMangatoReadAggregateQuery = {
	manga: {
		aggregate: {
			default: {
				volumes: Array<{
					volume: string;
					chapters: Array<{ ids: Array<string>; count: number; chapter: string }>;
				}>;
			};
		};
	};
};

export type AuthorSearchFetcherQueryVariables = Exact<{
	name: string;
	offset?: number;
	limit?: number;
}>;

export type AuthorSearchFetcherQuery = {
	author: {
		list: {
			offset: number;
			limit: number;
			total: number;
			data: Array<{ id: string; attributes: { name: string } }>;
		};
	};
};

export type MultiChapterDownloadBaseMutationVariables = Exact<{
	id: string;
}>;

export type MultiChapterDownloadBaseMutation = {
	chapter: { download: { isDownloaded: boolean; hasFailed: boolean } };
};

export type MultiChapterCancelDownloadBaseMutationVariables = Exact<{
	id: string;
}>;

export type MultiChapterCancelDownloadBaseMutation = { chapter: { cancelDownload: boolean } };

export type RemoveMultipleChapterMutationBaseMutationVariables = Exact<{
	id: string;
}>;

export type RemoveMultipleChapterMutationBaseMutation = { chapter: { remove: boolean } };

export type JustDownloadingTitleMutationVariables = Exact<{
	id: string;
}>;

export type JustDownloadingTitleMutation = {
	manga: { download: { isDownloaded: boolean; hasFailed: boolean } };
};

export type AddTitleToListBatchMutationVariables = Exact<{
	mangas: Array<string> | string;
	customList: string;
}>;

export type AddTitleToListBatchMutation = { customList: { addMangaBatch: boolean } };

export type GetTitleTitlesQueryVariables = Exact<{
	titles: Array<string> | string;
}>;

export type GetTitleTitlesQuery = {
	manga: { list: { data: Array<{ id: string; attributes: { title: Record<string, unknown> } }> } };
};

export type UpdateReadingStatusesMutationVariables = Exact<{
	titles: Array<string> | string;
	status?: ReadingStatus | null | undefined;
}>;

export type UpdateReadingStatusesMutation = { manga: { updateReadingStatusBatch: boolean } };

export type FollowTitlesBatchMutationVariables = Exact<{
	titles: Array<string> | string;
}>;

export type FollowTitlesBatchMutation = { manga: { followBatch: boolean } };

export type UnfollowTitlesBatchMutationVariables = Exact<{
	titles: Array<string> | string;
}>;

export type UnfollowTitlesBatchMutation = { manga: { unfollowBatch: boolean } };

export type UserMeOnSidebarFooterQueryVariables = Exact<{ [key: string]: never }>;

export type UserMeOnSidebarFooterQuery = {
	user: { me: { id: string; attributes: { username: string; roles: Array<UserRole> } } };
};

export type SetSidebarDirectionMutationVariables = Exact<{
	direction: Direction;
}>;

export type SetSidebarDirectionMutation = { userOption: { setSidebarDirection: Direction } };

export type WatchDefaultContentProfileSubscriptionVariables = Exact<{ [key: string]: never }>;

export type WatchDefaultContentProfileSubscription = {
	watchContentProfileDefault: {
		" $fragmentRefs"?: { ContentProfileItemFragment: ContentProfileItemFragment };
	};
};

export type UpdateDefaultContentProfileMutationVariables = Exact<{
	entry: ContentProfileInput;
}>;

export type UpdateDefaultContentProfileMutation = {
	userOption: {
		updateDefaultContentProfile: {
			" $fragmentRefs"?: { ContentProfileItemFragment: ContentProfileItemFragment };
		};
	};
};

export type GetDefaultContentProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetDefaultContentProfileQuery = {
	userOption: {
		getDefaultContentProfile: {
			" $fragmentRefs"?: { ContentProfileItemFragment: ContentProfileItemFragment };
		};
	};
};

export type WatchDefaultContentProfileKeySubscriptionVariables = Exact<{ [key: string]: never }>;

export type WatchDefaultContentProfileKeySubscription = {
	watchContentProfileDefaultName: string | null;
};

export type UpdateDefaultContentProfileKeyMutationVariables = Exact<{
	name?: string | null | undefined;
}>;

export type UpdateDefaultContentProfileKeyMutation = {
	userOption: { setDefaultContentProfileKey: string | null };
};

export type ContentProfileItemFragment = {
	originalLanguages: Array<Language>;
	publicationDemographic: Array<Demographic>;
	includedTags: Array<string>;
	includedTagsMode: TagSearchMode | null;
	excludedTags: Array<string>;
	excludedTagsMode: TagSearchMode | null;
	status: Array<MangaStatus>;
	excludedOriginalLanguage: Array<Language>;
	translatedLanguages: Array<Language>;
	contentRating: Array<ContentRating>;
	excludedGroups: Array<string>;
	excludedUploaders: Array<string>;
} & { " $fragmentName"?: "ContentProfileItemFragment" };

export type WatchContentProfilesSubscriptionVariables = Exact<{ [key: string]: never }>;

export type WatchContentProfilesSubscription = {
	watchContentProfiles: Array<{
		name: string;
		value: { " $fragmentRefs"?: { ContentProfileItemFragment: ContentProfileItemFragment } };
	}>;
};

export type UpdateContentProfilesMutationVariables = Exact<{
	entries: Array<ContentProfileEntryInput> | ContentProfileEntryInput;
}>;

export type UpdateContentProfilesMutation = { userOption: { setContentProfiles: number } };

export type UpdateContentProfileMutationVariables = Exact<{
	name: string;
	entry?: ContentProfileInput | null | undefined;
}>;

export type UpdateContentProfileMutation = {
	userOption: {
		setContentProfile: {
			" $fragmentRefs"?: { ContentProfileItemFragment: ContentProfileItemFragment };
		};
	};
};

export type DownloadChapterMutationMutationVariables = Exact<{
	id: string;
	quality?: DownloadMode | null | undefined;
}>;

export type DownloadChapterMutationMutation = {
	chapter: { download: { hasFailed: boolean; isDownloaded: boolean } };
};

export type CancelDownloadChapterMutationMutationVariables = Exact<{
	id: string;
}>;

export type CancelDownloadChapterMutationMutation = { chapter: { cancelDownload: boolean } };

export type ChapterDownloadStateSubscriptionVariables = Exact<{
	id: string;
	deferred?: boolean | null | undefined;
}>;

export type ChapterDownloadStateSubscription = {
	watchChapterDownloadState: {
		isPending: boolean;
		isDone: boolean;
		isCanceled: boolean;
		isOfflineAppStateNotLoaded: boolean;
		error: string | null;
		downloading: {
			isPreloading: boolean;
			isFetchingData: boolean;
			isFetchingAtHomeData: boolean;
			fetchingImage: { filename: string; index: number; len: number } | null;
		} | null;
	};
};

export type RemoveDownloadedChapterMutationVariables = Exact<{
	id: string;
}>;

export type RemoveDownloadedChapterMutation = { chapter: { remove: boolean } };

export type ChapterDownloadStateQQueryVariables = Exact<{
	id: string;
}>;

export type ChapterDownloadStateQQuery = {
	downloadState: { chapter: { isDownloaded: boolean; hasFailed: boolean } };
};

export type DownloadCoverMutationVariables = Exact<{
	id: string;
}>;

export type DownloadCoverMutation = {
	cover: { download: { hasFailed: boolean; isDownloaded: boolean } };
};

export type CancelDownloadCoverMutationVariables = Exact<{
	id: string;
}>;

export type CancelDownloadCoverMutation = { cover: { cancelDownload: boolean } };

export type CoverDownloadStateQueryVariables = Exact<{
	id: string;
}>;

export type CoverDownloadStateQuery = {
	downloadState: { cover: { hasFailed: boolean; isDownloaded: boolean } };
};

export type CoverDownloadSubSubscriptionVariables = Exact<{
	id: string;
	deferred?: boolean | null | undefined;
}>;

export type CoverDownloadSubSubscription = {
	watchCoverDownloadState: {
		isDone: boolean;
		isPending: boolean;
		isCanceled: boolean;
		isOfflineAppStateNotLoaded: boolean;
		downloading: CoverDownloadingState | null;
		error: string | null;
	};
};

export type CoverRemoveMutationMutationVariables = Exact<{
	id: string;
}>;

export type CoverRemoveMutationMutation = { cover: { remove: boolean } };

export type DownloadMangaMutationVariables = Exact<{
	id: string;
}>;

export type DownloadMangaMutation = {
	manga: { download: { hasFailed: boolean; isDownloaded: boolean } };
};

export type CancelDownloadMangaMutationVariables = Exact<{
	id: string;
}>;

export type CancelDownloadMangaMutation = { manga: { cancelDownload: boolean } };

export type MangaDownloadStateQueryVariables = Exact<{
	id: string;
}>;

export type MangaDownloadStateQuery = {
	downloadState: { manga: { hasFailed: boolean; isDownloaded: boolean } };
};

export type MangaDownloadSubSubscriptionVariables = Exact<{
	id: string;
	deferred?: boolean | null | undefined;
}>;

export type MangaDownloadSubSubscription = {
	watchMangaDownloadState: {
		isDone: boolean;
		isPending: boolean;
		isCanceled: boolean;
		isOfflineAppStateNotLoaded: boolean;
		downloading: MangaDonwloadingState | null;
		error: string | null;
	};
};

export type MangaRemoveMutationMutationVariables = Exact<{
	id: string;
}>;

export type MangaRemoveMutationMutation = { manga: { remove: boolean } };

export type AllTagsQueryVariables = Exact<{ [key: string]: never }>;

export type AllTagsQuery = {
	tag: {
		list: {
			data: Array<{ id: string; attributes: { name: Record<string, unknown>; group: TagGroup } }>;
		};
	};
};

export type AuthCheckQueryVariables = Exact<{ [key: string]: never }>;

export type AuthCheckQuery = {
	auth: { check: { isAuthenticated: boolean; roles: Array<UserRole>; permissions: Array<string> } };
};

export type LoginMutationMutationVariables = Exact<{
	username: string;
	password: string;
}>;

export type LoginMutationMutation = { oauth: { login: boolean } };

export type LogoutMutationMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutationMutation = { oauth: { logout: boolean } };

export type AuthorPageQueryQueryVariables = Exact<{
	id: string;
}>;

export type AuthorPageQueryQuery = {
	author: {
		get: {
			id: string;
			isBlocked: boolean;
			attributes: {
				name: string;
				imageUrl: string | null;
				biography: Record<string, unknown>;
				twitter: string | null;
				pixiv: string | null;
				melonBook: string | null;
				fanBox: string | null;
				booth: string | null;
				nicoVideo: string | null;
				skeb: string | null;
				fantia: string | null;
				tumblr: string | null;
				youtube: string | null;
				weibo: string | null;
				naver: string | null;
				website: string | null;
			};
		};
	};
	manga: { list: { total: number } };
};

export type AuthorsSearchQueryVariables = Exact<{
	params: AuthorListParams;
}>;

export type AuthorsSearchQuery = {
	author: {
		list: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: { name: string };
				relationships: { works: Array<{ id: string }> };
			}>;
		};
	};
};

export type ListBlacklistedAuthorArtistsQueryVariables = Exact<{
	params?: BlacklistAuthorsArtistsListParam | null | undefined;
}>;

export type ListBlacklistedAuthorArtistsQuery = {
	blacklist: {
		authorsArtists: {
			list: {
				limit: number;
				total: number;
				offset: number;
				data: Array<{ id: string; name: string; insertDate: string | null }>;
			};
		};
	};
};

export type GetAuthorArtistsBlacklistedByIdsQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type GetAuthorArtistsBlacklistedByIdsQuery = {
	blacklist: {
		authorsArtists: { getByIds: Array<{ id: string; name: string; insertDate: string | null }> };
	};
};

export type GetAuthorArtistsBlacklistedByIdQueryVariables = Exact<{
	id: string;
}>;

export type GetAuthorArtistsBlacklistedByIdQuery = {
	blacklist: { authorsArtists: { get: { id: string; name: string; insertDate: string | null } } };
};

export type BlockAuthorArtistMutationVariables = Exact<{
	id: string;
}>;

export type BlockAuthorArtistMutation = {
	blacklist: { authorArtists: { blockOne: { id: string } } };
};

export type BlockBatchAuthorArtistMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type BlockBatchAuthorArtistMutation = {
	blacklist: { authorArtists: { blockMany: Array<{ id: string }> } };
};

export type UnblockAuthorArtistMutationVariables = Exact<{
	id: string;
}>;

export type UnblockAuthorArtistMutation = {
	blacklist: { authorArtists: { unblockOne: { id: string } } };
};

export type UnblockBatchAuthorArtistMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type UnblockBatchAuthorArtistMutation = {
	blacklist: { authorArtists: { unblockMany: Array<{ id: string }> } };
};

export type ListBlacklistLabelsQueryVariables = Exact<{
	params?: BlacklistLabelsListParam | null | undefined;
}>;

export type ListBlacklistLabelsQuery = {
	blacklist: {
		labels: {
			list: {
				offset: number;
				limit: number;
				total: number;
				data: Array<{
					id: string;
					name: string;
					createDate: string | null;
					description: string | null;
				}>;
			};
		};
	};
};

export type GetBlacklistLabelQueryVariables = Exact<{
	id: string;
}>;

export type GetBlacklistLabelQuery = {
	blacklist: {
		labels: {
			get: { id: string; name: string; createDate: string | null; description: string | null };
		};
	};
};

export type GetBlacklistLabelsByIdsQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type GetBlacklistLabelsByIdsQuery = {
	blacklist: {
		labels: {
			getByIds: Array<{
				id: string;
				name: string;
				createDate: string | null;
				description: string | null;
			}>;
		};
	};
};

export type CreateBlacklistLabelMutationVariables = Exact<{
	param: CreateBlacklistLabelParam;
}>;

export type CreateBlacklistLabelMutation = {
	blacklist: { labels: { createLabel: { id: string } } };
};

export type LinkBlacklistLabelsAuthorsArtistsMutationVariables = Exact<{
	labelIds: Array<string> | string;
	authorIds: Array<string> | string;
	notes?: string | null | undefined;
}>;

export type LinkBlacklistLabelsAuthorsArtistsMutation = {
	blacklist: { labels: { linkAuthorsArtists: boolean | null } };
};

export type LinkBlacklistLabelsScanlationGroupsMutationVariables = Exact<{
	scanlationGroupIds: Array<string> | string;
	labelIds: Array<string> | string;
	notes?: string | null | undefined;
}>;

export type LinkBlacklistLabelsScanlationGroupsMutation = {
	blacklist: { labels: { linkScanlationGroups: boolean | null } };
};

export type LinkBlacklistLabelsUsersMutationVariables = Exact<{
	labelIds: Array<string> | string;
	userIds: Array<string> | string;
	notes?: string | null | undefined;
}>;

export type LinkBlacklistLabelsUsersMutation = {
	blacklist: { labels: { linkUsers: boolean | null } };
};

export type DeleteBlacklistLabelMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type DeleteBlacklistLabelMutation = {
	blacklist: { labels: { deleteLabels: Array<{ name: string }> } };
};

export type UnlinkBlacklistLabelsAuthorsArtistsMutationVariables = Exact<{
	labelIds: Array<string> | string;
	authorIds: Array<string> | string;
}>;

export type UnlinkBlacklistLabelsAuthorsArtistsMutation = {
	blacklist: { labels: { unlinkAuthorsArtists: boolean | null } };
};

export type UnlinkBlacklistLabelsScanlationGroupsMutationVariables = Exact<{
	scanlationGroupIds: Array<string> | string;
	labelIds: Array<string> | string;
}>;

export type UnlinkBlacklistLabelsScanlationGroupsMutation = {
	blacklist: { labels: { unlinkScanlationGroups: boolean | null } };
};

export type UnlinkBlacklistLabelsUsersMutationVariables = Exact<{
	labelIds: Array<string> | string;
	userIds: Array<string> | string;
}>;

export type UnlinkBlacklistLabelsUsersMutation = {
	blacklist: { labels: { unlinkUsers: boolean | null } };
};

export type ListBlacklistedScanlationGroupsQueryVariables = Exact<{
	params?: BlacklistScanlationGroupsListParam | null | undefined;
}>;

export type ListBlacklistedScanlationGroupsQuery = {
	blacklist: {
		scanlationGroups: {
			list: {
				limit: number;
				total: number;
				offset: number;
				data: Array<{ id: string; name: string; insertDate: string | null }>;
			};
		};
	};
};

export type GetScanlationGroupBlacklistedByIdsQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type GetScanlationGroupBlacklistedByIdsQuery = {
	blacklist: {
		scanlationGroups: { getByIds: Array<{ id: string; name: string; insertDate: string | null }> };
	};
};

export type GetScanlationGroupBlacklistedByIdQueryVariables = Exact<{
	id: string;
}>;

export type GetScanlationGroupBlacklistedByIdQuery = {
	blacklist: { scanlationGroups: { get: { id: string; name: string; insertDate: string | null } } };
};

export type BlockScanlationGroupMutationVariables = Exact<{
	id: string;
}>;

export type BlockScanlationGroupMutation = {
	blacklist: { scanlationGroups: { blockOne: { id: string } } };
};

export type BlockBatchScanlationGroupMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type BlockBatchScanlationGroupMutation = {
	blacklist: { scanlationGroups: { blockMany: Array<{ id: string }> } };
};

export type UnblockScanlationGroupMutationVariables = Exact<{
	id: string;
}>;

export type UnblockScanlationGroupMutation = {
	blacklist: { scanlationGroups: { unblockOne: { id: string } } };
};

export type UnblockBatchScanlationGroupMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type UnblockBatchScanlationGroupMutation = {
	blacklist: { scanlationGroups: { unblockMany: Array<{ id: string }> } };
};

export type ListBlacklistedUsersQueryVariables = Exact<{
	params?: BlacklistUserListParam | null | undefined;
}>;

export type ListBlacklistedUsersQuery = {
	blacklist: {
		users: {
			list: {
				limit: number;
				total: number;
				offset: number;
				data: Array<{ id: string; name: string; insertDate: string | null }>;
			};
		};
	};
};

export type GetUserBlacklistedByIdsQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type GetUserBlacklistedByIdsQuery = {
	blacklist: {
		users: { getByIds: Array<{ id: string; name: string; insertDate: string | null }> };
	};
};

export type GetUserBlacklistedByIdQueryVariables = Exact<{
	id: string;
}>;

export type GetUserBlacklistedByIdQuery = {
	blacklist: { users: { get: { id: string; name: string; insertDate: string | null } } };
};

export type BlockUserMutationVariables = Exact<{
	id: string;
}>;

export type BlockUserMutation = { blacklist: { users: { blockOne: { id: string } } } };

export type BlockBatchUserMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type BlockBatchUserMutation = { blacklist: { users: { blockMany: Array<{ id: string }> } } };

export type UnblockUsersMutationVariables = Exact<{
	id: string;
}>;

export type UnblockUsersMutation = { blacklist: { users: { unblockOne: { id: string } } } };

export type UnblockBatchUserMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type UnblockBatchUserMutation = {
	blacklist: { users: { unblockMany: Array<{ id: string }> } };
};

export type GetChaptersIDsAsFeedQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type GetChaptersIDsAsFeedQuery = {
	chapter: {
		listWithGroupByManga: {
			data: Array<{
				manga: { id: string; attributes: { title: Record<string, unknown> } };
				chapters: Array<{
					id: string;
					attributes: { chapter: string | null; title: string | null; volume: string | null };
				}>;
			}>;
		};
	};
};

export type SubToChapterImageFitSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubToChapterImageFitSubscription = { watchImageFit: ImageFit };

export type UpdateChapterImageFitMutationVariables = Exact<{
	imageFit: ImageFit;
}>;

export type UpdateChapterImageFitMutation = { userOption: { setImageFit: ImageFit } };

export type SubToChapterLongstripImageWidthSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubToChapterLongstripImageWidthSubscription = { watchLongstripImageWidth: number };

export type UpdateChapterLongstripImageWidthMutationVariables = Exact<{
	width: number;
}>;

export type UpdateChapterLongstripImageWidthMutation = {
	userOption: { setLongstripImageWidth: number };
};

export type SubToChapterReadingDirectionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubToChapterReadingDirectionSubscription = { watchPageDirection: Direction };

export type UpdateChapterReadingDirectionMutationVariables = Exact<{
	direction: Direction;
}>;

export type UpdateChapterReadingDirectionMutation = { userOption: { setPageDirection: Direction } };

export type SubToChapterReadingModeSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubToChapterReadingModeSubscription = { watchReadingMode: ReadingMode };

export type UpdateChapterReadingModeMutationVariables = Exact<{
	mode: ReadingMode;
}>;

export type UpdateChapterReadingModeMutation = { userOption: { setReadingMode: ReadingMode } };

export type GetChapterRelatedQueryVariables = Exact<{
	mangaId: string;
	langs: Language;
	groups: Array<string> | string;
}>;

export type GetChapterRelatedQuery = {
	manga: {
		aggregate: {
			default: {
				volumes: Array<{
					volume: string;
					chapters: Array<{ chapter: string; ids: Array<string> }>;
				}>;
			};
		};
	};
};

export type ChapterPageThreadQueryVariables = Exact<{
	id: string;
}>;

export type ChapterPageThreadQuery = {
	statistics: {
		chapter: { get: { comments: { repliesCount: number; threadUrl: string } | null } };
	};
};

export type GetChapterPageDataQueryVariables = Exact<{
	id: string;
}>;

export type GetChapterPageDataQuery = {
	chapter: {
		get: {
			id: string;
			attributes: {
				title: string | null;
				volume: string | null;
				chapter: string | null;
				pages: number;
				translatedLanguage: Language;
				externalUrl: string | null;
				readableAt: string | null;
			};
			relationships: {
				manga: {
					id: string;
					attributes: {
						title: Record<string, unknown>;
						status: MangaStatus;
						state: MangaState;
						originalLanguage: Language;
						contentRating: ContentRating | null;
						publicationDemographic: Demographic | null;
						isLongstrip: boolean;
						tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
					};
				};
				scanlationGroups: Array<{ id: string; attributes: { name: string } }>;
				user: { id: string; attributes: { username: string; roles: Array<UserRole> } };
			};
		};
	};
};

export type ExportChapterPageMutationVariables = Exact<{
	id: string;
	page: number;
	exportPath: string;
	mode?: DownloadMode | null | undefined;
}>;

export type ExportChapterPageMutation = { chapter: { pagesCache: { exportPage: string | null } } };

export type SetContentProfileBlurMutationVariables = Exact<{
	blur: boolean;
}>;

export type SetContentProfileBlurMutation = { userOption: { setContentProfileBlur: boolean } };

export type SubContentProfileBlurSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubContentProfileBlurSubscription = { watchContentProfileBlur: boolean };

export type GetContentProfileBlurQueryVariables = Exact<{ [key: string]: never }>;

export type GetContentProfileBlurQuery = { userOption: { getContentProfileBlur: boolean } };

export type SetContentProfileWarningModeMutationVariables = Exact<{
	mode: ContentProfileWarningMode;
}>;

export type SetContentProfileWarningModeMutation = {
	userOption: { setContentProfileWarningMode: ContentProfileWarningMode };
};

export type GetContentProfileWarningModeQueryVariables = Exact<{ [key: string]: never }>;

export type GetContentProfileWarningModeQuery = {
	userOption: { getContentProfileWarningMode: ContentProfileWarningMode };
};

export type SubContentProfileWarningModeSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubContentProfileWarningModeSubscription = {
	watchContentProfileWarningMode: ContentProfileWarningMode;
};

export type SaveCoversInArchiveMutationVariables = Exact<{
	ids: Array<string> | string;
	archivePath: string;
	options?: CoverArtSaveOption | null | undefined;
}>;

export type SaveCoversInArchiveMutation = { cover: { saveImagesToArchive: string } };

export type DownloadCoversInADirectoryMutationVariables = Exact<{
	ids: Array<string> | string;
	exportDir: string;
	options?: CoverArtSaveOption | null | undefined;
}>;

export type DownloadCoversInADirectoryMutation = { cover: { saveImages: string | null } };

export type DownloadCoverInADirectoryMutationVariables = Exact<{
	id: string;
	exportDir: string;
	options?: CoverArtSaveOption | null | undefined;
}>;

export type DownloadCoverInADirectoryMutation = { cover: { saveImage: string } };

export type DownloadCoversLocalyMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type DownloadCoversLocalyMutation = { cover: { downloadCovers: boolean | null } };

export type ListenToMangaTasksIDsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ListenToMangaTasksIDsSubscription = { watchMangaTasksList: Array<string> };

export type ListenToChapterTasksIDsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ListenToChapterTasksIDsSubscription = { watchChaptersTasksList: Array<string> };

export type ListenToCoverTasksIDsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ListenToCoverTasksIDsSubscription = { watchCoverTasksList: Array<string> };

export type ExportIdsToTxtMutationVariables = Exact<{
	uuids: Array<string> | string;
	path: string;
}>;

export type ExportIdsToTxtMutation = { export: { uuidsToAsTxt: string } };

export type SetForcePort443MutationVariables = Exact<{
	force: boolean;
}>;

export type SetForcePort443Mutation = { userOption: { setForcePort443: boolean } };

export type SubForce443SubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubForce443Subscription = { watchForcePort443: boolean };

export type GetLanguageFromStrQueryVariables = Exact<{
	lang: string;
}>;

export type GetLanguageFromStrQuery = { utils: { strToLanguage: Language } };

export type FollowScanlationGroupBatchMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type FollowScanlationGroupBatchMutation = {
	scanlationGroup: { followBatch: boolean | null };
};

export type UnfollowScanlationGroupBatchMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type UnfollowScanlationGroupBatchMutation = {
	scanlationGroup: { unfollowBatch: boolean | null };
};

export type GroupPageQueryQueryVariables = Exact<{
	id: string;
}>;

export type GroupPageQueryQuery = {
	scanlationGroup: {
		getUnique: {
			id: string;
			isBlocked: boolean;
			attributes: {
				website: string | null;
				twitter: string | null;
				name: string;
				altNames: Array<Record<string, unknown>>;
				ircServer: string | null;
				ircChannel: string | null;
				contactEmail: string | null;
				mangaUpdates: string | null;
				focusedLanguages: Array<Language> | null;
				locked: boolean;
				official: boolean;
				verified: boolean;
				exLicensed: boolean | null;
				publishDelay: string | null;
				createdAt: string;
				description: string | null;
				discord: string | null;
			};
			relationships: {
				leader: { id: string; attributes: { roles: Array<UserRole>; username: string } } | null;
				members: Array<{ id: string; attributes: { roles: Array<UserRole>; username: string } }>;
			};
		};
	};
	manga: { list: { total: number } };
	statistics: { group: { get: { comments: { threadUrl: string; repliesCount: number } | null } } };
	chapter: { list: { total: number } };
};

export type FollowScanlationGroupMutationMutationVariables = Exact<{
	id: string;
}>;

export type FollowScanlationGroupMutationMutation = { scanlationGroup: { follow: boolean } };

export type UnfollowScanlationGroupMutationMutationVariables = Exact<{
	id: string;
}>;

export type UnfollowScanlationGroupMutationMutation = { scanlationGroup: { unfollow: boolean } };

export type IsFollowingScanlationGroupQueryQueryVariables = Exact<{
	id: string;
}>;

export type IsFollowingScanlationGroupQueryQuery = { follows: { isFollowingGroup: boolean } };

export type GroupStatisticsQueryQueryVariables = Exact<{
	id: string;
}>;

export type GroupStatisticsQueryQuery = {
	statistics: {
		group: {
			get: { comments: { threadId: number; repliesCount: number; threadUrl: string } | null };
		};
	};
};

export type ScanlationUploadsFeedQueryVariables = Exact<{
	group: string;
	translatedLanguages?: Array<Language> | Language;
	offset?: number | null | undefined;
	limit?: number | null | undefined;
	order?: ChapterSortOrder;
	mangaListParams?: MangaListParams | null | undefined;
	onlyUnreadTitles?: boolean | null | undefined;
	disableScanlationGroupBlacklist?: boolean | null | undefined;
	disableUserBlacklist?: boolean | null | undefined;
	disableAuthorArtistBlacklist?: boolean | null | undefined;
}>;

export type ScanlationUploadsFeedQuery = {
	chapter: {
		listWithGroupByManga: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				manga: {
					id: string;
					attributes: {
						title: Record<string, unknown>;
						originalLanguage: Language;
						lastVolume: string | null;
						lastChapter: string | null;
					};
					relationships: { coverArt: { id: string; attributes: { fileName: string } } };
				};
				chapters: Array<{
					id: string;
					attributes: {
						title: string | null;
						chapter: string | null;
						volume: string | null;
						translatedLanguage: Language;
						externalUrl: string | null;
						createdAt: string;
						readableAt: string | null;
					};
					relationships: {
						scanlationGroups: Array<{ id: string; attributes: { name: string } }>;
						user: { id: string; attributes: { roles: Array<UserRole>; username: string } };
					};
				}>;
			}>;
		};
	};
};

export type OnlyScanlationGroupNameQueryVariables = Exact<{
	scanGroupsId: Array<string> | string;
}>;

export type OnlyScanlationGroupNameQuery = {
	scanlationGroup: { list: { data: Array<{ id: string; attributes: { name: string } }> } };
};

export type ScanalationGroupSearchQueryVariables = Exact<{
	params: ScanlationGroupListParams;
}>;

export type ScanalationGroupSearchQuery = {
	scanlationGroup: {
		list: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: { name: string; discord: string | null; website: string | null };
				relationships: {
					leader: { id: string; attributes: { username: string } } | null;
					members: Array<{ id: string }>;
				};
			}>;
		};
	};
};

export type GroupSearchAndGetNameOnlyQueryVariables = Exact<{
	limit?: number | null | undefined;
	offset?: number | null | undefined;
	name?: string | null | undefined;
}>;

export type GroupSearchAndGetNameOnlyQuery = {
	scanlationGroup: {
		list: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{ id: string; attributes: { name: string } }>;
		};
	};
};

export type UserFollowedGroupsQueryVariables = Exact<{
	offset?: number | null | undefined;
	limit?: number | null | undefined;
}>;

export type UserFollowedGroupsQuery = {
	follows: {
		groups: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					name: string;
					altNames: Array<Record<string, unknown>>;
					discord: string | null;
					ircServer: string | null;
					ircChannel: string | null;
					official: boolean;
					verified: boolean;
					website: string | null;
					twitter: string | null;
					mangaUpdates: string | null;
					contactEmail: string | null;
				};
				relationships: {
					membersLen: number;
					leader: { id: string; attributes: { username: string; roles: Array<UserRole> } } | null;
				};
			}>;
		};
	};
};

export type WatchOnlyUnreadSubSubscriptionVariables = Exact<{ [key: string]: never }>;

export type WatchOnlyUnreadSubSubscription = { watchHideReadTitles: boolean };

export type SetHideReadTitleMutationVariables = Exact<{
	hide: boolean;
}>;

export type SetHideReadTitleMutation = { userOption: { setHideReadTitles: boolean } };

export type CurrentUserLibraryCompletedQueryVariables = Exact<{
	param?: UserLibrarySectionParam | null | undefined;
}>;

export type CurrentUserLibraryCompletedQuery = {
	library: {
		completed: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type CurrentUserLibraryDroppedQueryVariables = Exact<{
	param?: UserLibrarySectionParam | null | undefined;
}>;

export type CurrentUserLibraryDroppedQuery = {
	library: {
		dropped: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type ExportLibraryToCsvMutationVariables = Exact<{
	options: ExportMdLibraryToCsvOptions;
}>;

export type ExportLibraryToCsvMutation = { library: { exportAsCsv: string } };

export type ExportLibraryToMyAnimeListMutationVariables = Exact<{
	options: MdlibraryToMyAnimeListExportOption;
}>;

export type ExportLibraryToMyAnimeListMutation = { library: { exportAsMyAnimeList: string } };

export type CurrentUserLibraryUnfilteredQueryVariables = Exact<{
	param?: UserLibrarySectionParam | null | undefined;
}>;

export type CurrentUserLibraryUnfilteredQuery = {
	library: {
		unfiltered: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type LibraryTitleMapQueryVariables = Exact<{
	status?: ReadingStatus | null | undefined;
}>;

export type LibraryTitleMapQuery = {
	manga: { getMangaStatus: Array<{ id: string; status: ReadingStatus }> };
};

export type CurrentUserLibraryOnHoldQueryVariables = Exact<{
	param?: UserLibrarySectionParam | null | undefined;
}>;

export type CurrentUserLibraryOnHoldQuery = {
	library: {
		onHold: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type CurrentUserLibraryPlanToReadQueryVariables = Exact<{
	param?: UserLibrarySectionParam | null | undefined;
}>;

export type CurrentUserLibraryPlanToReadQuery = {
	library: {
		planToRead: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type CurrentUserLibraryReReadingQueryVariables = Exact<{
	param?: UserLibrarySectionParam | null | undefined;
}>;

export type CurrentUserLibraryReReadingQuery = {
	library: {
		reReading: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type CurrentUserLibraryReadingQueryVariables = Exact<{
	param?: UserLibrarySectionParam | null | undefined;
}>;

export type CurrentUserLibraryReadingQuery = {
	library: {
		reading: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type LibrarySizeQueryVariables = Exact<{ [key: string]: never }>;

export type LibrarySizeQuery = {
	library: {
		size: {
			unfiltered: number;
			completed: number;
			dropped: number;
			planToRead: number;
			reading: number;
			reReading: number;
			onHold: number;
		};
	};
};

export type AssembleCustomListsTitlesIntoOneMutationVariables = Exact<{
	ids: Array<string> | string;
	newListName: string;
	visibility?: CustomListVisibility | null | undefined;
	filterContent?: boolean | null | undefined;
}>;

export type AssembleCustomListsTitlesIntoOneMutation = {
	customList: {
		assembleCustomListsIntoOne: { id: string; attributes: { visibility: CustomListVisibility } };
	};
};

export type CurrentUserCustomListsQueryVariables = Exact<{
	params: CurrentLoggedLists;
}>;

export type CurrentUserCustomListsQuery = {
	customList: {
		currentLoggedLists: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: { name: string; visibility: CustomListVisibility };
				relationships: { titlesIds: Array<string> };
			}>;
		};
	};
};

export type DownloadMdListsTitlesMutationVariables = Exact<{
	listIDs: Array<string> | string;
	extras?: MangaDownloadExtras | null | undefined;
	filterContent?: boolean | null | undefined;
}>;

export type DownloadMdListsTitlesMutation = { customList: { downloadListTitles: boolean | null } };

export type ExportCustomListsToCsvMutationVariables = Exact<{
	options: ExportCustomListsToCsvOptions;
}>;

export type ExportCustomListsToCsvMutation = { customList: { export: { asCsv: string } } };

export type ExportCustomListsToMalMutationVariables = Exact<{
	options: MdcustomListsToMyAnimeListExportOption;
}>;

export type ExportCustomListsToMalMutation = { customList: { export: { asMyAnimeList: string } } };

export type FollowMdListBatchMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type FollowMdListBatchMutation = { customList: { followBatch: boolean | null } };

export type UnfollowMdListBatchMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type UnfollowMdListBatchMutation = { customList: { unfollowBatch: boolean | null } };

export type GetCustomListInfoByBatchQueryVariables = Exact<{
	ids: Array<string> | string;
	private?: boolean | null | undefined;
}>;

export type GetCustomListInfoByBatchQuery = {
	customList: {
		getCustomListBatch: Array<{
			id: string;
			attributes: { name: string; visibility: CustomListVisibility };
			relationships: { titlesIds: Array<string> };
		}>;
	};
};

export type DeleteCustomListMutationMutationVariables = Exact<{
	id: string;
}>;

export type DeleteCustomListMutationMutation = { customList: { delete: boolean } };

export type CustomListChapterFeedQueryVariables = Exact<{
	feedParam: CustomListMangaFeedParams;
	mangaParam?: MangaListParams | null | undefined;
	private?: boolean | null | undefined;
	onlyUnreadTitles?: boolean | null | undefined;
	disableScanlationGroupBlacklist?: boolean | null | undefined;
	disableUserBlacklist?: boolean | null | undefined;
	disableAuthorArtistBlacklist?: boolean | null | undefined;
}>;

export type CustomListChapterFeedQuery = {
	feed: {
		customListFeedGrouped: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				manga: {
					id: string;
					attributes: {
						title: Record<string, unknown>;
						originalLanguage: Language;
						lastVolume: string | null;
						lastChapter: string | null;
					};
					relationships: { coverArt: { id: string; attributes: { fileName: string } } };
				};
				chapters: Array<{
					id: string;
					attributes: {
						title: string | null;
						chapter: string | null;
						volume: string | null;
						translatedLanguage: Language;
						externalUrl: string | null;
						createdAt: string;
						readableAt: string | null;
					};
					relationships: {
						scanlationGroups: Array<{ id: string; attributes: { name: string } }>;
						user: { id: string; attributes: { roles: Array<UserRole>; username: string } };
					};
				}>;
			}>;
		};
	};
};

export type FollowCustomListMutationMutationVariables = Exact<{
	id: string;
}>;

export type FollowCustomListMutationMutation = { customList: { follow: boolean } };

export type UnfollowCustomListMutationMutationVariables = Exact<{
	id: string;
}>;

export type UnfollowCustomListMutationMutation = { customList: { unfollow: boolean } };

export type IsFollowingCustomListQueryQueryVariables = Exact<{
	id: string;
}>;

export type IsFollowingCustomListQueryQuery = { follows: { isFollowingCustomList: boolean } };

export type ForkCustomListMutationVariables = Exact<{
	name: string;
	visibility?: CustomListVisibility | null | undefined;
	toFork: string;
	filter?: boolean | null | undefined;
}>;

export type ForkCustomListMutation = {
	customList: {
		fork: {
			id: string;
			attributes: { name: string; visibility: CustomListVisibility };
			relationships: { titlesIds: Array<string> };
		};
	};
};

export type GetCustomListVersion1QueryVariables = Exact<{
	id: string;
}>;

export type GetCustomListVersion1Query = {
	customList: { get: { id: string; attributes: { version: number } } };
};

export type UpdateCustomListVisibility1MutationVariables = Exact<{
	id: string;
	visibility: CustomListVisibility;
	version: number;
}>;

export type UpdateCustomListVisibility1Mutation = { customList: { update: { id: string } } };

export type RemoveTitlesFromCustomListMutationVariables = Exact<{
	customListId: string;
	titlesIds: Array<string> | string;
}>;

export type RemoveTitlesFromCustomListMutation = { customList: { removeMangaBatch: boolean } };

export type UserFollowedCustomListsQueryVariables = Exact<{
	limit?: number | null | undefined;
	offset?: number | null | undefined;
}>;

export type UserFollowedCustomListsQuery = {
	follows: {
		customLists: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: { name: string; visibility: CustomListVisibility };
				relationships: {
					titlesIds: Array<string>;
					user: { id: string; attributes: { username: string; roles: Array<UserRole> } };
				};
			}>;
		};
	};
};

export type MangaInfoPositionGqlDocSubscriptionVariables = Exact<{ [key: string]: never }>;

export type MangaInfoPositionGqlDocSubscription = { watchMangaInfosPosition: MangaInfosPositions };

export type SetMangaInfoPositionMutationVariables = Exact<{
	position: MangaInfosPositions;
}>;

export type SetMangaInfoPositionMutation = {
	userOption: { setMangaInfosPosition: MangaInfosPositions };
};

export type ListenToChapterReadMarkerSubscriptionVariables = Exact<{
	id: string;
}>;

export type ListenToChapterReadMarkerSubscription = { watchReadMarker: boolean };

export type ListenToAnyChapterReadMarkerSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ListenToAnyChapterReadMarkerSubscription = {
	watchReadMarkers: { chapter: string; read: boolean };
};

export type MutateReadMarkersBatchMutationVariables = Exact<{
	unreads: Array<string> | string;
	read: Array<string> | string;
	updateHistory?: boolean | null | undefined;
}>;

export type MutateReadMarkersBatchMutation = { readMarker: { readMarkersBatch: boolean } };

export type ChaptersReadMarkersQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type ChaptersReadMarkersQuery = { readMarker: { chapterReadMarkers: Array<string> } };

export type MangaReadMarkersQueryVariables = Exact<{
	id: string;
}>;

export type MangaReadMarkersQuery = { readMarker: { mangaReadMarkersByMangaId: Array<string> } };

export type MangasReadMarkersQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type MangasReadMarkersQuery = { readMarker: { mangaReadMarkers: Array<string> } };

export type MangasReadMarkersGroupedQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type MangasReadMarkersGroupedQuery = {
	readMarker: { mangaReadMarkersGrouped: Array<{ mangaId: string; chapters: Array<string> }> };
};

export type ReportAttributesFragFragment = {
	details: string;
	objectId: string;
	status: ReportStatus;
	createdAt: string;
} & { " $fragmentName"?: "ReportAttributesFragFragment" };

export type ReportReasonAttributesFragFragment = {
	reason: Record<string, unknown>;
	category: ReportCategory;
	detailsRequired: boolean;
} & { " $fragmentName"?: "ReportReasonAttributesFragFragment" };

export type CurrentUserReportsQueryVariables = Exact<{
	params?: ListReportParams | null | undefined;
}>;

export type CurrentUserReportsQuery = {
	report: {
		list: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					" $fragmentRefs"?: { ReportAttributesFragFragment: ReportAttributesFragFragment };
				};
			}>;
		};
	};
};

export type CurrentUserReportReasonQueryVariables = Exact<{
	category: ReportCategory;
}>;

export type CurrentUserReportReasonQuery = {
	report: {
		listReasonsByCaterogy: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					" $fragmentRefs"?: {
						ReportReasonAttributesFragFragment: ReportReasonAttributesFragFragment;
					};
				};
			}>;
		};
	};
};

export type SendReportMutationVariables = Exact<{
	params: CreateReportParam;
}>;

export type SendReportMutation = { report: { create: boolean } };

export type GetSidebarDirQueryVariables = Exact<{ [key: string]: never }>;

export type GetSidebarDirQuery = { userOption: { getSidebarDirection: Direction } };

export type RtlSidebarSubSubscriptionVariables = Exact<{ [key: string]: never }>;

export type RtlSidebarSubSubscription = { watchSidebarDirection: Direction };

export type TagPopulatTitlesQueryQueryVariables = Exact<{
	id: string;
	params?: TagPopularList | null | undefined;
}>;

export type TagPopulatTitlesQueryQuery = {
	tag: {
		page: {
			popularInfSection: {
				limit: number;
				offset: number;
				total: number;
				data: Array<{
					id: string;
					attributes: {
						description: Record<string, unknown>;
						year: number | null;
						title: Record<string, unknown>;
						status: MangaStatus;
						state: MangaState;
						originalLanguage: Language;
						contentRating: ContentRating | null;
						tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
					};
					relationships: {
						coverArt: { id: string; attributes: { description: string; fileName: string } };
					};
				}>;
			};
		};
	};
};

export type TagRecentlyPopularQueryQueryVariables = Exact<{
	id: string;
}>;

export type TagRecentlyPopularQueryQuery = {
	tag: {
		page: {
			recentlyAdded: Array<{
				id: string;
				attributes: {
					title: Record<string, unknown>;
					originalLanguage: Language;
					status: MangaStatus;
					description: Record<string, unknown>;
					publicationDemographic: Demographic | null;
					contentRating: ContentRating | null;
					year: number | null;
					altTitles: Array<Record<string, unknown>>;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { fileName: string; description: string } };
					authorArtists: Array<{ id: string; attributes: { name: string } }>;
				};
			}>;
		};
	};
};

export type TagTopTenQueryQueryVariables = Exact<{
	id: string;
}>;

export type TagTopTenQueryQuery = {
	tag: {
		page: {
			topTen: Array<{
				id: string;
				attributes: {
					title: Record<string, unknown>;
					originalLanguage: Language;
					status: MangaStatus;
					description: Record<string, unknown>;
					publicationDemographic: Demographic | null;
					contentRating: ContentRating | null;
					year: number | null;
					altTitles: Array<Record<string, unknown>>;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { fileName: string; description: string } };
					authorArtists: Array<{ id: string; attributes: { name: string } }>;
				};
			}>;
		};
	};
};

export type ExportTitlesToCsvMutationVariables = Exact<{
	options: ExportIdsLibraryToCsvOptions;
}>;

export type ExportTitlesToCsvMutation = { manga: { export: { idsAsCsv: string } } };

export type ExportTitlesToMalMutationVariables = Exact<{
	options: MdidsToMyAnimeListExportOption;
}>;

export type ExportTitlesToMalMutation = { manga: { export: { idsAsMyAnimeList: string } } };

export type UserLoggedChapterFeedQueryVariables = Exact<{
	translatedLanguages?: Array<Language> | Language;
	offset?: number | null | undefined;
	limit?: number | null | undefined;
	order?: MangaFeedSortOrder;
	mangaListParams?: MangaListParams | null | undefined;
}>;

export type UserLoggedChapterFeedQuery = {
	feed: {
		userLoggedMangaFeedGrouped: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				manga: {
					id: string;
					attributes: {
						title: Record<string, unknown>;
						originalLanguage: Language;
						lastVolume: string | null;
						lastChapter: string | null;
					};
					relationships: { coverArt: { id: string; attributes: { fileName: string } } };
				};
				chapters: Array<{
					id: string;
					attributes: {
						title: string | null;
						chapter: string | null;
						volume: string | null;
						translatedLanguage: Language;
						externalUrl: string | null;
						createdAt: string;
						readableAt: string | null;
					};
					relationships: {
						scanlationGroups: Array<{ id: string; attributes: { name: string } }>;
						user: { id: string; attributes: { roles: Array<UserRole>; username: string } };
					};
				}>;
			}>;
		};
	};
};

export type GetMangaHihiQueryVariables = Exact<{
	id: string;
}>;

export type GetMangaHihiQuery = {
	manga: {
		get: {
			id: string;
			attributes: {
				title: Record<string, unknown>;
				altTitles: Array<Record<string, unknown>>;
				state: MangaState;
				status: MangaStatus;
				description: Record<string, unknown>;
				availableTranslatedLanguages: Array<Language> | null;
				year: number | null;
				contentRating: ContentRating | null;
				publicationDemographic: Demographic | null;
				lastVolume: string | null;
				lastChapter: string | null;
				latestUploadedChapter: string | null;
				originalLanguage: Language;
				links: { " $fragmentRefs"?: { MangaLinksFragFragment: MangaLinksFragFragment } } | null;
				tags: Array<{ id: string; attributes: { name: Record<string, unknown>; group: TagGroup } }>;
			};
			relationships: {
				authorArtists: Array<{ id: string; isBlocked: boolean; attributes: { name: string } }>;
				authors: Array<{ id: string; attributes: { name: string } }>;
				artists: Array<{ id: string; attributes: { name: string } }>;
				coverArt: { id: string; attributes: { fileName: string; locale: Language | null } };
				manga: Array<{ id: string; related: MangaRelation }>;
			};
		};
	};
};

export type DownloadTitleWithExtrasMutationVariables = Exact<{
	mangaId: string;
	extras?: MangaDownloadExtras | null | undefined;
}>;

export type DownloadTitleWithExtrasMutation = {
	manga: { download: { isDownloaded: boolean; hasFailed: boolean } };
};

export type FollowTitleMutationMutationVariables = Exact<{
	id: string;
}>;

export type FollowTitleMutationMutation = { manga: { follow: boolean } };

export type UnfollowTitleMutationMutationVariables = Exact<{
	id: string;
}>;

export type UnfollowTitleMutationMutation = { manga: { unfollow: boolean } };

export type IsFollowingTitleQueryQueryVariables = Exact<{
	id: string;
}>;

export type IsFollowingTitleQueryQuery = { follows: { isFollowingManga: boolean } };

export type MangaStatisticsQueryVariables = Exact<{
	id: string;
}>;

export type MangaStatisticsQuery = {
	statistics: {
		manga: {
			get: {
				followCount: number;
				comments: { threadUrl: string; repliesCount: number } | null;
				rating: {
					bayesian: number | null;
					distrubution: {
						r1: number;
						r2: number;
						r3: number;
						r4: number;
						r5: number;
						r6: number;
						r7: number;
						r8: number;
						r9: number;
						r10: number;
					};
				};
			};
		};
	};
};

export type GetMangaTitleOnlyQueryQueryVariables = Exact<{
	mangaId: string;
}>;

export type GetMangaTitleOnlyQueryQuery = {
	manga: { get: { id: string; attributes: { title: Record<string, unknown> } } };
};

export type LatestUploadsPageQueryQueryVariables = Exact<{
	offset?: number | null | undefined;
	limit?: number | null | undefined;
	disableScanlationGroupBlacklist?: boolean | null | undefined;
	disableUserBlacklist?: boolean | null | undefined;
	disableAuthorArtistBlacklist?: boolean | null | undefined;
}>;

export type LatestUploadsPageQueryQuery = {
	chapter: {
		listWithGroupByManga: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				manga: {
					id: string;
					attributes: {
						title: Record<string, unknown>;
						originalLanguage: Language;
						lastVolume: string | null;
						lastChapter: string | null;
					};
					relationships: { coverArt: { id: string; attributes: { fileName: string } } };
				};
				chapters: Array<{
					id: string;
					attributes: {
						title: string | null;
						chapter: string | null;
						volume: string | null;
						translatedLanguage: Language;
						externalUrl: string | null;
						createdAt: string;
						readableAt: string | null;
					};
					relationships: {
						scanlationGroups: Array<{ id: string; attributes: { name: string } }>;
						user: { id: string; attributes: { roles: Array<UserRole>; username: string } };
					};
				}>;
			}>;
		};
	};
};

export type MangaLinksFragFragment = {
	hasNoLinks: boolean;
	amazon: string | null;
	anilist: string | null;
	animePlanet: string | null;
	bookWalker: string | null;
	cdJapan: string | null;
	ebookJapan: string | null;
	englishTranslation: string | null;
	kitsu: string | null;
	mangaUpdates: string | null;
	myAnimeList: string | null;
	novelUpdates: string | null;
	raw: string | null;
} & { " $fragmentName"?: "MangaLinksFragFragment" };

export type RandomTitleQueryVariables = Exact<{
	options?: MangaRandomParams | null | undefined;
}>;

export type RandomTitleQuery = { manga: { random: { id: string } } };

export type RecentlyAddedPageQueryQueryVariables = Exact<{
	params?: MangaListParams | null | undefined;
}>;

export type RecentlyAddedPageQueryQuery = {
	home: {
		recentlyAdded: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type DefaultMangaSearchQueryQueryVariables = Exact<{
	params: MangaListParams;
	excludeContentProfile?: boolean | null | undefined;
	hideReadTitle?: boolean | null | undefined;
	disableAuthorArtistsBlacklist?: boolean | null | undefined;
}>;

export type DefaultMangaSearchQueryQuery = {
	manga: {
		list: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type OfflineMangaSearchQueryQueryVariables = Exact<{
	params: MangaListParams;
	excludeContentProfile?: boolean | null | undefined;
}>;

export type OfflineMangaSearchQueryQuery = {
	manga: {
		listOffline: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type UserFollowedTitlesQueryVariables = Exact<{
	limit?: number | null | undefined;
	offset?: number | null | undefined;
}>;

export type UserFollowedTitlesQuery = {
	follows: {
		mangas: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: {
					description: Record<string, unknown>;
					year: number | null;
					title: Record<string, unknown>;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating: ContentRating | null;
					publicationDemographic: Demographic | null;
					tags: Array<{ id: string; attributes: { name: Record<string, unknown> } }>;
				};
				relationships: {
					coverArt: { id: string; attributes: { description: string; fileName: string } };
				};
			}>;
		};
	};
};

export type CreateInternalSessionMutationMutationVariables = Exact<{
	mangaId: string;
	groups?: Array<string> | string | null | undefined;
}>;

export type CreateInternalSessionMutationMutation = {
	upload: { internal: { createSession: string } };
};

export type InternalQueueEntryStateSubscriptionVariables = Exact<{
	id: string;
}>;

export type InternalQueueEntryStateSubscription = {
	watchInternalUploadQueueState: InternUploadQueueState | null;
};

export type InternalSessionQueueOrderIDsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type InternalSessionQueueOrderIDsSubscription = {
	watchInternalUploadQueueListIds: Array<string>;
};

export type InternalSessionListIDsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type InternalSessionListIDsSubscription = {
	watchInternalUploadSessionsListIds: Array<string>;
};

export type InternalUploadSessionDataSubscriptionVariables = Exact<{
	id: string;
}>;

export type InternalUploadSessionDataSubscription = {
	watchInternalUploadSessionObj: {
		mangaId: string;
		groups: Array<string>;
		images: Array<string>;
		imagesUrl: Array<string>;
		commitData: {
			volume: string | null;
			chapter: string | null;
			title: string | null;
			translatedLanguage: Language;
			externalUrl: string | null;
			publishAt: string | null;
			termsAccepted: boolean | null;
		} | null;
	} | null;
};

export type AddFileInternalSessionMutationVariables = Exact<{
	sessionId: string;
	imgPath: string;
	index?: number | null | undefined;
}>;

export type AddFileInternalSessionMutation = {
	upload: { internal: { session: { addFile: boolean | null } } };
};

export type AddFilesInternalSessionMutationVariables = Exact<{
	sessionId: string;
	imgPaths: Array<string> | string;
	index?: number | null | undefined;
}>;

export type AddFilesInternalSessionMutation = {
	upload: { internal: { session: { addFiles: boolean | null } } };
};

export type RemoveFileInternalSessionMutationVariables = Exact<{
	sessionId: string;
	imgPath: string;
}>;

export type RemoveFileInternalSessionMutation = {
	upload: { internal: { session: { removeFile: boolean | null } } };
};

export type RemoveFilesInternalSessionMutationVariables = Exact<{
	sessionId: string;
	imgPaths: Array<string> | string;
}>;

export type RemoveFilesInternalSessionMutation = {
	upload: { internal: { session: { removeFiles: boolean | null } } };
};

export type RemoveInternalSessionMutationVariables = Exact<{
	sessionId: string;
}>;

export type RemoveInternalSessionMutation = {
	upload: { internal: { session: { remove: boolean | null } } };
};

export type SendInternalSessionInQueueMutationVariables = Exact<{
	sessionId: string;
}>;

export type SendInternalSessionInQueueMutation = {
	upload: { internal: { session: { sendInQueue: boolean | null } } };
};

export type SetCommitDataInternalSessionMutationVariables = Exact<{
	sessionId: string;
	commitData: InternUploadSessionCommitDataInput;
	startRunner?: boolean | null | undefined;
}>;

export type SetCommitDataInternalSessionMutation = {
	upload: { internal: { session: { setCommitData: boolean | null } } };
};

export type SwapInternalUploadSessionFilesMutationVariables = Exact<{
	sessionId: string;
	a: number;
	b: number;
}>;

export type SwapInternalUploadSessionFilesMutation = {
	upload: { internal: { session: { swapFileOrder: boolean | null } } };
};

export type StartInternalQueueRunnerMutationVariables = Exact<{ [key: string]: never }>;

export type StartInternalQueueRunnerMutation = {
	upload: { internal: { startQueueRunner: boolean | null } };
};

export type SwapInternalQueueOrderMutationVariables = Exact<{
	a: string;
	b: string;
}>;

export type SwapInternalQueueOrderMutation = {
	upload: { internal: { swapQueueOrder: boolean | null } };
};

export type FollowUserBatchMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type FollowUserBatchMutation = { user: { followBatch: boolean | null } };

export type UnfollowUserBatchMutationVariables = Exact<{
	ids: Array<string> | string;
}>;

export type UnfollowUserBatchMutation = { user: { unfollowBatch: boolean | null } };

export type GetUsersInfoQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type GetUsersInfoQuery = {
	user: {
		list: { data: Array<{ id: string; attributes: { username: string; roles: Array<UserRole> } }> };
	};
};

export type UserPageQueryQueryVariables = Exact<{
	id: string;
}>;

export type UserPageQueryQuery = {
	user: {
		get: {
			id: string;
			isBlocked: boolean;
			attributes: { username: string; roles: Array<UserRole> };
			relationships: {
				groups: Array<{
					id: string;
					attributes: { name: string };
					relationships: { leader: { id: string } | null };
				}>;
			};
		};
	};
	chapter: { list: { total: number } };
};

export type FollowUserMutationMutationVariables = Exact<{
	id: string;
}>;

export type FollowUserMutationMutation = { user: { follow: boolean } };

export type UnfollowUserMutationMutationVariables = Exact<{
	id: string;
}>;

export type UnfollowUserMutationMutation = { user: { unfollow: boolean } };

export type IsFollowingUserQueryQueryVariables = Exact<{
	id: string;
}>;

export type IsFollowingUserQueryQuery = { follows: { isFollowingUser: boolean } };

export type UserCustomListsQueryVariables = Exact<{
	params: UserCustomListParams;
}>;

export type UserCustomListsQuery = {
	customList: {
		getUserLists: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: { name: string; visibility: CustomListVisibility };
				relationships: { titlesIds: Array<string> };
			}>;
		};
	};
};

export type UserUploadsFeedQueryVariables = Exact<{
	user: string;
	translatedLanguages?: Array<Language> | Language;
	offset?: number | null | undefined;
	limit?: number | null | undefined;
	order?: ChapterSortOrder;
	mangaListParams?: MangaListParams | null | undefined;
	disableScanlationGroupBlacklist?: boolean | null | undefined;
	disableUserBlacklist?: boolean | null | undefined;
	disableAuthorArtistBlacklist?: boolean | null | undefined;
}>;

export type UserUploadsFeedQuery = {
	chapter: {
		listWithGroupByManga: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				manga: {
					id: string;
					attributes: {
						title: Record<string, unknown>;
						originalLanguage: Language;
						lastVolume: string | null;
						lastChapter: string | null;
					};
					relationships: { coverArt: { id: string; attributes: { fileName: string } } };
				};
				chapters: Array<{
					id: string;
					attributes: {
						title: string | null;
						chapter: string | null;
						volume: string | null;
						translatedLanguage: Language;
						externalUrl: string | null;
						createdAt: string;
						readableAt: string | null;
					};
					relationships: {
						scanlationGroups: Array<{ id: string; attributes: { name: string } }>;
						user: { id: string; attributes: { roles: Array<UserRole>; username: string } };
					};
				}>;
			}>;
		};
	};
};

export type UserSearchQueryVariables = Exact<{
	params: UserListParam;
}>;

export type UserSearchQuery = {
	user: {
		list: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{ id: string; attributes: { username: string; roles: Array<UserRole> } }>;
		};
	};
};

export type UserFollowedUsersQueryVariables = Exact<{
	offset?: number | null | undefined;
	limit?: number | null | undefined;
}>;

export type UserFollowedUsersQuery = {
	follows: {
		users: {
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				id: string;
				attributes: { username: string; roles: Array<UserRole> };
				relationships: { groups: Array<{ id: string }> };
			}>;
		};
	};
};

export type UserMeSubscriptionVariables = Exact<{ [key: string]: never }>;

export type UserMeSubscription = { watchUserMe: { username: string; roles: Array<UserRole> } };

export type IsLoggedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type IsLoggedSubscription = { watchIsLogged: boolean };

export type ChapterPagesSubscriptionSubscriptionVariables = Exact<{
	chapter: string;
	mode?: DownloadMode | null | undefined;
}>;

export type ChapterPagesSubscriptionSubscription = {
	getChapterPages: {
		pages: number;
		index: number;
		url: string;
		size: { width: number; height: number } | null;
	};
};

export type StartChapterPagesCachingMutationVariables = Exact<{
	chapter: string;
	mode?: DownloadMode | null | undefined;
}>;

export type StartChapterPagesCachingMutation = {
	chapter: { pagesCache: { startCaching: boolean } };
};

export type FetchingChapterPagesMetadataMutationVariables = Exact<{
	chapter: string;
	mode?: DownloadMode | null | undefined;
}>;

export type FetchingChapterPagesMetadataMutation = {
	chapter: { pagesCache: { fetchMetadata: boolean } };
};

export type RefetchChapterPageMutationVariables = Exact<{
	chapter: string;
	mode?: DownloadMode | null | undefined;
	page: number;
}>;

export type RefetchChapterPageMutation = { chapter: { pagesCache: { refetchPage: boolean } } };

export type ResendChapterPageMutationVariables = Exact<{
	chapter: string;
	mode?: DownloadMode | null | undefined;
	page: number;
}>;

export type ResendChapterPageMutation = { chapter: { pagesCache: { resendPage: boolean } } };

export type ResendChapterPagesMutationVariables = Exact<{
	chapter: string;
	mode?: DownloadMode | null | undefined;
}>;

export type ResendChapterPagesMutation = { chapter: { pagesCache: { resendAll: boolean } } };

export type RefetchIncompletesPagesMutationVariables = Exact<{
	chapter: string;
	mode?: DownloadMode | null | undefined;
}>;

export type RefetchIncompletesPagesMutation = {
	chapter: { pagesCache: { refetchIncompletes: boolean } };
};

export type ChapterFeedStyleSubSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ChapterFeedStyleSubSubscription = { watchChapterFeedStyle: ChapterFeedStyle };

export type UpdateChapterFeedStyleMutationVariables = Exact<{
	style: ChapterFeedStyle;
}>;

export type UpdateChapterFeedStyleMutation = {
	userOption: { setChapterFeedStyle: ChapterFeedStyle };
};

export type ChapterLayoutSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ChapterLayoutSubscriptionSubscription = {
	watchChapterLayout: { drawer: DrawerMode; sidebar: SidebarMode; progress: ProgressMode };
};

export type SetChapterLayoutMutationVariables = Exact<{
	sidebar?: SidebarMode | null | undefined;
	drawer?: DrawerMode | null | undefined;
	progress?: ProgressMode | null | undefined;
}>;

export type SetChapterLayoutMutation = {
	userOption: {
		setChapterLayout: { sidebar: SidebarMode; drawer: DrawerMode; progress: ProgressMode };
	};
};

export type ChapterQualitySubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ChapterQualitySubscriptionSubscription = { watchChapterQuality: DownloadMode };

export type ChapterQualityMutationMutationVariables = Exact<{
	quality?: DownloadMode | null | undefined;
}>;

export type ChapterQualityMutationMutation = { userOption: { setChapterQuality: DownloadMode } };

export type ClientInfoFragFragment = { clientId: string; clientSecret: string } & {
	" $fragmentName"?: "ClientInfoFragFragment";
};

export type CurrentClientInfoSubscriptionVariables = Exact<{ [key: string]: never }>;

export type CurrentClientInfoSubscription = {
	watchClientInfo: { " $fragmentRefs"?: { ClientInfoFragFragment: ClientInfoFragFragment } } | null;
};

export type SetAuthClientMutationVariables = Exact<{
	clientId: string;
	clientSecret: string;
}>;

export type SetAuthClientMutation = { oauth: { setClientInfo: boolean } };

export type ResetAuthClientMutationVariables = Exact<{ [key: string]: never }>;

export type ResetAuthClientMutation = { oauth: { clearClientInfo: boolean } };

export type CreateForumThreadMutationVariables = Exact<{
	id: string;
	threadType: ForumThreadType;
}>;

export type CreateForumThreadMutation = {
	forums: { createThread: { forumId: number; forumUrl: string; repliesCount: number } };
};

export type MangaFollowingStatusSubscriptionSubscriptionVariables = Exact<{
	id: string;
}>;

export type MangaFollowingStatusSubscriptionSubscription = { watchIsFollowingManga: boolean };

export type MangaFollowingStatusQueryQueryVariables = Exact<{
	id: string;
}>;

export type MangaFollowingStatusQueryQuery = { follows: { isFollowingManga: boolean } };

export type FollowMangaMutationMutationVariables = Exact<{
	id: string;
}>;

export type FollowMangaMutationMutation = { manga: { follow: boolean } };

export type UnfollowMangaMutationMutationVariables = Exact<{
	id: string;
}>;

export type UnfollowMangaMutationMutation = { manga: { unfollow: boolean } };

export type MangaRatingSubscriptionSubscriptionVariables = Exact<{
	id: string;
}>;

export type MangaRatingSubscriptionSubscription = { watchRating: { rating: number } };

export type GetMangaRatingQueryVariables = Exact<{
	id: string;
}>;

export type GetMangaRatingQuery = { rating: { lists: Array<{ rating: number }> } };

export type UpdateMangaRatingMutationVariables = Exact<{
	id: string;
	rating: number;
}>;

export type UpdateMangaRatingMutation = { rating: { createUpdate: boolean } };

export type DeleteMangaRatingMutationVariables = Exact<{
	id: string;
}>;

export type DeleteMangaRatingMutation = { rating: { delete: boolean } };

export type MangaReadingStatusSubscriptionSubscriptionVariables = Exact<{
	id: string;
}>;

export type MangaReadingStatusSubscriptionSubscription = {
	watchMangaReadingState: ReadingStatus | null;
};

export type MangaReadingStatusQueryQueryVariables = Exact<{
	id: string;
}>;

export type MangaReadingStatusQueryQuery = { manga: { readingStatus: ReadingStatus | null } };

export type MangaReadingStatusMutationMutationVariables = Exact<{
	id: string;
	status?: ReadingStatus | null | undefined;
}>;

export type MangaReadingStatusMutationMutation = { manga: { updateReadingStatus: boolean } };

export type OfflineConfigQueryVariables = Exact<{ [key: string]: never }>;

export type OfflineConfigQuery = {
	userOption: {
		getOfflineConfig: {
			dataDir: string;
			mangasDir: string;
			coversDir: string;
			chaptersDir: string;
		};
	};
};

export type UpdateOfflineConfigMutationVariables = Exact<{
	cfg: OfflineConfigInput;
}>;

export type UpdateOfflineConfigMutation = {
	userOption: {
		setOfflineConfig: {
			dataDir: string;
			mangasDir: string;
			coversDir: string;
			chaptersDir: string;
		};
	};
};

export type ServerIconStateSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ServerIconStateSubscription = { watchIsAppMounted: boolean };

export type PageLimitSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type PageLimitSubscriptionSubscription = { watchPageLimit: number };

export type SetPageLimitMutationVariables = Exact<{
	limit?: number | null | undefined;
}>;

export type SetPageLimitMutation = { userOption: { setPageLimit: number | null } };

export type PaginationStyleUpdateSubscriptionVariables = Exact<{ [key: string]: never }>;

export type PaginationStyleUpdateSubscription = { watchPaginationStyle: PaginationStyle };

export type UpdatePaginationStyleMutationVariables = Exact<{
	style: PaginationStyle;
}>;

export type UpdatePaginationStyleMutation = { userOption: { setPaginationStyle: PaginationStyle } };

export type UpdateToastNotifyMutationVariables = Exact<{
	notify: boolean;
}>;

export type UpdateToastNotifyMutation = { userOption: { setToastNotify: boolean } };

export type ListenToToastNotifyStoreSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ListenToToastNotifyStoreSubscription = { watchNotifyToast: boolean };

export type DefaultThemeProfileSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type DefaultThemeProfileSubscriptionSubscription = {
	watchThemeProfileDefault: {
		" $fragmentRefs"?: { MangaDexThemeFragFragment: MangaDexThemeFragFragment };
	};
};

export type UpdateDefaultThemeMutationVariables = Exact<{
	theme: MangaDexThemeInput;
}>;

export type UpdateDefaultThemeMutation = {
	userOption: {
		updateDefaultTheme: {
			" $fragmentRefs"?: { MangaDexThemeFragFragment: MangaDexThemeFragFragment };
		};
	};
};

export type DefaultThemeProfileKeySubscriptionSubscriptionVariables = Exact<{
	[key: string]: never;
}>;

export type DefaultThemeProfileKeySubscriptionSubscription = {
	watchThemeProfileDefaultName: string | null;
};

export type UpdateDefaultThemeProfileKeyMutationVariables = Exact<{
	key?: string | null | undefined;
}>;

export type UpdateDefaultThemeProfileKeyMutation = {
	userOption: { setDefaultThemeProfile: string | null };
};

export type MangaDexThemeFragFragment = {
	textColor: string;
	mainBackground: string;
	midTone: string;
	accents: {
		default: { default: string; hover: string; active: string };
		l1: { default: string; hover: string; active: string };
		l2: { default: string; hover: string; active: string };
		l3: { default: string; hover: string; active: string };
		l4: { default: string; hover: string; active: string };
		l5: { default: string; hover: string; active: string };
	};
	contrast: { l1: string };
	scrollbar: { default: string; hovered: string };
	button: { default: string; alternate: string };
	primary: { primary: string; primary1: string; primary2: string };
	status: {
		red: string;
		grey: string;
		green: string;
		yellow: string;
		blue: string;
		purple: string;
	};
	indication: { blue: string };
	danger: { default: string; l1: string; l2: string };
} & { " $fragmentName"?: "MangaDexThemeFragFragment" };

export type ThemeProfilesSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ThemeProfilesSubscriptionSubscription = {
	watchThemesProfile: Array<{
		name: string;
		value: { " $fragmentRefs"?: { MangaDexThemeFragFragment: MangaDexThemeFragFragment } };
	}>;
};

export type UpdateThemeProfilesMutationVariables = Exact<{
	themes: Array<ThemeProfileEntryInput> | ThemeProfileEntryInput;
}>;

export type UpdateThemeProfilesMutation = { userOption: { setThemeProfiles: number } };

export type UpdateThemeProfileMutationVariables = Exact<{
	name: string;
	theme?: MangaDexThemeInput | null | undefined;
}>;

export type UpdateThemeProfileMutation = {
	userOption: {
		setThemeProfile: {
			" $fragmentRefs"?: { MangaDexThemeFragFragment: MangaDexThemeFragFragment };
		};
	};
};

export type FaviconQueryVariables = Exact<{
	url: string;
}>;

export type FaviconQuery = { utils: { favicon: string } };

export type GetAuthExpirationQueryVariables = Exact<{ [key: string]: never }>;

export type GetAuthExpirationQuery = { userOption: { getAuthDateTimeLimit: string | null } };

export type MountAppStateMutationVariables = Exact<{ [key: string]: never }>;

export type MountAppStateMutation = { offlineAppState: { mountOfflineAppState: boolean } };

export type UnmountAppStateMutationVariables = Exact<{ [key: string]: never }>;

export type UnmountAppStateMutation = { offlineAppState: { unmountOfflineAppState: boolean } };

export type ChaptersStatsQueryVariables = Exact<{
	ids: Array<string> | string;
}>;

export type ChaptersStatsQuery = {
	statistics: {
		chapter: {
			list: Array<{ id: string; comments: { threadUrl: string; repliesCount: number } | null }>;
		};
	};
};

export const ContentProfileItemFragmentDoc = {
	kind: "Document",
	definitions: [
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ContentProfileItem" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ContentProfile" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "originalLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "publicationDemographic" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "status" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedOriginalLanguage" } },
					{ kind: "Field", name: { kind: "Name", value: "translatedLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedGroups" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedUploaders" } }
				]
			}
		}
	]
} as unknown as DocumentNode<ContentProfileItemFragment, unknown>;
export const ReportAttributesFragFragmentDoc = {
	kind: "Document",
	definitions: [
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ReportAttributesFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ReportAttributes" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "details" } },
					{ kind: "Field", name: { kind: "Name", value: "objectId" } },
					{ kind: "Field", name: { kind: "Name", value: "status" } },
					{ kind: "Field", name: { kind: "Name", value: "createdAt" } }
				]
			}
		}
	]
} as unknown as DocumentNode<ReportAttributesFragFragment, unknown>;
export const ReportReasonAttributesFragFragmentDoc = {
	kind: "Document",
	definitions: [
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ReportReasonAttributesFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ReportReasonAttributes" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "reason" } },
					{ kind: "Field", name: { kind: "Name", value: "category" } },
					{ kind: "Field", name: { kind: "Name", value: "detailsRequired" } }
				]
			}
		}
	]
} as unknown as DocumentNode<ReportReasonAttributesFragFragment, unknown>;
export const MangaLinksFragFragmentDoc = {
	kind: "Document",
	definitions: [
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "MangaLinksFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "MangaLinks" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "hasNoLinks" } },
					{ kind: "Field", name: { kind: "Name", value: "amazon" } },
					{ kind: "Field", name: { kind: "Name", value: "anilist" } },
					{ kind: "Field", name: { kind: "Name", value: "animePlanet" } },
					{ kind: "Field", name: { kind: "Name", value: "bookWalker" } },
					{ kind: "Field", name: { kind: "Name", value: "cdJapan" } },
					{ kind: "Field", name: { kind: "Name", value: "ebookJapan" } },
					{ kind: "Field", name: { kind: "Name", value: "englishTranslation" } },
					{ kind: "Field", name: { kind: "Name", value: "kitsu" } },
					{ kind: "Field", name: { kind: "Name", value: "mangaUpdates" } },
					{ kind: "Field", name: { kind: "Name", value: "myAnimeList" } },
					{ kind: "Field", name: { kind: "Name", value: "novelUpdates" } },
					{ kind: "Field", name: { kind: "Name", value: "raw" } }
				]
			}
		}
	]
} as unknown as DocumentNode<MangaLinksFragFragment, unknown>;
export const ClientInfoFragFragmentDoc = {
	kind: "Document",
	definitions: [
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ClientInfoFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ClientInfo" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "clientId" } },
					{ kind: "Field", name: { kind: "Name", value: "clientSecret" } }
				]
			}
		}
	]
} as unknown as DocumentNode<ClientInfoFragFragment, unknown>;
export const MangaDexThemeFragFragmentDoc = {
	kind: "Document",
	definitions: [
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "MangaDexThemeFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "MangaDexTheme" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "textColor" } },
					{ kind: "Field", name: { kind: "Name", value: "mainBackground" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "accents" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "default" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l1" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l2" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l3" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l4" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l5" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								}
							]
						}
					},
					{ kind: "Field", name: { kind: "Name", value: "midTone" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "contrast" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "l1" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "scrollbar" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "hovered" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "button" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "alternate" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "primary" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "primary" } },
								{ kind: "Field", name: { kind: "Name", value: "primary1" } },
								{ kind: "Field", name: { kind: "Name", value: "primary2" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "status" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "red" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "green" } },
								{ kind: "Field", name: { kind: "Name", value: "yellow" } },
								{ kind: "Field", name: { kind: "Name", value: "blue" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "purple" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "indication" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "blue" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "danger" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "l1" } },
								{ kind: "Field", name: { kind: "Name", value: "l2" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangaDexThemeFragFragment, unknown>;
export const CustomlistPageQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "customlistPageQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "private" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "get" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "private" },
											value: { kind: "Variable", name: { kind: "Name", value: "private" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "visibility" } }
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "titlesIds" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "user" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "username" }
																				},
																				{ kind: "Field", name: { kind: "Name", value: "roles" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CustomlistPageQueryQuery, CustomlistPageQueryQueryVariables>;
export const IsChapterDownloadedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "isChapterDownloaded" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "isDownloaded" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } },
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<IsChapterDownloadedQuery, IsChapterDownloadedQueryVariables>;
export const WatchChapterDownloadStateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "watchChapterDownloadState" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchDownloadState" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "objectId" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "hasFailed" } },
								{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	WatchChapterDownloadStateSubscription,
	WatchChapterDownloadStateSubscriptionVariables
>;
export const RecentlyAddedHomeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "recentlyAddedHome" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "home" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "recentlyUploaded" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "pages" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "translatedLanguage" }
																	},
																	{ kind: "Field", name: { kind: "Name", value: "readableAt" } },
																	{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																	{ kind: "Field", name: { kind: "Name", value: "volume" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "scanlationGroups" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "user" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "username" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "roles" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "manga" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "title" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "lastChapter" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "lastVolume" }
																							}
																						]
																					}
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "relationships" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "coverArt" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "id" }
																										},
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "attributes" },
																											selectionSet: {
																												kind: "SelectionSet",
																												selections: [
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "fileName"
																														}
																													}
																												]
																											}
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<RecentlyAddedHomeQuery, RecentlyAddedHomeQueryVariables>;
export const HomePopularTitleDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "homePopularTitle" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "home" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "popularTitles" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{ kind: "Field", name: { kind: "Name", value: "description" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "authorArtists" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<HomePopularTitleQuery, HomePopularTitleQueryVariables>;
export const RecentlyAddedHomeQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "recentlyAddedHomeQuery" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "home" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "recentlyAdded" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "IntValue", value: "15" }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "title" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<RecentlyAddedHomeQueryQuery, RecentlyAddedHomeQueryQueryVariables>;
export const SeasonalDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "seasonal" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "home" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "seasonal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "titles" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "altTitles" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "description" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "coverArt" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "fileName" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SeasonalQuery, SeasonalQueryVariables>;
export const StaffPicksDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "staffPicks" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "home" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "staffPicks" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "titles" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "altTitles" }
																				},
																				{ kind: "Field", name: { kind: "Name", value: "state" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "description" }
																				},
																				{ kind: "Field", name: { kind: "Name", value: "status" } },
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "availableTranslatedLanguages"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "coverArt" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "fileName" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<StaffPicksQuery, StaffPicksQueryVariables>;
export const GetUserLoggedCustomListsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getUserLoggedCustomLists" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "currentLoggedLists" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: { kind: "Variable", name: { kind: "Name", value: "offset" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "visibility" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "titlesIds" } }
																]
															}
														}
													]
												}
											},
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetUserLoggedCustomListsQuery, GetUserLoggedCustomListsQueryVariables>;
export const AddOrRemoveTitleToCustomListDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "addOrRemoveTitleToCustomList" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "manga_id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "addTo" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "removeFrom" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "addToListBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "customLists" },
											value: { kind: "Variable", name: { kind: "Name", value: "addTo" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaId" },
											value: { kind: "Variable", name: { kind: "Name", value: "manga_id" } }
										}
									]
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "removeFromListBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "customLists" },
											value: { kind: "Variable", name: { kind: "Name", value: "removeFrom" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaId" },
											value: { kind: "Variable", name: { kind: "Name", value: "manga_id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	AddOrRemoveTitleToCustomListMutation,
	AddOrRemoveTitleToCustomListMutationVariables
>;
export const CreateCustomListDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "createCustomList" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangaId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "visibility" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "CustomListVisibility" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "create" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "manga" },
														value: {
															kind: "ListValue",
															values: [
																{ kind: "Variable", name: { kind: "Name", value: "mangaId" } }
															]
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "visibility" },
														value: { kind: "Variable", name: { kind: "Name", value: "visibility" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "name" },
														value: { kind: "Variable", name: { kind: "Name", value: "name" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CreateCustomListMutation, CreateCustomListMutationVariables>;
export const CreateEmptyCustomListDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "createEmptyCustomList" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "visibility" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "CustomListVisibility" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "create" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "visibility" },
														value: { kind: "Variable", name: { kind: "Name", value: "visibility" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "name" },
														value: { kind: "Variable", name: { kind: "Name", value: "name" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CreateEmptyCustomListMutation, CreateEmptyCustomListMutationVariables>;
export const MangaListMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "mangaListMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "style" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "MangaListStyle" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setMangaListStyle" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaListStyle" },
											value: { kind: "Variable", name: { kind: "Name", value: "style" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangaListMutationMutation, MangaListMutationMutationVariables>;
export const MangaListStyleSubDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "mangaListStyleSub" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchMangaListStyle" } }]
			}
		}
	]
} as unknown as DocumentNode<MangaListStyleSubSubscription, MangaListStyleSubSubscriptionVariables>;
export const MangaAggregateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "mangaAggregate" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "size" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
					defaultValue: { kind: "IntValue", value: "3" }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "aggregate" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "chunked" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "chunkSize" },
														value: { kind: "Variable", name: { kind: "Name", value: "size" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "isReversed" },
														value: { kind: "BooleanValue", value: true }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "ids" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "volumes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "volume" } },
																	{ kind: "Field", name: { kind: "Name", value: "count" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "chapters" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																				{ kind: "Field", name: { kind: "Name", value: "count" } },
																				{ kind: "Field", name: { kind: "Name", value: "ids" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangaAggregateQuery, MangaAggregateQueryVariables>;
export const GetMangaAggregateChapterDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getMangaAggregateChapter" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "feedContent" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "chapterIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "includeExternalUrl" },
														value: { kind: "EnumValue", value: "EXCLUDE" }
													}
												]
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "feedContent" },
											value: { kind: "Variable", name: { kind: "Name", value: "feedContent" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "volume" } },
																	{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "translatedLanguage" }
																	},
																	{ kind: "Field", name: { kind: "Name", value: "readableAt" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "scanlationGroups" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "user" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "username" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "roles" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetMangaAggregateChapterQuery, GetMangaAggregateChapterQueryVariables>;
export const ChapterAggregateCommentsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "chapterAggregateComments" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "statistics" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "chapter" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "list" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "ids" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "comments" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "threadUrl" } },
																	{ kind: "Field", name: { kind: "Name", value: "repliesCount" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ChapterAggregateCommentsQuery, ChapterAggregateCommentsQueryVariables>;
export const GetMangaCoversDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getMangaCovers" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
					defaultValue: { kind: "IntValue", value: "0" }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
					defaultValue: { kind: "IntValue", value: "10" }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "cover" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaIds" },
														value: {
															kind: "ListValue",
															values: [{ kind: "Variable", name: { kind: "Name", value: "id" } }]
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: { kind: "Variable", name: { kind: "Name", value: "offset" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "order" },
														value: {
															kind: "ObjectValue",
															fields: [
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "volume" },
																	value: { kind: "EnumValue", value: "ASCENDING" }
																}
															]
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "fileName" } },
																	{ kind: "Field", name: { kind: "Name", value: "volume" } },
																	{ kind: "Field", name: { kind: "Name", value: "locale" } }
																]
															}
														}
													]
												}
											},
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "limit" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetMangaCoversQuery, GetMangaCoversQueryVariables>;
export const GetRelatedTitlesDataDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getRelatedTitlesData" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "description" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetRelatedTitlesDataQuery, GetRelatedTitlesDataQueryVariables>;
export const GetMangatoReadAggregateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getMangatoReadAggregate" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "aggregate" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "default" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "volumes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "volume" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "chapters" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "ids" } },
																				{ kind: "Field", name: { kind: "Name", value: "count" } },
																				{ kind: "Field", name: { kind: "Name", value: "chapter" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetMangatoReadAggregateQuery, GetMangatoReadAggregateQueryVariables>;
export const AuthorSearchFetcherDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "authorSearchFetcher" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
					},
					defaultValue: { kind: "IntValue", value: "0" }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
					},
					defaultValue: { kind: "IntValue", value: "10" }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "author" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "name" },
														value: { kind: "Variable", name: { kind: "Name", value: "name" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: { kind: "Variable", name: { kind: "Name", value: "offset" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } }
																]
															}
														}
													]
												}
											},
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AuthorSearchFetcherQuery, AuthorSearchFetcherQueryVariables>;
export const MultiChapterDownloadBaseDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "multiChapterDownloadBase" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "download" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } },
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	MultiChapterDownloadBaseMutation,
	MultiChapterDownloadBaseMutationVariables
>;
export const MultiChapterCancelDownloadBaseDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "multiChapterCancelDownloadBase" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "cancelDownload" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	MultiChapterCancelDownloadBaseMutation,
	MultiChapterCancelDownloadBaseMutationVariables
>;
export const RemoveMultipleChapterMutationBaseDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "removeMultipleChapterMutationBase" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "remove" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	RemoveMultipleChapterMutationBaseMutation,
	RemoveMultipleChapterMutationBaseMutationVariables
>;
export const JustDownloadingTitleDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "justDownloadingTitle" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "download" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } },
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<JustDownloadingTitleMutation, JustDownloadingTitleMutationVariables>;
export const AddTitleToListBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "addTitleToListBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangas" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "customList" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "addMangaBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "listId" },
											value: { kind: "Variable", name: { kind: "Name", value: "customList" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaIds" },
											value: { kind: "Variable", name: { kind: "Name", value: "mangas" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AddTitleToListBatchMutation, AddTitleToListBatchMutationVariables>;
export const GetTitleTitlesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getTitleTitles" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "titles" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "titles" } }
													}
												]
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "excludeContentProfile" },
											value: { kind: "BooleanValue", value: true }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "title" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetTitleTitlesQuery, GetTitleTitlesQueryVariables>;
export const UpdateReadingStatusesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateReadingStatuses" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "titles" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "status" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "ReadingStatus" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "updateReadingStatusBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaIds" },
											value: { kind: "Variable", name: { kind: "Name", value: "titles" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "status" },
											value: { kind: "Variable", name: { kind: "Name", value: "status" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateReadingStatusesMutation, UpdateReadingStatusesMutationVariables>;
export const FollowTitlesBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "followTitlesBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "titles" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "followBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaIds" },
											value: { kind: "Variable", name: { kind: "Name", value: "titles" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<FollowTitlesBatchMutation, FollowTitlesBatchMutationVariables>;
export const UnfollowTitlesBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unfollowTitlesBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "titles" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfollowBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaIds" },
											value: { kind: "Variable", name: { kind: "Name", value: "titles" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnfollowTitlesBatchMutation, UnfollowTitlesBatchMutationVariables>;
export const UserMeOnSidebarFooterDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userMeOnSidebarFooter" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "user" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "me" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "username" } },
														{ kind: "Field", name: { kind: "Name", value: "roles" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserMeOnSidebarFooterQuery, UserMeOnSidebarFooterQueryVariables>;
export const SetSidebarDirectionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setSidebarDirection" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "direction" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Direction" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setSidebarDirection" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "direction" },
											value: { kind: "Variable", name: { kind: "Name", value: "direction" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SetSidebarDirectionMutation, SetSidebarDirectionMutationVariables>;
export const WatchDefaultContentProfileDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "watchDefaultContentProfile" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchContentProfileDefault" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "ContentProfileItem" } }
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ContentProfileItem" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ContentProfile" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "originalLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "publicationDemographic" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "status" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedOriginalLanguage" } },
					{ kind: "Field", name: { kind: "Name", value: "translatedLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedGroups" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedUploaders" } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	WatchDefaultContentProfileSubscription,
	WatchDefaultContentProfileSubscriptionVariables
>;
export const UpdateDefaultContentProfileDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateDefaultContentProfile" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "entry" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ContentProfileInput" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "updateDefaultContentProfile" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "profile" },
											value: { kind: "Variable", name: { kind: "Name", value: "entry" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "FragmentSpread",
												name: { kind: "Name", value: "ContentProfileItem" }
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ContentProfileItem" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ContentProfile" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "originalLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "publicationDemographic" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "status" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedOriginalLanguage" } },
					{ kind: "Field", name: { kind: "Name", value: "translatedLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedGroups" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedUploaders" } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	UpdateDefaultContentProfileMutation,
	UpdateDefaultContentProfileMutationVariables
>;
export const GetDefaultContentProfileDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getDefaultContentProfile" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "getDefaultContentProfile" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "FragmentSpread",
												name: { kind: "Name", value: "ContentProfileItem" }
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ContentProfileItem" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ContentProfile" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "originalLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "publicationDemographic" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "status" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedOriginalLanguage" } },
					{ kind: "Field", name: { kind: "Name", value: "translatedLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedGroups" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedUploaders" } }
				]
			}
		}
	]
} as unknown as DocumentNode<GetDefaultContentProfileQuery, GetDefaultContentProfileQueryVariables>;
export const WatchDefaultContentProfileKeyDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "watchDefaultContentProfileKey" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchContentProfileDefaultName" } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	WatchDefaultContentProfileKeySubscription,
	WatchDefaultContentProfileKeySubscriptionVariables
>;
export const UpdateDefaultContentProfileKeyDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateDefaultContentProfileKey" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setDefaultContentProfileKey" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "name" },
											value: { kind: "Variable", name: { kind: "Name", value: "name" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UpdateDefaultContentProfileKeyMutation,
	UpdateDefaultContentProfileKeyMutationVariables
>;
export const WatchContentProfilesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "watchContentProfiles" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchContentProfiles" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "name" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "value" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "FragmentSpread",
												name: { kind: "Name", value: "ContentProfileItem" }
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ContentProfileItem" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ContentProfile" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "originalLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "publicationDemographic" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "status" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedOriginalLanguage" } },
					{ kind: "Field", name: { kind: "Name", value: "translatedLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedGroups" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedUploaders" } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	WatchContentProfilesSubscription,
	WatchContentProfilesSubscriptionVariables
>;
export const UpdateContentProfilesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateContentProfiles" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "entries" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "ContentProfileEntryInput" }
								}
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setContentProfiles" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "entries" },
											value: { kind: "Variable", name: { kind: "Name", value: "entries" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateContentProfilesMutation, UpdateContentProfilesMutationVariables>;
export const UpdateContentProfileDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateContentProfile" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "entry" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "ContentProfileInput" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setContentProfile" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "name" },
											value: { kind: "Variable", name: { kind: "Name", value: "name" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "profile" },
											value: { kind: "Variable", name: { kind: "Name", value: "entry" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "FragmentSpread",
												name: { kind: "Name", value: "ContentProfileItem" }
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ContentProfileItem" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ContentProfile" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "originalLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "publicationDemographic" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "includedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTags" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedTagsMode" } },
					{ kind: "Field", name: { kind: "Name", value: "status" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedOriginalLanguage" } },
					{ kind: "Field", name: { kind: "Name", value: "translatedLanguages" } },
					{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedGroups" } },
					{ kind: "Field", name: { kind: "Name", value: "excludedUploaders" } }
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateContentProfileMutation, UpdateContentProfileMutationVariables>;
export const DownloadChapterMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "downloadChapterMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "quality" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "download" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "quality" },
											value: { kind: "Variable", name: { kind: "Name", value: "quality" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } },
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	DownloadChapterMutationMutation,
	DownloadChapterMutationMutationVariables
>;
export const CancelDownloadChapterMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "cancelDownloadChapterMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "cancelDownload" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	CancelDownloadChapterMutationMutation,
	CancelDownloadChapterMutationMutationVariables
>;
export const ChapterDownloadStateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "chapterDownloadState" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "deferred" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchChapterDownloadState" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "chapterId" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "deferred" },
								value: { kind: "Variable", name: { kind: "Name", value: "deferred" } }
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "isPending" } },
								{ kind: "Field", name: { kind: "Name", value: "isDone" } },
								{ kind: "Field", name: { kind: "Name", value: "isCanceled" } },
								{ kind: "Field", name: { kind: "Name", value: "isOfflineAppStateNotLoaded" } },
								{ kind: "Field", name: { kind: "Name", value: "error" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "downloading" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "isPreloading" } },
											{ kind: "Field", name: { kind: "Name", value: "isFetchingData" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "fetchingImage" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "filename" } },
														{ kind: "Field", name: { kind: "Name", value: "index" } },
														{ kind: "Field", name: { kind: "Name", value: "len" } }
													]
												}
											},
											{ kind: "Field", name: { kind: "Name", value: "isFetchingAtHomeData" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ChapterDownloadStateSubscription,
	ChapterDownloadStateSubscriptionVariables
>;
export const RemoveDownloadedChapterDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "removeDownloadedChapter" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "remove" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	RemoveDownloadedChapterMutation,
	RemoveDownloadedChapterMutationVariables
>;
export const ChapterDownloadStateQDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "chapterDownloadStateQ" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "downloadState" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "chapter" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "chapterId" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } },
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ChapterDownloadStateQQuery, ChapterDownloadStateQQueryVariables>;
export const DownloadCoverDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "downloadCover" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "cover" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "download" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } },
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<DownloadCoverMutation, DownloadCoverMutationVariables>;
export const CancelDownloadCoverDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "cancelDownloadCover" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "cover" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "cancelDownload" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CancelDownloadCoverMutation, CancelDownloadCoverMutationVariables>;
export const CoverDownloadStateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "coverDownloadState" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "downloadState" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "cover" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "coverId" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } },
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CoverDownloadStateQuery, CoverDownloadStateQueryVariables>;
export const CoverDownloadSubDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "coverDownloadSub" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "deferred" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchCoverDownloadState" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "coverId" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "deferred" },
								value: { kind: "Variable", name: { kind: "Name", value: "deferred" } }
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "isDone" } },
								{ kind: "Field", name: { kind: "Name", value: "isPending" } },
								{ kind: "Field", name: { kind: "Name", value: "isCanceled" } },
								{ kind: "Field", name: { kind: "Name", value: "isOfflineAppStateNotLoaded" } },
								{ kind: "Field", name: { kind: "Name", value: "downloading" } },
								{ kind: "Field", name: { kind: "Name", value: "error" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CoverDownloadSubSubscription, CoverDownloadSubSubscriptionVariables>;
export const CoverRemoveMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "coverRemoveMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "cover" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "remove" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CoverRemoveMutationMutation, CoverRemoveMutationMutationVariables>;
export const DownloadMangaDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "downloadManga" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "download" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } },
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<DownloadMangaMutation, DownloadMangaMutationVariables>;
export const CancelDownloadMangaDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "cancelDownloadManga" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "cancelDownload" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CancelDownloadMangaMutation, CancelDownloadMangaMutationVariables>;
export const MangaDownloadStateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "mangaDownloadState" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "downloadState" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "manga" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaId" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } },
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangaDownloadStateQuery, MangaDownloadStateQueryVariables>;
export const MangaDownloadSubDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "mangaDownloadSub" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "deferred" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchMangaDownloadState" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "mangaId" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "deferred" },
								value: { kind: "Variable", name: { kind: "Name", value: "deferred" } }
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "isDone" } },
								{ kind: "Field", name: { kind: "Name", value: "isPending" } },
								{ kind: "Field", name: { kind: "Name", value: "isCanceled" } },
								{ kind: "Field", name: { kind: "Name", value: "isOfflineAppStateNotLoaded" } },
								{ kind: "Field", name: { kind: "Name", value: "downloading" } },
								{ kind: "Field", name: { kind: "Name", value: "error" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangaDownloadSubSubscription, MangaDownloadSubSubscriptionVariables>;
export const MangaRemoveMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "mangaRemoveMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "remove" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangaRemoveMutationMutation, MangaRemoveMutationMutationVariables>;
export const AllTagsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "allTags" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "tag" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "group" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AllTagsQuery, AllTagsQueryVariables>;
export const AuthCheckDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "authCheck" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "auth" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "check" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "isAuthenticated" } },
											{ kind: "Field", name: { kind: "Name", value: "roles" } },
											{ kind: "Field", name: { kind: "Name", value: "permissions" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AuthCheckQuery, AuthCheckQueryVariables>;
export const LoginMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "loginMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "username" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Username" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "password" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Password" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "oauth" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "login" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "password" },
											value: { kind: "Variable", name: { kind: "Name", value: "password" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "username" },
											value: { kind: "Variable", name: { kind: "Name", value: "username" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LoginMutationMutation, LoginMutationMutationVariables>;
export const LogoutMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "logoutMutation" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "oauth" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "logout" } }]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LogoutMutationMutation, LogoutMutationMutationVariables>;
export const AuthorPageQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "authorPageQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "author" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "get" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{ kind: "Field", name: { kind: "Name", value: "isBlocked" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "imageUrl" } },
														{ kind: "Field", name: { kind: "Name", value: "biography" } },
														{ kind: "Field", name: { kind: "Name", value: "twitter" } },
														{ kind: "Field", name: { kind: "Name", value: "pixiv" } },
														{ kind: "Field", name: { kind: "Name", value: "melonBook" } },
														{ kind: "Field", name: { kind: "Name", value: "fanBox" } },
														{ kind: "Field", name: { kind: "Name", value: "booth" } },
														{ kind: "Field", name: { kind: "Name", value: "nicoVideo" } },
														{ kind: "Field", name: { kind: "Name", value: "skeb" } },
														{ kind: "Field", name: { kind: "Name", value: "fantia" } },
														{ kind: "Field", name: { kind: "Name", value: "tumblr" } },
														{ kind: "Field", name: { kind: "Name", value: "youtube" } },
														{ kind: "Field", name: { kind: "Name", value: "weibo" } },
														{ kind: "Field", name: { kind: "Name", value: "naver" } },
														{ kind: "Field", name: { kind: "Name", value: "website" } }
													]
												}
											}
										]
									}
								}
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "authorOrArtist" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "total" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AuthorPageQueryQuery, AuthorPageQueryQueryVariables>;
export const AuthorsSearchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "authorsSearch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "AuthorListParams" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "author" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "works" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<AuthorsSearchQuery, AuthorsSearchQueryVariables>;
export const ListBlacklistedAuthorArtistsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "listBlacklistedAuthorArtists" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "BlacklistAuthorsArtistsListParam" }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "authorsArtists" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "list" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "params" },
														value: { kind: "Variable", name: { kind: "Name", value: "params" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "limit" } },
														{ kind: "Field", name: { kind: "Name", value: "total" } },
														{ kind: "Field", name: { kind: "Name", value: "offset" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "data" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "insertDate" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ListBlacklistedAuthorArtistsQuery,
	ListBlacklistedAuthorArtistsQueryVariables
>;
export const GetAuthorArtistsBlacklistedByIdsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getAuthorArtistsBlacklistedByIds" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "authorsArtists" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "getByIds" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "ids" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "insertDate" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	GetAuthorArtistsBlacklistedByIdsQuery,
	GetAuthorArtistsBlacklistedByIdsQueryVariables
>;
export const GetAuthorArtistsBlacklistedByIdDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getAuthorArtistsBlacklistedById" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "authorsArtists" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "get" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "insertDate" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	GetAuthorArtistsBlacklistedByIdQuery,
	GetAuthorArtistsBlacklistedByIdQueryVariables
>;
export const BlockAuthorArtistDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "blockAuthorArtist" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "authorArtists" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "blockOne" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "authorId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<BlockAuthorArtistMutation, BlockAuthorArtistMutationVariables>;
export const BlockBatchAuthorArtistDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "blockBatchAuthorArtist" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "authorArtists" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "blockMany" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "authorIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	BlockBatchAuthorArtistMutation,
	BlockBatchAuthorArtistMutationVariables
>;
export const UnblockAuthorArtistDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unblockAuthorArtist" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "authorArtists" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "unblockOne" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "authorId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnblockAuthorArtistMutation, UnblockAuthorArtistMutationVariables>;
export const UnblockBatchAuthorArtistDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unblockBatchAuthorArtist" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "authorArtists" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "unblockMany" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "authorIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UnblockBatchAuthorArtistMutation,
	UnblockBatchAuthorArtistMutationVariables
>;
export const ListBlacklistLabelsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "listBlacklistLabels" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "BlacklistLabelsListParam" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "list" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "params" },
														value: { kind: "Variable", name: { kind: "Name", value: "params" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "offset" } },
														{ kind: "Field", name: { kind: "Name", value: "limit" } },
														{ kind: "Field", name: { kind: "Name", value: "total" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "data" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "createDate" } },
																	{ kind: "Field", name: { kind: "Name", value: "description" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ListBlacklistLabelsQuery, ListBlacklistLabelsQueryVariables>;
export const GetBlacklistLabelDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getBlacklistLabel" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "get" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "createDate" } },
														{ kind: "Field", name: { kind: "Name", value: "description" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetBlacklistLabelQuery, GetBlacklistLabelQueryVariables>;
export const GetBlacklistLabelsByIdsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getBlacklistLabelsByIds" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "getByIds" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "ids" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "createDate" } },
														{ kind: "Field", name: { kind: "Name", value: "description" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetBlacklistLabelsByIdsQuery, GetBlacklistLabelsByIdsQueryVariables>;
export const CreateBlacklistLabelDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "createBlacklistLabel" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "param" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "CreateBlacklistLabelParam" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "createLabel" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "param" },
														value: { kind: "Variable", name: { kind: "Name", value: "param" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CreateBlacklistLabelMutation, CreateBlacklistLabelMutationVariables>;
export const LinkBlacklistLabelsAuthorsArtistsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "linkBlacklistLabelsAuthorsArtists" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "labelIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "authorIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "notes" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "linkAuthorsArtists" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "authorIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "authorIds" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "labelIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "labelIds" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "notes" },
														value: { kind: "Variable", name: { kind: "Name", value: "notes" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	LinkBlacklistLabelsAuthorsArtistsMutation,
	LinkBlacklistLabelsAuthorsArtistsMutationVariables
>;
export const LinkBlacklistLabelsScanlationGroupsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "linkBlacklistLabelsScanlationGroups" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "scanlationGroupIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "labelIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "notes" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "linkScanlationGroups" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "labelIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "labelIds" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "scanlationGroupsIds" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "scanlationGroupIds" }
														}
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "notes" },
														value: { kind: "Variable", name: { kind: "Name", value: "notes" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	LinkBlacklistLabelsScanlationGroupsMutation,
	LinkBlacklistLabelsScanlationGroupsMutationVariables
>;
export const LinkBlacklistLabelsUsersDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "linkBlacklistLabelsUsers" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "labelIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "userIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "notes" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "linkUsers" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "labelIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "labelIds" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "userIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "userIds" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "notes" },
														value: { kind: "Variable", name: { kind: "Name", value: "notes" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	LinkBlacklistLabelsUsersMutation,
	LinkBlacklistLabelsUsersMutationVariables
>;
export const DeleteBlacklistLabelDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "deleteBlacklistLabel" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "deleteLabels" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "labelIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<DeleteBlacklistLabelMutation, DeleteBlacklistLabelMutationVariables>;
export const UnlinkBlacklistLabelsAuthorsArtistsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unlinkBlacklistLabelsAuthorsArtists" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "labelIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "authorIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "unlinkAuthorsArtists" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "authorIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "authorIds" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "labelIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "labelIds" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UnlinkBlacklistLabelsAuthorsArtistsMutation,
	UnlinkBlacklistLabelsAuthorsArtistsMutationVariables
>;
export const UnlinkBlacklistLabelsScanlationGroupsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unlinkBlacklistLabelsScanlationGroups" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "scanlationGroupIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "labelIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "unlinkScanlationGroups" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "labelIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "labelIds" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "scanlationGroupsIds" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "scanlationGroupIds" }
														}
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UnlinkBlacklistLabelsScanlationGroupsMutation,
	UnlinkBlacklistLabelsScanlationGroupsMutationVariables
>;
export const UnlinkBlacklistLabelsUsersDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unlinkBlacklistLabelsUsers" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "labelIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "userIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "labels" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "unlinkUsers" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "labelIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "labelIds" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "userIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "userIds" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UnlinkBlacklistLabelsUsersMutation,
	UnlinkBlacklistLabelsUsersMutationVariables
>;
export const ListBlacklistedScanlationGroupsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "listBlacklistedScanlationGroups" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "BlacklistScanlationGroupsListParam" }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "scanlationGroups" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "list" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "params" },
														value: { kind: "Variable", name: { kind: "Name", value: "params" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "limit" } },
														{ kind: "Field", name: { kind: "Name", value: "total" } },
														{ kind: "Field", name: { kind: "Name", value: "offset" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "data" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "insertDate" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ListBlacklistedScanlationGroupsQuery,
	ListBlacklistedScanlationGroupsQueryVariables
>;
export const GetScanlationGroupBlacklistedByIdsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getScanlationGroupBlacklistedByIds" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "scanlationGroups" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "getByIds" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "ids" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "insertDate" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	GetScanlationGroupBlacklistedByIdsQuery,
	GetScanlationGroupBlacklistedByIdsQueryVariables
>;
export const GetScanlationGroupBlacklistedByIdDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getScanlationGroupBlacklistedById" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "scanlationGroups" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "get" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "insertDate" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	GetScanlationGroupBlacklistedByIdQuery,
	GetScanlationGroupBlacklistedByIdQueryVariables
>;
export const BlockScanlationGroupDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "blockScanlationGroup" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "scanlationGroups" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "blockOne" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "scanlationGroupId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<BlockScanlationGroupMutation, BlockScanlationGroupMutationVariables>;
export const BlockBatchScanlationGroupDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "blockBatchScanlationGroup" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "scanlationGroups" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "blockMany" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "scanlationGroupIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	BlockBatchScanlationGroupMutation,
	BlockBatchScanlationGroupMutationVariables
>;
export const UnblockScanlationGroupDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unblockScanlationGroup" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "scanlationGroups" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "unblockOne" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "scanlationGroupId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UnblockScanlationGroupMutation,
	UnblockScanlationGroupMutationVariables
>;
export const UnblockBatchScanlationGroupDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unblockBatchScanlationGroup" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "scanlationGroups" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "unblockMany" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "scanlationGroupIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UnblockBatchScanlationGroupMutation,
	UnblockBatchScanlationGroupMutationVariables
>;
export const ListBlacklistedUsersDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "listBlacklistedUsers" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "BlacklistUserListParam" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "users" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "list" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "params" },
														value: { kind: "Variable", name: { kind: "Name", value: "params" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "limit" } },
														{ kind: "Field", name: { kind: "Name", value: "total" } },
														{ kind: "Field", name: { kind: "Name", value: "offset" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "data" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "insertDate" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ListBlacklistedUsersQuery, ListBlacklistedUsersQueryVariables>;
export const GetUserBlacklistedByIdsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getUserBlacklistedByIds" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "users" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "getByIds" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "ids" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "insertDate" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetUserBlacklistedByIdsQuery, GetUserBlacklistedByIdsQueryVariables>;
export const GetUserBlacklistedByIdDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getUserBlacklistedById" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "users" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "get" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "insertDate" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetUserBlacklistedByIdQuery, GetUserBlacklistedByIdQueryVariables>;
export const BlockUserDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "blockUser" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "users" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "blockOne" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "userId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<BlockUserMutation, BlockUserMutationVariables>;
export const BlockBatchUserDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "blockBatchUser" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "users" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "blockMany" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "userIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<BlockBatchUserMutation, BlockBatchUserMutationVariables>;
export const UnblockUsersDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unblockUsers" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "users" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "unblockOne" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "userId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnblockUsersMutation, UnblockUsersMutationVariables>;
export const UnblockBatchUserDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unblockBatchUser" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "blacklist" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "users" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "unblockMany" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "userIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnblockBatchUserMutation, UnblockBatchUserMutationVariables>;
export const GetChaptersIDsAsFeedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getChaptersIDsAsFeed" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "listWithGroupByManga" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "feedContent" },
														value: { kind: "BooleanValue", value: false }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "chapterListParams" },
														value: {
															kind: "ObjectValue",
															fields: [
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "chapterIds" },
																	value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
																}
															]
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "manga" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } }
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "chapters" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{ kind: "Field", name: { kind: "Name", value: "volume" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetChaptersIDsAsFeedQuery, GetChaptersIDsAsFeedQueryVariables>;
export const SubToChapterImageFitDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "subToChapterImageFit" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchImageFit" } }]
			}
		}
	]
} as unknown as DocumentNode<
	SubToChapterImageFitSubscription,
	SubToChapterImageFitSubscriptionVariables
>;
export const UpdateChapterImageFitDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateChapterImageFit" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "imageFit" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ImageFit" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setImageFit" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "imageFit" },
											value: { kind: "Variable", name: { kind: "Name", value: "imageFit" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateChapterImageFitMutation, UpdateChapterImageFitMutationVariables>;
export const SubToChapterLongstripImageWidthDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "subToChapterLongstripImageWidth" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchLongstripImageWidth" } }]
			}
		}
	]
} as unknown as DocumentNode<
	SubToChapterLongstripImageWidthSubscription,
	SubToChapterLongstripImageWidthSubscriptionVariables
>;
export const UpdateChapterLongstripImageWidthDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateChapterLongstripImageWidth" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "width" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Float" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setLongstripImageWidth" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "width" },
											value: { kind: "Variable", name: { kind: "Name", value: "width" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UpdateChapterLongstripImageWidthMutation,
	UpdateChapterLongstripImageWidthMutationVariables
>;
export const SubToChapterReadingDirectionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "subToChapterReadingDirection" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchPageDirection" } }]
			}
		}
	]
} as unknown as DocumentNode<
	SubToChapterReadingDirectionSubscription,
	SubToChapterReadingDirectionSubscriptionVariables
>;
export const UpdateChapterReadingDirectionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateChapterReadingDirection" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "direction" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Direction" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setPageDirection" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "direction" },
											value: { kind: "Variable", name: { kind: "Name", value: "direction" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UpdateChapterReadingDirectionMutation,
	UpdateChapterReadingDirectionMutationVariables
>;
export const SubToChapterReadingModeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "subToChapterReadingMode" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchReadingMode" } }]
			}
		}
	]
} as unknown as DocumentNode<
	SubToChapterReadingModeSubscription,
	SubToChapterReadingModeSubscriptionVariables
>;
export const UpdateChapterReadingModeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateChapterReadingMode" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ReadingMode" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setReadingMode" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UpdateChapterReadingModeMutation,
	UpdateChapterReadingModeMutationVariables
>;
export const GetChapterRelatedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getChapterRelated" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangaId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "langs" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Language" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "groups" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "aggregate" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "groups" },
														value: { kind: "Variable", name: { kind: "Name", value: "groups" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaId" },
														value: { kind: "Variable", name: { kind: "Name", value: "mangaId" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "translatedLanguage" },
														value: {
															kind: "ListValue",
															values: [{ kind: "Variable", name: { kind: "Name", value: "langs" } }]
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "default" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "isReversed" },
														value: { kind: "BooleanValue", value: true }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "volumes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "volume" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "chapters" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																				{ kind: "Field", name: { kind: "Name", value: "ids" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetChapterRelatedQuery, GetChapterRelatedQueryVariables>;
export const ChapterPageThreadDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "chapterPageThread" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "statistics" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "chapter" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "get" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "comments" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "repliesCount" } },
																	{ kind: "Field", name: { kind: "Name", value: "threadUrl" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ChapterPageThreadQuery, ChapterPageThreadQueryVariables>;
export const GetChapterPageDataDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getChapterPageData" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "get" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "title" } },
														{ kind: "Field", name: { kind: "Name", value: "volume" } },
														{ kind: "Field", name: { kind: "Name", value: "chapter" } },
														{ kind: "Field", name: { kind: "Name", value: "pages" } },
														{ kind: "Field", name: { kind: "Name", value: "translatedLanguage" } },
														{ kind: "Field", name: { kind: "Name", value: "externalUrl" } },
														{ kind: "Field", name: { kind: "Name", value: "readableAt" } }
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "manga" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{ kind: "Field", name: { kind: "Name", value: "status" } },
																				{ kind: "Field", name: { kind: "Name", value: "state" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "originalLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "tags" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "name" }
																										}
																									]
																								}
																							}
																						]
																					}
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "contentRating" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "publicationDemographic" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "isLongstrip" }
																				}
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "scanlationGroups" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "name" } }
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "user" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "username" }
																				},
																				{ kind: "Field", name: { kind: "Name", value: "roles" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetChapterPageDataQuery, GetChapterPageDataQueryVariables>;
export const ExportChapterPageDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "exportChapterPage" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "exportPath" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "pagesCache" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "exportPage" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "page" },
														value: { kind: "Variable", name: { kind: "Name", value: "page" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "exportPath" },
														value: { kind: "Variable", name: { kind: "Name", value: "exportPath" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ExportChapterPageMutation, ExportChapterPageMutationVariables>;
export const SetContentProfileBlurDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setContentProfileBlur" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "blur" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setContentProfileBlur" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "blur" },
											value: { kind: "Variable", name: { kind: "Name", value: "blur" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SetContentProfileBlurMutation, SetContentProfileBlurMutationVariables>;
export const SubContentProfileBlurDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "subContentProfileBlur" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchContentProfileBlur" } }]
			}
		}
	]
} as unknown as DocumentNode<
	SubContentProfileBlurSubscription,
	SubContentProfileBlurSubscriptionVariables
>;
export const GetContentProfileBlurDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getContentProfileBlur" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "getContentProfileBlur" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetContentProfileBlurQuery, GetContentProfileBlurQueryVariables>;
export const SetContentProfileWarningModeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setContentProfileWarningMode" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ContentProfileWarningMode" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setContentProfileWarningMode" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	SetContentProfileWarningModeMutation,
	SetContentProfileWarningModeMutationVariables
>;
export const GetContentProfileWarningModeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getContentProfileWarningMode" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "getContentProfileWarningMode" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	GetContentProfileWarningModeQuery,
	GetContentProfileWarningModeQueryVariables
>;
export const SubContentProfileWarningModeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "subContentProfileWarningMode" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchContentProfileWarningMode" } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	SubContentProfileWarningModeSubscription,
	SubContentProfileWarningModeSubscriptionVariables
>;
export const SaveCoversInArchiveDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "saveCoversInArchive" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "archivePath" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "CoverArtSaveOption" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "cover" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "saveImagesToArchive" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "coverIds" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "archiveFile" },
											value: { kind: "Variable", name: { kind: "Name", value: "archivePath" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "options" },
											value: { kind: "Variable", name: { kind: "Name", value: "options" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SaveCoversInArchiveMutation, SaveCoversInArchiveMutationVariables>;
export const DownloadCoversInADirectoryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "downloadCoversInADirectory" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "exportDir" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "CoverArtSaveOption" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "cover" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "saveImages" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "coverIds" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "exportDir" },
											value: { kind: "Variable", name: { kind: "Name", value: "exportDir" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "options" },
											value: { kind: "Variable", name: { kind: "Name", value: "options" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	DownloadCoversInADirectoryMutation,
	DownloadCoversInADirectoryMutationVariables
>;
export const DownloadCoverInADirectoryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "downloadCoverInADirectory" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "exportDir" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "CoverArtSaveOption" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "cover" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "saveImage" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "coverId" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "exportDir" },
											value: { kind: "Variable", name: { kind: "Name", value: "exportDir" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "options" },
											value: { kind: "Variable", name: { kind: "Name", value: "options" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	DownloadCoverInADirectoryMutation,
	DownloadCoverInADirectoryMutationVariables
>;
export const DownloadCoversLocalyDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "downloadCoversLocaly" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "cover" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "downloadCovers" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "ids" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<DownloadCoversLocalyMutation, DownloadCoversLocalyMutationVariables>;
export const ListenToMangaTasksIDsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "listenToMangaTasksIDs" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchMangaTasksList" } }]
			}
		}
	]
} as unknown as DocumentNode<
	ListenToMangaTasksIDsSubscription,
	ListenToMangaTasksIDsSubscriptionVariables
>;
export const ListenToChapterTasksIDsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "listenToChapterTasksIDs" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchChaptersTasksList" } }]
			}
		}
	]
} as unknown as DocumentNode<
	ListenToChapterTasksIDsSubscription,
	ListenToChapterTasksIDsSubscriptionVariables
>;
export const ListenToCoverTasksIDsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "listenToCoverTasksIDs" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchCoverTasksList" } }]
			}
		}
	]
} as unknown as DocumentNode<
	ListenToCoverTasksIDsSubscription,
	ListenToCoverTasksIDsSubscriptionVariables
>;
export const ExportIdsToTxtDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "exportIdsToTxt" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "uuids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "path" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "export" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "uuidsToAsTxt" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "file" },
											value: { kind: "Variable", name: { kind: "Name", value: "path" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "uuids" },
											value: { kind: "Variable", name: { kind: "Name", value: "uuids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ExportIdsToTxtMutation, ExportIdsToTxtMutationVariables>;
export const SetForcePort443Document = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setForcePort443" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "force" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setForcePort443" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "force" },
											value: { kind: "Variable", name: { kind: "Name", value: "force" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SetForcePort443Mutation, SetForcePort443MutationVariables>;
export const SubForce443Document = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "subForce443" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchForcePort443" } }]
			}
		}
	]
} as unknown as DocumentNode<SubForce443Subscription, SubForce443SubscriptionVariables>;
export const GetLanguageFromStrDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getLanguageFromStr" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "lang" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "utils" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "strToLanguage" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "input" },
											value: { kind: "Variable", name: { kind: "Name", value: "lang" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetLanguageFromStrQuery, GetLanguageFromStrQueryVariables>;
export const FollowScanlationGroupBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "followScanlationGroupBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "scanlationGroup" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "followBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "ids" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	FollowScanlationGroupBatchMutation,
	FollowScanlationGroupBatchMutationVariables
>;
export const UnfollowScanlationGroupBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unfollowScanlationGroupBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "scanlationGroup" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfollowBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "ids" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UnfollowScanlationGroupBatchMutation,
	UnfollowScanlationGroupBatchMutationVariables
>;
export const GroupPageQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "groupPageQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "scanlationGroup" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "getUnique" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{ kind: "Field", name: { kind: "Name", value: "isBlocked" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "website" } },
														{ kind: "Field", name: { kind: "Name", value: "twitter" } },
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "altNames" } },
														{ kind: "Field", name: { kind: "Name", value: "ircServer" } },
														{ kind: "Field", name: { kind: "Name", value: "ircChannel" } },
														{ kind: "Field", name: { kind: "Name", value: "contactEmail" } },
														{ kind: "Field", name: { kind: "Name", value: "mangaUpdates" } },
														{ kind: "Field", name: { kind: "Name", value: "focusedLanguages" } },
														{ kind: "Field", name: { kind: "Name", value: "locked" } },
														{ kind: "Field", name: { kind: "Name", value: "official" } },
														{ kind: "Field", name: { kind: "Name", value: "verified" } },
														{ kind: "Field", name: { kind: "Name", value: "exLicensed" } },
														{ kind: "Field", name: { kind: "Name", value: "publishDelay" } },
														{ kind: "Field", name: { kind: "Name", value: "createdAt" } },
														{ kind: "Field", name: { kind: "Name", value: "description" } },
														{ kind: "Field", name: { kind: "Name", value: "discord" } }
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "leader" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "roles" } },
																				{ kind: "Field", name: { kind: "Name", value: "username" } }
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "members" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "roles" } },
																				{ kind: "Field", name: { kind: "Name", value: "username" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "group" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "total" } }]
									}
								}
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "statistics" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "group" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "get" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "comments" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "threadUrl" } },
																	{ kind: "Field", name: { kind: "Name", value: "repliesCount" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "groups" },
														value: {
															kind: "ListValue",
															values: [{ kind: "Variable", name: { kind: "Name", value: "id" } }]
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "total" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GroupPageQueryQuery, GroupPageQueryQueryVariables>;
export const FollowScanlationGroupMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "followScanlationGroupMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "scanlationGroup" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "follow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	FollowScanlationGroupMutationMutation,
	FollowScanlationGroupMutationMutationVariables
>;
export const UnfollowScanlationGroupMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unfollowScanlationGroupMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "scanlationGroup" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfollow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UnfollowScanlationGroupMutationMutation,
	UnfollowScanlationGroupMutationMutationVariables
>;
export const IsFollowingScanlationGroupQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "isFollowingScanlationGroupQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "follows" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "isFollowingGroup" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	IsFollowingScanlationGroupQueryQuery,
	IsFollowingScanlationGroupQueryQueryVariables
>;
export const GroupStatisticsQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "groupStatisticsQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "statistics" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "group" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "get" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "comments" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "threadId" } },
																	{ kind: "Field", name: { kind: "Name", value: "repliesCount" } },
																	{ kind: "Field", name: { kind: "Name", value: "threadUrl" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GroupStatisticsQueryQuery, GroupStatisticsQueryQueryVariables>;
export const ScanlationUploadsFeedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "scanlationUploadsFeed" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "group" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "translatedLanguages" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "Language" } }
							}
						}
					},
					defaultValue: { kind: "ListValue", values: [] }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "order" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ChapterSortOrder" } }
					},
					defaultValue: {
						kind: "ObjectValue",
						fields: [
							{
								kind: "ObjectField",
								name: { kind: "Name", value: "publishAt" },
								value: { kind: "EnumValue", value: "DESCENDING" }
							}
						]
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangaListParams" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaListParams" } },
					defaultValue: { kind: "ObjectValue", fields: [] }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "onlyUnreadTitles" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "disableScanlationGroupBlacklist" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "disableUserBlacklist" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "disableAuthorArtistBlacklist" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "listWithGroupByManga" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "chapterListParams" },
														value: {
															kind: "ObjectValue",
															fields: [
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "offset" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "offset" }
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "limit" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "limit" }
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "translatedLanguages" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "translatedLanguages" }
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "groups" },
																	value: {
																		kind: "ListValue",
																		values: [
																			{ kind: "Variable", name: { kind: "Name", value: "group" } }
																		]
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "order" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "order" }
																	}
																}
															]
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaListParams" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "mangaListParams" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "onlyUnreadTitles" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "onlyUnreadTitles" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "excludeBlacklistedAuthorArtists" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableAuthorArtistBlacklist" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "excludeBlacklistedScansGroups" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableScanlationGroupBlacklist" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "excludeBlacklistedUsers" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableUserBlacklist" }
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "manga" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "originalLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastVolume" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastChapter" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "coverArt" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "fileName" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "chapters" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																				{ kind: "Field", name: { kind: "Name", value: "volume" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "translatedLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "externalUrl" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "createdAt" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "readableAt" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "scanlationGroups" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "name" }
																										}
																									]
																								}
																							}
																						]
																					}
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "user" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "roles" }
																										},
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "username" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ScanlationUploadsFeedQuery, ScanlationUploadsFeedQueryVariables>;
export const OnlyScanlationGroupNameDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "onlyScanlationGroupName" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "scanGroupsId" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "scanlationGroup" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "groupIds" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "scanGroupsId" }
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<OnlyScanlationGroupNameQuery, OnlyScanlationGroupNameQueryVariables>;
export const ScanalationGroupSearchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "scanalationGroupSearch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ScanlationGroupListParams" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "scanlationGroup" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "discord" } },
																	{ kind: "Field", name: { kind: "Name", value: "website" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "leader" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "username" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "members" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ScanalationGroupSearchQuery, ScanalationGroupSearchQueryVariables>;
export const GroupSearchAndGetNameOnlyDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "groupSearchAndGetNameOnly" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "scanlationGroup" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: { kind: "Variable", name: { kind: "Name", value: "offset" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "name" },
														value: { kind: "Variable", name: { kind: "Name", value: "name" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } }
																]
															}
														}
													]
												}
											},
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	GroupSearchAndGetNameOnlyQuery,
	GroupSearchAndGetNameOnlyQueryVariables
>;
export const UserFollowedGroupsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userFollowedGroups" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "follows" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "groups" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: { kind: "Variable", name: { kind: "Name", value: "offset" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "altNames" } },
																	{ kind: "Field", name: { kind: "Name", value: "discord" } },
																	{ kind: "Field", name: { kind: "Name", value: "ircServer" } },
																	{ kind: "Field", name: { kind: "Name", value: "ircChannel" } },
																	{ kind: "Field", name: { kind: "Name", value: "official" } },
																	{ kind: "Field", name: { kind: "Name", value: "verified" } },
																	{ kind: "Field", name: { kind: "Name", value: "website" } },
																	{ kind: "Field", name: { kind: "Name", value: "twitter" } },
																	{ kind: "Field", name: { kind: "Name", value: "mangaUpdates" } },
																	{ kind: "Field", name: { kind: "Name", value: "contactEmail" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "leader" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "username" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "roles" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "membersLen" } }
																]
															}
														}
													]
												}
											},
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserFollowedGroupsQuery, UserFollowedGroupsQueryVariables>;
export const WatchOnlyUnreadSubDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "watchOnlyUnreadSub" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchHideReadTitles" } }]
			}
		}
	]
} as unknown as DocumentNode<
	WatchOnlyUnreadSubSubscription,
	WatchOnlyUnreadSubSubscriptionVariables
>;
export const SetHideReadTitleDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setHideReadTitle" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "hide" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setHideReadTitles" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "hide" },
											value: { kind: "Variable", name: { kind: "Name", value: "hide" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SetHideReadTitleMutation, SetHideReadTitleMutationVariables>;
export const CurrentUserLibraryCompletedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserLibraryCompleted" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "param" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "UserLibrarySectionParam" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "completed" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: { kind: "Variable", name: { kind: "Name", value: "param" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	CurrentUserLibraryCompletedQuery,
	CurrentUserLibraryCompletedQueryVariables
>;
export const CurrentUserLibraryDroppedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserLibraryDropped" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "param" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "UserLibrarySectionParam" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "dropped" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: { kind: "Variable", name: { kind: "Name", value: "param" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	CurrentUserLibraryDroppedQuery,
	CurrentUserLibraryDroppedQueryVariables
>;
export const ExportLibraryToCsvDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "exportLibraryToCSV" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "ExportMDLibraryToCSVOptions" }
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "exportAsCsv" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "options" },
											value: { kind: "Variable", name: { kind: "Name", value: "options" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ExportLibraryToCsvMutation, ExportLibraryToCsvMutationVariables>;
export const ExportLibraryToMyAnimeListDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "exportLibraryToMyAnimeList" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "MdlibraryToMyAnimeListExportOption" }
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "exportAsMyAnimeList" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "options" },
											value: { kind: "Variable", name: { kind: "Name", value: "options" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ExportLibraryToMyAnimeListMutation,
	ExportLibraryToMyAnimeListMutationVariables
>;
export const CurrentUserLibraryUnfilteredDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserLibraryUnfiltered" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "param" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "UserLibrarySectionParam" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfiltered" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: { kind: "Variable", name: { kind: "Name", value: "param" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	CurrentUserLibraryUnfilteredQuery,
	CurrentUserLibraryUnfilteredQueryVariables
>;
export const LibraryTitleMapDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "libraryTitleMap" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "status" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "ReadingStatus" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "getMangaStatus" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "status" },
											value: { kind: "Variable", name: { kind: "Name", value: "status" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{ kind: "Field", name: { kind: "Name", value: "status" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LibraryTitleMapQuery, LibraryTitleMapQueryVariables>;
export const CurrentUserLibraryOnHoldDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserLibraryOnHold" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "param" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "UserLibrarySectionParam" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "onHold" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: { kind: "Variable", name: { kind: "Name", value: "param" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CurrentUserLibraryOnHoldQuery, CurrentUserLibraryOnHoldQueryVariables>;
export const CurrentUserLibraryPlanToReadDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserLibraryPlanToRead" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "param" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "UserLibrarySectionParam" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "planToRead" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: { kind: "Variable", name: { kind: "Name", value: "param" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	CurrentUserLibraryPlanToReadQuery,
	CurrentUserLibraryPlanToReadQueryVariables
>;
export const CurrentUserLibraryReReadingDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserLibraryReReading" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "param" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "UserLibrarySectionParam" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "reReading" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: { kind: "Variable", name: { kind: "Name", value: "param" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	CurrentUserLibraryReReadingQuery,
	CurrentUserLibraryReReadingQueryVariables
>;
export const CurrentUserLibraryReadingDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserLibraryReading" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "param" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "UserLibrarySectionParam" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "reading" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: { kind: "Variable", name: { kind: "Name", value: "param" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	CurrentUserLibraryReadingQuery,
	CurrentUserLibraryReadingQueryVariables
>;
export const LibrarySizeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "librarySize" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "library" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "size" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "unfiltered" } },
											{ kind: "Field", name: { kind: "Name", value: "completed" } },
											{ kind: "Field", name: { kind: "Name", value: "dropped" } },
											{ kind: "Field", name: { kind: "Name", value: "planToRead" } },
											{ kind: "Field", name: { kind: "Name", value: "reading" } },
											{ kind: "Field", name: { kind: "Name", value: "reReading" } },
											{ kind: "Field", name: { kind: "Name", value: "onHold" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LibrarySizeQuery, LibrarySizeQueryVariables>;
export const AssembleCustomListsTitlesIntoOneDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "assembleCustomListsTitlesIntoOne" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "newListName" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "visibility" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "CustomListVisibility" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "filterContent" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "assembleCustomListsIntoOne" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "toAssemble" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "name" },
											value: { kind: "Variable", name: { kind: "Name", value: "newListName" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "visibility" },
											value: { kind: "Variable", name: { kind: "Name", value: "visibility" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "filterContent" },
											value: { kind: "Variable", name: { kind: "Name", value: "filterContent" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "visibility" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	AssembleCustomListsTitlesIntoOneMutation,
	AssembleCustomListsTitlesIntoOneMutationVariables
>;
export const CurrentUserCustomListsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserCustomLists" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "CurrentLoggedLists" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "currentLoggedLists" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "visibility" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "titlesIds" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CurrentUserCustomListsQuery, CurrentUserCustomListsQueryVariables>;
export const DownloadMdListsTitlesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "downloadMDListsTitles" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "listIDs" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "extras" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaDownloadExtras" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "filterContent" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "downloadListTitles" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "extras" },
											value: { kind: "Variable", name: { kind: "Name", value: "extras" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "toDowload" },
											value: { kind: "Variable", name: { kind: "Name", value: "listIDs" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "filterContent" },
											value: { kind: "Variable", name: { kind: "Name", value: "filterContent" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<DownloadMdListsTitlesMutation, DownloadMdListsTitlesMutationVariables>;
export const ExportCustomListsToCsvDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "exportCustomListsToCSV" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "ExportCustomListsToCSVOptions" }
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "export" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "asCsv" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "option" },
														value: { kind: "Variable", name: { kind: "Name", value: "options" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ExportCustomListsToCsvMutation,
	ExportCustomListsToCsvMutationVariables
>;
export const ExportCustomListsToMalDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "exportCustomListsToMAL" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "MdcustomListsToMyAnimeListExportOption" }
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "export" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "asMyAnimeList" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "option" },
														value: { kind: "Variable", name: { kind: "Name", value: "options" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ExportCustomListsToMalMutation,
	ExportCustomListsToMalMutationVariables
>;
export const FollowMdListBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "followMDListBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "followBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "ids" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<FollowMdListBatchMutation, FollowMdListBatchMutationVariables>;
export const UnfollowMdListBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unfollowMDListBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfollowBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "ids" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnfollowMdListBatchMutation, UnfollowMdListBatchMutationVariables>;
export const GetCustomListInfoByBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getCustomListInfoByBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "private" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "getCustomListBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "ids" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "private" },
											value: { kind: "Variable", name: { kind: "Name", value: "private" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "visibility" } }
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "titlesIds" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetCustomListInfoByBatchQuery, GetCustomListInfoByBatchQueryVariables>;
export const DeleteCustomListMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "deleteCustomListMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "delete" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	DeleteCustomListMutationMutation,
	DeleteCustomListMutationMutationVariables
>;
export const CustomListChapterFeedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "customListChapterFeed" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "feedParam" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "CustomListMangaFeedParams" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangaParam" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaListParams" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "private" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "onlyUnreadTitles" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "disableScanlationGroupBlacklist" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "disableUserBlacklist" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "disableAuthorArtistBlacklist" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "feed" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "customListFeedGrouped" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "feedParams" },
														value: { kind: "Variable", name: { kind: "Name", value: "feedParam" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaListParams" },
														value: { kind: "Variable", name: { kind: "Name", value: "mangaParam" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "private" },
														value: { kind: "Variable", name: { kind: "Name", value: "private" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "onlyUnreadTitles" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "onlyUnreadTitles" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "disableScansGroupsBlacklist" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableScanlationGroupBlacklist" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "disableUsersBlacklist" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableUserBlacklist" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "disableAuthorArtistsBlacklist" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableAuthorArtistBlacklist" }
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "manga" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "originalLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastVolume" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastChapter" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "coverArt" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "fileName" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "chapters" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																				{ kind: "Field", name: { kind: "Name", value: "volume" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "translatedLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "externalUrl" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "createdAt" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "readableAt" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "scanlationGroups" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "name" }
																										}
																									]
																								}
																							}
																						]
																					}
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "user" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "roles" }
																										},
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "username" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CustomListChapterFeedQuery, CustomListChapterFeedQueryVariables>;
export const FollowCustomListMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "followCustomListMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "follow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	FollowCustomListMutationMutation,
	FollowCustomListMutationMutationVariables
>;
export const UnfollowCustomListMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unfollowCustomListMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfollow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UnfollowCustomListMutationMutation,
	UnfollowCustomListMutationMutationVariables
>;
export const IsFollowingCustomListQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "isFollowingCustomListQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "follows" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "isFollowingCustomList" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	IsFollowingCustomListQueryQuery,
	IsFollowingCustomListQueryQueryVariables
>;
export const ForkCustomListDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "forkCustomList" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "visibility" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "CustomListVisibility" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "toFork" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "filter" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "fork" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "filterContent" },
											value: { kind: "Variable", name: { kind: "Name", value: "filter" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "name" },
											value: { kind: "Variable", name: { kind: "Name", value: "name" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "visibility" },
											value: { kind: "Variable", name: { kind: "Name", value: "visibility" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "toFork" },
											value: { kind: "Variable", name: { kind: "Name", value: "toFork" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "name" } },
														{ kind: "Field", name: { kind: "Name", value: "visibility" } }
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "titlesIds" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ForkCustomListMutation, ForkCustomListMutationVariables>;
export const GetCustomListVersion1Document = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getCustomListVersion1" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "get" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "private" },
											value: { kind: "BooleanValue", value: true }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "version" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetCustomListVersion1Query, GetCustomListVersion1QueryVariables>;
export const UpdateCustomListVisibility1Document = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateCustomListVisibility1" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "visibility" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "CustomListVisibility" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "version" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "update" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "listId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "version" },
														value: { kind: "Variable", name: { kind: "Name", value: "version" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "visibility" },
														value: { kind: "Variable", name: { kind: "Name", value: "visibility" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UpdateCustomListVisibility1Mutation,
	UpdateCustomListVisibility1MutationVariables
>;
export const RemoveTitlesFromCustomListDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "removeTitlesFromCustomList" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "customListId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "titlesIds" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "removeMangaBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "listId" },
											value: { kind: "Variable", name: { kind: "Name", value: "customListId" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaIds" },
											value: { kind: "Variable", name: { kind: "Name", value: "titlesIds" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	RemoveTitlesFromCustomListMutation,
	RemoveTitlesFromCustomListMutationVariables
>;
export const UserFollowedCustomListsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userFollowedCustomLists" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "follows" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "customLists" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: { kind: "Variable", name: { kind: "Name", value: "offset" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "visibility" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "titlesIds" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "user" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "username" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "roles" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserFollowedCustomListsQuery, UserFollowedCustomListsQueryVariables>;
export const MangaInfoPositionGqlDocDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "mangaInfoPositionGQLDoc" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchMangaInfosPosition" } }]
			}
		}
	]
} as unknown as DocumentNode<
	MangaInfoPositionGqlDocSubscription,
	MangaInfoPositionGqlDocSubscriptionVariables
>;
export const SetMangaInfoPositionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setMangaInfoPosition" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "position" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "MangaInfosPositions" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setMangaInfosPosition" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "position" },
											value: { kind: "Variable", name: { kind: "Name", value: "position" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SetMangaInfoPositionMutation, SetMangaInfoPositionMutationVariables>;
export const ListenToChapterReadMarkerDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "listenToChapterReadMarker" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchReadMarker" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "chapterId" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							}
						]
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ListenToChapterReadMarkerSubscription,
	ListenToChapterReadMarkerSubscriptionVariables
>;
export const ListenToAnyChapterReadMarkerDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "listenToAnyChapterReadMarker" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchReadMarkers" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "chapter" } },
								{ kind: "Field", name: { kind: "Name", value: "read" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ListenToAnyChapterReadMarkerSubscription,
	ListenToAnyChapterReadMarkerSubscriptionVariables
>;
export const MutateReadMarkersBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "mutateReadMarkersBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "unreads" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "read" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "updateHistory" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "readMarker" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "readMarkersBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "chapterIdsRead" },
											value: { kind: "Variable", name: { kind: "Name", value: "read" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "chapterIdsUnread" },
											value: { kind: "Variable", name: { kind: "Name", value: "unreads" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "updateHistory" },
											value: { kind: "Variable", name: { kind: "Name", value: "updateHistory" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	MutateReadMarkersBatchMutation,
	MutateReadMarkersBatchMutationVariables
>;
export const ChaptersReadMarkersDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "chaptersReadMarkers" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "readMarker" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "chapterReadMarkers" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "chapters" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ChaptersReadMarkersQuery, ChaptersReadMarkersQueryVariables>;
export const MangaReadMarkersDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "mangaReadMarkers" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "readMarker" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "mangaReadMarkersByMangaId" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaId" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangaReadMarkersQuery, MangaReadMarkersQueryVariables>;
export const MangasReadMarkersDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "mangasReadMarkers" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "readMarker" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "mangaReadMarkers" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaIds" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangasReadMarkersQuery, MangasReadMarkersQueryVariables>;
export const MangasReadMarkersGroupedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "mangasReadMarkersGrouped" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "readMarker" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "mangaReadMarkersGrouped" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaIds" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "mangaId" } },
											{ kind: "Field", name: { kind: "Name", value: "chapters" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangasReadMarkersGroupedQuery, MangasReadMarkersGroupedQueryVariables>;
export const CurrentUserReportsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserReports" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "ListReportParams" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "report" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "FragmentSpread",
																		name: { kind: "Name", value: "ReportAttributesFrag" }
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ReportAttributesFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ReportAttributes" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "details" } },
					{ kind: "Field", name: { kind: "Name", value: "objectId" } },
					{ kind: "Field", name: { kind: "Name", value: "status" } },
					{ kind: "Field", name: { kind: "Name", value: "createdAt" } }
				]
			}
		}
	]
} as unknown as DocumentNode<CurrentUserReportsQuery, CurrentUserReportsQueryVariables>;
export const CurrentUserReportReasonDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "currentUserReportReason" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "category" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ReportCategory" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "report" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "listReasonsByCaterogy" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "category" },
														value: { kind: "Variable", name: { kind: "Name", value: "category" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "FragmentSpread",
																		name: { kind: "Name", value: "ReportReasonAttributesFrag" }
																	}
																]
															}
														}
													]
												}
											},
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } }
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ReportReasonAttributesFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ReportReasonAttributes" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "reason" } },
					{ kind: "Field", name: { kind: "Name", value: "category" } },
					{ kind: "Field", name: { kind: "Name", value: "detailsRequired" } }
				]
			}
		}
	]
} as unknown as DocumentNode<CurrentUserReportReasonQuery, CurrentUserReportReasonQueryVariables>;
export const SendReportDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "sendReport" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "CreateReportParam" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "report" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "create" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SendReportMutation, SendReportMutationVariables>;
export const GetSidebarDirDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getSidebarDir" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "getSidebarDirection" } }]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetSidebarDirQuery, GetSidebarDirQueryVariables>;
export const RtlSidebarSubDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "rtlSidebarSub" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchSidebarDirection" } }]
			}
		}
	]
} as unknown as DocumentNode<RtlSidebarSubSubscription, RtlSidebarSubSubscriptionVariables>;
export const TagPopulatTitlesQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "tagPopulatTitlesQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "TagPopularList" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "tag" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "page" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "popularInfSection" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "params" },
														value: { kind: "Variable", name: { kind: "Name", value: "params" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "limit" } },
														{ kind: "Field", name: { kind: "Name", value: "offset" } },
														{ kind: "Field", name: { kind: "Name", value: "total" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "data" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "description" }
																				},
																				{ kind: "Field", name: { kind: "Name", value: "year" } },
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{ kind: "Field", name: { kind: "Name", value: "status" } },
																				{ kind: "Field", name: { kind: "Name", value: "state" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "originalLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "tags" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "name" }
																										}
																									]
																								}
																							}
																						]
																					}
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "contentRating" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "coverArt" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "description" }
																										},
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "fileName" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<TagPopulatTitlesQueryQuery, TagPopulatTitlesQueryQueryVariables>;
export const TagRecentlyPopularQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "tagRecentlyPopularQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "tag" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "page" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "recentlyAdded" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "altTitles" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "authorArtists" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<TagRecentlyPopularQueryQuery, TagRecentlyPopularQueryQueryVariables>;
export const TagTopTenQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "tagTopTenQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "tag" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "page" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "topTen" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "altTitles" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "authorArtists" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<TagTopTenQueryQuery, TagTopTenQueryQueryVariables>;
export const ExportTitlesToCsvDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "exportTitlesToCSV" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "ExportIdsLibraryToCSVOptions" }
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "export" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "idsAsCsv" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "options" },
														value: { kind: "Variable", name: { kind: "Name", value: "options" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ExportTitlesToCsvMutation, ExportTitlesToCsvMutationVariables>;
export const ExportTitlesToMalDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "exportTitlesToMAL" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "MdidsToMyAnimeListExportOption" }
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "export" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "idsAsMyAnimeList" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "options" },
														value: { kind: "Variable", name: { kind: "Name", value: "options" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ExportTitlesToMalMutation, ExportTitlesToMalMutationVariables>;
export const UserLoggedChapterFeedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userLoggedChapterFeed" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "translatedLanguages" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "Language" } }
							}
						}
					},
					defaultValue: { kind: "ListValue", values: [] }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "order" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "MangaFeedSortOrder" } }
					},
					defaultValue: {
						kind: "ObjectValue",
						fields: [
							{
								kind: "ObjectField",
								name: { kind: "Name", value: "readableAt" },
								value: { kind: "EnumValue", value: "DESCENDING" }
							}
						]
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangaListParams" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaListParams" } },
					defaultValue: { kind: "ObjectValue", fields: [] }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "feed" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "userLoggedMangaFeedGrouped" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "feedParams" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: { kind: "Variable", name: { kind: "Name", value: "offset" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "order" },
														value: { kind: "Variable", name: { kind: "Name", value: "order" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "translatedLanguage" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "translatedLanguages" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "includeFutureUpdates" },
														value: { kind: "EnumValue", value: "EXCLUDE" }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "includeExternalUrl" },
														value: { kind: "EnumValue", value: "EXCLUDE" }
													}
												]
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaListParams" },
											value: { kind: "Variable", name: { kind: "Name", value: "mangaListParams" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "manga" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "originalLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastVolume" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastChapter" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "coverArt" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "fileName" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "chapters" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																				{ kind: "Field", name: { kind: "Name", value: "volume" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "translatedLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "externalUrl" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "createdAt" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "readableAt" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "scanlationGroups" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "name" }
																										}
																									]
																								}
																							}
																						]
																					}
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "user" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "roles" }
																										},
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "username" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserLoggedChapterFeedQuery, UserLoggedChapterFeedQueryVariables>;
export const GetMangaHihiDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getMangaHihi" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "get" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "title" } },
														{ kind: "Field", name: { kind: "Name", value: "altTitles" } },
														{ kind: "Field", name: { kind: "Name", value: "state" } },
														{ kind: "Field", name: { kind: "Name", value: "status" } },
														{ kind: "Field", name: { kind: "Name", value: "description" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "availableTranslatedLanguages" }
														},
														{ kind: "Field", name: { kind: "Name", value: "year" } },
														{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "publicationDemographic" }
														},
														{ kind: "Field", name: { kind: "Name", value: "lastVolume" } },
														{ kind: "Field", name: { kind: "Name", value: "lastChapter" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "latestUploadedChapter" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "availableTranslatedLanguages" }
														},
														{ kind: "Field", name: { kind: "Name", value: "originalLanguage" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "links" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "FragmentSpread",
																		name: { kind: "Name", value: "MangaLinksFrag" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "tags" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "name" } },
																				{ kind: "Field", name: { kind: "Name", value: "group" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "authorArtists" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "name" } }
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "isBlocked" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "authors" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "name" } }
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "artists" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "name" } }
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "coverArt" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "fileName" }
																				},
																				{ kind: "Field", name: { kind: "Name", value: "locale" } }
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "manga" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{ kind: "Field", name: { kind: "Name", value: "related" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "MangaLinksFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "MangaLinks" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "hasNoLinks" } },
					{ kind: "Field", name: { kind: "Name", value: "amazon" } },
					{ kind: "Field", name: { kind: "Name", value: "anilist" } },
					{ kind: "Field", name: { kind: "Name", value: "animePlanet" } },
					{ kind: "Field", name: { kind: "Name", value: "bookWalker" } },
					{ kind: "Field", name: { kind: "Name", value: "cdJapan" } },
					{ kind: "Field", name: { kind: "Name", value: "ebookJapan" } },
					{ kind: "Field", name: { kind: "Name", value: "englishTranslation" } },
					{ kind: "Field", name: { kind: "Name", value: "kitsu" } },
					{ kind: "Field", name: { kind: "Name", value: "mangaUpdates" } },
					{ kind: "Field", name: { kind: "Name", value: "myAnimeList" } },
					{ kind: "Field", name: { kind: "Name", value: "novelUpdates" } },
					{ kind: "Field", name: { kind: "Name", value: "raw" } }
				]
			}
		}
	]
} as unknown as DocumentNode<GetMangaHihiQuery, GetMangaHihiQueryVariables>;
export const DownloadTitleWithExtrasDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "downloadTitleWithExtras" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangaId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "extras" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaDownloadExtras" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "download" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "extras" },
											value: { kind: "Variable", name: { kind: "Name", value: "extras" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "mangaId" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "isDownloaded" } },
											{ kind: "Field", name: { kind: "Name", value: "hasFailed" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	DownloadTitleWithExtrasMutation,
	DownloadTitleWithExtrasMutationVariables
>;
export const FollowTitleMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "followTitleMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "follow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<FollowTitleMutationMutation, FollowTitleMutationMutationVariables>;
export const UnfollowTitleMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unfollowTitleMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfollow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnfollowTitleMutationMutation, UnfollowTitleMutationMutationVariables>;
export const IsFollowingTitleQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "isFollowingTitleQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "follows" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "isFollowingManga" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<IsFollowingTitleQueryQuery, IsFollowingTitleQueryQueryVariables>;
export const MangaStatisticsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "mangaStatistics" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "statistics" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "manga" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "get" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "comments" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "threadUrl" } },
																	{ kind: "Field", name: { kind: "Name", value: "repliesCount" } }
																]
															}
														},
														{ kind: "Field", name: { kind: "Name", value: "followCount" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "rating" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "bayesian" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "distrubution" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "r1" } },
																				{ kind: "Field", name: { kind: "Name", value: "r2" } },
																				{ kind: "Field", name: { kind: "Name", value: "r3" } },
																				{ kind: "Field", name: { kind: "Name", value: "r4" } },
																				{ kind: "Field", name: { kind: "Name", value: "r5" } },
																				{ kind: "Field", name: { kind: "Name", value: "r6" } },
																				{ kind: "Field", name: { kind: "Name", value: "r7" } },
																				{ kind: "Field", name: { kind: "Name", value: "r8" } },
																				{ kind: "Field", name: { kind: "Name", value: "r9" } },
																				{ kind: "Field", name: { kind: "Name", value: "r10" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangaStatisticsQuery, MangaStatisticsQueryVariables>;
export const GetMangaTitleOnlyQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getMangaTitleOnlyQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangaId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "get" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "mangaId" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "title" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetMangaTitleOnlyQueryQuery, GetMangaTitleOnlyQueryQueryVariables>;
export const LatestUploadsPageQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "latestUploadsPageQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "disableScanlationGroupBlacklist" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "disableUserBlacklist" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "disableAuthorArtistBlacklist" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "listWithGroupByManga" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "chapterListParams" },
														value: {
															kind: "ObjectValue",
															fields: [
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "includeEmptyPages" },
																	value: { kind: "EnumValue", value: "EXCLUDE" }
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "includeExternalUrl" },
																	value: { kind: "EnumValue", value: "EXCLUDE" }
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "includeFutureUpdates" },
																	value: { kind: "EnumValue", value: "EXCLUDE" }
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "includeFuturePublishAt" },
																	value: { kind: "EnumValue", value: "EXCLUDE" }
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "order" },
																	value: {
																		kind: "ObjectValue",
																		fields: [
																			{
																				kind: "ObjectField",
																				name: { kind: "Name", value: "readableAt" },
																				value: { kind: "EnumValue", value: "DESCENDING" }
																			}
																		]
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "offset" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "offset" }
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "limit" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "limit" }
																	}
																}
															]
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "feedContent" },
														value: { kind: "BooleanValue", value: true }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "excludeBlacklistedAuthorArtists" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableAuthorArtistBlacklist" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "excludeBlacklistedScansGroups" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableScanlationGroupBlacklist" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "excludeBlacklistedUsers" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableUserBlacklist" }
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "manga" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "originalLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastVolume" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastChapter" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "coverArt" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "fileName" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "chapters" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																				{ kind: "Field", name: { kind: "Name", value: "volume" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "translatedLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "externalUrl" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "createdAt" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "readableAt" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "scanlationGroups" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "name" }
																										}
																									]
																								}
																							}
																						]
																					}
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "user" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "roles" }
																										},
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "username" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<LatestUploadsPageQueryQuery, LatestUploadsPageQueryQueryVariables>;
export const RandomTitleDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "randomTitle" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "options" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaRandomParams" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "random" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "options" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<RandomTitleQuery, RandomTitleQueryVariables>;
export const RecentlyAddedPageQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "recentlyAddedPageQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaListParams" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "home" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "recentlyAdded" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<RecentlyAddedPageQueryQuery, RecentlyAddedPageQueryQueryVariables>;
export const DefaultMangaSearchQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "defaultMangaSearchQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "MangaListParams" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "excludeContentProfile" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "hideReadTitle" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "disableAuthorArtistsBlacklist" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "excludeContentProfile" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "excludeContentProfile" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "onlyUnread" },
											value: { kind: "Variable", name: { kind: "Name", value: "hideReadTitle" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "disableAuthorArtistsBlacklist" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "disableAuthorArtistsBlacklist" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<DefaultMangaSearchQueryQuery, DefaultMangaSearchQueryQueryVariables>;
export const OfflineMangaSearchQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "offlineMangaSearchQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "MangaListParams" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "excludeContentProfile" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "listOffline" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "excludeContentProfile" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "excludeContentProfile" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<OfflineMangaSearchQueryQuery, OfflineMangaSearchQueryQueryVariables>;
export const UserFollowedTitlesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userFollowedTitles" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "follows" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "mangas" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: { kind: "Variable", name: { kind: "Name", value: "offset" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "description" } },
																	{ kind: "Field", name: { kind: "Name", value: "year" } },
																	{ kind: "Field", name: { kind: "Name", value: "title" } },
																	{ kind: "Field", name: { kind: "Name", value: "status" } },
																	{ kind: "Field", name: { kind: "Name", value: "state" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "originalLanguage" }
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "tags" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "name" }
																							}
																						]
																					}
																				}
																			]
																		}
																	},
																	{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "publicationDemographic" }
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "coverArt" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "attributes" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "description" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "fileName" }
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserFollowedTitlesQuery, UserFollowedTitlesQueryVariables>;
export const CreateInternalSessionMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "createInternalSessionMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangaId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "groups" } },
					type: {
						kind: "ListType",
						type: {
							kind: "NonNullType",
							type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "createSession" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "groups" },
														value: { kind: "Variable", name: { kind: "Name", value: "groups" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "mangaId" },
														value: { kind: "Variable", name: { kind: "Name", value: "mangaId" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	CreateInternalSessionMutationMutation,
	CreateInternalSessionMutationMutationVariables
>;
export const InternalQueueEntryStateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "internalQueueEntryState" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchInternalUploadQueueState" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							}
						]
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	InternalQueueEntryStateSubscription,
	InternalQueueEntryStateSubscriptionVariables
>;
export const InternalSessionQueueOrderIDsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "internalSessionQueueOrderIDs" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchInternalUploadQueueListIds" } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	InternalSessionQueueOrderIDsSubscription,
	InternalSessionQueueOrderIDsSubscriptionVariables
>;
export const InternalSessionListIDsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "internalSessionListIDs" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchInternalUploadSessionsListIds" } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	InternalSessionListIDsSubscription,
	InternalSessionListIDsSubscriptionVariables
>;
export const InternalUploadSessionDataDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "internalUploadSessionData" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchInternalUploadSessionObj" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "id" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "mangaId" } },
								{ kind: "Field", name: { kind: "Name", value: "groups" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "commitData" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "volume" } },
											{ kind: "Field", name: { kind: "Name", value: "chapter" } },
											{ kind: "Field", name: { kind: "Name", value: "title" } },
											{ kind: "Field", name: { kind: "Name", value: "translatedLanguage" } },
											{ kind: "Field", name: { kind: "Name", value: "externalUrl" } },
											{ kind: "Field", name: { kind: "Name", value: "publishAt" } },
											{ kind: "Field", name: { kind: "Name", value: "termsAccepted" } }
										]
									}
								},
								{ kind: "Field", name: { kind: "Name", value: "images" } },
								{ kind: "Field", name: { kind: "Name", value: "imagesUrl" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	InternalUploadSessionDataSubscription,
	InternalUploadSessionDataSubscriptionVariables
>;
export const AddFileInternalSessionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "addFileInternalSession" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "sessionId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "imgPath" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "index" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "session" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "sessionId" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "addFile" },
															arguments: [
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "imgPath" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "imgPath" }
																	}
																},
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "index" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "index" }
																	}
																}
															]
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	AddFileInternalSessionMutation,
	AddFileInternalSessionMutationVariables
>;
export const AddFilesInternalSessionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "addFilesInternalSession" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "sessionId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "imgPaths" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
							}
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "index" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "session" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "sessionId" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "addFiles" },
															arguments: [
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "imgPaths" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "imgPaths" }
																	}
																},
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "index" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "index" }
																	}
																}
															]
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	AddFilesInternalSessionMutation,
	AddFilesInternalSessionMutationVariables
>;
export const RemoveFileInternalSessionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "removeFileInternalSession" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "sessionId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "imgPath" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "session" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "sessionId" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "removeFile" },
															arguments: [
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "imgPath" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "imgPath" }
																	}
																}
															]
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	RemoveFileInternalSessionMutation,
	RemoveFileInternalSessionMutationVariables
>;
export const RemoveFilesInternalSessionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "removeFilesInternalSession" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "sessionId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "imgPaths" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "session" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "sessionId" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "removeFiles" },
															arguments: [
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "imgPaths" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "imgPaths" }
																	}
																}
															]
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	RemoveFilesInternalSessionMutation,
	RemoveFilesInternalSessionMutationVariables
>;
export const RemoveInternalSessionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "removeInternalSession" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "sessionId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "session" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "sessionId" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [{ kind: "Field", name: { kind: "Name", value: "remove" } }]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<RemoveInternalSessionMutation, RemoveInternalSessionMutationVariables>;
export const SendInternalSessionInQueueDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "sendInternalSessionInQueue" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "sessionId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "session" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "sessionId" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "sendInQueue" } }
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	SendInternalSessionInQueueMutation,
	SendInternalSessionInQueueMutationVariables
>;
export const SetCommitDataInternalSessionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setCommitDataInternalSession" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "sessionId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "commitData" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "InternUploadSessionCommitDataInput" }
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "startRunner" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "session" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "sessionId" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "setCommitData" },
															arguments: [
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "commitData" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "commitData" }
																	}
																},
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "startRunner" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "startRunner" }
																	}
																}
															]
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	SetCommitDataInternalSessionMutation,
	SetCommitDataInternalSessionMutationVariables
>;
export const SwapInternalUploadSessionFilesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "swapInternalUploadSessionFiles" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "sessionId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "a" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "b" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "session" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "sessionId" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "swapFileOrder" },
															arguments: [
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "a" },
																	value: { kind: "Variable", name: { kind: "Name", value: "a" } }
																},
																{
																	kind: "Argument",
																	name: { kind: "Name", value: "b" },
																	value: { kind: "Variable", name: { kind: "Name", value: "b" } }
																}
															]
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	SwapInternalUploadSessionFilesMutation,
	SwapInternalUploadSessionFilesMutationVariables
>;
export const StartInternalQueueRunnerDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "startInternalQueueRunner" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "startQueueRunner" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	StartInternalQueueRunnerMutation,
	StartInternalQueueRunnerMutationVariables
>;
export const SwapInternalQueueOrderDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "swapInternalQueueOrder" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "a" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "b" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "upload" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "internal" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "swapQueueOrder" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "a" },
														value: { kind: "Variable", name: { kind: "Name", value: "a" } }
													},
													{
														kind: "Argument",
														name: { kind: "Name", value: "b" },
														value: { kind: "Variable", name: { kind: "Name", value: "b" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	SwapInternalQueueOrderMutation,
	SwapInternalQueueOrderMutationVariables
>;
export const FollowUserBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "followUserBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "user" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "followBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "ids" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<FollowUserBatchMutation, FollowUserBatchMutationVariables>;
export const UnfollowUserBatchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unfollowUserBatch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "user" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfollowBatch" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "ids" },
											value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnfollowUserBatchMutation, UnfollowUserBatchMutationVariables>;
export const GetUsersInfoDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getUsersInfo" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "user" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "userIds" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "username" } },
																	{ kind: "Field", name: { kind: "Name", value: "roles" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetUsersInfoQuery, GetUsersInfoQueryVariables>;
export const UserPageQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userPageQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "user" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "get" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{ kind: "Field", name: { kind: "Name", value: "isBlocked" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "attributes" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "username" } },
														{ kind: "Field", name: { kind: "Name", value: "roles" } }
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "groups" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "name" } }
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "leader" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{ kind: "Field", name: { kind: "Name", value: "id" } }
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "uploaders" },
														value: {
															kind: "ListValue",
															values: [{ kind: "Variable", name: { kind: "Name", value: "id" } }]
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "total" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserPageQueryQuery, UserPageQueryQueryVariables>;
export const FollowUserMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "followUserMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "user" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "follow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<FollowUserMutationMutation, FollowUserMutationMutationVariables>;
export const UnfollowUserMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unfollowUserMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "user" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfollow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnfollowUserMutationMutation, UnfollowUserMutationMutationVariables>;
export const IsFollowingUserQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "isFollowingUserQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "follows" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "isFollowingUser" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<IsFollowingUserQueryQuery, IsFollowingUserQueryQueryVariables>;
export const UserCustomListsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userCustomLists" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UserCustomListParams" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "customList" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "getUserLists" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "name" } },
																	{ kind: "Field", name: { kind: "Name", value: "visibility" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "titlesIds" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserCustomListsQuery, UserCustomListsQueryVariables>;
export const UserUploadsFeedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userUploadsFeed" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "user" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "translatedLanguages" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "Language" } }
							}
						}
					},
					defaultValue: { kind: "ListValue", values: [] }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "order" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ChapterSortOrder" } }
					},
					defaultValue: {
						kind: "ObjectValue",
						fields: [
							{
								kind: "ObjectField",
								name: { kind: "Name", value: "publishAt" },
								value: { kind: "EnumValue", value: "DESCENDING" }
							}
						]
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mangaListParams" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaListParams" } },
					defaultValue: { kind: "ObjectValue", fields: [] }
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "disableScanlationGroupBlacklist" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "disableUserBlacklist" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "disableAuthorArtistBlacklist" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "listWithGroupByManga" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "chapterListParams" },
														value: {
															kind: "ObjectValue",
															fields: [
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "offset" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "offset" }
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "limit" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "limit" }
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "translatedLanguages" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "translatedLanguages" }
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "uploaders" },
																	value: {
																		kind: "ListValue",
																		values: [
																			{ kind: "Variable", name: { kind: "Name", value: "user" } }
																		]
																	}
																},
																{
																	kind: "ObjectField",
																	name: { kind: "Name", value: "order" },
																	value: {
																		kind: "Variable",
																		name: { kind: "Name", value: "order" }
																	}
																}
															]
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaListParams" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "mangaListParams" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "excludeBlacklistedAuthorArtists" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableAuthorArtistBlacklist" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "excludeBlacklistedScansGroups" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableScanlationGroupBlacklist" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "excludeBlacklistedUsers" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "disableUserBlacklist" }
														}
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "manga" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "originalLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastVolume" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "lastChapter" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "coverArt" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "fileName" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "chapters" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "id" } },
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "attributes" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "title" } },
																				{ kind: "Field", name: { kind: "Name", value: "chapter" } },
																				{ kind: "Field", name: { kind: "Name", value: "volume" } },
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "translatedLanguage" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "externalUrl" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "createdAt" }
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "readableAt" }
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "relationships" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "scanlationGroups" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "name" }
																										}
																									]
																								}
																							}
																						]
																					}
																				},
																				{
																					kind: "Field",
																					name: { kind: "Name", value: "user" },
																					selectionSet: {
																						kind: "SelectionSet",
																						selections: [
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "id" }
																							},
																							{
																								kind: "Field",
																								name: { kind: "Name", value: "attributes" },
																								selectionSet: {
																									kind: "SelectionSet",
																									selections: [
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "roles" }
																										},
																										{
																											kind: "Field",
																											name: { kind: "Name", value: "username" }
																										}
																									]
																								}
																							}
																						]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserUploadsFeedQuery, UserUploadsFeedQueryVariables>;
export const UserSearchDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userSearch" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "params" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UserListParam" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "user" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "list" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: { kind: "Variable", name: { kind: "Name", value: "params" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "username" } },
																	{ kind: "Field", name: { kind: "Name", value: "roles" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserSearchQuery, UserSearchQueryVariables>;
export const UserFollowedUsersDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "userFollowedUsers" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "offset" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "follows" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "users" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "limit" },
														value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: { kind: "Variable", name: { kind: "Name", value: "offset" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "attributes" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "username" } },
																	{ kind: "Field", name: { kind: "Name", value: "roles" } }
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "relationships" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: { kind: "Name", value: "groups" },
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{ kind: "Field", name: { kind: "Name", value: "id" } }
																			]
																		}
																	}
																]
															}
														}
													]
												}
											},
											{ kind: "Field", name: { kind: "Name", value: "limit" } },
											{ kind: "Field", name: { kind: "Name", value: "offset" } },
											{ kind: "Field", name: { kind: "Name", value: "total" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserFollowedUsersQuery, UserFollowedUsersQueryVariables>;
export const UserMeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "userMe" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchUserMe" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "username" } },
								{ kind: "Field", name: { kind: "Name", value: "roles" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UserMeSubscription, UserMeSubscriptionVariables>;
export const IsLoggedDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "isLogged" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchIsLogged" } }]
			}
		}
	]
} as unknown as DocumentNode<IsLoggedSubscription, IsLoggedSubscriptionVariables>;
export const ChapterPagesSubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "chapterPagesSubscription" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "chapter" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "getChapterPages" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "chapter" },
								value: { kind: "Variable", name: { kind: "Name", value: "chapter" } }
							},
							{
								kind: "Argument",
								name: { kind: "Name", value: "mode" },
								value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "pages" } },
								{ kind: "Field", name: { kind: "Name", value: "index" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "size" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "width" } },
											{ kind: "Field", name: { kind: "Name", value: "height" } }
										]
									}
								},
								{ kind: "Field", name: { kind: "Name", value: "url" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ChapterPagesSubscriptionSubscription,
	ChapterPagesSubscriptionSubscriptionVariables
>;
export const StartChapterPagesCachingDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "startChapterPagesCaching" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "chapter" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "pagesCache" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "chapter" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "startCaching" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	StartChapterPagesCachingMutation,
	StartChapterPagesCachingMutationVariables
>;
export const FetchingChapterPagesMetadataDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "fetchingChapterPagesMetadata" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "chapter" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "pagesCache" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "chapter" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "fetchMetadata" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	FetchingChapterPagesMetadataMutation,
	FetchingChapterPagesMetadataMutationVariables
>;
export const RefetchChapterPageDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "refetchChapterPage" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "chapter" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "pagesCache" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "chapter" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "refetchPage" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "page" },
														value: { kind: "Variable", name: { kind: "Name", value: "page" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<RefetchChapterPageMutation, RefetchChapterPageMutationVariables>;
export const ResendChapterPageDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "resendChapterPage" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "chapter" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "pagesCache" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "chapter" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "resendPage" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "page" },
														value: { kind: "Variable", name: { kind: "Name", value: "page" } }
													}
												]
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ResendChapterPageMutation, ResendChapterPageMutationVariables>;
export const ResendChapterPagesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "resendChapterPages" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "chapter" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "pagesCache" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "chapter" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "resendAll" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ResendChapterPagesMutation, ResendChapterPagesMutationVariables>;
export const RefetchIncompletesPagesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "refetchIncompletesPages" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "chapter" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "chapter" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "pagesCache" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "chapter" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: { kind: "Variable", name: { kind: "Name", value: "mode" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "refetchIncompletes" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	RefetchIncompletesPagesMutation,
	RefetchIncompletesPagesMutationVariables
>;
export const ChapterFeedStyleSubDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "chapterFeedStyleSub" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchChapterFeedStyle" } }]
			}
		}
	]
} as unknown as DocumentNode<
	ChapterFeedStyleSubSubscription,
	ChapterFeedStyleSubSubscriptionVariables
>;
export const UpdateChapterFeedStyleDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateChapterFeedStyle" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "style" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ChapterFeedStyle" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setChapterFeedStyle" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "style" },
											value: { kind: "Variable", name: { kind: "Name", value: "style" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UpdateChapterFeedStyleMutation,
	UpdateChapterFeedStyleMutationVariables
>;
export const ChapterLayoutSubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "chapterLayoutSubscription" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchChapterLayout" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "drawer" } },
								{ kind: "Field", name: { kind: "Name", value: "sidebar" } },
								{ kind: "Field", name: { kind: "Name", value: "progress" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ChapterLayoutSubscriptionSubscription,
	ChapterLayoutSubscriptionSubscriptionVariables
>;
export const SetChapterLayoutDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setChapterLayout" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "sidebar" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "SidebarMode" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "drawer" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DrawerMode" } }
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "progress" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "ProgressMode" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setChapterLayout" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "sidebar" },
											value: { kind: "Variable", name: { kind: "Name", value: "sidebar" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "drawer" },
											value: { kind: "Variable", name: { kind: "Name", value: "drawer" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "progress" },
											value: { kind: "Variable", name: { kind: "Name", value: "progress" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "sidebar" } },
											{ kind: "Field", name: { kind: "Name", value: "drawer" } },
											{ kind: "Field", name: { kind: "Name", value: "progress" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SetChapterLayoutMutation, SetChapterLayoutMutationVariables>;
export const ChapterQualitySubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "chapterQualitySubscription" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchChapterQuality" } }]
			}
		}
	]
} as unknown as DocumentNode<
	ChapterQualitySubscriptionSubscription,
	ChapterQualitySubscriptionSubscriptionVariables
>;
export const ChapterQualityMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "chapterQualityMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "quality" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "DownloadMode" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setChapterQuality" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "quality" },
											value: { kind: "Variable", name: { kind: "Name", value: "quality" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ChapterQualityMutationMutation,
	ChapterQualityMutationMutationVariables
>;
export const CurrentClientInfoDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "currentClientInfo" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchClientInfo" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "ClientInfoFrag" } }
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "ClientInfoFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "ClientInfo" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "clientId" } },
					{ kind: "Field", name: { kind: "Name", value: "clientSecret" } }
				]
			}
		}
	]
} as unknown as DocumentNode<CurrentClientInfoSubscription, CurrentClientInfoSubscriptionVariables>;
export const SetAuthClientDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setAuthClient" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "clientId" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "clientSecret" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "oauth" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setClientInfo" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "clientId" },
											value: { kind: "Variable", name: { kind: "Name", value: "clientId" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "clientSecret" },
											value: { kind: "Variable", name: { kind: "Name", value: "clientSecret" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SetAuthClientMutation, SetAuthClientMutationVariables>;
export const ResetAuthClientDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "resetAuthClient" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "oauth" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "clearClientInfo" } }]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ResetAuthClientMutation, ResetAuthClientMutationVariables>;
export const CreateForumThreadDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "createForumThread" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "threadType" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "ForumThreadType" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "forums" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "createThread" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "id" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "type" },
														value: { kind: "Variable", name: { kind: "Name", value: "threadType" } }
													}
												]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "forumId" } },
											{ kind: "Field", name: { kind: "Name", value: "forumUrl" } },
											{ kind: "Field", name: { kind: "Name", value: "repliesCount" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<CreateForumThreadMutation, CreateForumThreadMutationVariables>;
export const MangaFollowingStatusSubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "mangaFollowingStatusSubscription" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchIsFollowingManga" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "mangaId" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							}
						]
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	MangaFollowingStatusSubscriptionSubscription,
	MangaFollowingStatusSubscriptionSubscriptionVariables
>;
export const MangaFollowingStatusQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "mangaFollowingStatusQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "follows" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "isFollowingManga" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	MangaFollowingStatusQueryQuery,
	MangaFollowingStatusQueryQueryVariables
>;
export const FollowMangaMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "followMangaMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "follow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<FollowMangaMutationMutation, FollowMangaMutationMutationVariables>;
export const UnfollowMangaMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unfollowMangaMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "unfollow" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnfollowMangaMutationMutation, UnfollowMangaMutationMutationVariables>;
export const MangaRatingSubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "mangaRatingSubscription" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchRating" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "mangaId" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "rating" } }]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	MangaRatingSubscriptionSubscription,
	MangaRatingSubscriptionSubscriptionVariables
>;
export const GetMangaRatingDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getMangaRating" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "rating" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "lists" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaIds" },
											value: {
												kind: "ListValue",
												values: [{ kind: "Variable", name: { kind: "Name", value: "id" } }]
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [{ kind: "Field", name: { kind: "Name", value: "rating" } }]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetMangaRatingQuery, GetMangaRatingQueryVariables>;
export const UpdateMangaRatingDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateMangaRating" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "rating" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "rating" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "createUpdate" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaId" },
														value: { kind: "Variable", name: { kind: "Name", value: "id" } }
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "rating" },
														value: { kind: "Variable", name: { kind: "Name", value: "rating" } }
													}
												]
											}
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateMangaRatingMutation, UpdateMangaRatingMutationVariables>;
export const DeleteMangaRatingDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "deleteMangaRating" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "rating" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "delete" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<DeleteMangaRatingMutation, DeleteMangaRatingMutationVariables>;
export const MangaReadingStatusSubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "mangaReadingStatusSubscription" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchMangaReadingState" },
						arguments: [
							{
								kind: "Argument",
								name: { kind: "Name", value: "mangaId" },
								value: { kind: "Variable", name: { kind: "Name", value: "id" } }
							}
						]
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	MangaReadingStatusSubscriptionSubscription,
	MangaReadingStatusSubscriptionSubscriptionVariables
>;
export const MangaReadingStatusQueryDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "mangaReadingStatusQuery" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "readingStatus" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MangaReadingStatusQueryQuery, MangaReadingStatusQueryQueryVariables>;
export const MangaReadingStatusMutationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "mangaReadingStatusMutation" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "status" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "ReadingStatus" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "manga" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "updateReadingStatus" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "id" },
											value: { kind: "Variable", name: { kind: "Name", value: "id" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "status" },
											value: { kind: "Variable", name: { kind: "Name", value: "status" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	MangaReadingStatusMutationMutation,
	MangaReadingStatusMutationMutationVariables
>;
export const OfflineConfigDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "offlineConfig" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "getOfflineConfig" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "dataDir" } },
											{ kind: "Field", name: { kind: "Name", value: "mangasDir" } },
											{ kind: "Field", name: { kind: "Name", value: "coversDir" } },
											{ kind: "Field", name: { kind: "Name", value: "chaptersDir" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<OfflineConfigQuery, OfflineConfigQueryVariables>;
export const UpdateOfflineConfigDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateOfflineConfig" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "cfg" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "OfflineConfigInput" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setOfflineConfig" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "cfg" },
											value: { kind: "Variable", name: { kind: "Name", value: "cfg" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "dataDir" } },
											{ kind: "Field", name: { kind: "Name", value: "mangasDir" } },
											{ kind: "Field", name: { kind: "Name", value: "coversDir" } },
											{ kind: "Field", name: { kind: "Name", value: "chaptersDir" } }
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateOfflineConfigMutation, UpdateOfflineConfigMutationVariables>;
export const ServerIconStateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "serverIconState" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchIsAppMounted" } }]
			}
		}
	]
} as unknown as DocumentNode<ServerIconStateSubscription, ServerIconStateSubscriptionVariables>;
export const PageLimitSubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "pageLimitSubscription" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchPageLimit" } }]
			}
		}
	]
} as unknown as DocumentNode<
	PageLimitSubscriptionSubscription,
	PageLimitSubscriptionSubscriptionVariables
>;
export const SetPageLimitDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "setPageLimit" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "limit" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "Int" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setPageLimit" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "value" },
											value: { kind: "Variable", name: { kind: "Name", value: "limit" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<SetPageLimitMutation, SetPageLimitMutationVariables>;
export const PaginationStyleUpdateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "paginationStyleUpdate" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchPaginationStyle" } }]
			}
		}
	]
} as unknown as DocumentNode<
	PaginationStyleUpdateSubscription,
	PaginationStyleUpdateSubscriptionVariables
>;
export const UpdatePaginationStyleDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updatePaginationStyle" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "style" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "PaginationStyle" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setPaginationStyle" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "style" },
											value: { kind: "Variable", name: { kind: "Name", value: "style" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdatePaginationStyleMutation, UpdatePaginationStyleMutationVariables>;
export const UpdateToastNotifyDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateToastNotify" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "notify" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setToastNotify" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "notify" },
											value: { kind: "Variable", name: { kind: "Name", value: "notify" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateToastNotifyMutation, UpdateToastNotifyMutationVariables>;
export const ListenToToastNotifyStoreDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "listenToToastNotifyStore" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [{ kind: "Field", name: { kind: "Name", value: "watchNotifyToast" } }]
			}
		}
	]
} as unknown as DocumentNode<
	ListenToToastNotifyStoreSubscription,
	ListenToToastNotifyStoreSubscriptionVariables
>;
export const DefaultThemeProfileSubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "defaultThemeProfileSubscription" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchThemeProfileDefault" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "FragmentSpread", name: { kind: "Name", value: "MangaDexThemeFrag" } }
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "MangaDexThemeFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "MangaDexTheme" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "textColor" } },
					{ kind: "Field", name: { kind: "Name", value: "mainBackground" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "accents" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "default" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l1" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l2" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l3" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l4" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l5" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								}
							]
						}
					},
					{ kind: "Field", name: { kind: "Name", value: "midTone" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "contrast" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "l1" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "scrollbar" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "hovered" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "button" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "alternate" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "primary" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "primary" } },
								{ kind: "Field", name: { kind: "Name", value: "primary1" } },
								{ kind: "Field", name: { kind: "Name", value: "primary2" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "status" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "red" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "green" } },
								{ kind: "Field", name: { kind: "Name", value: "yellow" } },
								{ kind: "Field", name: { kind: "Name", value: "blue" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "purple" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "indication" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "blue" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "danger" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "l1" } },
								{ kind: "Field", name: { kind: "Name", value: "l2" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	DefaultThemeProfileSubscriptionSubscription,
	DefaultThemeProfileSubscriptionSubscriptionVariables
>;
export const UpdateDefaultThemeDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateDefaultTheme" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "theme" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "MangaDexThemeInput" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "updateDefaultTheme" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "theme" },
											value: { kind: "Variable", name: { kind: "Name", value: "theme" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "FragmentSpread", name: { kind: "Name", value: "MangaDexThemeFrag" } }
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "MangaDexThemeFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "MangaDexTheme" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "textColor" } },
					{ kind: "Field", name: { kind: "Name", value: "mainBackground" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "accents" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "default" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l1" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l2" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l3" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l4" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l5" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								}
							]
						}
					},
					{ kind: "Field", name: { kind: "Name", value: "midTone" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "contrast" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "l1" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "scrollbar" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "hovered" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "button" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "alternate" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "primary" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "primary" } },
								{ kind: "Field", name: { kind: "Name", value: "primary1" } },
								{ kind: "Field", name: { kind: "Name", value: "primary2" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "status" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "red" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "green" } },
								{ kind: "Field", name: { kind: "Name", value: "yellow" } },
								{ kind: "Field", name: { kind: "Name", value: "blue" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "purple" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "indication" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "blue" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "danger" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "l1" } },
								{ kind: "Field", name: { kind: "Name", value: "l2" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateDefaultThemeMutation, UpdateDefaultThemeMutationVariables>;
export const DefaultThemeProfileKeySubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "defaultThemeProfileKeySubscription" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchThemeProfileDefaultName" } }
				]
			}
		}
	]
} as unknown as DocumentNode<
	DefaultThemeProfileKeySubscriptionSubscription,
	DefaultThemeProfileKeySubscriptionSubscriptionVariables
>;
export const UpdateDefaultThemeProfileKeyDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateDefaultThemeProfileKey" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "key" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setDefaultThemeProfile" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "name" },
											value: { kind: "Variable", name: { kind: "Name", value: "key" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	UpdateDefaultThemeProfileKeyMutation,
	UpdateDefaultThemeProfileKeyMutationVariables
>;
export const ThemeProfilesSubscriptionDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "themeProfilesSubscription" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "watchThemesProfile" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "name" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "value" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "FragmentSpread", name: { kind: "Name", value: "MangaDexThemeFrag" } }
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "MangaDexThemeFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "MangaDexTheme" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "textColor" } },
					{ kind: "Field", name: { kind: "Name", value: "mainBackground" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "accents" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "default" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l1" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l2" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l3" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l4" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l5" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								}
							]
						}
					},
					{ kind: "Field", name: { kind: "Name", value: "midTone" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "contrast" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "l1" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "scrollbar" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "hovered" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "button" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "alternate" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "primary" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "primary" } },
								{ kind: "Field", name: { kind: "Name", value: "primary1" } },
								{ kind: "Field", name: { kind: "Name", value: "primary2" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "status" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "red" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "green" } },
								{ kind: "Field", name: { kind: "Name", value: "yellow" } },
								{ kind: "Field", name: { kind: "Name", value: "blue" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "purple" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "indication" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "blue" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "danger" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "l1" } },
								{ kind: "Field", name: { kind: "Name", value: "l2" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	ThemeProfilesSubscriptionSubscription,
	ThemeProfilesSubscriptionSubscriptionVariables
>;
export const UpdateThemeProfilesDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateThemeProfiles" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "themes" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "ThemeProfileEntryInput" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setThemeProfiles" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "entries" },
											value: { kind: "Variable", name: { kind: "Name", value: "themes" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateThemeProfilesMutation, UpdateThemeProfilesMutationVariables>;
export const UpdateThemeProfileDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "updateThemeProfile" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "theme" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaDexThemeInput" } }
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "setThemeProfile" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "name" },
											value: { kind: "Variable", name: { kind: "Name", value: "name" } }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "theme" },
											value: { kind: "Variable", name: { kind: "Name", value: "theme" } }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "FragmentSpread", name: { kind: "Name", value: "MangaDexThemeFrag" } }
										]
									}
								}
							]
						}
					}
				]
			}
		},
		{
			kind: "FragmentDefinition",
			name: { kind: "Name", value: "MangaDexThemeFrag" },
			typeCondition: { kind: "NamedType", name: { kind: "Name", value: "MangaDexTheme" } },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "textColor" } },
					{ kind: "Field", name: { kind: "Name", value: "mainBackground" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "accents" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "default" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l1" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l2" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l3" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l4" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "l5" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "default" } },
											{ kind: "Field", name: { kind: "Name", value: "hover" } },
											{ kind: "Field", name: { kind: "Name", value: "active" } }
										]
									}
								}
							]
						}
					},
					{ kind: "Field", name: { kind: "Name", value: "midTone" } },
					{
						kind: "Field",
						name: { kind: "Name", value: "contrast" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "l1" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "scrollbar" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "hovered" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "button" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "alternate" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "primary" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "primary" } },
								{ kind: "Field", name: { kind: "Name", value: "primary1" } },
								{ kind: "Field", name: { kind: "Name", value: "primary2" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "status" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "red" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "green" } },
								{ kind: "Field", name: { kind: "Name", value: "yellow" } },
								{ kind: "Field", name: { kind: "Name", value: "blue" } },
								{ kind: "Field", name: { kind: "Name", value: "grey" } },
								{ kind: "Field", name: { kind: "Name", value: "purple" } }
							]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "indication" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "blue" } }]
						}
					},
					{
						kind: "Field",
						name: { kind: "Name", value: "danger" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "default" } },
								{ kind: "Field", name: { kind: "Name", value: "l1" } },
								{ kind: "Field", name: { kind: "Name", value: "l2" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateThemeProfileMutation, UpdateThemeProfileMutationVariables>;
export const FaviconDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "favicon" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "url" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "Url" } }
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "utils" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "favicon" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "url" },
											value: { kind: "Variable", name: { kind: "Name", value: "url" } }
										}
									]
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<FaviconQuery, FaviconQueryVariables>;
export const GetAuthExpirationDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "getAuthExpiration" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "userOption" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "getAuthDateTimeLimit" } }]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetAuthExpirationQuery, GetAuthExpirationQueryVariables>;
export const MountAppStateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "mountAppState" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "offlineAppState" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [{ kind: "Field", name: { kind: "Name", value: "mountOfflineAppState" } }]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<MountAppStateMutation, MountAppStateMutationVariables>;
export const UnmountAppStateDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "mutation",
			name: { kind: "Name", value: "unmountAppState" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "offlineAppState" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "unmountOfflineAppState" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UnmountAppStateMutation, UnmountAppStateMutationVariables>;
export const ChaptersStatsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "chaptersStats" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "ids" } },
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
							}
						}
					}
				}
			],
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{
						kind: "Field",
						name: { kind: "Name", value: "statistics" },
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "chapter" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "list" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "ids" },
														value: { kind: "Variable", name: { kind: "Name", value: "ids" } }
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{ kind: "Field", name: { kind: "Name", value: "id" } },
														{
															kind: "Field",
															name: { kind: "Name", value: "comments" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{ kind: "Field", name: { kind: "Name", value: "threadUrl" } },
																	{ kind: "Field", name: { kind: "Name", value: "repliesCount" } }
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ChaptersStatsQuery, ChaptersStatsQueryVariables>;