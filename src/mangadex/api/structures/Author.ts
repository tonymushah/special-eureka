import { Api_Request } from "../internal/Api_Request";
import { Attribute } from "./Attributes";
import { Manga } from "./Manga";
import { Response } from "@tauri-apps/api/http";
import { Offset_limits, Order, Querry_list_builder, RelationshipsTypes, serialize } from "../internal/Utils";
import { Collection } from "./Collection";
import AuthorSearchType from "./SearchType/Author";

class AuthorCollection extends Collection<Author>{
    private prev_search_type : AuthorSearchType;
    /**
     * Getter $prev_search_type
     * @return {AuthorSearchType}
     */
	public get $prev_search_type(): AuthorSearchType {
		return this.prev_search_type;
	}

    /**
     * Setter $prev_search_type
     * @param {AuthorSearchType} value
     */
	public set $prev_search_type(value: AuthorSearchType) {
		this.prev_search_type = value;
	}
    constructor(data : Author[], limit : number, offset : number, total: number, previous_search_type: AuthorSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<Author>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() + this.get_limit();
        if(new_offset <= this.get_total() && new_offset >= 0){
            let current_offset_limits = new Offset_limits();
            current_offset_limits.set_limits(this.get_limit());
            current_offset_limits.set_offset(new_offset);
            this.$prev_search_type.offset_Limits = current_offset_limits;
            resolve(Author.searchAuthor(this.prev_search_type));
        }else{
            reject(new Error("no next author"));
        }
        });
        
    }
    public previous(): Promise<Collection<Author>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() - this.get_limit();
            if(new_offset <= this.get_total() && new_offset >= 0){
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(Author.searchAuthor(this.prev_search_type));
            }else{
                reject(new Error("no previous author"));
            }
        });
        
    }
}

export class Author extends Attribute{
    private name:string;
    private imageUrl: string|null;
    private biography: any;
    twitter:string|null;
    pixiv:string|null;
    melonBook:string|null;
    fanbox:string|null;
    booth:string|null;
    nicoVideo:string|null;
    skeb:string|null;
    fantia:string|null;
    tumblr:string|null;
    youtube:string|null;
    weibo:string|null;
    naver:string|null;
    website:string|null;
    private works: Array<Manga>;
    public set_Name(name:string){
        this.name = name;
    }
    public set_biography(biography:any){
        this.biography = biography;
    }
    public set_imageUrl(imageUrl:string|null){
        this.imageUrl = imageUrl;
    }
    public set_works(works:Array<Manga>){
        this.works = works;
    }
    public get_biography():any{
        return this.biography;
    }
    public get_Name():string{
        return this.name;
    }
    public get_imageUrl():string|null{
        return this.imageUrl;
    }
    public get_works():Array<Manga>{
        return this.works;
    }
    public async build_Works(){
        let works_length:number = this.get_relationships()!.length;
        let works: Array<Manga> = new Array<Manga>(works_length);
        for(let index = 0; index < works_length; index++){
            works[index] = await Manga.getMangaByID(this.get_relationships()![index].get_id());
        }
        this.set_works(works);
    }
    public constructor(id: string, name:string, imageUrl:string|null){
        super(id, "author");
        this.set_Name(name);
        this.set_imageUrl(imageUrl);
    }
    public static build_wANY(object: any): Author{
        let attributes :any = object.attributes;
        let relationships: any = object.relationships;
        let instance: Author = new Author(
            object.id,
            attributes.name,
            attributes.imageUrl
        );
        instance.twitter = attributes.twitter;
        instance.pixiv = attributes.pixiv;
        instance.melonBook = attributes.melonBook;
        instance.fanbox = attributes.fanbox;
        instance.booth = attributes.booth;
        instance.nicoVideo = attributes.nicoVideo;
        instance.skeb = attributes.skeb;
        instance.fantia = attributes.fantia;
        instance.tumblr = attributes.tumblr;
        instance.naver = attributes.naver;
        instance.weibo = attributes.weibo;
        instance.website = attributes.website;
        try {
            instance.set_relationships_Wany(relationships);
        } catch (error) {
        }
        return instance;
    }
    public getUrl_twitter(): string|null{
        if(this.twitter == null){
            return null;
        }else{
            return "https://twitter.com/" + this.twitter;
        }
    }
    public getUrl_pixiv(): string|null{
        if(this.pixiv == null){
            return null;
        }else{
            return "https://pixiv.net/" + this.pixiv;
        }
    }
    public getUrl_melonBook(): string|null{
        if(this.melonBook == null){
            return null;
        }else{
            return "https://melonbooks.co.jp/" + this.melonBook;
        }
    }
    public getUrl_fanbox(): string|null{
        if(this.fanbox == null){
            return null;
        }else{
            return "https://fanbox.cc/" + this.fanbox;
        }
    }
    public getUrl_booth(): string|null{
        if(this.booth == null){
            return null;
        }else{
            return "https://booth.pm/" + this.booth;
        }
    }
    public getUrl_nicoVideo(): string|null{
        if(this.nicoVideo == null){
            return null;
        }else{
            return "https://nicovideo.jp/" + this.nicoVideo;
        }
    }
    public getUrl_skeb(): string|null{
        if(this.skeb == null){
            return null;
        }else{
            return "https://skeb.jp/" + this.skeb;
        }
    }
    public getUrl_fantia(): string|null{
        if(this.fantia == null){
            return null;
        }else{
            return "https://fantia.jp/" + this.fantia;
        }
    }
    public getUrl_tumblr(): string|null{
        if(this.tumblr == null){
            return null;
        }else{
            return "https://tumblr.com/" + this.tumblr;
        }
    }
    public getUrl_youtube(): string|null{
        if(this.youtube == null){
            return null;
        }else{
            return "https://www.youtube.com/" + this.youtube;
        }
    }
    public getUrl_weibo(domain:string = "cn"): string|null{
        if(this.weibo == null){
            return null;
        }else{
            return "https://weibo."+ domain + "/" + this.weibo;
        }
    }
    public getUrl_naver(): string|null{
        if(this.naver == null){
            return null;
        }else{
            return "https://naver.com/" + this.naver;
        }
    }
    public getUrl_website(): string|null{
        if(this.website == null){
            return null;
        }else{
            return "https://" + this.website;
        }
    }
    public static get_request_a():string{
        return "author/";
    }
    public static async getAuthorById(id:string):Promise<Author>{
        try{
            let getted: Response<any> = await Api_Request.get_methods(Author.get_request_a() + id);
            let instance: Author = Author.build_wANY(getted.data.data);
            return instance;
        }catch(error){
            throw new Error(error);
        }
    }
    public static async searchAuthor(
        {
            offset_Limits = new Offset_limits(),
            name,
            ids,
            order,
            includes
        } : AuthorSearchType
    ): Promise<Collection<Author>>{
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            name: (name),
            ...order?.render(),
        };
        let getted: Response<any> = await Api_Request.get_methods(Author.get_request_a() + "?" + 
            serialize((new Querry_list_builder<string>("ids", ids!)).build()) + "&" + 
            serialize((new Querry_list_builder<string>("includes", includes!)).build())
        , {
            query: querys
        });
        let data: Array<any> = getted.data.data;
        let authorArray: Array<Author> = new Array<Author>(data.length);
        for (let index = 0; index < data.length; index++) {
            authorArray[index] = Author.build_wANY(data[index]);
        }
        return new AuthorCollection(authorArray ,getted.data.limit, getted.data.offset, getted.data.total, {
            offset_Limits : offset_Limits,
            name : name,
            ids : ids,
            order : order,
            includes : includes
        });
    }
    public get_key_word():string;
    public get_key_word(isArtist?: boolean):string{
        if(isArtist == undefined || !isArtist){
            return RelationshipsTypes.author();
        }else{
            return RelationshipsTypes.artist();
        }
    }
}