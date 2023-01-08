import { Api_Request } from "../internal/Api_Request";
import { Attribute } from "./Attributes";
import { Response } from "@tauri-apps/api/http";
import {
    Offset_limits,
    Order,
    RelationshipsTypes,
    Querry_list_builder,
    serialize,
} from "../internal/Utils";
import { StringLiteral } from "typescript";
import { Collection } from "./Collection";
import { User } from "./User";
import GroupSearchType from "./SearchType/Group";
import Group_WithAllRelationShip_SearchType from "./SearchType/GroupWAllIncludes";

class GroupCollection extends Collection<Group>{
    private prev_search_type : GroupSearchType;
    /**
     * Getter $prev_search_type
     * @return {GroupSearchType}
     */
	public get $prev_search_type(): GroupSearchType {
		return this.prev_search_type;
	}

    /**
     * Setter $prev_search_type
     * @param {GroupSearchType} value
     */
	public set $prev_search_type(value: GroupSearchType) {
		this.prev_search_type = value;
	}
    constructor(data : Group[], limit : number, offset : number, total: number, previous_search_type: GroupSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<Group>> {
        let new_offset = this.get_offset() + this.get_limit();
        if(new_offset < this.get_total() && new_offset > 0){
            let current_offset_limits = new Offset_limits();
            current_offset_limits.set_limits(this.get_limit());
            current_offset_limits.set_offset(new_offset);
            this.$prev_search_type.offset_Limits = current_offset_limits;
            return Group.search(this.prev_search_type);
        }else{
            throw new Error("no next group");
        }
    }
    public previous(): Promise<Collection<Group>> {
        let new_offset = this.get_offset() - this.get_limit();
        if(new_offset < 0){
            let current_offset_limits = new Offset_limits();
            current_offset_limits.set_limits(this.get_limit());
            current_offset_limits.set_offset(new_offset);
            this.$prev_search_type.offset_Limits = current_offset_limits;
            return Group.search(this.prev_search_type);
        }else{
            throw new Error("no previous group");
        }
    }
}

export class Group extends Attribute {
    protected static group_r: string = "group/";
    private name: string;
    private altNames: any;
    private website: string;
    private ircServer: string;
    private ircChannel: string;
    private discord: string;
    private contactEmail: string;
    private description: string;
    private twitter: string;
    private mangaUpdates: string;
    private focusedLanguage: Array<string>;
    private locked: boolean;
    private official: boolean;
    private inactive: boolean;
    private publishDelay: string;
    private version: number;
    private createdAt: string;
    private updatedAt: string;
    public static get_group_a(): string {
        return Group.group_r;
    }
    public get_name(): string {
        return this.name;
    }
    public get_altNames(): Array<string> {
        return this.altNames;
    }
    public get_website(): string {
        return this.website;
    }
    public get_ircServer(): string {
        return this.ircServer;
    }
    public get_ircChannel(): string {
        return this.ircChannel;
    }
    public get_discord(): string {
        return this.discord;
    }
    public get_contactEmail(): string {
        return this.contactEmail;
    }
    public get_description(): string {
        return this.description;
    }
    public get_twitter(): string {
        return this.twitter;
    }
    public get_mangaUpdates(): string {
        return this.mangaUpdates;
    }
    public get_focusedLanguage(): Array<string> {
        return this.focusedLanguage;
    }
    public get_locked(): boolean {
        return this.locked;
    }
    public get_official(): boolean {
        return this.official;
    }
    public get_inactive(): boolean {
        return this.inactive;
    }
    public get_publishDelay(): string {
        return this.publishDelay;
    }
    public get_createdAt(): string {
        return this.createdAt;
    }
    public get_updatedAt(): string {
        return this.updatedAt;
    }
    public get_version(): number {
        return this.version;
    }

    public set_name(name: string) {
        this.name = name;
    }
    public set_altNames(altNames: Array<string>) {
        this.altNames = altNames;
    }
    public set_website(website: string) {
        this.website = website;
    }
    public set_ircServer(ircServer: string) {
        this.ircServer = ircServer;
    }
    public set_ircChannel(ircChannel: string) {
        this.ircChannel = ircChannel;
    }
    public set_discord(discord: string) {
        this.discord = discord;
    }
    public set_contactEmail(contactEmail: string) {
        this.contactEmail = contactEmail;
    }
    public set_description(description: string) {
        this.description = description;
    }
    public set_twitter(twitter: string) {
        this.twitter = twitter;
    }
    public set_mangaUpdates(mangaUpdates: string) {
        this.mangaUpdates = mangaUpdates;
    }
    public set_focusedLanguage(focusedLanguage: Array<string>) {
        this.focusedLanguage = focusedLanguage;
    }
    public set_locked(locked: boolean) {
        this.locked = locked;
    }
    public set_official(official: boolean) {
        this.official = official;
    }
    public set_inactive(inactive: boolean) {
        this.inactive = inactive;
    }
    public set_publishDelay(publishDelay: string) {
        this.publishDelay = publishDelay;
    }
    public set_createdAt(createdAt: string) {
        this.createdAt = createdAt;
    }
    public set_updatedAt(updatedAt: string) {
        this.updatedAt = updatedAt;
    }
    public set_version(version: number) {
        this.version = version;
    }
    public constructor(
        id: string,
        name: string,
        altNames: any,
        website: string,
        ircServer: string,
        ircChannel: string,
        discord: string,
        contactEmail: string,
        description: string,
        twitter: string,
        mangaUpdates: string,
        focusedLanguage: Array<string>,
        locked: boolean,
        official: boolean,
        inactive: boolean,
        publishDelay: string,
        version: number,
        createdAt: string,
        updatedAt: string
    ) {
        super(id, "scanlation_group");
        this.set_name(name);
        this.set_altNames(altNames);
        this.set_website(website);
        this.set_ircServer(ircServer);
        this.set_ircChannel(ircChannel);
        this.set_discord(discord);
        this.set_contactEmail(contactEmail);
        this.set_description(description);
        this.set_twitter(twitter);
        this.set_mangaUpdates(mangaUpdates);
        this.set_focusedLanguage(focusedLanguage);
        this.set_locked(locked);
        this.set_official(official);
        this.set_inactive(inactive);
        this.set_publishDelay(publishDelay);
        this.set_createdAt(createdAt);
        this.set_updatedAt(updatedAt);
        this.set_version(version);
    }
    public static build_wANY(object: any): Group {
        let attributes: any = object.attributes;
        let relationships: any = object.relationships;
        let instance: Group = new Group(
            object.id,
            attributes.name,
            attributes.altNames,
            attributes.website,
            attributes.ircServer,
            attributes.ircChannel,
            attributes.discord,
            attributes.contactEmail,
            attributes.description,
            attributes.twitter,
            attributes.mangaUpdates,
            attributes.focusedLanguage,
            attributes.locked,
            attributes.official,
            attributes.inactive,
            attributes.publishDelay,
            attributes.version,
            attributes.createdAt,
            attributes.updatedAt
        );
        try {
            instance.set_relationships_Wany(relationships);
        } catch (e) { }

        return instance;
    }
    public static async get_groupById(id: string): Promise<Group> {
        try {
            let getted: Promise<Response<any>> = Api_Request.get_methods(
                Group.get_group_a() + id
            );
            let to_use = await getted;
            return Group.build_wANY(to_use.data.data);
        } catch (error) {
            throw new Error(error);
        }
    }
    public static async search({
        offset_Limits = new Offset_limits(),
        name,
        ids,
        focusedLanguage,
        includes,
        order,
    }: GroupSearchType): Promise<Collection<Group>> {
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            name: name,
            "includes[]": includes,
            ...order?.render(),
        };
        let getted: Response<any> = await Api_Request.get_methods(
            "group" +
            "?" +
            serialize(new Querry_list_builder("ids", ids!).build()) +
            "&" +
            serialize(
                new Querry_list_builder("focusedLanguage", focusedLanguage!).build()
            ) +
            "&",
            {
                query: querys,
            }
        );
        let data: Array<any> = getted.data.data;
        let mangaArray: Array<Group> = new Array<Group>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Group.build_wANY(data[index]);
        }
        return new GroupCollection(
            mangaArray,
            getted.data.limit,
            getted.data.offset,
            getted.data.total,
            {
                offset_Limits : offset_Limits,
                name : name,
                ids : ids,
                focusedLanguage : focusedLanguage,
                includes : includes,
                order : order,
            }
        );
    }
    public get_key_word(): string {
        return RelationshipsTypes.scanlation_group();
    }
    public getLeaderID(): string {
        return this.get_some_relationship("leader")[0].get_id();
    }
    public getMembersID(): Array<string> {
        return this.get_some_relationship("member").map<string>((value) =>
            value.get_id()
        );
    }
    public async getLeader(): Promise<User> {
        return await User.getUserById(
            this.get_some_relationship("leader")[0].get_id()
        );
    }
    public async getMembers(): Promise<Array<User>> {
        let members = this.get_some_relationship("member");
        let members_ = new Array<User>(members.length);
        for (let index = 0; index < members.length; index++) {
            const element = members[index];
            members_.push(await User.getUserById(element.get_id()));
        }
        return members_;
    }
    public async getMemberById(id: string): Promise<User> {
        let members = this.get_some_relationship("member");
        for (let index = 0; index < members.length; index++) {
            const element = members[index];
            if (element.get_id() == id) {
                return await User.getUserById(element.get_id());
            }
        }
        throw new Error(
            `this user ${id} is not a member of the group ${this.get_id()}`
        );
    }
}

class Group_WithAllRelationShip_Collection extends Collection<Group_WithAllRelationShip>{
    private prev_search_type : Group_WithAllRelationShip_SearchType;
    /**
     * Getter $prev_search_type
     * @return {Group_WithAllRelationShip_SearchType}
     */
	public get $prev_search_type(): Group_WithAllRelationShip_SearchType {
		return this.prev_search_type;
	}

    /**
     * Setter $prev_search_type
     * @param {Group_WithAllRelationShip_SearchType} value
     */
	public set $prev_search_type(value: Group_WithAllRelationShip_SearchType) {
		this.prev_search_type = value;
	}
    constructor(data : Group_WithAllRelationShip[], limit : number, offset : number, total: number, previous_search_type: Group_WithAllRelationShip_SearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<Group_WithAllRelationShip>> {
        let new_offset = this.get_offset() + this.get_limit();
        if(new_offset < this.get_total() && new_offset > 0){
            let current_offset_limits = new Offset_limits();
            current_offset_limits.set_limits(this.get_limit());
            current_offset_limits.set_offset(new_offset);
            this.$prev_search_type.offset_Limits = current_offset_limits;
            return Group_WithAllRelationShip.search(this.prev_search_type);
        }else{
            throw new Error("no next group");
        }
    }
    public previous(): Promise<Collection<Group_WithAllRelationShip>> {
        let new_offset = this.get_offset() - this.get_limit();
        if(new_offset < 0){
            let current_offset_limits = new Offset_limits();
            current_offset_limits.set_limits(this.get_limit());
            current_offset_limits.set_offset(new_offset);
            this.$prev_search_type.offset_Limits = current_offset_limits;
            return Group_WithAllRelationShip.search(this.prev_search_type);
        }else{
            throw new Error("no previous group");
        }
    }
}

export class Group_WithAllRelationShip extends Group {
    private leader: User;
    private members: Array<User>;

    /**
     * Getter $leader
     * @return {User}
     */
    public get $leader(): User {
        return this.leader;
    }

    /**
     * Setter $leader
     * @param {User} value
     */
    public set $leader(value: User) {
        this.leader = value;
    }

    /**
     * Getter $members
     * @return {Array<User>}
     */
    public get $members(): Array<User> {
        return this.members;
    }

    /**
     * Setter $members
     * @param {Array<User>} value
     */
    public set $members(value: Array<User>) {
        this.members = value;
    }

    constructor(
        id: string,
        name: string,
        altNames: any,
        website: string,
        ircServer: string,
        ircChannel: string,
        discord: string,
        contactEmail: string,
        description: string,
        twitter: string,
        mangaUpdates: string,
        focusedLanguage: Array<string>,
        locked: boolean,
        official: boolean,
        inactive: boolean,
        publishDelay: string,
        version: number,
        createdAt: string,
        updatedAt: string
    ) {
        super(
            id,
            name,
            altNames,
            website,
            ircServer,
            ircChannel,
            discord,
            contactEmail,
            description,
            twitter,
            mangaUpdates,
            focusedLanguage,
            locked,
            official,
            inactive,
            publishDelay,
            version,
            createdAt,
            updatedAt
        );
    }
    public static build_wANY(object: any): Group_WithAllRelationShip {
        let attributes: any = object.attributes;
        let relationships: any = object.relationships;
        let instance: Group_WithAllRelationShip = new Group_WithAllRelationShip(
            object.id,
            attributes.name,
            attributes.altNames,
            attributes.website,
            attributes.ircServer,
            attributes.ircChannel,
            attributes.discord,
            attributes.contactEmail,
            attributes.description,
            attributes.twitter,
            attributes.mangaUpdates,
            attributes.focusedLanguage,
            attributes.locked,
            attributes.official,
            attributes.inactive,
            attributes.publishDelay,
            attributes.version,
            attributes.createdAt,
            attributes.updatedAt
        );
        try {
            instance.set_relationships_Wany(relationships);
        } catch (e) { }
        try {
            let leader = Attribute.get_some_relationship(relationships, "leader");
            instance.$leader = User.build_wANY(leader[0]);
        } catch (e) { }
        try {
            let members_: Array<User> = [];
            let all_member: Array<any> = Attribute.get_some_relationship(
                relationships,
                "member"
            );
            for (let index = 0; index < all_member.length; index++) {
                try {
                    const element = all_member[index];
                    members_[index] = User.build_wANY(element);
                } catch (error) { }
            }
            instance.$members = members_;
        } catch (error) { }
        return instance;
    }
    public static async get_groupById(id: string): Promise<Group_WithAllRelationShip> {
        try {
            let getted: Promise<Response<any>> = Api_Request.get_methods(
                Group.get_group_a() + id + "?" + 
                serialize(
                    new Querry_list_builder("includes", [
                        "leader",
                        "member"
                    ]).build()
                )
            );
            let to_use = await getted;
            return Group_WithAllRelationShip.build_wANY(to_use.data.data);
        } catch (error) {
            throw new Error(error);
        }
    }
    public static async search({
        offset_Limits,
        name,
        ids,
        focusedLanguage,
        order,
    }: Group_WithAllRelationShip_SearchType): Promise<Collection<Group_WithAllRelationShip>> {
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            name: name,
            ...order?.render(),
        };
        let getted: Response<any> = await Api_Request.get_methods(
            "group" +
            "?" +
            serialize(new Querry_list_builder("ids", ids!).build()) +
            "&" +
            serialize(
                new Querry_list_builder("focusedLanguage", focusedLanguage!).build()
            ) +
            "&" + serialize (
                new Querry_list_builder("includes", [
                    "leader",
                    "member"
                ]).build()
            ),
            {
                query: querys,
            }
        );
        let data: Array<any> = getted.data.data;
        let mangaArray: Array<Group_WithAllRelationShip> = new Array<Group_WithAllRelationShip>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Group_WithAllRelationShip.build_wANY(data[index]);
        }
        return new Group_WithAllRelationShip_Collection(
            mangaArray,
            getted.data.limit,
            getted.data.offset,
            getted.data.total,
            {
                offset_Limits : offset_Limits,
                name : name,
                ids : ids,
                focusedLanguage : focusedLanguage,
                order : order,
            }
        );
    }
    public async getLeader(): Promise<User> {
        return this.$leader;
    }
    public async getMembers(): Promise<User[]> {
        return this.$members;
    }
    public async getMemberById(id: string): Promise<User> {
        for (let index = 0; index < this.$members.length; index++) {
            const element = this.$members[index];
            if(element.get_id() == id){
                return element;
            }
        }
        throw new Error(
            `this user ${id} is not a member of the group ${this.get_id()}`
        );
    }
}
