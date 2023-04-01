import { Client, Response, ResponseType } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Upload } from "../internal/Upload_Retrieve";
import { Offset_limits, Querry_list_builder, RelationshipsTypes, serialize } from "../internal/Utils";
import { default as DeskApiRequest, default as DesktopApi } from "../offline/DeskApiRequest";
import { Attribute } from "./Attributes";
import { Collection } from "./Collection";
import CoverCollection from "./CollectionTypes/CoverCollection";
import { Manga } from "./Manga";
import CoverSearchType from "./SearchType/Cover";
export class Cover extends Attribute{
    private description!: string;
    private volume!: number;
    private file_name!: string;
    private locale!: string;
    private createdAt!: string;
    private updatedAt!: string;
    // [x] set for every args
    public set_description(description: string){
        this.description = description;
    }
    public set_volume(volume: number){
        this.volume = volume;
    }
    public set_file_name(file_name: string){
        this.file_name = file_name;
    }
    public set_locale(locale: string){
        this.locale = locale;
    }
    public set_created_at(created_at: string){
        this.createdAt = created_at;
    }
    public set_update_at(updated_at: string){
        this.updatedAt = updated_at;
    }
    // [x] get for every args
    public get_description(): string{
        return this.description;
    }
    public get_volume(): number{
        return this.volume;
    }
    public get_file_name(): string{
        return this.file_name ;
    }
    public get_locale(): string{
        return this.locale;
    }
    public get_created_at(): string{
        return this.createdAt;
    }
    public get_update_at(): string{
        return this.updatedAt;
    }
    // [x] constructor by default
    public constructor(
        id: string,
        description: string,
        volume: number,
        file_name: string,
        locale: string,
        createdAt: string,
        updatedAt: string
    ){
        super(id, "cover");
        this.set_description(description);
        this.set_created_at(createdAt);
        this.set_volume(volume);
        this.set_file_name(file_name);
        this.set_locale(locale);
        this.set_update_at(updatedAt);
    }
    // [x] build with relationship
    public static build_withRelatship(
        id: string,
        description: string,
        volume: number,
        file_name: string,
        locale: string,
        createdAt: string,
        updatedAt: string,
        relationships: Array<Attribute>
    ): Cover{
        const instance : Cover = new Cover(
            id,
            description,
            volume,
            file_name,
            locale,
            createdAt,
            updatedAt
        );
        instance.set_relationships(relationships);
        return instance;
    }
    public static build_withRelatshipAny(
        id: string,
        description: string,
        volume: number,
        file_name: string,
        locale: string,
        createdAt: string,
        updatedAt: string,
        relationship: any
    ): Cover{
        const instance : Cover = new Cover(
            id,
            description,
            volume,
            file_name,
            locale,
            createdAt,
            updatedAt
        );
        try {
            instance.set_relationships_Wany(relationship);
        } catch (error) {
        }
        
        return instance;
    }
    public static build_withAny(
        object: any
    ): Cover{
        const attributes = object.attributes;
        const relationships = object.relationships;
        const instance = new Cover(
            object.id,
            attributes.description,
            attributes.volume,
            attributes.fileName,
            attributes.locale,
            attributes.createdAt,
            attributes.updated_at
        );
        try {
            instance.set_relationships_Wany(relationships);
        } catch (error) {
        }
        
        return instance;
    }
    public static async getOnlineByID(id: string, client? : Client): Promise<Cover>{
        const getted = await Api_Request.get_methods("cover/" + id, undefined, client);
        const instance = Cover.build_withAny(getted.data.data);
        return instance;
    }
    // [ ] get a cover by his id 
    public static async getById(id: string, client?: Client): Promise<Cover>{
        if(await DeskApiRequest.ping(client) == true){
            try{
                return await Cover.getAOfflineCover(id, client);
            }catch(e){
                return await Cover.getOnlineByID(id, client);
            }
        }else{
            return await Cover.getOnlineByID(id, client);
        }
    }
    // [x] get the manga relative 
    public async get_manga_relative(client?: Client): Promise<Manga>{
        try {
            for (let index = 0; index < this.get_relationships()!.length; index++) {
                const lol = this.get_relationships()![index];
                if(lol.get_type() == "manga"){
                    return await Manga.getMangaByID(lol.get_id(), client);
                }
            }
            throw new Error("this cover has no relative Manga");
        } catch (error) {
            throw new Error("this conver has no relationships");
        }
    }
    // [ ] get the cover path 
        // [ ] {256, 512}
        public get_CoverImageOnline_thumbnail(size: 256 | 512): string{
            return Upload.make_upload_url("covers/" + this.get_some_relationship("manga")[0].get_id() + "/" + this.get_file_name() + "." + size +".jpg");
        }
        // [ ] original
        public get_CoverImageOnline(): string{
            return Upload.make_upload_url("covers/" + this.get_some_relationship("manga")![0].get_id() + "/" + this.get_file_name());
        }
        public async get_CoverImage_thumbnail_promise(size: 256 | 512, client?: Client): Promise<string>{
            try {
                return await Cover.getOfflineCoverImage(this.get_id(), client);
            } catch (error) {
                return this.get_CoverImageOnline_thumbnail(size);
            }
        }
        public async get_CoverImage_promise(client?: Client) : Promise<string>{
            try {
                return await Cover.getOfflineCoverImage(this.get_id(), client);
            } catch (error) {
                return this.get_CoverImageOnline();
            }
        }
        public get_Cover_image() : string{
            try {
                return this.get_CoverImageOnline();
            } catch (error) {
                return Cover.getOfflineCoverImage_notasync(this.get_id());
            }
        }
    public get_key_word():string{
        return RelationshipsTypes.cover_art();
    }
    public static async search(
        {
            offset_Limits = new Offset_limits(),
            mangaIDs,
            ids,
            uploaders,
            locales,
            order,
            includes,
            client
        }: CoverSearchType
    ): Promise<Collection<Cover>>{
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            "includes[]": (includes),
            ...order?.render()
        };
        const getted: Response<any> = await Api_Request.get_methods("cover" + "?" + 
            serialize((new Querry_list_builder<string>("ids", ids!)).build()) + "&" +
            serialize((new Querry_list_builder<string>("uploaders", uploaders!)).build()) + "&" +
            serialize((new Querry_list_builder<string>("manga", mangaIDs!)).build()) + "&" + 
            serialize(((new Querry_list_builder<string>("locales", locales!)).build())) 
        , {
            query: querys
        }, client);
        const data: Array<any> = getted.data.data;
        const mangaArray: Array<Cover> = new Array<Cover>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Cover.build_withAny(data[index]);
        }
        return new CoverCollection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total, {
            offset_Limits : offset_Limits,
            mangaIDs : mangaIDs,
            ids: ids,
            uploaders : uploaders,
            locales : locales,
            order : order,
            includes : includes
        });
    }
    public static async getAOfflineCover(coverId : string, client? : Client) : Promise<Cover>{
        if(await DesktopApi.ping(client) == true){
            const response : Response<any> = await DesktopApi.get_methods(`cover/${coverId}`, undefined, client);
            return Cover.build_withAny(response.data.data);
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public static async getOfflineCoverImage(coverId: string, client?: Client) : Promise<string> {
        const resp : Response<BinaryData> = (await DesktopApi.get_methods("cover/" + coverId + "/image", {
            "responseType" : ResponseType.Binary
        }, client));
        if(resp.ok == true){
            return DesktopApi.get_url() + "cover/" + coverId + "/image";
        }else{
            throw new Error("Cover image for " + coverId + " isn't found");
        }
    }
    public static getOfflineCoverImage_notasync(coverId: string) : string{
        return DesktopApi.get_url() + "cover/" + coverId + "/image";
    }
}