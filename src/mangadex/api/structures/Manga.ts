import { Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Attribute } from "./Attributes";
import { Cover } from "./Cover";
import { Tag } from "./Tag";
import { Author } from "./Author";
import { Asc_Desc, Offset_limits, Order, RelationshipsTypes, Querry_list_builder, serialize } from "../internal/Utils";
import { Aggregate } from "./Aggregate";
import { Chapter, Chapter_withAllIncludes } from "./Chapter";
import DeskApiRequest from "../offline/DeskApiRequest"
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
        instance.set_related(object.related);
        try {
            instance.set_relationships_Wany(relationships);
        } catch (error) {
            
        }
        
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
        instance.set_related(object.related);
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
    public static async getOfflineMangaByID(id: string): Promise<Manga>{
        try {
            var getted: Promise<Response<any>> = DeskApiRequest.get_methods(Manga.get_request_a() + id);
            var to_use = await getted;
            return Manga_with_allRelationship.build_any(to_use.data.data);
        } catch (error) {
            throw new Error(error);
        }
    }
    public static async getMangaByID(id: string): Promise<Manga>{
        if(await DeskApiRequest.ping()){
            return await Manga.getOfflineMangaByID(id);
        }else{
            try {
                var getted: Promise<Response<any>> = Api_Request.get_methods(Manga.get_request_a() + id);
                var to_use = await getted;
                return Manga.build_any(to_use.data.data);
            } catch (error) {
                throw new Error(error);
            }
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
        var getted: Response<any> = await Api_Request.get_methods("manga" + "?" + 
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
            Manga.get_request_a() + this.get_id() + "/aggregate?" + 
                serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" + 
                serialize((new Querry_list_builder("groups", groups!)).build())
            ,
            {
                
            }
            );
        this.set_aggregate(Aggregate.build_wANY(getted.data.volumes));
    }
    public async aggregate_1_get(
        translatedLanguage?: Array<string>, 
        groups?: Array<string>
        ): Promise<Aggregate>{
        var getted: Response<any> = await Api_Request.get_methods(
            Manga.get_request_a() + this.get_id() + "/aggregate?" + 
                serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" + 
                serialize((new Querry_list_builder("groups", groups!)).build())
            ,
            {
                
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
            Manga.get_request_a() + this.get_id() + "/aggregate?" + 
                serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" + 
                serialize((new Querry_list_builder("groups", groups!)).build())
            ,
            {
                
            }
            );
        this.set_aggregate(await Aggregate.build_wANY2(getted.data.volumes));
    }
    public get_key_word():string{
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
            includeExternalUrl
        }
        :
        {
            offset_Limits : Offset_limits,
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
            includes? : string,
            includeEmptyPages?: boolean,
            includeFuturePublishAt?: boolean,
            includeExternalUrl?: boolean
        }): Promise<Array<Chapter>>{
        let querys: any = {
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
        var getted: Response<any> = await Api_Request.get_methods("manga/" + this.get_id() + "/feed? " + 
            serialize((new Querry_list_builder("originalLanguage", originalLanguage!)).build()) + "&" + 
            serialize((new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build()) + "&" + 
            serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" + 
            serialize((new Querry_list_builder("contentRating", contentRating!)).build()) + "&" + 
            serialize((new Querry_list_builder("excludedGroups", excludedGroups!)).build()) + "&" + 
            serialize((new Querry_list_builder("excludedUploaders", excludedUploaders!)).build())
        , {
            query: querys
        });
        var data: Array<any> = getted.data.data;
        var mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
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
            includeExternalUrl
        }
        :
        {
            offset_Limits : Offset_limits,
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
            includeExternalUrl?: boolean
        }): Promise<Array<Chapter>>{
        let querys: any = {
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
        var getted: Response<any> = await Api_Request.get_methods("manga/" + this.get_id() + "/feed?" + 
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
        });
        var data: Array<any> = getted.data.data;
        var mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter_withAllIncludes.build_W_Any(data[index]);
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
            "includedFutureUpdate": (includedFutureUpdate),
            createdAtSince: (createdAtSince),
            updatedAtSince: (updatedAtSince),
            "includes[]": (includes),
            ...order?.render()
        };
        var getted: Response<any> = await Api_Request.get_methods("manga/" + id + "/feed?" + 
            serialize((new Querry_list_builder("originalLanguage", originalLanguage!)).build()) + "&" + 
            serialize((new Querry_list_builder("excludedOriginalLanguage", excludedOriginalLanguage!)).build()) + "&" + 
            serialize((new Querry_list_builder("translatedLanguage", translatedLanguage!)).build()) + "&" + 
            serialize((new Querry_list_builder("contentRating", contentRating!)).build()) + "&" + 
            serialize((new Querry_list_builder("excludedGroups", excludedGroups!)).build()) + "&" + 
            serialize((new Querry_list_builder("excludedUploaders", excludedUploaders!)).build())
        , {
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
    public async get_latestUploadedChapter_all() : Promise<Chapter_withAllIncludes> {
        return Chapter_withAllIncludes.get_ChapterbyId(this.$latestUploadedChapter)
    }
    public async get_all_related_manga() : Promise<Array<Manga>>{
        let returns : Array<Manga> = [];

        let related = this.get_some_relationship("manga");
        for (let index = 0; index < related.length; index++) {
            const element = related[index];
            returns[index] = await Manga.getMangaByID(element.get_id());
        }
        return returns;
    }
    public get_related_manga_byEnum_length(manga_relation_enum : string): number{
        let returns = 0;
        let related = this.get_some_relationship("manga");
        for (let index = 0; index < related.length; index++) {
            const element = related[index];
            if(element.get_related()! == manga_relation_enum){
                returns = returns + 1;
            }
        }
        return returns;
    }
    public async get_related_manga_byEnum(manga_relation_enum : string) : Promise<Array<Manga>>{
        let returns : Array<Manga> = [];
        let index1 = 0;
        let related = this.get_some_relationship("manga");
        for (let index = 0; index < related.length; index++) {
            const element = related[index];
            if(element.get_related()! == manga_relation_enum){
                returns[index1] = await Manga.getMangaByID(element.get_id());
            }
        }
        return returns;
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
        instance.set_related(object.related);
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

export class Manga_with_allRelationship extends Manga {
    private authors : Array<Author>;
    private artists : Array<Author>;
    private cover : Cover;
    private related_manga : Array<Manga>;

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
    */): Manga_2{
        var attributes :any = object.attributes;
        var relationships: any = object.relationships;
        var tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        var instance = new Manga_with_allRelationship(
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
        try {
            let to_input_manga: Array<Manga> = [];
            let all_manga : Array<any> = Attribute.get_some_relationship(relationships, "manga");
            for (let index = 0; index < all_manga.length; index++) {
                to_input_manga[index] = Manga_2.build_any(all_manga[index]);
            }
            instance.$related_manga = to_input_manga;
        } catch (error) {}
        try {
            let to_input_author: Array<Author> = [];
            let all_author : Array<any> = Attribute.get_some_relationship(relationships, "author");
            for (let index = 0; index < all_author.length; index++) {
                to_input_author[index] = Author.build_wANY(all_author[index]);
            }
            instance.$authors = to_input_author; 
        } catch (error) {}
        try {
            let to_input_manga: Array<Manga> = [];
            let all_manga : Array<any> = Attribute.get_some_relationship(relationships, "manga");
            for (let index = 0; index < all_manga.length; index++) {
                to_input_manga[index] = Manga_2.build_any(all_manga[index]);
            }
            instance.$related_manga = to_input_manga;
        } catch (error) {}
        try {
            let to_input_author: Array<Author> = [];
            let all_author : Array<any> = Attribute.get_some_relationship(relationships, "artist");
            for (let index = 0; index < all_author.length; index++) {
                to_input_author[index] = Author.build_wANY(all_author[index]);
            }
            instance.$authors = to_input_author; 
        } catch (error) {}
        try {
            instance.$cover = Cover.build_withAny(Attribute.get_some_relationship(relationships, "cover_art")[0]);
        } catch (error) {}
        return instance;
    }
    public get_author(): Promise<Author[]> {
        return new Promise((resolve, reject) => {
            resolve(this.$authors);
        });
    }
    public get_artist(): Promise<Author[]> {
        return new Promise((resolve, reject) => {
            resolve(this.$artists);
        });
    }
    public get_cover_art(): Promise<Cover> {
        return new Promise((resolve, reject) => {
            resolve(this.$cover);
        });
    }
    
}