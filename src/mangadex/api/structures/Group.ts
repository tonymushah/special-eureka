import { Api_Request } from "../internal/Api_Request";
import { Attribute } from "./Attributes";
import { Client, Response } from "@tauri-apps/api/http";
import {
    Offset_limits,
    RelationshipsTypes,
    Querry_list_builder,
    serialize,
} from "../internal/Utils";
import { Collection } from "./Collection";
import { User } from "./User";
import GroupSearchType from "./SearchType/Group";
import Group_WithAllRelationShip_SearchType from "./SearchType/GroupWAllIncludes";
import { Manga } from "./Manga";
import { Chapter } from "./Chapter";
import GroupCollection from "./CollectionTypes/GroupCollection";
import Group_WithAllRelationShip_Collection from "./CollectionTypes/Group_WithAllRelationShip_Collection";

export class Group extends Attribute {
    protected static group_r = "group/";
    private name!: string;
    private altNames: any;
    private website!: string;
    private ircServer!: string;
    private ircChannel!: string;
    private discord!: string;
    private contactEmail!: string;
    private description!: string;
    private twitter!: string;
    private mangaUpdates!: string;
    private focusedLanguage!: Array<string>;
    private locked!: boolean;
    private official!: boolean;
    private inactive!: boolean;
    private publishDelay!: string;
    private version!: number;
    private createdAt!: string;
    private updatedAt!: string;
    private verified!: boolean;
    public static get_group_a(): string {
        return Group.group_r;
    }
    public get_verified(): boolean{
        return this.verified;
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
    public set_verified(verified: boolean){
        this.verified = verified;
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
        const attributes: any = object.attributes;
        const relationships: any = object.relationships;
        const instance: Group = new Group(
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
        instance.set_verified(attributes.verified);
        return instance;
    }
    public static async get_groupById(id: string, client?: Client): Promise<Group> {
        try {
            const getted: Promise<Response<any>> = Api_Request.get_methods(
                Group.get_group_a() + id
            , undefined, client);
            const to_use = await getted;
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
        client
    }: GroupSearchType): Promise<Collection<Group>> {
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            name: name,
            "includes[]": includes,
            ...order?.render(),
        };
        const getted: Response<any> = await Api_Request.get_methods(
            "group" +
            "?" +
            serialize(new Querry_list_builder("ids", ids!).build()) +
            "&" +
            serialize(
                new Querry_list_builder("focusedLanguage", focusedLanguage!).build()
            ),
            {
                query: querys,
            },
            client
        );
        const data: Array<any> = getted.data.data;
        const mangaArray: Array<Group> = new Array<Group>(data.length);
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
    public async getLeader(client?: Client): Promise<User> {
        return await User.getUserById(
            this.get_some_relationship("leader")[0].get_id(),
            client
        );
    }
    public async getMembers(client?: Client): Promise<Array<User>> {
        const members = this.get_some_relationship("member");
        const members_ = new Array<User>(members.length);
        for (let index = 0; index < members.length; index++) {
            const element = members[index];
            members_.push(await User.getUserById(element.get_id(), client));
        }
        return members_;
    }
    public async getMemberById(id: string, client?: Client): Promise<User> {
        const members = this.get_some_relationship("member");
        for (let index = 0; index < members.length; index++) {
            const element = members[index];
            if (element.get_id() == id) {
                return await User.getUserById(element.get_id(), client);
            }
        }
        throw new Error(
            `this user ${id} is not a member of the group ${this.get_id()}`
        );
    }
    public async getTitle(offset_Limits?: Offset_limits, client?: Client) : Promise<Collection<Manga>>{
        if(offset_Limits == undefined){
            offset_Limits = new Offset_limits();
        }
        return Manga.search({
            offset_Limits : offset_Limits,
            group : this.get_id(),
            client : client
        });
    }
    public async getFeed(offset_Limits?: Offset_limits, client?: Client) : Promise<Collection<Chapter>>{
        if(offset_Limits == undefined){
            offset_Limits = new Offset_limits();
        }
        return Chapter.search({
            offset_limits: offset_Limits,
            group : [
                this.get_id()
            ],
            client: client
        });
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
        const attributes: any = object.attributes;
        const relationships: any = object.relationships;
        const instance: Group_WithAllRelationShip = new Group_WithAllRelationShip(
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
            const leader = Attribute.get_some_relationship(relationships, "leader");
            instance.$leader = User.build_wANY(leader[0]);
        } catch (e) { }
        try {
            const members_: Array<User> = [];
            const all_member: Array<any> = Attribute.get_some_relationship(
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
        instance.set_verified(attributes.verified);
        return instance;
    }
    public static async get_groupById(id: string, client? : Client): Promise<Group_WithAllRelationShip> {
        try {
            const getted: Promise<Response<any>> = Api_Request.get_methods(
                Group.get_group_a() + id + "?" + 
                serialize(
                    new Querry_list_builder("includes", [
                        "leader",
                        "member"
                    ]).build()
                ),
                undefined,
                client
            );
            const to_use = await getted;
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
        client
    }: Group_WithAllRelationShip_SearchType): Promise<Collection<Group_WithAllRelationShip>> {
        const querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            name: name,
            ...order?.render(),
        };
        const getted: Response<any> = await Api_Request.get_methods(
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
            },
            client
        );
        const data: Array<any> = getted.data.data;
        const mangaArray: Array<Group_WithAllRelationShip> = new Array<Group_WithAllRelationShip>(data.length);
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
