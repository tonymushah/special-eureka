import { Client, Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { RelationshipsTypes } from "../internal/Utils";
import { Attribute } from "./Attributes";
import { Manga, Manga_2 } from "./Manga";
import { User } from "./User";
export class List extends Attribute{
    private name!: string;
    private visibility!: string;
    private version!: number;
    private manga_array! : Array<Manga>;
    public set_name(name: string){
        this.name = name;
    }
    public set_manga_array(manga_array: Array<Manga>){
        this.manga_array = manga_array;
    }
    public set_visibility(visibility: string){
        this.visibility = visibility;
    }
    public set_version(version: number){
        this.version = version;
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
    public static build_w_any_includes_manga(object: any): List{
        const attributes : any = object.attributes;
        const relationships: any = object.relationships;
        const array: Array<Manga> = [];
        const instance : List = new List(
            object.id,
            attributes.name,
            attributes.visibility,
            attributes.version
        );
        instance.set_relationships_Wany(relationships);
        let index = 0;
        for (let index1 = 0; index1 < instance.get_relationships()!.length; index1++) {
            const element = relationships[index1];
            if(element.type == "manga"){
                array[index] = Manga_2.build_any(element);
                index = index + 1;
            }
        }
        instance.set_manga_array(array);
        return instance;
    }
    public static build_w_any(object: any): List{
        const attributes : any = object.attributes;
        const relationships: any = object.relationships;
        const instance : List = new List(
            object.id,
            attributes.name,
            attributes.visibility,
            attributes.version
        );
        instance.set_relationships_Wany(relationships);
        return instance;
    }
    public async build_mangaArray(client?: Client){
        const manga_attributes: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.manga());
        const manga_array: Array<Manga> = new Array<Manga>(manga_attributes.length);
        for (let index = 0; index < manga_attributes.length; index++) {
            const choosed = manga_attributes[index];
            manga_array[index] = await Manga.getMangaByID(choosed.get_id(), client);
        }
        this.set_manga_array(manga_array);
    }
    public async build_and_get_mangaArray(client?: Client): Promise<Array<Manga>>{
        await this.build_mangaArray(client);
        return this.get_manga_array();
    }
    public async getUploaders(client? : Client): Promise<Array<User>>{
        const user_attributes: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.user());
        const user_array: Array<User> = new Array<User>(user_attributes.length);
        for (let index = 0; index < user_attributes.length; index++) {
            const choosed = user_attributes[index];
            user_array[index] = await User.getUserById(choosed.get_id(), client);
        }
        return user_array;
    }
    public get_key_word():string{
        return RelationshipsTypes.custom_list();
    }
    public static get_key_word():string{
        return RelationshipsTypes.custom_list();
    }
    public static async getListByID(id: string, client?: Client): Promise<List>{
        const response: Response<any> = await Api_Request.get_methods("list/" + id, undefined, client);
        return List.build_w_any(response.data.data);
    }
    public static async getListByID_includes_manga(id: string, client?: Client): Promise<List>{
        const response: Response<any> = await Api_Request.get_methods("list/" + id, {
            query : {
                "includes[]" : "manga"
            }
        }, client);
        return List.build_w_any_includes_manga(response.data.data);
    }
    public static async RgetListByID_includes_manga(id: string, client?: Client): Promise<Response<any>>{
        return await Api_Request.get_methods("list/" + id, {
            query : {
                "includes[]" : "manga"
            }
        }, client);
    }
    public getMangaIDList() : Array<string>{
        const mangas_relationships : Array<Attribute> = this.get_some_relationship("manga");
        const returns : Array<string> = [];
        for (let index = 0; index < mangas_relationships.length; index++) {
            returns[index] = mangas_relationships[index].get_id();
        }
        return returns;
    }
}
