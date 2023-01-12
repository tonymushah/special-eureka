import { Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Offset_limits, Order, RelationshipsTypes, Querry_list_builder, serialize } from "../internal/Utils";
import { Attribute } from "./Attributes";
import { Collection } from "./Collection";
import UserSearchType from "./SearchType/User";

class UserCollection extends Collection<User>{
    private prev_search_type : UserSearchType;
    /**
     * Getter $prev_search_type
     * @return {UserSearchType}
     */
	public get $prev_search_type(): UserSearchType {
		return this.prev_search_type;
	}

    /**
     * Setter $prev_search_type
     * @param {UserSearchType} value
     */
	public set $prev_search_type(value: UserSearchType) {
		this.prev_search_type = value;
	}
    constructor(data : User[], limit : number, offset : number, total: number, previous_search_type: UserSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<User>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() + this.get_limit();
            if(new_offset <= this.get_total() && new_offset >= 0){
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(User.search(this.prev_search_type));
            }else{
                reject(new Error("no next user"));
            }
        });
        
    }
    public previous(): Promise<Collection<User>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() - this.get_limit();
            if(new_offset <= this.get_total() && new_offset >= 0){
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(User.search(this.prev_search_type));
            }else{
                reject(new Error("no previous user"));
            }
        });
        
    }
}

class UserCollectionWToken extends Collection<User>{
    private prev_search_type : UserSearchType;
    private token : string;
    /**
     * Getter $prev_search_type
     * @return {UserSearchType}
     */
	public get $prev_search_type(): UserSearchType {
		return this.prev_search_type;
	}

    /**
     * Setter $prev_search_type
     * @param {UserSearchType} value
     */
	public set $prev_search_type(value: UserSearchType) {
		this.prev_search_type = value;
	}
    /**
     * Getter $token
     * @return {string}
     */
	public get $token(): string {
		return this.token;
	}

    /**
     * Setter $token
     * @param {string} value
     */
	public set $token(value: string) {
		this.token = value;
	}
    constructor(data : User[], limit : number, offset : number, total: number, token : string, previous_search_type: UserSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
        this.$token = token;
    }
    public next(): Promise<Collection<User>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() + this.get_limit();
            if(new_offset <= this.get_total() && new_offset >= 0){
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(User.search_user_wtoken(this.$token, this.prev_search_type));
            }else{
                reject(new Error("no next user"));
            }
        });
        
    }
    public previous(): Promise<Collection<User>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() - this.get_limit();
            if(new_offset <= this.get_total() && new_offset >= 0){
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(User.search_user_wtoken(this.$token, this.prev_search_type));
            }else{
                reject(new Error("no previous user"));
            }
        });
        
    }
}


export class User extends Attribute{
    private username: string;
    private roles: Array<string>;
    private version: number;
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
        let attributes :any = object.attributes;
        let relationships: any = object.relationships;
        let instance: User = new User(object.id, attributes.username, attributes.roles, attributes.version);
        try{
            instance.set_relationships_Wany(relationships);
        }catch(e){
        }
        
        return instance;
    }
    public static async getUserById(id: string): Promise<User>{
        let getted: Response<any> = await Api_Request.get_methods("user/" + id);
        let instance: User = User.build_wANY(getted.data.data);
        return instance;
    }
    public static async search( 
        {
            offset_Limits = new Offset_limits(),
            username,
            ids,
            order
        } : UserSearchType
    ): Promise<Collection<User>>{
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            username: JSON.stringify(username),
            ...order?.render()
        }
        let getted: Response<any> = await Api_Request.get_methods("user?" + 
            serialize((new Querry_list_builder("ids", ids!)).build())
        , {
            query: querys
        });
        let data: Array<any> = getted.data.data;
        let mangaArray: Array<User> = new Array<User>(data.length);
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
            order
        } : {
            offset_Limits: Offset_limits, 
            username?: string, 
            ids?: Array<string>, 
            order?: Order
        }
    ): Promise<Collection<User>>{
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            username: JSON.stringify(username),
            ...order?.render()
        }
        let getted: Response<any> = await Api_Request.get_methods("user?" + serialize((new Querry_list_builder("ids", ids!)).build(),), {
            query: querys,
            headers: {
                Authorization: "Bearer " + token
            }
        });
        let data: Array<any> = getted.data.data;
        let mangaArray: Array<User> = new Array<User>(data.length);
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