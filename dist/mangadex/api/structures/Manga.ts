import { Response } from "@tauri-apps/api/http";
import { JsxAttribute, JsxElement, JsxEmit, JsxFlags } from "typescript";
import { Api_Request } from "../internal/Api_Request";
import { Attribute } from "./Attributes";
import { Cover } from "./Cover";
import { Tag } from "./Tag";
import React from 'react';
import { Author } from "./Author";
import { Asc_Desc, Offset_limits, Order, RelationshipsTypes, Querry_list_builder } from "../internal/Utils";
import { Aggregate } from "./Aggregate";
import { Chapter } from "./Chapter";
export class Manga extends Attribute{
    protected static request_a: string = "manga/";
    private title: any;
    private alt_title: any;
    private description: any;
    private status: string;
    private last_volume: string | null;
    private last_chapter: string | null;
    private created_at: string;
    private updated_at: string;
    private tags: Array<Tag>;
    private demographic: string | null;
    private year : number | null;
    private links: any;
    private content_rating: string;
    private avaible_language: Array<string>;
    private aggregate: Aggregate;
    private state : string | null;
    private originalLanguage: string;
    private latestUploadedChapter : string;

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

    public set_state(state: string | null){
        this.state = state;
    }
    public set_originalLanguage(originalLanguage: string){
        this.originalLanguage = originalLanguage;
    }
    public get_originalLanguage(): string{
        return this.originalLanguage
    }
    public get_state(): string | null{
        return this.state;
    }
    public set_links(links: any){
        this.links = links
    }
    public get_links(): any{
        return this.links;
    }
    public set_ranting(content_rating: string){
        this.content_rating = content_rating;
    }
    public set_aggregate(aggregate: Aggregate){
        this.aggregate = aggregate;
    }
    public get_aggregate(): Aggregate{
        return this.aggregate;
    }
    public get_ranting(): string{
        return this.content_rating;
    }
    public set_avaible_language(avaible_language: Array<string>){
        this.avaible_language = avaible_language;
    }
    public get_avaible_language(): Array<string>{
        return this.avaible_language;
    }
    public static get_request_a(){
        return Manga.request_a;
    }
    // [x] set for all args
    public set_title(title: any){
        this.title = title;
    }
    public set_demographic(demographic: string | null){
        this.demographic = demographic;
    }
    public set_year(year: number | null){
        this.year = year;
    }
    public set_description(description: any){
        this.description = description;
    }
    public set_status(status: string){
        this.status = status;
    }
    public set_alt_title(alt_title: any){
        this.alt_title = alt_title;
    }
    public set_last_volume(last_volume: string | null){
        this.last_volume = last_volume;
    }
    public set_last_chapter(last_chapter: string | null){
        this.last_chapter = last_chapter;
    }
    public set_created_at(created_at: string){
        this.created_at = created_at;
    }
    public set_update_at(updated_at: string){
        this.updated_at = updated_at;
    }
    public set_tags(tags: Array<Tag>){
        this.tags = tags;
    }
    // [x] get for all args
    public get_title(): any{
        return this.title;
    }
    public get_description(): any{
        return this.description;
    }
    public get_status(): string{
        return this.status;
    }
    public get_alt_title(): any{
        return this.alt_title;
    }
    public get_last_volume(): string | null{
        return this.last_volume;
    }
    public get_last_chapter(): string | null{
        return this.last_chapter;
    }
    public get_created_at(): string{
        return this.created_at;
    }
    public get_update_at(): string{
        return this.updated_at;
    }
    public get_tags(): Array<Tag>{
        return this.tags;
    }
    public get_demographic(): string | null{
        return this.demographic;
    }
    public get_year(): number | null{
        return this.year;
    }
    // Constructor by default
    constructor(
            id: string,
            title:any,
            description:any,
            alt_title: any,
            status:string,
            last_chapter:string | null,
            last_volume:string | null,
            update_at:string,
            created_at:string,
            tags: Array<Tag>,
        ){
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
    */): Manga{
        var attributes :any = object.attributes;
        var relationships: any = object.relationships;
        var tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        var instance = new Manga(
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
        instance.set_avaible_language(attributes.availableLanguage);
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
    */): Manga{
        var attributes :any = object.attributes;
        //var relationships: any = object.relationships;
        var tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        var instance = new Manga(
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
        instance.set_avaible_language(attributes.avaible_language);
        instance.set_links(attributes.links);
        instance.set_ranting(attributes.content_rating);
        return instance;
    }
    // NOTE Get a random manga
    public static async getRandom(): Promise<Manga>{
        try {
            var getted: Promise<Response<any>> = Api_Request.get_methods(Manga.get_request_a() + "random");
            var to_use = await getted;
            return Manga.build_any(to_use.data.data);
        } catch (error) {
            throw new Error(error);
        }
    }
    // NOTE get a by his id
    public static async getMangaByID(id: string): Promise<Manga>{
        try {
            var getted: Promise<Response<any>> = Api_Request.get_methods(Manga.get_request_a() + id);
            var to_use = await getted;
            return Manga.build_any(to_use.data.data);
        } catch (error) {
            throw new Error(error);
        }
    }
    // [x] get the manga cover
    public async get_cover_art(): Promise<Cover>{
        try {
            for (let index = 0; index < this.get_relationships()!.length; index++) {
                const to_use = this.get_relationships()![index];
                if(to_use.get_type() == "cover_art"){
                    return await Cover.getById(to_use.get_id());
                }
            }
            throw new Error("No cover art for this manga " + this.get_title().en);
        } catch (error) {
            throw new Error("No cover art for this manga " + this.get_title().en);
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
            includes,
            hasAvailableChapters,
            latestUploadedChapter,
            group
        } : {
            offset_Limits : Offset_limits,
            title?: string,
            authors?: Array<string>,
            artists?: Array<string>,
            year?: number,
            includedTags?: Array<string>,
            includedTagsMode?: string,
            excludedTags?: Array<string>,
            excludedTagsMode?: string,
            status?: Array<string>,
            originalLanguage?: Array<string>,
            excludedOriginalLanguage?: Array<string>,
            availableTranslatedLanguage?: Array<string>,
            publicationDemographic?: Array<string>,
            mangaIDs?: Array<string>,
            createdAtSince?: string,
            updatedAtSince?: string,
            order?: Order, 
            includes? : string,
            hasAvailableChapters? : boolean,
            latestUploadedChapter? : boolean,
            group?: string
        }): Promise<Array<Manga>>{
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            title: (title),
            ...(new Querry_list_builder("authors", authors!)).build(),
            ...(new Querry_list_builder("artists", artists!)).build(),
            year: JSON.stringify(year),
            ...(new Querry_list_builder("includedTags", includedTags!)).build(),
            includedTagsMode: (includedTagsMode),
            ...(new Querry_list_builder("excludedTags", excludedTags!)).build(),
            excludedTagsMode: (excludedTagsMode),
            ...(new Querry_list_builder("status", status!)).build(),
            ...(new Querry_list_builder("originalLanguage", originalLanguage!)).build(),
            ...(new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build(),
            ...(new Querry_list_builder("availableTranslatedLanguage", availableTranslatedLanguage!)).build(),
            ...(new Querry_list_builder("publicationDemographic", publicationDemographic!)).build(),
            ...(new Querry_list_builder("ids", mangaIDs!)).build(),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            "includes[]": (includes),
            hasAvailableChapters: (hasAvailableChapters),
            latestUploadedChapter: latestUploadedChapter,
            group: (group),
            ...order?.render()
        };
        var getted: Response<any> = await Api_Request.get_methods("manga", {
            query: querys
        });
        var data: Array<any> = getted.data.data;
        var mangaArray: Array<Manga> = new Array<Manga>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Manga.build_any(data[index]);
        }
        return mangaArray;
    }
    public async get_author(): Promise<Array<Author>>{
        var authors_length: number = this.get_some_relationshipLength("author");
        var authors_: Array<Author> = new Array<Author>(authors_length);
        var authors_attributes: Array<Attribute> = this.get_some_relationship("author");
        for(let index = 0; index < authors_length; index++){
            authors_[index] = await Author.getAuthorById(authors_attributes[index].get_id());
        }
        return authors_;
    }
    public async get_artist(): Promise<Array<Author>>{
        var authors_length: number = this.get_some_relationshipLength("artist");
        var authors_: Array<Author> = new Array<Author>(authors_length);
        var authors_attributes: Array<Attribute> = this.get_some_relationship("artist");
        for(let index = 0; index < authors_length; index++){
            authors_[index] = await Author.getAuthorById(authors_attributes[index].get_id());
        }
        return authors_;
    }
    public async aggregate_1(
        translatedLanguage?: Array<string>, 
        groups?: Array<string>
        ): Promise<void>{
        var getted: Response<any> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate",
            {
                query: {
                    ...(new Querry_list_builder("translatedLanguage", translatedLanguage!)).build(),
                    ...(new Querry_list_builder("groups", groups!)).build()
                }
            }
            );
        this.set_aggregate(Aggregate.build_wANY(getted.data.volumes));
    }
    public async aggregate_1_get(
        translatedLanguage?: Array<string>, 
        groups?: Array<string>
        ): Promise<Aggregate>{
        var getted: Response<any> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate",
            {
                query: {
                    ...(new Querry_list_builder("translatedLanguage", translatedLanguage!)).build(),
                    ...(new Querry_list_builder("groups", groups!)).build()
                }
            }
        );
        this.set_aggregate(Aggregate.build_wANY(getted.data.volumes));
        return this.get_aggregate();
    }
    public async aggregate_2(
        translatedLanguage?: Array<string>, 
        groups?: Array<string>
        ): Promise<void>{
        var getted: Response<any> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate",
            {
                query: {
                    ...(new Querry_list_builder("translatedLanguage", translatedLanguage!)).build(),
                    ...(new Querry_list_builder("groups", groups!)).build()
                }
            }
        );
        this.set_aggregate(await Aggregate.build_wANY2(getted.data.volumes));
    }
    public get_key_word():string{
        return RelationshipsTypes.manga();
    }
    public async getFeed(
        offset_Limits : Offset_limits = new Offset_limits(),
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
        includes? : string): Promise<Array<Chapter>>{
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            ...(new Querry_list_builder("originalLanguage", originalLanguage!)).build(),
            ...(new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build(),
            ...(new Querry_list_builder("translatedLanguage", translatedLanguage!)).build(),
            ...(new Querry_list_builder("contentRating", contentRating!)).build(),
            ...(new Querry_list_builder("excludedGroups", excludedGroups!)).build(),
            ...(new Querry_list_builder("excludedUploaders", excludedUploaders!)).build(),
            "includedFutureUpdate": (includedFutureUpdate),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            "includes[]": (includes),
            ...order?.render()
        };
        var getted: Response<any> = await Api_Request.get_methods("manga/" + this.get_id() + "/feed", {
            query: querys
        });
        var data: Array<any> = getted.data.data;
        var mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter.build_W_Any(data[index]);
        }
        return mangaArray;
    }
    public static async getFeed(
        id: string,
        offset_Limits : Offset_limits = new Offset_limits(),
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
        includes? : string): Promise<Array<Chapter> | Response<any>>{
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            ...(new Querry_list_builder("originalLanguage", originalLanguage!)).build(),
            ...(new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build(),
            ...(new Querry_list_builder("translatedLanguage", translatedLanguage!)).build(),
            ...(new Querry_list_builder("contentRating", contentRating!)).build(),
            ...(new Querry_list_builder("excludedGroups", excludedGroups!)).build(),
            ...(new Querry_list_builder("excludedUploaders", excludedUploaders!)).build(),
            "includedFutureUpdate": (includedFutureUpdate),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            "includes[]": (includes),
            ...order?.render()
        };
        var getted: Response<any> = await Api_Request.get_methods("manga/" + id + "/feed", {
            query: querys
        });
        var data: Array<any> = getted.data.data;
        var mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter.build_W_Any(data[index]);
        }
        return mangaArray;
    }
    public get_genre(): Array<Tag>{
        var returns : Array<Tag> = [];
        let index0 = 0;
        for (let index = 0; index < this.get_tags().length; index++) {
            const current_tag= this.get_tags()[index];
            if(current_tag.get_group() == "genre"){
                returns[index0] = current_tag
                index0 = index0 + 1;
            }
        }
        return returns;
    }
    public async get_async_genre(): Promise<Array<Tag>>{
        var to_use = this.get_genre();
        return new Promise<Array<Tag>>((resolve, reject) => {
            if(to_use.length == 0){
                reject();
            }else{
                resolve(to_use);
            }
        });
    }
    public get_theme(): Array<Tag>{
        var returns : Array<Tag> = [];
        let index0 = 0;
        for (let index = 0; index < this.get_tags().length; index++) {
            const current_tag= this.get_tags()[index];
            if(current_tag.get_group() == "theme"){
                returns[index0] = current_tag
                index0 = index0 + 1;
            }
        }
        return returns;
    }
    public async get_async_theme(): Promise<Array<Tag>>{
        var to_use = this.get_theme();
        return new Promise<Array<Tag>>((resolve, reject) => {
            if(to_use.length == 0){
                reject();
            }else{
                resolve(to_use);
            }
        });
    }
    public get_format(): Array<Tag>{
        var returns : Array<Tag> = [];
        let index0 = 0;
        for (let index = 0; index < this.get_tags().length; index++) {
            const current_tag= this.get_tags()[index];
            if(current_tag.get_group() == "format"){
                returns[index0] = current_tag
                index0 = index0 + 1;
            }
        }
        return returns;
    }
    public async get_async_format(): Promise<Array<Tag>>{
        var to_use = this.get_format();
        return new Promise<Array<Tag>>((resolve, reject) => {
            if(to_use.length == 0){
                reject();
            }else{
                resolve(to_use);
            }
        });
    }
    public get_content(): Array<Tag>{
        var returns : Array<Tag> = [];
        let index0 = 0;
        for (let index = 0; index < this.get_tags().length; index++) {
            const current_tag= this.get_tags()[index];
            if(current_tag.get_group() == "content"){
                returns[index0] = current_tag
                index0 = index0 + 1;
            }
        }
        return returns;
    }
    public async get_async_content(): Promise<Array<Tag>>{
        var to_use = this.get_format();
        return new Promise<Array<Tag>>((resolve, reject) => {
            if(to_use.length == 0){
                reject();
            }else{
                resolve(to_use);
            }
        });
    }
    public async get_allCover(): Promise<Array<Cover>>{
        let orderss : Order = new Order();
        orderss.set_volume(Asc_Desc.asc());
        let Offset_Limits: Offset_limits = new Offset_limits();
        Offset_Limits.set_limits(100);
        let res : Array<Cover> | Response<any> = await Cover.search(
            {
                offset_Limits : Offset_Limits,
                mangaIDs : [this.get_id()],
                order : orderss
            }
        );
        if(res instanceof Array<Cover>){
            return res;
        }else{
            throw new Error("Cover list has no been loaded");
        }
    }
    public async get_latestUploadedChapter() : Promise<Chapter>{
        return Chapter.get_ChapterbyId(this.$latestUploadedChapter);
    }
}

export class Manga_2 extends Manga{
    private constructor(
            id: string,
            title:any,
            description:any,
            alt_title: any,
            status:string,
            last_chapter:string | null,
            last_volume:string | null,
            update_at:string,
            created_at:string,
            tags: Array<Tag>,
        ){
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
        )
    }
    public static build_any(object: any /*
    please only input the real data please
    */): Manga_2{
        var attributes :any = object.attributes;
        //var relationships: any = object.relationships;
        var tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        var instance = new Manga_2(
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
        instance.set_avaible_language(attributes.avaible_language);
        instance.set_links(attributes.links);
        instance.set_ranting(attributes.content_rating);
        return instance;
    }
    public async get_cover_art(): Promise<Cover>{
        let orders : Order = new Order();
        orders.set_volume(Asc_Desc.desc());
        try {
            let cover = (await Cover.search(
                {
                    offset_Limits : new Offset_limits(),
                    mangaIDs : [
                        this.get_id()
                    ],
                    order : orders,
                }
            ))
            if (cover instanceof Array<Cover>) {
                return cover[0];
            }else{
                throw new Error("No cover art for this manga " + this.get_title().en);
            }
        } catch (error) {
            throw new Error("No cover art for this manga " + this.get_title().en);
        }
    }
}