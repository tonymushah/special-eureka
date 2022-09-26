import { Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Upload } from "../internal/Upload_Retrieve";
import { Offset_limits, Order, RelationshipsTypes } from "../internal/Utils";
import { Attribute } from "./Attributes";
import { Group } from "./Group";
import { Manga } from "./Manga";
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
        ids?: string,
        title?: string,
        group?: string,
        uploader?: any,
        manga?: string,
        volume?: any,
        translatedLanguage?: string,
        originalLanguage?: string,
        excludedOriginalLanguage?: string,
        content_rating?: string,
        excludedGroup?: string,
        excludedUploaders?: string,
        includeFutureUpdates?: number,
        createdAtSince?: string,
        updatedAtSince?: string,
        publishAtSince?: string,
        order? : Order,
        includes?: string
    ): Promise<Array<Chapter>| Response<any>>{
        let querys: any = {
            limit: JSON.stringify(offset_limits.get_limits()),
            offset: JSON.stringify(offset_limits.get_offset()),
            "ids[]": (ids!),
            title: (title!),
            "groups[]": (group!),
            uploader: (uploader!),
            manga: (manga!),
            volume: JSON.stringify(volume!),
            "translatedLanguage[]": (translatedLanguage!),
            "originalLanguage[]": (originalLanguage!),
            "excludedOriginalLanguage[]": (excludedOriginalLanguage!),
            "content_rating[]": (content_rating!),
            "excludedGroup[]": (excludedGroup!),
            "excludedUploaders[]": (excludedUploaders!),
            includeFutureUpdates: (includeFutureUpdates!),
            createdAtSince: (createdAtSince!),
            updatedAtSince: (updatedAtSince!),
            publishAtSince: (publishAtSince!),
            ...order?.render(),
            "includes[]": (includes!)
        }
        var getted: Response<any> = await Api_Request.Sget_methods("chapter", {
            query: querys
        });
        if(getted.status == 200){
            var data: Array<any> = getted.data.data;
            var mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
            for (let index = 0; index < data.length; index++) {
                mangaArray[index] = Chapter.build_W_Any(data[index]);
            }
            return mangaArray;
        }else{
            return getted;
        }
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
}
export class Chapters{
    private name: string;
    private ids: Array<string>;
    private count: number;
    private chapters: Array<Chapter>;
    public set_name(name: string){
        this.name = name;
    }
    public set_ids(ids: Array<string>){
        this.ids = ids;
    }
    public set_count(count: number){
        this.count = count;
    }
    public set_chapters(chapters: Array<Chapter>){
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
    public get_chapters(): Array<Chapter>{
        return this.chapters;
    }
    public constructor(name: string, ids: Array<string>, count: number){
        this.set_name(name);
        this.set_ids(ids);
        this.set_count(count);
    }
    public async initialize_chapters(){
        var to_input: Array<Chapter> = new Array<Chapter>(this.count);
        for (let index = 0; index < to_input.length; index++) {
            to_input[index] = await Chapter.get_ChapterbyId(this.ids[index]);
        }
        this.set_chapters(to_input);
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
}