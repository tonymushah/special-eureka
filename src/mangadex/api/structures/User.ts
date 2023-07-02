import { Client, Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Offset_limits, Order, RelationshipsTypes, Querry_list_builder, serialize } from "../internal/Utils";
import { Attribute } from "./Attributes";
import { Collection } from "./Collection";
import UserCollection from "./CollectionTypes/UserCollection";
import UserCollectionWToken from "./CollectionTypes/UserCollectionWToken";
import UserSearchType from "./SearchType/User";

/**
 * [User Role Enum](https://api.mangadex.org/docs/static-data/#user-roles-enum)
 * 
 */
export enum UserRole {
    Admin = "ROLE_ADMIN",
    Banned = "ROLE_BANNED",
    Contributor = "ROLE_CONTRIBUTOR",
    Designer = "ROLE_DESIGNER",
    Developer = "ROLE_DEVELOPER",
    Forum_Moderator = "ROLE_FORUM_MODERATOR",
    Global_Moderator = "ROLE_GLOBAL_MODERATOR",
    Group_Leader = "ROLE_GROUP_LEADER",
    Group_Member = "ROLE_GROUP_MEMBER",
    Guest = "ROLE_GUEST",
    Member = "ROLE_MEMBER",
    Md_At_Home = "ROLE_MD_AT_HOME",
    Power_Uploader = "ROLE_POWER_UPLOADER",
    Public_Relations = "ROLE_PUBLIC_RELATIONS",
    Staff = "ROLE_STAFF",
    Unverified = "ROLE_UNVERIFIED",
    User = "ROLE_USER",
    VIP = "ROLE_VIP"
}

export class User extends Attribute{
    private username!: string;
    private roles!: Array<UserRole>;
    private version!: number;
    public set_username(username: string){
        this.username = username;
    }
    public set_roles(roles: Array<UserRole>){
        this.roles = roles;
    }
    public set_version(version: number){
        this.version = version;
    }
    public get_username(): string{
        return this.username;
    }
    public get_roles(): Array<UserRole>{
        return this.roles;
    }
    public get_version(): number{
        return this.version;
    }
    public constructor(id: string, username: string, roles: Array<UserRole>, version: number){
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