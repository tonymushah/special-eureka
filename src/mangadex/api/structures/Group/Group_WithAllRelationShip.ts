import { Client, Response } from "@tauri-apps/api/http";
import { stringify } from "qs";
import { Api_Request } from "../../internal/Api_Request";
import { LocalizedString, Relationship, ScanlationGroup, ScanlationGroupAttributes, ScanlationGroupList, ScanlationGroupResponse, User as StaUser } from "../../sta/data-contracts";
import Attribute from "../Attributes";
import Collection from "../Collection";
import Group_WithAllRelationShip_Collection from "../CollectionTypes/Group_WithAllRelationShip_Collection";
import Group_WithAllRelationShip_SearchType from "../SearchType/GroupWAllIncludes";
import { User } from "../User";
import Group from "./Group";

export default class Group_WithAllRelationShip extends Group {
    private leader!: User;
    private members!: Array<User>;

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
        altNames: LocalizedString[],
        website: string | null,
        ircServer: string | null,
        ircChannel: string | null,
        discord: string | null,
        contactEmail: string | null,
        description: string | null,
        twitter: string | null,
        mangaUpdates: string | null,
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
    public static build_wANY(object: ScanlationGroup): Group_WithAllRelationShip {
        const attributes: ScanlationGroupAttributes = object.attributes;
        const relationships: Relationship[] = object.relationships;
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
            attributes.focusedLanguage ?? [],
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
        // eslint-disable-next-line no-empty
        } catch (e) { }
        try {
            const leader : Array<StaUser> = Attribute.get_some_relationship(relationships, "leader");
            instance.$leader = User.build_wANY(leader[0]);
        // eslint-disable-next-line no-empty
        } catch (e) { }
        try {
            const members_: Array<User> = [];
            const all_member: Array<StaUser> = Attribute.get_some_relationship(
                relationships,
                "member"
            );
            for (let index = 0; index < all_member.length; index++) {
                try {
                    const element = all_member[index];
                    members_[index] = User.build_wANY(element);
                // eslint-disable-next-line no-empty
                } catch (error) { }
            }
            instance.$members = members_;
        // eslint-disable-next-line no-empty
        } catch (error) { }
        instance.set_verified(attributes.verified);
        return instance;
    }
    public static async get_groupById(id: string, client?: Client): Promise<Group_WithAllRelationShip> {
        try {
            const getted: Promise<Response<ScanlationGroupResponse>> = Api_Request.get_methods(
                Group.get_group_a() + id + "?" +
                stringify({
                    includes : [
                        "leader",
                        "member"
                    ]
                }),
                undefined,
                client
            );
            const to_use = await getted;
            return Group_WithAllRelationShip.build_wANY(to_use.data.data);
        } catch (error) {
            if (typeof error == "string") {
                throw new Error(error);
            } else {
                throw new Error("unknown error", {
                    cause: error
                });
            }
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
        const querys = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            name: name,
            order,
            ids,
            focusedLanguage,
            includes : [
                "leader",
                    "member"
            ]
        };
        const getted: Response<ScanlationGroupList> = await Api_Request.get_methods(
            "group" +
            "?" +
            stringify(querys),
            undefined,
            client
        );
        const data: Array<ScanlationGroup> = getted.data.data;
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
                offset_Limits: offset_Limits,
                name: name,
                ids: ids,
                focusedLanguage: focusedLanguage,
                order: order,
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
            if (element.get_id() == id) {
                return element;
            }
        }
        throw new Error(
            `this user ${id} is not a member of the group ${this.get_id()}`
        );
    }
}
