import { Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { RelationshipsTypes } from "../internal/Utils";
import { Attribute } from "./Attributes";
import { Manga } from "./Manga";
import { User } from "./User";
export class List extends Attribute{
    private name: string;
    private visibility: string;
    private version: number;
    private manga_array: Array<Manga>;
    public set_name(name: string){
        this.name = name;
    }
    public set_manga_array(manga_array: Array<Manga>){
        this.manga_array = manga_array;
    }
    public set_visibility(visibility: string){
        this.visibility = visibility
    }
    public set_version(version: number){
        this.version = version
    }

    public get_manga_array(): Array<Manga>{
        return this.manga_array;
    }
    public get_name(): string{
        return this.name;
    }
    public get_visibility(): string{
        return this.visibility;
    }
    public get_version(): number{
        return this.version;
    }

    public constructor(
        id: string, 
        name: string, 
        visibility: string, 
        version: number
    ){
        super(id, List.get_key_word());
        this.set_name(name);
        this.set_version(version);
        this.set_visibility(visibility);
    }
    public static build_w_any(object: any): List{
        var attributes :any = object.attributes;
        var relationships: any = object.relationships;
        var instance : List = new List(
            object.id,
            attributes.name,
            attributes.visibility,
            attributes.version
        )
        instance.set_relationships_Wany(relationships);
        return instance;
    }
    public async build_mangaArray(){
        let manga_attributes: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.manga());
        let manga_array: Array<Manga> = new Array<Manga>(manga_attributes.length);
        for (let index = 0; index < manga_attributes.length; index++) {
            const choosed = manga_attributes[index];
            manga_array[index] = await Manga.getMangaByID(choosed.get_id());
        }
        this.set_manga_array(manga_array)
    }
    public async build_and_get_mangaArray(): Promise<Array<Manga>>{
        await this.build_mangaArray();
        return this.get_manga_array();
    }
    public async getUploaders(): Promise<Array<User>>{
        let user_attributes: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.user());
        let user_array: Array<User> = new Array<User>(user_attributes.length);
        for (let index = 0; index < user_attributes.length; index++) {
            const choosed = user_attributes[index];
            user_array[index] = await User.getUserById(choosed.get_id());
        }
        return user_array;
    }
    public get_key_word():string{
        return RelationshipsTypes.custom_list();
    }
    public static get_key_word():string{
        return RelationshipsTypes.custom_list();
    }
    public static async getListByID(id: string): Promise<List>{
        var response: Response<any> = await Api_Request.get_methods("list/" + id);
        return List.build_w_any(response.data.data);
    }
}