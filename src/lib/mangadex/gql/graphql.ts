/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	/** A scalar that can represent any JSON Object value. */
	JSONObject: { input: any; output: any };
	MangaDexDateTime: { input: any; output: any };
	MangaDexDuration: { input: any; output: any };
	Password: { input: any; output: any };
	PathBuf: { input: any; output: any };
	/**
	 * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
	 * Strings within GraphQL. UUIDs are used to assign unique identifiers to
	 * entities without requiring a central allocating authority.
	 *
	 * # References
	 *
	 * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
	 * * [RFC4122: A Universally Unique Identifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
	 */
	UUID: { input: any; output: any };
	/** URL is a String implementing the [URL Standard](http://url.spec.whatwg.org/) */
	Url: { input: any; output: any };
	Username: { input: any; output: any };
};

export type Accent = {
	__typename?: "Accent";
	active: Scalars["String"]["output"];
	default: Scalars["String"]["output"];
	hover: Scalars["String"]["output"];
};

export type AccentInput = {
	active: Scalars["String"]["input"];
	default: Scalars["String"]["input"];
	hover: Scalars["String"]["input"];
};

export type Accents = {
	__typename?: "Accents";
	default: Accent;
	l1: Accent;
	l2: Accent;
	l3: Accent;
	l4: Accent;
	l5: Accent;
};

export type AccentsInput = {
	default: AccentInput;
	l1: AccentInput;
	l2: AccentInput;
	l3: AccentInput;
	l4: AccentInput;
	l5: AccentInput;
};

export type ApiClient = {
	__typename?: "ApiClient";
	attributes: ApiClientAttributes;
	id: Scalars["UUID"]["output"];
	relationships: ApiClientRelationships;
	secret: Scalars["String"]["output"];
};

export type ApiClientAttributes = {
	__typename?: "ApiClientAttributes";
	createdAt: Scalars["MangaDexDateTime"]["output"];
	description?: Maybe<Scalars["String"]["output"]>;
	externalClientId?: Maybe<Scalars["String"]["output"]>;
	isActive: Scalars["Boolean"]["output"];
	name: Scalars["String"]["output"];
	profile: ApiClientProfile;
	state: ApiClientState;
	updatedAt: Scalars["MangaDexDateTime"]["output"];
	version: Scalars["Int"]["output"];
};

export type ApiClientCreateParams = {
	description?: InputMaybe<Scalars["String"]["input"]>;
	name: Scalars["String"]["input"];
	profile?: ApiClientProfile;
	version?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ApiClientDeleteParam = {
	clientId: Scalars["UUID"]["input"];
	version?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ApiClientEditParam = {
	clientId: Scalars["UUID"]["input"];
	description?: InputMaybe<Scalars["String"]["input"]>;
	version: Scalars["Int"]["input"];
};

export type ApiClientListParam = {
	includes?: Array<ReferenceExpansionResource>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	state?: InputMaybe<ApiClientState>;
};

export type ApiClientMutation = {
	__typename?: "ApiClientMutation";
	create: ApiClient;
	delete: Scalars["Boolean"]["output"];
	edit: ApiClient;
	regenerateSecret: Scalars["String"]["output"];
};

export type ApiClientMutationCreateArgs = {
	params: ApiClientCreateParams;
};

export type ApiClientMutationDeleteArgs = {
	params: ApiClientDeleteParam;
};

export type ApiClientMutationEditArgs = {
	params: ApiClientEditParam;
};

export type ApiClientMutationRegenerateSecretArgs = {
	id: Scalars["UUID"]["input"];
};

/** The Api Client profile */
export enum ApiClientProfile {
	Personal = "PERSONAL",
	Public = "PUBLIC"
}

export type ApiClientQueries = {
	__typename?: "ApiClientQueries";
	get: ApiClient;
	list: ApiClientResults;
};

export type ApiClientQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
};

export type ApiClientQueriesListArgs = {
	params?: ApiClientListParam;
};

export type ApiClientRelationships = {
	__typename?: "ApiClientRelationships";
	creator: User;
};

export type ApiClientResults = {
	__typename?: "ApiClientResults";
	data: Array<ApiClient>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

/**
 * API Client state for approval.
 *
 * The purpose of these are to discourage troll entries by requiring staff approval.
 */
export enum ApiClientState {
	Approved = "APPROVED",
	Autoapproved = "AUTOAPPROVED",
	Rejected = "REJECTED",
	Requested = "REQUESTED"
}

export type AuthCheck = {
	__typename?: "AuthCheck";
	isAuthenticated: Scalars["Boolean"]["output"];
	permissions: Array<Scalars["String"]["output"]>;
	roles: Array<UserRole>;
};

export type AuthQuery = {
	__typename?: "AuthQuery";
	check: AuthCheck;
};

export type Author = {
	__typename?: "Author";
	attributes: AuthorAttributes;
	id: Scalars["UUID"]["output"];
	relationships: AuthorRelationships;
};

export type AuthorAttributes = {
	__typename?: "AuthorAttributes";
	biography: Scalars["JSONObject"]["output"];
	booth?: Maybe<Scalars["Url"]["output"]>;
	createdAt: Scalars["MangaDexDateTime"]["output"];
	fanBox?: Maybe<Scalars["Url"]["output"]>;
	fantia?: Maybe<Scalars["Url"]["output"]>;
	imageUrl?: Maybe<Scalars["Url"]["output"]>;
	melonBook?: Maybe<Scalars["Url"]["output"]>;
	name: Scalars["String"]["output"];
	naver?: Maybe<Scalars["Url"]["output"]>;
	nicoVideo?: Maybe<Scalars["Url"]["output"]>;
	pixiv?: Maybe<Scalars["Url"]["output"]>;
	skeb?: Maybe<Scalars["Url"]["output"]>;
	tumblr?: Maybe<Scalars["Url"]["output"]>;
	twitter?: Maybe<Scalars["Url"]["output"]>;
	updatedAt?: Maybe<Scalars["MangaDexDateTime"]["output"]>;
	version: Scalars["Int"]["output"];
	website?: Maybe<Scalars["Url"]["output"]>;
	weibo?: Maybe<Scalars["Url"]["output"]>;
	youtube?: Maybe<Scalars["Url"]["output"]>;
};

export type AuthorCreateParams = {
	biography?: InputMaybe<Scalars["JSONObject"]["input"]>;
	booth?: InputMaybe<Scalars["Url"]["input"]>;
	fanBox?: InputMaybe<Scalars["Url"]["input"]>;
	fantia?: InputMaybe<Scalars["Url"]["input"]>;
	melonBook?: InputMaybe<Scalars["Url"]["input"]>;
	name: Scalars["String"]["input"];
	naver?: InputMaybe<Scalars["Url"]["input"]>;
	nicoVideo?: InputMaybe<Scalars["Url"]["input"]>;
	pixiv?: InputMaybe<Scalars["Url"]["input"]>;
	skeb?: InputMaybe<Scalars["Url"]["input"]>;
	tumblr?: InputMaybe<Scalars["Url"]["input"]>;
	twitter?: InputMaybe<Scalars["Url"]["input"]>;
	website?: InputMaybe<Scalars["Url"]["input"]>;
	weibo?: InputMaybe<Scalars["Url"]["input"]>;
	youtube?: InputMaybe<Scalars["Url"]["input"]>;
};

export type AuthorEditParams = {
	biography?: InputMaybe<Scalars["JSONObject"]["input"]>;
	booth?: InputMaybe<Scalars["Url"]["input"]>;
	fanBox?: InputMaybe<Scalars["Url"]["input"]>;
	fantia?: InputMaybe<Scalars["Url"]["input"]>;
	id: Scalars["UUID"]["input"];
	melonBook?: InputMaybe<Scalars["Url"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	naver?: InputMaybe<Scalars["Url"]["input"]>;
	nicoVideo?: InputMaybe<Scalars["Url"]["input"]>;
	pixiv?: InputMaybe<Scalars["Url"]["input"]>;
	skeb?: InputMaybe<Scalars["Url"]["input"]>;
	tumblr?: InputMaybe<Scalars["Url"]["input"]>;
	twitter?: InputMaybe<Scalars["Url"]["input"]>;
	version: Scalars["Int"]["input"];
	website?: InputMaybe<Scalars["Url"]["input"]>;
	weibo?: InputMaybe<Scalars["Url"]["input"]>;
	youtube?: InputMaybe<Scalars["Url"]["input"]>;
};

export type AuthorListParams = {
	authorIds?: Array<Scalars["UUID"]["input"]>;
	includes?: Array<ReferenceExpansionResource>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<AuthorSortOrder>;
};

export type AuthorMutations = {
	__typename?: "AuthorMutations";
	create: Author;
	delete: Scalars["Boolean"]["output"];
	edit: Author;
};

export type AuthorMutationsCreateArgs = {
	params: AuthorCreateParams;
};

export type AuthorMutationsDeleteArgs = {
	id: Scalars["UUID"]["input"];
};

export type AuthorMutationsEditArgs = {
	params: AuthorEditParams;
};

export type AuthorQueries = {
	__typename?: "AuthorQueries";
	get: Author;
	list: AuthorResults;
};

export type AuthorQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
};

export type AuthorQueriesListArgs = {
	params?: InputMaybe<AuthorListParams>;
};

export type AuthorRelationships = {
	__typename?: "AuthorRelationships";
	works: Array<MangaObject>;
};

export type AuthorResults = {
	__typename?: "AuthorResults";
	data: Array<Author>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type AuthorSortOrder = { name: OrderDirection };

export type BeginEditUploadSessionParam = {
	chapterId: Scalars["UUID"]["input"];
	version: Scalars["Int"]["input"];
};

export type BeginUploadSessionParam = {
	groups?: Array<Scalars["UUID"]["input"]>;
	mangaId: Scalars["UUID"]["input"];
};

export type ButtonAccentColor = {
	__typename?: "ButtonAccentColor";
	alternate: Scalars["String"]["output"];
	default: Scalars["String"]["output"];
};

export type ButtonAccentInput = {
	alternate: Scalars["String"]["input"];
	default: Scalars["String"]["input"];
};

export type CaptchaMutations = {
	__typename?: "CaptchaMutations";
	solve: Scalars["Boolean"]["output"];
};

export type CaptchaMutationsSolveArgs = {
	params: CaptchaSolveParams;
};

export type CaptchaSolveParams = {
	captchaChallenge: Scalars["String"]["input"];
};

export type Chapter = {
	__typename?: "Chapter";
	attributes: ChapterAttributes;
	id: Scalars["UUID"]["output"];
	relationships: ChapterRelationships;
};

export type ChapterAggregate = {
	__typename?: "ChapterAggregate";
	chapter: Scalars["String"]["output"];
	count: Scalars["Int"]["output"];
	ids: Array<Scalars["UUID"]["output"]>;
};

export type ChapterAttributes = {
	__typename?: "ChapterAttributes";
	chapter?: Maybe<Scalars["String"]["output"]>;
	createdAt: Scalars["MangaDexDateTime"]["output"];
	externalUrl?: Maybe<Scalars["Url"]["output"]>;
	pages: Scalars["Int"]["output"];
	publishAt?: Maybe<Scalars["MangaDexDateTime"]["output"]>;
	readableAt?: Maybe<Scalars["MangaDexDateTime"]["output"]>;
	title?: Maybe<Scalars["String"]["output"]>;
	translatedLanguage: Language;
	updatedAt?: Maybe<Scalars["MangaDexDateTime"]["output"]>;
	uploader?: Maybe<Scalars["UUID"]["output"]>;
	version: Scalars["Int"]["output"];
	volume?: Maybe<Scalars["String"]["output"]>;
};

export type ChapterDownloadState = {
	__typename?: "ChapterDownloadState";
	downloading?: Maybe<ChapterDownloadingState>;
	error?: Maybe<Scalars["String"]["output"]>;
	isCanceled: Scalars["Boolean"]["output"];
	isDone: Scalars["Boolean"]["output"];
	isOfflineAppStateNotLoaded: Scalars["Boolean"]["output"];
	isPending: Scalars["Boolean"]["output"];
};

export type ChapterDownloadingState = {
	__typename?: "ChapterDownloadingState";
	fetchingImage?: Maybe<ChapterImageFetchingStatus>;
	isFetchingAtHomeData: Scalars["Boolean"]["output"];
	isFetchingData: Scalars["Boolean"]["output"];
	isPreloading: Scalars["Boolean"]["output"];
};

export enum ChapterFeedStyle {
	CoverFull = "COVER_FULL",
	CoverLess = "COVER_LESS"
}

export type ChapterImageFetchingStatus = {
	__typename?: "ChapterImageFetchingStatus";
	filename: Scalars["String"]["output"];
	index: Scalars["Int"]["output"];
	len: Scalars["Int"]["output"];
};

export type ChapterImageSize = {
	__typename?: "ChapterImageSize";
	height: Scalars["Int"]["output"];
	width: Scalars["Int"]["output"];
};

export type ChapterLayoutStore = {
	__typename?: "ChapterLayoutStore";
	drawer: DrawerMode;
	progress: ProgressMode;
	sidebar: SidebarMode;
};

export type ChapterListParams = {
	chapterIds?: Array<Scalars["UUID"]["input"]>;
	/** Chapter number in the series or volume. */
	chapters?: Array<Scalars["String"]["input"]>;
	contentRating?: Array<ContentRating>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	createdAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	/** Groups to exclude from the results. */
	excludedGroups?: Array<Scalars["UUID"]["input"]>;
	excludedOriginalLanguages?: Array<Language>;
	/** Uploaders to exclude from the results. */
	excludedUploaders?: Array<Scalars["UUID"]["input"]>;
	groups?: Array<Scalars["UUID"]["input"]>;
	/** Include empty pages */
	includeEmptyPages?: InputMaybe<IncludeFuturePages>;
	/** Include external url chapters */
	includeExternalUrl?: InputMaybe<IncludeExternalUrl>;
	/** Include future publish at */
	includeFuturePublishAt?: InputMaybe<IncludeFuturePublishAt>;
	/**
	 * Flag to include future chapter updates in the results.
	 *
	 * Default: `IncludeFutureUpdates::Include` (1)
	 */
	includeFutureUpdates?: InputMaybe<IncludeFutureUpdates>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	mangaId?: InputMaybe<Scalars["UUID"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<ChapterSortOrder>;
	originalLanguages?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	publishAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	title?: InputMaybe<Scalars["String"]["input"]>;
	translatedLanguages?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	updatedAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	uploaders?: Array<Scalars["UUID"]["input"]>;
	volumes?: Array<Scalars["String"]["input"]>;
};

export type ChapterMutations = {
	__typename?: "ChapterMutations";
	cancelDownload: Scalars["Boolean"]["output"];
	delete: Scalars["Boolean"]["output"];
	download: DownloadState;
	pagesCache: ChapterPagesStoreMutation;
	/** Remove the chapter from the current device or offline */
	remove: Scalars["Boolean"]["output"];
	update: Chapter;
};

export type ChapterMutationsCancelDownloadArgs = {
	id: Scalars["UUID"]["input"];
};

export type ChapterMutationsDeleteArgs = {
	id: Scalars["UUID"]["input"];
};

export type ChapterMutationsDownloadArgs = {
	id: Scalars["UUID"]["input"];
	quality?: InputMaybe<DownloadMode>;
};

export type ChapterMutationsPagesCacheArgs = {
	id: Scalars["UUID"]["input"];
	mode?: InputMaybe<DownloadMode>;
};

export type ChapterMutationsRemoveArgs = {
	id: Scalars["UUID"]["input"];
};

export type ChapterMutationsUpdateArgs = {
	params: ChapterUpdateParams;
};

/** The sub object */
export type ChapterPage = {
	__typename?: "ChapterPage";
	/** Page index */
	index: Scalars["Int"]["output"];
	/** total pages that should be sent */
	pages: Scalars["Int"]["output"];
	/** This image size (if available) */
	size?: Maybe<ChapterImageSize>;
	/** Page url (this one should points to an internal scheme) */
	url: Scalars["Url"]["output"];
};

export type ChapterPages = {
	__typename?: "ChapterPages";
	data: Array<Scalars["Url"]["output"]>;
	dataSaver: Array<Scalars["Url"]["output"]>;
};

export type ChapterPagesStoreMutation = {
	__typename?: "ChapterPagesStoreMutation";
	fetchMetadata: Scalars["Boolean"]["output"];
	refetchPage: Scalars["Boolean"]["output"];
	resendAll: Scalars["Boolean"]["output"];
	resendPage: Scalars["Boolean"]["output"];
	startCaching: Scalars["Boolean"]["output"];
};

export type ChapterPagesStoreMutationRefetchPageArgs = {
	page: Scalars["Int"]["input"];
};

export type ChapterPagesStoreMutationResendPageArgs = {
	page: Scalars["Int"]["input"];
};

export type ChapterQueries = {
	__typename?: "ChapterQueries";
	get: Chapter;
	isDownloaded: DownloadState;
	list: ChapterResults;
	listWithGroupByManga: MangaChapterGroup;
	pages: ChapterPages;
};

export type ChapterQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
};

export type ChapterQueriesIsDownloadedArgs = {
	id: Scalars["UUID"]["input"];
};

export type ChapterQueriesListArgs = {
	feedContent?: InputMaybe<Scalars["Boolean"]["input"]>;
	offlineParams?: InputMaybe<GetAllChapterParams>;
	params?: InputMaybe<ChapterListParams>;
};

export type ChapterQueriesListWithGroupByMangaArgs = {
	chapterListParams?: InputMaybe<ChapterListParams>;
	feedContent?: InputMaybe<Scalars["Boolean"]["input"]>;
	mangaListParams?: InputMaybe<MangaListParams>;
};

export type ChapterQueriesPagesArgs = {
	id: Scalars["UUID"]["input"];
};

export type ChapterRelationships = {
	__typename?: "ChapterRelationships";
	manga: MangaObject;
	scanlationGroups: Array<ScanlationGroup>;
	user: User;
};

export type ChapterResults = {
	__typename?: "ChapterResults";
	data: Array<Chapter>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

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

export type ChapterStatisticsQueries = {
	__typename?: "ChapterStatisticsQueries";
	get: Statistics;
	list: Array<Statistics>;
};

export type ChapterStatisticsQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
};

export type ChapterStatisticsQueriesListArgs = {
	ids: Array<Scalars["UUID"]["input"]>;
};

export type ChapterUpdateParams = {
	/**
	 * Chapter number.
	 *
	 * <= 8 characters in length.
	 *
	 * Nullable.
	 */
	chapter?: InputMaybe<Scalars["String"]["input"]>;
	chapterId: Scalars["UUID"]["input"];
	groups?: Array<Scalars["UUID"]["input"]>;
	/**
	 * <= 255 characters in length.
	 *
	 * Nullable.
	 */
	title?: InputMaybe<Scalars["String"]["input"]>;
	translatedLanguage?: InputMaybe<Language>;
	/** >= 1 */
	version: Scalars["Int"]["input"];
	/**
	 * Volume number.
	 *
	 * Nullable.
	 */
	volume?: InputMaybe<Scalars["String"]["input"]>;
};

export type ClientInfo = {
	__typename?: "ClientInfo";
	clientId: Scalars["String"]["output"];
	clientSecret: Scalars["String"]["output"];
};

export type CommitUploadSessionParam = {
	/** Nullable */
	chapter?: InputMaybe<Scalars["String"]["input"]>;
	/**
	 * Must be a URL with "http(s)://".
	 *
	 * Nullable
	 */
	externalUrl?: InputMaybe<Scalars["Url"]["input"]>;
	/** Ordered list of Upload Session File IDs. */
	pageOrder: Array<Scalars["UUID"]["input"]>;
	publishAt?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	sessionId: Scalars["UUID"]["input"];
	/** Nullable */
	title?: InputMaybe<Scalars["String"]["input"]>;
	translatedLanguage: Language;
	/** Nullable */
	volume?: InputMaybe<Scalars["String"]["input"]>;
};

export type ContentProfile = {
	__typename?: "ContentProfile";
	contentRating: Array<ContentRating>;
	excludedGroups: Array<Scalars["UUID"]["output"]>;
	excludedOriginalLanguage: Array<Language>;
	excludedTags: Array<Scalars["UUID"]["output"]>;
	excludedTagsMode?: Maybe<TagSearchMode>;
	excludedUploaders: Array<Scalars["UUID"]["output"]>;
	includedTags: Array<Scalars["UUID"]["output"]>;
	includedTagsMode?: Maybe<TagSearchMode>;
	originalLanguages: Array<Language>;
	publicationDemographic: Array<Demographic>;
	status: Array<MangaStatus>;
	translatedLanguages: Array<Language>;
};

export type ContentProfileEntry = {
	__typename?: "ContentProfileEntry";
	name: Scalars["String"]["output"];
	value: ContentProfile;
};

export type ContentProfileEntryInput = {
	name: Scalars["String"]["input"];
	value: ContentProfileInput;
};

export type ContentProfileInput = {
	contentRating?: Array<ContentRating>;
	excludedGroups?: Array<Scalars["UUID"]["input"]>;
	excludedOriginalLanguage?: Array<Language>;
	excludedTags?: Array<Scalars["UUID"]["input"]>;
	excludedTagsMode?: InputMaybe<TagSearchMode>;
	excludedUploaders?: Array<Scalars["UUID"]["input"]>;
	includedTags?: Array<Scalars["UUID"]["input"]>;
	includedTagsMode?: InputMaybe<TagSearchMode>;
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

export type Contrast = {
	__typename?: "Contrast";
	l1: Scalars["String"]["output"];
};

export type ContrastInput = {
	l1: Scalars["String"]["input"];
};

export type Cover = {
	__typename?: "Cover";
	attributes: CoverAttributes;
	id: Scalars["UUID"]["output"];
	relationships: CoverRelationships;
};

export type CoverAttributes = {
	__typename?: "CoverAttributes";
	createdAt: Scalars["MangaDexDateTime"]["output"];
	description: Scalars["String"]["output"];
	fileName: Scalars["String"]["output"];
	locale?: Maybe<Language>;
	updatedAt?: Maybe<Scalars["MangaDexDateTime"]["output"]>;
	version: Scalars["Int"]["output"];
	volume?: Maybe<Scalars["String"]["output"]>;
};

export type CoverDownloadState = {
	__typename?: "CoverDownloadState";
	downloading?: Maybe<CoverDownloadingState>;
	error?: Maybe<Scalars["String"]["output"]>;
	isCanceled: Scalars["Boolean"]["output"];
	isDone: Scalars["Boolean"]["output"];
	isOfflineAppStateNotLoaded: Scalars["Boolean"]["output"];
	isPending: Scalars["Boolean"]["output"];
};

export enum CoverDownloadingState {
	FetchingData = "FETCHING_DATA",
	FetchingImage = "FETCHING_IMAGE",
	Preloading = "PRELOADING"
}

export type CoverEditParam = {
	coverOrMangaId: Scalars["UUID"]["input"];
	/** 0-512 characters in length. */
	description?: InputMaybe<Scalars["String"]["input"]>;
	locale?: InputMaybe<Language>;
	/** >= 1 */
	version: Scalars["Int"]["input"];
	/** 0-8 characters in length. */
	volume: Scalars["String"]["input"];
};

export enum CoverImageQuality {
	V256 = "V256",
	V512 = "V512"
}

export type CoverListParam = {
	coverIds?: Array<Scalars["UUID"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	locales?: Array<Language>;
	mangaIds?: Array<Scalars["UUID"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<CoverSortOrder>;
	uploaderIds?: Array<Scalars["UUID"]["input"]>;
};

export type CoverMutations = {
	__typename?: "CoverMutations";
	cancelDownload: Scalars["Boolean"]["output"];
	delete: Scalars["Boolean"]["output"];
	download: DownloadState;
	edit: Cover;
	remove: Scalars["Boolean"]["output"];
	saveImage: Scalars["String"]["output"];
	upload: Cover;
};

export type CoverMutationsCancelDownloadArgs = {
	id: Scalars["UUID"]["input"];
};

export type CoverMutationsDeleteArgs = {
	id: Scalars["UUID"]["input"];
};

export type CoverMutationsDownloadArgs = {
	id: Scalars["UUID"]["input"];
};

export type CoverMutationsEditArgs = {
	params: CoverEditParam;
};

export type CoverMutationsRemoveArgs = {
	id: Scalars["UUID"]["input"];
};

export type CoverMutationsSaveImageArgs = {
	coverId: Scalars["UUID"]["input"];
	exportDir: Scalars["String"]["input"];
};

export type CoverMutationsUploadArgs = {
	params: CoverUploadParam;
};

export type CoverQueries = {
	__typename?: "CoverQueries";
	get: Cover;
	getImage: Scalars["Url"]["output"];
	isDownloaded: DownloadState;
	list: CoverResults;
};

export type CoverQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
};

export type CoverQueriesGetImageArgs = {
	coverId: Scalars["UUID"]["input"];
	filename: Scalars["String"]["input"];
	mangaId: Scalars["UUID"]["input"];
	mode?: InputMaybe<CoverImageQuality>;
};

export type CoverQueriesIsDownloadedArgs = {
	id: Scalars["UUID"]["input"];
};

export type CoverQueriesListArgs = {
	params?: CoverListParam;
};

export type CoverRelationships = {
	__typename?: "CoverRelationships";
	manga: MangaObject;
	user: User;
};

export type CoverResults = {
	__typename?: "CoverResults";
	data: Array<Cover>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type CoverSortOrder =
	| { createdAt: OrderDirection; updatedAt?: never; volume?: never }
	| { createdAt?: never; updatedAt: OrderDirection; volume?: never }
	| { createdAt?: never; updatedAt?: never; volume: OrderDirection };

export type CoverUploadParam = {
	description?: Scalars["String"]["input"];
	file: Scalars["PathBuf"]["input"];
	locale: Language;
	mangaId: Scalars["UUID"]["input"];
	/**
	 * Volume number the cover is associated with.
	 *
	 * * Nullable
	 * * <= 8 characters
	 * * Pattern: `^(0|[1-9]\\d*)((\\.\\d+){1,2})?[a-z]?$`
	 */
	volume?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateForumThreadParams = {
	id: Scalars["UUID"]["input"];
	type: ForumThreadType;
};

export type CreateMangaParam = {
	altTitles?: InputMaybe<Array<Scalars["JSONObject"]["input"]>>;
	artists?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
	authors?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
	chapterNumbersResetOnNewVolume?: InputMaybe<Scalars["Boolean"]["input"]>;
	contentRating: ContentRating;
	description?: InputMaybe<Scalars["JSONObject"]["input"]>;
	lastChapter?: InputMaybe<Scalars["String"]["input"]>;
	lastVolume?: InputMaybe<Scalars["String"]["input"]>;
	links?: InputMaybe<Scalars["JSONObject"]["input"]>;
	originalLanguage: Language;
	/** Cover ID. */
	primaryCover?: InputMaybe<Scalars["UUID"]["input"]>;
	publicationDemographic?: InputMaybe<Demographic>;
	status: MangaStatus;
	tags?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
	title: Scalars["JSONObject"]["input"];
	/** >= 1 */
	version: Scalars["Int"]["input"];
	/** Year the manga was released. */
	year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CreateReportParam = {
	category: ReportCategory;
	/** Optional notes about why this is being reported. */
	details?: InputMaybe<Scalars["String"]["input"]>;
	/**
	 * The ID from the category type.
	 *
	 * For example, if the category is "manga", this should be a manga UUID.
	 */
	objectId: Scalars["UUID"]["input"];
	/**
	 * The report reason ID for sub-categorization.
	 *
	 * For example, if a manga was being reported for being a troll entry, the specific reason ID should be used, obtained from the [list report reasons endpoint](crate::v5::report::list).
	 */
	reason: Scalars["UUID"]["input"];
};

export type CreateScalantionGroupParam = {
	/** Nullable. */
	contactEmail?: InputMaybe<Scalars["String"]["input"]>;
	/** Nullable. */
	description?: InputMaybe<Scalars["String"]["input"]>;
	/** Nullable. */
	discord?: InputMaybe<Scalars["String"]["input"]>;
	inactive?: InputMaybe<Scalars["Boolean"]["input"]>;
	/** Nullable. */
	ircChannel?: InputMaybe<Scalars["String"]["input"]>;
	/** Nullable. */
	ircServer?: InputMaybe<Scalars["String"]["input"]>;
	/**
	 * Regex: [^https:/\/www\.mangaupdates\.com\/(?:groups|publishers)\.html\?id=\d+](https://www.mangaupdates.com)
	 *
	 * Nullable.
	 */
	mangaUpdates?: InputMaybe<Scalars["Url"]["input"]>;
	name: Scalars["String"]["input"];
	/** Nullable. */
	publishDelay?: InputMaybe<Scalars["MangaDexDuration"]["input"]>;
	/** Nullable. */
	twitter?: InputMaybe<Scalars["Url"]["input"]>;
	/** Nullable. */
	website?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateUpdateRating = {
	mangaId: Scalars["UUID"]["input"];
	/**
	 * `[ 1 .. 10 ]`.
	 *
	 * Numbers below `1` will be set at `1` and numbers above `10` will be set at `10`.
	 */
	rating: Scalars["Int"]["input"];
};

export type CurrentLoggedLists = {
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CurrentUserLibrary = {
	__typename?: "CurrentUserLibrary";
	completed: MangaResults;
	dropped: MangaResults;
	onHold: MangaResults;
	planToRead: MangaResults;
	reReading: MangaResults;
	reading: MangaResults;
	size: CurrentUserLibrarySize;
	unfiltered: MangaResults;
};

export type CurrentUserLibraryCompletedArgs = {
	param?: InputMaybe<UserLibrarySectionParam>;
};

export type CurrentUserLibraryDroppedArgs = {
	param?: InputMaybe<UserLibrarySectionParam>;
};

export type CurrentUserLibraryOnHoldArgs = {
	param?: InputMaybe<UserLibrarySectionParam>;
};

export type CurrentUserLibraryPlanToReadArgs = {
	param?: InputMaybe<UserLibrarySectionParam>;
};

export type CurrentUserLibraryReReadingArgs = {
	param?: InputMaybe<UserLibrarySectionParam>;
};

export type CurrentUserLibraryReadingArgs = {
	param?: InputMaybe<UserLibrarySectionParam>;
};

export type CurrentUserLibraryUnfilteredArgs = {
	param?: InputMaybe<UserLibrarySectionParam>;
};

export type CurrentUserLibrarySize = {
	__typename?: "CurrentUserLibrarySize";
	completed: Scalars["Int"]["output"];
	dropped: Scalars["Int"]["output"];
	onHold: Scalars["Int"]["output"];
	planToRead: Scalars["Int"]["output"];
	reReading: Scalars["Int"]["output"];
	reading: Scalars["Int"]["output"];
	unfiltered: Scalars["Int"]["output"];
};

export type CustomList = {
	__typename?: "CustomList";
	attributes: CustomListAttributes;
	id: Scalars["UUID"]["output"];
	relationships: CustomListRelationships;
};

export type CustomListAddMangaParam = {
	listId: Scalars["UUID"]["input"];
	mangaId: Scalars["UUID"]["input"];
};

export type CustomListAttributes = {
	__typename?: "CustomListAttributes";
	name: Scalars["String"]["output"];
	version: Scalars["Int"]["output"];
	visibility: CustomListVisibility;
};

export type CustomListCreateParam = {
	manga?: Array<Scalars["UUID"]["input"]>;
	name: Scalars["String"]["input"];
	version?: InputMaybe<Scalars["Int"]["input"]>;
	visibility?: InputMaybe<CustomListVisibility>;
};

export type CustomListExportMutations = {
	__typename?: "CustomListExportMutations";
	asCsv: Scalars["String"]["output"];
	asMyAnimeList: Scalars["String"]["output"];
};

export type CustomListExportMutationsAsCsvArgs = {
	option: ExportCustomListsToCsvOptions;
};

export type CustomListExportMutationsAsMyAnimeListArgs = {
	option: MdcustomListsToMyAnimeListExportOption;
};

export type CustomListMangaFeedParams = {
	contentRating?: Array<ContentRating>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	createdAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	/** Groups to exclude from the results. */
	excludedGroups?: Array<Scalars["UUID"]["input"]>;
	excludedOriginalLanguage?: Array<Language>;
	/** Uploaders to exclude from the results. */
	excludedUploaders?: Array<Scalars["UUID"]["input"]>;
	includeEmptyPages?: InputMaybe<IncludeFuturePages>;
	includeExternalUrl?: InputMaybe<IncludeExternalUrl>;
	includeFuturePublishAt?: InputMaybe<IncludeFuturePublishAt>;
	/**
	 * Flag to include future chapter updates in the results.
	 *
	 * Default: `IncludeFutureUpdates::Include` (1)
	 */
	includeFutureUpdates?: InputMaybe<IncludeFutureUpdates>;
	includes?: Array<ReferenceExpansionResource>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	listId: Scalars["UUID"]["input"];
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<MangaFeedSortOrder>;
	originalLanguage?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	publishAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	translatedLanguage?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	updatedAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
};

export type CustomListMutations = {
	__typename?: "CustomListMutations";
	addManga: Scalars["Boolean"]["output"];
	addMangaBatch: Scalars["Boolean"]["output"];
	create: CustomList;
	delete: Scalars["Boolean"]["output"];
	export: CustomListExportMutations;
	follow: Scalars["Boolean"]["output"];
	removeManga: Scalars["Boolean"]["output"];
	removeMangaBatch: Scalars["Boolean"]["output"];
	unfollow: Scalars["Boolean"]["output"];
	update: CustomList;
};

export type CustomListMutationsAddMangaArgs = {
	params: CustomListAddMangaParam;
};

export type CustomListMutationsAddMangaBatchArgs = {
	listId: Scalars["UUID"]["input"];
	mangaIds: Array<Scalars["UUID"]["input"]>;
};

export type CustomListMutationsCreateArgs = {
	params: CustomListCreateParam;
};

export type CustomListMutationsDeleteArgs = {
	id: Scalars["UUID"]["input"];
};

export type CustomListMutationsFollowArgs = {
	id: Scalars["UUID"]["input"];
};

export type CustomListMutationsRemoveMangaArgs = {
	params: CustomListRemoveMangaParam;
};

export type CustomListMutationsRemoveMangaBatchArgs = {
	listId: Scalars["UUID"]["input"];
	mangaIds: Array<Scalars["UUID"]["input"]>;
};

export type CustomListMutationsUnfollowArgs = {
	id: Scalars["UUID"]["input"];
};

export type CustomListMutationsUpdateArgs = {
	params: CustomListUpdateParams;
};

export type CustomListQueries = {
	__typename?: "CustomListQueries";
	currentLoggedLists: CustomListResults;
	get: CustomList;
	getUserLists: CustomListResults;
};

export type CustomListQueriesCurrentLoggedListsArgs = {
	params?: CurrentLoggedLists;
};

export type CustomListQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
	private?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CustomListQueriesGetUserListsArgs = {
	params: UserCustomListParams;
};

export type CustomListRelationships = {
	__typename?: "CustomListRelationships";
	titles: Array<MangaObject>;
	titlesIds: Array<Scalars["UUID"]["output"]>;
	user: User;
};

export type CustomListRelationshipsTitlesArgs = {
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CustomListRemoveMangaParam = {
	listId: Scalars["UUID"]["input"];
	mangaId: Scalars["UUID"]["input"];
};

export type CustomListResults = {
	__typename?: "CustomListResults";
	data: Array<CustomList>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type CustomListUpdateParams = {
	listId: Scalars["UUID"]["input"];
	manga?: Array<Scalars["UUID"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	version: Scalars["Int"]["input"];
	visibility?: InputMaybe<CustomListVisibility>;
};

export enum CustomListVisibility {
	Private = "PRIVATE",
	Public = "PUBLIC"
}

export type DangerColor = {
	__typename?: "DangerColor";
	default: Scalars["String"]["output"];
	l1: Scalars["String"]["output"];
	l2: Scalars["String"]["output"];
};

export type DangerColorInput = {
	default: Scalars["String"]["input"];
	l1: Scalars["String"]["input"];
	l2: Scalars["String"]["input"];
};

export enum DatePeriod {
	AllTime = "ALL_TIME",
	Past_2Weeks = "PAST_2_WEEKS",
	Past_6Months = "PAST_6_MONTHS",
	ThisMonth = "THIS_MONTH",
	ThisWeek = "THIS_WEEK",
	ThisYear = "THIS_YEAR"
}

export type DeleteImageParam = {
	sessionFileId: Scalars["UUID"]["input"];
	sessionId: Scalars["UUID"]["input"];
};

export type DeleteImagesParam = {
	sessionFileIds: Array<Scalars["UUID"]["input"]>;
	sessionId: Scalars["UUID"]["input"];
};

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

export type DownloadState = {
	__typename?: "DownloadState";
	hasFailed: Scalars["Boolean"]["output"];
	isDownloaded: Scalars["Boolean"]["output"];
};

export type DownloadStateQueries = {
	__typename?: "DownloadStateQueries";
	chapter: DownloadState;
	cover: DownloadState;
	manga: DownloadState;
};

export type DownloadStateQueriesChapterArgs = {
	chapterId: Scalars["UUID"]["input"];
};

export type DownloadStateQueriesCoverArgs = {
	coverId: Scalars["UUID"]["input"];
};

export type DownloadStateQueriesMangaArgs = {
	mangaId: Scalars["UUID"]["input"];
};

export enum DrawerMode {
	Pinned = "PINNED",
	Unpinned = "UNPINNED"
}

export type EditScanlationGroupParam = {
	/** Nullable. */
	contactEmail?: InputMaybe<Scalars["String"]["input"]>;
	/** Nullable. */
	description?: InputMaybe<Scalars["String"]["input"]>;
	/** Nullable. */
	discord?: InputMaybe<Scalars["String"]["input"]>;
	/**
	 * Languages the scanlation primarily translates or uploads works into.
	 *
	 * Nullable.
	 */
	focusedLanguages?: InputMaybe<Array<Language>>;
	groupId: Scalars["UUID"]["input"];
	inactive?: InputMaybe<Scalars["Boolean"]["input"]>;
	/** Nullable. */
	ircChannel?: InputMaybe<Scalars["String"]["input"]>;
	/** Nullable. */
	ircServer?: InputMaybe<Scalars["String"]["input"]>;
	leader?: InputMaybe<Scalars["UUID"]["input"]>;
	locked?: InputMaybe<Scalars["Boolean"]["input"]>;
	/**
	 * Regex: [^https:/\/www\.mangaupdates\.com\/(?:groups|publishers)\.html\?id=\d+](https://www.mangaupdates.com)
	 *
	 * Nullable.
	 */
	mangaUpdates?: InputMaybe<Scalars["Url"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	publishDelay?: InputMaybe<Scalars["MangaDexDuration"]["input"]>;
	/** Nullable. */
	twitter?: InputMaybe<Scalars["Url"]["input"]>;
	/** >= 1 */
	version: Scalars["Int"]["input"];
	/** Nullable. */
	website?: InputMaybe<Scalars["String"]["input"]>;
};

export type ExportCustomListsToCsvOptions = {
	exportPath: Scalars["String"]["input"];
	ids: Array<Scalars["UUID"]["input"]>;
	includeForumUrl?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeMdScore?: InputMaybe<Scalars["Boolean"]["input"]>;
	includePrivate?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadVolumes?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadingStatus?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeScores?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ExportIdsLibraryToCsvOptions = {
	exportPath: Scalars["String"]["input"];
	ids: Array<Scalars["UUID"]["input"]>;
	includeForumUrl?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeMdScore?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadVolumes?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadingStatus?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeScores?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ExportMdLibraryToCsvOptions = {
	excludeContentProfile?: InputMaybe<Scalars["Boolean"]["input"]>;
	exportPath: Scalars["String"]["input"];
	hasAvailableChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeForumUrl?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeMdScore?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadVolumes?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeScores?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ExportMutations = {
	__typename?: "ExportMutations";
	uuidsToAsTxt: Scalars["String"]["output"];
};

export type ExportMutationsUuidsToAsTxtArgs = {
	file: Scalars["String"]["input"];
	uuids: Array<Scalars["UUID"]["input"]>;
};

export type FeedQueries = {
	__typename?: "FeedQueries";
	customListFeed: ChapterResults;
	customListFeedGrouped: MangaChapterGroup;
	userLoggedMangaFeed: ChapterResults;
	userLoggedMangaFeedGrouped: MangaChapterGroup;
};

export type FeedQueriesCustomListFeedArgs = {
	params: CustomListMangaFeedParams;
	private?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type FeedQueriesCustomListFeedGroupedArgs = {
	feedParams: CustomListMangaFeedParams;
	mangaListParams?: InputMaybe<MangaListParams>;
	private?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type FeedQueriesUserLoggedMangaFeedArgs = {
	params?: InputMaybe<FollowedMangaFeedParams>;
};

export type FeedQueriesUserLoggedMangaFeedGroupedArgs = {
	feedParams?: InputMaybe<FollowedMangaFeedParams>;
	mangaListParams?: InputMaybe<MangaListParams>;
};

export type FollowedMangaFeedParams = {
	contentRating?: Array<ContentRating>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	createdAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	/** Groups to exclude from the results. */
	excludedGroups?: Array<Scalars["UUID"]["input"]>;
	excludedOriginalLanguage?: Array<Language>;
	/** Uploaders to exclude from the results. */
	excludedUploaders?: Array<Scalars["UUID"]["input"]>;
	includeEmptyPages?: InputMaybe<IncludeFuturePages>;
	includeExternalUrl?: InputMaybe<IncludeExternalUrl>;
	includeFuturePublishAt?: InputMaybe<IncludeFuturePublishAt>;
	/**
	 * Flag to include future chapter updates in the results.
	 *
	 * Default: `IncludeFutureUpdates::Include` (1)
	 */
	includeFutureUpdates?: InputMaybe<IncludeFutureUpdates>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<MangaFeedSortOrder>;
	originalLanguage?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	publishAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	translatedLanguage?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	updatedAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
};

export type FollowsQueries = {
	__typename?: "FollowsQueries";
	customLists: CustomListResults;
	groups: ScanlationGroupResults;
	isFollowingCustomList: Scalars["Boolean"]["output"];
	isFollowingGroup: Scalars["Boolean"]["output"];
	isFollowingManga: Scalars["Boolean"]["output"];
	isFollowingUser: Scalars["Boolean"]["output"];
	mangas: MangaResults;
	users: UserResults;
};

export type FollowsQueriesCustomListsArgs = {
	param?: InputMaybe<UserFollowedListParams>;
};

export type FollowsQueriesGroupsArgs = {
	params?: InputMaybe<UserFollowedGroupsParams>;
};

export type FollowsQueriesIsFollowingCustomListArgs = {
	id: Scalars["UUID"]["input"];
};

export type FollowsQueriesIsFollowingGroupArgs = {
	id: Scalars["UUID"]["input"];
};

export type FollowsQueriesIsFollowingMangaArgs = {
	id: Scalars["UUID"]["input"];
};

export type FollowsQueriesIsFollowingUserArgs = {
	id: Scalars["UUID"]["input"];
};

export type FollowsQueriesMangasArgs = {
	params?: InputMaybe<UserFollowedMangaParams>;
};

export type FollowsQueriesUsersArgs = {
	param?: InputMaybe<UserFollowedUserParams>;
};

export enum ForumThreadType {
	Chapter = "CHAPTER",
	Group = "GROUP",
	Manga = "MANGA"
}

export type ForumsMutations = {
	__typename?: "ForumsMutations";
	/** create a forum thread and return the generated forum id */
	createThread: Scalars["Int"]["output"];
};

export type ForumsMutationsCreateThreadArgs = {
	params: CreateForumThreadParams;
};

export type GetAllChapterParams = {
	includeFails: Scalars["Boolean"]["input"];
	onlyFails: Scalars["Boolean"]["input"];
};

export type GetMangaDraftParams = {
	includes?: Array<ReferenceExpansionResource>;
	mangaId: Scalars["UUID"]["input"];
};

export type GraphQlMangaAttributes = {
	__typename?: "GraphQLMangaAttributes";
	altTitles: Array<Scalars["JSONObject"]["output"]>;
	availableTranslatedLanguages?: Maybe<Array<Language>>;
	contentRating?: Maybe<ContentRating>;
	createdAt: Scalars["MangaDexDateTime"]["output"];
	description: Scalars["JSONObject"]["output"];
	isLocked: Scalars["Boolean"]["output"];
	lastChapter?: Maybe<Scalars["String"]["output"]>;
	lastVolume?: Maybe<Scalars["String"]["output"]>;
	latestUploadedChapter?: Maybe<Scalars["UUID"]["output"]>;
	links?: Maybe<MangaLinks>;
	originalLanguage: Language;
	publicationDemographic?: Maybe<Demographic>;
	state: MangaState;
	status: MangaStatus;
	tags: Array<Tag>;
	title: Scalars["JSONObject"]["output"];
	updatedAt?: Maybe<Scalars["MangaDexDateTime"]["output"]>;
	version: Scalars["Int"]["output"];
	year?: Maybe<Scalars["Int"]["output"]>;
};

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

export type GroupStatisticsQueries = {
	__typename?: "GroupStatisticsQueries";
	get: Statistics;
	list: Array<Statistics>;
};

export type GroupStatisticsQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
};

export type GroupStatisticsQueriesListArgs = {
	ids: Array<Scalars["UUID"]["input"]>;
};

export type HomeQueries = {
	__typename?: "HomeQueries";
	popularTitles: MangaResults;
	recentlyAdded: MangaResults;
	recentlyUploaded: ChapterResults;
	seasonal: CustomList;
	staffPicks: CustomList;
};

export type HomeQueriesPopularTitlesArgs = {
	params?: InputMaybe<MangaListParams>;
};

export type HomeQueriesRecentlyAddedArgs = {
	params?: InputMaybe<MangaListParams>;
};

export type HomeQueriesRecentlyUploadedArgs = {
	params?: InputMaybe<ChapterListParams>;
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

export type IndicatorColor = {
	__typename?: "IndicatorColor";
	blue: Scalars["String"]["output"];
};

export type IndicatorColorInput = {
	blue: Scalars["String"]["input"];
};

export type InfrastructureQueries = {
	__typename?: "InfrastructureQueries";
	ping: Scalars["Boolean"]["output"];
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

export type LegacyIdMapping = {
	__typename?: "LegacyIdMapping";
	attributes: LegacyMappingIdAttributes;
	id: Scalars["UUID"]["output"];
};

export type LegacyIdMappingParams = {
	ids: Array<Scalars["Int"]["input"]>;
	mapType: LegacyMappingType;
};

export type LegacyIdMappingResults = {
	__typename?: "LegacyIdMappingResults";
	data: Array<LegacyIdMapping>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type LegacyMappingIdAttributes = {
	__typename?: "LegacyMappingIdAttributes";
	legacyId: Scalars["Int"]["output"];
	newId: Scalars["UUID"]["output"];
	type: LegacyMappingType;
};

/** Mapping types to get the new UUIDs from the legacy, numerical, IDs. */
export enum LegacyMappingType {
	Chapter = "CHAPTER",
	Group = "GROUP",
	Manga = "MANGA",
	Tag = "TAG"
}

export type LegacyQueries = {
	__typename?: "LegacyQueries";
	idMapping: LegacyIdMappingResults;
};

export type LegacyQueriesIdMappingArgs = {
	params: LegacyIdMappingParams;
};

export type LibraryMutations = {
	__typename?: "LibraryMutations";
	exportAsCsv: Scalars["String"]["output"];
	exportAsMyAnimeList: Scalars["String"]["output"];
};

export type LibraryMutationsExportAsCsvArgs = {
	options: ExportMdLibraryToCsvOptions;
};

export type LibraryMutationsExportAsMyAnimeListArgs = {
	options: MdlibraryToMyAnimeListExportOption;
};

export type ListReasonsByCategory = {
	category: ReportCategory;
};

export type ListReportParams = {
	category?: InputMaybe<ReportCategory>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	objectId?: InputMaybe<Scalars["UUID"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<ReportSortOrder>;
	reasonId?: InputMaybe<Scalars["UUID"]["input"]>;
	status?: InputMaybe<ReportStatus>;
};

export enum MaltitlePriority {
	High = "HIGH",
	Low = "LOW",
	Medium = "MEDIUM"
}

export type MangaAggregate = {
	__typename?: "MangaAggregate";
	ids: Array<Scalars["UUID"]["output"]>;
	volumes: Array<VolumeAggregate>;
};

export type MangaAggregateParam = {
	groups?: Array<Scalars["UUID"]["input"]>;
	mangaId: Scalars["UUID"]["input"];
	translatedLanguage?: Array<Language>;
};

export type MangaAggregateQueries = {
	__typename?: "MangaAggregateQueries";
	chunked: Array<MangaAggregate>;
	default: MangaAggregate;
};

export type MangaAggregateQueriesChunkedArgs = {
	chunkSize: Scalars["Int"]["input"];
	isReversed?: Scalars["Boolean"]["input"];
};

export type MangaAggregateQueriesDefaultArgs = {
	isReversed?: Scalars["Boolean"]["input"];
};

export type MangaChapterGroup = {
	__typename?: "MangaChapterGroup";
	data: Array<MangaChapterItem>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type MangaChapterItem = {
	__typename?: "MangaChapterItem";
	chapters: Array<Chapter>;
	manga: MangaObject;
};

export type MangaCreateRelationParam = {
	mangaId: Scalars["UUID"]["input"];
	relation: MangaRelation;
	targetManga: Scalars["UUID"]["input"];
};

export type MangaDexTheme = {
	__typename?: "MangaDexTheme";
	accents: Accents;
	button: ButtonAccentColor;
	contrast: Contrast;
	danger: DangerColor;
	indication: IndicatorColor;
	mainBackground: Scalars["String"]["output"];
	midTone: Scalars["String"]["output"];
	primary: PrimaryColor;
	scheme?: Maybe<ThemeScheme>;
	scrollbar: ScrollbarColor;
	status: StatusColor;
	textColor: Scalars["String"]["output"];
};

export type MangaDexThemeInput = {
	accents: AccentsInput;
	button: ButtonAccentInput;
	contrast: ContrastInput;
	danger: DangerColorInput;
	indication: IndicatorColorInput;
	mainBackground: Scalars["String"]["input"];
	midTone: Scalars["String"]["input"];
	primary: PrimaryColorInput;
	scheme?: InputMaybe<ThemeScheme>;
	scrollbar: ScrollbarColorInput;
	status: StatusColorInput;
	textColor: Scalars["String"]["input"];
};

export enum MangaDonwloadingState {
	FetchingData = "FETCHING_DATA",
	Preloading = "PRELOADING"
}

export type MangaDownloadState = {
	__typename?: "MangaDownloadState";
	downloading?: Maybe<MangaDonwloadingState>;
	error?: Maybe<Scalars["String"]["output"]>;
	isCanceled: Scalars["Boolean"]["output"];
	isDone: Scalars["Boolean"]["output"];
	isOfflineAppStateNotLoaded: Scalars["Boolean"]["output"];
	isPending: Scalars["Boolean"]["output"];
};

export type MangaDraftsParams = {
	includes?: Array<ReferenceExpansionResource>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	/** >= 0 */
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<MangaDraftsSortOrder>;
	state?: InputMaybe<MangaState>;
};

export type MangaDraftsSortOrder =
	| { createdAt: OrderDirection; title?: never; updatedAt?: never; year?: never }
	| { createdAt?: never; title: OrderDirection; updatedAt?: never; year?: never }
	| { createdAt?: never; title?: never; updatedAt: OrderDirection; year?: never }
	| { createdAt?: never; title?: never; updatedAt?: never; year: OrderDirection };

export type MangaExportMutations = {
	__typename?: "MangaExportMutations";
	idsAsCsv: Scalars["String"]["output"];
	idsAsMyAnimeList: Scalars["String"]["output"];
};

export type MangaExportMutationsIdsAsCsvArgs = {
	options: ExportIdsLibraryToCsvOptions;
};

export type MangaExportMutationsIdsAsMyAnimeListArgs = {
	options: MdidsToMyAnimeListExportOption;
};

export type MangaFeedParams = {
	contentRating?: Array<ContentRating>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	createdAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	/** Groups to exclude from the results. */
	excludedGroups?: Array<Scalars["UUID"]["input"]>;
	excludedOriginalLanguage?: Array<Language>;
	/** Uploaders to exclude from the results. */
	excludedUploaders?: Array<Scalars["UUID"]["input"]>;
	includeEmptyPages?: InputMaybe<IncludeFuturePages>;
	includeExternalUrl?: InputMaybe<IncludeExternalUrl>;
	includeFuturePublishAt?: InputMaybe<IncludeFuturePublishAt>;
	/**
	 * Flag to include future chapter updates in the results.
	 *
	 * Default: `IncludeFutureUpdates::Include` (1)
	 */
	includeFutureUpdates?: InputMaybe<IncludeFutureUpdates>;
	includes?: Array<ReferenceExpansionResource>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	mangaId: Scalars["UUID"]["input"];
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<MangaFeedSortOrder>;
	originalLanguage?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	publishAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	translatedLanguage?: Array<Language>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	updatedAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
};

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

export type MangaLinks = {
	__typename?: "MangaLinks";
	amazon?: Maybe<Scalars["Url"]["output"]>;
	anilist?: Maybe<Scalars["Url"]["output"]>;
	animePlanet?: Maybe<Scalars["Url"]["output"]>;
	bookWalker?: Maybe<Scalars["Url"]["output"]>;
	cdJapan?: Maybe<Scalars["Url"]["output"]>;
	ebookJapan?: Maybe<Scalars["Url"]["output"]>;
	englishTranslation?: Maybe<Scalars["Url"]["output"]>;
	hasNoLinks: Scalars["Boolean"]["output"];
	kitsu?: Maybe<Scalars["Url"]["output"]>;
	mangaUpdates?: Maybe<Scalars["Url"]["output"]>;
	myAnimeList?: Maybe<Scalars["Url"]["output"]>;
	novelUpdates?: Maybe<Scalars["Url"]["output"]>;
	raw?: Maybe<Scalars["Url"]["output"]>;
};

export type MangaListParams = {
	artists?: Array<Scalars["UUID"]["input"]>;
	authorOrArtist?: InputMaybe<Scalars["UUID"]["input"]>;
	authors?: Array<Scalars["UUID"]["input"]>;
	/** A list of languages that the manga is translated into. */
	availableTranslatedLanguage?: Array<Language>;
	contentRating?: Array<ContentRating>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	createdAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	/** A list of original languages to exclude. */
	excludedOriginalLanguage?: Array<Language>;
	excludedTags?: Array<Scalars["UUID"]["input"]>;
	excludedTagsMode?: InputMaybe<TagSearchMode>;
	/** Scanlation group ID. */
	group?: InputMaybe<Scalars["UUID"]["input"]>;
	hasAvailableChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	includedTags?: Array<Scalars["UUID"]["input"]>;
	includedTagsMode?: InputMaybe<TagSearchMode>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	mangaIds?: Array<Scalars["UUID"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<MangaSortOrder>;
	/** Languages the manga results are originally published in. */
	originalLanguage?: Array<Language>;
	publicationDemographic?: Array<Demographic>;
	status?: Array<MangaStatus>;
	title?: InputMaybe<Scalars["String"]["input"]>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	updatedAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	year?: InputMaybe<Scalars["Int"]["input"]>;
};

export enum MangaListStyle {
	Cover = "COVER",
	Grid = "GRID",
	Rows = "ROWS"
}

export type MangaMutations = {
	__typename?: "MangaMutations";
	addToListBatch: Scalars["Boolean"]["output"];
	cancelDownload: Scalars["Boolean"]["output"];
	create: MangaObject;
	createRelation: Array<MangaRelated>;
	delete: Scalars["Boolean"]["output"];
	deleteRelation: Scalars["Boolean"]["output"];
	download: DownloadState;
	edit: MangaObject;
	export: MangaExportMutations;
	follow: Scalars["Boolean"]["output"];
	followBatch: Scalars["Boolean"]["output"];
	remove: Scalars["Boolean"]["output"];
	removeFromListBatch: Scalars["Boolean"]["output"];
	submitDraft: MangaObject;
	unfollow: Scalars["Boolean"]["output"];
	unfollowBatch: Scalars["Boolean"]["output"];
	updateReadingStatus: Scalars["Boolean"]["output"];
	updateReadingStatusBatch: Scalars["Boolean"]["output"];
};

export type MangaMutationsAddToListBatchArgs = {
	customLists: Array<Scalars["UUID"]["input"]>;
	mangaId: Scalars["UUID"]["input"];
};

export type MangaMutationsCancelDownloadArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaMutationsCreateArgs = {
	params: CreateMangaParam;
};

export type MangaMutationsCreateRelationArgs = {
	mangaListParams?: InputMaybe<MangaListParams>;
	params: MangaCreateRelationParam;
};

export type MangaMutationsDeleteArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaMutationsDeleteRelationArgs = {
	id: Scalars["UUID"]["input"];
	targetManga: Scalars["UUID"]["input"];
};

export type MangaMutationsDownloadArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaMutationsEditArgs = {
	params: UpdateMangaParam;
};

export type MangaMutationsFollowArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaMutationsFollowBatchArgs = {
	mangaIds: Array<Scalars["UUID"]["input"]>;
};

export type MangaMutationsRemoveArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaMutationsRemoveFromListBatchArgs = {
	customLists: Array<Scalars["UUID"]["input"]>;
	mangaId: Scalars["UUID"]["input"];
};

export type MangaMutationsSubmitDraftArgs = {
	params: SubmitMangaDraftParams;
};

export type MangaMutationsUnfollowArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaMutationsUnfollowBatchArgs = {
	mangaIds: Array<Scalars["UUID"]["input"]>;
};

export type MangaMutationsUpdateReadingStatusArgs = {
	id: Scalars["UUID"]["input"];
	status?: InputMaybe<ReadingStatus>;
};

export type MangaMutationsUpdateReadingStatusBatchArgs = {
	mangaIds: Array<Scalars["UUID"]["input"]>;
	status?: InputMaybe<ReadingStatus>;
};

export type MangaObject = {
	__typename?: "MangaObject";
	attributes: GraphQlMangaAttributes;
	id: Scalars["UUID"]["output"];
	relationships: MangaRelationships;
};

export type MangaQueries = {
	__typename?: "MangaQueries";
	aggregate: MangaAggregateQueries;
	feed: ChapterResults;
	get: MangaObject;
	getDraft: MangaObject;
	getDrafts: MangaResults;
	getMangaStatus: Array<MangaReadingStatusItem>;
	isDownloaded: DownloadState;
	isInLibrary: Scalars["Boolean"]["output"];
	list: MangaResults;
	listOffline: MangaResults;
	random: MangaObject;
	readingStatus?: Maybe<ReadingStatus>;
	relationList: Array<MangaRelated>;
};

export type MangaQueriesAggregateArgs = {
	excludeContentProfile?: InputMaybe<Scalars["Boolean"]["input"]>;
	params: MangaAggregateParam;
};

export type MangaQueriesFeedArgs = {
	params: MangaFeedParams;
};

export type MangaQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaQueriesGetDraftArgs = {
	params: GetMangaDraftParams;
};

export type MangaQueriesGetDraftsArgs = {
	params?: MangaDraftsParams;
};

export type MangaQueriesGetMangaStatusArgs = {
	status?: InputMaybe<ReadingStatus>;
};

export type MangaQueriesIsDownloadedArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaQueriesIsInLibraryArgs = {
	excludedStatuses?: InputMaybe<Array<ReadingStatus>>;
	id: Scalars["UUID"]["input"];
};

export type MangaQueriesListArgs = {
	excludeContentProfile?: InputMaybe<Scalars["Boolean"]["input"]>;
	params?: InputMaybe<MangaListParams>;
};

export type MangaQueriesListOfflineArgs = {
	excludeContentProfile?: InputMaybe<Scalars["Boolean"]["input"]>;
	params?: InputMaybe<MangaListParams>;
};

export type MangaQueriesRandomArgs = {
	params?: InputMaybe<MangaRandomParams>;
};

export type MangaQueriesReadingStatusArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaQueriesRelationListArgs = {
	listParams?: InputMaybe<MangaListParams>;
	params: MangaRelationParam;
};

export type MangaRandomParams = {
	contentRating?: Array<ContentRating>;
	excludedTags?: Array<Scalars["UUID"]["input"]>;
	excludedTagsMode?: InputMaybe<TagSearchMode>;
	includedTags?: Array<Scalars["UUID"]["input"]>;
	includedTagsMode?: InputMaybe<TagSearchMode>;
	includes?: Array<ReferenceExpansionResource>;
};

export type MangaRating = {
	__typename?: "MangaRating";
	average?: Maybe<Scalars["Float"]["output"]>;
	bayesian?: Maybe<Scalars["Float"]["output"]>;
	distrubution: MangaRatingDistribution;
};

export type MangaRatingDistribution = {
	__typename?: "MangaRatingDistribution";
	r1: Scalars["Int"]["output"];
	r2: Scalars["Int"]["output"];
	r3: Scalars["Int"]["output"];
	r4: Scalars["Int"]["output"];
	r5: Scalars["Int"]["output"];
	r6: Scalars["Int"]["output"];
	r7: Scalars["Int"]["output"];
	r8: Scalars["Int"]["output"];
	r9: Scalars["Int"]["output"];
	r10: Scalars["Int"]["output"];
};

export type MangaReadMarkerGroupedItems = {
	__typename?: "MangaReadMarkerGroupedItems";
	chapters: Array<Scalars["UUID"]["output"]>;
	mangaId: Scalars["UUID"]["output"];
};

export type MangaReadingStatusItem = {
	__typename?: "MangaReadingStatusItem";
	id: Scalars["UUID"]["output"];
	status: ReadingStatus;
};

export type MangaRelated = {
	__typename?: "MangaRelated";
	attributes: GraphQlMangaAttributes;
	id: Scalars["UUID"]["output"];
	related: MangaRelation;
	relationships: MangaRelationships;
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

export type MangaRelationParam = {
	includes?: Array<ReferenceExpansionResource>;
	mangaId: Scalars["UUID"]["input"];
};

export type MangaRelationships = {
	__typename?: "MangaRelationships";
	artists: Array<Author>;
	authorArtists: Array<Author>;
	authors: Array<Author>;
	coverArt: Cover;
	creator?: Maybe<User>;
	manga: Array<MangaRelated>;
};

export type MangaResults = {
	__typename?: "MangaResults";
	data: Array<MangaObject>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type MangaSortOrder =
	| {
			createdAt: OrderDirection;
			followedCount?: never;
			latestUploadedChapter?: never;
			relevance?: never;
			title?: never;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount: OrderDirection;
			latestUploadedChapter?: never;
			relevance?: never;
			title?: never;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter: OrderDirection;
			relevance?: never;
			title?: never;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			relevance: OrderDirection;
			title?: never;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			relevance?: never;
			title: OrderDirection;
			updatedAt?: never;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
			relevance?: never;
			title?: never;
			updatedAt: OrderDirection;
			year?: never;
	  }
	| {
			createdAt?: never;
			followedCount?: never;
			latestUploadedChapter?: never;
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

export type MangaStatistics = {
	__typename?: "MangaStatistics";
	comments?: Maybe<StatisticsComments>;
	followCount: Scalars["Int"]["output"];
	id: Scalars["UUID"]["output"];
	rating: MangaRating;
};

export type MangaStatisticsAttributes = {
	__typename?: "MangaStatisticsAttributes";
	comments?: Maybe<StatisticsComments>;
	rating: MangaRating;
};

export type MangaStatisticsQueries = {
	__typename?: "MangaStatisticsQueries";
	get: MangaStatistics;
	list: Array<MangaStatistics>;
};

export type MangaStatisticsQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
};

export type MangaStatisticsQueriesListArgs = {
	ids: Array<Scalars["UUID"]["input"]>;
};

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

export type MarkChapterBatchParam = {
	chapterIdsRead?: Array<Scalars["UUID"]["input"]>;
	chapterIdsUnread?: Array<Scalars["UUID"]["input"]>;
	mangaId: Scalars["UUID"]["input"];
	updateHistory?: Scalars["Boolean"]["input"];
};

export type MdcustomListsToMyAnimeListExportOption = {
	exportPath: Scalars["String"]["input"];
	ids: Array<Scalars["UUID"]["input"]>;
	includePrivate?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadVolumes?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeScore?: InputMaybe<Scalars["Boolean"]["input"]>;
	priorities?: InputMaybe<ReadingStatusPriorities>;
	userId: Scalars["String"]["input"];
	userName: Scalars["String"]["input"];
};

export type MdidsToMyAnimeListExportOption = {
	exportPath: Scalars["String"]["input"];
	ids: Array<Scalars["UUID"]["input"]>;
	includeReadChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadVolumes?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeScore?: InputMaybe<Scalars["Boolean"]["input"]>;
	priorities?: InputMaybe<ReadingStatusPriorities>;
	userId: Scalars["String"]["input"];
	userName: Scalars["String"]["input"];
};

export type MdlibraryToMyAnimeListExportOption = {
	excludeContentProfile?: InputMaybe<Scalars["Boolean"]["input"]>;
	exportPath: Scalars["String"]["input"];
	hasAvailableChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeReadVolumes?: InputMaybe<Scalars["Boolean"]["input"]>;
	includeScore?: InputMaybe<Scalars["Boolean"]["input"]>;
	priorities?: InputMaybe<ReadingStatusPriorities>;
	userId: Scalars["String"]["input"];
	userName: Scalars["String"]["input"];
};

export type Mutation = {
	__typename?: "Mutation";
	apiClient: ApiClientMutation;
	author: AuthorMutations;
	captcha: CaptchaMutations;
	chapter: ChapterMutations;
	cover: CoverMutations;
	customList: CustomListMutations;
	export: ExportMutations;
	forums: ForumsMutations;
	library: LibraryMutations;
	manga: MangaMutations;
	oauth: OauthMutations;
	offlineAppState: OfflineAppStateMutations;
	rating: RatingMutations;
	readMarker: ReadMarkerMutations;
	report: ReportMutations;
	scanlationGroup: ScanlationGroupMutation;
	upload: UploadMutations;
	user: UserMutations;
	userOption: UserOptionMutations;
};

export type OauthMutations = {
	__typename?: "OauthMutations";
	clearClientInfo: Scalars["Boolean"]["output"];
	login: Scalars["Boolean"]["output"];
	logout: Scalars["Boolean"]["output"];
	refresh: Scalars["Boolean"]["output"];
	setClientInfo: Scalars["Boolean"]["output"];
};

export type OauthMutationsLoginArgs = {
	password: Scalars["Password"]["input"];
	username: Scalars["Username"]["input"];
};

export type OauthMutationsSetClientInfoArgs = {
	clientId: Scalars["String"]["input"];
	clientSecret: Scalars["String"]["input"];
};

export type OauthQueries = {
	__typename?: "OauthQueries";
	getClientInfo?: Maybe<ClientInfo>;
};

export type OfflineAppStateMutations = {
	__typename?: "OfflineAppStateMutations";
	mountOfflineAppState: Scalars["Boolean"]["output"];
	unmountOfflineAppState: Scalars["Boolean"]["output"];
};

export type OfflineAppStateQueries = {
	__typename?: "OfflineAppStateQueries";
	isMounted: Scalars["Boolean"]["output"];
};

export type OfflineConfigInput = {
	chaptersDirectory?: InputMaybe<Scalars["String"]["input"]>;
	coversDirectory?: InputMaybe<Scalars["String"]["input"]>;
	dataDirectory: Scalars["String"]["input"];
	mangasDirectory?: InputMaybe<Scalars["String"]["input"]>;
};

export type OfflineConfigObject = {
	__typename?: "OfflineConfigObject";
	/** Often relative to [`Self::data_dir`] */
	chaptersDir: Scalars["String"]["output"];
	/** Often relative to [`Self::data_dir`] */
	coversDir: Scalars["String"]["output"];
	dataDir: Scalars["String"]["output"];
	/** Often relative to [`Self::data_dir`] */
	mangasDir: Scalars["String"]["output"];
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

export type PrimaryColor = {
	__typename?: "PrimaryColor";
	primary: Scalars["String"]["output"];
	primary1: Scalars["String"]["output"];
	primary2: Scalars["String"]["output"];
};

export type PrimaryColorInput = {
	primary: Scalars["String"]["input"];
	primary1: Scalars["String"]["input"];
	primary2: Scalars["String"]["input"];
};

export enum ProgressMode {
	Default = "DEFAULT",
	Floating = "FLOATING",
	Hidden = "HIDDEN"
}

export type Query = {
	__typename?: "Query";
	apiClient: ApiClientQueries;
	auth: AuthQuery;
	author: AuthorQueries;
	chapter: ChapterQueries;
	cover: CoverQueries;
	customList: CustomListQueries;
	downloadState: DownloadStateQueries;
	feed: FeedQueries;
	follows: FollowsQueries;
	home: HomeQueries;
	infrastructure: InfrastructureQueries;
	legacy: LegacyQueries;
	library: CurrentUserLibrary;
	manga: MangaQueries;
	oauth: OauthQueries;
	offlineAppState: OfflineAppStateQueries;
	rating: RatingQueries;
	readMarker: ReadMarkerQueries;
	report: ReportQueries;
	scanlationGroup: ScanlationGroupQueries;
	statistics: StatisticsQueries;
	tag: TagQueries;
	upload: UploadQueries;
	user: UserQueries;
	userOption: UserOptionQueries;
	utils: UtilsQuery;
};

export type RatingItem = {
	__typename?: "RatingItem";
	createdAt: Scalars["MangaDexDateTime"]["output"];
	id: Scalars["UUID"]["output"];
	rating: Scalars["Int"]["output"];
};

export type RatingItemAttributes = {
	__typename?: "RatingItemAttributes";
	createdAt: Scalars["MangaDexDateTime"]["output"];
	rating: Scalars["Int"]["output"];
};

export type RatingMutations = {
	__typename?: "RatingMutations";
	createUpdate: Scalars["Boolean"]["output"];
	delete: Scalars["Boolean"]["output"];
};

export type RatingMutationsCreateUpdateArgs = {
	params: CreateUpdateRating;
};

export type RatingMutationsDeleteArgs = {
	id: Scalars["UUID"]["input"];
};

export type RatingQueries = {
	__typename?: "RatingQueries";
	lists: Array<RatingItem>;
};

export type RatingQueriesListsArgs = {
	mangaIds: Array<Scalars["UUID"]["input"]>;
};

export type ReadMarkerMutations = {
	__typename?: "ReadMarkerMutations";
	mangaReadMarkersBatch: Scalars["Boolean"]["output"];
	readMarkersBatch: Scalars["Boolean"]["output"];
};

export type ReadMarkerMutationsMangaReadMarkersBatchArgs = {
	params: MarkChapterBatchParam;
};

export type ReadMarkerMutationsReadMarkersBatchArgs = {
	chapterIdsRead: Array<Scalars["UUID"]["input"]>;
	chapterIdsUnread: Array<Scalars["UUID"]["input"]>;
	updateHistory?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ReadMarkerQueries = {
	__typename?: "ReadMarkerQueries";
	mangaReadMarkers: Array<Scalars["UUID"]["output"]>;
	mangaReadMarkersByMangaId: Array<Scalars["UUID"]["output"]>;
	mangaReadMarkersGrouped: Array<MangaReadMarkerGroupedItems>;
	userHistory: Array<UserHistoryEntry>;
};

export type ReadMarkerQueriesMangaReadMarkersArgs = {
	mangaIds: Array<Scalars["UUID"]["input"]>;
};

export type ReadMarkerQueriesMangaReadMarkersByMangaIdArgs = {
	mangaId: Scalars["UUID"]["input"];
};

export type ReadMarkerQueriesMangaReadMarkersGroupedArgs = {
	mangaIds: Array<Scalars["UUID"]["input"]>;
};

export enum ReadingMode {
	DoublePage = "DOUBLE_PAGE",
	LongStrip = "LONG_STRIP",
	SinglePage = "SINGLE_PAGE",
	WideStrip = "WIDE_STRIP"
}

export type ReadingState = {
	__typename?: "ReadingState";
	page?: Maybe<Scalars["Int"]["output"]>;
	state: ReadingStateEnum;
};

export enum ReadingStateEnum {
	Current = "CURRENT",
	Next = "NEXT",
	Previous = "PREVIOUS"
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
 * <https://api.mangadex.org/docs/static-data/#relationship-types>
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

export type ReportAttributes = {
	__typename?: "ReportAttributes";
	createdAt: Scalars["MangaDexDateTime"]["output"];
	details: Scalars["String"]["output"];
	objectId: Scalars["String"]["output"];
	status: ReportStatus;
};

/** Report reasons for submitting reports to the MangaDex staff. */
export enum ReportCategory {
	Author = "AUTHOR",
	Chapter = "CHAPTER",
	Manga = "MANGA",
	ScanlationGroup = "SCANLATION_GROUP",
	User = "USER"
}

export type ReportMutations = {
	__typename?: "ReportMutations";
	create: Scalars["Boolean"]["output"];
};

export type ReportMutationsCreateArgs = {
	params: CreateReportParam;
};

export type ReportQueries = {
	__typename?: "ReportQueries";
	list: UserReportResults;
	listByCaterogy: ReportReasonResults;
};

export type ReportQueriesListArgs = {
	params?: ListReportParams;
};

export type ReportQueriesListByCaterogyArgs = {
	params: ListReasonsByCategory;
};

export type ReportReason = {
	__typename?: "ReportReason";
	attributes: ReportReasonAttributes;
	id: Scalars["UUID"]["output"];
};

export type ReportReasonAttributes = {
	__typename?: "ReportReasonAttributes";
	category: ReportCategory;
	detailsRequired: Scalars["Boolean"]["output"];
	reason: Scalars["JSONObject"]["output"];
	version: Scalars["Int"]["output"];
};

export type ReportReasonResults = {
	__typename?: "ReportReasonResults";
	data: Array<ReportReason>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type ReportRelationship = {
	__typename?: "ReportRelationship";
	user: User;
};

export type ReportSortOrder = { createdAt: OrderDirection };

/** Report reasons for submitting reports to the MangaDex staff. */
export enum ReportStatus {
	Accepted = "ACCEPTED",
	Autoresolved = "AUTORESOLVED",
	Refused = "REFUSED",
	Waiting = "WAITING"
}

export type ScanlationGroup = {
	__typename?: "ScanlationGroup";
	attributes: ScanlationGroupAttributes;
	id: Scalars["UUID"]["output"];
	relationships: ScanlationGroupRelationships;
};

export type ScanlationGroupAttributes = {
	__typename?: "ScanlationGroupAttributes";
	altNames: Array<Scalars["JSONObject"]["output"]>;
	contactEmail?: Maybe<Scalars["String"]["output"]>;
	createdAt: Scalars["MangaDexDateTime"]["output"];
	description?: Maybe<Scalars["String"]["output"]>;
	discord?: Maybe<Scalars["String"]["output"]>;
	exLicensed?: Maybe<Scalars["Boolean"]["output"]>;
	focusedLanguages?: Maybe<Array<Language>>;
	ircChannel?: Maybe<Scalars["String"]["output"]>;
	ircServer?: Maybe<Scalars["String"]["output"]>;
	locked: Scalars["Boolean"]["output"];
	mangaUpdates?: Maybe<Scalars["Url"]["output"]>;
	name: Scalars["String"]["output"];
	official: Scalars["Boolean"]["output"];
	publishDelay?: Maybe<Scalars["MangaDexDuration"]["output"]>;
	twitter?: Maybe<Scalars["Url"]["output"]>;
	updatedAt: Scalars["MangaDexDateTime"]["output"];
	verified: Scalars["Boolean"]["output"];
	version: Scalars["Int"]["output"];
	website?: Maybe<Scalars["Url"]["output"]>;
};

export type ScanlationGroupListParams = {
	/** Language the scanlation primarily translates or uploads works into. */
	focusedLanguage?: InputMaybe<Language>;
	groupIds?: Array<Scalars["UUID"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	name?: InputMaybe<Scalars["String"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<GroupSortOrder>;
};

export type ScanlationGroupMutation = {
	__typename?: "ScanlationGroupMutation";
	create: ScanlationGroup;
	delete: Scalars["Boolean"]["output"];
	edit: ScanlationGroup;
	follow: Scalars["Boolean"]["output"];
	unfollow: Scalars["Boolean"]["output"];
};

export type ScanlationGroupMutationCreateArgs = {
	params: CreateScalantionGroupParam;
};

export type ScanlationGroupMutationDeleteArgs = {
	id: Scalars["UUID"]["input"];
};

export type ScanlationGroupMutationEditArgs = {
	params: EditScanlationGroupParam;
};

export type ScanlationGroupMutationFollowArgs = {
	id: Scalars["UUID"]["input"];
};

export type ScanlationGroupMutationUnfollowArgs = {
	id: Scalars["UUID"]["input"];
};

export type ScanlationGroupQueries = {
	__typename?: "ScanlationGroupQueries";
	getUnique: ScanlationGroup;
	list: ScanlationGroupResults;
};

export type ScanlationGroupQueriesGetUniqueArgs = {
	id: Scalars["UUID"]["input"];
};

export type ScanlationGroupQueriesListArgs = {
	params?: InputMaybe<ScanlationGroupListParams>;
};

export type ScanlationGroupRelationships = {
	__typename?: "ScanlationGroupRelationships";
	leader?: Maybe<User>;
	members: Array<User>;
};

export type ScanlationGroupResults = {
	__typename?: "ScanlationGroupResults";
	data: Array<ScanlationGroup>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type ScrollbarColor = {
	__typename?: "ScrollbarColor";
	default: Scalars["String"]["output"];
	hovered: Scalars["String"]["output"];
};

export type ScrollbarColorInput = {
	default: Scalars["String"]["input"];
	hovered: Scalars["String"]["input"];
};

export enum SidebarMode {
	Default = "DEFAULT",
	Floating = "FLOATING",
	Hidden = "HIDDEN"
}

export type Statistics = {
	__typename?: "Statistics";
	comments?: Maybe<StatisticsComments>;
	id: Scalars["UUID"]["output"];
};

export type StatisticsComments = {
	__typename?: "StatisticsComments";
	repliesCount: Scalars["Int"]["output"];
	threadId: Scalars["Int"]["output"];
	threadUrl: Scalars["Url"]["output"];
};

export type StatisticsQueries = {
	__typename?: "StatisticsQueries";
	chapter: ChapterStatisticsQueries;
	group: GroupStatisticsQueries;
	manga: MangaStatisticsQueries;
};

export type StatusColor = {
	__typename?: "StatusColor";
	blue: Scalars["String"]["output"];
	green: Scalars["String"]["output"];
	grey: Scalars["String"]["output"];
	purple: Scalars["String"]["output"];
	red: Scalars["String"]["output"];
	yellow: Scalars["String"]["output"];
};

export type StatusColorInput = {
	blue: Scalars["String"]["input"];
	green: Scalars["String"]["input"];
	grey: Scalars["String"]["input"];
	purple: Scalars["String"]["input"];
	red: Scalars["String"]["input"];
	yellow: Scalars["String"]["input"];
};

export type SubmitMangaDraftParams = {
	mangaId: Scalars["UUID"]["input"];
	version: Scalars["Int"]["input"];
};

export type Subscriptions = {
	__typename?: "Subscriptions";
	getChapterPages: ChapterPage;
	watchApiClient: ApiClientAttributes;
	watchAuthor: AuthorAttributes;
	watchChapter: ChapterAttributes;
	watchChapterDownloadState: ChapterDownloadState;
	watchChapterFeedStyle: ChapterFeedStyle;
	watchChapterLanguages: Array<Language>;
	watchChapterLayout: ChapterLayoutStore;
	watchChapterQuality: DownloadMode;
	watchChaptersTasksList: Array<Scalars["UUID"]["output"]>;
	watchClientInfo?: Maybe<ClientInfo>;
	watchContentProfileBlur: Scalars["Boolean"]["output"];
	watchContentProfileDefault: ContentProfile;
	watchContentProfileDefaultName?: Maybe<Scalars["String"]["output"]>;
	watchContentProfileWarningMode: ContentProfileWarningMode;
	watchContentProfiles: Array<ContentProfileEntry>;
	watchCover: CoverAttributes;
	watchCoverDownloadState: CoverDownloadState;
	watchCoverTasksList: Array<Scalars["UUID"]["output"]>;
	watchCustomList: CustomListAttributes;
	watchDownloadState: DownloadState;
	watchForcePort443: Scalars["Boolean"]["output"];
	watchImageFit: ImageFit;
	watchIsAppMounted: Scalars["Boolean"]["output"];
	watchIsFollowingCustomList: Scalars["Boolean"]["output"];
	watchIsFollowingGroup: Scalars["Boolean"]["output"];
	watchIsFollowingManga: Scalars["Boolean"]["output"];
	watchIsFollowingUser: Scalars["Boolean"]["output"];
	watchIsLogged: Scalars["Boolean"]["output"];
	watchLongstripImageWidth: Scalars["Float"]["output"];
	watchManga: GraphQlMangaAttributes;
	watchMangaDownloadState: MangaDownloadState;
	watchMangaListStyle: MangaListStyle;
	watchMangaReadingState?: Maybe<ReadingStatus>;
	watchMangaStatistics: MangaStatisticsAttributes;
	watchMangaTasksList: Array<Scalars["UUID"]["output"]>;
	watchPageDirection: Direction;
	watchPageLimit: Scalars["Int"]["output"];
	watchPaginationStyle: PaginationStyle;
	watchRating: RatingItemAttributes;
	watchReadMarker: Scalars["Boolean"]["output"];
	watchReadingMode: ReadingMode;
	watchReadingState: ReadingState;
	watchSidebarDirection: Direction;
	watchStatistics: StatisticsComments;
	watchTag: TagAttributes;
	watchThemeProfileDefault: MangaDexTheme;
	watchThemeProfileDefaultName?: Maybe<Scalars["String"]["output"]>;
	watchThemesProfile: Array<ThemeProfileEntry>;
	watchUploadSession: UploadSessionAttributes;
	watchUploadSessionFile: UploadSessionFileAttributes;
	watchUser: UserAttributes;
	watchUserMe: UserAttributes;
};

export type SubscriptionsGetChapterPagesArgs = {
	chapter: Scalars["UUID"]["input"];
	mode?: InputMaybe<DownloadMode>;
};

export type SubscriptionsWatchApiClientArgs = {
	apiClientId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchAuthorArgs = {
	authorId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchChapterArgs = {
	chapterId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchChapterDownloadStateArgs = {
	chapterId: Scalars["UUID"]["input"];
	deferred?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SubscriptionsWatchCoverArgs = {
	coverId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchCoverDownloadStateArgs = {
	coverId: Scalars["UUID"]["input"];
	deferred?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SubscriptionsWatchCustomListArgs = {
	customListId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchDownloadStateArgs = {
	objectId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchIsFollowingCustomListArgs = {
	customListId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchIsFollowingGroupArgs = {
	groupId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchIsFollowingMangaArgs = {
	mangaId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchIsFollowingUserArgs = {
	userId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchMangaArgs = {
	mangaId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchMangaDownloadStateArgs = {
	deferred?: InputMaybe<Scalars["Boolean"]["input"]>;
	mangaId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchMangaReadingStateArgs = {
	mangaId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchMangaStatisticsArgs = {
	mangaId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchRatingArgs = {
	mangaId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchReadMarkerArgs = {
	chapterId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchReadingStateArgs = {
	chapterId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchStatisticsArgs = {
	id: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchTagArgs = {
	tagId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchUploadSessionArgs = {
	uploadSessionId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchUploadSessionFileArgs = {
	uploadSessionFileId: Scalars["UUID"]["input"];
};

export type SubscriptionsWatchUserArgs = {
	userId: Scalars["UUID"]["input"];
};

export type Tag = {
	__typename?: "Tag";
	attributes: TagAttributes;
	id: Scalars["UUID"]["output"];
};

export type TagAttributes = {
	__typename?: "TagAttributes";
	description: Scalars["JSONObject"]["output"];
	group: TagGroup;
	name: Scalars["JSONObject"]["output"];
};

export enum TagGroup {
	Content = "CONTENT",
	Format = "FORMAT",
	Genre = "GENRE",
	Theme = "THEME"
}

export type TagPageQueries = {
	__typename?: "TagPageQueries";
	popularInfSection: MangaResults;
	recentlyAdded: Array<MangaObject>;
	topTen: Array<MangaObject>;
};

export type TagPageQueriesPopularInfSectionArgs = {
	params?: InputMaybe<TagPopularList>;
};

export type TagPopularList = {
	datePeriod?: InputMaybe<DatePeriod>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type TagQueries = {
	__typename?: "TagQueries";
	list: TagResults;
	listGrouped: TagResultsGrouped;
	page: TagPageQueries;
};

export type TagQueriesPageArgs = {
	id: Scalars["UUID"]["input"];
};

export type TagResults = {
	__typename?: "TagResults";
	data: Array<Tag>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type TagResultsGrouped = {
	__typename?: "TagResultsGrouped";
	content: Array<Tag>;
	format: Array<Tag>;
	genre: Array<Tag>;
	theme: Array<Tag>;
};

/** Determines the behavior of tag interaction when including or excluding tags in the results. */
export enum TagSearchMode {
	And = "AND",
	Or = "OR"
}

export type ThemeProfileEntry = {
	__typename?: "ThemeProfileEntry";
	name: Scalars["String"]["output"];
	value: MangaDexTheme;
};

export type ThemeProfileEntryInput = {
	name: Scalars["String"]["input"];
	value: MangaDexThemeInput;
};

export enum ThemeScheme {
	Dark = "DARK",
	Light = "LIGHT"
}

export type UpdateMangaParam = {
	altTitles?: InputMaybe<Array<Scalars["JSONObject"]["input"]>>;
	artists?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
	authors?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
	chapterNumbersResetOnNewVolume?: InputMaybe<Scalars["Boolean"]["input"]>;
	contentRating: ContentRating;
	description?: InputMaybe<Scalars["JSONObject"]["input"]>;
	lastChapter?: InputMaybe<Scalars["String"]["input"]>;
	lastVolume?: InputMaybe<Scalars["String"]["input"]>;
	links?: InputMaybe<Scalars["JSONObject"]["input"]>;
	mangaId: Scalars["UUID"]["input"];
	originalLanguage: Language;
	/** Cover ID. */
	primaryCover?: InputMaybe<Scalars["UUID"]["input"]>;
	publicationDemographic?: InputMaybe<Demographic>;
	status: MangaStatus;
	tags?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
	title: Scalars["JSONObject"]["input"];
	/** >= 1 */
	version: Scalars["Int"]["input"];
	/** Year the manga was released. */
	year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UploadMutations = {
	__typename?: "UploadMutations";
	abandonSession: Scalars["Boolean"]["output"];
	beginEditSession: UploadSession;
	beginSession: UploadSession;
	commitSession: Chapter;
	deleteFileFromUploadSession: Scalars["Boolean"]["output"];
	deleteFilesFromUploadSession: Scalars["Boolean"]["output"];
	uploadImagesToSession: UploadSessionFile;
};

export type UploadMutationsAbandonSessionArgs = {
	sessionId: Scalars["UUID"]["input"];
};

export type UploadMutationsBeginEditSessionArgs = {
	abandonIfExists?: Scalars["Boolean"]["input"];
	params: BeginEditUploadSessionParam;
};

export type UploadMutationsBeginSessionArgs = {
	abandonIfExists?: Scalars["Boolean"]["input"];
	params: BeginUploadSessionParam;
};

export type UploadMutationsCommitSessionArgs = {
	params: CommitUploadSessionParam;
};

export type UploadMutationsDeleteFileFromUploadSessionArgs = {
	params: DeleteImageParam;
};

export type UploadMutationsDeleteFilesFromUploadSessionArgs = {
	params: DeleteImagesParam;
};

export type UploadMutationsUploadImagesToSessionArgs = {
	path: Scalars["PathBuf"]["input"];
	sessionId: Scalars["UUID"]["input"];
};

export type UploadQueries = {
	__typename?: "UploadQueries";
	getCurrent?: Maybe<UploadSession>;
};

export type UploadSession = {
	__typename?: "UploadSession";
	attributes: UploadSessionAttributes;
	id: Scalars["UUID"]["output"];
};

export type UploadSessionAttributes = {
	__typename?: "UploadSessionAttributes";
	createdAt: Scalars["MangaDexDateTime"]["output"];
	isCommitted: Scalars["Boolean"]["output"];
	isDeleted: Scalars["Boolean"]["output"];
	isProcessed: Scalars["Boolean"]["output"];
	updatedAt: Scalars["MangaDexDateTime"]["output"];
	version: Scalars["Int"]["output"];
};

export type UploadSessionFile = {
	__typename?: "UploadSessionFile";
	attributes: UploadSessionFileAttributes;
	id: Scalars["UUID"]["output"];
};

export type UploadSessionFileAttributes = {
	__typename?: "UploadSessionFileAttributes";
	fileHash: Scalars["String"]["output"];
	fileSize: Scalars["Int"]["output"];
	mimeType: Scalars["String"]["output"];
	originalFileName: Scalars["String"]["output"];
	source: UploadSource;
	version: Scalars["Int"]["output"];
};

/** Upload file source. */
export enum UploadSource {
	Local = "LOCAL",
	Remote = "REMOTE"
}

export type User = {
	__typename?: "User";
	attributes: UserAttributes;
	id: Scalars["UUID"]["output"];
	relationships: UserRelationships;
};

export type UserAttributes = {
	__typename?: "UserAttributes";
	roles: Array<UserRole>;
	username: Scalars["String"]["output"];
	version: Scalars["Int"]["output"];
};

export type UserCustomListParams = {
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	userId: Scalars["UUID"]["input"];
};

export type UserFollowedGroupsParams = {
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserFollowedListParams = {
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserFollowedMangaParams = {
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserFollowedUserParams = {
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserHistoryEntry = {
	__typename?: "UserHistoryEntry";
	chapterId: Scalars["UUID"]["output"];
	readDate: Scalars["MangaDexDateTime"]["output"];
};

export type UserLibrarySectionParam = {
	artists?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
	authors?: InputMaybe<Array<Scalars["UUID"]["input"]>>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	createdAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	excludeContentProfile?: InputMaybe<Scalars["Boolean"]["input"]>;
	hasAvailableChapters?: InputMaybe<Scalars["Boolean"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<MangaSortOrder>;
	publicationStatus?: InputMaybe<Array<MangaStatus>>;
	/** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
	updatedAtSince?: InputMaybe<Scalars["MangaDexDateTime"]["input"]>;
	year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserListParam = {
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	order?: InputMaybe<UserSortOrder>;
	userIds?: Array<Scalars["UUID"]["input"]>;
	username?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserMutations = {
	__typename?: "UserMutations";
	follow: Scalars["Boolean"]["output"];
	unfollow: Scalars["Boolean"]["output"];
};

export type UserMutationsFollowArgs = {
	id: Scalars["UUID"]["input"];
};

export type UserMutationsUnfollowArgs = {
	id: Scalars["UUID"]["input"];
};

export type UserOptionMutations = {
	__typename?: "UserOptionMutations";
	clearContentProfiles: Scalars["Boolean"]["output"];
	clearCoverImagesCaches: Scalars["Boolean"]["output"];
	clearFaviconCache: Scalars["Boolean"]["output"];
	clearThemesProfiles: Scalars["Boolean"]["output"];
	deleteContentProfile?: Maybe<ContentProfile>;
	deleteThemeProfile?: Maybe<MangaDexTheme>;
	setChapterFeedStyle: ChapterFeedStyle;
	setChapterLanguages: Array<Language>;
	setChapterLayout: ChapterLayoutStore;
	setChapterQuality: DownloadMode;
	setContentProfile: ContentProfile;
	setContentProfileBlur: Scalars["Boolean"]["output"];
	setContentProfileWarningMode: ContentProfileWarningMode;
	setContentProfiles: Scalars["Int"]["output"];
	setDefaultContentProfileKey?: Maybe<Scalars["String"]["output"]>;
	setDefaultThemeProfile?: Maybe<Scalars["String"]["output"]>;
	setForcePort443: Scalars["Boolean"]["output"];
	setImageFit: ImageFit;
	setLongstripImageWidth: Scalars["Float"]["output"];
	setMangaListStyle: MangaListStyle;
	setOfflineConfig: OfflineConfigObject;
	setPageDirection: Direction;
	setPageLimit?: Maybe<Scalars["Int"]["output"]>;
	setPaginationStyle: PaginationStyle;
	setReadingMode: ReadingMode;
	setSidebarDirection: Direction;
	setThemeProfile: MangaDexTheme;
	setThemeProfiles: Scalars["Int"]["output"];
	updateDefaultContentProfile: ContentProfile;
	updateDefaultTheme: MangaDexTheme;
};

export type UserOptionMutationsDeleteContentProfileArgs = {
	name: Scalars["String"]["input"];
};

export type UserOptionMutationsDeleteThemeProfileArgs = {
	name: Scalars["String"]["input"];
};

export type UserOptionMutationsSetChapterFeedStyleArgs = {
	style: ChapterFeedStyle;
};

export type UserOptionMutationsSetChapterLanguagesArgs = {
	languages: Array<Language>;
};

export type UserOptionMutationsSetChapterLayoutArgs = {
	drawer?: InputMaybe<DrawerMode>;
	progress?: InputMaybe<ProgressMode>;
	sidebar?: InputMaybe<SidebarMode>;
};

export type UserOptionMutationsSetChapterQualityArgs = {
	quality?: InputMaybe<DownloadMode>;
};

export type UserOptionMutationsSetContentProfileArgs = {
	name: Scalars["String"]["input"];
	profile?: InputMaybe<ContentProfileInput>;
};

export type UserOptionMutationsSetContentProfileBlurArgs = {
	blur: Scalars["Boolean"]["input"];
};

export type UserOptionMutationsSetContentProfileWarningModeArgs = {
	mode: ContentProfileWarningMode;
};

export type UserOptionMutationsSetContentProfilesArgs = {
	entries: Array<ContentProfileEntryInput>;
};

export type UserOptionMutationsSetDefaultContentProfileKeyArgs = {
	name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserOptionMutationsSetDefaultThemeProfileArgs = {
	name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserOptionMutationsSetForcePort443Args = {
	force: Scalars["Boolean"]["input"];
};

export type UserOptionMutationsSetImageFitArgs = {
	imageFit: ImageFit;
};

export type UserOptionMutationsSetLongstripImageWidthArgs = {
	width: Scalars["Float"]["input"];
};

export type UserOptionMutationsSetMangaListStyleArgs = {
	mangaListStyle: MangaListStyle;
};

export type UserOptionMutationsSetOfflineConfigArgs = {
	cfg: OfflineConfigInput;
};

export type UserOptionMutationsSetPageDirectionArgs = {
	direction: Direction;
};

export type UserOptionMutationsSetPageLimitArgs = {
	value?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UserOptionMutationsSetPaginationStyleArgs = {
	style: PaginationStyle;
};

export type UserOptionMutationsSetReadingModeArgs = {
	mode: ReadingMode;
};

export type UserOptionMutationsSetSidebarDirectionArgs = {
	direction: Direction;
};

export type UserOptionMutationsSetThemeProfileArgs = {
	name: Scalars["String"]["input"];
	theme?: InputMaybe<MangaDexThemeInput>;
};

export type UserOptionMutationsSetThemeProfilesArgs = {
	entries: Array<ThemeProfileEntryInput>;
};

export type UserOptionMutationsUpdateDefaultContentProfileArgs = {
	profile?: InputMaybe<ContentProfileInput>;
};

export type UserOptionMutationsUpdateDefaultThemeArgs = {
	theme?: InputMaybe<MangaDexThemeInput>;
};

export type UserOptionQueries = {
	__typename?: "UserOptionQueries";
	getAuthDateTimeLimit?: Maybe<Scalars["MangaDexDateTime"]["output"]>;
	getChapterLanguages: Array<Language>;
	getContentProfileBlur: Scalars["Boolean"]["output"];
	getContentProfileWarningMode: ContentProfileWarningMode;
	getDefaultContentProfile: ContentProfile;
	getOfflineConfig: OfflineConfigObject;
	getPageDirection: Direction;
	getReadingMode: ReadingMode;
	getSidebarDirection: Direction;
};

export type UserQueries = {
	__typename?: "UserQueries";
	get: User;
	list: UserResults;
	me: User;
};

export type UserQueriesGetArgs = {
	id: Scalars["UUID"]["input"];
};

export type UserQueriesListArgs = {
	params?: InputMaybe<UserListParam>;
};

export type UserRelationships = {
	__typename?: "UserRelationships";
	groups: Array<ScanlationGroup>;
};

export type UserReport = {
	__typename?: "UserReport";
	attributes: ReportAttributes;
	id: Scalars["UUID"]["output"];
	relationship: ReportRelationship;
};

export type UserReportResults = {
	__typename?: "UserReportResults";
	data: Array<UserReport>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
};

export type UserResults = {
	__typename?: "UserResults";
	data: Array<User>;
	limit: Scalars["Int"]["output"];
	offset: Scalars["Int"]["output"];
	total: Scalars["Int"]["output"];
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

export type UtilsQuery = {
	__typename?: "UtilsQuery";
	favicon: Scalars["Url"]["output"];
	languageToStr: Scalars["String"]["output"];
	strToLanguage: Language;
};

export type UtilsQueryFaviconArgs = {
	url: Scalars["Url"]["input"];
};

export type UtilsQueryLanguageToStrArgs = {
	language: Language;
};

export type UtilsQueryStrToLanguageArgs = {
	input: Scalars["String"]["input"];
};

export type VolumeAggregate = {
	__typename?: "VolumeAggregate";
	chapters: Array<ChapterAggregate>;
	count: Scalars["Int"]["output"];
	ids: Array<Scalars["UUID"]["output"]>;
	volume: Scalars["String"]["output"];
};

export type CustomlistPageQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
	private?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type CustomlistPageQueryQuery = {
	__typename?: "Query";
	customList: {
		__typename?: "CustomListQueries";
		get: {
			__typename?: "CustomList";
			id: any;
			attributes: {
				__typename?: "CustomListAttributes";
				name: string;
				visibility: CustomListVisibility;
			};
			relationships: {
				__typename?: "CustomListRelationships";
				titlesIds: Array<any>;
				user: {
					__typename?: "User";
					id: any;
					attributes: {
						__typename?: "UserAttributes";
						username: string;
						roles: Array<UserRole>;
					};
				};
			};
		};
	};
};

export type IsChapterDownloadedQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type IsChapterDownloadedQuery = {
	__typename?: "Query";
	chapter: {
		__typename?: "ChapterQueries";
		isDownloaded: { __typename?: "DownloadState"; isDownloaded: boolean; hasFailed: boolean };
	};
};

export type WatchChapterDownloadStateSubscriptionVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type WatchChapterDownloadStateSubscription = {
	__typename?: "Subscriptions";
	watchDownloadState: { __typename?: "DownloadState"; hasFailed: boolean; isDownloaded: boolean };
};

export type RecentlyAddedHomeQueryVariables = Exact<{ [key: string]: never }>;

export type RecentlyAddedHomeQuery = {
	__typename?: "Query";
	home: {
		__typename?: "HomeQueries";
		recentlyUploaded: {
			__typename?: "ChapterResults";
			data: Array<{
				__typename?: "Chapter";
				id: any;
				attributes: {
					__typename?: "ChapterAttributes";
					title?: string | null;
					pages: number;
					translatedLanguage: Language;
					readableAt?: any | null;
					chapter?: string | null;
					volume?: string | null;
				};
				relationships: {
					__typename?: "ChapterRelationships";
					scanlationGroups: Array<{
						__typename?: "ScanlationGroup";
						id: any;
						attributes: { __typename?: "ScanlationGroupAttributes"; name: string };
					}>;
					user: {
						__typename?: "User";
						id: any;
						attributes: {
							__typename?: "UserAttributes";
							username: string;
							roles: Array<UserRole>;
						};
					};
					manga: {
						__typename?: "MangaObject";
						id: any;
						attributes: { __typename?: "GraphQLMangaAttributes"; title: any };
						relationships: {
							__typename?: "MangaRelationships";
							coverArt: {
								__typename?: "Cover";
								id: any;
								attributes: { __typename?: "CoverAttributes"; fileName: string };
							};
						};
					};
				};
			}>;
		};
	};
};

export type HomePopularTitleQueryVariables = Exact<{ [key: string]: never }>;

export type HomePopularTitleQuery = {
	__typename?: "Query";
	home: {
		__typename?: "HomeQueries";
		popularTitles: {
			__typename?: "MangaResults";
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					title: any;
					contentRating?: ContentRating | null;
					description: any;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					authorArtists: Array<{
						__typename?: "Author";
						id: any;
						attributes: { __typename?: "AuthorAttributes"; name: string };
					}>;
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: { __typename?: "CoverAttributes"; fileName: string };
					};
				};
			}>;
		};
	};
};

export type RecentlyAddedHomeQueryQueryVariables = Exact<{ [key: string]: never }>;

export type RecentlyAddedHomeQueryQuery = {
	__typename?: "Query";
	home: {
		__typename?: "HomeQueries";
		recentlyAdded: {
			__typename?: "MangaResults";
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: { __typename?: "GraphQLMangaAttributes"; title: any };
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: { __typename?: "CoverAttributes"; fileName: string };
					};
				};
			}>;
		};
	};
};

export type SeasonalQueryVariables = Exact<{ [key: string]: never }>;

export type SeasonalQuery = {
	__typename?: "Query";
	home: {
		__typename?: "HomeQueries";
		seasonal: {
			__typename?: "CustomList";
			id: any;
			relationships: {
				__typename?: "CustomListRelationships";
				titles: Array<{
					__typename?: "MangaObject";
					id: any;
					attributes: {
						__typename?: "GraphQLMangaAttributes";
						title: any;
						altTitles: Array<any>;
						description: any;
					};
					relationships: {
						__typename?: "MangaRelationships";
						coverArt: {
							__typename?: "Cover";
							id: any;
							attributes: { __typename?: "CoverAttributes"; fileName: string };
						};
					};
				}>;
			};
		};
	};
};

export type StaffPicksQueryVariables = Exact<{ [key: string]: never }>;

export type StaffPicksQuery = {
	__typename?: "Query";
	home: {
		__typename?: "HomeQueries";
		staffPicks: {
			__typename?: "CustomList";
			id: any;
			relationships: {
				__typename?: "CustomListRelationships";
				titles: Array<{
					__typename?: "MangaObject";
					id: any;
					attributes: {
						__typename?: "GraphQLMangaAttributes";
						title: any;
						altTitles: Array<any>;
						state: MangaState;
						description: any;
						status: MangaStatus;
						availableTranslatedLanguages?: Array<Language> | null;
					};
					relationships: {
						__typename?: "MangaRelationships";
						coverArt: {
							__typename?: "Cover";
							id: any;
							attributes: { __typename?: "CoverAttributes"; fileName: string };
						};
					};
				}>;
			};
		};
	};
};

export type GetUserLoggedCustomListsQueryVariables = Exact<{
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetUserLoggedCustomListsQuery = {
	__typename?: "Query";
	customList: {
		__typename?: "CustomListQueries";
		currentLoggedLists: {
			__typename?: "CustomListResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "CustomList";
				id: any;
				attributes: {
					__typename?: "CustomListAttributes";
					name: string;
					visibility: CustomListVisibility;
				};
				relationships: { __typename?: "CustomListRelationships"; titlesIds: Array<any> };
			}>;
		};
	};
};

export type AddOrRemoveTitleToCustomListMutationVariables = Exact<{
	manga_id: Scalars["UUID"]["input"];
	addTo: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
	removeFrom: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type AddOrRemoveTitleToCustomListMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; addToListBatch: boolean; removeFromListBatch: boolean };
};

export type CreateCustomListMutationVariables = Exact<{
	mangaId: Scalars["UUID"]["input"];
	visibility: CustomListVisibility;
	name: Scalars["String"]["input"];
}>;

export type CreateCustomListMutation = {
	__typename?: "Mutation";
	customList: {
		__typename?: "CustomListMutations";
		create: { __typename?: "CustomList"; id: any };
	};
};

export type CreateEmptyCustomListMutationVariables = Exact<{
	visibility: CustomListVisibility;
	name: Scalars["String"]["input"];
}>;

export type CreateEmptyCustomListMutation = {
	__typename?: "Mutation";
	customList: {
		__typename?: "CustomListMutations";
		create: { __typename?: "CustomList"; id: any };
	};
};

export type MangaListMutationMutationVariables = Exact<{
	style: MangaListStyle;
}>;

export type MangaListMutationMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setMangaListStyle: MangaListStyle };
};

export type MangaListStyleSubSubscriptionVariables = Exact<{ [key: string]: never }>;

export type MangaListStyleSubSubscription = {
	__typename?: "Subscriptions";
	watchMangaListStyle: MangaListStyle;
};

export type MangaAggregateQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
	size?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type MangaAggregateQuery = {
	__typename?: "Query";
	manga: {
		__typename?: "MangaQueries";
		aggregate: {
			__typename?: "MangaAggregateQueries";
			chunked: Array<{
				__typename?: "MangaAggregate";
				ids: Array<any>;
				volumes: Array<{
					__typename?: "VolumeAggregate";
					volume: string;
					count: number;
					chapters: Array<{
						__typename?: "ChapterAggregate";
						chapter: string;
						count: number;
						ids: Array<any>;
					}>;
				}>;
			}>;
		};
	};
};

export type GetMangaAggregateChapterQueryVariables = Exact<{
	ids: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type GetMangaAggregateChapterQuery = {
	__typename?: "Query";
	chapter: {
		__typename?: "ChapterQueries";
		list: {
			__typename?: "ChapterResults";
			data: Array<{
				__typename?: "Chapter";
				id: any;
				attributes: {
					__typename?: "ChapterAttributes";
					title?: string | null;
					volume?: string | null;
					chapter?: string | null;
					translatedLanguage: Language;
					readableAt?: any | null;
				};
				relationships: {
					__typename?: "ChapterRelationships";
					scanlationGroups: Array<{
						__typename?: "ScanlationGroup";
						id: any;
						attributes: { __typename?: "ScanlationGroupAttributes"; name: string };
					}>;
					user: {
						__typename?: "User";
						id: any;
						attributes: {
							__typename?: "UserAttributes";
							username: string;
							roles: Array<UserRole>;
						};
					};
				};
			}>;
		};
	};
};

export type ChapterAggregateCommentsQueryVariables = Exact<{
	ids: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type ChapterAggregateCommentsQuery = {
	__typename?: "Query";
	statistics: {
		__typename?: "StatisticsQueries";
		chapter: {
			__typename?: "ChapterStatisticsQueries";
			list: Array<{
				__typename?: "Statistics";
				id: any;
				comments?: {
					__typename?: "StatisticsComments";
					threadUrl: any;
					repliesCount: number;
				} | null;
			}>;
		};
	};
};

export type GetMangaCoversQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type GetMangaCoversQuery = {
	__typename?: "Query";
	cover: {
		__typename?: "CoverQueries";
		list: {
			__typename?: "CoverResults";
			total: number;
			offset: number;
			limit: number;
			data: Array<{
				__typename?: "Cover";
				id: any;
				attributes: {
					__typename?: "CoverAttributes";
					description: string;
					fileName: string;
					volume?: string | null;
					locale?: Language | null;
				};
			}>;
		};
	};
};

export type GetRelatedTitlesDataQueryVariables = Exact<{
	ids: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type GetRelatedTitlesDataQuery = {
	__typename?: "Query";
	manga: {
		__typename?: "MangaQueries";
		list: {
			__typename?: "MangaResults";
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					title: any;
					status: MangaStatus;
					description: any;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: { __typename?: "CoverAttributes"; fileName: string };
					};
				};
			}>;
		};
	};
};

export type GetMangatoReadAggregateQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type GetMangatoReadAggregateQuery = {
	__typename?: "Query";
	manga: {
		__typename?: "MangaQueries";
		aggregate: {
			__typename?: "MangaAggregateQueries";
			default: {
				__typename?: "MangaAggregate";
				volumes: Array<{
					__typename?: "VolumeAggregate";
					volume: string;
					chapters: Array<{
						__typename?: "ChapterAggregate";
						ids: Array<any>;
						count: number;
						chapter: string;
					}>;
				}>;
			};
		};
	};
};

export type AuthorSearchFetcherQueryVariables = Exact<{
	name: Scalars["String"]["input"];
	offset?: Scalars["Int"]["input"];
	limit?: Scalars["Int"]["input"];
}>;

export type AuthorSearchFetcherQuery = {
	__typename?: "Query";
	author: {
		__typename?: "AuthorQueries";
		list: {
			__typename?: "AuthorResults";
			offset: number;
			limit: number;
			total: number;
			data: Array<{
				__typename?: "Author";
				id: any;
				attributes: { __typename?: "AuthorAttributes"; name: string };
			}>;
		};
	};
};

export type MultiChapterDownloadBaseMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MultiChapterDownloadBaseMutation = {
	__typename?: "Mutation";
	chapter: {
		__typename?: "ChapterMutations";
		download: { __typename?: "DownloadState"; isDownloaded: boolean; hasFailed: boolean };
	};
};

export type MultiChapterCancelDownloadBaseMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MultiChapterCancelDownloadBaseMutation = {
	__typename?: "Mutation";
	chapter: { __typename?: "ChapterMutations"; cancelDownload: boolean };
};

export type RemoveMultipleChapterMutationBaseMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type RemoveMultipleChapterMutationBaseMutation = {
	__typename?: "Mutation";
	chapter: { __typename?: "ChapterMutations"; remove: boolean };
};

export type GetChaptersIDsAsFeedQueryVariables = Exact<{
	ids: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type GetChaptersIDsAsFeedQuery = {
	__typename?: "Query";
	chapter: {
		__typename?: "ChapterQueries";
		listWithGroupByManga: {
			__typename?: "MangaChapterGroup";
			data: Array<{
				__typename?: "MangaChapterItem";
				manga: {
					__typename?: "MangaObject";
					id: any;
					attributes: { __typename?: "GraphQLMangaAttributes"; title: any };
				};
				chapters: Array<{
					__typename?: "Chapter";
					id: any;
					attributes: {
						__typename?: "ChapterAttributes";
						chapter?: string | null;
						title?: string | null;
						volume?: string | null;
					};
				}>;
			}>;
		};
	};
};

export type JustDownloadingTitleMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type JustDownloadingTitleMutation = {
	__typename?: "Mutation";
	manga: {
		__typename?: "MangaMutations";
		download: { __typename?: "DownloadState"; isDownloaded: boolean; hasFailed: boolean };
	};
};

export type AddTitleToListBatchMutationVariables = Exact<{
	mangas: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
	customList: Scalars["UUID"]["input"];
}>;

export type AddTitleToListBatchMutation = {
	__typename?: "Mutation";
	customList: { __typename?: "CustomListMutations"; addMangaBatch: boolean };
};

export type GetTitleTitlesQueryVariables = Exact<{
	titles: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type GetTitleTitlesQuery = {
	__typename?: "Query";
	manga: {
		__typename?: "MangaQueries";
		list: {
			__typename?: "MangaResults";
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: { __typename?: "GraphQLMangaAttributes"; title: any };
			}>;
		};
	};
};

export type UpdateReadingStatusesMutationVariables = Exact<{
	titles: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
	status?: InputMaybe<ReadingStatus>;
}>;

export type UpdateReadingStatusesMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; updateReadingStatusBatch: boolean };
};

export type FollowTitlesBatchMutationVariables = Exact<{
	titles: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type FollowTitlesBatchMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; followBatch: boolean };
};

export type UnfollowTitlesBatchMutationVariables = Exact<{
	titles: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type UnfollowTitlesBatchMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; unfollowBatch: boolean };
};

export type UserMeOnSidebarFooterQueryVariables = Exact<{ [key: string]: never }>;

export type UserMeOnSidebarFooterQuery = {
	__typename?: "Query";
	user: {
		__typename?: "UserQueries";
		me: {
			__typename?: "User";
			id: any;
			attributes: { __typename?: "UserAttributes"; username: string; roles: Array<UserRole> };
		};
	};
};

export type SetSidebarDirectionMutationVariables = Exact<{
	direction: Direction;
}>;

export type SetSidebarDirectionMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setSidebarDirection: Direction };
};

export type WatchDefaultContentProfileSubscriptionVariables = Exact<{ [key: string]: never }>;

export type WatchDefaultContentProfileSubscription = {
	__typename?: "Subscriptions";
	watchContentProfileDefault: {
		__typename?: "ContentProfile";
		originalLanguages: Array<Language>;
		publicationDemographic: Array<Demographic>;
		includedTags: Array<any>;
		includedTagsMode?: TagSearchMode | null;
		excludedTags: Array<any>;
		excludedTagsMode?: TagSearchMode | null;
		status: Array<MangaStatus>;
		excludedOriginalLanguage: Array<Language>;
		translatedLanguages: Array<Language>;
		contentRating: Array<ContentRating>;
		excludedGroups: Array<any>;
		excludedUploaders: Array<any>;
	};
};

export type UpdateDefaultContentProfileMutationVariables = Exact<{
	entry: ContentProfileInput;
}>;

export type UpdateDefaultContentProfileMutation = {
	__typename?: "Mutation";
	userOption: {
		__typename?: "UserOptionMutations";
		updateDefaultContentProfile: {
			__typename?: "ContentProfile";
			originalLanguages: Array<Language>;
			publicationDemographic: Array<Demographic>;
			includedTags: Array<any>;
			includedTagsMode?: TagSearchMode | null;
			excludedTags: Array<any>;
			excludedTagsMode?: TagSearchMode | null;
			status: Array<MangaStatus>;
			excludedOriginalLanguage: Array<Language>;
			translatedLanguages: Array<Language>;
			contentRating: Array<ContentRating>;
			excludedGroups: Array<any>;
			excludedUploaders: Array<any>;
		};
	};
};

export type GetDefaultContentProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetDefaultContentProfileQuery = {
	__typename?: "Query";
	userOption: {
		__typename?: "UserOptionQueries";
		getDefaultContentProfile: {
			__typename?: "ContentProfile";
			originalLanguages: Array<Language>;
			publicationDemographic: Array<Demographic>;
			includedTags: Array<any>;
			includedTagsMode?: TagSearchMode | null;
			excludedTags: Array<any>;
			excludedTagsMode?: TagSearchMode | null;
			status: Array<MangaStatus>;
			excludedOriginalLanguage: Array<Language>;
			translatedLanguages: Array<Language>;
			contentRating: Array<ContentRating>;
			excludedGroups: Array<any>;
			excludedUploaders: Array<any>;
		};
	};
};

export type WatchDefaultContentProfileKeySubscriptionVariables = Exact<{ [key: string]: never }>;

export type WatchDefaultContentProfileKeySubscription = {
	__typename?: "Subscriptions";
	watchContentProfileDefaultName?: string | null;
};

export type UpdateDefaultContentProfileKeyMutationVariables = Exact<{
	name?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateDefaultContentProfileKeyMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setDefaultContentProfileKey?: string | null };
};

export type WatchContentProfilesSubscriptionVariables = Exact<{ [key: string]: never }>;

export type WatchContentProfilesSubscription = {
	__typename?: "Subscriptions";
	watchContentProfiles: Array<{
		__typename?: "ContentProfileEntry";
		name: string;
		value: {
			__typename?: "ContentProfile";
			originalLanguages: Array<Language>;
			publicationDemographic: Array<Demographic>;
			includedTags: Array<any>;
			includedTagsMode?: TagSearchMode | null;
			excludedTags: Array<any>;
			excludedTagsMode?: TagSearchMode | null;
			status: Array<MangaStatus>;
			excludedOriginalLanguage: Array<Language>;
			translatedLanguages: Array<Language>;
			contentRating: Array<ContentRating>;
			excludedGroups: Array<any>;
			excludedUploaders: Array<any>;
		};
	}>;
};

export type UpdateContentProfilesMutationVariables = Exact<{
	entries: Array<ContentProfileEntryInput> | ContentProfileEntryInput;
}>;

export type UpdateContentProfilesMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setContentProfiles: number };
};

export type UpdateContentProfileMutationVariables = Exact<{
	name: Scalars["String"]["input"];
	entry?: InputMaybe<ContentProfileInput>;
}>;

export type UpdateContentProfileMutation = {
	__typename?: "Mutation";
	userOption: {
		__typename?: "UserOptionMutations";
		setContentProfile: {
			__typename?: "ContentProfile";
			originalLanguages: Array<Language>;
			publicationDemographic: Array<Demographic>;
			includedTags: Array<any>;
			includedTagsMode?: TagSearchMode | null;
			excludedTags: Array<any>;
			excludedTagsMode?: TagSearchMode | null;
			status: Array<MangaStatus>;
			excludedOriginalLanguage: Array<Language>;
			translatedLanguages: Array<Language>;
			contentRating: Array<ContentRating>;
			excludedGroups: Array<any>;
			excludedUploaders: Array<any>;
		};
	};
};

export type DownloadChapterMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
	quality?: InputMaybe<DownloadMode>;
}>;

export type DownloadChapterMutationMutation = {
	__typename?: "Mutation";
	chapter: {
		__typename?: "ChapterMutations";
		download: { __typename?: "DownloadState"; hasFailed: boolean; isDownloaded: boolean };
	};
};

export type CancelDownloadChapterMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type CancelDownloadChapterMutationMutation = {
	__typename?: "Mutation";
	chapter: { __typename?: "ChapterMutations"; cancelDownload: boolean };
};

export type ChapterDownloadStateSubscriptionVariables = Exact<{
	id: Scalars["UUID"]["input"];
	deferred?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type ChapterDownloadStateSubscription = {
	__typename?: "Subscriptions";
	watchChapterDownloadState: {
		__typename?: "ChapterDownloadState";
		isPending: boolean;
		isDone: boolean;
		isCanceled: boolean;
		isOfflineAppStateNotLoaded: boolean;
		error?: string | null;
		downloading?: {
			__typename?: "ChapterDownloadingState";
			isPreloading: boolean;
			isFetchingData: boolean;
			isFetchingAtHomeData: boolean;
			fetchingImage?: {
				__typename?: "ChapterImageFetchingStatus";
				filename: string;
				index: number;
				len: number;
			} | null;
		} | null;
	};
};

export type RemoveDownloadedChapterMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type RemoveDownloadedChapterMutation = {
	__typename?: "Mutation";
	chapter: { __typename?: "ChapterMutations"; remove: boolean };
};

export type ChapterDownloadStateQQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type ChapterDownloadStateQQuery = {
	__typename?: "Query";
	downloadState: {
		__typename?: "DownloadStateQueries";
		chapter: { __typename?: "DownloadState"; isDownloaded: boolean; hasFailed: boolean };
	};
};

export type DownloadCoverMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type DownloadCoverMutation = {
	__typename?: "Mutation";
	cover: {
		__typename?: "CoverMutations";
		download: { __typename?: "DownloadState"; hasFailed: boolean; isDownloaded: boolean };
	};
};

export type CancelDownloadCoverMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type CancelDownloadCoverMutation = {
	__typename?: "Mutation";
	cover: { __typename?: "CoverMutations"; cancelDownload: boolean };
};

export type CoverDownloadStateQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type CoverDownloadStateQuery = {
	__typename?: "Query";
	downloadState: {
		__typename?: "DownloadStateQueries";
		cover: { __typename?: "DownloadState"; hasFailed: boolean; isDownloaded: boolean };
	};
};

export type CoverDownloadSubSubscriptionVariables = Exact<{
	id: Scalars["UUID"]["input"];
	deferred?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type CoverDownloadSubSubscription = {
	__typename?: "Subscriptions";
	watchCoverDownloadState: {
		__typename?: "CoverDownloadState";
		isDone: boolean;
		isPending: boolean;
		isCanceled: boolean;
		isOfflineAppStateNotLoaded: boolean;
		downloading?: CoverDownloadingState | null;
		error?: string | null;
	};
};

export type CoverRemoveMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type CoverRemoveMutationMutation = {
	__typename?: "Mutation";
	cover: { __typename?: "CoverMutations"; remove: boolean };
};

export type DownloadMangaMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type DownloadMangaMutation = {
	__typename?: "Mutation";
	manga: {
		__typename?: "MangaMutations";
		download: { __typename?: "DownloadState"; hasFailed: boolean; isDownloaded: boolean };
	};
};

export type CancelDownloadMangaMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type CancelDownloadMangaMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; cancelDownload: boolean };
};

export type MangaDownloadStateQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MangaDownloadStateQuery = {
	__typename?: "Query";
	downloadState: {
		__typename?: "DownloadStateQueries";
		manga: { __typename?: "DownloadState"; hasFailed: boolean; isDownloaded: boolean };
	};
};

export type MangaDownloadSubSubscriptionVariables = Exact<{
	id: Scalars["UUID"]["input"];
	deferred?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type MangaDownloadSubSubscription = {
	__typename?: "Subscriptions";
	watchMangaDownloadState: {
		__typename?: "MangaDownloadState";
		isDone: boolean;
		isPending: boolean;
		isCanceled: boolean;
		isOfflineAppStateNotLoaded: boolean;
		downloading?: MangaDonwloadingState | null;
		error?: string | null;
	};
};

export type MangaRemoveMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MangaRemoveMutationMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; remove: boolean };
};

export type AllTagsQueryVariables = Exact<{ [key: string]: never }>;

export type AllTagsQuery = {
	__typename?: "Query";
	tag: {
		__typename?: "TagQueries";
		list: {
			__typename?: "TagResults";
			data: Array<{
				__typename?: "Tag";
				id: any;
				attributes: { __typename?: "TagAttributes"; name: any; group: TagGroup };
			}>;
		};
	};
};

export type LoginMutationMutationVariables = Exact<{
	username: Scalars["Username"]["input"];
	password: Scalars["Password"]["input"];
}>;

export type LoginMutationMutation = {
	__typename?: "Mutation";
	oauth: { __typename?: "OauthMutations"; login: boolean };
};

export type LogoutMutationMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutationMutation = {
	__typename?: "Mutation";
	oauth: { __typename?: "OauthMutations"; logout: boolean };
};

export type AuthorPageQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type AuthorPageQueryQuery = {
	__typename?: "Query";
	author: {
		__typename?: "AuthorQueries";
		get: {
			__typename?: "Author";
			id: any;
			attributes: {
				__typename?: "AuthorAttributes";
				name: string;
				imageUrl?: any | null;
				biography: any;
				twitter?: any | null;
				pixiv?: any | null;
				melonBook?: any | null;
				fanBox?: any | null;
				booth?: any | null;
				nicoVideo?: any | null;
				skeb?: any | null;
				fantia?: any | null;
				tumblr?: any | null;
				youtube?: any | null;
				weibo?: any | null;
				naver?: any | null;
				website?: any | null;
			};
		};
	};
	manga: { __typename?: "MangaQueries"; list: { __typename?: "MangaResults"; total: number } };
};

export type AuthorsSearchQueryVariables = Exact<{
	params: AuthorListParams;
}>;

export type AuthorsSearchQuery = {
	__typename?: "Query";
	author: {
		__typename?: "AuthorQueries";
		list: {
			__typename?: "AuthorResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "Author";
				id: any;
				attributes: { __typename?: "AuthorAttributes"; name: string };
				relationships: {
					__typename?: "AuthorRelationships";
					works: Array<{ __typename?: "MangaObject"; id: any }>;
				};
			}>;
		};
	};
};

export type SubToChapterImageFitSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubToChapterImageFitSubscription = {
	__typename?: "Subscriptions";
	watchImageFit: ImageFit;
};

export type UpdateChapterImageFitMutationVariables = Exact<{
	imageFit: ImageFit;
}>;

export type UpdateChapterImageFitMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setImageFit: ImageFit };
};

export type SubToChapterLongstripImageWidthSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubToChapterLongstripImageWidthSubscription = {
	__typename?: "Subscriptions";
	watchLongstripImageWidth: number;
};

export type UpdateChapterLongstripImageWidthMutationVariables = Exact<{
	width: Scalars["Float"]["input"];
}>;

export type UpdateChapterLongstripImageWidthMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setLongstripImageWidth: number };
};

export type SubToChapterReadingDirectionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubToChapterReadingDirectionSubscription = {
	__typename?: "Subscriptions";
	watchPageDirection: Direction;
};

export type UpdateChapterReadingDirectionMutationVariables = Exact<{
	direction: Direction;
}>;

export type UpdateChapterReadingDirectionMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setPageDirection: Direction };
};

export type SubToChapterReadingModeSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubToChapterReadingModeSubscription = {
	__typename?: "Subscriptions";
	watchReadingMode: ReadingMode;
};

export type UpdateChapterReadingModeMutationVariables = Exact<{
	mode: ReadingMode;
}>;

export type UpdateChapterReadingModeMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setReadingMode: ReadingMode };
};

export type GetChapterRelatedQueryVariables = Exact<{
	mangaId: Scalars["UUID"]["input"];
	langs: Language;
	groups: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type GetChapterRelatedQuery = {
	__typename?: "Query";
	manga: {
		__typename?: "MangaQueries";
		aggregate: {
			__typename?: "MangaAggregateQueries";
			default: {
				__typename?: "MangaAggregate";
				volumes: Array<{
					__typename?: "VolumeAggregate";
					volume: string;
					chapters: Array<{
						__typename?: "ChapterAggregate";
						chapter: string;
						ids: Array<any>;
					}>;
				}>;
			};
		};
	};
};

export type ChapterPageThreadQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type ChapterPageThreadQuery = {
	__typename?: "Query";
	statistics: {
		__typename?: "StatisticsQueries";
		chapter: {
			__typename?: "ChapterStatisticsQueries";
			get: {
				__typename?: "Statistics";
				comments?: {
					__typename?: "StatisticsComments";
					repliesCount: number;
					threadUrl: any;
				} | null;
			};
		};
	};
};

export type GetChapterPageDataQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type GetChapterPageDataQuery = {
	__typename?: "Query";
	chapter: {
		__typename?: "ChapterQueries";
		get: {
			__typename?: "Chapter";
			id: any;
			attributes: {
				__typename?: "ChapterAttributes";
				title?: string | null;
				volume?: string | null;
				chapter?: string | null;
				pages: number;
				translatedLanguage: Language;
				externalUrl?: any | null;
				readableAt?: any | null;
			};
			relationships: {
				__typename?: "ChapterRelationships";
				manga: {
					__typename?: "MangaObject";
					id: any;
					attributes: {
						__typename?: "GraphQLMangaAttributes";
						title: any;
						status: MangaStatus;
						state: MangaState;
						originalLanguage: Language;
						contentRating?: ContentRating | null;
						publicationDemographic?: Demographic | null;
						tags: Array<{
							__typename?: "Tag";
							id: any;
							attributes: { __typename?: "TagAttributes"; name: any };
						}>;
					};
				};
				scanlationGroups: Array<{
					__typename?: "ScanlationGroup";
					id: any;
					attributes: { __typename?: "ScanlationGroupAttributes"; name: string };
				}>;
				user: {
					__typename?: "User";
					id: any;
					attributes: {
						__typename?: "UserAttributes";
						username: string;
						roles: Array<UserRole>;
					};
				};
			};
		};
	};
};

export type SetContentProfileBlurMutationVariables = Exact<{
	blur: Scalars["Boolean"]["input"];
}>;

export type SetContentProfileBlurMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setContentProfileBlur: boolean };
};

export type SubContentProfileBlurSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubContentProfileBlurSubscription = {
	__typename?: "Subscriptions";
	watchContentProfileBlur: boolean;
};

export type GetContentProfileBlurQueryVariables = Exact<{ [key: string]: never }>;

export type GetContentProfileBlurQuery = {
	__typename?: "Query";
	userOption: { __typename?: "UserOptionQueries"; getContentProfileBlur: boolean };
};

export type SetContentProfileWarningModeMutationVariables = Exact<{
	mode: ContentProfileWarningMode;
}>;

export type SetContentProfileWarningModeMutation = {
	__typename?: "Mutation";
	userOption: {
		__typename?: "UserOptionMutations";
		setContentProfileWarningMode: ContentProfileWarningMode;
	};
};

export type GetContentProfileWarningModeQueryVariables = Exact<{ [key: string]: never }>;

export type GetContentProfileWarningModeQuery = {
	__typename?: "Query";
	userOption: {
		__typename?: "UserOptionQueries";
		getContentProfileWarningMode: ContentProfileWarningMode;
	};
};

export type SubContentProfileWarningModeSubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubContentProfileWarningModeSubscription = {
	__typename?: "Subscriptions";
	watchContentProfileWarningMode: ContentProfileWarningMode;
};

export type ListenToMangaTasksIDsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ListenToMangaTasksIDsSubscription = {
	__typename?: "Subscriptions";
	watchMangaTasksList: Array<any>;
};

export type ListenToChapterTasksIDsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ListenToChapterTasksIDsSubscription = {
	__typename?: "Subscriptions";
	watchChaptersTasksList: Array<any>;
};

export type ListenToCoverTasksIDsSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ListenToCoverTasksIDsSubscription = {
	__typename?: "Subscriptions";
	watchCoverTasksList: Array<any>;
};

export type ExportIdsToTxtMutationVariables = Exact<{
	uuids: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
	path: Scalars["String"]["input"];
}>;

export type ExportIdsToTxtMutation = {
	__typename?: "Mutation";
	export: { __typename?: "ExportMutations"; uuidsToAsTxt: string };
};

export type SetForcePort443MutationVariables = Exact<{
	force: Scalars["Boolean"]["input"];
}>;

export type SetForcePort443Mutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setForcePort443: boolean };
};

export type SubForce443SubscriptionVariables = Exact<{ [key: string]: never }>;

export type SubForce443Subscription = { __typename?: "Subscriptions"; watchForcePort443: boolean };

export type GroupPageQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type GroupPageQueryQuery = {
	__typename?: "Query";
	scanlationGroup: {
		__typename?: "ScanlationGroupQueries";
		getUnique: {
			__typename?: "ScanlationGroup";
			id: any;
			attributes: {
				__typename?: "ScanlationGroupAttributes";
				website?: any | null;
				twitter?: any | null;
				name: string;
				altNames: Array<any>;
				ircServer?: string | null;
				ircChannel?: string | null;
				contactEmail?: string | null;
				mangaUpdates?: any | null;
				focusedLanguages?: Array<Language> | null;
				locked: boolean;
				official: boolean;
				verified: boolean;
				exLicensed?: boolean | null;
				publishDelay?: any | null;
				createdAt: any;
				description?: string | null;
				discord?: string | null;
			};
			relationships: {
				__typename?: "ScanlationGroupRelationships";
				leader?: {
					__typename?: "User";
					id: any;
					attributes: {
						__typename?: "UserAttributes";
						roles: Array<UserRole>;
						username: string;
					};
				} | null;
				members: Array<{
					__typename?: "User";
					id: any;
					attributes: {
						__typename?: "UserAttributes";
						roles: Array<UserRole>;
						username: string;
					};
				}>;
			};
		};
	};
	manga: { __typename?: "MangaQueries"; list: { __typename?: "MangaResults"; total: number } };
	statistics: {
		__typename?: "StatisticsQueries";
		group: {
			__typename?: "GroupStatisticsQueries";
			get: {
				__typename?: "Statistics";
				comments?: {
					__typename?: "StatisticsComments";
					threadUrl: any;
					repliesCount: number;
				} | null;
			};
		};
	};
	chapter: {
		__typename?: "ChapterQueries";
		list: { __typename?: "ChapterResults"; total: number };
	};
};

export type FollowScanlationGroupMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type FollowScanlationGroupMutationMutation = {
	__typename?: "Mutation";
	scanlationGroup: { __typename?: "ScanlationGroupMutation"; follow: boolean };
};

export type UnfollowScanlationGroupMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type UnfollowScanlationGroupMutationMutation = {
	__typename?: "Mutation";
	scanlationGroup: { __typename?: "ScanlationGroupMutation"; unfollow: boolean };
};

export type IsFollowingScanlationGroupQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type IsFollowingScanlationGroupQueryQuery = {
	__typename?: "Query";
	follows: { __typename?: "FollowsQueries"; isFollowingGroup: boolean };
};

export type ScanlationUploadsFeedQueryVariables = Exact<{
	group: Scalars["UUID"]["input"];
	translatedLanguages?: Array<Language> | Language;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	order?: ChapterSortOrder;
	mangaListParams?: InputMaybe<MangaListParams>;
}>;

export type ScanlationUploadsFeedQuery = {
	__typename?: "Query";
	chapter: {
		__typename?: "ChapterQueries";
		listWithGroupByManga: {
			__typename?: "MangaChapterGroup";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaChapterItem";
				manga: {
					__typename?: "MangaObject";
					id: any;
					attributes: {
						__typename?: "GraphQLMangaAttributes";
						title: any;
						originalLanguage: Language;
						lastVolume?: string | null;
						lastChapter?: string | null;
					};
					relationships: {
						__typename?: "MangaRelationships";
						coverArt: {
							__typename?: "Cover";
							id: any;
							attributes: { __typename?: "CoverAttributes"; fileName: string };
						};
					};
				};
				chapters: Array<{
					__typename?: "Chapter";
					id: any;
					attributes: {
						__typename?: "ChapterAttributes";
						title?: string | null;
						chapter?: string | null;
						volume?: string | null;
						translatedLanguage: Language;
						externalUrl?: any | null;
						createdAt: any;
						readableAt?: any | null;
					};
					relationships: {
						__typename?: "ChapterRelationships";
						scanlationGroups: Array<{
							__typename?: "ScanlationGroup";
							id: any;
							attributes: { __typename?: "ScanlationGroupAttributes"; name: string };
						}>;
						user: {
							__typename?: "User";
							id: any;
							attributes: {
								__typename?: "UserAttributes";
								roles: Array<UserRole>;
								username: string;
							};
						};
					};
				}>;
			}>;
		};
	};
};

export type ScanalationGroupSearchQueryVariables = Exact<{
	params: ScanlationGroupListParams;
}>;

export type ScanalationGroupSearchQuery = {
	__typename?: "Query";
	scanlationGroup: {
		__typename?: "ScanlationGroupQueries";
		list: {
			__typename?: "ScanlationGroupResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "ScanlationGroup";
				id: any;
				attributes: {
					__typename?: "ScanlationGroupAttributes";
					name: string;
					discord?: string | null;
					website?: any | null;
				};
				relationships: {
					__typename?: "ScanlationGroupRelationships";
					leader?: {
						__typename?: "User";
						id: any;
						attributes: { __typename?: "UserAttributes"; username: string };
					} | null;
					members: Array<{ __typename?: "User"; id: any }>;
				};
			}>;
		};
	};
};

export type CurrentUserLibraryCompletedQueryVariables = Exact<{
	param?: InputMaybe<UserLibrarySectionParam>;
}>;

export type CurrentUserLibraryCompletedQuery = {
	__typename?: "Query";
	library: {
		__typename?: "CurrentUserLibrary";
		completed: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type CurrentUserLibraryDroppedQueryVariables = Exact<{
	param?: InputMaybe<UserLibrarySectionParam>;
}>;

export type CurrentUserLibraryDroppedQuery = {
	__typename?: "Query";
	library: {
		__typename?: "CurrentUserLibrary";
		dropped: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type ExportLibraryToCsvMutationVariables = Exact<{
	options: ExportMdLibraryToCsvOptions;
}>;

export type ExportLibraryToCsvMutation = {
	__typename?: "Mutation";
	library: { __typename?: "LibraryMutations"; exportAsCsv: string };
};

export type ExportLibraryToMyAnimeListMutationVariables = Exact<{
	options: MdlibraryToMyAnimeListExportOption;
}>;

export type ExportLibraryToMyAnimeListMutation = {
	__typename?: "Mutation";
	library: { __typename?: "LibraryMutations"; exportAsMyAnimeList: string };
};

export type CurrentUserLibraryUnfilteredQueryVariables = Exact<{
	param?: InputMaybe<UserLibrarySectionParam>;
}>;

export type CurrentUserLibraryUnfilteredQuery = {
	__typename?: "Query";
	library: {
		__typename?: "CurrentUserLibrary";
		unfiltered: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type LibraryTitleMapQueryVariables = Exact<{
	status?: InputMaybe<ReadingStatus>;
}>;

export type LibraryTitleMapQuery = {
	__typename?: "Query";
	manga: {
		__typename?: "MangaQueries";
		getMangaStatus: Array<{
			__typename?: "MangaReadingStatusItem";
			id: any;
			status: ReadingStatus;
		}>;
	};
};

export type CurrentUserLibraryOnHoldQueryVariables = Exact<{
	param?: InputMaybe<UserLibrarySectionParam>;
}>;

export type CurrentUserLibraryOnHoldQuery = {
	__typename?: "Query";
	library: {
		__typename?: "CurrentUserLibrary";
		onHold: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type CurrentUserLibraryPlanToReadQueryVariables = Exact<{
	param?: InputMaybe<UserLibrarySectionParam>;
}>;

export type CurrentUserLibraryPlanToReadQuery = {
	__typename?: "Query";
	library: {
		__typename?: "CurrentUserLibrary";
		planToRead: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type CurrentUserLibraryReReadingQueryVariables = Exact<{
	param?: InputMaybe<UserLibrarySectionParam>;
}>;

export type CurrentUserLibraryReReadingQuery = {
	__typename?: "Query";
	library: {
		__typename?: "CurrentUserLibrary";
		reReading: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type CurrentUserLibraryReadingQueryVariables = Exact<{
	param?: InputMaybe<UserLibrarySectionParam>;
}>;

export type CurrentUserLibraryReadingQuery = {
	__typename?: "Query";
	library: {
		__typename?: "CurrentUserLibrary";
		reading: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type LibrarySizeQueryVariables = Exact<{ [key: string]: never }>;

export type LibrarySizeQuery = {
	__typename?: "Query";
	library: {
		__typename?: "CurrentUserLibrary";
		size: {
			__typename?: "CurrentUserLibrarySize";
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

export type CurrentUserCustomListsQueryVariables = Exact<{
	params: CurrentLoggedLists;
}>;

export type CurrentUserCustomListsQuery = {
	__typename?: "Query";
	customList: {
		__typename?: "CustomListQueries";
		currentLoggedLists: {
			__typename?: "CustomListResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "CustomList";
				id: any;
				attributes: {
					__typename?: "CustomListAttributes";
					name: string;
					visibility: CustomListVisibility;
				};
				relationships: { __typename?: "CustomListRelationships"; titlesIds: Array<any> };
			}>;
		};
	};
};

export type ExportCustomListsToCsvMutationVariables = Exact<{
	options: ExportCustomListsToCsvOptions;
}>;

export type ExportCustomListsToCsvMutation = {
	__typename?: "Mutation";
	customList: {
		__typename?: "CustomListMutations";
		export: { __typename?: "CustomListExportMutations"; asCsv: string };
	};
};

export type ExportCustomListsToMalMutationVariables = Exact<{
	options: MdcustomListsToMyAnimeListExportOption;
}>;

export type ExportCustomListsToMalMutation = {
	__typename?: "Mutation";
	customList: {
		__typename?: "CustomListMutations";
		export: { __typename?: "CustomListExportMutations"; asMyAnimeList: string };
	};
};

export type DeleteCustomListMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type DeleteCustomListMutationMutation = {
	__typename?: "Mutation";
	customList: { __typename?: "CustomListMutations"; delete: boolean };
};

export type CustomListChapterFeedQueryVariables = Exact<{
	feedParam: CustomListMangaFeedParams;
	mangaParam?: InputMaybe<MangaListParams>;
	private?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type CustomListChapterFeedQuery = {
	__typename?: "Query";
	feed: {
		__typename?: "FeedQueries";
		customListFeedGrouped: {
			__typename?: "MangaChapterGroup";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaChapterItem";
				manga: {
					__typename?: "MangaObject";
					id: any;
					attributes: {
						__typename?: "GraphQLMangaAttributes";
						title: any;
						originalLanguage: Language;
						lastVolume?: string | null;
						lastChapter?: string | null;
					};
					relationships: {
						__typename?: "MangaRelationships";
						coverArt: {
							__typename?: "Cover";
							id: any;
							attributes: { __typename?: "CoverAttributes"; fileName: string };
						};
					};
				};
				chapters: Array<{
					__typename?: "Chapter";
					id: any;
					attributes: {
						__typename?: "ChapterAttributes";
						title?: string | null;
						chapter?: string | null;
						volume?: string | null;
						translatedLanguage: Language;
						externalUrl?: any | null;
						createdAt: any;
						readableAt?: any | null;
					};
					relationships: {
						__typename?: "ChapterRelationships";
						scanlationGroups: Array<{
							__typename?: "ScanlationGroup";
							id: any;
							attributes: { __typename?: "ScanlationGroupAttributes"; name: string };
						}>;
						user: {
							__typename?: "User";
							id: any;
							attributes: {
								__typename?: "UserAttributes";
								roles: Array<UserRole>;
								username: string;
							};
						};
					};
				}>;
			}>;
		};
	};
};

export type FollowCustomListMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type FollowCustomListMutationMutation = {
	__typename?: "Mutation";
	customList: { __typename?: "CustomListMutations"; follow: boolean };
};

export type UnfollowCustomListMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type UnfollowCustomListMutationMutation = {
	__typename?: "Mutation";
	customList: { __typename?: "CustomListMutations"; unfollow: boolean };
};

export type IsFollowingCustomListQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type IsFollowingCustomListQueryQuery = {
	__typename?: "Query";
	follows: { __typename?: "FollowsQueries"; isFollowingCustomList: boolean };
};

export type GetCustomListVersion1QueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type GetCustomListVersion1Query = {
	__typename?: "Query";
	customList: {
		__typename?: "CustomListQueries";
		get: {
			__typename?: "CustomList";
			id: any;
			attributes: { __typename?: "CustomListAttributes"; version: number };
		};
	};
};

export type UpdateCustomListVisibility1MutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
	visibility: CustomListVisibility;
	version: Scalars["Int"]["input"];
}>;

export type UpdateCustomListVisibility1Mutation = {
	__typename?: "Mutation";
	customList: {
		__typename?: "CustomListMutations";
		update: { __typename?: "CustomList"; id: any };
	};
};

export type RtlSidebarSubSubscriptionVariables = Exact<{ [key: string]: never }>;

export type RtlSidebarSubSubscription = {
	__typename?: "Subscriptions";
	watchSidebarDirection: Direction;
};

export type TagPopulatTitlesQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
	params?: InputMaybe<TagPopularList>;
}>;

export type TagPopulatTitlesQueryQuery = {
	__typename?: "Query";
	tag: {
		__typename?: "TagQueries";
		page: {
			__typename?: "TagPageQueries";
			popularInfSection: {
				__typename?: "MangaResults";
				limit: number;
				offset: number;
				total: number;
				data: Array<{
					__typename?: "MangaObject";
					id: any;
					attributes: {
						__typename?: "GraphQLMangaAttributes";
						description: any;
						year?: number | null;
						title: any;
						status: MangaStatus;
						state: MangaState;
						originalLanguage: Language;
						contentRating?: ContentRating | null;
						tags: Array<{
							__typename?: "Tag";
							id: any;
							attributes: { __typename?: "TagAttributes"; name: any };
						}>;
					};
					relationships: {
						__typename?: "MangaRelationships";
						coverArt: {
							__typename?: "Cover";
							id: any;
							attributes: {
								__typename?: "CoverAttributes";
								description: string;
								fileName: string;
							};
						};
					};
				}>;
			};
		};
	};
};

export type TagRecentlyPopularQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type TagRecentlyPopularQueryQuery = {
	__typename?: "Query";
	tag: {
		__typename?: "TagQueries";
		page: {
			__typename?: "TagPageQueries";
			recentlyAdded: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					title: any;
					originalLanguage: Language;
					status: MangaStatus;
					description: any;
					publicationDemographic?: Demographic | null;
					contentRating?: ContentRating | null;
					year?: number | null;
					altTitles: Array<any>;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							fileName: string;
							description: string;
						};
					};
					authorArtists: Array<{
						__typename?: "Author";
						id: any;
						attributes: { __typename?: "AuthorAttributes"; name: string };
					}>;
				};
			}>;
		};
	};
};

export type TagTopTenQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type TagTopTenQueryQuery = {
	__typename?: "Query";
	tag: {
		__typename?: "TagQueries";
		page: {
			__typename?: "TagPageQueries";
			topTen: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					title: any;
					originalLanguage: Language;
					status: MangaStatus;
					description: any;
					publicationDemographic?: Demographic | null;
					contentRating?: ContentRating | null;
					year?: number | null;
					altTitles: Array<any>;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							fileName: string;
							description: string;
						};
					};
					authorArtists: Array<{
						__typename?: "Author";
						id: any;
						attributes: { __typename?: "AuthorAttributes"; name: string };
					}>;
				};
			}>;
		};
	};
};

export type ExportTitlesToCsvMutationVariables = Exact<{
	options: ExportIdsLibraryToCsvOptions;
}>;

export type ExportTitlesToCsvMutation = {
	__typename?: "Mutation";
	manga: {
		__typename?: "MangaMutations";
		export: { __typename?: "MangaExportMutations"; idsAsCsv: string };
	};
};

export type ExportTitlesToMalMutationVariables = Exact<{
	options: MdidsToMyAnimeListExportOption;
}>;

export type ExportTitlesToMalMutation = {
	__typename?: "Mutation";
	manga: {
		__typename?: "MangaMutations";
		export: { __typename?: "MangaExportMutations"; idsAsMyAnimeList: string };
	};
};

export type UserLoggedChapterFeedQueryVariables = Exact<{
	translatedLanguages?: Array<Language> | Language;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	order?: MangaFeedSortOrder;
	mangaListParams?: InputMaybe<MangaListParams>;
}>;

export type UserLoggedChapterFeedQuery = {
	__typename?: "Query";
	feed: {
		__typename?: "FeedQueries";
		userLoggedMangaFeedGrouped: {
			__typename?: "MangaChapterGroup";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaChapterItem";
				manga: {
					__typename?: "MangaObject";
					id: any;
					attributes: {
						__typename?: "GraphQLMangaAttributes";
						title: any;
						originalLanguage: Language;
						lastVolume?: string | null;
						lastChapter?: string | null;
					};
					relationships: {
						__typename?: "MangaRelationships";
						coverArt: {
							__typename?: "Cover";
							id: any;
							attributes: { __typename?: "CoverAttributes"; fileName: string };
						};
					};
				};
				chapters: Array<{
					__typename?: "Chapter";
					id: any;
					attributes: {
						__typename?: "ChapterAttributes";
						title?: string | null;
						chapter?: string | null;
						volume?: string | null;
						translatedLanguage: Language;
						externalUrl?: any | null;
						createdAt: any;
						readableAt?: any | null;
					};
					relationships: {
						__typename?: "ChapterRelationships";
						scanlationGroups: Array<{
							__typename?: "ScanlationGroup";
							id: any;
							attributes: { __typename?: "ScanlationGroupAttributes"; name: string };
						}>;
						user: {
							__typename?: "User";
							id: any;
							attributes: {
								__typename?: "UserAttributes";
								roles: Array<UserRole>;
								username: string;
							};
						};
					};
				}>;
			}>;
		};
	};
};

export type GetMangaHihiQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type GetMangaHihiQuery = {
	__typename?: "Query";
	manga: {
		__typename?: "MangaQueries";
		get: {
			__typename?: "MangaObject";
			id: any;
			attributes: {
				__typename?: "GraphQLMangaAttributes";
				title: any;
				altTitles: Array<any>;
				state: MangaState;
				status: MangaStatus;
				description: any;
				availableTranslatedLanguages?: Array<Language> | null;
				year?: number | null;
				contentRating?: ContentRating | null;
				publicationDemographic?: Demographic | null;
				lastVolume?: string | null;
				lastChapter?: string | null;
				latestUploadedChapter?: any | null;
				originalLanguage: Language;
				links?: {
					__typename?: "MangaLinks";
					hasNoLinks: boolean;
					amazon?: any | null;
					anilist?: any | null;
					animePlanet?: any | null;
					bookWalker?: any | null;
					cdJapan?: any | null;
					ebookJapan?: any | null;
					englishTranslation?: any | null;
					kitsu?: any | null;
					mangaUpdates?: any | null;
					myAnimeList?: any | null;
					novelUpdates?: any | null;
					raw?: any | null;
				} | null;
				tags: Array<{
					__typename?: "Tag";
					id: any;
					attributes: { __typename?: "TagAttributes"; name: any; group: TagGroup };
				}>;
			};
			relationships: {
				__typename?: "MangaRelationships";
				authorArtists: Array<{
					__typename?: "Author";
					id: any;
					attributes: { __typename?: "AuthorAttributes"; name: string };
				}>;
				authors: Array<{
					__typename?: "Author";
					id: any;
					attributes: { __typename?: "AuthorAttributes"; name: string };
				}>;
				artists: Array<{
					__typename?: "Author";
					id: any;
					attributes: { __typename?: "AuthorAttributes"; name: string };
				}>;
				coverArt: {
					__typename?: "Cover";
					id: any;
					attributes: {
						__typename?: "CoverAttributes";
						fileName: string;
						locale?: Language | null;
					};
				};
				manga: Array<{ __typename?: "MangaRelated"; id: any; related: MangaRelation }>;
			};
		};
	};
};

export type FollowTitleMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type FollowTitleMutationMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; follow: boolean };
};

export type UnfollowTitleMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type UnfollowTitleMutationMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; unfollow: boolean };
};

export type IsFollowingTitleQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type IsFollowingTitleQueryQuery = {
	__typename?: "Query";
	follows: { __typename?: "FollowsQueries"; isFollowingManga: boolean };
};

export type MangaStatisticsQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MangaStatisticsQuery = {
	__typename?: "Query";
	statistics: {
		__typename?: "StatisticsQueries";
		manga: {
			__typename?: "MangaStatisticsQueries";
			get: {
				__typename?: "MangaStatistics";
				followCount: number;
				comments?: {
					__typename?: "StatisticsComments";
					threadUrl: any;
					repliesCount: number;
				} | null;
				rating: {
					__typename?: "MangaRating";
					bayesian?: number | null;
					distrubution: {
						__typename?: "MangaRatingDistribution";
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

export type LatestUploadsPageQueryQueryVariables = Exact<{
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type LatestUploadsPageQueryQuery = {
	__typename?: "Query";
	chapter: {
		__typename?: "ChapterQueries";
		listWithGroupByManga: {
			__typename?: "MangaChapterGroup";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaChapterItem";
				manga: {
					__typename?: "MangaObject";
					id: any;
					attributes: {
						__typename?: "GraphQLMangaAttributes";
						title: any;
						originalLanguage: Language;
						lastVolume?: string | null;
						lastChapter?: string | null;
					};
					relationships: {
						__typename?: "MangaRelationships";
						coverArt: {
							__typename?: "Cover";
							id: any;
							attributes: { __typename?: "CoverAttributes"; fileName: string };
						};
					};
				};
				chapters: Array<{
					__typename?: "Chapter";
					id: any;
					attributes: {
						__typename?: "ChapterAttributes";
						title?: string | null;
						chapter?: string | null;
						volume?: string | null;
						translatedLanguage: Language;
						externalUrl?: any | null;
						createdAt: any;
						readableAt?: any | null;
					};
					relationships: {
						__typename?: "ChapterRelationships";
						scanlationGroups: Array<{
							__typename?: "ScanlationGroup";
							id: any;
							attributes: { __typename?: "ScanlationGroupAttributes"; name: string };
						}>;
						user: {
							__typename?: "User";
							id: any;
							attributes: {
								__typename?: "UserAttributes";
								roles: Array<UserRole>;
								username: string;
							};
						};
					};
				}>;
			}>;
		};
	};
};

export type RandomTitleQueryVariables = Exact<{
	options?: InputMaybe<MangaRandomParams>;
}>;

export type RandomTitleQuery = {
	__typename?: "Query";
	manga: { __typename?: "MangaQueries"; random: { __typename?: "MangaObject"; id: any } };
};

export type RecentlyAddedPageQueryQueryVariables = Exact<{
	params?: InputMaybe<MangaListParams>;
}>;

export type RecentlyAddedPageQueryQuery = {
	__typename?: "Query";
	home: {
		__typename?: "HomeQueries";
		recentlyAdded: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type DefaultMangaSearchQueryQueryVariables = Exact<{
	params: MangaListParams;
	excludeContentProfile?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type DefaultMangaSearchQueryQuery = {
	__typename?: "Query";
	manga: {
		__typename?: "MangaQueries";
		list: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type OfflineMangaSearchQueryQueryVariables = Exact<{
	params: MangaListParams;
	excludeContentProfile?: InputMaybe<Scalars["Boolean"]["input"]>;
}>;

export type OfflineMangaSearchQueryQuery = {
	__typename?: "Query";
	manga: {
		__typename?: "MangaQueries";
		listOffline: {
			__typename?: "MangaResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaObject";
				id: any;
				attributes: {
					__typename?: "GraphQLMangaAttributes";
					description: any;
					year?: number | null;
					title: any;
					status: MangaStatus;
					state: MangaState;
					originalLanguage: Language;
					contentRating?: ContentRating | null;
					tags: Array<{
						__typename?: "Tag";
						id: any;
						attributes: { __typename?: "TagAttributes"; name: any };
					}>;
				};
				relationships: {
					__typename?: "MangaRelationships";
					coverArt: {
						__typename?: "Cover";
						id: any;
						attributes: {
							__typename?: "CoverAttributes";
							description: string;
							fileName: string;
						};
					};
				};
			}>;
		};
	};
};

export type UserPageQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type UserPageQueryQuery = {
	__typename?: "Query";
	user: {
		__typename?: "UserQueries";
		get: {
			__typename?: "User";
			id: any;
			attributes: { __typename?: "UserAttributes"; username: string; roles: Array<UserRole> };
			relationships: {
				__typename?: "UserRelationships";
				groups: Array<{
					__typename?: "ScanlationGroup";
					id: any;
					attributes: { __typename?: "ScanlationGroupAttributes"; name: string };
					relationships: {
						__typename?: "ScanlationGroupRelationships";
						leader?: { __typename?: "User"; id: any } | null;
					};
				}>;
			};
		};
	};
	chapter: {
		__typename?: "ChapterQueries";
		list: { __typename?: "ChapterResults"; total: number };
	};
};

export type FollowUserMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type FollowUserMutationMutation = {
	__typename?: "Mutation";
	user: { __typename?: "UserMutations"; follow: boolean };
};

export type UnfollowUserMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type UnfollowUserMutationMutation = {
	__typename?: "Mutation";
	user: { __typename?: "UserMutations"; unfollow: boolean };
};

export type IsFollowingUserQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type IsFollowingUserQueryQuery = {
	__typename?: "Query";
	follows: { __typename?: "FollowsQueries"; isFollowingUser: boolean };
};

export type UserCustomListsQueryVariables = Exact<{
	params: UserCustomListParams;
}>;

export type UserCustomListsQuery = {
	__typename?: "Query";
	customList: {
		__typename?: "CustomListQueries";
		getUserLists: {
			__typename?: "CustomListResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "CustomList";
				id: any;
				attributes: {
					__typename?: "CustomListAttributes";
					name: string;
					visibility: CustomListVisibility;
				};
				relationships: { __typename?: "CustomListRelationships"; titlesIds: Array<any> };
			}>;
		};
	};
};

export type UserUploadsFeedQueryVariables = Exact<{
	user: Scalars["UUID"]["input"];
	translatedLanguages?: Array<Language> | Language;
	offset?: InputMaybe<Scalars["Int"]["input"]>;
	limit?: InputMaybe<Scalars["Int"]["input"]>;
	order?: ChapterSortOrder;
	mangaListParams?: InputMaybe<MangaListParams>;
}>;

export type UserUploadsFeedQuery = {
	__typename?: "Query";
	chapter: {
		__typename?: "ChapterQueries";
		listWithGroupByManga: {
			__typename?: "MangaChapterGroup";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "MangaChapterItem";
				manga: {
					__typename?: "MangaObject";
					id: any;
					attributes: {
						__typename?: "GraphQLMangaAttributes";
						title: any;
						originalLanguage: Language;
						lastVolume?: string | null;
						lastChapter?: string | null;
					};
					relationships: {
						__typename?: "MangaRelationships";
						coverArt: {
							__typename?: "Cover";
							id: any;
							attributes: { __typename?: "CoverAttributes"; fileName: string };
						};
					};
				};
				chapters: Array<{
					__typename?: "Chapter";
					id: any;
					attributes: {
						__typename?: "ChapterAttributes";
						title?: string | null;
						chapter?: string | null;
						volume?: string | null;
						translatedLanguage: Language;
						externalUrl?: any | null;
						createdAt: any;
						readableAt?: any | null;
					};
					relationships: {
						__typename?: "ChapterRelationships";
						scanlationGroups: Array<{
							__typename?: "ScanlationGroup";
							id: any;
							attributes: { __typename?: "ScanlationGroupAttributes"; name: string };
						}>;
						user: {
							__typename?: "User";
							id: any;
							attributes: {
								__typename?: "UserAttributes";
								roles: Array<UserRole>;
								username: string;
							};
						};
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
	__typename?: "Query";
	user: {
		__typename?: "UserQueries";
		list: {
			__typename?: "UserResults";
			limit: number;
			offset: number;
			total: number;
			data: Array<{
				__typename?: "User";
				id: any;
				attributes: {
					__typename?: "UserAttributes";
					username: string;
					roles: Array<UserRole>;
				};
			}>;
		};
	};
};

export type UserMeSubscriptionVariables = Exact<{ [key: string]: never }>;

export type UserMeSubscription = {
	__typename?: "Subscriptions";
	watchUserMe: { __typename?: "UserAttributes"; username: string; roles: Array<UserRole> };
};

export type IsLoggedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type IsLoggedSubscription = { __typename?: "Subscriptions"; watchIsLogged: boolean };

export type AuthCheckQueryVariables = Exact<{ [key: string]: never }>;

export type AuthCheckQuery = {
	__typename?: "Query";
	auth: {
		__typename?: "AuthQuery";
		check: {
			__typename?: "AuthCheck";
			isAuthenticated: boolean;
			roles: Array<UserRole>;
			permissions: Array<string>;
		};
	};
};

export type ChapterPagesSubscriptionSubscriptionVariables = Exact<{
	chapter: Scalars["UUID"]["input"];
	mode?: InputMaybe<DownloadMode>;
}>;

export type ChapterPagesSubscriptionSubscription = {
	__typename?: "Subscriptions";
	getChapterPages: {
		__typename?: "ChapterPage";
		pages: number;
		index: number;
		url: any;
		size?: { __typename?: "ChapterImageSize"; width: number; height: number } | null;
	};
};

export type StartChapterPagesCachingMutationVariables = Exact<{
	chapter: Scalars["UUID"]["input"];
	mode?: InputMaybe<DownloadMode>;
}>;

export type StartChapterPagesCachingMutation = {
	__typename?: "Mutation";
	chapter: {
		__typename?: "ChapterMutations";
		pagesCache: { __typename?: "ChapterPagesStoreMutation"; startCaching: boolean };
	};
};

export type FetchingChapterPagesMetadataMutationVariables = Exact<{
	chapter: Scalars["UUID"]["input"];
	mode?: InputMaybe<DownloadMode>;
}>;

export type FetchingChapterPagesMetadataMutation = {
	__typename?: "Mutation";
	chapter: {
		__typename?: "ChapterMutations";
		pagesCache: { __typename?: "ChapterPagesStoreMutation"; fetchMetadata: boolean };
	};
};

export type RefetchChapterPageMutationVariables = Exact<{
	chapter: Scalars["UUID"]["input"];
	mode?: InputMaybe<DownloadMode>;
	page: Scalars["Int"]["input"];
}>;

export type RefetchChapterPageMutation = {
	__typename?: "Mutation";
	chapter: {
		__typename?: "ChapterMutations";
		pagesCache: { __typename?: "ChapterPagesStoreMutation"; refetchPage: boolean };
	};
};

export type ResendChapterPageMutationVariables = Exact<{
	chapter: Scalars["UUID"]["input"];
	mode?: InputMaybe<DownloadMode>;
	page: Scalars["Int"]["input"];
}>;

export type ResendChapterPageMutation = {
	__typename?: "Mutation";
	chapter: {
		__typename?: "ChapterMutations";
		pagesCache: { __typename?: "ChapterPagesStoreMutation"; resendPage: boolean };
	};
};

export type ResendChapterPagesMutationVariables = Exact<{
	chapter: Scalars["UUID"]["input"];
	mode?: InputMaybe<DownloadMode>;
}>;

export type ResendChapterPagesMutation = {
	__typename?: "Mutation";
	chapter: {
		__typename?: "ChapterMutations";
		pagesCache: { __typename?: "ChapterPagesStoreMutation"; resendAll: boolean };
	};
};

export type ChapterFeedStyleSubSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ChapterFeedStyleSubSubscription = {
	__typename?: "Subscriptions";
	watchChapterFeedStyle: ChapterFeedStyle;
};

export type UpdateChapterFeedStyleMutationVariables = Exact<{
	style: ChapterFeedStyle;
}>;

export type UpdateChapterFeedStyleMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setChapterFeedStyle: ChapterFeedStyle };
};

export type ChapterLayoutSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ChapterLayoutSubscriptionSubscription = {
	__typename?: "Subscriptions";
	watchChapterLayout: {
		__typename?: "ChapterLayoutStore";
		drawer: DrawerMode;
		sidebar: SidebarMode;
		progress: ProgressMode;
	};
};

export type SetChapterLayoutMutationVariables = Exact<{
	sidebar?: InputMaybe<SidebarMode>;
	drawer?: InputMaybe<DrawerMode>;
	progress?: InputMaybe<ProgressMode>;
}>;

export type SetChapterLayoutMutation = {
	__typename?: "Mutation";
	userOption: {
		__typename?: "UserOptionMutations";
		setChapterLayout: {
			__typename?: "ChapterLayoutStore";
			sidebar: SidebarMode;
			drawer: DrawerMode;
			progress: ProgressMode;
		};
	};
};

export type ChapterQualitySubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ChapterQualitySubscriptionSubscription = {
	__typename?: "Subscriptions";
	watchChapterQuality: DownloadMode;
};

export type ChapterQualityMutationMutationVariables = Exact<{
	quality?: InputMaybe<DownloadMode>;
}>;

export type ChapterQualityMutationMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setChapterQuality: DownloadMode };
};

export type CurrentClientInfoSubscriptionVariables = Exact<{ [key: string]: never }>;

export type CurrentClientInfoSubscription = {
	__typename?: "Subscriptions";
	watchClientInfo?: { __typename?: "ClientInfo"; clientSecret: string; clientId: string } | null;
};

export type SetAuthClientMutationVariables = Exact<{
	clientId: Scalars["String"]["input"];
	clientSecret: Scalars["String"]["input"];
}>;

export type SetAuthClientMutation = {
	__typename?: "Mutation";
	oauth: { __typename?: "OauthMutations"; setClientInfo: boolean };
};

export type ResetAuthClientMutationVariables = Exact<{ [key: string]: never }>;

export type ResetAuthClientMutation = {
	__typename?: "Mutation";
	oauth: { __typename?: "OauthMutations"; clearClientInfo: boolean };
};

export type MangaFollowingStatusSubscriptionSubscriptionVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MangaFollowingStatusSubscriptionSubscription = {
	__typename?: "Subscriptions";
	watchIsFollowingManga: boolean;
};

export type MangaFollowingStatusQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MangaFollowingStatusQueryQuery = {
	__typename?: "Query";
	follows: { __typename?: "FollowsQueries"; isFollowingManga: boolean };
};

export type FollowMangaMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type FollowMangaMutationMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; follow: boolean };
};

export type UnfollowMangaMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type UnfollowMangaMutationMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; unfollow: boolean };
};

export type MangaRatingSubscriptionSubscriptionVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MangaRatingSubscriptionSubscription = {
	__typename?: "Subscriptions";
	watchRating: { __typename?: "RatingItemAttributes"; rating: number };
};

export type GetMangaRatingQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type GetMangaRatingQuery = {
	__typename?: "Query";
	rating: {
		__typename?: "RatingQueries";
		lists: Array<{ __typename?: "RatingItem"; rating: number }>;
	};
};

export type UpdateMangaRatingMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
	rating: Scalars["Int"]["input"];
}>;

export type UpdateMangaRatingMutation = {
	__typename?: "Mutation";
	rating: { __typename?: "RatingMutations"; createUpdate: boolean };
};

export type DeleteMangaRatingMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type DeleteMangaRatingMutation = {
	__typename?: "Mutation";
	rating: { __typename?: "RatingMutations"; delete: boolean };
};

export type MangaReadingStatusSubscriptionSubscriptionVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MangaReadingStatusSubscriptionSubscription = {
	__typename?: "Subscriptions";
	watchMangaReadingState?: ReadingStatus | null;
};

export type MangaReadingStatusQueryQueryVariables = Exact<{
	id: Scalars["UUID"]["input"];
}>;

export type MangaReadingStatusQueryQuery = {
	__typename?: "Query";
	manga: { __typename?: "MangaQueries"; readingStatus?: ReadingStatus | null };
};

export type MangaReadingStatusMutationMutationVariables = Exact<{
	id: Scalars["UUID"]["input"];
	status?: InputMaybe<ReadingStatus>;
}>;

export type MangaReadingStatusMutationMutation = {
	__typename?: "Mutation";
	manga: { __typename?: "MangaMutations"; updateReadingStatus: boolean };
};

export type OfflineConfigQueryVariables = Exact<{ [key: string]: never }>;

export type OfflineConfigQuery = {
	__typename?: "Query";
	userOption: {
		__typename?: "UserOptionQueries";
		getOfflineConfig: {
			__typename?: "OfflineConfigObject";
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
	__typename?: "Mutation";
	userOption: {
		__typename?: "UserOptionMutations";
		setOfflineConfig: {
			__typename?: "OfflineConfigObject";
			dataDir: string;
			mangasDir: string;
			coversDir: string;
			chaptersDir: string;
		};
	};
};

export type ServerIconStateSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ServerIconStateSubscription = {
	__typename?: "Subscriptions";
	watchIsAppMounted: boolean;
};

export type PageLimitSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type PageLimitSubscriptionSubscription = {
	__typename?: "Subscriptions";
	watchPageLimit: number;
};

export type SetPageLimitMutationVariables = Exact<{
	limit?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type SetPageLimitMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setPageLimit?: number | null };
};

export type PaginationStyleUpdateSubscriptionVariables = Exact<{ [key: string]: never }>;

export type PaginationStyleUpdateSubscription = {
	__typename?: "Subscriptions";
	watchPaginationStyle: PaginationStyle;
};

export type UpdatePaginationStyleMutationVariables = Exact<{
	style: PaginationStyle;
}>;

export type UpdatePaginationStyleMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setPaginationStyle: PaginationStyle };
};

export type DefaultThemeProfileSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type DefaultThemeProfileSubscriptionSubscription = {
	__typename?: "Subscriptions";
	watchThemeProfileDefault: {
		__typename?: "MangaDexTheme";
		textColor: string;
		mainBackground: string;
		midTone: string;
		accents: {
			__typename?: "Accents";
			default: { __typename?: "Accent"; default: string; hover: string; active: string };
			l1: { __typename?: "Accent"; default: string; hover: string; active: string };
			l2: { __typename?: "Accent"; default: string; hover: string; active: string };
			l3: { __typename?: "Accent"; default: string; hover: string; active: string };
			l4: { __typename?: "Accent"; default: string; hover: string; active: string };
			l5: { __typename?: "Accent"; default: string; hover: string; active: string };
		};
		contrast: { __typename?: "Contrast"; l1: string };
		scrollbar: { __typename?: "ScrollbarColor"; default: string; hovered: string };
		button: { __typename?: "ButtonAccentColor"; default: string; alternate: string };
		primary: {
			__typename?: "PrimaryColor";
			primary: string;
			primary1: string;
			primary2: string;
		};
		status: {
			__typename?: "StatusColor";
			red: string;
			grey: string;
			green: string;
			yellow: string;
			blue: string;
			purple: string;
		};
		indication: { __typename?: "IndicatorColor"; blue: string };
		danger: { __typename?: "DangerColor"; default: string; l1: string; l2: string };
	};
};

export type UpdateDefaultThemeMutationVariables = Exact<{
	theme: MangaDexThemeInput;
}>;

export type UpdateDefaultThemeMutation = {
	__typename?: "Mutation";
	userOption: {
		__typename?: "UserOptionMutations";
		updateDefaultTheme: {
			__typename?: "MangaDexTheme";
			textColor: string;
			mainBackground: string;
			midTone: string;
			accents: {
				__typename?: "Accents";
				default: { __typename?: "Accent"; default: string; hover: string; active: string };
				l1: { __typename?: "Accent"; default: string; hover: string; active: string };
				l2: { __typename?: "Accent"; default: string; hover: string; active: string };
				l3: { __typename?: "Accent"; default: string; hover: string; active: string };
				l4: { __typename?: "Accent"; default: string; hover: string; active: string };
				l5: { __typename?: "Accent"; default: string; hover: string; active: string };
			};
			contrast: { __typename?: "Contrast"; l1: string };
			scrollbar: { __typename?: "ScrollbarColor"; default: string; hovered: string };
			button: { __typename?: "ButtonAccentColor"; default: string; alternate: string };
			primary: {
				__typename?: "PrimaryColor";
				primary: string;
				primary1: string;
				primary2: string;
			};
			status: {
				__typename?: "StatusColor";
				red: string;
				grey: string;
				green: string;
				yellow: string;
				blue: string;
				purple: string;
			};
			indication: { __typename?: "IndicatorColor"; blue: string };
			danger: { __typename?: "DangerColor"; default: string; l1: string; l2: string };
		};
	};
};

export type DefaultThemeProfileKeySubscriptionSubscriptionVariables = Exact<{
	[key: string]: never;
}>;

export type DefaultThemeProfileKeySubscriptionSubscription = {
	__typename?: "Subscriptions";
	watchThemeProfileDefaultName?: string | null;
};

export type UpdateDefaultThemeProfileKeyMutationVariables = Exact<{
	key?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type UpdateDefaultThemeProfileKeyMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setDefaultThemeProfile?: string | null };
};

export type ThemeProfilesSubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>;

export type ThemeProfilesSubscriptionSubscription = {
	__typename?: "Subscriptions";
	watchThemesProfile: Array<{
		__typename?: "ThemeProfileEntry";
		name: string;
		value: {
			__typename?: "MangaDexTheme";
			textColor: string;
			mainBackground: string;
			midTone: string;
			accents: {
				__typename?: "Accents";
				default: { __typename?: "Accent"; default: string; hover: string; active: string };
				l1: { __typename?: "Accent"; default: string; hover: string; active: string };
				l2: { __typename?: "Accent"; default: string; hover: string; active: string };
				l3: { __typename?: "Accent"; default: string; hover: string; active: string };
				l4: { __typename?: "Accent"; default: string; hover: string; active: string };
				l5: { __typename?: "Accent"; default: string; hover: string; active: string };
			};
			contrast: { __typename?: "Contrast"; l1: string };
			scrollbar: { __typename?: "ScrollbarColor"; default: string; hovered: string };
			button: { __typename?: "ButtonAccentColor"; default: string; alternate: string };
			primary: {
				__typename?: "PrimaryColor";
				primary: string;
				primary1: string;
				primary2: string;
			};
			status: {
				__typename?: "StatusColor";
				red: string;
				grey: string;
				green: string;
				yellow: string;
				blue: string;
				purple: string;
			};
			indication: { __typename?: "IndicatorColor"; blue: string };
			danger: { __typename?: "DangerColor"; default: string; l1: string; l2: string };
		};
	}>;
};

export type UpdateThemeProfilesMutationVariables = Exact<{
	themes: Array<ThemeProfileEntryInput> | ThemeProfileEntryInput;
}>;

export type UpdateThemeProfilesMutation = {
	__typename?: "Mutation";
	userOption: { __typename?: "UserOptionMutations"; setThemeProfiles: number };
};

export type UpdateThemeProfileMutationVariables = Exact<{
	name: Scalars["String"]["input"];
	theme?: InputMaybe<MangaDexThemeInput>;
}>;

export type UpdateThemeProfileMutation = {
	__typename?: "Mutation";
	userOption: {
		__typename?: "UserOptionMutations";
		setThemeProfile: {
			__typename?: "MangaDexTheme";
			textColor: string;
			mainBackground: string;
			midTone: string;
			accents: {
				__typename?: "Accents";
				default: { __typename?: "Accent"; default: string; hover: string; active: string };
				l1: { __typename?: "Accent"; default: string; hover: string; active: string };
				l2: { __typename?: "Accent"; default: string; hover: string; active: string };
				l3: { __typename?: "Accent"; default: string; hover: string; active: string };
				l4: { __typename?: "Accent"; default: string; hover: string; active: string };
				l5: { __typename?: "Accent"; default: string; hover: string; active: string };
			};
			contrast: { __typename?: "Contrast"; l1: string };
			scrollbar: { __typename?: "ScrollbarColor"; default: string; hovered: string };
			button: { __typename?: "ButtonAccentColor"; default: string; alternate: string };
			primary: {
				__typename?: "PrimaryColor";
				primary: string;
				primary1: string;
				primary2: string;
			};
			status: {
				__typename?: "StatusColor";
				red: string;
				grey: string;
				green: string;
				yellow: string;
				blue: string;
				purple: string;
			};
			indication: { __typename?: "IndicatorColor"; blue: string };
			danger: { __typename?: "DangerColor"; default: string; l1: string; l2: string };
		};
	};
};

export type CoverImageQueryVariables = Exact<{
	cover_id: Scalars["UUID"]["input"];
	manga_id: Scalars["UUID"]["input"];
	filename: Scalars["String"]["input"];
	mode?: InputMaybe<CoverImageQuality>;
}>;

export type CoverImageQuery = {
	__typename?: "Query";
	cover: { __typename?: "CoverQueries"; getImage: any };
};

export type FaviconQueryVariables = Exact<{
	url: Scalars["Url"]["input"];
}>;

export type FaviconQuery = {
	__typename?: "Query";
	utils: { __typename?: "UtilsQuery"; favicon: any };
};

export type GetLanguageFromStrQueryVariables = Exact<{
	lang: Scalars["String"]["input"];
}>;

export type GetLanguageFromStrQuery = {
	__typename?: "Query";
	utils: { __typename?: "UtilsQuery"; strToLanguage: Language };
};

export type GetAuthExpirationQueryVariables = Exact<{ [key: string]: never }>;

export type GetAuthExpirationQuery = {
	__typename?: "Query";
	userOption: { __typename?: "UserOptionQueries"; getAuthDateTimeLimit?: any | null };
};

export type MountAppStateMutationVariables = Exact<{ [key: string]: never }>;

export type MountAppStateMutation = {
	__typename?: "Mutation";
	offlineAppState: { __typename?: "OfflineAppStateMutations"; mountOfflineAppState: boolean };
};

export type UnmountAppStateMutationVariables = Exact<{ [key: string]: never }>;

export type UnmountAppStateMutation = {
	__typename?: "Mutation";
	offlineAppState: { __typename?: "OfflineAppStateMutations"; unmountOfflineAppState: boolean };
};

export type ChaptersStatsQueryVariables = Exact<{
	ids: Array<Scalars["UUID"]["input"]> | Scalars["UUID"]["input"];
}>;

export type ChaptersStatsQuery = {
	__typename?: "Query";
	statistics: {
		__typename?: "StatisticsQueries";
		chapter: {
			__typename?: "ChapterStatisticsQueries";
			list: Array<{
				__typename?: "Statistics";
				id: any;
				comments?: {
					__typename?: "StatisticsComments";
					threadUrl: any;
					repliesCount: number;
				} | null;
			}>;
		};
	};
};

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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "private" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "private" }
											}
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
														{
															kind: "Field",
															name: { kind: "Name", value: "name" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "visibility"
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
															name: {
																kind: "Name",
																value: "titlesIds"
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
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "username"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "roles"
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "isDownloaded" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "hasFailed" }
											}
										]
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
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "pages"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "translatedLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "readableAt"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "chapter"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "volume"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "scanlationGroups"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "user"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "username"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "roles"
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
																		name: {
																			kind: "Name",
																			value: "manga"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "title"
																									}
																								}
																							]
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "relationships"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "coverArt"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "id"
																														}
																													},
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "attributes"
																														},
																														selectionSet:
																															{
																																kind: "SelectionSet",
																																selections:
																																	[
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
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "authorArtists"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
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
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
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
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "altTitles"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "description"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "coverArt"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
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
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "altTitles"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "state"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "description"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "status"
																					}
																				},
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
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "coverArt"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "limit" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "offset" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "offset" }
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
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "name"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "visibility"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "titlesIds"
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
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "addTo" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaId" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "manga_id" }
											}
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "removeFrom" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaId" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "manga_id" }
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "CustomListVisibility" }
						}
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
																{
																	kind: "Variable",
																	name: {
																		kind: "Name",
																		value: "mangaId"
																	}
																}
															]
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "visibility" },
														value: {
															kind: "Variable",
															name: {
																kind: "Name",
																value: "visibility"
															}
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "name" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "name" }
														}
													}
												]
											}
										}
									],
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "CustomListVisibility" }
						}
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
														value: {
															kind: "Variable",
															name: {
																kind: "Name",
																value: "visibility"
															}
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "name" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "name" }
														}
													}
												]
											}
										}
									],
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "style" }
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
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchMangaListStyle" } }
				]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "id" }
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
												name: { kind: "Name", value: "chunked" },
												arguments: [
													{
														kind: "Argument",
														name: { kind: "Name", value: "chunkSize" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "size" }
														}
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
														{
															kind: "Field",
															name: { kind: "Name", value: "ids" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "volumes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "volume"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "count"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "chapters"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "chapter"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "count"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "ids"
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "ids" }
														}
													},
													{
														kind: "ObjectField",
														name: {
															kind: "Name",
															value: "includeExternalUrl"
														},
														value: {
															kind: "EnumValue",
															value: "EXCLUDE"
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
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "volume"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "chapter"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "translatedLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "readableAt"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "scanlationGroups"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "user"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "username"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "roles"
																									}
																								}
																							]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "ids" }
														}
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "comments"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "threadUrl"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "repliesCount"
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
															values: [
																{
																	kind: "Variable",
																	name: {
																		kind: "Name",
																		value: "id"
																	}
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
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "order" },
														value: {
															kind: "ObjectValue",
															fields: [
																{
																	kind: "ObjectField",
																	name: {
																		kind: "Name",
																		value: "volume"
																	},
																	value: {
																		kind: "EnumValue",
																		value: "ASCENDING"
																	}
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
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "fileName"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "volume"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "locale"
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
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											}
										]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "ids" }
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
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "id" }
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
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "volumes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "volume"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "chapters"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "ids"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "count"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "chapter"
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "name" }
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
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "name"
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
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "isDownloaded" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "hasFailed" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
} as unknown as DocumentNode<
	RemoveMultipleChapterMutationBaseMutation,
	RemoveMultipleChapterMutationBaseMutationVariables
>;
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
											name: { kind: "Name", value: "feedContent" },
											value: { kind: "BooleanValue", value: false }
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "chapterListParams" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "chapterIds" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "ids" }
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
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
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
															name: {
																kind: "Name",
																value: "chapters"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "chapter"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "volume"
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "isDownloaded" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "hasFailed" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "customList" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaIds" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mangas" }
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "titles" }
														}
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
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "titles" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "status" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "status" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "titles" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "titles" }
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
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "username"
															}
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "direction" }
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
								{
									kind: "Field",
									name: { kind: "Name", value: "originalLanguages" }
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "publicationDemographic" }
								},
								{ kind: "Field", name: { kind: "Name", value: "includedTags" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "includedTagsMode" }
								},
								{ kind: "Field", name: { kind: "Name", value: "excludedTags" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "excludedTagsMode" }
								},
								{ kind: "Field", name: { kind: "Name", value: "status" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "excludedOriginalLanguage" }
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "translatedLanguages" }
								},
								{ kind: "Field", name: { kind: "Name", value: "contentRating" } },
								{ kind: "Field", name: { kind: "Name", value: "excludedGroups" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "excludedUploaders" }
								}
							]
						}
					}
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "ContentProfileInput" }
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
									name: { kind: "Name", value: "updateDefaultContentProfile" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "profile" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "entry" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "originalLanguages" }
											},
											{
												kind: "Field",
												name: {
													kind: "Name",
													value: "publicationDemographic"
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "includedTags" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "includedTagsMode" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedTags" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedTagsMode" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "status" }
											},
											{
												kind: "Field",
												name: {
													kind: "Name",
													value: "excludedOriginalLanguage"
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "translatedLanguages" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "contentRating" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedGroups" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedUploaders" }
											}
										]
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
												kind: "Field",
												name: { kind: "Name", value: "originalLanguages" }
											},
											{
												kind: "Field",
												name: {
													kind: "Name",
													value: "publicationDemographic"
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "includedTags" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "includedTagsMode" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedTags" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedTagsMode" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "status" }
											},
											{
												kind: "Field",
												name: {
													kind: "Name",
													value: "excludedOriginalLanguage"
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "translatedLanguages" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "contentRating" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedGroups" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedUploaders" }
											}
										]
									}
								}
							]
						}
					}
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
					{
						kind: "Field",
						name: { kind: "Name", value: "watchContentProfileDefaultName" }
					}
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "name" }
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
												kind: "Field",
												name: { kind: "Name", value: "originalLanguages" }
											},
											{
												kind: "Field",
												name: {
													kind: "Name",
													value: "publicationDemographic"
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "includedTags" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "includedTagsMode" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedTags" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedTagsMode" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "status" }
											},
											{
												kind: "Field",
												name: {
													kind: "Name",
													value: "excludedOriginalLanguage"
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "translatedLanguages" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "contentRating" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedGroups" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedUploaders" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "entries" }
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
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "ContentProfileInput" }
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
									name: { kind: "Name", value: "setContentProfile" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "name" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "name" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "profile" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "entry" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "originalLanguages" }
											},
											{
												kind: "Field",
												name: {
													kind: "Name",
													value: "publicationDemographic"
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "includedTags" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "includedTagsMode" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedTags" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedTagsMode" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "status" }
											},
											{
												kind: "Field",
												name: {
													kind: "Name",
													value: "excludedOriginalLanguage"
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "translatedLanguages" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "contentRating" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedGroups" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "excludedUploaders" }
											}
										]
									}
								}
							]
						}
					}
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "quality" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "quality" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "hasFailed" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "isDownloaded" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "deferred" }
								}
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "isPending" } },
								{ kind: "Field", name: { kind: "Name", value: "isDone" } },
								{ kind: "Field", name: { kind: "Name", value: "isCanceled" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "isOfflineAppStateNotLoaded" }
								},
								{ kind: "Field", name: { kind: "Name", value: "error" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "downloading" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "isPreloading" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "isFetchingData" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "fetchingImage" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "filename"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "index" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "len" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: {
													kind: "Name",
													value: "isFetchingAtHomeData"
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "isDownloaded" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "hasFailed" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "hasFailed" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "isDownloaded" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "hasFailed" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "isDownloaded" }
											}
										]
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
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "deferred" }
								}
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "isDone" } },
								{ kind: "Field", name: { kind: "Name", value: "isPending" } },
								{ kind: "Field", name: { kind: "Name", value: "isCanceled" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "isOfflineAppStateNotLoaded" }
								},
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "hasFailed" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "isDownloaded" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "hasFailed" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "isDownloaded" }
											}
										]
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
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "deferred" }
								}
							}
						],
						selectionSet: {
							kind: "SelectionSet",
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "isDone" } },
								{ kind: "Field", name: { kind: "Name", value: "isPending" } },
								{ kind: "Field", name: { kind: "Name", value: "isCanceled" } },
								{
									kind: "Field",
									name: { kind: "Name", value: "isOfflineAppStateNotLoaded" }
								},
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "name"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "group"
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "password" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "username" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "username" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
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
														{
															kind: "Field",
															name: { kind: "Name", value: "name" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "imageUrl"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "biography"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "twitter" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "pixiv" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "melonBook"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "fanBox" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "booth" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "nicoVideo"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "skeb" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "fantia" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "tumblr" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "youtube" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "weibo" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "naver" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "website" }
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
														name: {
															kind: "Name",
															value: "authorOrArtist"
														},
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "id" }
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
												name: { kind: "Name", value: "total" }
											}
										]
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "AuthorListParams" }
						}
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "params" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "name"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "works"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "imageFit" }
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
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchLongstripImageWidth" } }
				]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "width" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "direction" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mode" }
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "groups" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "mangaId" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "mangaId" }
														}
													},
													{
														kind: "ObjectField",
														name: {
															kind: "Name",
															value: "translatedLanguage"
														},
														value: {
															kind: "ListValue",
															values: [
																{
																	kind: "Variable",
																	name: {
																		kind: "Name",
																		value: "langs"
																	}
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
															name: {
																kind: "Name",
																value: "volumes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "volume"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "chapters"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "chapter"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "ids"
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "id" }
														}
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "comments"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "repliesCount"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "threadUrl"
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
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
														{
															kind: "Field",
															name: { kind: "Name", value: "title" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "volume" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "chapter" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "pages" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "translatedLanguage"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "externalUrl"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "readableAt"
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
															name: { kind: "Name", value: "manga" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "status"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "state"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "originalLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "tags"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "name"
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
																					name: {
																						kind: "Name",
																						value: "contentRating"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "publicationDemographic"
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
															name: {
																kind: "Name",
																value: "scanlationGroups"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "name"
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
															name: { kind: "Name", value: "user" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "username"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "roles"
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "blur" }
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
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchContentProfileBlur" } }
				]
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
								{
									kind: "Field",
									name: { kind: "Name", value: "getContentProfileBlur" }
								}
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "ContentProfileWarningMode" }
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
									name: { kind: "Name", value: "setContentProfileWarningMode" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mode" }
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
								{
									kind: "Field",
									name: { kind: "Name", value: "getContentProfileWarningMode" }
								}
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
					{
						kind: "Field",
						name: { kind: "Name", value: "watchContentProfileWarningMode" }
					}
				]
			}
		}
	]
} as unknown as DocumentNode<
	SubContentProfileWarningModeSubscription,
	SubContentProfileWarningModeSubscriptionVariables
>;
export const ListenToMangaTasksIDsDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "listenToMangaTasksIDs" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchMangaTasksList" } }
				]
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
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchChaptersTasksList" } }
				]
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
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchCoverTasksList" } }
				]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "path" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "uuids" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "uuids" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "force" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
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
														{
															kind: "Field",
															name: { kind: "Name", value: "website" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "twitter" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "name" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "altNames"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "ircServer"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "ircChannel"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "contactEmail"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "mangaUpdates"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "focusedLanguages"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "locked" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "official"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "verified"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "exLicensed"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "publishDelay"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "createdAt"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "description"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "discord" }
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
															name: { kind: "Name", value: "leader" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "roles"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "username"
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
															name: {
																kind: "Name",
																value: "members"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "roles"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "username"
																					}
																				}
																			]
																		}
																	}
																]
															}
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "id" }
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
												name: { kind: "Name", value: "total" }
											}
										]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "id" }
														}
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "comments"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "threadUrl"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "repliesCount"
																		}
																	}
																]
															}
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
															values: [
																{
																	kind: "Variable",
																	name: {
																		kind: "Name",
																		value: "id"
																	}
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
												name: { kind: "Name", value: "total" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
} as unknown as DocumentNode<
	IsFollowingScanlationGroupQueryQuery,
	IsFollowingScanlationGroupQueryQueryVariables
>;
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
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "translatedLanguages" }
					},
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "Language" }
								}
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "ChapterSortOrder" }
						}
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
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "mangaListParams" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaListParams" } },
					defaultValue: { kind: "ObjectValue", fields: [] }
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
														name: {
															kind: "Name",
															value: "translatedLanguages"
														},
														value: {
															kind: "Variable",
															name: {
																kind: "Name",
																value: "translatedLanguages"
															}
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "groups" },
														value: {
															kind: "ListValue",
															values: [
																{
																	kind: "Variable",
																	name: {
																		kind: "Name",
																		value: "group"
																	}
																}
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
											kind: "Argument",
											name: { kind: "Name", value: "mangaListParams" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mangaListParams" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
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
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "originalLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastVolume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastChapter"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "coverArt"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
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
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "chapters"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "chapter"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "volume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "translatedLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "externalUrl"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "createdAt"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "readableAt"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "scanlationGroups"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "name"
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
																					name: {
																						kind: "Name",
																						value: "user"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "roles"
																														}
																													},
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "username"
																														}
																													}
																												]
																										}
																								}
																							]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "ScanlationGroupListParams" }
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
												kind: "Variable",
												name: { kind: "Name", value: "params" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "name"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "discord"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "website"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "leader"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "username"
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
																		name: {
																			kind: "Name",
																			value: "members"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "UserLibrarySectionParam" }
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
									name: { kind: "Name", value: "completed" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "param" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "UserLibrarySectionParam" }
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
									name: { kind: "Name", value: "dropped" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "param" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "options" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "options" }
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
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "UserLibrarySectionParam" }
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
									name: { kind: "Name", value: "unfiltered" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "param" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "status" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "id" } },
											{
												kind: "Field",
												name: { kind: "Name", value: "status" }
											}
										]
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
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "UserLibrarySectionParam" }
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
									name: { kind: "Name", value: "onHold" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "param" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "UserLibrarySectionParam" }
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
									name: { kind: "Name", value: "planToRead" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "param" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "UserLibrarySectionParam" }
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
									name: { kind: "Name", value: "reReading" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "param" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
					type: {
						kind: "NamedType",
						name: { kind: "Name", value: "UserLibrarySectionParam" }
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
									name: { kind: "Name", value: "reading" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "param" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "param" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
											{
												kind: "Field",
												name: { kind: "Name", value: "unfiltered" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "completed" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "dropped" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "planToRead" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "reading" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "reReading" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "onHold" }
											}
										]
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "CurrentLoggedLists" }
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
									name: { kind: "Name", value: "currentLoggedLists" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "params" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "name"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "visibility"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "titlesIds"
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "options" }
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "options" }
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
	ExportCustomListsToMalMutation,
	ExportCustomListsToMalMutationVariables
>;
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "CustomListMangaFeedParams" }
						}
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
											name: { kind: "Name", value: "feedParams" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "feedParam" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaListParams" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mangaParam" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "private" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "private" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
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
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "originalLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastVolume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastChapter"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "coverArt"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
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
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "chapters"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "chapter"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "volume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "translatedLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "externalUrl"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "createdAt"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "readableAt"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "scanlationGroups"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "name"
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
																					name: {
																						kind: "Name",
																						value: "user"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "roles"
																														}
																													},
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "username"
																														}
																													}
																												]
																										}
																								}
																							]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
} as unknown as DocumentNode<
	IsFollowingCustomListQueryQuery,
	IsFollowingCustomListQueryQueryVariables
>;
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
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
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "version" }
														}
													]
												}
											}
										]
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "CustomListVisibility" }
						}
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "id" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "version" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "version" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "visibility" },
														value: {
															kind: "Variable",
															name: {
																kind: "Name",
																value: "visibility"
															}
														}
													}
												]
											}
										}
									],
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
} as unknown as DocumentNode<
	UpdateCustomListVisibility1Mutation,
	UpdateCustomListVisibility1MutationVariables
>;
export const RtlSidebarSubDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "rtlSidebarSub" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchSidebarDirection" } }
				]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "params" }
														}
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "limit" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "offset" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "total" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "data" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "description"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "year"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "status"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "state"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "originalLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "tags"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "name"
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
																					name: {
																						kind: "Name",
																						value: "contentRating"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "coverArt"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "description"
																														}
																													},
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
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
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "publicationDemographic"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "altTitles"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "fileName"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
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
																		name: {
																			kind: "Name",
																			value: "authorArtists"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
																									}
																								}
																							]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
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
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "publicationDemographic"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "altTitles"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "fileName"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
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
																		name: {
																			kind: "Name",
																			value: "authorArtists"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
																									}
																								}
																							]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "options" }
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "options" }
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
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "translatedLanguages" }
					},
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "Language" }
								}
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "MangaFeedSortOrder" }
						}
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
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "mangaListParams" }
					},
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
														name: { kind: "Name", value: "order" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "order" }
														}
													},
													{
														kind: "ObjectField",
														name: {
															kind: "Name",
															value: "translatedLanguage"
														},
														value: {
															kind: "Variable",
															name: {
																kind: "Name",
																value: "translatedLanguages"
															}
														}
													},
													{
														kind: "ObjectField",
														name: {
															kind: "Name",
															value: "includeFutureUpdates"
														},
														value: {
															kind: "EnumValue",
															value: "EXCLUDE"
														}
													},
													{
														kind: "ObjectField",
														name: {
															kind: "Name",
															value: "includeExternalUrl"
														},
														value: {
															kind: "EnumValue",
															value: "EXCLUDE"
														}
													}
												]
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaListParams" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mangaListParams" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
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
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "originalLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastVolume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastChapter"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "coverArt"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
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
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "chapters"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "chapter"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "volume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "translatedLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "externalUrl"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "createdAt"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "readableAt"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "scanlationGroups"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "name"
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
																					name: {
																						kind: "Name",
																						value: "user"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "roles"
																														}
																													},
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "username"
																														}
																													}
																												]
																										}
																								}
																							]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
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
														{
															kind: "Field",
															name: { kind: "Name", value: "title" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "altTitles"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "state" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "status" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "description"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "availableTranslatedLanguages"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "year" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "contentRating"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "publicationDemographic"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "lastVolume"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "lastChapter"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "latestUploadedChapter"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "availableTranslatedLanguages"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "originalLanguage"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "links" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hasNoLinks"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "amazon"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "anilist"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "animePlanet"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "bookWalker"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "cdJapan"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "ebookJapan"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "englishTranslation"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "kitsu"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "mangaUpdates"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "myAnimeList"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "novelUpdates"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "raw"
																		}
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
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "name"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "group"
																					}
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
												name: { kind: "Name", value: "relationships" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "authorArtists"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "name"
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
															name: {
																kind: "Name",
																value: "authors"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "name"
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
															name: {
																kind: "Name",
																value: "artists"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "name"
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
															name: {
																kind: "Name",
																value: "coverArt"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "fileName"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "locale"
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
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "related"
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<GetMangaHihiQuery, GetMangaHihiQueryVariables>;
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "id" }
														}
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "comments"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "threadUrl"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "repliesCount"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "followCount"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "rating" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "bayesian"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "distrubution"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r1"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r2"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r3"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r4"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r5"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r6"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r7"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r8"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r9"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "r10"
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											name: { kind: "Name", value: "chapterListParams" },
											value: {
												kind: "ObjectValue",
												fields: [
													{
														kind: "ObjectField",
														name: {
															kind: "Name",
															value: "includeEmptyPages"
														},
														value: {
															kind: "EnumValue",
															value: "EXCLUDE"
														}
													},
													{
														kind: "ObjectField",
														name: {
															kind: "Name",
															value: "includeExternalUrl"
														},
														value: {
															kind: "EnumValue",
															value: "EXCLUDE"
														}
													},
													{
														kind: "ObjectField",
														name: {
															kind: "Name",
															value: "includeFutureUpdates"
														},
														value: {
															kind: "EnumValue",
															value: "EXCLUDE"
														}
													},
													{
														kind: "ObjectField",
														name: {
															kind: "Name",
															value: "includeFuturePublishAt"
														},
														value: {
															kind: "EnumValue",
															value: "EXCLUDE"
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "order" },
														value: {
															kind: "ObjectValue",
															fields: [
																{
																	kind: "ObjectField",
																	name: {
																		kind: "Name",
																		value: "readableAt"
																	},
																	value: {
																		kind: "EnumValue",
																		value: "DESCENDING"
																	}
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
											kind: "Argument",
											name: { kind: "Name", value: "feedContent" },
											value: { kind: "BooleanValue", value: true }
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
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
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "originalLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastVolume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastChapter"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "coverArt"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
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
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "chapters"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "chapter"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "volume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "translatedLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "externalUrl"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "createdAt"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "readableAt"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "scanlationGroups"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "name"
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
																					name: {
																						kind: "Name",
																						value: "user"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "roles"
																														}
																													},
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "username"
																														}
																													}
																												]
																										}
																								}
																							]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "options" }
											}
										}
									],
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "params" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "MangaListParams" }
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "excludeContentProfile" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "params" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "excludeContentProfile" },
											value: {
												kind: "Variable",
												name: {
													kind: "Name",
													value: "excludeContentProfile"
												}
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "MangaListParams" }
						}
					}
				},
				{
					kind: "VariableDefinition",
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "excludeContentProfile" }
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
									name: { kind: "Name", value: "listOffline" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "params" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "excludeContentProfile" },
											value: {
												kind: "Variable",
												name: {
													kind: "Name",
													value: "excludeContentProfile"
												}
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "description"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "year"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "title"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "status"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "state"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "originalLanguage"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "tags"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "name"
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
																		name: {
																			kind: "Name",
																			value: "contentRating"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "coverArt"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "id"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "attributes"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "description"
																									}
																								},
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
} as unknown as DocumentNode<OfflineMangaSearchQueryQuery, OfflineMangaSearchQueryQueryVariables>;
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
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
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "username"
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "roles" }
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
															name: { kind: "Name", value: "groups" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "name"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "leader"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								}
																							]
																					}
																				}
																			]
																		}
																	}
																]
															}
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
															values: [
																{
																	kind: "Variable",
																	name: {
																		kind: "Name",
																		value: "id"
																	}
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
												name: { kind: "Name", value: "total" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "UserCustomListParams" }
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
									name: { kind: "Name", value: "getUserLists" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "params" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "params" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "name"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "visibility"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "relationships"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "titlesIds"
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "translatedLanguages" }
					},
					type: {
						kind: "NonNullType",
						type: {
							kind: "ListType",
							type: {
								kind: "NonNullType",
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "Language" }
								}
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "ChapterSortOrder" }
						}
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
					variable: {
						kind: "Variable",
						name: { kind: "Name", value: "mangaListParams" }
					},
					type: { kind: "NamedType", name: { kind: "Name", value: "MangaListParams" } },
					defaultValue: { kind: "ObjectValue", fields: [] }
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
														name: {
															kind: "Name",
															value: "translatedLanguages"
														},
														value: {
															kind: "Variable",
															name: {
																kind: "Name",
																value: "translatedLanguages"
															}
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "uploaders" },
														value: {
															kind: "ListValue",
															values: [
																{
																	kind: "Variable",
																	name: {
																		kind: "Name",
																		value: "user"
																	}
																}
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
											kind: "Argument",
											name: { kind: "Name", value: "mangaListParams" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mangaListParams" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
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
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "originalLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastVolume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "lastChapter"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "coverArt"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
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
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "chapters"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "id"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "attributes"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "title"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "chapter"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "volume"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "translatedLanguage"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "externalUrl"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "createdAt"
																					}
																				},
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "readableAt"
																					}
																				}
																			]
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "relationships"
																		},
																		selectionSet: {
																			kind: "SelectionSet",
																			selections: [
																				{
																					kind: "Field",
																					name: {
																						kind: "Name",
																						value: "scanlationGroups"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "name"
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
																					name: {
																						kind: "Name",
																						value: "user"
																					},
																					selectionSet: {
																						kind: "SelectionSet",
																						selections:
																							[
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "id"
																									}
																								},
																								{
																									kind: "Field",
																									name: {
																										kind: "Name",
																										value: "attributes"
																									},
																									selectionSet:
																										{
																											kind: "SelectionSet",
																											selections:
																												[
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "roles"
																														}
																													},
																													{
																														kind: "Field",
																														name: {
																															kind: "Name",
																															value: "username"
																														}
																													}
																												]
																										}
																								}
																							]
																					}
																				}
																			]
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "params" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "limit" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "offset" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "total" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "data" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "attributes"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "username"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "roles"
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
											{
												kind: "Field",
												name: { kind: "Name", value: "isAuthenticated" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "roles" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "permissions" }
											}
										]
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
								value: {
									kind: "Variable",
									name: { kind: "Name", value: "chapter" }
								}
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
											{
												kind: "Field",
												name: { kind: "Name", value: "width" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "height" }
											}
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "chapter" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mode" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "startCaching" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "chapter" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mode" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "fetchMetadata" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "chapter" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mode" }
											}
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "page" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "chapter" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mode" }
											}
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "page" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "chapter" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mode" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "resendAll" }
											}
										]
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
export const ChapterFeedStyleSubDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "subscription",
			name: { kind: "Name", value: "chapterFeedStyleSub" },
			selectionSet: {
				kind: "SelectionSet",
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchChapterFeedStyle" } }
				]
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "ChapterFeedStyle" }
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
									name: { kind: "Name", value: "setChapterFeedStyle" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "style" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "style" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "sidebar" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "drawer" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "drawer" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "progress" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "progress" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "sidebar" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "drawer" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "progress" }
											}
										]
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
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchChapterQuality" } }
				]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "quality" }
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
								{ kind: "Field", name: { kind: "Name", value: "clientSecret" } },
								{ kind: "Field", name: { kind: "Name", value: "clientId" } }
							]
						}
					}
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "clientId" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "clientSecret" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "clientSecret" }
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
							selections: [
								{ kind: "Field", name: { kind: "Name", value: "clearClientInfo" } }
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<ResetAuthClientMutation, ResetAuthClientMutationVariables>;
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
												values: [
													{
														kind: "Variable",
														name: { kind: "Name", value: "id" }
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
												name: { kind: "Name", value: "rating" }
											}
										]
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "id" }
														}
													},
													{
														kind: "ObjectField",
														name: { kind: "Name", value: "rating" },
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "rating" }
														}
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "id" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "status" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "status" }
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
											{
												kind: "Field",
												name: { kind: "Name", value: "dataDir" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "mangasDir" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "coversDir" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "chaptersDir" }
											}
										]
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "OfflineConfigInput" }
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
									name: { kind: "Name", value: "setOfflineConfig" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "cfg" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "cfg" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "dataDir" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "mangasDir" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "coversDir" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "chaptersDir" }
											}
										]
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "limit" }
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
				selections: [
					{ kind: "Field", name: { kind: "Name", value: "watchPaginationStyle" } }
				]
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "PaginationStyle" }
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
									name: { kind: "Name", value: "setPaginationStyle" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "style" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "style" }
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
} as unknown as DocumentNode<UpdatePaginationStyleMutation, UpdatePaginationStyleMutationVariables>;
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
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "hover" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "active" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "l1" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "hover" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "active" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "l2" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "hover" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "active" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "l3" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "hover" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "active" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "l4" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "hover" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "active" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "l5" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "hover" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "active" }
														}
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
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "l1" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "scrollbar" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "default" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "hovered" }
											}
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "button" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "default" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "alternate" }
											}
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "primary" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "primary" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "primary1" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "primary2" }
											}
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
											{
												kind: "Field",
												name: { kind: "Name", value: "grey" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "green" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "yellow" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "blue" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "grey" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "purple" }
											}
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "indication" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{ kind: "Field", name: { kind: "Name", value: "blue" } }
										]
									}
								},
								{
									kind: "Field",
									name: { kind: "Name", value: "danger" },
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "default" }
											},
											{ kind: "Field", name: { kind: "Name", value: "l1" } },
											{ kind: "Field", name: { kind: "Name", value: "l2" } }
										]
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
						type: {
							kind: "NamedType",
							name: { kind: "Name", value: "MangaDexThemeInput" }
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
									name: { kind: "Name", value: "updateDefaultTheme" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "theme" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "theme" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "textColor" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "mainBackground" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "accents" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "default"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l1" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l2" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l3" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l4" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l5" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
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
												name: { kind: "Name", value: "midTone" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "contrast" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "l1" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "scrollbar" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "hovered" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "button" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "alternate"
															}
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "primary" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "primary" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "primary1"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "primary2"
															}
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "status" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "red" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "grey" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "green" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "yellow" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "blue" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "grey" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "purple" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "indication" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "blue" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "danger" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l1" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l2" }
														}
													]
												}
											}
										]
									}
								}
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "key" }
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
											{
												kind: "Field",
												name: { kind: "Name", value: "textColor" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "mainBackground" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "accents" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "default"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l1" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l2" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l3" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l4" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l5" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
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
												name: { kind: "Name", value: "midTone" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "contrast" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "l1" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "scrollbar" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "hovered" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "button" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "alternate"
															}
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "primary" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "primary" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "primary1"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "primary2"
															}
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "status" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "red" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "grey" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "green" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "yellow" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "blue" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "grey" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "purple" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "indication" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "blue" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "danger" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l1" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l2" }
														}
													]
												}
											}
										]
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
								type: {
									kind: "NamedType",
									name: { kind: "Name", value: "ThemeProfileEntryInput" }
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
									name: { kind: "Name", value: "setThemeProfiles" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "entries" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "themes" }
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "name" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "theme" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "theme" }
											}
										}
									],
									selectionSet: {
										kind: "SelectionSet",
										selections: [
											{
												kind: "Field",
												name: { kind: "Name", value: "textColor" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "mainBackground" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "accents" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "default"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l1" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l2" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l3" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l4" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
																		}
																	}
																]
															}
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l5" },
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "default"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "hover"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "active"
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
												name: { kind: "Name", value: "midTone" }
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "contrast" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "l1" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "scrollbar" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "hovered" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "button" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "alternate"
															}
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "primary" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "primary" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "primary1"
															}
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "primary2"
															}
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "status" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "red" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "grey" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "green" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "yellow" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "blue" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "grey" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "purple" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "indication" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "blue" }
														}
													]
												}
											},
											{
												kind: "Field",
												name: { kind: "Name", value: "danger" },
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "default" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l1" }
														},
														{
															kind: "Field",
															name: { kind: "Name", value: "l2" }
														}
													]
												}
											}
										]
									}
								}
							]
						}
					}
				]
			}
		}
	]
} as unknown as DocumentNode<UpdateThemeProfileMutation, UpdateThemeProfileMutationVariables>;
export const CoverImageDocument = {
	kind: "Document",
	definitions: [
		{
			kind: "OperationDefinition",
			operation: "query",
			name: { kind: "Name", value: "coverImage" },
			variableDefinitions: [
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "cover_id" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "UUID" } }
					}
				},
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
					variable: { kind: "Variable", name: { kind: "Name", value: "filename" } },
					type: {
						kind: "NonNullType",
						type: { kind: "NamedType", name: { kind: "Name", value: "String" } }
					}
				},
				{
					kind: "VariableDefinition",
					variable: { kind: "Variable", name: { kind: "Name", value: "mode" } },
					type: { kind: "NamedType", name: { kind: "Name", value: "CoverImageQuality" } }
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
									name: { kind: "Name", value: "getImage" },
									arguments: [
										{
											kind: "Argument",
											name: { kind: "Name", value: "coverId" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "cover_id" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mangaId" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "manga_id" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "filename" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "filename" }
											}
										},
										{
											kind: "Argument",
											name: { kind: "Name", value: "mode" },
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "mode" }
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
} as unknown as DocumentNode<CoverImageQuery, CoverImageQueryVariables>;
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "url" }
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
} as unknown as DocumentNode<FaviconQuery, FaviconQueryVariables>;
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
											value: {
												kind: "Variable",
												name: { kind: "Name", value: "lang" }
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
} as unknown as DocumentNode<GetLanguageFromStrQuery, GetLanguageFromStrQueryVariables>;
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
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "getAuthDateTimeLimit" }
								}
							]
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
							selections: [
								{
									kind: "Field",
									name: { kind: "Name", value: "mountOfflineAppState" }
								}
							]
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
								{
									kind: "Field",
									name: { kind: "Name", value: "unmountOfflineAppState" }
								}
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
														value: {
															kind: "Variable",
															name: { kind: "Name", value: "ids" }
														}
													}
												],
												selectionSet: {
													kind: "SelectionSet",
													selections: [
														{
															kind: "Field",
															name: { kind: "Name", value: "id" }
														},
														{
															kind: "Field",
															name: {
																kind: "Name",
																value: "comments"
															},
															selectionSet: {
																kind: "SelectionSet",
																selections: [
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "threadUrl"
																		}
																	},
																	{
																		kind: "Field",
																		name: {
																			kind: "Name",
																			value: "repliesCount"
																		}
																	}
																]
															}
														}
													]
												}
											}
										]
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
