import { download_all_manga_covers, download_manga, download_manga_cover, patch_all_manga_cover, refetch_all_manga } from "@mangadex/plugin";
import { Client, getClient, Response } from "@tauri-apps/api/http";
import MangaStatus from "../enums/MangaStatus";
import { Api_Request } from "../internal/Api_Request";
import { Asc_Desc, Author_Artists, Offset_limits, Order, Querry_list_builder, RelationshipsTypes, serialize } from "../internal/Utils";
import DeskApiRequest from "../offline/DeskApiRequest";
import { Aggregate } from "./Aggregate";
import { Attribute } from "./Attributes";
import { Author } from "./Author";
import { Chapter, Chapter_withAllIncludes } from "./Chapter";
import { Collection } from "./Collection";
import AllDownloadedChap_Of_aMangaCollection from "./CollectionTypes/AllDownloadedChap_ofaMangaCollection";
import AllDownloadedCover_Of_aMangaCollection from "./CollectionTypes/AllDownloadedCover_Of_aMangaCollection";
import AllDownloadedMangaCollection from "./CollectionTypes/AllDownloadedMangaCollection";
import Manga_withAllIncludes_Collection from "./CollectionTypes/Manga_withAllIncludes_Collection";
import MangaCollection from "./CollectionTypes/MangaCollection";
import { Cover } from "./Cover";
import MangaSearchType from "./SearchType/Manga";
import MangaSearch_withAllIncludes from "./SearchType/MangaSearch_withAllIncludes";
import { Tag } from "./Tag";

export type GetMangaByIDResponse = {
    manga: Manga,
    isOffline: boolean
}

export class Manga extends Attribute {
    protected static request_a = "manga/";
    private title: any;
    private alt_title: any;
    private description: any;
    private status!: string;
    private last_volume!: string | null;
    private last_chapter!: string | null;
    private created_at!: string;
    private updated_at!: string;
    private tags!: Array<Tag>;
    private demographic!: string | null;
    private year!: number | null;
    private links: any;
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
    public set_links(links: any) {
        this.links = links;
    }
    public get_links(): any {
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
    public set_title(title: any) {
        this.title = title;
    }
    public set_demographic(demographic: string | null) {
        this.demographic = demographic;
    }
    public set_year(year: number | null) {
        this.year = year;
    }
    public set_description(description: any) {
        this.description = description;
    }
    public set_status(status: string) {
        this.status = status;
    }
    public set_alt_title(alt_title: any) {
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
    public get_title(): any {
        return this.title;
    }
    public get_description(): any {
        return this.description;
    }
    public get_status(): string {
        return this.status;
    }
    public get_alt_title(): any {
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
        title: any,
        description: any,
        alt_title: any,
        status: string,
        last_chapter: string | null,
        last_volume: string | null,
        update_at: string,
        created_at: string,
        tags: Array<Tag>,
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
    public static build_any(object: any /*
    please only input the real data please
    */): Manga {
        const attributes: any = object.attributes;
        const relationships: any = object.relationships;
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
    public static build_any2(object: any /*
    please only input the real data please
    */): Manga {
        const attributes: any = object.attributes;
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
        instance.set_ranting(attributes.content_rating);
        instance.set_related(object.related);
        return instance;
    }
    // NOTE Get a random manga
    public static async getRandom(client?: Client): Promise<Manga> {
        try {
            const getted: Promise<Response<any>> = Api_Request.get_methods(Manga.get_request_a() + "random", undefined, client);
            const to_use = await getted;
            return Manga.build_any(to_use.data.data);
        } catch (error) {
            throw new Error(error);
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
        offset_Limits = new Offset_limits(),
        title,
        authors,
        artists,
        year,
        includedTags,
        includedTagsMode,
        excludedTags,
        excludedTagsMode,
        status,
        originalLanguage,
        excludedOriginalLanguage,
        availableTranslatedLanguage,
        publicationDemographic,
        mangaIDs,
        createdAtSince,
        updatedAtSince,
        order,
        includes,
        hasAvailableChapters,
        latestUploadedChapter,
        group,
        client
    }: MangaSearchType): Promise<Collection<Manga>> {
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            title: (title),
            year: JSON.stringify(year),
            includedTagsMode: (includedTagsMode),
            excludedTagsMode: (excludedTagsMode),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            "includes[]": (includes),
            hasAvailableChapters: JSON.stringify(hasAvailableChapters),
            latestUploadedChapter: JSON.stringify(latestUploadedChapter),
            group: (group),
            ...order?.render()
        };
        const getted: Response<any> = await Api_Request.get_methods("manga" + "?" +
            serialize((new Querry_list_builder("authors", authors!)).build()) + "&" +
            serialize((new Querry_list_builder("artists", artists!)).build()) + "&" +
            serialize((new Querry_list_builder("includedTags", includedTags!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedTags", excludedTags!)).build()) + "&" +
            serialize((new Querry_list_builder("status", status!)).build()) + "&" +
            serialize((new Querry_list_builder("originalLanguage", originalLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("availableTranslatedLanguage", availableTranslatedLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("publicationDemographic", publicationDemographic!)).build()) + "&" +
            serialize((new Querry_list_builder("ids", mangaIDs!)).build()) + "&"
            , {
                query: querys
            }, client);
        const data: Array<any> = getted.data.data;
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
        const authors_length: number = this.get_some_relationshipLength("author");
        const authors_: Array<Author> = new Array<Author>(authors_length);
        const authors_attributes: Array<Attribute> = this.get_some_relationship("author");
        for (let index = 0; index < authors_length; index++) {
            authors_[index] = await Author.getAuthorById(authors_attributes[index].get_id(), client);
        }
        return authors_;
    }
    public async get_artist(client?: Client): Promise<Array<Author>> {
        const authors_length: number = this.get_some_relationshipLength("artist");
        const authors_: Array<Author> = new Array<Author>(authors_length);
        const authors_attributes: Array<Attribute> = this.get_some_relationship("artist");
        for (let index = 0; index < authors_length; index++) {
            authors_[index] = await Author.getAuthorById(authors_attributes[index].get_id(), client);
        }
        return authors_;
    }
    public async aggregate_1(
        translatedLanguage?: Array<string>,
        groups?: Array<string>,
        client?: Client
    ): Promise<void> {
        const getted: Response<any> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate?" +
            serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("groups", groups!)).build())
            ,
            {

            },
            client
        );
        this.set_aggregate(Aggregate.build_wANY(getted.data.volumes));
    }
    public async aggregate_1_get(
        translatedLanguage?: Array<string>,
        groups?: Array<string>,
        client?: Client
    ): Promise<Aggregate> {
        const getted: Response<any> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate?" +
            serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("groups", groups!)).build())
            ,
            {

            },
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
        const getted: Response<any> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate?" +
            serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("groups", groups!)).build())
            ,
            {

            },
            client
        );
        this.set_aggregate(await Aggregate.build_wANY2(getted.data.volumes));
    }
    public get_key_word(): string {
        return RelationshipsTypes.manga();
    }
    public async getFeed(
        {
            offset_Limits = new Offset_limits(),
            translatedLanguage,
            originalLanguage,
            excludedOriginalLanguage,
            contentRating,
            excludedGroups,
            excludedUploaders,
            includedFutureUpdate,
            createdAtSince,
            updatedAtSince,
            order,
            includes,
            includeEmptyPages,
            includeFuturePublishAt,
            includeExternalUrl,
            client
        }
            :
            {
                offset_Limits: Offset_limits,
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
                includeEmptyPages?: boolean,
                includeFuturePublishAt?: boolean,
                includeExternalUrl?: boolean,
                client?: Client
            }): Promise<Array<Chapter>> {
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            "includedFutureUpdate": (includedFutureUpdate),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            "includes[]": (includes),
            includeEmptyPages: JSON.stringify(includeEmptyPages!),
            includeFuturePublishAt: JSON.stringify(includeFuturePublishAt!),
            includeExternalUrl: JSON.stringify(includeExternalUrl!),
            ...order?.render()
        };
        const getted: Response<any> = await Api_Request.get_methods("manga/" + this.get_id() + "/feed? " +
            serialize((new Querry_list_builder("originalLanguage", originalLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("contentRating", contentRating!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedGroups", excludedGroups!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedUploaders", excludedUploaders!)).build())
            , {
                query: querys
            },
            client
        );
        const data: Array<any> = getted.data.data;
        const mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter.build_W_Any(data[index]);
        }
        return mangaArray;
    }
    public async getFeed_All(
        {
            offset_Limits = new Offset_limits(),
            translatedLanguage,
            originalLanguage,
            excludedOriginalLanguage,
            contentRating,
            excludedGroups,
            excludedUploaders,
            includedFutureUpdate,
            createdAtSince,
            updatedAtSince,
            order,
            includeEmptyPages,
            includeFuturePublishAt,
            includeExternalUrl,
            client
        }
            :
            {
                offset_Limits: Offset_limits,
                translatedLanguage?: Array<string>,
                originalLanguage?: Array<string>,
                excludedOriginalLanguage?: Array<string>,
                contentRating?: Array<string>,
                excludedGroups?: Array<string>,
                excludedUploaders?: Array<string>,
                includedFutureUpdate?: boolean,
                createdAtSince?: string,
                updatedAtSince?: string,
                order?: Order,
                includeEmptyPages?: boolean,
                includeFuturePublishAt?: boolean,
                includeExternalUrl?: boolean,
                client?: Client
            }): Promise<Array<Chapter>> {
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            "includedFutureUpdate": JSON.stringify(includedFutureUpdate!),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            includeEmptyPages: JSON.stringify(includeEmptyPages!),
            includeFuturePublishAt: JSON.stringify(includeFuturePublishAt!),
            includeExternalUrl: JSON.stringify(includeExternalUrl!),
            ...order?.render(),
        };
        const getted: Response<any> = await Api_Request.get_methods("manga/" + this.get_id() + "/feed?" +
            serialize(((new Querry_list_builder("includes", [
                "user",
                "scanlation_group",
                "manga"
            ])).build()))
            + "&" + serialize((new Querry_list_builder("originalLanguage", originalLanguage!)).build())
            + "&" + serialize((new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build())
            + "&" + serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build())
            + "&" + serialize((new Querry_list_builder("contentRating", contentRating!)).build())
            + "&" + serialize((new Querry_list_builder("excludedGroups", excludedGroups!)).build())
            + "&" + serialize((new Querry_list_builder("excludedUploaders", excludedUploaders!)).build())
            , {
                query: querys
            }, client);
        const data: Array<any> = getted.data.data;
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
        client?: Client): Promise<Array<Chapter> | Response<any>> {
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            "includedFutureUpdate": (includedFutureUpdate),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            "includes[]": (includes),
            ...order?.render()
        };
        const getted: Response<any> = await Api_Request.get_methods("manga/" + id + "/feed?" +
            serialize((new Querry_list_builder("originalLanguage", originalLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("contentRating", contentRating!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedGroups", excludedGroups!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedUploaders", excludedUploaders!)).build())
            , {
                query: querys
            }, client);
        const data: Array<any> = getted.data.data;
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
        return new Promise<Array<Tag>>((resolve, reject) => {
            if (to_use.length == 0) {
                reject();
            } else {
                resolve(to_use);
            }
        });
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
        return new Promise<Array<Tag>>((resolve, reject) => {
            if (to_use.length == 0) {
                reject();
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
        const to_use = this.get_format();
        return new Promise<Array<Tag>>((resolve, reject) => {
            if (to_use.length == 0) {
                reject();
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
    public async get_latestUploadedChapter(client?: Client): Promise<Chapter> {
        return Chapter.get_ChapterbyId(this.$latestUploadedChapter, client);
    }
    public async get_latestUploadedChapter_all(client?: Client): Promise<Chapter_withAllIncludes> {
        return Chapter_withAllIncludes.get_ChapterbyId(this.$latestUploadedChapter, client);
    }
    public async get_all_related_manga(client?: Client): Promise<Array<Manga>> {
        const returns: Array<Manga> = [];

        const related = this.get_some_relationship("manga");
        for (let index = 0; index < related.length; index++) {
            const element = related[index];
            returns[index] = await Manga.getMangaByID(element.get_id(), client);
        }
        return returns;
    }
    public get_related_manga_byEnum_length(manga_relation_enum: string): number {
        let returns = 0;
        const related = this.get_some_relationship("manga");
        for (let index = 0; index < related.length; index++) {
            const element = related[index];
            if (element.get_related()! == manga_relation_enum) {
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
            if (element.get_related()! == manga_relation_enum) {
                returns[index1] = await Manga.getMangaByID(element.get_id(), client);
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
            if (element.get_related()! == manga_relation_enum) {
                returns[index1] = element.get_id();
            }
        }
        return returns;
    }
    // NOTE get a by his id
    public static async getOfflineMangaByID(id: string, client?: Client): Promise<Manga> {
        try {
            const getted: Promise<Response<any>> = DeskApiRequest.get_methods(Manga.get_request_a() + id, undefined, client);
            const to_use = await getted;
            return Manga_with_allRelationship.build_any(to_use.data.data);
        } catch (error) {
            throw new Error(error);
        }
    }
    public static async getOnlinebyID(id: string, client?: Client): Promise<Manga> {
        try {
            const getted: Promise<Response<any>> = Api_Request.get_methods(Manga.get_request_a() + id, undefined, client);
            const to_use = await getted;
            return Manga.build_any(to_use.data.data);
        } catch (error) {
            throw new Error(error);
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
            const response: Response<any> = await DeskApiRequest.get_methods(`manga/${mangaId}/cover`, undefined, client);
            return Cover.build_withAny(response.data.data);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAllOfflineMangaID(offset_Limits?: Offset_limits, client?: Client): Promise<Collection<string>> {
        if (offset_Limits == undefined) {
            offset_Limits = new Offset_limits();
        }
        if (client == undefined) {
            client = await getClient();
        }
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<{
                data: {
                    data: Array<string>,
                    offset: number,
                    limit: number,
                    total: number
                },
                result: string,
                type: string
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
                    data: Array<string>,
                    offset: number,
                    limit: number,
                    total: number
                },
                result: string,
                type: string
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
                    data: Array<string>,
                    offset: number,
                    limit: number,
                    total: number
                },
                result: string,
                type: string
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
    public static async delete_aDownloaded_manga(mangaID: string, client?: Client): Promise<any> {
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<{
                result: string,
                type: string,
                data: any,
                message: string
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
                return Manga.getMangaByID(element.get_id());
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
                result: string,
                type: string
                downloaded: string
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
            const response: Response<any> = await DeskApiRequest.get_methods(`manga/${mangaID}/cover`, undefined, client);
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
            const response_Json: any = await refetch_all_manga();
            return response_Json.data;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public get_authors_id(): Array<string> {
        const authors_length: number = this.get_some_relationshipLength("author");
        const authors_: Array<string> = new Array<string>(authors_length);
        const authors_attributes: Array<Attribute> = this.get_some_relationship("author");
        for (let index = 0; index < authors_length; index++) {
            authors_[index] = (authors_attributes[index].get_id());
        }
        return authors_;
    }
    public get_artists_id(): Array<string> {
        const authors_length: number = this.get_some_relationshipLength("artist");
        const authors_: Array<string> = new Array<string>(authors_length);
        const authors_attributes: Array<Attribute> = this.get_some_relationship("artist");
        for (let index = 0; index < authors_length; index++) {
            authors_[index] = (authors_attributes[index].get_id());
        }
        return authors_;
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

export class Manga_2 extends Manga {
    private constructor(
        id: string,
        title: any,
        description: any,
        alt_title: any,
        status: string,
        last_chapter: string | null,
        last_volume: string | null,
        update_at: string,
        created_at: string,
        tags: Array<Tag>,
    ) {
        super(
            id,
            title,
            description,
            alt_title,
            status,
            last_chapter,
            last_volume,
            update_at,
            created_at,
            tags
        );
    }
    public static build_any(object: any /*
    please only input the real data please
    */): Manga_2 {
        const attributes: any = object.attributes;
        //let relationships: any = object.relationships;
        const tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        const instance = new Manga_2(
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
        instance.set_demographic(attributes.publicationDemographic);
        instance.set_state(attributes.state);
        instance.set_originalLanguage(attributes.originalLanguage);
        instance.$latestUploadedChapter = attributes.latestUploadedChapter;
        instance.set_related(object.related);
        return instance;
    }
    public async get_online_coverArt(client?: Client): Promise<Cover> {
        const orders: Order = new Order();
        orders.set_volume(Asc_Desc.desc());
        try {
            const cover = (await Cover.search(
                {
                    offset_Limits: new Offset_limits(),
                    mangaIDs: [
                        this.get_id()
                    ],
                    order: orders,
                    client: client
                }
            ));
            return cover.get_data()[0];
        } catch (error) {
            throw new Error("No cover art for this manga " + this.get_title().en);
        }
    }
    public async get_cover_art(client?: Client): Promise<Cover> {
        if ((await DeskApiRequest.ping(client)) == true) {
            try {
                return await Manga.getOfflineMangaCover(this.get_id(), client);
            } catch (error) {
                return await this.get_online_coverArt(client);
            }
        } else {
            return await this.get_online_coverArt(client);
        }
    }
}

export class Manga_with_allRelationship extends Manga {
    private authors!: Array<Author>;
    private artists!: Array<Author>;
    private cover!: Cover;
    private related_manga!: Array<Manga>;

    /**
     * Getter $authors
     * @return {Array<Author>}
     */
    public get $authors(): Array<Author> {
        return this.authors;
    }

    /**
     * Setter $authors
     * @param {Array<Author>} value
     */
    public set $authors(value: Array<Author>) {
        this.authors = value;
    }

    /**
     * Getter $artists
     * @return {Array<Author>}
     */
    public get $artists(): Array<Author> {
        return this.artists;
    }

    /**
     * Setter $artists
     * @param {Array<Author>} value
     */
    public set $artists(value: Array<Author>) {
        this.artists = value;
    }

    /**
     * Getter $cover
     * @return {Cover}
     */
    public get $cover(): Cover {
        return this.cover;
    }

    /**
     * Setter $cover
     * @param {Cover} value
     */
    public set $cover(value: Cover) {
        this.cover = value;
    }

    /**
     * Getter $related_manga
     * @return {Array<Manga>}
     */
    public get $related_manga(): Array<Manga> {
        return this.related_manga;
    }

    /**
     * Setter $related_manga
     * @param {Array<Manga>} value
     */
    public set $related_manga(value: Array<Manga>) {
        this.related_manga = value;
    }


    public static build_any(object: any /*
    please only input the real data please
    */): Manga_with_allRelationship {
        const attributes: any = object.attributes;
        const relationships: any = object.relationships;
        const tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        const instance = new Manga_with_allRelationship(
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
        instance.set_relationships_Wany(relationships);
        try {
            const to_input_manga: Array<Manga> = [];
            const all_manga: Array<any> = Attribute.get_some_relationship(relationships, "manga");
            for (let index = 0; index < all_manga.length; index++) {
                try {
                    to_input_manga[index] = Manga_2.build_any(all_manga[index]);
                } catch (error) {
                }
            }
            instance.$related_manga = to_input_manga;
        } catch (error) {
        }
        try {
            const to_input_author: Array<Author> = [];
            const all_author: Array<any> = Attribute.get_some_relationship(relationships, "author");
            for (let index = 0; index < all_author.length; index++) {
                to_input_author[index] = Author.build_wANY(all_author[index]);
            }
            instance.$authors = new Author_Artists(to_input_author, []).filtred;
        } catch (error) { }
        try {
            const to_input_artists: Array<Author> = [];
            const all_artists: Array<any> = Attribute.get_some_relationship(relationships, "artist");
            for (let index = 0; index < all_artists.length; index++) {
                to_input_artists[index] = Author.build_wANY(all_artists[index]);
            }
            instance.$artists = to_input_artists;
        } catch (error) { }
        try {
            instance.$cover = Cover.build_withAny(Attribute.get_some_relationship(relationships, "cover_art")[0]);
            const manga_rel = new Attribute(instance.get_id(), "manga");
            instance.$cover.set_relationships([manga_rel]);
        } catch (error) { }
        instance.set_avaible_language(attributes.availableTranslatedLanguages);
        instance.set_links(attributes.links);
        instance.set_ranting(attributes.contentRating);
        instance.set_demographic(attributes.publicationDemographic);
        instance.set_state(attributes.state);
        instance.set_originalLanguage(attributes.originalLanguage);
        instance.$latestUploadedChapter = attributes.latestUploadedChapter;
        return instance;
    }
    public async get_author(): Promise<Array<Author>> {
        return new Author_Artists(this.$authors, []).filtred;
    }
    public async get_artist(): Promise<Array<Author>> {
        return new Promise((resolve, reject) => {
            resolve(this.$artists);
        });
    }
    public async get_cover_art(client?: Client): Promise<Cover> {
        return new Promise((resolve, reject) => {
            resolve(this.$cover);
        });
    }
    public async get_all_related_manga(): Promise<Manga[]> {
        return this.$related_manga;
    }
    public get_related_manga_byEnum_length(manga_relation_enum: string): number {
        let returns = 0;
        for (let index = 0; index < this.$related_manga.length; index++) {
            const element = this.$related_manga[index];
            if (element.get_related() == manga_relation_enum) {
                returns++;
            }
        }
        return returns;
    }
    public async get_related_manga_byEnum(manga_relation_enum: string): Promise<Manga[]> {
        const returns: Array<Manga> = new Array(this.get_related_manga_byEnum_length(manga_relation_enum));
        let index1 = 0;
        this.$related_manga.forEach(element => {
            if (element.get_related() == manga_relation_enum) {
                returns[index1] = element;
                index1++;
            }
        });
        return returns;
    }
    public async get_manga_related_by_id(mangaID: string): Promise<Manga> {
        for (let index = 0; index < this.$related_manga.length; index++) {
            const element = this.$related_manga[index];
            if (element.get_related() == mangaID) {
                return element;
            }
        }
        throw new Error("this manga " + mangaID + " is'nt related to " + this.get_id());
    }
    public async get_related_mangaID_byEnum(manga_relation_enum: string): Promise<string[]> {
        const returns: Array<string> = new Array(this.get_related_manga_byEnum_length(manga_relation_enum));
        let index1 = 0;
        this.$related_manga.forEach(element => {
            if (element.get_related() == manga_relation_enum) {
                returns[index1] = element.get_id();
                index1++;
            }
        });
        return returns;
    }
    public async get_author_byID(author_id: string): Promise<Author> {
        for (let index = 0; index < this.$authors.length; index++) {
            const element = this.$authors[index];
            if (element.get_id() == author_id) {
                return element;
            }
        }
        throw new Error(`no Author ${author_id} related to ${this.get_id()}`);
    }
    public async get_artist_byID(author_id: string): Promise<Author> {
        for (let index = 0; index < this.$artists.length; index++) {
            const element = this.$artists[index];
            if (element.get_id() == author_id) {
                return element;
            }
        }
        throw new Error(`no Artists ${author_id} related to ${this.get_id()}`);
    }
    public static async getOnlinebyID(id: string, client?: Client): Promise<Manga> {
        try {
            const getted: Promise<Response<any>> = Api_Request.get_methods(Manga.get_request_a() + id + "?" + serialize({
                "includes[0]": "manga",
                "includes[1]": RelationshipsTypes.artist(),
                "includes[2]": RelationshipsTypes.cover_art(),
                "includes[3]": RelationshipsTypes.author()
            }), undefined, client);
            const to_use = await getted;
            return Manga.build_any(to_use.data.data);
        } catch (error) {
            throw new Error(error);
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
                    manga: await Manga_with_allRelationship.getOnlinebyID(id, client),
                    isOffline: false
                };
            }
        } else {
            return {
                manga: await Manga_with_allRelationship.getOnlinebyID(id, client),
                isOffline: false
            };
        }
    }
    public static async search({
        offset_Limits = new Offset_limits(),
        title,
        authors,
        artists,
        year,
        includedTags,
        includedTagsMode,
        excludedTags,
        excludedTagsMode,
        status,
        originalLanguage,
        excludedOriginalLanguage,
        availableTranslatedLanguage,
        publicationDemographic,
        mangaIDs,
        createdAtSince,
        updatedAtSince,
        order,
        hasAvailableChapters,
        latestUploadedChapter,
        group,
        contentRating,
        client
    }: MangaSearch_withAllIncludes): Promise<Collection<Manga_with_allRelationship>> {
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            title: (title),
            year: JSON.stringify(year),
            includedTagsMode: (includedTagsMode),
            excludedTagsMode: (excludedTagsMode),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            hasAvailableChapters: JSON.stringify(hasAvailableChapters),
            latestUploadedChapter: JSON.stringify(latestUploadedChapter),
            group: (group),
            ...order?.render()
        };
        const getted: Response<any> = await Api_Request.get_methods("manga" + "?" +
            serialize((new Querry_list_builder("authors", authors!)).build()) + "&" +
            serialize((new Querry_list_builder("artists", artists!)).build()) + "&" +
            serialize((new Querry_list_builder("includedTags", includedTags!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedTags", excludedTags!)).build()) + "&" +
            serialize((new Querry_list_builder("status", status!)).build()) + "&" +
            serialize((new Querry_list_builder("originalLanguage", originalLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("availableTranslatedLanguage", availableTranslatedLanguage!)).build()) + "&" +
            serialize((new Querry_list_builder("publicationDemographic", publicationDemographic!)).build()) + "&" +
            serialize((new Querry_list_builder("ids", mangaIDs!)).build()) + "&" +
            serialize({
                "includes[0]": "manga",
                "includes[1]": RelationshipsTypes.artist(),
                "includes[2]": RelationshipsTypes.cover_art(),
                "includes[3]": RelationshipsTypes.author()
            }) + "&" +
            serialize(new Querry_list_builder("contentRating", contentRating!).build())
            , {
                query: querys
            }, client);
        const data: Array<any> = getted.data.data;
        const mangaArray: Array<Manga_with_allRelationship> = new Array<Manga_with_allRelationship>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Manga_with_allRelationship.build_any(data[index]);
        }
        return new Manga_withAllIncludes_Collection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total,
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
                hasAvailableChapters: hasAvailableChapters,
                latestUploadedChapter: latestUploadedChapter,
                group: group,
                client: client
            });
    }
}