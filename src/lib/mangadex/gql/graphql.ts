/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Binary` scalar type represents binary data. */
  Bytes: { input: any; output: any; }
  /** A scalar that can represent any JSON Object value. */
  JSONObject: { input: any; output: any; }
  MangaDexDateTime: { input: any; output: any; }
  MangaDexDuration: { input: any; output: any; }
  Password: { input: any; output: any; }
  PathBuf: { input: any; output: any; }
  /**
   * A UUID is a unique 128-bit number, stored as 16 octets. UUIDs are parsed as
   * Strings within GraphQL. UUIDs are used to assign unique identifiers to
   * entities without requiring a central allocating authority.
   *
   * # References
   *
   * * [Wikipedia: Universally Unique Identifier](http://en.wikipedia.org/wiki/Universally_unique_identifier)
   * * [RFC4122: A Universally Unique IDentifier (UUID) URN Namespace](http://tools.ietf.org/html/rfc4122)
   */
  UUID: { input: any; output: any; }
  /** URL is a String implementing the [URL Standard](http://url.spec.whatwg.org/) */
  Url: { input: any; output: any; }
  Username: { input: any; output: any; }
};

export type ApiClient = {
  __typename?: 'ApiClient';
  attributes: ApiClientAttributes;
  id: Scalars['UUID']['output'];
  relationships: ApiClientRelationships;
  secret: Scalars['String']['output'];
};

export type ApiClientAttributes = {
  __typename?: 'ApiClientAttributes';
  createdAt: Scalars['MangaDexDateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  externalClientId?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  profile: ApiClientProfile;
  state: ApiClientState;
  updatedAt: Scalars['MangaDexDateTime']['output'];
  version: Scalars['Int']['output'];
};

export type ApiClientCreateParams = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  profile?: ApiClientProfile;
  version?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiClientDeleteParam = {
  clientId: Scalars['UUID']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
};

export type ApiClientEditParam = {
  clientId: Scalars['UUID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  version: Scalars['Int']['input'];
};

export type ApiClientListParam = {
  includes?: Array<ReferenceExpansionResource>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<ApiClientState>;
};

export type ApiClientMutation = {
  __typename?: 'ApiClientMutation';
  create: ApiClient;
  delete: Scalars['Boolean']['output'];
  edit: ApiClient;
  regenerateSecret: Scalars['String']['output'];
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
  id: Scalars['UUID']['input'];
};

/** The Api Client profile */
export enum ApiClientProfile {
  Personal = 'PERSONAL',
  Public = 'PUBLIC'
}

export type ApiClientQueries = {
  __typename?: 'ApiClientQueries';
  get: ApiClient;
  list: ApiClientResults;
};


export type ApiClientQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type ApiClientQueriesListArgs = {
  params?: ApiClientListParam;
};

export type ApiClientRelationships = {
  __typename?: 'ApiClientRelationships';
  creator: User;
};

export type ApiClientResults = {
  __typename?: 'ApiClientResults';
  data: Array<ApiClient>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

/**
 * API Client state for approval.
 *
 * The purpose of these are to discourage troll entries by requiring staff approval.
 */
export enum ApiClientState {
  Approved = 'APPROVED',
  Autoapproved = 'AUTOAPPROVED',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type Author = {
  __typename?: 'Author';
  attributes: AuthorAttributes;
  id: Scalars['UUID']['output'];
  relationships: AuthorRelationships;
};

export type AuthorAttributes = {
  __typename?: 'AuthorAttributes';
  biography: Scalars['JSONObject']['output'];
  booth?: Maybe<Scalars['Url']['output']>;
  createdAt: Scalars['MangaDexDateTime']['output'];
  fanBox?: Maybe<Scalars['Url']['output']>;
  fantia?: Maybe<Scalars['Url']['output']>;
  imageUrl?: Maybe<Scalars['Url']['output']>;
  melonBook?: Maybe<Scalars['Url']['output']>;
  name: Scalars['String']['output'];
  naver?: Maybe<Scalars['Url']['output']>;
  nicoVideo?: Maybe<Scalars['Url']['output']>;
  pixiv?: Maybe<Scalars['Url']['output']>;
  skeb?: Maybe<Scalars['Url']['output']>;
  tumblr?: Maybe<Scalars['Url']['output']>;
  twitter?: Maybe<Scalars['Url']['output']>;
  updatedAt?: Maybe<Scalars['MangaDexDateTime']['output']>;
  version: Scalars['Int']['output'];
  website?: Maybe<Scalars['Url']['output']>;
  weibo?: Maybe<Scalars['Url']['output']>;
  youtube?: Maybe<Scalars['Url']['output']>;
};

export type AuthorCreateParams = {
  biography?: InputMaybe<Scalars['JSONObject']['input']>;
  booth?: InputMaybe<Scalars['Url']['input']>;
  fanBox?: InputMaybe<Scalars['Url']['input']>;
  fantia?: InputMaybe<Scalars['Url']['input']>;
  melonBook?: InputMaybe<Scalars['Url']['input']>;
  name: Scalars['String']['input'];
  naver?: InputMaybe<Scalars['Url']['input']>;
  nicoVideo?: InputMaybe<Scalars['Url']['input']>;
  pixiv?: InputMaybe<Scalars['Url']['input']>;
  skeb?: InputMaybe<Scalars['Url']['input']>;
  tumblr?: InputMaybe<Scalars['Url']['input']>;
  twitter?: InputMaybe<Scalars['Url']['input']>;
  website?: InputMaybe<Scalars['Url']['input']>;
  weibo?: InputMaybe<Scalars['Url']['input']>;
  youtube?: InputMaybe<Scalars['Url']['input']>;
};

export type AuthorEditParams = {
  biography?: InputMaybe<Scalars['JSONObject']['input']>;
  booth?: InputMaybe<Scalars['Url']['input']>;
  fanBox?: InputMaybe<Scalars['Url']['input']>;
  fantia?: InputMaybe<Scalars['Url']['input']>;
  id: Scalars['UUID']['input'];
  melonBook?: InputMaybe<Scalars['Url']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  naver?: InputMaybe<Scalars['Url']['input']>;
  nicoVideo?: InputMaybe<Scalars['Url']['input']>;
  pixiv?: InputMaybe<Scalars['Url']['input']>;
  skeb?: InputMaybe<Scalars['Url']['input']>;
  tumblr?: InputMaybe<Scalars['Url']['input']>;
  twitter?: InputMaybe<Scalars['Url']['input']>;
  version: Scalars['Int']['input'];
  website?: InputMaybe<Scalars['Url']['input']>;
  weibo?: InputMaybe<Scalars['Url']['input']>;
  youtube?: InputMaybe<Scalars['Url']['input']>;
};

export type AuthorListParams = {
  authorIds?: Array<Scalars['UUID']['input']>;
  includes?: Array<ReferenceExpansionResource>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AuthorSortOrder>;
};

export type AuthorMutations = {
  __typename?: 'AuthorMutations';
  create: Author;
  delete: Scalars['Boolean']['output'];
  edit: Author;
};


export type AuthorMutationsCreateArgs = {
  params: AuthorCreateParams;
};


export type AuthorMutationsDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type AuthorMutationsEditArgs = {
  params: AuthorEditParams;
};

export type AuthorQueries = {
  __typename?: 'AuthorQueries';
  get: Author;
  list: AuthorResults;
};


export type AuthorQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type AuthorQueriesListArgs = {
  params?: AuthorListParams;
};

export type AuthorRelationships = {
  __typename?: 'AuthorRelationships';
  works: Array<MangaObject>;
};

export type AuthorResults = {
  __typename?: 'AuthorResults';
  data: Array<Author>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AuthorSortOrder =
  { name: OrderDirection; };

export type BeginEditUploadSessionParam = {
  chapterId: Scalars['UUID']['input'];
  version: Scalars['Int']['input'];
};

export type BeginUploadSessionParam = {
  groups?: Array<Scalars['UUID']['input']>;
  mangaId: Scalars['UUID']['input'];
};

export type CaptchaMutations = {
  __typename?: 'CaptchaMutations';
  solve: Scalars['Boolean']['output'];
};


export type CaptchaMutationsSolveArgs = {
  params: CaptchaSolveParams;
};

export type CaptchaSolveParams = {
  captchaChallenge: Scalars['String']['input'];
};

export type Chapter = {
  __typename?: 'Chapter';
  attributes: ChapterAttributes;
  id: Scalars['UUID']['output'];
  relationships: ChapterRelationships;
};

export type ChapterAggregate = {
  __typename?: 'ChapterAggregate';
  chapter: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  ids: Array<Scalars['UUID']['output']>;
};

export type ChapterAttributes = {
  __typename?: 'ChapterAttributes';
  chapter?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['MangaDexDateTime']['output'];
  externalUrl?: Maybe<Scalars['Url']['output']>;
  pages: Scalars['Int']['output'];
  publishAt?: Maybe<Scalars['MangaDexDateTime']['output']>;
  readableAt?: Maybe<Scalars['MangaDexDateTime']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  translatedLanguage: Language;
  updatedAt?: Maybe<Scalars['MangaDexDateTime']['output']>;
  uploader?: Maybe<Scalars['UUID']['output']>;
  version: Scalars['Int']['output'];
  volume?: Maybe<Scalars['String']['output']>;
};

export type ChapterListParams = {
  chapterIds?: Array<Scalars['UUID']['input']>;
  /** Chapter number in the series or volume. */
  chapters?: Array<Scalars['String']['input']>;
  contentRating?: Array<ContentRating>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  createdAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  /** Groups to exclude from the results. */
  excludedGroups?: Array<Scalars['UUID']['input']>;
  excludedOriginalLanguages?: Array<Language>;
  /** Uploaders to exclude from the results. */
  excludedUploaders?: Array<Scalars['UUID']['input']>;
  groups?: Array<Scalars['UUID']['input']>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  mangaId?: InputMaybe<Scalars['UUID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ChapterSortOrder>;
  originalLanguages?: Array<Language>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  publishAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  translatedLanguages?: Array<Language>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  updatedAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  uploaders?: Array<Scalars['UUID']['input']>;
  volumes?: Array<Scalars['String']['input']>;
};

export type ChapterMutations = {
  __typename?: 'ChapterMutations';
  delete: Scalars['Boolean']['output'];
  download: DownloadState;
  /** Remove the chapter from the current device or offline */
  remove: Scalars['Boolean']['output'];
  update: Chapter;
};


export type ChapterMutationsDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type ChapterMutationsDownloadArgs = {
  id: Scalars['UUID']['input'];
  quality?: DownloadMode;
};


export type ChapterMutationsRemoveArgs = {
  id: Scalars['UUID']['input'];
};


export type ChapterMutationsUpdateArgs = {
  params: ChapterUpdateParams;
};

export type ChapterPages = {
  __typename?: 'ChapterPages';
  data: Array<Scalars['Url']['output']>;
  dataSaver: Array<Scalars['Url']['output']>;
};

export type ChapterQueries = {
  __typename?: 'ChapterQueries';
  get: Chapter;
  isDownloaded: DownloadState;
  list: ChapterResults;
  listWithGroupByManga: MangaChapterGroup;
  pages: ChapterPages;
};


export type ChapterQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type ChapterQueriesIsDownloadedArgs = {
  id: Scalars['UUID']['input'];
};


export type ChapterQueriesListArgs = {
  offlineParams?: InputMaybe<GetAllChapterParams>;
  params?: ChapterListParams;
};


export type ChapterQueriesListWithGroupByMangaArgs = {
  chapterListParams?: ChapterListParams;
  mangaListParams?: MangaListParams;
};


export type ChapterQueriesPagesArgs = {
  id: Scalars['UUID']['input'];
};

export type ChapterRelationships = {
  __typename?: 'ChapterRelationships';
  manga: MangaObject;
  scanlationGroups: Array<ScanlationGroup>;
  user: User;
};

export type ChapterResults = {
  __typename?: 'ChapterResults';
  data: Array<Chapter>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ChapterSortOrder =
  { chapter: OrderDirection; createdAt?: never; publishAt?: never; readableAt?: never; updatedAt?: never; volume?: never; }
  |  { chapter?: never; createdAt: OrderDirection; publishAt?: never; readableAt?: never; updatedAt?: never; volume?: never; }
  |  { chapter?: never; createdAt?: never; publishAt: OrderDirection; readableAt?: never; updatedAt?: never; volume?: never; }
  |  { chapter?: never; createdAt?: never; publishAt?: never; readableAt: OrderDirection; updatedAt?: never; volume?: never; }
  |  { chapter?: never; createdAt?: never; publishAt?: never; readableAt?: never; updatedAt: OrderDirection; volume?: never; }
  |  { chapter?: never; createdAt?: never; publishAt?: never; readableAt?: never; updatedAt?: never; volume: OrderDirection; };

export type ChapterStatisticsQueries = {
  __typename?: 'ChapterStatisticsQueries';
  get: Statistics;
  list: Array<Statistics>;
};


export type ChapterStatisticsQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type ChapterStatisticsQueriesListArgs = {
  ids: Array<Scalars['UUID']['input']>;
};

export type ChapterUpdateParams = {
  /**
   * Chapter number.
   *
   * <= 8 characters in length.
   *
   * Nullable.
   */
  chapter?: InputMaybe<Scalars['String']['input']>;
  chapterId: Scalars['UUID']['input'];
  groups?: Array<Scalars['UUID']['input']>;
  /**
   * <= 255 characters in length.
   *
   * Nullable.
   */
  title?: InputMaybe<Scalars['String']['input']>;
  translatedLanguage?: InputMaybe<Language>;
  /** >= 1 */
  version: Scalars['Int']['input'];
  /**
   * Volume number.
   *
   * Nullable.
   */
  volume?: InputMaybe<Scalars['String']['input']>;
};

export type ClientInfo = {
  __typename?: 'ClientInfo';
  clientId: Scalars['String']['output'];
  clientSecret: Scalars['String']['output'];
};

export type CommitUploadSessionParam = {
  /** Nullable */
  chapter?: InputMaybe<Scalars['String']['input']>;
  /**
   * Must be a URL with "http(s)://".
   *
   * Nullable
   */
  externalUrl?: InputMaybe<Scalars['Url']['input']>;
  /** Ordered list of Upload Session File IDs. */
  pageOrder: Array<Scalars['UUID']['input']>;
  publishAt?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  sessionId: Scalars['UUID']['input'];
  /** Nullable */
  title?: InputMaybe<Scalars['String']['input']>;
  translatedLanguage: Language;
  /** Nullable */
  volume?: InputMaybe<Scalars['String']['input']>;
};

export enum ContentRating {
  Erotica = 'EROTICA',
  Pornographic = 'PORNOGRAPHIC',
  Safe = 'SAFE',
  Suggestive = 'SUGGESTIVE'
}

export type Cover = {
  __typename?: 'Cover';
  attributes: CoverAttributes;
  id: Scalars['UUID']['output'];
  relationships: CoverRelationships;
};

export type CoverAttributes = {
  __typename?: 'CoverAttributes';
  createdAt: Scalars['MangaDexDateTime']['output'];
  description: Scalars['String']['output'];
  fileName: Scalars['String']['output'];
  locale?: Maybe<Language>;
  updatedAt?: Maybe<Scalars['MangaDexDateTime']['output']>;
  version: Scalars['Int']['output'];
  volume?: Maybe<Scalars['String']['output']>;
};

export enum CoverImageQuality {
  V256 = 'V256',
  V512 = 'V512'
}

export type CoverListParam = {
  coverIds?: Array<Scalars['UUID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  locales?: Array<Language>;
  mangaIds?: Array<Scalars['UUID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CoverSortOrder>;
  uploaderIds?: Array<Scalars['UUID']['input']>;
};

export type CoverQueries = {
  __typename?: 'CoverQueries';
  get: Cover;
  getImage: Scalars['Bytes']['output'];
  isDownloaded: DownloadState;
  list: CoverResults;
};


export type CoverQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type CoverQueriesGetImageArgs = {
  coverId: Scalars['UUID']['input'];
  filename: Scalars['String']['input'];
  mangaId: Scalars['UUID']['input'];
  mode?: InputMaybe<CoverImageQuality>;
};


export type CoverQueriesIsDownloadedArgs = {
  id: Scalars['UUID']['input'];
};


export type CoverQueriesListArgs = {
  params?: CoverListParam;
};

export type CoverRelationships = {
  __typename?: 'CoverRelationships';
  manga: MangaObject;
  user: User;
};

export type CoverResults = {
  __typename?: 'CoverResults';
  data: Array<Cover>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CoverSortOrder =
  { createdAt: OrderDirection; updatedAt?: never; volume?: never; }
  |  { createdAt?: never; updatedAt: OrderDirection; volume?: never; }
  |  { createdAt?: never; updatedAt?: never; volume: OrderDirection; };

export type CreateForumThreadParams = {
  id: Scalars['UUID']['input'];
  type: ForumThreadType;
};

export type CreateMangaParam = {
  altTitles?: InputMaybe<Array<Scalars['JSONObject']['input']>>;
  artists?: InputMaybe<Array<Scalars['UUID']['input']>>;
  authors?: InputMaybe<Array<Scalars['UUID']['input']>>;
  chapterNumbersResetOnNewVolume?: InputMaybe<Scalars['Boolean']['input']>;
  contentRating: ContentRating;
  description?: InputMaybe<Scalars['JSONObject']['input']>;
  lastChapter?: InputMaybe<Scalars['String']['input']>;
  lastVolume?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Scalars['JSONObject']['input']>;
  originalLanguage: Language;
  /** Cover ID. */
  primaryCover?: InputMaybe<Scalars['UUID']['input']>;
  publicationDemographic?: InputMaybe<Demographic>;
  status: MangaStatus;
  tags?: InputMaybe<Array<Scalars['UUID']['input']>>;
  title: Scalars['JSONObject']['input'];
  /** >= 1 */
  version: Scalars['Int']['input'];
  /** Year the manga was released. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateReportParam = {
  category: ReportCategory;
  /** Optional notes about why this is being reported. */
  details?: InputMaybe<Scalars['String']['input']>;
  /**
   * The ID from the category type.
   *
   * For example, if the category is "manga", this should be a manga UUID.
   */
  objectId: Scalars['UUID']['input'];
  /**
   * The report reason ID for sub-categorization.
   *
   * For example, if a manga was being reported for being a troll entry, the specific reason ID should be used, obtained from the [list report reasons endpoint](crate::v5::report::list).
   */
  reason: Scalars['UUID']['input'];
};

export type CreateScalantionGroupParam = {
  /** Nullable. */
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  /** Nullable. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Nullable. */
  discord?: InputMaybe<Scalars['String']['input']>;
  inactive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Nullable. */
  ircChannel?: InputMaybe<Scalars['String']['input']>;
  /** Nullable. */
  ircServer?: InputMaybe<Scalars['String']['input']>;
  /**
   * Regex: [^https:/\/www\.mangaupdates\.com\/(?:groups|publishers)\.html\?id=\d+](https://www.mangaupdates.com)
   *
   * Nullable.
   */
  mangaUpdates?: InputMaybe<Scalars['Url']['input']>;
  name: Scalars['String']['input'];
  /** Nullable. */
  publishDelay?: InputMaybe<Scalars['MangaDexDuration']['input']>;
  /** Nullable. */
  twitter?: InputMaybe<Scalars['Url']['input']>;
  /** Nullable. */
  website?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUpdateRating = {
  mangaId: Scalars['UUID']['input'];
  /**
   * `[ 1 .. 10 ]`.
   *
   * Numbers below `1` will be set at `1` and numbers above `10` will be set at `10`.
   */
  rating: Scalars['Int']['input'];
};

export type CurrentLoggedLists = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomList = {
  __typename?: 'CustomList';
  attributes: CustomListAttributes;
  id: Scalars['UUID']['output'];
  relationships: CustomListRelationships;
};

export type CustomListAddMangaParam = {
  listId: Scalars['UUID']['input'];
  mangaId: Scalars['UUID']['input'];
};

export type CustomListAttributes = {
  __typename?: 'CustomListAttributes';
  name: Scalars['String']['output'];
  version: Scalars['Int']['output'];
  visibility: CustomListVisibility;
};

export type CustomListCreateParam = {
  manga?: Array<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
  version?: InputMaybe<Scalars['Int']['input']>;
  visibility?: InputMaybe<CustomListVisibility>;
};

export type CustomListMangaFeedParams = {
  contentRating?: Array<ContentRating>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  createdAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  /** Groups to exclude from the results. */
  excludedGroups?: Array<Scalars['UUID']['input']>;
  excludedOriginalLanguage?: Array<Language>;
  /** Uploaders to exclude from the results. */
  excludedUploaders?: Array<Scalars['UUID']['input']>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  listId: Scalars['UUID']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MangaFeedSortOrder>;
  originalLanguage?: Array<Language>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  publishAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  translatedLanguage?: Array<Language>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  updatedAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
};

export type CustomListMutations = {
  __typename?: 'CustomListMutations';
  addManga: Scalars['Boolean']['output'];
  create: CustomList;
  delete: Scalars['Boolean']['output'];
  follow: Scalars['Boolean']['output'];
  removeManga: Scalars['Boolean']['output'];
  unfollow: Scalars['Boolean']['output'];
  update: CustomList;
};


export type CustomListMutationsAddMangaArgs = {
  params: CustomListAddMangaParam;
};


export type CustomListMutationsCreateArgs = {
  params: CustomListCreateParam;
};


export type CustomListMutationsDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type CustomListMutationsFollowArgs = {
  id: Scalars['UUID']['input'];
};


export type CustomListMutationsRemoveMangaArgs = {
  params: CustomListRemoveMangaParam;
};


export type CustomListMutationsUnfollowArgs = {
  id: Scalars['UUID']['input'];
};


export type CustomListMutationsUpdateArgs = {
  params: CustomListUpdateParams;
};

export type CustomListQueries = {
  __typename?: 'CustomListQueries';
  currentLoggedLists: CustomListResults;
  get: CustomList;
  getUserLists: CustomListResults;
};


export type CustomListQueriesCurrentLoggedListsArgs = {
  params?: CurrentLoggedLists;
};


export type CustomListQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type CustomListQueriesGetUserListsArgs = {
  params: UserCustomListParams;
};

export type CustomListRelationships = {
  __typename?: 'CustomListRelationships';
  titles: Array<MangaObject>;
  titlesIds: Array<Scalars['UUID']['output']>;
  user: User;
};


export type CustomListRelationshipsTitlesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomListRemoveMangaParam = {
  listId: Scalars['UUID']['input'];
  mangaId: Scalars['UUID']['input'];
};

export type CustomListResults = {
  __typename?: 'CustomListResults';
  data: Array<CustomList>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CustomListUpdateParams = {
  listId: Scalars['UUID']['input'];
  manga?: Array<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  version: Scalars['Int']['input'];
  visibility?: InputMaybe<CustomListVisibility>;
};

export enum CustomListVisibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type DeleteImageParam = {
  sessionFileId: Scalars['UUID']['input'];
  sessionId: Scalars['UUID']['input'];
};

export type DeleteImagesParam = {
  sessionFileIds: Array<Scalars['UUID']['input']>;
  sessionId: Scalars['UUID']['input'];
};

/** Target demographic for manga. */
export enum Demographic {
  Josei = 'JOSEI',
  None = 'NONE',
  Seinen = 'SEINEN',
  Shoujo = 'SHOUJO',
  Shounen = 'SHOUNEN'
}

export enum Direction {
  Ltr = 'LTR',
  Rtl = 'RTL'
}

export enum DownloadMode {
  DataSaver = 'DATA_SAVER',
  Normal = 'NORMAL'
}

export type DownloadState = {
  __typename?: 'DownloadState';
  hasFailed: Scalars['Boolean']['output'];
  isDownloaded: Scalars['Boolean']['output'];
};

export type DownloadStateQueries = {
  __typename?: 'DownloadStateQueries';
  chapter: DownloadState;
  cover: DownloadState;
  manga: DownloadState;
};


export type DownloadStateQueriesChapterArgs = {
  chapterId: Scalars['UUID']['input'];
};


export type DownloadStateQueriesCoverArgs = {
  coverId: Scalars['UUID']['input'];
};


export type DownloadStateQueriesMangaArgs = {
  mangaId: Scalars['UUID']['input'];
};

export type EditScanlationGroupParam = {
  /** Nullable. */
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  /** Nullable. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Nullable. */
  discord?: InputMaybe<Scalars['String']['input']>;
  /**
   * Languages the scanlation primarily translates or uploads works into.
   *
   * Nullable.
   */
  focusedLanguages?: InputMaybe<Array<Language>>;
  groupId: Scalars['UUID']['input'];
  inactive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Nullable. */
  ircChannel?: InputMaybe<Scalars['String']['input']>;
  /** Nullable. */
  ircServer?: InputMaybe<Scalars['String']['input']>;
  leader?: InputMaybe<Scalars['UUID']['input']>;
  locked?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Regex: [^https:/\/www\.mangaupdates\.com\/(?:groups|publishers)\.html\?id=\d+](https://www.mangaupdates.com)
   *
   * Nullable.
   */
  mangaUpdates?: InputMaybe<Scalars['Url']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  publishDelay?: InputMaybe<Scalars['MangaDexDuration']['input']>;
  /** Nullable. */
  twitter?: InputMaybe<Scalars['Url']['input']>;
  /** >= 1 */
  version: Scalars['Int']['input'];
  /** Nullable. */
  website?: InputMaybe<Scalars['String']['input']>;
};

export type FeedQueries = {
  __typename?: 'FeedQueries';
  customListFeed: ChapterResults;
  customListFeedGrouped: MangaChapterGroup;
  userLoggedMangaFeed: ChapterResults;
  userLoggedMangaFeedGrouped: MangaChapterGroup;
};


export type FeedQueriesCustomListFeedArgs = {
  params: CustomListMangaFeedParams;
};


export type FeedQueriesCustomListFeedGroupedArgs = {
  feedParams: CustomListMangaFeedParams;
  mangaListParams?: MangaListParams;
};


export type FeedQueriesUserLoggedMangaFeedArgs = {
  params?: FollowedMangaFeedParams;
};


export type FeedQueriesUserLoggedMangaFeedGroupedArgs = {
  feedParams?: FollowedMangaFeedParams;
  mangaListParams?: MangaListParams;
};

export type FollowedMangaFeedParams = {
  contentRating?: Array<ContentRating>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  createdAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  /** Groups to exclude from the results. */
  excludedGroups?: Array<Scalars['UUID']['input']>;
  excludedOriginalLanguage?: Array<Language>;
  /** Uploaders to exclude from the results. */
  excludedUploaders?: Array<Scalars['UUID']['input']>;
  includeEmptyPages?: InputMaybe<IncludeFuturePages>;
  includeExternalUrl?: InputMaybe<IncludeExternalUrl>;
  includeFuturePublishAt?: InputMaybe<IncludeFuturePublishAt>;
  /**
   * Flag to include future chapter updates in the results.
   *
   * Default: `IncludeFutureUpdates::Include` (1)
   */
  includeFutureUpdates?: InputMaybe<IncludeFutureUpdates>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MangaFeedSortOrder>;
  originalLanguage?: Array<Language>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  publishAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  translatedLanguage?: Array<Language>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  updatedAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
};

export type FollowsQueries = {
  __typename?: 'FollowsQueries';
  customLists: CustomListResults;
  groups: ScanlationGroupResults;
  isFollowingCustomList: Scalars['Boolean']['output'];
  isFollowingGroup: Scalars['Boolean']['output'];
  isFollowingManga: Scalars['Boolean']['output'];
  isFollowingUser: Scalars['Boolean']['output'];
  mangas: MangaResults;
  users: UserResults;
};


export type FollowsQueriesCustomListsArgs = {
  params?: UserFollowedListParams;
};


export type FollowsQueriesGroupsArgs = {
  params?: UserFollowedGroupsParams;
};


export type FollowsQueriesIsFollowingCustomListArgs = {
  id: Scalars['UUID']['input'];
};


export type FollowsQueriesIsFollowingGroupArgs = {
  id: Scalars['UUID']['input'];
};


export type FollowsQueriesIsFollowingMangaArgs = {
  id: Scalars['UUID']['input'];
};


export type FollowsQueriesIsFollowingUserArgs = {
  id: Scalars['UUID']['input'];
};


export type FollowsQueriesMangasArgs = {
  params?: UserFollowedMangaParams;
};


export type FollowsQueriesUsersArgs = {
  params?: UserFollowedUserParams;
};

export enum ForumThreadType {
  Chapter = 'CHAPTER',
  Group = 'GROUP',
  Manga = 'MANGA'
}

export type ForumsMutations = {
  __typename?: 'ForumsMutations';
  /** create a forum thread and return the generated forum id */
  createThread: Scalars['Int']['output'];
};


export type ForumsMutationsCreateThreadArgs = {
  params: CreateForumThreadParams;
};

export type GetAllChapterParams = {
  includeFails: Scalars['Boolean']['input'];
  onlyFails: Scalars['Boolean']['input'];
};

export type GetMangaDraftParams = {
  includes?: Array<ReferenceExpansionResource>;
  mangaId: Scalars['UUID']['input'];
};

export type GraphQlMangaAttributes = {
  __typename?: 'GraphQLMangaAttributes';
  altTitles: Array<Scalars['JSONObject']['output']>;
  availableTranslatedLanguages?: Maybe<Array<Language>>;
  contentRating?: Maybe<ContentRating>;
  createdAt: Scalars['MangaDexDateTime']['output'];
  description: Scalars['JSONObject']['output'];
  isLocked: Scalars['Boolean']['output'];
  lastChapter?: Maybe<Scalars['String']['output']>;
  lastVolume?: Maybe<Scalars['String']['output']>;
  latestUploadedChapter?: Maybe<Scalars['UUID']['output']>;
  links?: Maybe<MangaLinks>;
  originalLanguage: Language;
  publicationDemographic?: Maybe<Demographic>;
  state: MangaState;
  status: MangaStatus;
  tags: Array<Tag>;
  title: Scalars['JSONObject']['output'];
  updatedAt?: Maybe<Scalars['MangaDexDateTime']['output']>;
  version: Scalars['Int']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type GroupStatisticsQueries = {
  __typename?: 'GroupStatisticsQueries';
  get: Statistics;
  list: Array<Statistics>;
};


export type GroupStatisticsQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type GroupStatisticsQueriesListArgs = {
  ids: Array<Scalars['UUID']['input']>;
};

export type HomeQueries = {
  __typename?: 'HomeQueries';
  popularTitles: MangaResults;
  recentlyAdded: MangaResults;
  recentlyUploaded: ChapterResults;
  seasonal: CustomList;
  staffPicks: CustomList;
};


export type HomeQueriesPopularTitlesArgs = {
  params?: MangaListParams;
};


export type HomeQueriesRecentlyAddedArgs = {
  params?: MangaListParams;
};


export type HomeQueriesRecentlyUploadedArgs = {
  params?: ChapterListParams;
};

export enum IncludeExternalUrl {
  Exclude = 'EXCLUDE',
  Include = 'INCLUDE'
}

export enum IncludeFuturePages {
  Exclude = 'EXCLUDE',
  Include = 'INCLUDE'
}

export enum IncludeFuturePublishAt {
  Exclude = 'EXCLUDE',
  Include = 'INCLUDE'
}

export enum IncludeFutureUpdates {
  Exclude = 'EXCLUDE',
  Include = 'INCLUDE'
}

export type InfrastructureQueries = {
  __typename?: 'InfrastructureQueries';
  ping: Scalars['Boolean']['output'];
};

/** Languages supported by MangaDex. */
export enum Language {
  Albanian = 'ALBANIAN',
  Arabic = 'ARABIC',
  Azerbaijani = 'AZERBAIJANI',
  Bengali = 'BENGALI',
  Bulgarian = 'BULGARIAN',
  Burmese = 'BURMESE',
  Catalan = 'CATALAN',
  ChineseRomanized = 'CHINESE_ROMANIZED',
  ChineseSimplified = 'CHINESE_SIMPLIFIED',
  ChineseTraditional = 'CHINESE_TRADITIONAL',
  Croatian = 'CROATIAN',
  Czech = 'CZECH',
  Danish = 'DANISH',
  Dutch = 'DUTCH',
  English = 'ENGLISH',
  Esperanto = 'ESPERANTO',
  Estonian = 'ESTONIAN',
  Filipino = 'FILIPINO',
  Finnish = 'FINNISH',
  French = 'FRENCH',
  Georgian = 'GEORGIAN',
  German = 'GERMAN',
  Greek = 'GREEK',
  Hebrew = 'HEBREW',
  Hindi = 'HINDI',
  Hungarian = 'HUNGARIAN',
  Indonesian = 'INDONESIAN',
  Italian = 'ITALIAN',
  Japanese = 'JAPANESE',
  JapaneseRomanized = 'JAPANESE_ROMANIZED',
  Jp = 'JP',
  Kazakh = 'KAZAKH',
  Korean = 'KOREAN',
  KoreanRomanized = 'KOREAN_ROMANIZED',
  Latin = 'LATIN',
  Lithuanian = 'LITHUANIAN',
  Malagasy = 'MALAGASY',
  Malay = 'MALAY',
  Mongolian = 'MONGOLIAN',
  Nepali = 'NEPALI',
  NiloSaharan = 'NILO_SAHARAN',
  Norwegian = 'NORWEGIAN',
  Persian = 'PERSIAN',
  Polish = 'POLISH',
  PortugueseBrazilian = 'PORTUGUESE_BRAZILIAN',
  PortuguesePortugal = 'PORTUGUESE_PORTUGAL',
  Romanian = 'ROMANIAN',
  Romansh = 'ROMANSH',
  Russian = 'RUSSIAN',
  SerboCroatian = 'SERBO_CROATIAN',
  Slovak = 'SLOVAK',
  SpanishCastilian = 'SPANISH_CASTILIAN',
  SpanishLatinAmerican = 'SPANISH_LATIN_AMERICAN',
  Swedish = 'SWEDISH',
  Tamil = 'TAMIL',
  Telugu = 'TELUGU',
  Thai = 'THAI',
  Turkish = 'TURKISH',
  Ukrainian = 'UKRAINIAN',
  Unknown = 'UNKNOWN',
  Vietnamese = 'VIETNAMESE'
}

export type LegacyIdMapping = {
  __typename?: 'LegacyIdMapping';
  attributes: LegacyMappingIdAttributes;
  id: Scalars['UUID']['output'];
};

export type LegacyIdMappingParams = {
  ids: Array<Scalars['Int']['input']>;
  mapType: LegacyMappingType;
};

export type LegacyIdMappingResults = {
  __typename?: 'LegacyIdMappingResults';
  data: Array<LegacyIdMapping>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LegacyMappingIdAttributes = {
  __typename?: 'LegacyMappingIdAttributes';
  legacyId: Scalars['Int']['output'];
  newId: Scalars['UUID']['output'];
  type: LegacyMappingType;
};

/** Mapping types to get the new UUIDs from the legacy, numerical, IDs. */
export enum LegacyMappingType {
  Chapter = 'CHAPTER',
  Group = 'GROUP',
  Manga = 'MANGA',
  Tag = 'TAG'
}

export type LegacyQueries = {
  __typename?: 'LegacyQueries';
  idMapping: LegacyIdMappingResults;
};


export type LegacyQueriesIdMappingArgs = {
  params: LegacyIdMappingParams;
};

export type ListReasonsByCategory = {
  category: ReportCategory;
};

export type ListReportParams = {
  category?: InputMaybe<ReportCategory>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  objectId?: InputMaybe<Scalars['UUID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ReportSortOrder>;
  reasonId?: InputMaybe<Scalars['UUID']['input']>;
  status?: InputMaybe<ReportStatus>;
};

export type MangaAggregate = {
  __typename?: 'MangaAggregate';
  ids: Array<Scalars['UUID']['output']>;
  volumes: Array<VolumeAggregate>;
};

export type MangaAggregateParam = {
  groups?: Array<Scalars['UUID']['input']>;
  mangaId: Scalars['UUID']['input'];
  translatedLanguage?: Array<Language>;
};

export type MangaAggregateQueries = {
  __typename?: 'MangaAggregateQueries';
  chunked: Array<MangaAggregate>;
  default: MangaAggregate;
};


export type MangaAggregateQueriesChunkedArgs = {
  chunkSize: Scalars['Int']['input'];
  isReversed?: Scalars['Boolean']['input'];
};


export type MangaAggregateQueriesDefaultArgs = {
  isReversed?: Scalars['Boolean']['input'];
};

export type MangaChapterGroup = {
  __typename?: 'MangaChapterGroup';
  data: Array<MangaChapterItem>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MangaChapterItem = {
  __typename?: 'MangaChapterItem';
  chapters: Array<Chapter>;
  manga: MangaObject;
};

export type MangaCreateRelationParam = {
  mangaId: Scalars['UUID']['input'];
  relation: MangaRelation;
  targetManga: Scalars['UUID']['input'];
};

export type MangaDraftsParams = {
  includes?: Array<ReferenceExpansionResource>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** >= 0 */
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MangaDraftsSortOrder>;
  state?: InputMaybe<MangaState>;
};

export type MangaDraftsSortOrder =
  { createdAt: OrderDirection; title?: never; updatedAt?: never; year?: never; }
  |  { createdAt?: never; title: OrderDirection; updatedAt?: never; year?: never; }
  |  { createdAt?: never; title?: never; updatedAt: OrderDirection; year?: never; }
  |  { createdAt?: never; title?: never; updatedAt?: never; year: OrderDirection; };

export type MangaFeedParams = {
  contentRating?: Array<ContentRating>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  createdAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  /** Groups to exclude from the results. */
  excludedGroups?: Array<Scalars['UUID']['input']>;
  excludedOriginalLanguage?: Array<Language>;
  /** Uploaders to exclude from the results. */
  excludedUploaders?: Array<Scalars['UUID']['input']>;
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
  limit?: InputMaybe<Scalars['Int']['input']>;
  mangaId: Scalars['UUID']['input'];
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MangaFeedSortOrder>;
  originalLanguage?: Array<Language>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  publishAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  translatedLanguage?: Array<Language>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  updatedAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
};

export type MangaFeedSortOrder =
  { chapter: OrderDirection; createdAt?: never; publishAt?: never; readableAt?: never; updatedAt?: never; volume?: never; }
  |  { chapter?: never; createdAt: OrderDirection; publishAt?: never; readableAt?: never; updatedAt?: never; volume?: never; }
  |  { chapter?: never; createdAt?: never; publishAt: OrderDirection; readableAt?: never; updatedAt?: never; volume?: never; }
  |  { chapter?: never; createdAt?: never; publishAt?: never; readableAt: OrderDirection; updatedAt?: never; volume?: never; }
  |  { chapter?: never; createdAt?: never; publishAt?: never; readableAt?: never; updatedAt: OrderDirection; volume?: never; }
  |  { chapter?: never; createdAt?: never; publishAt?: never; readableAt?: never; updatedAt?: never; volume: OrderDirection; };

export type MangaLinks = {
  __typename?: 'MangaLinks';
  amazon?: Maybe<Scalars['Url']['output']>;
  anilist?: Maybe<Scalars['Url']['output']>;
  animePlanet?: Maybe<Scalars['Url']['output']>;
  bookWalker?: Maybe<Scalars['Url']['output']>;
  cdJapan?: Maybe<Scalars['Url']['output']>;
  ebookJapan?: Maybe<Scalars['Url']['output']>;
  englishTranslation?: Maybe<Scalars['Url']['output']>;
  hasNoLinks: Scalars['Boolean']['output'];
  kitsu?: Maybe<Scalars['Url']['output']>;
  mangaUpdates?: Maybe<Scalars['Url']['output']>;
  myAnimeList?: Maybe<Scalars['Url']['output']>;
  novelUpdates?: Maybe<Scalars['Url']['output']>;
  raw?: Maybe<Scalars['Url']['output']>;
};

export type MangaListParams = {
  artists?: Array<Scalars['UUID']['input']>;
  authorOrArtist?: InputMaybe<Scalars['UUID']['input']>;
  authors?: Array<Scalars['UUID']['input']>;
  /** A list of languages that the manga is translated into. */
  availableTranslatedLanguage?: Array<Language>;
  contentRating?: Array<ContentRating>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  createdAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  /** A list of original languages to exclude. */
  excludedOriginalLanguage?: Array<Language>;
  excludedTags?: Array<Scalars['UUID']['input']>;
  excludedTagsMode?: InputMaybe<TagSearchMode>;
  /** Scanlation group ID. */
  group?: InputMaybe<Scalars['UUID']['input']>;
  hasAvailableChapters?: InputMaybe<Scalars['Boolean']['input']>;
  includedTags?: Array<Scalars['UUID']['input']>;
  includedTagsMode?: InputMaybe<TagSearchMode>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  mangaIds?: Array<Scalars['UUID']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<MangaSortOrder>;
  /** Languages the manga results are originally published in. */
  originalLanguage?: Array<Language>;
  publicationDemographic?: Array<Demographic>;
  status?: Array<MangaStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  /** DateTime string with following format: `YYYY-MM-DDTHH:MM:SS`. */
  updatedAtSince?: InputMaybe<Scalars['MangaDexDateTime']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type MangaMutations = {
  __typename?: 'MangaMutations';
  create: MangaObject;
  createRelation: Array<MangaRelated>;
  delete: Scalars['Boolean']['output'];
  deleteRelation: Scalars['Boolean']['output'];
  download: DownloadState;
  edit: MangaObject;
  follow: Scalars['Boolean']['output'];
  remove: Scalars['Boolean']['output'];
  submitDraft: MangaObject;
  unfollow: Scalars['Boolean']['output'];
  updateReadingStatus: Scalars['Boolean']['output'];
};


export type MangaMutationsCreateArgs = {
  params: CreateMangaParam;
};


export type MangaMutationsCreateRelationArgs = {
  mangaListParams?: MangaListParams;
  params: MangaCreateRelationParam;
};


export type MangaMutationsDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type MangaMutationsDeleteRelationArgs = {
  id: Scalars['UUID']['input'];
  targetManga: Scalars['UUID']['input'];
};


export type MangaMutationsDownloadArgs = {
  id: Scalars['UUID']['input'];
};


export type MangaMutationsEditArgs = {
  params: UpdateMangaParam;
};


export type MangaMutationsFollowArgs = {
  id: Scalars['UUID']['input'];
};


export type MangaMutationsRemoveArgs = {
  id: Scalars['UUID']['input'];
};


export type MangaMutationsSubmitDraftArgs = {
  params: SubmitMangaDraftParams;
};


export type MangaMutationsUnfollowArgs = {
  id: Scalars['UUID']['input'];
};


export type MangaMutationsUpdateReadingStatusArgs = {
  id: Scalars['UUID']['input'];
  status?: InputMaybe<ReadingStatus>;
};

export type MangaObject = {
  __typename?: 'MangaObject';
  attributes: GraphQlMangaAttributes;
  id: Scalars['UUID']['output'];
  relationships: MangaRelationships;
};

export type MangaQueries = {
  __typename?: 'MangaQueries';
  aggregate: MangaAggregateQueries;
  feed: ChapterResults;
  get: MangaObject;
  getDraft: MangaObject;
  getDrafts: MangaResults;
  getMangaStatus: Array<MangaReadingStatusItem>;
  isDownloaded: DownloadState;
  list: MangaResults;
  listOffline: MangaResults;
  random: MangaObject;
  readingStatus?: Maybe<ReadingStatus>;
  relationList: Array<MangaRelated>;
};


export type MangaQueriesAggregateArgs = {
  params: MangaAggregateParam;
};


export type MangaQueriesFeedArgs = {
  params: MangaFeedParams;
};


export type MangaQueriesGetArgs = {
  id: Scalars['UUID']['input'];
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
  id: Scalars['UUID']['input'];
};


export type MangaQueriesListArgs = {
  params?: MangaListParams;
};


export type MangaQueriesListOfflineArgs = {
  params?: MangaListParams;
};


export type MangaQueriesRandomArgs = {
  params?: MangaRandomParams;
};


export type MangaQueriesReadingStatusArgs = {
  id: Scalars['UUID']['input'];
};


export type MangaQueriesRelationListArgs = {
  listParams?: MangaListParams;
  params: MangaRelationParam;
};

export type MangaRandomParams = {
  contentRating?: Array<ContentRating>;
  excludedTags?: Array<Scalars['UUID']['input']>;
  excludedTagsMode?: InputMaybe<TagSearchMode>;
  includedTags?: Array<Scalars['UUID']['input']>;
  includedTagsMode?: InputMaybe<TagSearchMode>;
  includes?: Array<ReferenceExpansionResource>;
};

export type MangaRating = {
  __typename?: 'MangaRating';
  average?: Maybe<Scalars['Float']['output']>;
  bayesian?: Maybe<Scalars['Float']['output']>;
  distrubution: MangaRatingDistribution;
};

export type MangaRatingDistribution = {
  __typename?: 'MangaRatingDistribution';
  r1: Scalars['Int']['output'];
  r2: Scalars['Int']['output'];
  r3: Scalars['Int']['output'];
  r4: Scalars['Int']['output'];
  r5: Scalars['Int']['output'];
  r6: Scalars['Int']['output'];
  r7: Scalars['Int']['output'];
  r8: Scalars['Int']['output'];
  r9: Scalars['Int']['output'];
  r10: Scalars['Int']['output'];
};

export type MangaReadMarkerGroupedItems = {
  __typename?: 'MangaReadMarkerGroupedItems';
  chapters: Array<Scalars['UUID']['output']>;
  mangaId: Scalars['UUID']['output'];
};

export type MangaReadingStatusItem = {
  __typename?: 'MangaReadingStatusItem';
  id: Scalars['UUID']['output'];
  status: ReadingStatus;
};

export type MangaRelated = {
  __typename?: 'MangaRelated';
  attributes: GraphQlMangaAttributes;
  id: Scalars['UUID']['output'];
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
  AdaptedFrom = 'ADAPTED_FROM',
  /** An alternative take of the story in this manga. */
  AlternateStory = 'ALTERNATE_STORY',
  /** A different version of this manga with no other specific distinction. */
  AlternateVersion = 'ALTERNATE_VERSION',
  /** The original work this self-published derivative manga is based on. */
  BasedOn = 'BASED_ON',
  /** A colored variant of this manga. */
  Colored = 'COLORED',
  /** A self-published derivative work based on this manga. */
  Doujinshi = 'DOUJINSHI',
  /** The original narrative this manga is based on. */
  MainStory = 'MAIN_STORY',
  /** A monochrome variant of this manga. */
  Monochrome = 'MONOCHROME',
  /** The previous entry in the same series. */
  Prequel = 'PREQUEL',
  /** The original version of this manga before its official serialization. */
  Preserialization = 'PRESERIALIZATION',
  /** A manga based on the same intellectual property as this manga. */
  SameFranchise = 'SAME_FRANCHISE',
  /** The next entry in the same series. */
  Sequel = 'SEQUEL',
  /** The official serialization of this manga. */
  Serialization = 'SERIALIZATION',
  /** A manga taking place in the same fictional world as this manga. */
  SharedUniverse = 'SHARED_UNIVERSE',
  /** A side work contemporaneous with the narrative of this manga. */
  SideStory = 'SIDE_STORY',
  /** An official derivative work based on this manga. */
  SpinOff = 'SPIN_OFF'
}

export type MangaRelationParam = {
  includes?: Array<ReferenceExpansionResource>;
  mangaId: Scalars['UUID']['input'];
};

export type MangaRelationships = {
  __typename?: 'MangaRelationships';
  artists: Array<Author>;
  authorArtists: Array<Author>;
  authors: Array<Author>;
  coverArt: Cover;
  creator?: Maybe<User>;
  manga: Array<MangaRelated>;
};

export type MangaResults = {
  __typename?: 'MangaResults';
  data: Array<MangaObject>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MangaSortOrder =
  { createdAt: OrderDirection; followedCount?: never; latestUploadedChapter?: never; relevance?: never; title?: never; updatedAt?: never; year?: never; }
  |  { createdAt?: never; followedCount: OrderDirection; latestUploadedChapter?: never; relevance?: never; title?: never; updatedAt?: never; year?: never; }
  |  { createdAt?: never; followedCount?: never; latestUploadedChapter: OrderDirection; relevance?: never; title?: never; updatedAt?: never; year?: never; }
  |  { createdAt?: never; followedCount?: never; latestUploadedChapter?: never; relevance: OrderDirection; title?: never; updatedAt?: never; year?: never; }
  |  { createdAt?: never; followedCount?: never; latestUploadedChapter?: never; relevance?: never; title: OrderDirection; updatedAt?: never; year?: never; }
  |  { createdAt?: never; followedCount?: never; latestUploadedChapter?: never; relevance?: never; title?: never; updatedAt: OrderDirection; year?: never; }
  |  { createdAt?: never; followedCount?: never; latestUploadedChapter?: never; relevance?: never; title?: never; updatedAt?: never; year: OrderDirection; };

/**
 * Manga state for approval.
 *
 * The purpose of these are to discourage troll entries by requiring staff approval.
 */
export enum MangaState {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export type MangaStatistics = {
  __typename?: 'MangaStatistics';
  comments?: Maybe<StatisticsComments>;
  followCount: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  rating: MangaRating;
};

export type MangaStatisticsAttributes = {
  __typename?: 'MangaStatisticsAttributes';
  comments?: Maybe<StatisticsComments>;
  rating: MangaRating;
};

export type MangaStatisticsQueries = {
  __typename?: 'MangaStatisticsQueries';
  get: MangaStatistics;
  list: Array<MangaStatistics>;
};


export type MangaStatisticsQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type MangaStatisticsQueriesListArgs = {
  ids: Array<Scalars['UUID']['input']>;
};

export enum MangaStatus {
  /** Manga has been cancelled. */
  Cancelled = 'CANCELLED',
  /** Manga is completed. */
  Completed = 'COMPLETED',
  /** Manga is paused from publishing new chapters. */
  Hiatus = 'HIATUS',
  /** Manga is still going on. */
  Ongoing = 'ONGOING'
}

export type MarkChapterBatchParam = {
  chapterIdsRead?: Array<Scalars['UUID']['input']>;
  chapterIdsUnread?: Array<Scalars['UUID']['input']>;
  mangaId: Scalars['UUID']['input'];
  updateHistory?: Scalars['Boolean']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  apiClient: ApiClientMutation;
  author: AuthorMutations;
  captcha: CaptchaMutations;
  chapter: ChapterMutations;
  customList: CustomListMutations;
  forums: ForumsMutations;
  manga: MangaMutations;
  oauth: OauthMutations;
  offlineAppState: OfflineAppStateMutations;
  rating: RatingMutations;
  readMarker: ReadMarkerMutations;
  report: ReportMutations;
  scanlationGroup: ScanlationGroupMutation;
  upload: UploadMutations;
  user: UserMutations;
};

export type OauthMutations = {
  __typename?: 'OauthMutations';
  clearClientInfo: Scalars['Boolean']['output'];
  login: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
  refresh: Scalars['Boolean']['output'];
  setClientInfo: Scalars['Boolean']['output'];
};


export type OauthMutationsLoginArgs = {
  password: Scalars['Password']['input'];
  username: Scalars['Username']['input'];
};


export type OauthMutationsSetClientInfoArgs = {
  clientId: Scalars['String']['input'];
  clientSecret: Scalars['String']['input'];
};

export type OauthQueries = {
  __typename?: 'OauthQueries';
  getClientInfo?: Maybe<ClientInfo>;
};

export type OfflineAppStateMutations = {
  __typename?: 'OfflineAppStateMutations';
  mountOfflineAppState: Scalars['Boolean']['output'];
  unmountOfflineAppState: Scalars['Boolean']['output'];
};

export type OfflineAppStateQueries = {
  __typename?: 'OfflineAppStateQueries';
  isMounted: Scalars['Boolean']['output'];
};

/** "Order by" directions for manga results. */
export enum OrderDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type Query = {
  __typename?: 'Query';
  apiClient: ApiClientQueries;
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
  manga: MangaQueries;
  oauth: OauthQueries;
  offlineAppState: OfflineAppStateQueries;
  rating: RatingQueries;
  readMarker: ReadMarkerQueries;
  report: ReportQueries;
  statistics: StatisticsQueries;
  tag: TagQueries;
  upload: UploadQueries;
  user: UserQueries;
  utils: UtilsQuery;
};

export type RatingItem = {
  __typename?: 'RatingItem';
  createdAt: Scalars['MangaDexDateTime']['output'];
  id: Scalars['UUID']['output'];
  rating: Scalars['Int']['output'];
};

export type RatingItemAttributes = {
  __typename?: 'RatingItemAttributes';
  createdAt: Scalars['MangaDexDateTime']['output'];
  rating: Scalars['Int']['output'];
};

export type RatingMutations = {
  __typename?: 'RatingMutations';
  createUpdate: Scalars['Boolean']['output'];
  delete: Scalars['Boolean']['output'];
};


export type RatingMutationsCreateUpdateArgs = {
  params: CreateUpdateRating;
};


export type RatingMutationsDeleteArgs = {
  id: Scalars['UUID']['input'];
};

export type RatingQueries = {
  __typename?: 'RatingQueries';
  lists: Array<RatingItem>;
};


export type RatingQueriesListsArgs = {
  mangaIds: Array<Scalars['UUID']['input']>;
};

export type ReadMarkerMutations = {
  __typename?: 'ReadMarkerMutations';
  mangaReadMarkersBatch: Scalars['Boolean']['output'];
};


export type ReadMarkerMutationsMangaReadMarkersBatchArgs = {
  params: MarkChapterBatchParam;
};

export type ReadMarkerQueries = {
  __typename?: 'ReadMarkerQueries';
  mangaReadMarkers: Array<Scalars['UUID']['output']>;
  mangaReadMarkersByMangaId: Array<Scalars['UUID']['output']>;
  mangaReadMarkersGrouped: Array<MangaReadMarkerGroupedItems>;
  userHistory: Array<UserHistoryEntry>;
};


export type ReadMarkerQueriesMangaReadMarkersArgs = {
  mangaIds: Array<Scalars['UUID']['input']>;
};


export type ReadMarkerQueriesMangaReadMarkersByMangaIdArgs = {
  mangaId: Scalars['UUID']['input'];
};


export type ReadMarkerQueriesMangaReadMarkersGroupedArgs = {
  mangaIds: Array<Scalars['UUID']['input']>;
};

export enum ReadingMode {
  DoublePage = 'DOUBLE_PAGE',
  LongStrip = 'LONG_STRIP',
  SinglePage = 'SINGLE_PAGE',
  WideStrip = 'WIDE_STRIP'
}

export type ReadingState = {
  __typename?: 'ReadingState';
  page?: Maybe<Scalars['Int']['output']>;
  state: ReadingStateEnum;
};

export enum ReadingStateEnum {
  Current = 'CURRENT',
  Next = 'NEXT',
  Previous = 'PREVIOUS'
}

export enum ReadingStatus {
  Completed = 'COMPLETED',
  Dropped = 'DROPPED',
  OnHold = 'ON_HOLD',
  PlanToRead = 'PLAN_TO_READ',
  Reading = 'READING',
  ReReading = 'RE_READING'
}

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
  Artist = 'ARTIST',
  /** Author resource. */
  Author = 'AUTHOR',
  /** Chapter resource. */
  Chapter = 'CHAPTER',
  /**
   * A Cover Art for a manga.
   *
   * On manga resources, only one cover art resource relation is returned,
   * marking the primary cover if there are more than one. By default, this will be the latest
   * volume's cover art. To see all the covers for a given manga, use the cover search endpoint.
   */
  CoverArt = 'COVER_ART',
  /** The user that created the resource */
  Creator = 'CREATOR',
  /** CustomList resource. */
  CustomList = 'CUSTOM_LIST',
  /** Leader of a group */
  Leader = 'LEADER',
  /** Manga resource. */
  Manga = 'MANGA',
  /** Member of a group */
  Member = 'MEMBER',
  /** Report reason */
  Reason = 'REASON',
  /** ScanlationGroup resource. */
  ScanlationGroup = 'SCANLATION_GROUP',
  /** Tag resource. */
  Tag = 'TAG',
  /** A Mangadex Forums Thread, */
  Thread = 'THREAD',
  /** User resource. */
  User = 'USER'
}

export type ReportAttributes = {
  __typename?: 'ReportAttributes';
  createdAt: Scalars['MangaDexDateTime']['output'];
  details: Scalars['String']['output'];
  objectId: Scalars['String']['output'];
  status: ReportStatus;
};

/** Report reasons for submitting reports to the MangaDex staff. */
export enum ReportCategory {
  Author = 'AUTHOR',
  Chapter = 'CHAPTER',
  Manga = 'MANGA',
  ScanlationGroup = 'SCANLATION_GROUP',
  User = 'USER'
}

export type ReportMutations = {
  __typename?: 'ReportMutations';
  create: Scalars['Boolean']['output'];
};


export type ReportMutationsCreateArgs = {
  params: CreateReportParam;
};

export type ReportQueries = {
  __typename?: 'ReportQueries';
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
  __typename?: 'ReportReason';
  attributes: ReportReasonAttributes;
  id: Scalars['UUID']['output'];
};

export type ReportReasonAttributes = {
  __typename?: 'ReportReasonAttributes';
  category: ReportCategory;
  detailsRequired: Scalars['Boolean']['output'];
  reason: Scalars['JSONObject']['output'];
  version: Scalars['Int']['output'];
};

export type ReportReasonResults = {
  __typename?: 'ReportReasonResults';
  data: Array<ReportReason>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ReportRelationship = {
  __typename?: 'ReportRelationship';
  user: User;
};

export type ReportSortOrder =
  { createdAt: OrderDirection; };

/** Report reasons for submitting reports to the MangaDex staff. */
export enum ReportStatus {
  Accepted = 'ACCEPTED',
  Autoresolved = 'AUTORESOLVED',
  Refused = 'REFUSED',
  Waiting = 'WAITING'
}

export type ScanlationGroup = {
  __typename?: 'ScanlationGroup';
  attributes: ScanlationGroupAttributes;
  id: Scalars['UUID']['output'];
  relationships: ScanlationGroupRelationships;
};

export type ScanlationGroupAttributes = {
  __typename?: 'ScanlationGroupAttributes';
  altNames: Array<Scalars['JSONObject']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['MangaDexDateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discord?: Maybe<Scalars['String']['output']>;
  exLicensed?: Maybe<Scalars['Boolean']['output']>;
  focusedLanguages?: Maybe<Array<Language>>;
  ircChannel?: Maybe<Scalars['String']['output']>;
  ircServer?: Maybe<Scalars['String']['output']>;
  locked: Scalars['Boolean']['output'];
  mangaUpdates?: Maybe<Scalars['Url']['output']>;
  name: Scalars['String']['output'];
  official: Scalars['Boolean']['output'];
  publishDelay?: Maybe<Scalars['MangaDexDuration']['output']>;
  twitter?: Maybe<Scalars['Url']['output']>;
  updatedAt: Scalars['MangaDexDateTime']['output'];
  verified: Scalars['Boolean']['output'];
  version: Scalars['Int']['output'];
  website?: Maybe<Scalars['Url']['output']>;
};

export type ScanlationGroupMutation = {
  __typename?: 'ScanlationGroupMutation';
  create: ScanlationGroup;
  delete: Scalars['Boolean']['output'];
  edit: ScanlationGroup;
  follow: Scalars['Boolean']['output'];
  unfollow: Scalars['Boolean']['output'];
};


export type ScanlationGroupMutationCreateArgs = {
  params: CreateScalantionGroupParam;
};


export type ScanlationGroupMutationDeleteArgs = {
  id: Scalars['UUID']['input'];
};


export type ScanlationGroupMutationEditArgs = {
  params: EditScanlationGroupParam;
};


export type ScanlationGroupMutationFollowArgs = {
  id: Scalars['UUID']['input'];
};


export type ScanlationGroupMutationUnfollowArgs = {
  id: Scalars['UUID']['input'];
};

export type ScanlationGroupRelationships = {
  __typename?: 'ScanlationGroupRelationships';
  leader: User;
  members: Array<User>;
};

export type ScanlationGroupResults = {
  __typename?: 'ScanlationGroupResults';
  data: Array<ScanlationGroup>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Statistics = {
  __typename?: 'Statistics';
  comments?: Maybe<StatisticsComments>;
  id: Scalars['UUID']['output'];
};

export type StatisticsComments = {
  __typename?: 'StatisticsComments';
  repliesCount: Scalars['Int']['output'];
  threadId: Scalars['Int']['output'];
  threadUrl: Scalars['Url']['output'];
};

export type StatisticsQueries = {
  __typename?: 'StatisticsQueries';
  chapter: ChapterStatisticsQueries;
  group: GroupStatisticsQueries;
  manga: MangaStatisticsQueries;
};

export type SubmitMangaDraftParams = {
  mangaId: Scalars['UUID']['input'];
  version: Scalars['Int']['input'];
};

export type Subscriptions = {
  __typename?: 'Subscriptions';
  watchApiClient: ApiClientAttributes;
  watchAuthor: AuthorAttributes;
  watchChapter: ChapterAttributes;
  watchChapterLanguages: Array<Language>;
  watchCover: CoverAttributes;
  watchCustomList: CustomListAttributes;
  watchDownloadState: DownloadState;
  watchIsAppMounted: Scalars['Boolean']['output'];
  watchIsFollowingCustomList: Scalars['Boolean']['output'];
  watchIsFollowingGroup: Scalars['Boolean']['output'];
  watchIsFollowingManga: Scalars['Boolean']['output'];
  watchIsFollowingUser: Scalars['Boolean']['output'];
  watchIsLogged: Scalars['Boolean']['output'];
  watchManga: GraphQlMangaAttributes;
  watchMangaReadingState?: Maybe<ReadingStatus>;
  watchMangaStatistics: MangaStatisticsAttributes;
  watchPageDirection: Direction;
  watchRating: RatingItemAttributes;
  watchReadMarker: Scalars['Boolean']['output'];
  watchReadingMode: ReadingMode;
  watchReadingState: ReadingState;
  watchSidebarDirection: Direction;
  watchStatistics: StatisticsComments;
  watchTag: TagAttributes;
  watchUploadSession: UploadSessionAttributes;
  watchUploadSessionFile: UploadSessionFileAttributes;
  watchUser: UserAttributes;
  watchUserMe: UserAttributes;
};


export type SubscriptionsWatchApiClientArgs = {
  apiClientId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchAuthorArgs = {
  authorId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchChapterArgs = {
  chapterId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchChapterLanguagesArgs = {
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchCoverArgs = {
  coverId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchCustomListArgs = {
  customListId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchDownloadStateArgs = {
  objectId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchIsAppMountedArgs = {
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchIsFollowingCustomListArgs = {
  customListId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchIsFollowingGroupArgs = {
  groupId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchIsFollowingMangaArgs = {
  mangaId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchIsFollowingUserArgs = {
  subId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchIsLoggedArgs = {
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchMangaArgs = {
  mangaId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchMangaReadingStateArgs = {
  mangaId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchMangaStatisticsArgs = {
  mangaId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchPageDirectionArgs = {
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchRatingArgs = {
  mangaId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchReadMarkerArgs = {
  chapterId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchReadingModeArgs = {
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchReadingStateArgs = {
  chapterId: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchSidebarDirectionArgs = {
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchStatisticsArgs = {
  id: Scalars['UUID']['input'];
  subId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchTagArgs = {
  subId: Scalars['UUID']['input'];
  tagId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchUploadSessionArgs = {
  subId: Scalars['UUID']['input'];
  uploadSessionId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchUploadSessionFileArgs = {
  subId: Scalars['UUID']['input'];
  uploadSessionFileId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchUserArgs = {
  subId: Scalars['UUID']['input'];
  userId: Scalars['UUID']['input'];
};


export type SubscriptionsWatchUserMeArgs = {
  subId: Scalars['UUID']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  attributes: TagAttributes;
  id: Scalars['UUID']['output'];
};

export type TagAttributes = {
  __typename?: 'TagAttributes';
  description: Scalars['JSONObject']['output'];
  group: TagGroup;
  name: Scalars['JSONObject']['output'];
};

export enum TagGroup {
  Content = 'CONTENT',
  Format = 'FORMAT',
  Genre = 'GENRE',
  Theme = 'THEME'
}

export type TagQueries = {
  __typename?: 'TagQueries';
  list: TagResults;
  listGrouped: TagResultsGrouped;
};

export type TagResults = {
  __typename?: 'TagResults';
  data: Array<Tag>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type TagResultsGrouped = {
  __typename?: 'TagResultsGrouped';
  content: Array<Tag>;
  format: Array<Tag>;
  genre: Array<Tag>;
  theme: Array<Tag>;
};

/** Determines the behavior of tag interaction when including or excluding tags in the results. */
export enum TagSearchMode {
  And = 'AND',
  Or = 'OR'
}

export type UpdateMangaParam = {
  altTitles?: InputMaybe<Array<Scalars['JSONObject']['input']>>;
  artists?: InputMaybe<Array<Scalars['UUID']['input']>>;
  authors?: InputMaybe<Array<Scalars['UUID']['input']>>;
  chapterNumbersResetOnNewVolume?: InputMaybe<Scalars['Boolean']['input']>;
  contentRating: ContentRating;
  description?: InputMaybe<Scalars['JSONObject']['input']>;
  lastChapter?: InputMaybe<Scalars['String']['input']>;
  lastVolume?: InputMaybe<Scalars['String']['input']>;
  links?: InputMaybe<Scalars['JSONObject']['input']>;
  mangaId: Scalars['UUID']['input'];
  originalLanguage: Language;
  /** Cover ID. */
  primaryCover?: InputMaybe<Scalars['UUID']['input']>;
  publicationDemographic?: InputMaybe<Demographic>;
  status: MangaStatus;
  tags?: InputMaybe<Array<Scalars['UUID']['input']>>;
  title: Scalars['JSONObject']['input'];
  /** >= 1 */
  version: Scalars['Int']['input'];
  /** Year the manga was released. */
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type UploadMutations = {
  __typename?: 'UploadMutations';
  abandonSession: Scalars['Boolean']['output'];
  beginEditSession: UploadSession;
  beginSession: UploadSession;
  commitSession: Chapter;
  deleteFileFromUploadSession: Scalars['Boolean']['output'];
  deleteFilesFromUploadSession: Scalars['Boolean']['output'];
  uploadImagesToSession: UploadSessionFile;
};


export type UploadMutationsAbandonSessionArgs = {
  sessionId: Scalars['UUID']['input'];
};


export type UploadMutationsBeginEditSessionArgs = {
  abandonIfExists?: Scalars['Boolean']['input'];
  params: BeginEditUploadSessionParam;
};


export type UploadMutationsBeginSessionArgs = {
  abandonIfExists?: Scalars['Boolean']['input'];
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
  path: Scalars['PathBuf']['input'];
  sessionId: Scalars['UUID']['input'];
};

export type UploadQueries = {
  __typename?: 'UploadQueries';
  getCurrent?: Maybe<UploadSession>;
};

export type UploadSession = {
  __typename?: 'UploadSession';
  attributes: UploadSessionAttributes;
  id: Scalars['UUID']['output'];
};

export type UploadSessionAttributes = {
  __typename?: 'UploadSessionAttributes';
  createdAt: Scalars['MangaDexDateTime']['output'];
  isCommitted: Scalars['Boolean']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isProcessed: Scalars['Boolean']['output'];
  updatedAt: Scalars['MangaDexDateTime']['output'];
  version: Scalars['Int']['output'];
};

export type UploadSessionFile = {
  __typename?: 'UploadSessionFile';
  attributes: UploadSessionFileAttributes;
  id: Scalars['UUID']['output'];
};

export type UploadSessionFileAttributes = {
  __typename?: 'UploadSessionFileAttributes';
  fileHash: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  mimeType: Scalars['String']['output'];
  originalFileName: Scalars['String']['output'];
  source: UploadSource;
  version: Scalars['Int']['output'];
};

/** Upload file source. */
export enum UploadSource {
  Local = 'LOCAL',
  Remote = 'REMOTE'
}

export type User = {
  __typename?: 'User';
  attributes: UserAttributes;
  id: Scalars['UUID']['output'];
};

export type UserAttributes = {
  __typename?: 'UserAttributes';
  roles: Array<UserRole>;
  username: Scalars['String']['output'];
  version: Scalars['Int']['output'];
};

export type UserCustomListParams = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['UUID']['input'];
};

export type UserFollowedGroupsParams = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UserFollowedListParams = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UserFollowedMangaParams = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UserFollowedUserParams = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type UserHistoryEntry = {
  __typename?: 'UserHistoryEntry';
  chapterId: Scalars['UUID']['output'];
  readDate: Scalars['MangaDexDateTime']['output'];
};

export type UserListParam = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<UserSortOrder>;
  userIds?: Array<Scalars['UUID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserMutations = {
  __typename?: 'UserMutations';
  follow: Scalars['Boolean']['output'];
  unfollow: Scalars['Boolean']['output'];
};


export type UserMutationsFollowArgs = {
  id: Scalars['UUID']['input'];
};


export type UserMutationsUnfollowArgs = {
  id: Scalars['UUID']['input'];
};

export type UserQueries = {
  __typename?: 'UserQueries';
  get: User;
  list: UserResults;
  me: User;
};


export type UserQueriesGetArgs = {
  id: Scalars['UUID']['input'];
};


export type UserQueriesListArgs = {
  params?: UserListParam;
};

export type UserReport = {
  __typename?: 'UserReport';
  attributes: ReportAttributes;
  id: Scalars['UUID']['output'];
  relationship: ReportRelationship;
};

export type UserReportResults = {
  __typename?: 'UserReportResults';
  data: Array<UserReport>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type UserResults = {
  __typename?: 'UserResults';
  data: Array<User>;
  limit: Scalars['Int']['output'];
  offset: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

/**
 * User roles that define what a user has permission to do.
 * More details at : https://api.mangadex.org/docs/static-data/#user-roles-enum
 */
export enum UserRole {
  /** MangaDex admins */
  RoleAdmin = 'ROLE_ADMIN',
  /** Banned */
  RoleBanned = 'ROLE_BANNED',
  /** Helpers contributing by filling in missing information (Description, External Links) on Manga pages on MangaDex */
  RoleContributor = 'ROLE_CONTRIBUTOR',
  /** Designer */
  RoleDesigner = 'ROLE_DESIGNER',
  /** MangaDex site developers */
  RoleDeveloper = 'ROLE_DEVELOPER',
  /** Moderates the forum */
  RoleForumModerator = 'ROLE_FORUM_MODERATOR',
  RoleGlobalModerator = 'ROLE_GLOBAL_MODERATOR',
  /** Leaders of active groups on MangaDex */
  RoleGroupLeader = 'ROLE_GROUP_LEADER',
  /** Member of a group */
  RoleGroupMember = 'ROLE_GROUP_MEMBER',
  /** Users viewing the site without being logged in */
  RoleGuest = 'ROLE_GUEST',
  /** Involved with the [MangaDex@Home](mailto:MangaDex@Home) project */
  RoleMdAtHome = 'ROLE_MD_AT_HOME',
  /** Member of a group */
  RoleMember = 'ROLE_MEMBER',
  /** Uploaded 500 or more chapters to MangaDex */
  RolePowerUploader = 'ROLE_POWER_UPLOADER',
  /** Manages social media */
  RolePublicRelations = 'ROLE_PUBLIC_RELATIONS',
  /** Staff */
  RoleStaff = 'ROLE_STAFF',
  /** Accounts that haven't had their email address verified yet */
  RoleUnverified = 'ROLE_UNVERIFIED',
  /** A normal account */
  RoleUser = 'ROLE_USER',
  /** Important people that in one way or another helped MangaDex */
  RoleVip = 'ROLE_VIP',
  Unknown = 'UNKNOWN'
}

export type UserSortOrder =
  { username: OrderDirection; };

export type UtilsQuery = {
  __typename?: 'UtilsQuery';
  favicon: Scalars['Bytes']['output'];
  languageToStr: Scalars['String']['output'];
  strToLanguage: Language;
};


export type UtilsQueryFaviconArgs = {
  url: Scalars['Url']['input'];
};


export type UtilsQueryLanguageToStrArgs = {
  language: Language;
};


export type UtilsQueryStrToLanguageArgs = {
  input: Scalars['String']['input'];
};

export type VolumeAggregate = {
  __typename?: 'VolumeAggregate';
  chapters: Array<ChapterAggregate>;
  count: Scalars['Int']['output'];
  ids: Array<Scalars['UUID']['output']>;
  volume: Scalars['String']['output'];
};

export type RecentlyAddedHomeQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentlyAddedHomeQuery = { __typename?: 'Query', home: { __typename?: 'HomeQueries', recentlyUploaded: { __typename?: 'ChapterResults', data: Array<{ __typename?: 'Chapter', id: any, attributes: { __typename?: 'ChapterAttributes', title?: string | null, pages: number, translatedLanguage: Language, readableAt?: any | null, chapter?: string | null, volume?: string | null }, relationships: { __typename?: 'ChapterRelationships', scanlationGroups: Array<{ __typename?: 'ScanlationGroup', id: any, attributes: { __typename?: 'ScanlationGroupAttributes', name: string } }>, user: { __typename?: 'User', id: any, attributes: { __typename?: 'UserAttributes', username: string, roles: Array<UserRole> } }, manga: { __typename?: 'MangaObject', id: any, attributes: { __typename?: 'GraphQLMangaAttributes', title: any }, relationships: { __typename?: 'MangaRelationships', coverArt: { __typename?: 'Cover', id: any, attributes: { __typename?: 'CoverAttributes', fileName: string } } } } } }> } } };

export type HomePopularTitleQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePopularTitleQuery = { __typename?: 'Query', home: { __typename?: 'HomeQueries', popularTitles: { __typename?: 'MangaResults', data: Array<{ __typename?: 'MangaObject', id: any, attributes: { __typename?: 'GraphQLMangaAttributes', title: any, contentRating?: ContentRating | null, description: any, tags: Array<{ __typename?: 'Tag', id: any, attributes: { __typename?: 'TagAttributes', name: any } }> }, relationships: { __typename?: 'MangaRelationships', authorArtists: Array<{ __typename?: 'Author', id: any, attributes: { __typename?: 'AuthorAttributes', name: string } }>, coverArt: { __typename?: 'Cover', id: any, attributes: { __typename?: 'CoverAttributes', fileName: string } } } }> } } };

export type IsChapterDownloadedQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type IsChapterDownloadedQuery = { __typename?: 'Query', chapter: { __typename?: 'ChapterQueries', isDownloaded: { __typename?: 'DownloadState', isDownloaded: boolean, hasFailed: boolean } } };

export type WatchChapterDownloadStateSubscriptionVariables = Exact<{
  id: Scalars['UUID']['input'];
  sub: Scalars['UUID']['input'];
}>;


export type WatchChapterDownloadStateSubscription = { __typename?: 'Subscriptions', watchDownloadState: { __typename?: 'DownloadState', hasFailed: boolean, isDownloaded: boolean } };

export type RecentlyAddedHomeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentlyAddedHomeQueryQuery = { __typename?: 'Query', home: { __typename?: 'HomeQueries', recentlyAdded: { __typename?: 'MangaResults', data: Array<{ __typename?: 'MangaObject', id: any, attributes: { __typename?: 'GraphQLMangaAttributes', title: any }, relationships: { __typename?: 'MangaRelationships', coverArt: { __typename?: 'Cover', id: any, attributes: { __typename?: 'CoverAttributes', fileName: string } } } }> } } };

export type SeasonalQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonalQuery = { __typename?: 'Query', home: { __typename?: 'HomeQueries', seasonal: { __typename?: 'CustomList', id: any, relationships: { __typename?: 'CustomListRelationships', titles: Array<{ __typename?: 'MangaObject', id: any, attributes: { __typename?: 'GraphQLMangaAttributes', title: any, altTitles: Array<any>, description: any }, relationships: { __typename?: 'MangaRelationships', coverArt: { __typename?: 'Cover', id: any, attributes: { __typename?: 'CoverAttributes', fileName: string } } } }> } } } };

export type StaffPicksQueryVariables = Exact<{ [key: string]: never; }>;


export type StaffPicksQuery = { __typename?: 'Query', home: { __typename?: 'HomeQueries', staffPicks: { __typename?: 'CustomList', id: any, relationships: { __typename?: 'CustomListRelationships', titles: Array<{ __typename?: 'MangaObject', id: any, attributes: { __typename?: 'GraphQLMangaAttributes', title: any, altTitles: Array<any>, state: MangaState, description: any, status: MangaStatus, availableTranslatedLanguages?: Array<Language> | null }, relationships: { __typename?: 'MangaRelationships', coverArt: { __typename?: 'Cover', id: any, attributes: { __typename?: 'CoverAttributes', fileName: string } } } }> } } } };

export type UserMeOnSidebarFooterQueryVariables = Exact<{ [key: string]: never; }>;


export type UserMeOnSidebarFooterQuery = { __typename?: 'Query', user: { __typename?: 'UserQueries', me: { __typename?: 'User', id: any, attributes: { __typename?: 'UserAttributes', username: string, roles: Array<UserRole> } } } };

export type ServerIconStateSubscriptionVariables = Exact<{
  sub_id: Scalars['UUID']['input'];
}>;


export type ServerIconStateSubscription = { __typename?: 'Subscriptions', watchIsAppMounted: boolean };

export type RtlSidebarSubSubscriptionVariables = Exact<{
  sub_id: Scalars['UUID']['input'];
}>;


export type RtlSidebarSubSubscription = { __typename?: 'Subscriptions', watchSidebarDirection: Direction };

export type UserMeSubscriptionVariables = Exact<{
  sub_id: Scalars['UUID']['input'];
}>;


export type UserMeSubscription = { __typename?: 'Subscriptions', watchUserMe: { __typename?: 'UserAttributes', username: string, roles: Array<UserRole> } };

export type IsLoggedSubscriptionVariables = Exact<{
  sub_id: Scalars['UUID']['input'];
}>;


export type IsLoggedSubscription = { __typename?: 'Subscriptions', watchIsLogged: boolean };

export type CoverImageQueryVariables = Exact<{
  cover_id: Scalars['UUID']['input'];
  manga_id: Scalars['UUID']['input'];
  filename: Scalars['String']['input'];
  mode: CoverImageQuality;
}>;


export type CoverImageQuery = { __typename?: 'Query', cover: { __typename?: 'CoverQueries', getImage: any } };

export type FaviconQueryVariables = Exact<{
  url: Scalars['Url']['input'];
}>;


export type FaviconQuery = { __typename?: 'Query', utils: { __typename?: 'UtilsQuery', favicon: any } };

export type GetLanguageFromStrQueryVariables = Exact<{
  lang: Scalars['String']['input'];
}>;


export type GetLanguageFromStrQuery = { __typename?: 'Query', utils: { __typename?: 'UtilsQuery', strToLanguage: Language } };

export type MountAppStateMutationVariables = Exact<{ [key: string]: never; }>;


export type MountAppStateMutation = { __typename?: 'Mutation', offlineAppState: { __typename?: 'OfflineAppStateMutations', mountOfflineAppState: boolean } };

export type UnmountAppStateMutationVariables = Exact<{ [key: string]: never; }>;


export type UnmountAppStateMutation = { __typename?: 'Mutation', offlineAppState: { __typename?: 'OfflineAppStateMutations', unmountOfflineAppState: boolean } };

export type GetMangaTestsQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetMangaTestsQuery = { __typename?: 'Query', manga: { __typename?: 'MangaQueries', get: { __typename?: 'MangaObject', id: any, attributes: { __typename?: 'GraphQLMangaAttributes', title: any, altTitles: Array<any>, state: MangaState, status: MangaStatus, description: any, availableTranslatedLanguages?: Array<Language> | null, year?: number | null, contentRating?: ContentRating | null, publicationDemographic?: Demographic | null, lastVolume?: string | null, lastChapter?: string | null, latestUploadedChapter?: any | null, originalLanguage: Language, links?: { __typename?: 'MangaLinks', hasNoLinks: boolean, amazon?: any | null, anilist?: any | null, animePlanet?: any | null, bookWalker?: any | null, cdJapan?: any | null, ebookJapan?: any | null, englishTranslation?: any | null, kitsu?: any | null, mangaUpdates?: any | null, myAnimeList?: any | null, novelUpdates?: any | null, raw?: any | null } | null, tags: Array<{ __typename?: 'Tag', id: any, attributes: { __typename?: 'TagAttributes', name: any, group: TagGroup } }> }, relationships: { __typename?: 'MangaRelationships', authorArtists: Array<{ __typename?: 'Author', id: any, attributes: { __typename?: 'AuthorAttributes', name: string } }>, authors: Array<{ __typename?: 'Author', id: any, attributes: { __typename?: 'AuthorAttributes', name: string } }>, artists: Array<{ __typename?: 'Author', id: any, attributes: { __typename?: 'AuthorAttributes', name: string } }>, coverArt: { __typename?: 'Cover', id: any, attributes: { __typename?: 'CoverAttributes', fileName: string, locale?: Language | null } }, manga: Array<{ __typename?: 'MangaRelated', id: any, related: MangaRelation }> } } } };

export type MangaStatisticsQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type MangaStatisticsQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsQueries', manga: { __typename?: 'MangaStatisticsQueries', get: { __typename?: 'MangaStatistics', followCount: number, comments?: { __typename?: 'StatisticsComments', threadUrl: any, repliesCount: number } | null, rating: { __typename?: 'MangaRating', bayesian?: number | null, distrubution: { __typename?: 'MangaRatingDistribution', r1: number, r2: number, r3: number, r4: number, r5: number, r6: number, r7: number, r8: number, r9: number, r10: number } } } } } };


export const RecentlyAddedHomeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recentlyAddedHome"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recentlyUploaded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"pages"}},{"kind":"Field","name":{"kind":"Name","value":"translatedLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"readableAt"}},{"kind":"Field","name":{"kind":"Name","value":"chapter"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scanlationGroups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"manga"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coverArt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RecentlyAddedHomeQuery, RecentlyAddedHomeQueryVariables>;
export const HomePopularTitleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"homePopularTitle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"popularTitles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contentRating"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorArtists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverArt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<HomePopularTitleQuery, HomePopularTitleQueryVariables>;
export const IsChapterDownloadedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"isChapterDownloaded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDownloaded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isDownloaded"}},{"kind":"Field","name":{"kind":"Name","value":"hasFailed"}}]}}]}}]}}]} as unknown as DocumentNode<IsChapterDownloadedQuery, IsChapterDownloadedQueryVariables>;
export const WatchChapterDownloadStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"watchChapterDownloadState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sub"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchDownloadState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"subId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sub"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasFailed"}},{"kind":"Field","name":{"kind":"Name","value":"isDownloaded"}}]}}]}}]} as unknown as DocumentNode<WatchChapterDownloadStateSubscription, WatchChapterDownloadStateSubscriptionVariables>;
export const RecentlyAddedHomeQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recentlyAddedHomeQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recentlyAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"15"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coverArt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RecentlyAddedHomeQueryQuery, RecentlyAddedHomeQueryQueryVariables>;
export const SeasonalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"seasonal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seasonal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"relationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"titles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"altTitles"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coverArt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeasonalQuery, SeasonalQueryVariables>;
export const StaffPicksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"staffPicks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"home"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"staffPicks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"relationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"titles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"altTitles"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"availableTranslatedLanguages"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coverArt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<StaffPicksQuery, StaffPicksQueryVariables>;
export const UserMeOnSidebarFooterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userMeOnSidebarFooter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserMeOnSidebarFooterQuery, UserMeOnSidebarFooterQueryVariables>;
export const ServerIconStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"serverIconState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sub_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchIsAppMounted"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sub_id"}}}]}]}}]} as unknown as DocumentNode<ServerIconStateSubscription, ServerIconStateSubscriptionVariables>;
export const RtlSidebarSubDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"rtlSidebarSub"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sub_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchSidebarDirection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sub_id"}}}]}]}}]} as unknown as DocumentNode<RtlSidebarSubSubscription, RtlSidebarSubSubscriptionVariables>;
export const UserMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"userMe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sub_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchUserMe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sub_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}}]} as unknown as DocumentNode<UserMeSubscription, UserMeSubscriptionVariables>;
export const IsLoggedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"isLogged"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sub_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"watchIsLogged"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sub_id"}}}]}]}}]} as unknown as DocumentNode<IsLoggedSubscription, IsLoggedSubscriptionVariables>;
export const CoverImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"coverImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cover_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"manga_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filename"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CoverImageQuality"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cover"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"coverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cover_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"mangaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"manga_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"filename"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filename"}}},{"kind":"Argument","name":{"kind":"Name","value":"mode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mode"}}}]}]}}]}}]} as unknown as DocumentNode<CoverImageQuery, CoverImageQueryVariables>;
export const FaviconDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"favicon"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Url"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"utils"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"favicon"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}]}]}}]}}]} as unknown as DocumentNode<FaviconQuery, FaviconQueryVariables>;
export const GetLanguageFromStrDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLanguageFromStr"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lang"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"utils"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"strToLanguage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lang"}}}]}]}}]}}]} as unknown as DocumentNode<GetLanguageFromStrQuery, GetLanguageFromStrQueryVariables>;
export const MountAppStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"mountAppState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offlineAppState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mountOfflineAppState"}}]}}]}}]} as unknown as DocumentNode<MountAppStateMutation, MountAppStateMutationVariables>;
export const UnmountAppStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unmountAppState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"offlineAppState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unmountOfflineAppState"}}]}}]}}]} as unknown as DocumentNode<UnmountAppStateMutation, UnmountAppStateMutationVariables>;
export const GetMangaTestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMangaTests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manga"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"altTitles"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"availableTranslatedLanguages"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"contentRating"}},{"kind":"Field","name":{"kind":"Name","value":"publicationDemographic"}},{"kind":"Field","name":{"kind":"Name","value":"lastVolume"}},{"kind":"Field","name":{"kind":"Name","value":"lastChapter"}},{"kind":"Field","name":{"kind":"Name","value":"latestUploadedChapter"}},{"kind":"Field","name":{"kind":"Name","value":"availableTranslatedLanguages"}},{"kind":"Field","name":{"kind":"Name","value":"originalLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNoLinks"}},{"kind":"Field","name":{"kind":"Name","value":"amazon"}},{"kind":"Field","name":{"kind":"Name","value":"anilist"}},{"kind":"Field","name":{"kind":"Name","value":"animePlanet"}},{"kind":"Field","name":{"kind":"Name","value":"bookWalker"}},{"kind":"Field","name":{"kind":"Name","value":"cdJapan"}},{"kind":"Field","name":{"kind":"Name","value":"ebookJapan"}},{"kind":"Field","name":{"kind":"Name","value":"englishTranslation"}},{"kind":"Field","name":{"kind":"Name","value":"kitsu"}},{"kind":"Field","name":{"kind":"Name","value":"mangaUpdates"}},{"kind":"Field","name":{"kind":"Name","value":"myAnimeList"}},{"kind":"Field","name":{"kind":"Name","value":"novelUpdates"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"group"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"relationships"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorArtists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"coverArt"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"manga"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"related"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMangaTestsQuery, GetMangaTestsQueryVariables>;
export const MangaStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"mangaStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"manga"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"get"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"threadUrl"}},{"kind":"Field","name":{"kind":"Name","value":"repliesCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followCount"}},{"kind":"Field","name":{"kind":"Name","value":"rating"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bayesian"}},{"kind":"Field","name":{"kind":"Name","value":"distrubution"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"r1"}},{"kind":"Field","name":{"kind":"Name","value":"r2"}},{"kind":"Field","name":{"kind":"Name","value":"r3"}},{"kind":"Field","name":{"kind":"Name","value":"r4"}},{"kind":"Field","name":{"kind":"Name","value":"r5"}},{"kind":"Field","name":{"kind":"Name","value":"r6"}},{"kind":"Field","name":{"kind":"Name","value":"r7"}},{"kind":"Field","name":{"kind":"Name","value":"r8"}},{"kind":"Field","name":{"kind":"Name","value":"r9"}},{"kind":"Field","name":{"kind":"Name","value":"r10"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<MangaStatisticsQuery, MangaStatisticsQueryVariables>;