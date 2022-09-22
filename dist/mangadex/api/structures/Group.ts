import { Api_Request } from "../internal/Api_Request";
import { Attribute } from "./Attributes";
import { Response } from "@tauri-apps/api/http";
import { Offset_limits, Order } from "../internal/Utils";
import { StringLiteral } from "typescript";

export class Group extends Attribute{
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
    public static get_group_a(): string{
        return Group.group_r;
    }
    public get_name(): string{
        return this.name;
    }
    public get_altNames(): Array<string>{
        return this.altNames;
    }
    public get_website(): string{
        return this.website;
    }
    public get_ircServer(): string{
        return this.ircServer;
    }
    public get_ircChannel(): string{
        return this.ircChannel;
    }
    public get_discord(): string{
        return this.discord;
    }
    public get_contactEmail(): string{
        return this.contactEmail;
    }
    public get_description(): string{
        return this.description;
    }
    public get_twitter(): string{
        return this.twitter;
    }
    public get_mangaUpdates(): string{
        return this.mangaUpdates;
    }
    public get_focusedLanguage(): Array<string>{
        return this.focusedLanguage;
    }
    public get_locked(): boolean{
        return this.locked;
    }
    public get_official(): boolean{
        return this.official;
    }
    public get_inactive(): boolean{
        return this.inactive;
    }
    public get_publishDelay(): string{
        return this.publishDelay;
    }
    public get_createdAt(): string{
        return this.createdAt;
    }
    public get_updatedAt(): string{
        return this.updatedAt;
    }
    public get_version(): number{
        return this.version;
    }

    public set_name(name: string){
        this.name = name;
    }
    public set_altNames(altNames: Array<string>){
        this.altNames = altNames;
    }
    public set_website(website: string){
        this.website = website;
    }
    public set_ircServer(ircServer: string){
        this.ircServer = ircServer;
    }
    public set_ircChannel(ircChannel: string){
        this.ircChannel = ircChannel;
    }
    public set_discord(discord: string){
        this.discord = discord;
    }
    public set_contactEmail(contactEmail: string){
        this.contactEmail = contactEmail;
    }
    public set_description(description: string){
        this.description = description;
    }
    public set_twitter(twitter: string){
        this.twitter = twitter;
    }
    public set_mangaUpdates(mangaUpdates: string){
        this.mangaUpdates = mangaUpdates;
    }
    public set_focusedLanguage(focusedLanguage: Array<string>){
        this.focusedLanguage = focusedLanguage;
    }
    public set_locked(locked: boolean){
        this.locked = locked;
    }
    public set_official(official: boolean){
        this.official = official;
    }
    public set_inactive(inactive: boolean){
        this.inactive = inactive;
    }
    public set_publishDelay(publishDelay: string){
        this.publishDelay = publishDelay;
    }
    public set_createdAt(createdAt: string){
        this.createdAt = createdAt;
    }
    public set_updatedAt(updatedAt: string){
        this.updatedAt = updatedAt;
    }
    public set_version(version: number){
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
    ){
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
    public static build_wANY(object: any): Group{
        var attributes :any = object.attributes;
        var relationships: any = object.relationships;
        var instance: Group = new Group(
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
        instance.set_relationships_Wany(relationships);
        return instance;
    }
    public static async get_groupById(id:string): Promise<Group>{
        try {
            var getted: Promise<Response<any>> = Api_Request.get_methods(Group.get_group_a() + id);
            var to_use = await getted;
            return Group.build_wANY(to_use.data.data);
        } catch (error) {
            throw new Error(error);
        }
    }
    public static async search(
        offset_Limits: Offset_limits = new Offset_limits(),
        name?: string,
        ids?: string,
        focusedLanguage?: string,
        includes?: Array<string>,
        order?: Order
    ): Promise<Array<Group> | Response<any>>{
        let querys: any = {
            limit: JSON.stringify(offset_Limits.get_limits()),
            offset: JSON.stringify(offset_Limits.get_offset()),
            name: (name),
            "ids[]": JSON.stringify(ids),
            "focusedLanguage[]": (focusedLanguage),
            "includes[]": (includes),
            ...order?.render()
        }
        var getted: Response<any> = await Api_Request.Sget_methods("group", {
            query: querys
        });
        if(getted.status == 200){
            var data: Array<any> = getted.data.data;
            var mangaArray: Array<Group> = new Array<Group>(data.length);
            for (let index = 0; index < data.length; index++) {
                mangaArray[index] = Group.build_wANY(data[index]);
            }
            return mangaArray;
        }else{
            return getted;
        }
    }
}