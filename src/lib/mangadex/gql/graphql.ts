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
				relationships: { authorArtists: Array<{ id: string; attributes: { name: string } }> };
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
	__meta__: { hash: "sha256:41bcc66a0145109acc2d6e6371a22cce0cbd62547a293377e6c6d4ad69b76677" },
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
	__meta__: { hash: "sha256:ab8affb02bd14e7bd2d6c8235248e45428b465e1c216aac07af677e119a87539" },
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
	__meta__: { hash: "sha256:a14bd26696958bf39f49ab13e0e7b43e2ad091f63c9b317a21cad582864f85dd" },
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
	__meta__: { hash: "sha256:860c106a1b230e87366d10b81153b6c6bb338838683ba87dd04e5e324d3d72ff" },
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
	__meta__: { hash: "sha256:806105ce9b2b76925df7dd159e79ee3bbd30ad65871f5304cecbe3e3882d6bc7" },
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
																	}
																]
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
	__meta__: { hash: "sha256:78f1fc44db183d22b7a0b2ad448791d1365389160f7c55885ba3ad3455db5efa" },
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
	__meta__: { hash: "sha256:5dedefec209d164a39fbc548a595c9a1f9821a739867ac183ef657911c2fcd78" },
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
	__meta__: { hash: "sha256:c30742d81d7cc0899152ea93f2f4682df200b18b059939c655b1a2fb89f75b77" },
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
	__meta__: { hash: "sha256:bea7ae1e640c40d674eaac5f913c9b38a6774b3c6cf3a01dd04e8e50a306e84f" },
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
	__meta__: { hash: "sha256:5894d49ca722dee7fe65c83577e63138e7936b4dcb3ade6b86fd56e3d44105db" },
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
	__meta__: { hash: "sha256:96d8cbbdeac65f26143438923fa85564dc4f8f5b6c12f3bb8e3c9e6d0d5b2f66" },
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
	__meta__: { hash: "sha256:2c95f41be8bea130933a6fe0a494a288d7b9d5ee3f6378857621d38161e882d5" },
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
	__meta__: { hash: "sha256:870a73eeb60f25964af1cff17a6ad8e120a40b45fd3eedd7f5feb9e4e35ff8d2" },
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
	__meta__: { hash: "sha256:1fcde44f65c5eb8470e14495ae7e0fb3f66e27c3d85f5b2a6d0c4e0286f3a741" },
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
	__meta__: { hash: "sha256:60792592f5ce5ad273e330be2aec5231ac2cd2645a2895a0eac79ad770bf73b5" },
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
	__meta__: { hash: "sha256:64a60bbc7ded292772a951d99e2a347515255a39709c83d85280bb5559f89a01" },
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
	__meta__: { hash: "sha256:fcdb672560b2e3a5205b7394a9560280fe6138ad57a11764dec6f381bcde8408" },
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
	__meta__: { hash: "sha256:f694947b88c12650e88a6abf9716634f6571a09354ccca27bc42eb5f56466483" },
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
	__meta__: { hash: "sha256:7c7f6629cec3ac5a2bb337caf96c455e2f2071da9af52b58f7bf4e9b3d1f02dd" },
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
	__meta__: { hash: "sha256:e9940c83d5807ddbfa2d47f1ac7b87fa7dc5bed767acfd938f8c661b2716b5fb" },
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
	__meta__: { hash: "sha256:eb8d4aa740f5d55ca0b2a00d274cca6e4a7afddddb047f3b5653003d652240f7" },
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
	__meta__: { hash: "sha256:82779a9df34b0502ceae3f367d4d7374c6930142d754ab00c15e7eb972cb6958" },
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
	__meta__: { hash: "sha256:af52a074f7f813ba9776bcbc5a2107c7dfd02909524ec3c8eacdf43416f65bc1" },
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
	__meta__: { hash: "sha256:eed233ada44f5ab1db4e054847055efe1d6f8bf08926405afee398e8ad4711aa" },
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
	__meta__: { hash: "sha256:b6d8b3caf3ce71624ccba922348b6aa17d5fd844308ddee9097d7d12c12583c7" },
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
	__meta__: { hash: "sha256:3a6aaeafb5774121eb903b1d148016de61bfdb46e95f548b2aa00c066824387a" },
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
	__meta__: { hash: "sha256:9392e737bad84fb88dfa2e5663d361c668dcac401a1b898c018e155480099a62" },
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
	__meta__: { hash: "sha256:5d100d3988535266ebaeb32e2498b8390d07c716623e63087b305563ab65af46" },
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
	__meta__: { hash: "sha256:e5e43b6be5b9873310a8335effd997cb3e8ed51f5aa6a30848ff9033c095e6d0" },
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
	__meta__: { hash: "sha256:b518542161c6e12b48aa7eafa3c1830cfa02821a28dc85f2c8935f5e2d5bddfa" },
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
	__meta__: { hash: "sha256:f3e5065eaa741443347513828e255a11ecdbc12371e355e0df26755ba5a8d371" },
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
	__meta__: { hash: "sha256:4ab38bda8a312d72481a119ed8fedab755676138dcaec784c158297fafca570c" },
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
	__meta__: { hash: "sha256:b2a91b06c7adc629a1f3e55bc70f708273e9a464f5c566d38488c97bd85cb679" },
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
	__meta__: { hash: "sha256:956f14b7c7d7e708c8d435070a44a2f0b841e477162a39b0c36aa68f66a82b5a" },
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
	__meta__: { hash: "sha256:1a3c3241a93213afcab0c8150acf6650ffe906e9b2e0d9766a5ef8ae58e9572d" },
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
	__meta__: { hash: "sha256:6d39c4e5068d19fad09a211781acbf8979d0230cf0d40369d9e32f43d5cb4863" },
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
	__meta__: { hash: "sha256:4e516b8500a167ee05e25526251bdf6417bf0288e85a3300f0b30395d8aad40c" },
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
	__meta__: { hash: "sha256:4699dccdd0795ded474e75b499d9a2c4bc622a6fda747657b753ab6e536a831e" },
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
	__meta__: { hash: "sha256:a3464849f9d26917934aca889245bb8ea492cf6ec5497c26bd757b5c1e1bed67" },
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
	__meta__: { hash: "sha256:646ba99fd782317052c30180d705d13470a1418213181caf3b87c4ae9907dfe6" },
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
	__meta__: { hash: "sha256:0d74a7e233736a52ec945c8c2debcfb9672152e282bb4cc6a7018751eed1b728" },
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
	__meta__: { hash: "sha256:15baf46b96a4570e1adfd5b2cb329fac1aa98211574d4eeed1eba3b1031b4eea" },
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
	__meta__: { hash: "sha256:513bdf20c73e0715facdd3c00e02792c50d2c61a5d0ab3352586b68c8f6bd865" },
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
	__meta__: { hash: "sha256:98db96ad2801382aee8a56a67bd3869e64e0fbbc3a232dc131bbc8de7d11e08a" },
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
	__meta__: { hash: "sha256:3bf759f172587a86756602d229bcbe602b3b4564d66916ae1d1a33e7d059e097" },
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
	__meta__: { hash: "sha256:cb27e9cf8dab97147c0ddae4e662691231beb8a9246f01a276af13d6e5b1a063" },
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
	__meta__: { hash: "sha256:396ba128ff208039377367cac3697d5b482e31d721d505578e0ee19d55ba92e7" },
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
	__meta__: { hash: "sha256:e71c683dba539651930409429c80fa046954bb45a5741dac8e8816da886df566" },
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
	__meta__: { hash: "sha256:a0ce61b78830e5ef3eb881ddfcb8c17453aca2afe5ef9679819595f25df3747f" },
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
	__meta__: { hash: "sha256:0d6931e6ab89d26046d98b2f4baa0c91e5aa7776124b0e6185695b9ab2e3dc96" },
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
	__meta__: { hash: "sha256:dacf9deb8910a353c91fa3dc7223fdd0630c12d51a9a9f7e00d093e7587d8f52" },
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
	__meta__: { hash: "sha256:7f47398ed8900b1da56379293bdda6654271a7d7ea136d242d42a500deb8e92c" },
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
	__meta__: { hash: "sha256:63ec2ad3f92c47b2d815a80301a37fff5af4c936d2affe9db1f91ec8090895bc" },
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
	__meta__: { hash: "sha256:4eb49f02f9ecacdbd1ab8b4d19657b3b3b178bcaf6e01aaba28f8cd7e6809e1d" },
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
	__meta__: { hash: "sha256:5ea823b3e00d44ad6d80e446c80b048a8ce21a842df76b03ea121f6be2ebb966" },
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
	__meta__: { hash: "sha256:8256ecdb98fce4962b8dca003c81ba4a6413d94b44cb0dff380448ac2b16895b" },
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
	__meta__: { hash: "sha256:680ba549cbe6e53ea6f4730ba1f3f3e5c7a574a3d4c0da11ed5b9afaf3b9ccc5" },
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
	__meta__: { hash: "sha256:a24b2b65970b7726175ae975dc277183e7b7d61ddda1749fb5bbf9ec483c0310" },
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
	__meta__: { hash: "sha256:364d7f7a00629d7b99ccfa882cf4f9fa1c4f905c7035d6409752f0133bfedcfc" },
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
	__meta__: { hash: "sha256:33be7f317a2f663e164bbd30e104055cbdd78d46d4a63a55adad43ac3237e4cc" },
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
	__meta__: { hash: "sha256:e9e3c710cd2d6905181bd388789e284c8353e32ed9ac8569cdb4dae8ca4aaeb9" },
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
	__meta__: { hash: "sha256:7dedd0999f8236f3ac08bf9f36f6cf5d54e50c01248a65e58b8b4bfd9445c3de" },
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
	__meta__: { hash: "sha256:7496e659c50d558350c4ab4667d203c970b1c4842f7f3e4efb931230ecc33449" },
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
	__meta__: { hash: "sha256:7075b9b157c2c6332b6d74c6cc6090087db7af2843206df81c08fbff7845a337" },
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
	__meta__: { hash: "sha256:4512cfdd3060207699e384b1632c4894bbe64564f5b536e5bdb40cab2c7cb599" },
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
	__meta__: { hash: "sha256:b6a9c2c28a5b7621ec78ae75b90392f681f4e9e971653371c83f027e17be1817" },
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
	__meta__: { hash: "sha256:43c2aeed73cbdec85ec16725a91a91843a586408bb12003cfe3990c0302fc6f4" },
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
	__meta__: { hash: "sha256:03c81f929f3c72a913c31780dc346de32028d93742c08c2c9431058741602594" },
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
	__meta__: { hash: "sha256:6783b8f4ad37fce7176344d2be01694e02a38be415dd3d615f1e3e4c390959e3" },
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
	__meta__: { hash: "sha256:c624989c8a66050f6cb1cb0ce049398f434bc0fba6a7e60b7520a91e33be7bfc" },
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
	__meta__: { hash: "sha256:f1cf58c89d4d7a6a87c0e62a581cbec15590b7e18c82b2e7ecd5c34cc811c3ad" },
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
	__meta__: { hash: "sha256:6f5cc663447c29be578a34ec2b1baa86a454c49d3327f2ecbc80d7eb02cfc35f" },
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
	__meta__: { hash: "sha256:b9c48711af5dd02ecca45dd3b844f967b3c961a0eb500e7898a821ad91d17849" },
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
	__meta__: { hash: "sha256:5d0442a7d577760be0c6827c9eb1e2be18065322f194d70d8bd13673bed65fb0" },
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
	__meta__: { hash: "sha256:4aa8e02bdc2ee673e0b5f480b88404124eeafa6d77ae0b8910ed51f85363de8a" },
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
	__meta__: { hash: "sha256:2354063d4b786f5493ac94f512e71f4a1391e6292a5bb029114b9de9624cec70" },
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
	__meta__: { hash: "sha256:8755b4a11045d62dba1a362d5653d1082bfccdeb46833b4237f807fe4a94e867" },
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
	__meta__: { hash: "sha256:5fdc896f0ae42daf480a5e181ee0ae43044520539643c1fdfa99dd88b7e501f2" },
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
	__meta__: { hash: "sha256:b9f547e8cf9faf991a3a0c9b81f80f1e1488108a8b7aa6e9f2f5b7b2afa0c396" },
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
	__meta__: { hash: "sha256:a21dabea5aa1043035a8f1525821fad770145f417762dcd60074ee19e2391e0b" },
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
	__meta__: { hash: "sha256:5255175f4e673fbe7ac89a80989479f5864758010fd4cdcd08e75d86f43b5bac" },
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
	__meta__: { hash: "sha256:1cbdb23c353dedbaff45550eff17283995301a6ddf6cba061702b609c3604e9a" },
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
	__meta__: { hash: "sha256:6596c0fde22f3b76bc09d3819637808e04583950cf58c0a1d5b4fd5703cb8325" },
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
	__meta__: { hash: "sha256:2ef379f1f2813069c8014a70509bd68238536e59bc341f08d327c4fce029e199" },
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
	__meta__: { hash: "sha256:71988775f65b5576e7762f5a06fb93a3a8b557ef5d007965518d8ab8aa2bbbc2" },
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
	__meta__: { hash: "sha256:16d37ee24c8e30b84914f580ad6373602d923b2690b4e66caf7c998874ce93b8" },
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
	__meta__: { hash: "sha256:62c6a5afe6c5ec8b4508c1020b9f6ac23cd8a1ad443a8a2b8330dc61989a72ed" },
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
	__meta__: { hash: "sha256:846f9ab1527e8bf4ca340164037c48818d65331df6db4eca81b4e102bd8e33d2" },
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
	__meta__: { hash: "sha256:b6f81008b88dde8505b2ec691585bc429a7e472c72a6badeebb5840993380c4c" },
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
	__meta__: { hash: "sha256:671ed62885326547d0943d6e71b848c08a19188b129a35154765c8f0d5e6d36f" },
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
	__meta__: { hash: "sha256:89928f6a1df828cd05fdb333d60824c37d28a1dc857ee5e941a21ec990c5ae36" },
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
	__meta__: { hash: "sha256:bd73abf0896a93734b945021ebb84be36018e11aa8a3a18625c7424881d822ed" },
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
	__meta__: { hash: "sha256:a550785db51bda2b5242a97c9abb4d7073e45e2d0a1f5474d58203cca5f1b3fd" },
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
	__meta__: { hash: "sha256:d5f1606cbedde006132eb017bf842128a2029c60255ed0a5b7683c4cec530044" },
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
	__meta__: { hash: "sha256:4d745f5b6603d65a7d9678971b86db96560948c07080d3ae58611516fd869c81" },
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
	__meta__: { hash: "sha256:c6dbacd247609a48402d17c2c2825cb338f945b95cf54f26af8781d21cfb6f23" },
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
	__meta__: { hash: "sha256:ffc328ea6619b0fb83adb786d23b458dff4580cbb1e2e71a27c1fd58ba9c93b3" },
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
	__meta__: { hash: "sha256:1000e245c4756a7f8bd2983eae5238cd55dcbe8de0cf0fb12d697e8e128dafc8" },
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
	__meta__: { hash: "sha256:4ac9ce647ba8c9250223882e39e0dcaaedf9ea4bc8753363610cb30660566267" },
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
	__meta__: { hash: "sha256:99fb0190affa661cac15653fb8ef0d525b0960cb5ab5a75396d40ed373079339" },
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
	__meta__: { hash: "sha256:8515ee55218d526aa8e47cec3ab8a14e4036a364dbd040f05297b32125f4e63e" },
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
	__meta__: { hash: "sha256:3ffb00fdf2e02598d3e5944b409d89e6e23ba27f5d7e03cf9d0c9907be75894d" },
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
	__meta__: { hash: "sha256:96fb9a82cc2db8c577b2671ee3be832df497d29cdbeb22e2598bac1d8a32f4f0" },
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
	__meta__: { hash: "sha256:8bab36cf3ea954559d7067e7ee92cdcf341e1d084cc38b200055a79ee2f0e439" },
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
	__meta__: { hash: "sha256:3fb80f7b5679b532e7e6229090bbce5cec34bf662d5898bfa1c39d1456c11ffc" },
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
	__meta__: { hash: "sha256:0f22de773f39a665198292ddfdbc71fa6f38bf899373ab60c31e6fe9770955a1" },
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
	__meta__: { hash: "sha256:883693ed09185ee47357a18b3078768f9211395c9d300569afa931b2d755dd60" },
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
	__meta__: { hash: "sha256:55e8b38eb594ff3d6c1a838d6b078a38311978986ae152966d8c0dcf83144588" },
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
	__meta__: { hash: "sha256:9d154a246bed597e3396481b875738dfe2698503e2d012937a07d3ab12d14436" },
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
	__meta__: { hash: "sha256:7ea0dcda8db6c827711aac738ac840f0948a753edf61b4034a0231e05774aece" },
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
	__meta__: { hash: "sha256:44564b19a29f8fdf326cf3755abbc37f907676e2e5efaad9dd795f218dccdd40" },
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
	__meta__: { hash: "sha256:92b06c8e696bac57610ab71016a6e3136767f6c970d422b5d1934fdd2ced98f3" },
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
	__meta__: { hash: "sha256:95d4891c602f6866f7f288d3f96c53e7a1cbef964dea179ca28a77fd50cc233f" },
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
	__meta__: { hash: "sha256:fdd08b3e46af54c5444529908bc48a9448d73b5a7d89b6596f0ea6fe35850085" },
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
	__meta__: { hash: "sha256:8c9911793515366c4fc1abfa33f2c5591bc32c89a00e53dcb5d2b67721691b44" },
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
	__meta__: { hash: "sha256:dacc7b9dbf71bad83f71d70f7495ccd1d0831d474477b72d416cbade7fab148c" },
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
	__meta__: { hash: "sha256:f71d39154885076530befeb43370babda156226fa195c5233c1495afa63072fc" },
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
	__meta__: { hash: "sha256:5bc8be0abfbe2edee78ead97c81c1f349a467f0312c88a3ec1dd20520600257a" },
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
	__meta__: { hash: "sha256:59ce618ee9e9bce3cd9356a22764ee75dcd573548aa52459df3e8159dd8f3638" },
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
	__meta__: { hash: "sha256:029660ae7eea8abb82b207ac57b83b772c9fdde9d9bec9fb1a2d3b68d2ec8cdd" },
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
	__meta__: { hash: "sha256:2c2ea2328653b8226112177a797b3bbd78fc9b95e95421150a801a9fb84d02b1" },
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
	__meta__: { hash: "sha256:a54ea15d4ab95213f6262a036cba798b00fc7e5715b1a85dbd14404c6b0eb9cf" },
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
	__meta__: { hash: "sha256:6dea46f8a4dd4e0f3c0b9857dcf8c8f7f7f1ce941c03c57309d9a74a707086e6" },
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
	__meta__: { hash: "sha256:0552b2f0245c51750b5802df292c7dcfd45ab624225b741220e319714ca46215" },
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
	__meta__: { hash: "sha256:33580b9db6c8231b873a0a14c019a96cd298c189c6bf45252221b3c2365fa52e" },
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
	__meta__: { hash: "sha256:fced714c236d36184708e5c4793d365afd5c8aedbc00538dfcb85dc20481188a" },
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
	__meta__: { hash: "sha256:f106f9dee32b21fdd18cf0f49df22b506dcbe81880d7cba48e5f94f78a45bd60" },
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
	__meta__: { hash: "sha256:85f7486a3bc243b3566b81373963a809bd52e4376aa938e3a55d8628f3b96efa" },
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
	__meta__: { hash: "sha256:a1413a782fbb82b7724b183fc26a6ead3254257eef404adb4ae858a3287f6cdc" },
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
	__meta__: { hash: "sha256:70f624da76b1466e46ff7c2e8b4b98ffe211050a8a49299bdf1ff9df4d98678e" },
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
	__meta__: { hash: "sha256:5abf241ccafd14bc6c4c67d2da7a82a1ad32cb5e1780c50ce02b05509a6e0ad2" },
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
	__meta__: { hash: "sha256:5948b572758b5166fb3ac4a8658be0bb146200d936e8fa2008a91af2e9152f5a" },
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
	__meta__: { hash: "sha256:7764c7b028b4050dff656c8a6c3c0824d5c527afa56857fb5251e9ca80c535a7" },
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
	__meta__: { hash: "sha256:cd9ef6d394b351a92ecd62bab68353a75e7e73d4268be4254df0d443b61d48d8" },
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
	__meta__: { hash: "sha256:1aabb7863513877dc105c6be18a13f36280ec1ba4a90684280213d5a904a776f" },
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
	__meta__: { hash: "sha256:de6194d7f8d3f244b8b93598f1e996f804dfc0a4cc86e44f81222c9d0647665d" },
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
	__meta__: { hash: "sha256:52ef2573862a9c8e7e78eb7c3a1f591a898f0eac01e17083a0799d25ccc87225" },
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
	__meta__: { hash: "sha256:991911c3688509294ca50243e944b609601b99536b5a8e9024477ae15eb11135" },
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
	__meta__: { hash: "sha256:f3611eda14a0c4fe324022ecad2c80174d5d285d93921b7681101007d54e6f41" },
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
	__meta__: { hash: "sha256:8931e368c9b52ac102700936f16e9f4c409fd2d74d3f1363d425b2e29bd3bbcf" },
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
	__meta__: { hash: "sha256:bafdca4559179a279902c0ff354eca8da28c935e0c26dbe63c93a777d9895ed8" },
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
	__meta__: { hash: "sha256:13215ba5d29299ea2c0301383723e625d50e2cd94e997046324d83cc8b36d787" },
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
	__meta__: { hash: "sha256:8d911793a61e17f54d4568b086e5feeed9d88d0de509e9b597bb4764e08a1999" },
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
	__meta__: { hash: "sha256:22e5b0d9b9bcbb8c26e294fdde3ed527508a072c3a06deef612b57854ad63013" },
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
	__meta__: { hash: "sha256:0853097e5f308ee95b9d78c632d46c8076d2e8406c12086b8c383b814de148bf" },
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
	__meta__: { hash: "sha256:cc0959bdf6503b6c50d39990ded741368d62f027b485013b4e014873046893ea" },
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
	__meta__: { hash: "sha256:d2ddcfb6ac29107661ac10124da04e03b9e8d876af76a11d724fc095a9943f5b" },
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
	__meta__: { hash: "sha256:4260bfd4c114d20d395b5ef82fa13e995bb61bf5f0684e86c20710da217be26a" },
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
	__meta__: { hash: "sha256:072ca1018403992cf49a2359953c328bca2652c405bdb9b998d2894be9b155d6" },
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
	__meta__: { hash: "sha256:5dcde22cba533cb4e43f19424e6f563d8d78e8aa512a42f0d5b0e678cb750fd3" },
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
	__meta__: { hash: "sha256:31446486658633c7e33957568feef7a7f85395ea37f8ef93858e6caed136c5ea" },
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
	__meta__: { hash: "sha256:a2541072a2d68e1922017bc7a3804841da972276ced5281f0a1ab6fca30e9e7b" },
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
	__meta__: { hash: "sha256:a1fc35bac860f78d58267eec8173c70cc6a4e3cd1975b0b81eaccd5a7f63f53d" },
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
	__meta__: { hash: "sha256:55e9687e05f25c7bed4fab4045c611349cc5f2c01bfd1192f2ffe52248755fac" },
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
	__meta__: { hash: "sha256:88eac412e4a869bb57cad6131907a342874dd7b71a684d741770ac47c01e3f75" },
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
	__meta__: { hash: "sha256:b2adf6aeefb8a1c3d554eadcababea8f93bb6cec1974515b5b880f1ca1f0ed77" },
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
	__meta__: { hash: "sha256:2fdfa4d4d36ed474a149877236aee90266616cdf307f4d60941c55e46dbd7461" },
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
	__meta__: { hash: "sha256:cd8b683c92f53fd8382cd7385ac6324b40f486857f662eec52b082589d62a6cd" },
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
	__meta__: { hash: "sha256:b26af6761c3a4a85458c326f67a46910c202ddf604f4b45e029f5428a4bbaba4" },
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
	__meta__: { hash: "sha256:c81c503d01afdc597ec3ebe233eef12f1019b807f07b2e60b6c3487dee2c37ac" },
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
	__meta__: { hash: "sha256:328159a1da19791085c7461331765971083e3b362088a5b4c61bc9bd63c931bd" },
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
	__meta__: { hash: "sha256:2ed8dea3317359749e8b55df26f8b4a3f8d60de8c5985bad399eac77fcb3a2aa" },
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
	__meta__: { hash: "sha256:6d0bbcc54c5232f653908cb1f5de0cbfafb8252abee18cc27d2d2e59c6ed03af" },
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
	__meta__: { hash: "sha256:5cac0f6766477783bca9f29ad957ba336b758fc77e4f987e3203ae64693a42ff" },
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
	__meta__: { hash: "sha256:9e7032c56a4b02f52fb04ca7e621246b12c24fa0a0c80fc2a8fef8f9e5c7122f" },
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
	__meta__: { hash: "sha256:6f47ae23deda8ab91cdbc62506b07bd63bf6938921e82bbc1dffc1e45f06323e" },
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
	__meta__: { hash: "sha256:8a92c9c5c73a831cd628b9c5fdb7f7dd0a260a326818100ae34fd7a996f22403" },
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
	__meta__: { hash: "sha256:373a839711c5ce485cc657b25a211e903db21f39e0344edfb0a8787e59906910" },
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
	__meta__: { hash: "sha256:7a55e3701b6f4a48336d7a7e37714629bf67c0d4616c03030bcb727f936dcd3a" },
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
	__meta__: { hash: "sha256:f59d8971d9779add69d0879f2e406234f8ed2625e765dcaa28deafadee813a37" },
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
	__meta__: { hash: "sha256:30356244d949dab168698ef1dd47222473e783f2036ebcab784a777420c95612" },
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
	__meta__: { hash: "sha256:2495396f7efa81ff9659ef1178e0e57f37288cf44e1ea7845a325b05a57e3f88" },
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
	__meta__: { hash: "sha256:e016e1e7b523771b2da0a608a9d1cdc5e52e1429fb57c7766d2756f337184954" },
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
	__meta__: { hash: "sha256:8e9fbe1c8e828b60124cb4e5dc228eed945965c072fbaf10c884e90574abf45f" },
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
	__meta__: { hash: "sha256:afb30f44abfac23acefb1653c671bd69d9f09b5d90ab00c6e4aaf8ce1c788242" },
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
	__meta__: { hash: "sha256:eb724220b3e7207eaac0b6a54f272dc0bd34cb5613835e6ef739e4d46f26098c" },
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
	__meta__: { hash: "sha256:6b62e2feeb59984a72ce66f972157b495700d606a26a1066030eaf109aa953c4" },
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
	__meta__: { hash: "sha256:fd7d6bbf71c3cd622044652125754058bef49e75f2a9e11677297d843d3ceb93" },
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
	__meta__: { hash: "sha256:ee2fa1213aa8eadf20db6e4bfc644a8b1975eca3b12abe37106ca74c58413d9f" },
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
	__meta__: { hash: "sha256:58f14296abc6a0d31579b5dd73212003401c8251dc53667d9787ac23574e5876" },
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
	__meta__: { hash: "sha256:8a9778ac2438c9cbc07d6775c4628bcb527224c4b75a1e592093188438b74f31" },
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
	__meta__: { hash: "sha256:bd7ab106bcc371b66eb25aa054c92719c1125823dd93af7ca2c76c8c365826ec" },
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
	__meta__: { hash: "sha256:7017781177073d977dca71d4867bc216fdf28cff3bf93999d6612fc5c2250c5c" },
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
	__meta__: { hash: "sha256:69355cab84608f87bf93b77c9c92428eb5c8d4cb8984d009ec28bec63370b840" },
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
	__meta__: { hash: "sha256:47e73f362aff92b4c1a7478c622c285f4bfc207b74354a6cc20baabe05d53af9" },
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
	__meta__: { hash: "sha256:bc3f262b30c2878a3e1116ec51a0d6a77aa14f0d0f3dd2fb17d35f0850c949ac" },
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
	__meta__: { hash: "sha256:cb71e0dee6bf1c654d9accca5791bc8ac338ac5e6445096524e4c5f2e344f9c8" },
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
	__meta__: { hash: "sha256:a45fbb00d0a478337a72c002043a5667e2af0d1b407859982b88e3f00541eafd" },
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
	__meta__: { hash: "sha256:d90b6ffc508bbe77fe9b4c18f106c710e30ded63bef811506fe9e33e542d4055" },
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
	__meta__: { hash: "sha256:37c4ac6957c5c638b42783fee107450fa8483d62538b17421944fa44dfbfdb26" },
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
	__meta__: { hash: "sha256:b7a2d12065fe0d7791ef0deb3a4533e6f8cd7c3771c3e4b207d4835c3ac753d8" },
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
	__meta__: { hash: "sha256:d01d4ed74d5883ef80f0f74c27f68aaff48c368dd5f201f49290da4de7a3ee4f" },
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
	__meta__: { hash: "sha256:175225c08511f4395bb0f0e6c0ed7551eabafd542893fa163b652d65036f2419" },
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
	__meta__: { hash: "sha256:cadef4df44c6bd0379b8100a1e0be0b7ac98c214a9f1c3c72693b20e689e031b" },
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
	__meta__: { hash: "sha256:20e83e803268f575fcf24b5ec4e089012da6e061e68a17b7ef6fae90c53ce663" },
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
	__meta__: { hash: "sha256:352ad87e2bb7ad8c72b388e5642cf6349f0a0f22ab930a1c337c62e4765ed7d1" },
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
	__meta__: { hash: "sha256:7461a159c9b35ef696089ae9866c22244365562f973b7eedad1f1042512dece5" },
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
	__meta__: { hash: "sha256:56f0ddaef23ffe7da86388aeb8d69ee0c248a6d5b339ec0be7dcd5e62da5f9d5" },
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
	__meta__: { hash: "sha256:ffc2e1d8f0ffaa0d00a7590e66d753ddc9b4671ce71da9cb93bf69e3d6cff38c" },
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
	__meta__: { hash: "sha256:bfc9f6d000bcaccdd4b98b8a387ccd6ba408a5cd1a56ec702a5eac2b51dab1c3" },
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
	__meta__: { hash: "sha256:d118a7d2de3392de7c7fa2092a681219c881e3812ac6cd3ac4edf3f970147235" },
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
	__meta__: { hash: "sha256:0e0e498eefdc50dc4040f8210c988b70f994a8ebd02d47817eabb859b82cd9d6" },
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
	__meta__: { hash: "sha256:f5e0ab777e9555cd3af4d7073aba311d5fbf43a24805033f7ce4ace5ea4e09df" },
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
	__meta__: { hash: "sha256:159dedc96e2e386c0e7593bf656c83b60b5af8ac6b20b2f2a9a22809b8cf1d93" },
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
	__meta__: { hash: "sha256:67ec15cd76f51b3c0c0ebbe666b9bc1151aa88d8d2425a619c00613e644cd706" },
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
	__meta__: { hash: "sha256:1837eb71cd4ac140cac1e8c0d2278d96521dfd8929495415e453b09f5a5b337f" },
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
	__meta__: { hash: "sha256:cd3045f7f87508a50ce20b2d8c1b01c73a05eef79a45a0a775b28154978ff4cf" },
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
	__meta__: { hash: "sha256:009e48999873ca7979a1243c42f403e9a2196146a01f839d2409b42aec77db0c" },
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
	__meta__: { hash: "sha256:c45ccf046564641af6c273f0dabe7cb82782b1c8da762b675f8c10b01ba2b637" },
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
	__meta__: { hash: "sha256:aa74ff6a6006b1dbc637e4b0fdc57e9e65d3b027ddd5caf1c74d144874cd5ac2" },
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
	__meta__: { hash: "sha256:cdf505188a2394c5c3896b3b0557f5fa35fbc45b09bea57e605104d3e94782c0" },
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
	__meta__: { hash: "sha256:bd1ef23f8fc781075c6ea987fe79ab2482615370eca75ef4884bcad2647ef390" },
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
	__meta__: { hash: "sha256:b01343dd3bdaf0c73f7ac7fdb3d44fd8a260d22f8bff75797d362f9053b2819a" },
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
	__meta__: { hash: "sha256:1495c06ef6dc48f91821d659b56c24c31bffb6cd00563165c718c418c50168f3" },
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
	__meta__: { hash: "sha256:808a96dfca0a71ef40944deca060bd83f47d90b3f5bfc97bee20eaa6b7950dae" },
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
	__meta__: { hash: "sha256:c7d2e9bef501ad98a33dd9fc9292e5761138972d8846a6496f3495aa8e0fc572" },
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
	__meta__: { hash: "sha256:3a3167916c1ba48f2ce8a845ee849ea1c1a9ac4672256ac40a365d22366d4e61" },
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
	__meta__: { hash: "sha256:e3a49294beaa2f5e79e837f675642f2185c283ce8082eb297c8f65ff5105a4e3" },
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
	__meta__: { hash: "sha256:3065a1b856f50a92381b98b247bdeba7d18868d1f020055242c3783583b2f155" },
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
	__meta__: { hash: "sha256:88e4f42ca8b07dae24ffe5b9adee4e8beb403561c0ade4fc7fa76325a7c7a12c" },
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
	__meta__: { hash: "sha256:bfa2ed3ae0bca72924213fdb478760d1500b454f09c4901438863c42fec04365" },
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
	__meta__: { hash: "sha256:73b7b40708464ef27392fcb45ac07d667782bd83cd93b38041cf0962e2fd9022" },
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
	__meta__: { hash: "sha256:70aa6b947903c39148bb7a0391b66b4a7407ead453e7c30451d0af4f02a164be" },
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
	__meta__: { hash: "sha256:61cb972f35dab9c5ad2915b87cf241e525acad6d6ba0f1b9dda072766366b79c" },
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
	__meta__: { hash: "sha256:6947049c7e31a11951c11816a64d5af1409be7bad8da583e1704e5e2b791bf2b" },
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
	__meta__: { hash: "sha256:93fd8ebb1a873cf9fb31fc37c5276466e43905c36788320806a95db44cbf9f31" },
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
	__meta__: { hash: "sha256:218f2c8c5151f5f22d4f2c61204fa1eaaeb7fd3f6bbf109cb6cb66c15ba401ef" },
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
	__meta__: { hash: "sha256:9722a1bc00c4d60c59c70963ca4cf248ed359e88897cc55471797c5acc381327" },
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
	__meta__: { hash: "sha256:d1284c916cad6e7d198d7ade870d0de8eccf8dbacd5a1acab486401342258528" },
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
	__meta__: { hash: "sha256:2533b2201e45c9d584b0df1fbb72c7f67b5ae5b988a15c6d95968352be832b6c" },
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
	__meta__: { hash: "sha256:f08fc6aa22e9259039d4be2df45036e081de55ca0f597a2cb75e9755d86fe2a2" },
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
	__meta__: { hash: "sha256:bc4985a792f41d75b03787db9475d6774cffd4924767b116da88a051fa6a837a" },
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
	__meta__: { hash: "sha256:fc627f7e7560491d80fa837501488a735e2ae38802792cf5ed0537ab08ee8cee" },
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
	__meta__: { hash: "sha256:ec534c2f5e2f33ce66c5d0de84b2b9b2c9da5020944b7fd2cdf09de38a63a55d" },
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
	__meta__: { hash: "sha256:a3d82f61498ddb744c06a24efa39b53d103df70813fad050cfc12515605d39f6" },
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
	__meta__: { hash: "sha256:2d361c2623c9cc39f95bd765f9091586825d836d3bd080fe19f4c440c014a54b" },
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
	__meta__: { hash: "sha256:e4597f38151fdad30ad79d0d03166cb5aff70cccd52b90ee00e7e684d2b4d55d" },
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
	__meta__: { hash: "sha256:eb0244f6b333fc787447f47afd3f2796c8d196e1f6c5e208c0d54c2538d3e282" },
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
	__meta__: { hash: "sha256:05c401578acb28d2dc5b128a65e1883718a05231261ca59f3a62c8d28a417f56" },
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
	__meta__: { hash: "sha256:f37aa9ebd140c9c51c9e92137b6a696616640da71332c79e6227c74358eec89c" },
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
	__meta__: { hash: "sha256:7263b5f1beec390d52f9125dadb431a53951f2153a942a0a3d8767d61fcc029f" },
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
	__meta__: { hash: "sha256:1d70b65921a4dd48e003e0636e032ff55a929e9806df3a79930c561cb3524621" },
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
	__meta__: { hash: "sha256:8307a65e5e0a1359579e8acc6748c548a55454faf5b76648e073456b24fb3362" },
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
	__meta__: { hash: "sha256:89b27c93878270d6fa2c6cbead634c8df4f6689644436425bc679ff1ab7de43e" },
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
	__meta__: { hash: "sha256:60cf5846cb8b70da61df738afccf3c2d69beab1537f6f99078c32f8d69d225ff" },
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
	__meta__: { hash: "sha256:1cfb86a2f982c388446ef32f1e547e8e067ae832d9c76641b05849bc9fd85cfc" },
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
	__meta__: { hash: "sha256:f6533520baedaaf29bec6f4ce1cd8d61df1254493992ae10bbfbdab736c5348d" },
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
	__meta__: { hash: "sha256:b36dca3be447ebee0ea35ac34f259807e24f262cf84800709aa9aa7de00b9a20" },
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
	__meta__: { hash: "sha256:e7475136474146c74dc438f483a2741080ab8c9a156b9d51ae9058ba65d324e1" },
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
	__meta__: { hash: "sha256:92e7f11008a01918d86a98e70e2970369c0a34852efc1142a376f95c144eaf4a" },
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
	__meta__: { hash: "sha256:f9fd7b75757d97dc50e784da783223286da01d0b450cb4308d31c48f06102096" },
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
	__meta__: { hash: "sha256:49b38fe0e3be632a77f9853fac03e78b0d1439619d1cc523beb94c8228d12398" },
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
	__meta__: { hash: "sha256:460293369feed9879e58c9bc22b289ea6703f334312e6882a8f84dc05e136ae2" },
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
	__meta__: { hash: "sha256:1f74956500e8514ea9375089c96c5eb0ab9c0083b5c31f45490655e422e55e9a" },
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
	__meta__: { hash: "sha256:dd70c3d505019ba85961072845569b4311770c2564bfb538ea3ed3b2f5cef76b" },
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
	__meta__: { hash: "sha256:8c8d0dc10edcb471276fd6b69c8d395c3677fbcbc1b7f81d0a76bbc83a5bac89" },
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
	__meta__: { hash: "sha256:21656490c414e8762daa479c55c58a5f2be32a09a60f752513e3e56b9bbb177a" },
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
	__meta__: { hash: "sha256:233ed2c451f88f9feb51c57b85795bed321ebf1f1cef7682373de8d853e6b164" },
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
	__meta__: { hash: "sha256:53fe575440c1f57d9acb6eab08c351c1bc28536f578b79e7abb7f159555fd539" },
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
	__meta__: { hash: "sha256:2bcfaa7d8af3d6e4e9622a7259753d236d7e91f330e7b66967656c167b88aa59" },
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
	__meta__: { hash: "sha256:34dcdb3c6314267be18abb3de15049a5e0c2261588a63fb147211a77099b6c13" },
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
	__meta__: { hash: "sha256:452e932e8ab7d2c6dd8d59060ad1afb325c1bbccf09f39a6a9356980def87767" },
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
	__meta__: { hash: "sha256:d560e76d8e293566ebadbdb2c27712d12e3a01dc441b0a3f98265de53692e37f" },
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
	__meta__: { hash: "sha256:3df71a7f5f6fb4e2b8ef63da4fc74a582ba64690c879c9e96985fe4b32e53e22" },
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
	__meta__: { hash: "sha256:063bcf795ba9c7c9e2c32c667a5721bbc4db55f6e39df08499ec20b0183b04a7" },
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
	__meta__: { hash: "sha256:68b6cc1037227588bafbbc8972db58bd8e602ff2d6822cd217c82128aa5cc781" },
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
	__meta__: { hash: "sha256:a55bc4196b573b2cd5d0572e9ee15b87a6b1d44d62577c62dda14614b1229b97" },
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
	__meta__: { hash: "sha256:b1ee1bb76c691d0d701d16e66665f6d05da07c824cdf8070a6097a34eb66a6db" },
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
	__meta__: { hash: "sha256:d2e5c7961dd2572a160b223e8c5205aea131d9e6a1028560b856c119920f554f" },
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
	__meta__: { hash: "sha256:d2b121ff6da1f078cfbfada8926f1c6e449069096bc99c469968ef49f7f9f169" },
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
	__meta__: { hash: "sha256:f85843188e79f8a646842f899e62b8906cb402d428fc9f89149e1f32fe24ad38" },
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
	__meta__: { hash: "sha256:8bcecd90888e11ee85c1e499992f31ca78da4d300cdad45a276a48367e538f64" },
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
	__meta__: { hash: "sha256:d016f83294ecc6b2e472b6c4d28c66008c8e79fa31440c5dd7561ceb5c8697e1" },
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
	__meta__: { hash: "sha256:db8531783240b5da7de65130605cb1c8b719321802d0836c5645932588493fd7" },
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
	__meta__: { hash: "sha256:28bd4ca3011d08a4a6a8139199dbb4488771c91fdf5e4aea38e1b24cd7edd495" },
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
	__meta__: { hash: "sha256:3489bc10fc37be082216751b9e001cd640e075974f8c928cf422be622919ab08" },
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