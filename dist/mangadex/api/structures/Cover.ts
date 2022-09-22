import { Api_Request } from "../internal/Api_Request";
import { Upload } from "../internal/Upload_Retrieve";
import { Attribute } from "./Attributes";
import { Manga } from "./Manga";

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
        var instance : Cover = new Cover(
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
        var instance : Cover = new Cover(
            id,
            description,
            volume,
            file_name,
            locale,
            createdAt,
            updatedAt
        )
        instance.set_relationships_Wany(relationship);
        return instance;
    }
    public static build_withAny(
        object: any
    ): Cover{
        var attributes = object.attributes;
        var relationships = object.relationships;
        var instance = new Cover(
            object.id,
            attributes.description,
            attributes.volume,
            attributes.fileName,
            attributes.locale,
            attributes.createdAt,
            attributes.updated_at
        )
        instance.set_relationships_Wany(relationships);
        return instance;
    }
    // [ ] get a cover by his id 
    public static async getById(id: string): Promise<Cover>{
        var getted = await Api_Request.get_methods("cover/" + id);
        var instance = Cover.build_withAny(getted.data.data);
        return instance;
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
        public get_CoverImage_thumbnail(size: number): string{
            return Upload.make_upload_url("covers/" + this.get_some_relationship("cover_art")[0].get_id() + "/" + this.get_file_name() + "." + size +".jpg");
        }
        // [ ] original
        public get_CoverImage(): string{
            return Upload.make_upload_url("covers/" + this.get_some_relationship("cover_art")![0].get_id() + "/" + this.get_file_name());
        }
    
}