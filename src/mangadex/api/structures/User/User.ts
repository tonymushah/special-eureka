import { Client, Response } from "@tauri-apps/api/http";
import { stringify } from "qs";
import { Api_Request } from "../../internal/Api_Request";
import { Offset_limits, Order, RelationshipsTypes } from "../../internal/Utils";
import { User as StaUser, UserList, UserResponse } from "../../sta/data-contracts";
import Attribute from "../Attributes";
import Collection from "../Collection";
import UserCollection from "../CollectionTypes/UserCollection";
import UserSearchType from "../SearchType/User";
import { UserRole } from "./UserRole";
import { parse_user_role_array } from "./parse_user_role_array";

export default class User extends Attribute {
    private username!: string;
    private roles!: Array<UserRole>;
    private version!: number;
    public set_username(username: string) {
        this.username = username;
    }
    public set_roles(roles: Array<UserRole>) {
        this.roles = roles;
    }
    public set_version(version: number) {
        this.version = version;
    }
    public get_username(): string {
        return this.username;
    }
    public get_roles(): Array<UserRole> {
        return this.roles;
    }
    public get_version(): number {
        return this.version;
    }
    public constructor(id: string, username: string, roles: Array<UserRole>, version: number) {
        super(id, "user");
        this.set_username(username);
        this.set_roles(roles);
        this.set_version(version);
    }
    public static build_wANY(object: StaUser): User {
        const attributes = object.attributes;
        const relationships = object.relationships;
        const instance: User = new User(object.id, attributes.username, parse_user_role_array(attributes.roles), attributes.version);
        try {
            instance.set_relationships_Wany(relationships);
            // eslint-disable-next-line no-empty
        } catch (e) {
            console.error(e);
        }

        return instance;
    }
    public static async getUserById(id: string, client?: Client): Promise<User> {
        const getted: Response<UserResponse> = await Api_Request.get_methods("user/" + id, undefined, client);
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
        }: UserSearchType
    ): Promise<Collection<User>> {
        const querys = {
            limit: offset_Limits.get_limits(),
            offset: offset_Limits.get_offset(),
            username: username,
            order,
            ids
        };
        const getted: Response<UserList> = await Api_Request.get_methods("user?" +
            stringify(querys)
        , undefined, client);
        const data: Array<StaUser> = getted.data.data;
        const mangaArray: Array<User> = new Array<User>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = User.build_wANY(data[index]);
        }
        return new UserCollection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total, {
            offset_Limits: offset_Limits,
            username: username,
            ids: ids,
            order: order
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
        }: {
            offset_Limits: Offset_limits,
            username?: string,
            ids?: Array<string>,
            order?: Order,
            client?: Client
        }
    ): Promise<Collection<User>> {
        const querys = {
            limit: offset_Limits.get_limits(),
            offset: offset_Limits.get_offset(),
            username: username,
            order,
            ids
        };
        const getted: Response<UserList> = await Api_Request.get_methods("user?" +
            stringify(querys)
        , {
            headers: {
                Authorization: "Bearer " + token
            }
        }, client);
        const data: Array<StaUser> = getted.data.data;
        const mangaArray: Array<User> = new Array<User>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = User.build_wANY(data[index]);
        }
        return new UserCollection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total, {
            offset_Limits: offset_Limits,
            username: username,
            ids: ids,
            order: order
        });
    }
    public get_key_word(): string {
        return RelationshipsTypes.user();
    }
}