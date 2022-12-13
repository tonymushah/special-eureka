import { Response, ResponseType } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Upload } from "../internal/Upload_Retrieve";
import { Offset_limits, Order, RelationshipsTypes, Querry_list_builder, serialize } from "../internal/Utils";
import { Attribute } from "./Attributes";
import { Manga } from "./Manga";
import DesktopApi from "../offline/DeskApiRequest";
import DeskApiRequest from "../offline/DeskApiRequest";

export class Cover extends Attribute{
    private description: string;
    private volume: number;
    private file_name: string;
    private locale: string;
    private createdAt: string;
    private updatedAt: string;
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
        let instance : Cover = new Cover(
            id,
            description,
            volume,
            file_name,
            locale,
            createdAt,
            updatedAt
        )
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
        let instance : Cover = new Cover(
            id,
            description,
            volume,
            file_name,
            locale,
            createdAt,
            updatedAt
        )
        try {
            instance.set_relationships_Wany(relationship);
        } catch (error) {
        }
        
        return instance;
    }
    public static build_withAny(
        object: any
    ): Cover{
        let attributes = object.attributes;
        let relationships = object.relationships;
        let instance = new Cover(
            object.id,
            attributes.description,
            attributes.volume,
            attributes.fileName,
            attributes.locale,
            attributes.createdAt,
            attributes.updated_at
        )
        try {
            instance.set_relationships_Wany(relationships);
        } catch (error) {
        }
        
        return instance;
    }
    public static async getOnlineByID(id: string): Promise<Cover>{
        let getted = await Api_Request.get_methods("cover/" + id);
        let instance = Cover.build_withAny(getted.data.data);
        return instance;
    }
    // [ ] get a cover by his id 
    public static async getById(id: string): Promise<Cover>{
        if(await DeskApiRequest.ping()){
            try{
                return await Cover.getAOfflineCover(id);
            }catch(e){
                return await Cover.getOnlineByID(id);
            }
        }else{
            return await Cover.getOnlineByID(id);
        }
    }
    // [x] get the manga relative 
    public async get_manga_relative(): Promise<Manga>{
        try {
            for (let index = 0; index < this.get_relationships()!.length; index++) {
                const lol = this.get_relationships()![index];
                if(lol.get_type() == "manga"){
                    return await Manga.getMangaByID(lol.get_id());
                }
            }
            throw new Error("this conver has no relative Manga");
        } catch (error) {
            throw new Error("this conver has no relationships");
        }
    }
    // [ ] get the cover path 
        // [ ] {256, 512}
        public get_CoverImageOnline_thumbnail(size: number): string{
            return Upload.make_upload_url("covers/" + this.get_some_relationship("manga")[0].get_id() + "/" + this.get_file_name() + "." + size +".jpg");
        }
        // [ ] original
        public get_CoverImageOnline(): string{
            return Upload.make_upload_url("covers/" + this.get_some_relationship("manga")![0].get_id() + "/" + this.get_file_name());
        }
        public async get_CoverImage_promise() : Promise<string>{
            try {
                return await Cover.getOfflineCoverImage(this.get_id())
            } catch (error) {
                return this.get_CoverImageOnline();
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
            includes
        }:{
            offset_Limits : Offset_limits,
            mangaIDs?: Array<string>,
            ids?: Array<string>,
            uploaders?: Array<string>,
            locales?: Array<string>,
            order?: Order, 
            includes? : string
        }
    ): Promise<Array<Cover>>{
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            "includes[]": (includes),
            ...order?.render()
        };
        let getted: Response<any> = await Api_Request.get_methods("cover" + "?" + 
            serialize((new Querry_list_builder<string>("ids", ids!)).build()) + "&" +
            serialize((new Querry_list_builder<string>("uploaders", uploaders!)).build()) + "&" +
            serialize((new Querry_list_builder<string>("manga", mangaIDs!)).build()) + "&" + 
            serialize(((new Querry_list_builder<string>("locales", locales!)).build())) 
        , {
            query: querys
        });
        let data: Array<any> = getted.data.data;
        let mangaArray: Array<Cover> = new Array<Cover>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Cover.build_withAny(data[index]);
        }
        return mangaArray;
    }
    public static async getAOfflineCover(coverId : string) : Promise<Cover>{
        if(await DesktopApi.ping() == true){
            let response : Response<any> = await DesktopApi.get_methods(`cover/${coverId}`);
            return Cover.build_withAny(response.data.data);
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public static async getOfflineCoverImage(coverId: string) : Promise<string> {
        let resp : Response<BinaryData> = (await DesktopApi.get_methods("cover/" + coverId + "/image", {
            "responseType" : ResponseType.Binary
        }));
        if(resp.ok == true){
            return DesktopApi.get_url() + "cover/" + coverId + "/image";
        }else{
            throw new Error("Cover image for " + coverId + " isn't found");
        }
    }
}