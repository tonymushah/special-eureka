import { Client, Response } from "@tauri-apps/api/http";
import { stringify } from "qs";
import { Api_Request } from "../internal/Api_Request";
import { Offset_limits, Order, RelationshipsTypes } from "../internal/Utils";
import { User as StaUser, UserList, UserResponse } from "../sta/data-contracts";
import { Attribute } from "./Attributes";
import { Collection } from "./Collection";
import UserCollection from "./CollectionTypes/UserCollection";
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
    VIP = "ROLE_VIP",
    Unknown = "ROLE_UNKNOWN"
}

export function parse_user_role(str: string): UserRole {
    switch (str) {
        case UserRole.Admin:
            return UserRole.Admin;
        case UserRole.Banned:
            return UserRole.Banned;
        case UserRole.Contributor:
            return UserRole.Contributor;
        case UserRole.Designer:
            return UserRole.Designer;
        case UserRole.Developer:
            return UserRole.Developer;
        case UserRole.Forum_Moderator:
            return UserRole.Forum_Moderator;
        case UserRole.Global_Moderator:
            return UserRole.Global_Moderator;
        case UserRole.Group_Leader:
            return UserRole.Group_Leader;
        case UserRole.Group_Member:
            return UserRole.Group_Member;
        case UserRole.Guest:
            return UserRole.Guest;
        case UserRole.Md_At_Home:
            return UserRole.Md_At_Home;
        case UserRole.Member:
            return UserRole.Member;
        case UserRole.Power_Uploader:
            return UserRole.Power_Uploader;
        case UserRole.Public_Relations:
            return UserRole.Public_Relations;
        case UserRole.Staff:
            return UserRole.Staff;
        case UserRole.Unverified:
            return UserRole.Unverified;
        case UserRole.User:
            return UserRole.User;
        case UserRole.VIP:
            return UserRole.VIP;
        default:
            return UserRole.Unknown;
    }
}

export function parse_user_role_array(array: Array<string>) : UserRole[]{
    return array.map(parse_user_role);
}

export class User extends Attribute {
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