import { Client, Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Offset_limits, Order, RelationshipsTypes, Querry_list_builder, serialize } from "../internal/Utils";
import { Attribute } from "./Attributes";
import { Collection } from "./Collection";
import UserCollection from "./CollectionTypes/UserCollection";
import UserCollectionWToken from "./CollectionTypes/UserCollectionWToken";
import UserSearchType from "./SearchType/User";

export class User extends Attribute{
    private username!: string;
    private roles!: Array<string>;
    private version!: number;
    public set_username(username: string){
        this.username = username;
    }
    public set_roles(roles: Array<string>){
        this.roles = roles;
    }
    public set_version(version: number){
        this.version = version;
    }
    public get_username(): string{
        return this.username;
    }
    public get_roles(): Array<string>{
        return this.roles;
    }
    public get_version(): number{
        return this.version;
    }
    public constructor(id: string, username: string, roles: Array<string>, version: number){
        super(id, "user");
        this.set_username(username);
        this.set_roles(roles);
        this.set_version(version);
    }
    public static build_wANY(object: any): User{
        const attributes :any = object.attributes;
        const relationships: any = object.relationships;
        const instance: User = new User(object.id, attributes.username, attributes.roles, attributes.version);
        try{
            instance.set_relationships_Wany(relationships);
        }catch(e){
        }
        
        return instance;
    }
    public static async getUserById(id: string, client?: Client): Promise<User>{
        const getted: Response<any> = await Api_Request.get_methods("user/" + id, undefined, client);
        const instance: User = User.build_wANY(getted.data.data);
        return instance;
    }
    public static async search( 
        {
            offset_Limits = new Offset_limits(),
            username,
            ids,
            order,
            client
        } : UserSearchType
    ): Promise<Collection<User>>{
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            username: JSON.stringify(username),
            ...order?.render()
        };
        const getted: Response<any> = await Api_Request.get_methods("user?" + 
            serialize((new Querry_list_builder("ids", ids!)).build())
        , {
            query: querys
        }, client);
        const data: Array<any> = getted.data.data;
        const mangaArray: Array<User> = new Array<User>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = User.build_wANY(data[index]);
        }
        return new UserCollection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total, {
            offset_Limits : offset_Limits,
            username : username,
            ids : ids,
            order : order
        });
    }
    public static async search_user_wtoken(
        token: string,
        {
            offset_Limits = new Offset_limits(),
            username,
            ids,
            order,
            client
        } : {
            offset_Limits: Offset_limits, 
            username?: string, 
            ids?: Array<string>, 
            order?: Order,
            client? : Client
        }
    ): Promise<Collection<User>>{
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            username: JSON.stringify(username),
            ...order?.render()
        };
        const getted: Response<any> = await Api_Request.get_methods("user?" + serialize((new Querry_list_builder("ids", ids!)).build(),), {
            query: querys,
            headers: {
                Authorization: "Bearer " + token
            }
        }, client);
        const data: Array<any> = getted.data.data;
        const mangaArray: Array<User> = new Array<User>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = User.build_wANY(data[index]);
        }
        return new UserCollectionWToken(mangaArray, getted.data.limit, getted.data.offset, getted.data.total, token,{
            offset_Limits : offset_Limits,
            username : username,
            ids : ids,
            order : order
        });
    }
    public get_key_word():string{
        return RelationshipsTypes.user();
    }
}