import { Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Upload } from "../internal/Upload_Retrieve";
import { Offset_limits, Order, RelationshipsTypes, Querry_list_builder } from "../internal/Utils";
import { Aggregate } from "./Aggregate";
import { Attribute } from "./Attributes";
import { Group } from "./Group";
import { Manga, Manga_2 } from "./Manga";
import { User } from "./User";

export class Chapter extends Attribute{
    private title: string;
    private volume: string;
    private pages: number;
    private translatedLanguage: string;
    private externalUrl: string;
    private version: number;
    private createdAt: string;
    private updateAt: string;
    private publishAt: string;
    private readableAt: string;
    private chapNo: number;
    public set_title(title: string){
        this.title = title
    }
    public set_volume(volume: string){
        this.volume = volume
    }
    public set_pages(pages: number){
        this.pages = pages
    }
    public set_translatedLanguage(translatedLanguage: string){
        this.translatedLanguage = translatedLanguage
    }
    public set_externalUrl(externalUrl: string){
        this.externalUrl = externalUrl
    }
    public set_version(version: number){
        this.version = version
    }
    public set_createdAt(createdAt: string){
        this.createdAt = createdAt
    }
    public set_updateAt(updateAt: string){
        this.updateAt = updateAt
    }
    public set_publishAt(publishAt: string){
        this.publishAt = publishAt
    }
    public set_readableAt(readableAt: string){
        this.readableAt = readableAt
    }
    public set_chapter(chapter: number){
        this.chapNo = chapter;
    }

    public get_chapter(): number{
        return this.chapNo;
    }
    public get_title(): string{
        return this.title;
    }
    public get_volume(): string{
        return this.volume;
    }
    public get_pages(): number{
        return this.pages
    }
    public get_translatedLanguage(): string{
        return this.translatedLanguage
    }
    public get_externalUrl(): string{
        return this.externalUrl
    }
    public get_version(): number{
        return this.version
    }
    public get_createdAt(): string{
        return this.createdAt
    }
    public get_updateAt(): string{
        return this.updateAt
    }
    public get_publishAt(): string{
        return this.publishAt
    }
    public get_readableAt(): string{
        return this.readableAt
    }
    public constructor(
        id: string,
        title: string,
        pages: number,
        chapter: number,
        createdAt: string,
        updatedAt: string,
        publishAt: string
    ){
        super(id, "chapter");
        this.set_title(title);
        this.set_pages(pages);
        this.set_chapter(chapter);
        this.set_createdAt(createdAt);
        this.set_updateAt(updatedAt);
        this.set_publishAt(publishAt);
    }
    public static build_W_Any(object: any): Chapter{
        var attributes :any = object.attributes;
        var relationships: any = object.relationships;
        var instance: Chapter = new Chapter(
            object.id,
            attributes.title,
            attributes.pages,
            attributes.chapter,
            attributes.createdAt,
            attributes.updatedAt,
            attributes.publishAt
        );
        instance.set_externalUrl(attributes.externalUrl);
        instance.set_translatedLanguage(attributes.translatedLanguage);
        instance.set_readableAt(attributes.readableAt);
        instance.set_version(attributes.version);
        instance.set_volume(attributes.volume);
        instance.set_relationships_Wany(relationships);
        return instance;
    }
    public static async get_ChapterbyId(id: string): Promise<Chapter> {
        var getted: Response<any> = await Api_Request.get_methods("chapter/" + id);
        var instance: Chapter = Chapter.build_W_Any(getted.data.data);
        return instance;
    }
    public static async search_chapter(
        offset_limits: Offset_limits = new Offset_limits(),
        ids?: Array<string>,
        title?: string,
        group?: Array<string>,
        uploader?: any,
        manga?: string,
        volume?: any,
        translatedLanguage?: Array<string>,
        originalLanguage?: Array<string>,
        excludedOriginalLanguage?: Array<string>,
        content_rating?: Array<string>,
        excludedGroup?: Array<string>,
        excludedUploaders?: Array<string>,
        includeFutureUpdates?: number,
        createdAtSince?: string,
        updatedAtSince?: string,
        publishAtSince?: string,
        order? : Order,
        includes?: string
    ): Promise<Array<Chapter>>{
        let querys: any = {
            limit: JSON.stringify(offset_limits.get_limits()),
            offset: JSON.stringify(offset_limits.get_offset()),
            ...(new Querry_list_builder<string>("ids", ids!)).build(),
            title: (title!),
            ...(new Querry_list_builder<string>("groups", group!)).build(),
            uploader: (uploader!),
            manga: (manga!),
            volume: JSON.stringify(volume!),
            ...(new Querry_list_builder<string>("translatedLanguage", translatedLanguage!)).build(),
            ...(new Querry_list_builder<string>("originalLanguage", originalLanguage!)).build(),
            ...(new Querry_list_builder<string>("excludedOriginalLanguage", excludedOriginalLanguage!)).build(),
            ...(new Querry_list_builder<string>("contentRating", content_rating!)).build(),
            ...(new Querry_list_builder<string>("excludedGroup", excludedGroup!)).build(),
            ...(new Querry_list_builder<string>("excludedUploaders", excludedUploaders!)).build(),
            includeFutureUpdates: (includeFutureUpdates!),
            createdAtSince: (createdAtSince!),
            updatedAtSince: (updatedAtSince!),
            publishAtSince: (publishAtSince!),
            ...order?.render(),
            "includes[]": (includes!)
        }
        var getted: Response<any> = await Api_Request.get_methods("chapter", {
            query: querys
        });
        var data: Array<any> = getted.data.data;
        var mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter.build_W_Any(data[index]);
        }
        return mangaArray;
    }
    public async get_groupUploaders(): Promise<Array<Group>>{
        let group_atribs: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        let groups: Array<Group> = new Array<Group>(group_atribs.length);
        for (let index = 0; index < group_atribs.length; index++) {
            const element = group_atribs[index];
            groups[index] = await Group.get_groupById(element.get_id());
        }
        return groups;
    }
    public get_userUploader(): Promise<User>{
        return User.getUserById(this.get_some_relationship(RelationshipsTypes.user())[0].get_id());
    }
    public async getAggregateList(): Promise<Aggregate>{
        let manga_id: string = this.get_some_relationship("manga")[0].get_id();
        let groupss: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        let groups: Array<string> = Array<string>(this.get_some_relationshipLength(RelationshipsTypes.scanlation_group()));
        for (let index = 0; index < groups.length; index++) {
            const element = groupss[index];
            groups[index] = element.get_id();
        }
        return Aggregate.get_aggregate({
            mangaID : manga_id, 
            translatedLanguage : [this.get_translatedLanguage()], 
            groups: groups
        });
    }
    public async get_next(): Promise<string>{
        return (await this.getAggregateList()).getNext(this.get_id());
    }
    public async get_previous(): Promise<string>{
        return (await this.getAggregateList()).getPrevious(this.get_id());
    }
    public async get_current(): Promise<string>{
        return (await this.getAggregateList()).getCurrent(this.get_id());
    }
}
export class Chapters{
    private name: string;
    private ids: Array<string>;
    private count: number;
    private chapters: Array<Chapter_withAllIncludes>;
    public set_name(name: string){
        this.name = name;
    }
    public set_ids(ids: Array<string>){
        this.ids = ids;
    }
    public set_count(count: number){
        this.count = count;
    }
    public set_chapters(chapters: Array<Chapter_withAllIncludes>){
        this.chapters = chapters;
    }
    public get_name(): string{
        return this.name;
    }
    public get_ids(): Array<string>{
        return this.ids;
    }
    public get_count(): number{
        return this.count;
    }
    public get_chapters(): Array<Chapter_withAllIncludes>{
        return this.chapters;
    }
    public constructor(name: string, ids: Array<string>, count: number){
        this.set_name(name);
        this.set_ids(ids);
        this.set_count(count);
    }
    public async initialize_chapters(){
        var to_input: Array<Chapter_withAllIncludes> = new Array<Chapter_withAllIncludes>(this.count);
        for (let index = 0; index < to_input.length; index++) {
            to_input[index] = await Chapter_withAllIncludes.get_ChapterbyId(this.ids[index]);
        }
        this.set_chapters(to_input);
    }
    public async initialize_and_get_Chapters(): Promise<Array<Chapter_withAllIncludes>>{
        await this.initialize_chapters();
        return this.get_chapters();
    }
    public static build_wANY(object: any): Chapters{
        var ids: Array<string> = [object.id];
        var others: Array<any> = object.others;
        for (let index = 0; index < others.length; index++) {
            ids.push(others[index]);
        }
        var instance: Chapters = new Chapters(object.chapter, ids, object.count);
        return instance;
    }
    public static async build_wANY2(object: any): Promise<Chapters>{
        var instance: Chapters = Chapters.build_wANY(object);
        await instance.initialize_chapters();
        return instance;
    }
    public get_key_word():string{
        return RelationshipsTypes.chapter();
    }
    public is_there(id : string): boolean{
        for (let index = 0; index < this.ids.length; index++) {
            if(this.ids[index] == id){
                return true;
            }
        }
        return false;
    }
}

export class Chapter_withAllIncludes extends Chapter{
    private groups: Array<Group>;
    private uploader: User;
    private manga: Manga;
    public set_groups(groups: Array<Group>){
        this.groups = groups;
    }
    public set_uploader(uploader: User){
        this.uploader = uploader;
    }
    public set_manga(manga: Manga){
        this.manga = manga;
    }
    public get_groups(): Array<Group>{
        return this.groups;
    }
    public get_uploader(): User{
        return this.uploader;
    }
    public get_manga(): Manga{
        return this.manga;
    }
    public constructor(
        id: string,
        title: string,
        pages: number,
        chapter: number,
        createdAt: string,
        updatedAt: string,
        publishAt: string
    ){
        super(
            id,
            title,
            pages,
            chapter,
            createdAt,
            updatedAt,
            publishAt
        )
    }
    public static build_W_Any(object: any): Chapter_withAllIncludes{
        var attributes :any = object.attributes;
        var relationships: any = object.relationships;
        var instance: Chapter_withAllIncludes = new Chapter_withAllIncludes(
            object.id,
            attributes.title,
            attributes.pages,
            attributes.chapter,
            attributes.createdAt,
            attributes.updatedAt,
            attributes.publishAt
        );
        instance.set_externalUrl(attributes.externalUrl);
        instance.set_translatedLanguage(attributes.translatedLanguage);
        instance.set_readableAt(attributes.readableAt);
        instance.set_version(attributes.version);
        instance.set_volume(attributes.volume);
        instance.set_relationships_Wany(relationships);
//        console.log("relationship builded")
        let groups_any: Array<any> = Attribute.get_some_relationship(relationships, "scanlation_group");
        let groups : Array<Group> = []
        for (let index = 0; index < groups_any.length; index++) {
            groups[index] = Group.build_wANY(groups_any[index]);
        }
        instance.set_groups(groups);
//        console.log("group builded")
        instance.set_manga(Manga_2.build_any(Attribute.get_some_relationship(relationships, "manga")[0]));
        console.log("relationship builded")
        instance.set_uploader(User.build_wANY(Attribute.get_some_relationship(relationships, "user")[0]));
//        console.log("uploader builded")
        return instance;
    }
    public static async get_ChapterbyId(id: string): Promise<Chapter_withAllIncludes> {
        var getted: Response<any> = await Api_Request.get_methods("chapter/" + id, {
            query : {
                "includes[0]" : "manga",
                "includes[1]" : "user",
                "includes[2]" : "scanlation_group"
            }
        });
        var instance: Chapter_withAllIncludes = Chapter_withAllIncludes.build_W_Any(getted.data.data);
        return instance;
    }
}