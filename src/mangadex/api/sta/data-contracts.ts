/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** MangaRequest */
export interface MangaRequest {
    title?: LocalizedString;
    altTitles?: LocalizedString[];
    description?: LocalizedString;
    authors?: string[];
    artists?: string[];
    links?: Record<string, string>;
    /** @pattern ^[a-z]{2}(-[a-z]{2})?$ */
    originalLanguage?: string;
    lastVolume?: string | null;
    lastChapter?: string | null;
    publicationDemographic?: "shounen" | "shoujo" | "josei" | "seinen" | null;
    status?: "completed" | "ongoing" | "cancelled" | "hiatus";
    /**
     * Year of release
     * @min 1
     * @max 9999
     */
    year?: number | null;
    contentRating?: "safe" | "suggestive" | "erotica" | "pornographic";
    chapterNumbersResetOnNewVolume?: boolean;
    tags?: string[];
    /** @format uuid */
    primaryCover?: string | null;
    /** @min 1 */
    version?: number;
}

/** LocalizedString */
export type LocalizedString = Record<string, string>;

/** MangaResponse */
export interface MangaResponse {
    result: "ok" | "error";
    /** @default "entity" */
    response: string;
    data: Manga;
}

/** ChapterResponse */
export interface ChapterResponse {
    result: "ok" | "error";
    /** @default "entity" */
    response: string;
    data: Chapter;
}

/** Relationship */
export interface Relationship {
    /** @format uuid */
    id: string;
    type: string;
    /** Related Manga type, only present if you are on a Manga entity and a Manga relationship */
    related?:
    | "monochrome"
    | "main_story"
    | "adapted_from"
    | "based_on"
    | "prequel"
    | "side_story"
    | "doujinshi"
    | "same_franchise"
    | "shared_universe"
    | "sequel"
    | "spin_off"
    | "alternate_story"
    | "alternate_version"
    | "preserialization"
    | "colored"
    | "serialization";
    /** If Reference Expansion is applied, contains objects attributes */
    attributes?: object | null;
}

/** Chapter */
export interface Chapter {
    /** @format uuid */
    id: string;
    type: "chapter" | string;
    attributes: ChapterAttributes;
    relationships: Relationship[];
}

/** Manga */
export interface Manga {
    /** @format uuid */
    id: string;
    type: "manga";
    attributes: MangaAttributes;
    /** Related Manga type, only present if you are on a Manga entity and a Manga relationship */
    related?:
    | "monochrome"
    | "main_story"
    | "adapted_from"
    | "based_on"
    | "prequel"
    | "side_story"
    | "doujinshi"
    | "same_franchise"
    | "shared_universe"
    | "sequel"
    | "spin_off"
    | "alternate_story"
    | "alternate_version"
    | "preserialization"
    | "colored"
    | "serialization";
    relationships: Relationship[];
}

/** ErrorResponse */
export interface ErrorResponse {
    /** @default "error" */
    result: "error";
    errors?: Error[];
}

/** Error */
export interface Error {
    id?: string;
    status?: number;
    title?: string;
    detail?: string;
}

/** ChapterAttributes */
export interface ChapterAttributes {
    /** @maxLength 255 */
    title: string | null;
    volume: string | null;
    /** @maxLength 8 */
    chapter: string | null;
    /** Count of readable images for this chapter */
    pages: number;
    /** @pattern ^[a-z]{2}(-[a-z]{2})?$ */
    translatedLanguage: string;
    /** @format uuid */
    uploader?: string;
    /**
     * Denotes a chapter that links to an external source.
     * @maxLength 512
     * @pattern ^https?://
     */
    externalUrl: string | null;
    /** @min 1 */
    version: number;
    createdAt: string;
    updatedAt: string;
    publishAt: string;
    readableAt: string;
}

/** MangaAttributes */
export interface MangaAttributes {
    title: LocalizedString;
    altTitles: LocalizedString[];
    description: LocalizedString;
    isLocked: boolean;
    links: Record<string, string>;
    originalLanguage: string;
    lastVolume: string | null;
    lastChapter: string | null;
    publicationDemographic: "shounen" | "shoujo" | "josei" | "seinen" | null;
    status: "completed" | "ongoing" | "cancelled" | "hiatus";
    /** Year of release */
    year: number | null;
    contentRating: "safe" | "suggestive" | "erotica" | "pornographic";
    chapterNumbersResetOnNewVolume: boolean;
    availableTranslatedLanguages: any[];
    /** @format uuid */
    latestUploadedChapter: string;
    tags: Tag[];
    state: "draft" | "submitted" | "published" | "rejected";
    /** @min 1 */
    version: number;
    createdAt: string;
    updatedAt: string;
}

export type MangaCreate = MangaRequest;

export type MangaEdit = MangaRequest;

export type ChapterEdit = ChapterRequest;

/** Response */
export interface Response {
    result?: "ok" | "error";
}

/** Login */
export interface Login {
    /**
     * @minLength 1
     * @maxLength 64
     */
    username?: string;
    email?: string;
    /**
     * @minLength 8
     * @maxLength 1024
     */
    password: string;
}

/** LoginResponse */
export interface LoginResponse {
    result?: "ok" | "error";
    token?: {
        session?: string;
        refresh?: string;
    };
}

/** CheckResponse */
export interface CheckResponse {
    /** @default "ok" */
    result?: string;
    isAuthenticated?: boolean;
    roles?: string[];
    permissions?: string[];
}

/** LogoutResponse */
export interface LogoutResponse {
    result?: "ok" | "error";
}

/** RefreshToken */
export interface RefreshToken {
    /** @minLength 1 */
    token: string;
}

/** RefreshResponse */
export interface RefreshResponse {
    result: "ok" | "error";
    token?: {
        session?: string;
        refresh?: string;
    };
    message?: string;
}

/** AccountActivateResponse */
export interface AccountActivateResponse {
    result?: "ok";
}

/** CreateAccount */
export interface CreateAccount {
    /**
     * @minLength 1
     * @maxLength 64
     */
    username: string;
    /**
     * @minLength 8
     * @maxLength 1024
     */
    password: string;
    /** @format email */
    email: string;
}

/** ScanlationGroupResponse */
export interface ScanlationGroupResponse {
    result: "ok";
    /** @default "entity" */
    response: string;
    data: ScanlationGroup;
}

/** ScanlationGroup */
export interface ScanlationGroup {
    /** @format uuid */
    id: string;
    type: "scanlation_group";
    attributes: ScanlationGroupAttributes;
    relationships: Relationship[];
}

/** ScanlationGroupAttributes */
export interface ScanlationGroupAttributes {
    name: string;
    altNames: LocalizedString[];
    website: string | null;
    ircServer: string | null;
    ircChannel: string | null;
    discord: string | null;
    contactEmail: string | null;
    description: string | null;
    /**
     * @format uri
     * @pattern ^https?://
     */
    twitter: string | null;
    /**
     * @format uri
     * @maxLength 128
     * @pattern ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
     */
    mangaUpdates: string | null;
    focusedLanguage: string[] | null;
    locked: boolean;
    official: boolean;
    verified : boolean;
    inactive: boolean;
    exLicensed: boolean;
    /**
     * Should respected ISO 8601 duration specification: https://en.wikipedia.org/wiki/ISO_8601#Durations
     * @pattern ^(P([1-9]|[1-9][0-9])D)?(P?([1-9])W)?(P?T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$
     * @example "P4D"
     */
    publishDelay: string;
    /** @min 1 */
    version: number;
    createdAt: string;
    updatedAt: string;
}

/** User */
export interface User {
    /** @format uuid */
    id: string;
    type: "user";
    attributes: UserAttributes;
    relationships: Relationship[];
}

/** UserAttributes */
export interface UserAttributes {
    username: string;
    roles: string[];
    /** @min 1 */
    version: number;
}

/** CreateScanlationGroup */
export interface CreateScanlationGroup {
    name: string;
    website?: string | null;
    ircServer?: string | null;
    ircChannel?: string | null;
    discord?: string | null;
    contactEmail?: string | null;
    description?: string | null;
    /**
     * @format uri
     * @pattern ^https?://twitter\.com
     */
    twitter?: string | null;
    /**
     * @maxLength 128
     * @pattern ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
     */
    mangaUpdates?: string | null;
    inactive?: boolean;
    /** @pattern ^P(([1-9]|[1-9][0-9])D)?(([1-9])W)?(T(([1-9]|1[0-9]|2[0-4])H)?(([1-9]|[1-5][0-9]|60)M)?(([1-9]|[1-5][0-9]|60)S)?)?$ */
    publishDelay?: string | null;
}

/** ScanlationGroupEdit */
export interface ScanlationGroupEdit {
    name?: string;
    /** @format uuid */
    leader?: string;
    members?: string[];
    website?: string | null;
    ircServer?: string | null;
    ircChannel?: string | null;
    discord?: string | null;
    contactEmail?: string | null;
    description?: string | null;
    /**
     * @format uri
     * @pattern ^https?://
     */
    twitter?: string | null;
    /**
     * @format uri
     * @maxLength 128
     * @pattern ^https:\/\/www\.mangaupdates\.com\/(group|publisher)(s\.html\?id=\d+|\/[\w-]+\/?([\w-]+)?(\/)?)$
     */
    mangaUpdates?: string | null;
    focusedLanguages?: string[] | null;
    inactive?: boolean;
    locked?: boolean;
    publishDelay?: string;
    /** @min 1 */
    version: number;
}

/** CustomListCreate */
export interface CustomListCreate {
    name: string;
    visibility?: "public" | "private";
    manga?: string[];
    /** @min 1 */
    version?: number;
}

/** CustomListEdit */
export interface CustomListEdit {
    name?: string;
    visibility?: "public" | "private";
    manga?: string[];
    /** @min 1 */
    version: number;
}

/** CustomListResponse */
export interface CustomListResponse {
    result: "ok" | "error";
    /** @default "entity" */
    response: string;
    data: CustomList;
}

/** CustomList */
export interface CustomList {
    /** @format uuid */
    id: string;
    type: "custom_list";
    attributes: CustomListAttributes;
    relationships: Relationship[];
}

/** CustomListAttributes */
export interface CustomListAttributes {
    name: string;
    visibility: "private" | "public";
    /** @min 1 */
    version: number;
}

/** CoverResponse */
export interface CoverResponse {
    result: string;
    /** @default "entity" */
    response: string;
    data: Cover;
}

/** Cover */
export interface Cover {
    /** @format uuid */
    id: string;
    type: "cover_art";
    attributes: CoverAttributes;
    relationships: Relationship[];
}

/** CoverAttributes */
export interface CoverAttributes {
    volume: string | null;
    fileName: string;
    description: string | null;
    locale: string | null;
    /** @min 1 */
    version: number;
    createdAt: string;
    updatedAt: string;
}

/** CoverEdit */
export interface CoverEdit {
    /**
     * @minLength 0
     * @maxLength 8
     */
    volume: string | null;
    /**
     * @minLength 0
     * @maxLength 512
     */
    description?: string | null;
    /** @pattern ^[a-z]{2}(-[a-z]{2})?$ */
    locale?: string | null;
    /** @min 1 */
    version: number;
}

/** AuthorResponse */
export interface AuthorResponse {
    result: string;
    /** @default "entity" */
    response: string;
    data: Author;
}

/** Author */
export interface Author {
    /** @format uuid */
    id: string;
    type: "author";
    attributes: AuthorAttributes;
    relationships: Relationship[];
}

/** AuthorAttributes */
export interface AuthorAttributes {
    name: string;
    imageUrl: string;
    biography: LocalizedString;
    /**
     * @format uri
     * @pattern ^https?://twitter\.com(/|$)
     */
    twitter: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?pixiv\.net(/|$)
     */
    pixiv: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?melonbooks\.co\.jp(/|$)
     */
    melonBook: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?fanbox\.cc(/|$)
     */
    fanBox: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?booth\.pm(/|$)
     */
    booth: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?nicovideo\.jp(/|$)
     */
    nicoVideo: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?skeb\.jp(/|$)
     */
    skeb: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?fantia\.jp(/|$)
     */
    fantia: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?tumblr\.com(/|$)
     */
    tumblr: string | null;
    /**
     * @format uri
     * @pattern ^https?://www\.youtube\.com(/|$)
     */
    youtube: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?weibo\.(cn|com)(/|$)
     */
    weibo: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?naver\.com(/|$)
     */
    naver: string | null;
    /**
     * @format uri
     * @pattern ^https?://
     */
    website: string | null;
    /** @min 1 */
    version: number;
    createdAt: string;
    updatedAt: string;
}

/** AuthorEdit */
export interface AuthorEdit {
    name?: string;
    biography?: LocalizedString;
    /**
     * @format uri
     * @pattern ^https?://twitter\.com(/|$)
     */
    twitter?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?pixiv\.net(/|$)
     */
    pixiv?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?melonbooks\.co\.jp(/|$)
     */
    melonBook?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?fanbox\.cc(/|$)
     */
    fanBox?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?booth\.pm(/|$)
     */
    booth?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?nicovideo\.jp(/|$)
     */
    nicoVideo?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?skeb\.jp(/|$)
     */
    skeb?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?fantia\.jp(/|$)
     */
    fantia?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?tumblr\.com(/|$)
     */
    tumblr?: string | null;
    /**
     * @format uri
     * @pattern ^https?://www\.youtube\.com(/|$)
     */
    youtube?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?weibo\.(cn|com)(/|$)
     */
    weibo?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?naver\.com(/|$)
     */
    naver?: string | null;
    /**
     * @format uri
     * @pattern ^https?://
     */
    website?: string | null;
    /** @min 1 */
    version: number;
}

/** AuthorCreate */
export interface AuthorCreate {
    name: string;
    biography?: LocalizedString;
    /**
     * @format uri
     * @pattern ^https?://twitter\.com(/|$)
     */
    twitter?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?pixiv\.net(/|$)
     */
    pixiv?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?melonbooks\.co\.jp(/|$)
     */
    melonBook?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?fanbox\.cc(/|$)
     */
    fanBox?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?booth\.pm(/|$)
     */
    booth?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?nicovideo\.jp(/|$)
     */
    nicoVideo?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?skeb\.jp(/|$)
     */
    skeb?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?fantia\.jp(/|$)
     */
    fantia?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?tumblr\.com(/|$)
     */
    tumblr?: string | null;
    /**
     * @format uri
     * @pattern ^https?://www\.youtube\.com(/|$)
     */
    youtube?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?weibo\.(cn|com)(/|$)
     */
    weibo?: string | null;
    /**
     * @format uri
     * @pattern ^https?://([\w-]+\.)?naver\.com(/|$)
     */
    naver?: string | null;
    /**
     * @format uri
     * @pattern ^https?://
     */
    website?: string | null;
}

/** ApiClientResponse */
export interface ApiClientResponse {
    result?: string;
    /** @default "entity" */
    response?: string;
    data?: ApiClient;
}

/** ApiClient */
export interface ApiClient {
    /** @format uuid */
    id?: string;
    type?: "api_client";
    attributes?: ApiClientAttributes;
    relationships?: Relationship[];
}

/** ApiClientAttributes */
export interface ApiClientAttributes {
    name?: string;
    description?: string | null;
    profile?: string;
    clientId?: string | null;
    /** @min 1 */
    version?: number;
    createdAt?: string;
    updatedAt?: string;
}

/** ApiClient */
export interface ApiClientEdit {
    description?: string | null;
    /** @min 1 */
    version: number;
}

/** ApiClientCreate */
export interface ApiClientCreate {
    /**
     * @minLength 5
     * @maxLength 32
     */
    name: string;
    /** @maxLength 1024 */
    description?: string | null;
    profile: "personal";
    /** @min 1 */
    version?: number;
}

/** MappingIdBody */
export interface MappingIdBody {
    type?: "group" | "manga" | "chapter" | "tag";
    ids?: number[];
}

/** MappingIdResponse */
export interface MappingIdResponse {
    /** @default "ok" */
    result?: string;
    /** @default "collection" */
    response?: string;
    data?: MappingId[];
    limit?: number;
    offset?: number;
    total?: number;
}

/** MappingId */
export interface MappingId {
    /** @format uuid */
    id?: string;
    type?: "mapping_id";
    attributes?: MappingIdAttributes;
    relationships?: Relationship[];
}

/** MappingIdAttributes */
export interface MappingIdAttributes {
    type?: "manga" | "chapter" | "group" | "tag";
    legacyId?: number;
    /** @format uuid */
    newId?: string;
}

/** TagResponse */
export interface TagResponse {
    /** @default "ok" */
    result: string;
    /** @default "collection" */
    response: string;
    data: Tag[];
    limit: number;
    offset: number;
    total: number;
}

/** Tag */
export interface Tag {
    /** @format uuid */
    id: string;
    type: "tag";
    attributes: TagAttributes;
    relationships: Relationship[];
}

/** TagAttributes */
export interface TagAttributes {
    name: LocalizedString;
    description: LocalizedString;
    group: "content" | "format" | "genre" | "theme";
    /** @min 1 */
    version: number;
}

/** UserResponse */
export interface UserResponse {
    result: "ok";
    /** @default "entity" */
    response: string;
    data: User;
}

/** SendAccountActivationCode */
export interface SendAccountActivationCode {
    /** @format email */
    email: string;
}

/** RecoverCompleteBody */
export interface RecoverCompleteBody {
    /**
     * @minLength 8
     * @maxLength 1024
     */
    newPassword: string;
}

/** UpdateMangaStatus */
export interface UpdateMangaStatus {
    status: "reading" | "on_hold" | "plan_to_read" | "dropped" | "re_reading" | "completed" | null;
}

/** ChapterRequest */
export interface ChapterRequest {
    /** @maxLength 255 */
    title?: string | null;
    volume?: string | null;
    /** @maxLength 8 */
    chapter?: string | null;
    /** @pattern ^[a-z]{2}(-[a-z]{2})?$ */
    translatedLanguage?: string;
    /** @maxItems 10 */
    groups?: string[];
    /** @min 1 */
    version?: number;
}

/** CoverList */
export interface CoverList {
    /** @default "ok" */
    result: string;
    /** @default "collection" */
    response: string;
    data: Cover[];
    limit: number;
    offset: number;
    total: number;
}

/** AuthorList */
export interface AuthorList {
    /** @default "ok" */
    result: string;
    /** @default "collection" */
    response: string;
    data: Author[];
    limit: number;
    offset: number;
    total: number;
}

/** ApiClientList */
export interface ApiClientList {
    /** @default "ok" */
    result?: string;
    /** @default "collection" */
    response?: string;
    data?: ApiClient[];
    limit?: number;
    offset?: number;
    total?: number;
}

/** ChapterList */
export interface ChapterList {
    /** @default "ok" */
    result: string;
    /** @default "collection" */
    response: string;
    data: Chapter[];
    limit: number;
    offset: number;
    total: number;
}

/** ScanlationGroupList */
export interface ScanlationGroupList {
    /** @default "ok" */
    result: string;
    /** @default "collection" */
    response: string;
    data: ScanlationGroup[];
    limit: number;
    offset: number;
    total: number;
}

export type MangaRelationCreate = MangaRelationRequest;

/** MangaRelationRequest */
export interface MangaRelationRequest {
    /** @format uuid */
    targetManga?: string;
    relation?:
    | "monochrome"
    | "main_story"
    | "adapted_from"
    | "based_on"
    | "prequel"
    | "side_story"
    | "doujinshi"
    | "same_franchise"
    | "shared_universe"
    | "sequel"
    | "spin_off"
    | "alternate_story"
    | "alternate_version"
    | "preserialization"
    | "colored"
    | "serialization";
}

/** MangaRelationList */
export interface MangaRelationList {
    /** @default "ok" */
    result?: string;
    /** @default "collection" */
    response?: string;
    data?: MangaRelation[];
    limit?: number;
    offset?: number;
    total?: number;
}

/** MangaRelationResponse */
export interface MangaRelationResponse {
    result?: "ok" | "error";
    /** @default "entity" */
    response?: string;
    data?: MangaRelation;
}

/** MangaRelation */
export interface MangaRelation {
    /** @format uuid */
    id?: string;
    type?: "manga_relation";
    attributes?: MangaRelationAttributes;
    relationships?: Relationship[];
}

/** MangaRelationAttributes */
export interface MangaRelationAttributes {
    relation?:
    | "monochrome"
    | "main_story"
    | "adapted_from"
    | "based_on"
    | "prequel"
    | "side_story"
    | "doujinshi"
    | "same_franchise"
    | "shared_universe"
    | "sequel"
    | "spin_off"
    | "alternate_story"
    | "alternate_version"
    | "preserialization"
    | "colored"
    | "serialization";
    /** @min 1 */
    version?: number;
}

/** MangaList */
export interface MangaList {
    /** @default "ok" */
    result: string;
    /** @default "collection" */
    response: string;
    data: Manga[];
    limit: number;
    offset: number;
    total: number;
}

/** CustomListList */
export interface CustomListList {
    /** @default "ok" */
    result?: string;
    /** @default "collection" */
    response?: string;
    data?: CustomList[];
    limit?: number;
    offset?: number;
    total?: number;
}

/** UserList */
export interface UserList {
    /** @default "ok" */
    result: string;
    /** @default "collection" */
    response: string;
    data: User[];
    limit: number;
    offset: number;
    total: number;
}

/** UploadSession */
export interface UploadSession {
    /** @format uuid */
    id?: string;
    type?: "upload_session";
    attributes?: UploadSessionAttributes;
}

/** UploadSessionAttributes */
export interface UploadSessionAttributes {
    isCommitted?: boolean;
    isProcessed?: boolean;
    isDeleted?: boolean;
    /** @min 1 */
    version?: number;
    createdAt?: string;
    updatedAt?: string;
}

/** UploadSessionFile */
export interface UploadSessionFile {
    /** @format uuid */
    id?: string;
    type?: "upload_session_file";
    attributes?: UploadSessionFileAttributes;
}

/** UploadSessionFileAttributes */
export interface UploadSessionFileAttributes {
    originalFileName?: string;
    fileHash?: string;
    fileSize?: number;
    mimeType?: string;
    source?: "local" | "remote";
    /** @min 1 */
    version?: number;
}

/** ChapterReadMarkersBatch */
export type ChapterReadMarkerBatch = {
    chapterIdsRead?: string[];
    chapterIdsUnread?: string[];
};

/** BeginUploadSession */
export interface BeginUploadSession {
    /** @maxItems 10 */
    groups: string[];
    /**
     * @format uuid
     * @minLength 36
     * @maxLength 36
     */
    manga: string;
}

/** BeginEditSession */
export interface BeginEditSession {
    /** @min 1 */
    version: number;
}

/** BeginUploadSession */
export interface CommitUploadSession {
    chapterDraft?: ChapterDraft;
    /**
     * ordered list of Upload Session File ids
     * @maxItems 500
     * @minItems 1
     */
    pageOrder?: string[];
}

export interface ChapterDraft {
    /**
     * @maxLength 8
     * @pattern ^((0|[1-9]\d*)(\.\d+)?[a-z]?)?$
     */
    volume: string | null;
    /**
     * @maxLength 8
     * @pattern ^((0|[1-9]\d*)(\.\d+)?[a-z]?)?$
     */
    chapter: string | null;
    /** @maxLength 255 */
    title: string | null;
    /** @pattern ^[a-z]{2}(-[a-z]{2})?$ */
    translatedLanguage: string;
    /**
     * @maxLength 512
     * @pattern ^https?://
     */
    externalUrl?: string | null;
    /** @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$ */
    publishAt?: string;
}

/** ReportListResponse */
export interface ReportListResponse {
    result?: "ok" | "error";
    /** @default "collection" */
    response?: string;
    data?: Report[];
    limit?: number;
    offset?: number;
    total?: number;
}

/** Report */
export interface Report {
    /** @format uuid */
    id?: string;
    type?: "report";
    attributes?: ReportAttributes;
    relationships?: Relationship[];
}

/** ReportAttributes */
export interface ReportAttributes {
    details?: string;
    objectId?: string;
    status?: "waiting" | "accepted" | "refused" | "autoresolved";
    createdAt?: string;
}

/** ForumsThreadResponse */
export interface ForumsThreadResponse {
    /** @default "ok" */
    result?: string;
    /** @default "entity" */
    response?: string;
    data?: {
        /** @default "thread" */
        type?: string;
        /** The id for the thread on the forums, accessible at `https://forums.mangadex.org/threads/:id` */
        id?: number;
        attributes?: {
            /** The number of replies so far in the forums thread returned */
            repliesCount?: number;
        };
    };
}

/**
 * ReferenceExpansionAuthor
 * Reference expansion options for author/artist entities or lists
 */
export type ReferenceExpansionAuthor = "manga"[];

/**
 * ReferenceExpansionApiClient
 * Reference expansion options for api_client entities or lists
 */
export type ReferenceExpansionApiClient = "creator"[];

/**
 * ReferenceExpansionChapter
 * Reference expansion options for chapter entities or lists
 */
export type ReferenceExpansionChapter = ("manga" | "scanlation_group" | "user")[];

/**
 * ReferenceExpansionCoverArt
 * Reference expansion options for cover art entities or lists
 */
export type ReferenceExpansionCoverArt = ("manga" | "user")[];

/**
 * ReferenceExpansionManga
 * Reference expansion options for manga entities or lists
 */
export type ReferenceExpansionManga = ("manga" | "cover_art" | "author" | "artist" | "tag" | "creator")[];

/**
 * ReferenceExpansionMangaRelation
 * Reference expansion options for manga relation entities or lists
 */
export type ReferenceExpansionMangaRelation = "manga"[];

/**
 * ReferenceExpansionReport
 * Reference expansion options for user report entities or lists
 */
export type ReferenceExpansionReport = ("user" | "reason")[];

/**
 * ReferenceExpansionScanlationGroup
 * Reference expansion options for scanlation group entities or lists
 */
export type ReferenceExpansionScanlationGroup = ("leader" | "member")[];

/**
 * StatisticsDetailsComments
 * Comments-related statistics of an entity.
 * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
 */
export type StatisticsDetailsComments = {
    /**
     * The id of the thread backing the comments for that entity on the MangaDex Forums.
     * @min 1
     */
    threadId: number;
    /**
     * The number of replies on the MangaDex Forums thread backing this entity's comments. This excludes the initial comment that opens the thread, which is created by our systems.
     * @min 0
     */
    repliesCount: number;
} | null;

/** @default "pong" */
export type GetPingData = string;

export interface GetSearchMangaParams {
    /**
     * @min 0
     * @max 100
     * @default 10
     * @pattern ^\d+$
     */
    limit?: number;
    /**
     * @min 0
     * @pattern ^\d+$
     */
    offset?: number;
    title?: string;
    /** @format uuid */
    authorOrArtist?: string;
    "authors[]"?: string[];
    "artists[]"?: string[];
    /** Year of release or none */
    year?: number | "none";
    "includedTags[]"?: string[];
    /** @default "AND" */
    includedTagsMode?: "AND" | "OR";
    "excludedTags[]"?: string[];
    /** @default "OR" */
    excludedTagsMode?: "AND" | "OR";
    "status[]"?: ("ongoing" | "completed" | "hiatus" | "cancelled")[];
    "originalLanguage[]"?: string[];
    "excludedOriginalLanguage[]"?: string[];
    "availableTranslatedLanguage[]"?: string[];
    "publicationDemographic[]"?: ("shounen" | "shoujo" | "josei" | "seinen" | "none")[];
    /** Manga ids (limited to 100 per request) */
    "ids[]"?: string[];
    /** @default ["safe","suggestive","erotica"] */
    "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    createdAtSince?: string;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    updatedAtSince?: string;
    /** @default {"latestUploadedChapter":"desc"} */
    order?: {
        title?: "asc" | "desc";
        year?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        latestUploadedChapter?: "asc" | "desc";
        followedCount?: "asc" | "desc";
        relevance?: "asc" | "desc";
        rating?: "asc" | "desc";
    };
    /** Reference expansion options for manga entities or lists */
    "includes[]"?: ReferenceExpansionManga;
    hasAvailableChapters?: "0" | "1" | "true" | "false";
    /** @format uuid */
    group?: string;
}

export type GetSearchMangaData = MangaList;

export type PostMangaData = MangaResponse;

export interface GetMangaAggregateParams {
    "translatedLanguage[]"?: string[];
    "groups[]"?: string[];
    /**
     * Manga ID
     * @format uuid
     */
    id: string;
}

export interface GetMangaAggregateData {
    /** @default "ok" */
    result: string;
    volumes: VolumesAggregateData
}

export type VolumesAggregateData = Record<
    string,
    VolumeAggregateData
>;

export interface VolumeAggregateData {
    volume: string;
    count: number;
    chapters: ChaptersVolumeAggregateData
}

export type ChaptersVolumeAggregateData = Record<
    string,
    ChapterVolumeAggregateData
>;

export interface ChapterVolumeAggregateData {
    chapter: string;
    /** @format uuid */
    id: string;
    others: string[];
    count: number;
}
export interface GetMangaIdParams {
    /** Reference expansion options for manga entities or lists */
    "includes[]"?: ReferenceExpansionManga;
    /**
     * Manga ID
     * @format uuid
     */
    id: string;
}

export type GetMangaIdData = MangaResponse;

export type PutMangaIdPayload = MangaEdit & {
    artists?: string[];
    authors?: string[];
};

export type PutMangaIdData = MangaResponse;

export type DeleteMangaIdData = Response;

export type PostAuthLoginData = LoginResponse;

export type GetAuthCheckData = CheckResponse;

export type PostAuthLogoutData = LogoutResponse;

export type PostAuthRefreshData = RefreshResponse;

export interface GetAccountAvailableParams {
    /**
     * Username to check for avaibility
     * @minLength 1
     * @maxLength 64
     * @pattern ^[a-zA-Z0-9_-]+$
     */
    username: string;
}

export interface GetAccountAvailableData {
    available?: boolean;
}

export type PostAccountCreateData = UserResponse;

export type GetAccountActivateCodeData = AccountActivateResponse;

export interface GetListApiclientsParams {
    /**
     * @min 0
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    state?: "requested" | "approved" | "rejected" | "autoapproved";
    name?: string;
    /** Reference expansion options for api_client entities or lists */
    "includes[]"?: ReferenceExpansionApiClient;
    /** @default {"createdAt":"desc"} */
    order?: {
        name?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
    };
}

export type GetListApiclientsData = ApiClientList;

export type PostCreateApiclientData = ApiClientResponse;

export interface GetApiclientParams {
    /** Reference expansion options for api_client entities or lists */
    "includes[]"?: ReferenceExpansionApiClient;
    /**
     * ApiClient ID
     * @format uuid
     */
    id: string;
}

export type GetApiclientData = ApiClientResponse;

export type PostEditApiclientData = ApiClientResponse;

export interface DeleteApiclientParams {
    /** @pattern ^\d+$ */
    version?: string;
    /**
     * ApiClient ID
     * @format uuid
     */
    id: string;
}

export interface DeleteApiclientData {
    /** @default "ok" */
    result?: string;
}

export interface GetApiclientSecretData {
    result?: "ok";
    data?: string;
}

export type PostRegenerateApiclientSecretPayload = object;

export interface PostRegenerateApiclientSecretData {
    result?: "ok";
    data?: string;
}

export interface GetSearchGroupParams {
    /**
     * @min 0
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    /** ScanlationGroup ids (limited to 100 per request) */
    "ids[]"?: string[];
    name?: string;
    focusedLanguage?: string;
    /** Reference expansion options for scanlation group entities or lists */
    "includes[]"?: ReferenceExpansionScanlationGroup;
    /** @default {"latestUploadedChapter":"desc"} */
    order?: {
        name?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        followedCount?: "asc" | "desc";
        relevance?: "asc" | "desc";
    };
}

export type GetSearchGroupData = ScanlationGroupList;

export type PostGroupData = ScanlationGroupResponse;

export interface GetGroupIdParams {
    /** Reference expansion options for scanlation group entities or lists */
    "includes[]"?: ReferenceExpansionScanlationGroup;
    /**
     * Scanlation Group ID
     * @format uuid
     */
    id: string;
}

export type GetGroupIdData = ScanlationGroupResponse;

export type PutGroupIdData = ScanlationGroupResponse;

export type DeleteGroupIdData = Response;

export type PostGroupIdFollowData = Response;

export type DeleteGroupIdFollowData = Response;

export type PostListData = CustomListResponse;

export type GetListIdData = CustomListResponse;

export type PutListIdData = CustomListResponse;

export type DeleteListIdData = Response;

export type FollowListIdPayload = object;

export interface FollowListIdData {
    result?: "ok";
}

export type UnfollowListIdPayload = object;

export interface UnfollowListIdData {
    result?: "ok";
}

export type PostMangaIdListListIdData = Response;

export type DeleteMangaIdListListIdData = Response;

export interface GetUserListParams {
    /**
     * @min 0
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
}

export type GetUserListData = CustomListList;

export interface GetUserIdListParams {
    /**
     * @min 0
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    /**
     * User ID
     * @format uuid
     */
    id: string;
}

export type GetUserIdListData = CustomListList;

export interface GetUserParams {
    /**
     * @min 0
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    /** User ids (limited to 100 per request) */
    "ids[]"?: string[];
    username?: string;
    order?: {
        username?: "asc" | "desc";
    };
}

export type GetUserData = UserList;

export type GetUserIdData = UserResponse;

export type DeleteUserIdData = Response;

export type PostUserDeleteCodeData = Response;

export interface PostUserPasswordPayload {
    /**
     * @minLength 8
     * @maxLength 1024
     */
    oldPassword: string;
    /**
     * @minLength 8
     * @maxLength 1024
     */
    newPassword: string;
}

export type PostUserPasswordData = Response;

export interface PostUserEmailPayload {
    /** @format email */
    email: string;
}

export type PostUserEmailData = Response;

export interface GetChapterParams {
    /**
     * @min 0
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    /** Chapter ids (limited to 100 per request) */
    "ids[]"?: string[];
    title?: string;
    "groups[]"?: string[];
    uploader?: string | string[];
    /** @format uuid */
    manga?: string;
    "volume[]"?: string | string[];
    chapter?: string | string[];
    "translatedLanguage[]"?: string[];
    "originalLanguage[]"?: string[];
    "excludedOriginalLanguage[]"?: string[];
    /** @default ["safe","suggestive","erotica"] */
    "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
    "excludedGroups[]"?: string[];
    "excludedUploaders[]"?: string[];
    /** @default "1" */
    includeFutureUpdates?: "0" | "1";
    includeEmptyPages?: 0 | 1;
    includeFuturePublishAt?: 0 | 1;
    includeExternalUrl?: 0 | 1;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    createdAtSince?: string;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    updatedAtSince?: string;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    publishAtSince?: string;
    order?: {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
    };
    includes?: ("manga" | "scanlation_group" | "user")[];
}

export type GetChapterData = ChapterList;

export interface GetChapterIdParams {
    /** Reference expansion options for chapter entities or lists */
    "includes[]"?: ReferenceExpansionChapter;
    /**
     * Chapter ID
     * @format uuid
     */
    id: string;
}

export type GetChapterIdData = ChapterResponse;

export type PutChapterIdData = ChapterResponse;

export type DeleteChapterIdData = Response;

export interface GetUserFollowsMangaFeedParams {
    /**
     * @min 1
     * @max 500
     * @default 100
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    "translatedLanguage[]"?: string[];
    "originalLanguage[]"?: string[];
    "excludedOriginalLanguage[]"?: string[];
    /** @default ["safe","suggestive","erotica"] */
    "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
    "excludedGroups[]"?: string[];
    "excludedUploaders[]"?: string[];
    /** @default "1" */
    includeFutureUpdates?: "0" | "1";
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    createdAtSince?: string;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    updatedAtSince?: string;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    publishAtSince?: string;
    order?: {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
    };
    /** Reference expansion options for chapter entities or lists */
    "includes[]"?: ReferenceExpansionChapter;
    includeEmptyPages?: 0 | 1;
    includeFuturePublishAt?: 0 | 1;
    includeExternalUrl?: 0 | 1;
}

export type GetUserFollowsMangaFeedData = ChapterList;

export interface GetListIdFeedParams {
    /**
     * @min 1
     * @max 500
     * @default 100
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    "translatedLanguage[]"?: string[];
    "originalLanguage[]"?: string[];
    "excludedOriginalLanguage[]"?: string[];
    /** @default ["safe","suggestive","erotica"] */
    "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
    "excludedGroups[]"?: string[];
    "excludedUploaders[]"?: string[];
    /** @default "1" */
    includeFutureUpdates?: "0" | "1";
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    createdAtSince?: string;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    updatedAtSince?: string;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    publishAtSince?: string;
    order?: {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
    };
    /** Reference expansion options for chapter entities or lists */
    "includes[]"?: ReferenceExpansionChapter;
    includeEmptyPages?: 0 | 1;
    includeFuturePublishAt?: 0 | 1;
    includeExternalUrl?: 0 | 1;
    /** @format uuid */
    id: string;
}

export type GetListIdFeedData = ChapterList;

export type DeleteMangaIdFollowData = Response;

export type PostMangaIdFollowData = Response;

export interface GetCoverParams {
    /**
     * @min 0
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    /** Manga ids (limited to 100 per request) */
    "manga[]"?: string[];
    /** Covers ids (limited to 100 per request) */
    "ids[]"?: string[];
    /** User ids (limited to 100 per request) */
    "uploaders[]"?: string[];
    /** Locales of cover art (limited to 100 per request) */
    "locales[]"?: string[];
    order?: {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        volume?: "asc" | "desc";
    };
    /** Reference expansion options for cover art entities or lists */
    "includes[]"?: ReferenceExpansionCoverArt;
}

export type GetCoverData = CoverList;

export interface UploadCoverPayload {
    /** @format binary */
    file?: File;
    /**
     * @maxLength 8
     * @pattern ^(0|[1-9]\\d*)((\\.\\d+){1,2})?[a-z]?$
     */
    volume?: string | null;
    description?: string;
    /** @pattern ^[a-z]{2}(-[a-z]{2})?$ */
    locale?: string;
}

export type UploadCoverData = CoverResponse;

export interface GetCoverIdParams {
    /** Reference expansion options for cover art entities or lists */
    "includes[]"?: ReferenceExpansionCoverArt;
    /**
     * Is Manga UUID on POST
     * @format uuid
     */
    mangaOrCoverId: string;
}

export type GetCoverIdData = CoverResponse;

export type EditCoverData = CoverResponse;

export type DeleteCoverData = Response;

export interface GetAuthorParams {
    /**
     * @min 0
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    /** Author ids (limited to 100 per request) */
    "ids[]"?: string[];
    name?: string;
    order?: {
        name?: "asc" | "desc";
    };
    /** Reference expansion options for author/artist entities or lists */
    "includes[]"?: ReferenceExpansionAuthor;
}

export type GetAuthorData = AuthorList;

export type PostAuthorData = AuthorResponse;

export interface GetAuthorIdParams {
    /** Reference expansion options for author/artist entities or lists */
    "includes[]"?: ReferenceExpansionAuthor;
    /**
     * Author ID
     * @format uuid
     */
    id: string;
}

export type GetAuthorIdData = AuthorResponse;

export type PutAuthorIdData = AuthorResponse;

export type DeleteAuthorIdData = Response;

export type PostLegacyMappingData = MappingIdResponse;

export interface GetMangaIdFeedParams {
    /**
     * @min 1
     * @max 500
     * @default 100
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    "translatedLanguage[]"?: string[];
    "originalLanguage[]"?: string[];
    "excludedOriginalLanguage[]"?: string[];
    /** @default ["safe","suggestive","erotica"] */
    "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
    "excludedGroups[]"?: string[];
    "excludedUploaders[]"?: string[];
    /** @default "1" */
    includeFutureUpdates?: "0" | "1";
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    createdAtSince?: string;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    updatedAtSince?: string;
    /**
     * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
     * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
     */
    publishAtSince?: string;
    order?: {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
    };
    /** Reference expansion options for chapter entities or lists */
    "includes[]"?: ReferenceExpansionChapter;
    includeEmptyPages?: 0 | 1;
    includeFuturePublishAt?: 0 | 1;
    includeExternalUrl?: 0 | 1;
    /**
     * Manga ID
     * @format uuid
     */
    id: string;
}

export type GetMangaIdFeedData = ChapterList;

export interface GetMangaChapterReadmarkersData {
    result?: "ok";
    data?: string[];
}

export interface PostMangaChapterReadmarkersParams {
    /** Adding this will cause the chapter to be stored in the user's reading history */
    updateHistory?: boolean;
    /** @format uuid */
    id: string;
}

export interface PostMangaChapterReadmarkersData {
    result?: "ok";
}

export interface GetMangaChapterReadmarkers2Params {
    /** Manga ids */
    "ids[]": string[];
    /** Group results by manga ids */
    grouped?: boolean;
}

export interface GetMangaChapterReadmarkers2Data {
    result?: "ok";
    data?: string[] | Record<string, string[]>;
}

export interface GetMangaRandomParams {
    /** Reference expansion options for manga entities or lists */
    "includes[]"?: ReferenceExpansionManga;
    /** @default ["safe","suggestive","erotica"] */
    "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
    "includedTags[]"?: string[];
    /** @default "AND" */
    includedTagsMode?: "AND" | "OR";
    "excludedTags[]"?: string[];
    /** @default "OR" */
    excludedTagsMode?: "AND" | "OR";
}

export type GetMangaRandomData = MangaResponse;

export interface GetAtHomeServerChapterIdParams {
    /**
     * Force selecting from MangaDex@Home servers that use the standard HTTPS port 443.
     *
     * While the conventional port for HTTPS traffic is 443 and servers are encouraged to use it, it is not a hard requirement as it technically isn't
     * anything special.
     *
     * However, some misbehaving school/office network will at time block traffic to non-standard ports, and setting this flag to `true` will ensure
     * selection of a server that uses these.
     * @default false
     */
    forcePort443?: boolean;
    /**
     * Chapter ID
     * @format uuid
     */
    chapterId: string;
}

/** @example {"result":"ok","baseUrl":"https://abcdef.xyz123.mangadex.network:12345/some-temporary-access-token","chapter":{"hash":"d9786b687bc5f3fe1d4ae05ff05e0eb5","data":["x1-b765e86d5ecbc932cf3f517a8604f6ac6d8a7f379b0277a117dc7c09c53d041e.png","x2-fc7c198880083b053bf4e8aebfc0eec1adbe52878a6c5ff08d25544a1d5502ef.png","x3-90f15bc8b91deb0dc88473b532e42a99f93ee9e2c8073795c81b01fff428af80.png"],"dataSaver":["x1-ab2b7c8f30c843aa3a53c29bc8c0e204fba4ab3e75985d761921eb6a52ff6159.jpg","x2-3e057d937e01696adce2ac2865f62f6f6a15f03cef43d929b88e99a4b8482e03.jpg","x3-128742088f99806b022bbc8006554456f2a20d0d176d7f3264a65ff9a549d0dd.jpg"]}} */
export interface GetAtHomeServerChapterIdData {
    /** @default "ok" */
    result: string;
    /**
     * The base URL to construct final image URLs from.
     * The URL returned is valid for the requested chapter only, and for a duration of 15 minutes from the time of the response.
     */
    baseUrl: string;
    chapter: GetAtHomeServerChapterIdDataChapter;
}

export interface GetAtHomeServerChapterIdDataChapter {
    hash: string;
    data: string[];
    dataSaver: string[];
}

export type GetMangaTagData = TagResponse;

export type PostAccountActivateResendData = AccountActivateResponse;

export type PostAccountRecoverData = AccountActivateResponse;

export type PostAccountRecoverCodeData = AccountActivateResponse;

export type GetUserMeData = UserResponse;

export interface GetUserFollowsGroupParams {
    /**
     * @min 1
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    /** Reference expansion options for scanlation group entities or lists */
    "includes[]"?: ReferenceExpansionScanlationGroup;
}

export type GetUserFollowsGroupData = ScanlationGroupList;

export type GetUserFollowsGroupIdData = Response;

export interface GetUserFollowsUserParams {
    /**
     * @min 1
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
}

export type GetUserFollowsUserData = UserList;

export type GetUserFollowsUserIdData = Response;

export interface GetUserFollowsMangaParams {
    /**
     * @min 1
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    /** Reference expansion options for manga entities or lists */
    "includes[]"?: ReferenceExpansionManga;
}

export type GetUserFollowsMangaData = MangaList;

export type GetUserFollowsMangaIdData = Response;

export interface GetUserFollowsListParams {
    /**
     * @min 1
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
}

export type GetUserFollowsListData = CustomListList;

export type GetUserFollowsListIdData = Response;

export interface GetMangaStatusParams {
    /** Used to filter the list by given status */
    status?: "reading" | "on_hold" | "plan_to_read" | "dropped" | "re_reading" | "completed";
}

export interface GetMangaStatusData {
    /** @default "ok" */
    result?: string;
    statuses?: Record<string, "reading" | "on_hold" | "plan_to_read" | "dropped" | "re_reading" | "completed">;
}

/** @example {"result":"ok","status":"reading"} */
export interface GetMangaIdStatusData {
    /** @default "ok" */
    result?: string;
    status?: "reading" | "on_hold" | "plan_to_read" | "dropped" | "re_reading" | "completed";
}

export type PostMangaIdStatusData = Response;

export interface GetMangaIdDraftParams {
    /** Reference expansion options for manga entities or lists */
    "includes[]"?: ReferenceExpansionManga;
    /** @format uuid */
    id: string;
}

export type GetMangaIdDraftData = MangaResponse;

export interface CommitMangaDraftPayload {
    /** @min 1 */
    version?: number;
}

export type CommitMangaDraftData = MangaResponse;

export interface GetMangaDraftsParams {
    /**
     * @min 1
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    state?: "draft" | "submitted" | "rejected";
    /** @default {"createdAt":"desc"} */
    order?: {
        title?: "asc" | "desc";
        year?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
    };
    /** Reference expansion options for manga entities or lists */
    "includes[]"?: ReferenceExpansionManga;
}

export type GetMangaDraftsData = MangaResponse;

export interface PostCaptchaSolvePayload {
    /** @minLength 1 */
    captchaChallenge: string;
}

export interface PostCaptchaSolveData {
    result?: "ok" | "error";
}

export interface GetReportReasonsByCategoryData {
    /** @default "ok" */
    result?: string;
    /** @default "collection" */
    response?: string;
    data?: {
        /** @format uuid */
        id?: string;
        /** @default "report_reason" */
        type?: string;
        attributes?: {
            reason?: LocalizedString;
            detailsRequired?: boolean;
            category?: "manga" | "chapter" | "scanlation_group" | "user" | "author";
            /** @min 1 */
            version?: number;
        };
    }[];
    limit?: number;
    offset?: number;
    total?: number;
}

export interface GetReportsParams {
    /**
     * @min 1
     * @max 100
     * @default 10
     */
    limit?: number;
    /** @min 0 */
    offset?: number;
    category?: "manga" | "chapter" | "scanlation_group" | "user" | "author";
    /**
     * @format uuid
     * @minLength 36
     * @maxLength 36
     */
    reasonId?: string;
    /**
     * @format uuid
     * @minLength 36
     * @maxLength 36
     */
    objectId?: string;
    status?: "waiting" | "accepted" | "refused" | "autoresolved";
    /** @default {"createdAt":"desc"} */
    order?: {
        createdAt?: "asc" | "desc";
    };
    /** Reference expansion options for user report entities or lists */
    "includes[]"?: ReferenceExpansionReport;
}

export type GetReportsData = ReportListResponse;

export interface PostReportPayload {
    category?: "manga" | "chapter" | "user" | "scanlation_group" | "author";
    /**
     * @format uuid
     * @minLength 36
     * @maxLength 36
     */
    reason?: string;
    /**
     * @format uuid
     * @minLength 36
     * @maxLength 36
     */
    objectId?: string;
    details?: string;
}

export type PostReportData = Response;

export type GetUploadSessionData = UploadSession;

export type BeginUploadSessionData = UploadSession;

export type BeginEditSessionData = UploadSession;

export interface PutUploadSessionFilePayload {
    /** @format binary */
    file?: File;
}

export interface PutUploadSessionFileData {
    result?: "ok" | "error";
    errors?: Error[];
    data?: UploadSessionFile[];
}

export type AbandonUploadSessionData = Response;

export type CommitUploadSessionData = Chapter;

export type DeleteUploadedSessionFileData = Response;

export type DeleteUploadedSessionFilesPayload = string[];

export type DeleteUploadedSessionFilesData = Response;

export interface GetMangaRelationParams {
    /** Reference expansion options for manga relation entities or lists */
    "includes[]"?: ReferenceExpansionMangaRelation;
    /** @format uuid */
    mangaId: string;
}

export type GetMangaRelationData = MangaRelationList;

export type PostMangaRelationData = MangaRelationResponse;

export type DeleteMangaRelationIdData = Response;

export interface GetRatingParams {
    manga: string[];
}

/** @example {"result":"ok","ratings":{"f9c33607-9180-4ba6-b85c-e4b5faee7192":{"rating":7,"createdAt":"2021-12-27T08:47:37+00:00"}}} */
export interface GetRatingData {
    /** @default "ok" */
    result?: string;
    ratings?: Record<
        string,
        {
            rating?: number;
            /** @format date-time */
            createdAt?: string;
        }
    >;
}

export interface PostRatingMangaIdPayload {
    /**
     * @min 1
     * @max 10
     */
    rating?: number;
}

export type PostRatingMangaIdData = Response;

export type DeleteRatingMangaIdData = Response;

/** @example {"result":"ok","statistics":{"f9c33607-9180-4ba6-b85c-e4b5faee7192":{"comments":{"threadId":4756728,"repliesCount":12}}}} */
export interface GetStatisticsChapterUuidData {
    /** @default "ok" */
    result?: string;
    statistics?: Record<
        string,
        {
            /**
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             */
            comments?: StatisticsDetailsComments;
        }
    >;
}

export interface GetStatisticsChaptersParams {
    "chapter[]": string[];
}

/** @example {"result":"ok","statistics":{"f9c33607-9180-4ba6-b85c-e4b5faee7192":{"comments":{"threadId":4756728,"repliesCount":12}}}} */
export interface GetStatisticsChaptersData {
    /** @default "ok" */
    result?: string;
    statistics?: Record<
        string,
        {
            /**
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             */
            comments?: StatisticsDetailsComments;
        }
    >;
}

/** @example {"result":"ok","statistics":{"f9c33607-9180-4ba6-b85c-e4b5faee7192":{"comments":{"threadId":4756728,"repliesCount":12}}}} */
export interface GetStatisticsGroupUuidData {
    /** @default "ok" */
    result?: string;
    statistics?: Record<
        string,
        {
            /**
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             */
            comments?: StatisticsDetailsComments;
        }
    >;
}

export interface GetStatisticsGroupsParams {
    "group[]": string[];
}

/** @example {"result":"ok","statistics":{"f9c33607-9180-4ba6-b85c-e4b5faee7192":{"comments":{"threadId":4756728,"repliesCount":12}}}} */
export interface GetStatisticsGroupsData {
    /** @default "ok" */
    result?: string;
    statistics?: Record<
        string,
        {
            /**
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             */
            comments?: StatisticsDetailsComments;
        }
    >;
}

/** @example {"result":"ok","statistics":{"f9c33607-9180-4ba6-b85c-e4b5faee7192":{"comments":{"threadId":4756728,"repliesCount":12},"rating":{"average":7.5,"bayesian":6.47,"distribution":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":2,"8":2,"9":0,"10":0}},"follows":3}}} */
export interface GetStatisticsMangaUuidData {
    /** @default "ok" */
    result: string;
    statistics: Record<
        string,
        {
            /**
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             */
            comments: StatisticsDetailsComments;
            rating: {
                /** Will be nullable if no ratings has been given */
                average: number | null;
                /** Average weighted on all the Manga population */
                bayesian: number;
                distribution: {
                    "1": number;
                    "2": number;
                    "3": number;
                    "4": number;
                    "5": number;
                    "6": number;
                    "7": number;
                    "8": number;
                    "9": number;
                    "10": number;
                };
            };
            follows: number;
        }
    >;
}

export interface GetStatisticsMangaParams {
    "manga[]": string[];
}

/** @example {"result":"ok","statistics":{"f9c33607-9180-4ba6-b85c-e4b5faee7192":{"comments":{"threadId":4756728,"repliesCount":12},"rating":{"average":7.5,"bayesian":6.47},"follows":3}}} */
export interface GetStatisticsMangaData {
    /** @default "ok" */
    result: string;
    statistics: Record<
        string,
        {
            /**
             * Comments-related statistics of an entity.
             * If it is `null`, the entity doesn't have a backing comments thread, and therefore has no comments yet.
             */
            comments: StatisticsDetailsComments;
            rating: {
                /** Will be nullable if no ratings has been done */
                average: number | null;
                /** Average weighted on all the Manga population */
                bayesian: number;
            };
            follows: number;
        }
    >;
}

/** JSON Schema to validate settings */
export type GetSettingsTemplateData = object;

/** A JSON Schema to validate settings */
export type PostSettingsTemplatePayload = object;

/** JSON Schema to validate settings */
export type PostSettingsTemplateData = object;

/** JSON Schema to validate settings */
export type GetSettingsTemplateVersionData = object;

export interface GetSettingsData {
    /** @default "ok" */
    result?: string;
    /** @format date-time */
    updatedAt?: string;
    /** Settings that were validated by linked template */
    settings?: object;
    /**
     * Settings template UUID
     * @format uuid
     */
    template?: string;
}

export interface PostSettingsPayload {
    /** A JSON object that can be validated against the lastest available template */
    settings?: object;
    /**
     * Format: 2022-03-14T13:19:37
     * @format date-time
     */
    updatedAt?: string;
}

export interface PostSettingsData {
    /** @default "ok" */
    result?: string;
    /** @format date-time */
    updatedAt?: string;
    /** Settings that were validated against the linked template */
    settings?: object;
    /**
     * Settings template UUID
     * @format uuid
     */
    template?: string;
}

export interface GetReadingHistoryData {
    /** @default "ok" */
    result?: string;
    ratings?: {
        chapterId?: string;
        /** @format date-time */
        readDate?: string;
    }[];
}

export interface ForumsThreadCreatePayload {
    /** The type of the resource */
    type?: "manga" | "group" | "chapter";
    /**
     * The id of the resource
     * @format uuid
     */
    id?: string;
}

export type ForumsThreadCreateData = ForumsThreadResponse;
