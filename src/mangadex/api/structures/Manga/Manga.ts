import {
    download_all_manga_covers,
    download_manga,
    download_manga_cover,
    patch_all_manga_cover,
    refetch_all_manga
} from "@mangadex/plugin";
import {
    Client,
    Response,
    getClient
} from "@tauri-apps/api/http";
import { stringify } from "qs";
import MangaStatus from "../../enums/MangaStatus";
import { Api_Request } from "../../internal/Api_Request";
import {
    Asc_Desc, Offset_limits,
    Order,
    RelationshipsTypes
} from "../../internal/Utils";
import DeskApiRequest from "../../offline/DeskApiRequest";
import {
    ChapterList,
    GetMangaAggregateData,
    LocalizedString,
    MangaAttributes,
    MangaList,
    MangaResponse,
    Relationship,
    Manga as StaManga,
    Chapter as StaChapter,
    CoverResponse
} from "../../sta/data-contracts";
import { Aggregate } from "../Aggregate";
import Attribute from "../Attributes";
import { Author } from "../Author";
import { Chapter, Chapter_withAllIncludes } from "../Chapter";
import Collection from "../Collection";
import AllDownloadedChap_Of_aMangaCollection from "../CollectionTypes/AllDownloadedChap_ofaMangaCollection";
import AllDownloadedCover_Of_aMangaCollection from "../CollectionTypes/AllDownloadedCover_Of_aMangaCollection";
import AllDownloadedMangaCollection from "../CollectionTypes/AllDownloadedMangaCollection";
import MangaCollection from "../CollectionTypes/MangaCollection";
import { Cover } from "../Cover";
import MangaSearchType from "../SearchType/Manga";
import { Tag } from "../Tag";
import GetChapterByIdResult from "../additonal_types/GetChapterByIdResult";
import { GetMangaByIDResponse } from "./GetMangaByIDResponse";
import { Manga_with_allRelationship } from "./Manga_with_allRelationship";


export class Manga extends Attribute {
    protected static request_a = "manga/";
    private title!: LocalizedString;
    private alt_title!: LocalizedString[];
    private description!: LocalizedString;
    private status!: string;
    private last_volume!: string | null;
    private last_chapter!: string | null;
    private created_at!: string;
    private updated_at!: string;
    private tags!: Array<Tag>;
    private demographic!: string | null;
    private year!: number | null;
    private links!: Record<string, string>;
    private content_rating!: string;
    private avaible_language!: Array<string>;
    private aggregate!: Aggregate;
    private state!: string | null;
    private originalLanguage!: string;
    private latestUploadedChapter!: string;

    /**
     * Getter $latestUploadedChapter
     * @return {string}
     */
    public get $latestUploadedChapter(): string {
        return this.latestUploadedChapter;
    }

    /**
     * Setter $latestUploadedChapter
     * @param {string} value
     */
    public set $latestUploadedChapter(value: string) {
        this.latestUploadedChapter = value;
    }

    public set_state(state: string | null) {
        this.state = state;
    }
    public set_originalLanguage(originalLanguage: string) {
        this.originalLanguage = originalLanguage;
    }
    public get_originalLanguage(): string {
        return this.originalLanguage;
    }
    public get_state(): string | null {
        return this.state;
    }
    public get_status_enum(): MangaStatus {
        if (this.get_status() == MangaStatus.cancelled) {
            return MangaStatus.cancelled;
        } else if (this.get_status() == MangaStatus.completed) {
            return MangaStatus.completed;
        } else if (this.get_status() == MangaStatus.hiatus) {
            return MangaStatus.hiatus;
        } else if (this.get_status() == MangaStatus.ongoing) {
            return MangaStatus.ongoing;
        } else {
            return MangaStatus.other;
        }
    }
    public set_links(links: Record<string, string>) {
        this.links = links;
    }
    public get_links(): Record<string, string> {
        return this.links;
    }
    public set_ranting(content_rating: string) {
        this.content_rating = content_rating;
    }
    public set_aggregate(aggregate: Aggregate) {
        this.aggregate = aggregate;
    }
    public get_aggregate(): Aggregate {
        return this.aggregate;
    }
    public get_ranting(): string {
        return this.content_rating;
    }
    public set_avaible_language(avaible_language: Array<string>) {
        this.avaible_language = avaible_language;
    }
    public get_avaible_language(): Array<string> {
        return this.avaible_language;
    }
    public static get_request_a() {
        return Manga.request_a;
    }
    // [x] set for all args
    public set_title(title: LocalizedString) {
        this.title = title;
    }
    public set_demographic(demographic: string | null) {
        this.demographic = demographic;
    }
    public set_year(year: number | null) {
        this.year = year;
    }
    public set_description(description: LocalizedString) {
        this.description = description;
    }
    public set_status(status: string) {
        this.status = status;
    }
    public set_alt_title(alt_title: LocalizedString[]) {
        this.alt_title = alt_title;
    }
    public set_last_volume(last_volume: string | null) {
        this.last_volume = last_volume;
    }
    public set_last_chapter(last_chapter: string | null) {
        this.last_chapter = last_chapter;
    }
    public set_created_at(created_at: string) {
        this.created_at = created_at;
    }
    public set_update_at(updated_at: string) {
        this.updated_at = updated_at;
    }
    public set_tags(tags: Array<Tag>) {
        this.tags = tags;
    }
    // [x] get for all args
    public get_title(): LocalizedString {
        return this.title;
    }
    public get_description(): LocalizedString {
        return this.description;
    }
    public get_status(): string {
        return this.status;
    }
    public get_alt_title(): LocalizedString[] {
        return this.alt_title;
    }
    public get_last_volume(): string | null {
        return this.last_volume;
    }
    public get_last_chapter(): string | null {
        return this.last_chapter;
    }
    public get_created_at(): string {
        return this.created_at;
    }
    public get_update_at(): string {
        return this.updated_at;
    }
    public get_tags(): Array<Tag> {
        return this.tags;
    }
    public get_demographic(): string | null {
        return this.demographic;
    }
    public get_year(): number | null {
        return this.year;
    }
    // Constructor by default
    constructor(
        id: string,
        title: LocalizedString,
        description: LocalizedString,
        alt_title: LocalizedString[],
        status: string,
        last_chapter: string | null,
        last_volume: string | null,
        update_at: string,
        created_at: string,
        tags: Array<Tag>
    ) {
        super(id, "manga");
        this.set_description(description);
        this.set_alt_title(alt_title);
        this.set_title(title);
        this.set_status(status);
        this.set_last_chapter(last_chapter);
        this.set_last_volume(last_volume);
        this.set_update_at(update_at);
        this.set_created_at(created_at);
        this.set_tags(tags);
    }
    public static build_any(object: StaManga /*
    please only input the real data please
    */

    ): Manga {
        const attributes: MangaAttributes = object.attributes;
        const relationships: Relationship[] = object.relationships;
        const tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        const instance = new Manga(
            object.id,
            attributes.title,
            attributes.description,
            attributes.altTitles,
            attributes.status,
            attributes.lastChapter,
            attributes.lastVolume,
            attributes.updatedAt,
            attributes.createdAt,
            tags
        );
        instance.set_related(object.related);
        try {
            instance.set_relationships_Wany(relationships);
            // eslint-disable-next-line no-empty
        } catch (error) {
        }

        instance.set_avaible_language(attributes.availableTranslatedLanguages);
        instance.set_links(attributes.links);
        instance.set_ranting(attributes.contentRating);
        instance.set_demographic(attributes.publicationDemographic);
        instance.set_state(attributes.state);
        instance.set_originalLanguage(attributes.originalLanguage);
        instance.$latestUploadedChapter = attributes.latestUploadedChapter;
        return instance;
    }
    public static build_any2(object: StaManga /*
    please only input the real data please
    */

    ): Manga {
        const attributes: MangaAttributes = object.attributes;
        //let relationships: any = object.relationships;
        const tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        const instance = new Manga(
            object.id,
            attributes.title,
            attributes.description,
            attributes.altTitles,
            attributes.status,
            attributes.lastChapter,
            attributes.lastVolume,
            attributes.updatedAt,
            attributes.createdAt,
            tags
        );
        //instance.set_relationships_Wany(relationships);
        instance.set_avaible_language(attributes.availableTranslatedLanguages);
        instance.set_links(attributes.links);
        instance.set_ranting(attributes.contentRating);
        instance.set_related(object.related);
        return instance;
    }
    // NOTE Get a random manga
    public static async getRandom(client?: Client): Promise<Manga> {
        try {
            const getted: Promise<Response<MangaResponse>> = Api_Request.get_methods(Manga.get_request_a() + "random", undefined, client);
            const to_use = await getted;
            return Manga.build_any(to_use.data.data);
        } catch (error) {
            if (typeof error == "string") {
                throw new Error(error);
            } else {
                throw new Error("Unknown error", {
                    cause: error
                });
            }
        }
    }
    // [x] get the manga cover
    public async get_cover_art(client?: Client): Promise<Cover> {
        try {
            const rel = await this.get_cover_art_id_();
            const data = await Cover.getById(rel, client);
            return data;
        } catch (error) {
            try {
                if ((await DeskApiRequest.ping(client)) == true) {
                    return await Manga.getOfflineMangaCover(this.get_id(), client);
                } else {
                    throw new Error("No cover art for this manga " + this.get_title().en);
                }
            } catch (error) {
                throw new Error("No cover art for this manga " + this.get_title().en);
            }
        }
    }
    public async get_cover_art_id_(): Promise<string> {

        if (this.get_relationships() == undefined) {
            throw new Error("Relationship are undefined");
        }
        return this.get_some_relationship("cover_art")[0].get_id();
    }
    public get_cover_art_id(): string {
        if (this.get_relationships() == undefined) {
            throw new Error("Relationship are undefined");
        }
        return this.get_some_relationship("cover_art")[0].get_id();
    }
    public static async search({
        offset_Limits = new Offset_limits(), title, authors, artists, year, includedTags, includedTagsMode, excludedTags, excludedTagsMode, status, originalLanguage, excludedOriginalLanguage, availableTranslatedLanguage, publicationDemographic, mangaIDs, createdAtSince, updatedAtSince, order, includes, hasAvailableChapters, latestUploadedChapter, group, client, authorOrArtist
    }: MangaSearchType): Promise<Collection<Manga>> {
        const querys = {
            limit: offset_Limits.get_limits(),
            offset: offset_Limits.get_offset(),
            title,
            year,
            includedTagsMode,
            excludedTagsMode,
            createdAtSince,
            updatedAtSince,
            "includes[]": (includes),
            hasAvailableChapters,
            latestUploadedChapter,
            group,
            order,
            authorOrArtist,
            authors,
            artists,
            includedTags,
            excludedTags,
            status,
            originalLanguage,
            excludedOriginalLanguage,
            availableTranslatedLanguage,
            publicationDemographic,
            ids: mangaIDs
        };
        const getted: Response<MangaList> = await Api_Request.get_methods("manga" + "?" +
            stringify(querys),
            undefined, client);
        const data: Array<StaManga> = getted.data.data;
        const mangaArray: Array<Manga> = new Array<Manga>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Manga.build_any(data[index]);
        }
        return new MangaCollection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total,
            {
                offset_Limits: offset_Limits,
                title: title,
                authors: authors,
                artists: artists,
                year: year,
                includedTags: includedTags,
                includedTagsMode: includedTagsMode,
                excludedTags: excludedTags,
                excludedTagsMode: excludedTagsMode,
                status: status,
                originalLanguage: originalLanguage,
                excludedOriginalLanguage: excludedOriginalLanguage,
                availableTranslatedLanguage: availableTranslatedLanguage,
                publicationDemographic: publicationDemographic,
                mangaIDs: mangaIDs,
                createdAtSince: createdAtSince,
                updatedAtSince: updatedAtSince,
                order: order,
                includes: includes,
                hasAvailableChapters: hasAvailableChapters,
                latestUploadedChapter: latestUploadedChapter,
                group: group,
                client: client
            });
    }
    public async get_author(client?: Client): Promise<Array<Author>> {
        const authors_attributes: Array<Attribute> = this.get_some_relationship("author");
        const authors_: Array<Author> = new Array<Author>(authors_attributes.length);
        for (let index = 0; index < authors_attributes.length; index++) {
            authors_[index] = await Author.getAuthorById(authors_attributes[index].get_id(), client);
        }
        return authors_;
    }
    public async get_artist(client?: Client): Promise<Array<Author>> {
        const authors_attributes: Array<Attribute> = this.get_some_relationship("artist");
        const authors_: Array<Author> = new Array<Author>(authors_attributes.length);
        for (let index = 0; index < authors_attributes.length; index++) {
            authors_[index] = await Author.getAuthorById(authors_attributes[index].get_id(), client);
        }
        return authors_;
    }
    public async aggregate_1(
        translatedLanguage?: Array<string>,
        groups?: Array<string>,
        client?: Client
    ): Promise<void> {
        const getted: Response<GetMangaAggregateData> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate?" +
            stringify({
                translatedLanguage,
                groups
            }),
            undefined,
            client
        );
        this.set_aggregate(Aggregate.build_wANY(getted.data.volumes));
    }
    public async aggregate_1_get(
        translatedLanguage?: Array<string>,
        groups?: Array<string>,
        client?: Client
    ): Promise<Aggregate> {
        const getted: Response<GetMangaAggregateData> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate?" +
            stringify({
                translatedLanguage,
                groups
            }),
            undefined,
            client
        );
        this.set_aggregate(Aggregate.build_wANY(getted.data.volumes));
        return this.get_aggregate();
    }
    public async aggregate_2(
        translatedLanguage?: Array<string>,
        groups?: Array<string>,
        client?: Client
    ): Promise<void> {
        const getted: Response<GetMangaAggregateData> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate?" +
            stringify({
                translatedLanguage,
                groups
            }),
            undefined,
            client
        );
        this.set_aggregate(await Aggregate.build_wANY2(getted.data.volumes));
    }
    public get_key_word(): string {
        return RelationshipsTypes.manga();
    }
    public async getFeed(
        {
            offset_Limits = new Offset_limits(), translatedLanguage, originalLanguage, excludedOriginalLanguage, contentRating, excludedGroups, excludedUploaders, includedFutureUpdate, createdAtSince, updatedAtSince, order, includes, includeEmptyPages, includeFuturePublishAt, includeExternalUrl, client
        }: {
            offset_Limits: Offset_limits;
            translatedLanguage?: Array<string>;
            originalLanguage?: Array<string>;
            excludedOriginalLanguage?: Array<string>;
            contentRating?: Array<string>;
            excludedGroups?: Array<string>;
            excludedUploaders?: Array<string>;
            includedFutureUpdate?: number;
            createdAtSince?: string;
            updatedAtSince?: string;
            order?: Order;
            includes?: string;
            includeEmptyPages?: boolean;
            includeFuturePublishAt?: boolean;
            includeExternalUrl?: boolean;
            client?: Client;
        }): Promise<Array<Chapter>> {
        const querys = {
            limit: offset_Limits.get_limits(),
            offset: offset_Limits.get_offset(),
            includedFutureUpdate,
            createdAtSince,
            updatedAtSince,
            "includes[]": includes,
            includeEmptyPages,
            includeFuturePublishAt,
            includeExternalUrl,
            order,
            originalLanguage,
            excludedOriginalLanguage,
            translatedLanguage,
            contentRating,
            excludedGroups,
            excludedUploaders
        };
        const getted: Response<ChapterList> = await Api_Request.get_methods("manga/" + this.get_id() + "/feed? " +
            stringify(querys),
            undefined,
            client
        );
        const data: Array<StaChapter> = getted.data.data;
        const mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter.build_W_Any(data[index]);
        }
        return mangaArray;
    }
    public async getFeed_All(
        {
            offset_Limits = new Offset_limits(), translatedLanguage, originalLanguage, excludedOriginalLanguage, contentRating, excludedGroups, excludedUploaders, includedFutureUpdate, createdAtSince, updatedAtSince, order, includeEmptyPages, includeFuturePublishAt, includeExternalUrl, client
        }: {
            offset_Limits: Offset_limits;
            translatedLanguage?: Array<string>;
            originalLanguage?: Array<string>;
            excludedOriginalLanguage?: Array<string>;
            contentRating?: Array<string>;
            excludedGroups?: Array<string>;
            excludedUploaders?: Array<string>;
            includedFutureUpdate?: boolean;
            createdAtSince?: string;
            updatedAtSince?: string;
            order?: Order;
            includeEmptyPages?: boolean;
            includeFuturePublishAt?: boolean;
            includeExternalUrl?: boolean;
            client?: Client;
        }): Promise<Array<Chapter>> {
        const querys = {
            limit: offset_Limits.get_limits(),
            offset: offset_Limits.get_offset(),
            includedFutureUpdate: includedFutureUpdate,
            createdAtSince: createdAtSince,
            updatedAtSince: updatedAtSince,
            includeEmptyPages: includeEmptyPages,
            includeFuturePublishAt: includeFuturePublishAt,
            includeExternalUrl: includeExternalUrl,
            order,
            includes: [
                "user",
                "scanlation_group",
                "manga"
            ],
            originalLanguage,
            excludedOriginalLanguage,
            translatedLanguage,
            contentRating,
            excludedGroups,
            excludedUploaders
        };
        const getted: Response<ChapterList> = await Api_Request.get_methods("manga/" + this.get_id() + "/feed?" +
            stringify(querys),
            undefined, client);
        const data: Array<StaChapter> = getted.data.data;
        const mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter_withAllIncludes.build_W_Any(data[index]);
        }
        return mangaArray;
    }
    public static async getFeed(
        id: string,
        offset_Limits: Offset_limits = new Offset_limits(),
        translatedLanguage?: Array<string>,
        originalLanguage?: Array<string>,
        excludedOriginalLanguage?: Array<string>,
        contentRating?: Array<string>,
        excludedGroups?: Array<string>,
        excludedUploaders?: Array<string>,
        includedFutureUpdate?: number,
        createdAtSince?: string,
        updatedAtSince?: string,
        order?: Order,
        includes?: string,
        client?: Client): Promise<Array<Chapter>> {
        const querys = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            includedFutureUpdate,
            createdAtSince,
            updatedAtSince,
            "includes[]": (includes),
            order,
            originalLanguage,
            excludedGroups,
            excludedOriginalLanguage,
            translatedLanguage,
            contentRating,
            excludedUploaders
        };
        const getted: Response<ChapterList> = await Api_Request.get_methods("manga/" + id + "/feed?" +
            stringify(querys), undefined, client);
        const data: Array<StaChapter> = getted.data.data;
        const mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter.build_W_Any(data[index]);
        }
        return mangaArray;
    }
    public get_genre(): Array<Tag> {
        const returns: Array<Tag> = [];
        let index0 = 0;
        for (let index = 0; index < this.get_tags().length; index++) {
            const current_tag = this.get_tags()[index];
            if (current_tag.get_group() == "genre") {
                returns[index0] = current_tag;
                index0 = index0 + 1;
            }
        }
        return returns;
    }
    public async get_async_genre(): Promise<Array<Tag>> {
        const to_use = this.get_genre();
        return new Promise<Array<Tag>>((resolve, reject) => {
            if (to_use.length == 0) {
                reject();
            } else {
                resolve(to_use);
            }
        });
    }
    public get_theme(): Array<Tag> {
        const returns: Array<Tag> = [];
        let index0 = 0;
        for (let index = 0; index < this.get_tags().length; index++) {
            const current_tag = this.get_tags()[index];
            if (current_tag.get_group() == "theme") {
                returns[index0] = current_tag;
                index0 = index0 + 1;
            }
        }
        return returns;
    }
    public async get_async_theme(): Promise<Array<Tag>> {
        const to_use = this.get_theme();
        if (to_use.length == 0) {
            return [];
        } else {
            return to_use;
        }
    }
    public get_format(): Array<Tag> {
        const returns: Array<Tag> = [];
        let index0 = 0;
        for (let index = 0; index < this.get_tags().length; index++) {
            const current_tag = this.get_tags()[index];
            if (current_tag.get_group() == "format") {
                returns[index0] = current_tag;
                index0 = index0 + 1;
            }
        }
        return returns;
    }
    public async get_async_format(): Promise<Array<Tag>> {
        const to_use = this.get_format();
        return new Promise<Array<Tag>>((resolve) => {
            if (to_use.length == 0) {
                resolve([]);
            } else {
                resolve(to_use);
            }
        });
    }
    public get_content(): Array<Tag> {
        const returns: Array<Tag> = [];
        let index0 = 0;
        for (let index = 0; index < this.get_tags().length; index++) {
            const current_tag = this.get_tags()[index];
            if (current_tag.get_group() == "content") {
                returns[index0] = current_tag;
                index0 = index0 + 1;
            }
        }
        return returns;
    }
    public async get_async_content(): Promise<Array<Tag>> {
        const to_use = this.get_content();
        return new Promise<Array<Tag>>((resolve, reject) => {
            if (to_use.length == 0) {
                reject(new Error("No Content ground found in tags"));
            } else {
                resolve(to_use);
            }
        });
    }
    public async get_allCover(client?: Client): Promise<Collection<Cover>> {
        const orderss: Order = new Order();
        orderss.set_volume(Asc_Desc.asc());
        const Offset_Limits: Offset_limits = new Offset_limits();
        Offset_Limits.set_limits(100);
        const res: Collection<Cover> = await Cover.search(
            {
                offset_Limits: Offset_Limits,
                mangaIDs: [this.get_id()],
                order: orderss,
                client: client
            }
        );
        return res;
    }
    public async get_latestUploadedChapter(client?: Client): Promise<GetChapterByIdResult> {
        return Chapter.get_ChapterbyId(this.$latestUploadedChapter, client);
    }
    public async get_latestUploadedChapter_all(client?: Client): Promise<GetChapterByIdResult> {
        return Chapter_withAllIncludes.get_ChapterbyId(this.$latestUploadedChapter, client);
    }
    public async get_all_related_manga(client?: Client): Promise<Array<Manga>> {
        const returns: Array<Manga> = [];

        const related = this.get_some_relationship("manga");
        for (let index = 0; index < related.length; index++) {
            const element = related[index];
            returns[index] = (await Manga.getMangaByID(element.get_id(), client)).manga;
        }
        return returns;
    }
    public get_related_manga_byEnum_length(manga_relation_enum: string): number {
        let returns = 0;
        const related = this.get_some_relationship("manga");
        for (let index = 0; index < related.length; index++) {
            const element = related[index];
            if (element.get_related() == manga_relation_enum) {
                returns = returns + 1;
            }
        }
        return returns;
    }
    public async get_related_manga_byEnum(manga_relation_enum: string, client?: Client): Promise<Array<Manga>> {
        const returns: Array<Manga> = [];
        const index1 = 0;
        const related = this.get_some_relationship("manga");
        for (let index = 0; index < related.length; index++) {
            const element = related[index];
            if (element.get_related() == manga_relation_enum) {
                returns[index1] = (await Manga.getMangaByID(element.get_id(), client)).manga;
            }
        }
        return returns;
    }
    public async get_related_mangaID_byEnum(manga_relation_enum: string): Promise<Array<string>> {
        const returns: Array<string> = [];
        const index1 = 0;
        const related = this.get_some_relationship("manga");
        for (let index = 0; index < related.length; index++) {
            const element = related[index];
            if (element.get_related() == manga_relation_enum) {
                returns[index1] = element.get_id();
            }
        }
        return returns;
    }
    // NOTE get a by his id
    public static async getOfflineMangaByID(id: string, client?: Client): Promise<Manga> {
        try {
            const to_use: Response<MangaResponse> = await DeskApiRequest.get_methods(Manga.get_request_a() + id, undefined, client);
            return Manga_with_allRelationship.build_any(to_use.data.data);
        } catch (error) {
            if (typeof error == "string") {
                throw new Error(error);
            } else {
                throw new Error("Unknow Error", {
                    cause: error
                });
            }
        }
    }
    public static async getOnlinebyID(id: string, client?: Client): Promise<Manga> {
        try {
            const to_use: Response<MangaResponse> = await Api_Request.get_methods(Manga.get_request_a() + id, undefined, client);
            return Manga.build_any(to_use.data.data);
        } catch (error) {
            if (typeof error == "string") {
                throw new Error(error);
            } else {
                throw new Error("Unknow Error", {
                    cause: error
                });
            }
        }
    }
    public static async getMangaByID(id: string, client?: Client): Promise<GetMangaByIDResponse> {
        if (await DeskApiRequest.ping(client) == true) {
            try {
                return {
                    manga: await Manga.getOfflineMangaByID(id, client),
                    isOffline: true
                };
            } catch (e) {
                return {
                    manga: await Manga.getOnlinebyID(id, client),
                    isOffline: false
                };
            }
        } else {
            return {
                manga: await Manga.getOnlinebyID(id, client),
                isOffline: false
            };
        }
    }
    public static async getOfflineMangaCover(mangaId: string, client?: Client): Promise<Cover> {
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<CoverResponse> = await DeskApiRequest.get_methods(`manga/${mangaId}/cover`, undefined, client);
            return Cover.build_withAny(response.data.data);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAllOfflineMangaID(offset_Limits?: Offset_limits, client?: Client): Promise<Collection<string>> {
        if (offset_Limits == undefined) {
            offset_Limits = new Offset_limits();
        }
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<{
                data: {
                    data: Array<string>;
                    offset: number;
                    limit: number;
                    total: number;
                };
                result: string;
                type: string;
            }> = await DeskApiRequest.get_methods("manga", {
                query: {
                    offset: JSON.stringify(offset_Limits.get_offset()),
                    limit: JSON.stringify(offset_Limits.get_limits())
                }
            }, client);
            return new AllDownloadedMangaCollection(response.data.data, client);
        } else {
            throw new Error("The offline server isn't started");
        }

    }
    public static async getAllDownloadedChapters_ofAManga(mangaId: string, offset_Limits?: Offset_limits, client?: Client): Promise<Collection<string>> {
        if (offset_Limits == undefined) {
            offset_Limits = new Offset_limits();
        }
        if (client == undefined) {
            client = await getClient();
        }
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<{
                data: {
                    data: Array<string>;
                    offset: number;
                    limit: number;
                    total: number;
                };
                result: string;
                type: string;
            }> = await DeskApiRequest.get_methods(`manga/${mangaId}/chapters`, {
                query: {
                    offset: JSON.stringify(offset_Limits.get_offset()),
                    limit: JSON.stringify(offset_Limits.get_limits())
                }
            }, client);
            return new AllDownloadedChap_Of_aMangaCollection(response.data.data, mangaId, client);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public async getAllDownloadedChapters(offset_Limits?: Offset_limits, client?: Client): Promise<Collection<string>> {
        if (await DeskApiRequest.ping(client) == true) {
            return Manga.getAllDownloadedChapters_ofAManga(this.get_id(), offset_Limits, client);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAllDownloadedMangaID(offset_Limits?: Offset_limits, client?: Client): Promise<Collection<string>> {
        return await Manga.getAllOfflineMangaID(offset_Limits, client);
    }
    public static async getAllDownloadedCover_ofAManga(manga_id: string, offset_Limits?: Offset_limits, client?: Client): Promise<Collection<string>> {
        if (offset_Limits == undefined) {
            offset_Limits = new Offset_limits();
        }
        if (client == undefined) {
            client = await getClient();
        }
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<{
                data: {
                    data: Array<string>;
                    offset: number;
                    limit: number;
                    total: number;
                };
                result: string;
                type: string;
            }> = await DeskApiRequest.get_methods(`manga/${manga_id}/chapters`, {
                query: {
                    offset: JSON.stringify(offset_Limits.get_offset()),
                    limit: JSON.stringify(offset_Limits.get_limits())
                }
            }, client);
            return new AllDownloadedCover_Of_aMangaCollection(response.data.data, manga_id, client);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async delete_aDownloaded_manga<T = unknown>(mangaID: string, client?: Client): Promise<T> {
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<{
                result: string;
                type: string;
                data: T;
                message: string;
            }> = await DeskApiRequest.delete_methods("manga/" + mangaID, undefined, client);
            return response.data.data;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public async get_manga_related_by_id(mangaID: string): Promise<Manga> {
        const to_use = this.get_some_relationship("manga");
        for (let index = 0; index < to_use.length; index++) {
            const element = to_use[index];
            if (element.get_id() == mangaID) {
                return (await Manga.getMangaByID(element.get_id())).manga;
            }
        }
        throw new Error("The manga " + mangaID + " is not related to " + this.get_id());
    }
    public static async download_manga(mangaID: string, client?: Client): Promise<Manga> {
        if (await DeskApiRequest.ping(client) == true) {
            const response_Json = await download_manga(mangaID);
            return await Manga.getOfflineMangaByID(response_Json.id);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async download_all_manga_covers(mangaID: string, client?: Client): Promise<Array<string>> {
        if (await DeskApiRequest.ping(client) == true) {
            const response_Json = await download_all_manga_covers(mangaID);
            return response_Json.downloaded;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async download_manga_cover(mangaID: string, client?: Client): Promise<Cover> {
        if (await DeskApiRequest.ping(client) == true) {
            const response_Json = await download_manga_cover(mangaID);
            return Cover.getAOfflineCover(response_Json.downloaded);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async download_manga_cover_with_quality(mangaID: string, quality: number, client?: Client): Promise<Cover> {
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<{
                result: string;
                type: string;
                downloaded: string;
            }> = await DeskApiRequest.put_methods("manga/" + mangaID + "/cover/" + quality, undefined, undefined, client);
            return Cover.getAOfflineCover(response.data.downloaded);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async patch_all_manga_cover(client?: Client): Promise<Array<string>> {
        if (await DeskApiRequest.ping(client) == true) {
            const response_Json = await patch_all_manga_cover();
            return response_Json.data;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async getMangaCover(mangaID: string, client?: Client): Promise<Cover> {
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<CoverResponse> = await DeskApiRequest.get_methods(`manga/${mangaID}/cover`, undefined, client);
            return Cover.build_withAny(response.data.data);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public async delete_this(client?: Client) {
        return await Manga.delete_aDownloaded_manga(this.get_id(), client);
    }
    public async download_this(client?: Client): Promise<Manga> {
        return await Manga.download_manga(this.get_id(), client);
    }
    public async download_cover_art(client?: Client): Promise<Cover> {
        return await Manga.download_manga_cover(this.get_id(), client);
    }
    public static async refetch_all_manga(client?: Client): Promise<Array<string>> {
        if (await DeskApiRequest.ping(client) == true) {
            const response_Json = await refetch_all_manga();
            return response_Json.data;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public get_authors_id(): Array<string> {
        return this.get_some_relationship("author").map((data) => data.get_id());
    }
    public get_artists_id(): Array<string> {
        return this.get_some_relationship("artist").map((data) => data.get_id());
    }
    public async get_author_byID(author_id: string, client?: Client): Promise<Author> {
        const authors_ids = this.get_authors_id();
        for (let index = 0; index < authors_ids.length; index++) {
            const element = authors_ids[index];
            if (element == author_id) {
                return await Author.getAuthorById(element, client);
            }
        }
        throw new Error(`no Author ${author_id} related to ${this.get_id()}`);
    }
    public async get_artist_byID(author_id: string, client?: Client): Promise<Author> {
        const authors_ids = this.get_artists_id();
        for (let index = 0; index < authors_ids.length; index++) {
            const element = authors_ids[index];
            if (element == author_id) {
                return await Author.getAuthorById(element, client);
            }
        }
        throw new Error(`no Artists ${author_id} related to ${this.get_id()}`);
    }
}
