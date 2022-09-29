import { Response } from "@tauri-apps/api/http";
import { JsxAttribute, JsxElement, JsxEmit, JsxFlags } from "typescript";
import { Api_Request } from "../internal/Api_Request";
import { Attribute } from "./Attributes";
import { Cover } from "./Cover";
import { Tag } from "./Tag";
import React from 'react';
import { Author } from "./Author";
import { Offset_limits, Order, RelationshipsTypes } from "../internal/Utils";
import { Aggregate } from "./Aggregate";
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
    public static async search(
        offset_Limits : Offset_limits = new Offset_limits(),
        title?: string,
        authors?: string,
        artists?: string,
        year?: number,
        includedTags?: string,
        includedTagsMode?: string,
        excludedTags?: string,
        excludedTagsMode?: string,
        status?: string,
        originalLanguage?: string,
        excludedOriginalLanguage?: string,
        availableTranslatedLanguage?: string,
        publicationDemographic?: string,
        mangaIDs?: string,
        createdAtSince?: string,
        updatedAtSince?: string,
        order?: Order, 
        includes? : string,
        hasAvailableChapters? : boolean,
        group?: string): Promise<Array<Manga> | Response<any>>{
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            title: (title),
            "authors[]": (authors),
            "artists[]": (artists),
            year: JSON.stringify(year),
            "includedTags[]": includedTags,
            includedTagsMode: (includedTagsMode),
            "excludedTags[]": (excludedTags),
            excludedTagsMode: (excludedTagsMode),
            "status[]": (status),
            "originalLanguage[]": (originalLanguage),
            "excludedOriginalLanguage[]": (excludedOriginalLanguage),
            "availableTranslatedLanguage[]": (availableTranslatedLanguage),
            "publicationDemographic[]": (publicationDemographic),
            "mangaIDs[]": (mangaIDs),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            "includes[]": (includes),
            hasAvailableChapters: (hasAvailableChapters),
            group: (group),
            ...order?.render()
        };
        var getted: Response<any> = await Api_Request.Sget_methods("manga", {
            query: querys
        });
        if(getted.status == 200){
            var data: Array<any> = getted.data.data;
            var mangaArray: Array<Manga> = new Array<Manga>(data.length);
            for (let index = 0; index < data.length; index++) {
                mangaArray[index] = Manga.build_any(data[index]);
            }
            return mangaArray;
        }else{
            return getted;
        }
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
    public async aggregate_1(): Promise<void>{
        var getted: Response<any> = await Api_Request.get_methods(Manga.get_request_a() + this.get_id() + "/aggregate");
        this.set_aggregate(Aggregate.build_wANY(getted.data.volumes));
    }
    public async aggregate_2(): Promise<void>{
        var getted: Response<any> = await Api_Request.get_methods(Manga.get_request_a() + this.get_id() + "/aggregate");
        this.set_aggregate(await Aggregate.build_wANY2(getted.data.volumes));
    }
    public get_key_word():string{
        return RelationshipsTypes.manga();
    }
}