import { emit } from "@tauri-apps/api/event";
import { Response, ResponseType } from "@tauri-apps/api/http";
import { invoke } from "@tauri-apps/api/tauri";
import { Api_Request } from "../internal/Api_Request";
import { Offset_limits, Order, RelationshipsTypes, Querry_list_builder, serialize, Lang, Languages } from "../internal/Utils";
import DeskApiRequest from "../offline/DeskApiRequest";
import { Aggregate } from "./Aggregate";
import { Attribute } from "./Attributes";
import { At_Home } from "./At_home";
import { Collection } from "./Collection";
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
        let attributes :any = object.attributes;
        let relationships: any = object.relationships;
        let instance: Chapter = new Chapter(
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
        try {
            instance.set_relationships_Wany(relationships);
        } catch (error) {
            
        }
        
        return instance;
    }
    public static async get_ChapterbyId(id: string): Promise<Chapter> {
        if(await DeskApiRequest.ping() == true){
            try {
                return await Chapter.getAOfflineChapter(id);
            } catch (error) {
                let getted: Response<any> = await Api_Request.get_methods("chapter/" + id);
                let instance: Chapter = Chapter.build_W_Any(getted.data.data);
                return instance;
            }
        }else{
            let getted: Response<any> = await Api_Request.get_methods("chapter/" + id);
            let instance: Chapter = Chapter.build_W_Any(getted.data.data);
            return instance;
        }
    }
    public static async search(props : 
        {
            offset_limits: Offset_limits,
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
        }
    ): Promise<Collection<Chapter>>{
        let querys: any = {
            limit: JSON.stringify(props.offset_limits.get_limits()),
            offset: JSON.stringify(props.offset_limits.get_offset()),
            ...(new Querry_list_builder<string>("ids", props.ids!)).build(),
            title: (props.title!),
            ...(new Querry_list_builder<string>("groups", props.group!)).build(),
            uploader: (props.uploader!),
            manga: (props.manga!),
            volume: JSON.stringify(props.volume!),
            ...(new Querry_list_builder<string>("translatedLanguage", props.translatedLanguage!)).build(),
            ...(new Querry_list_builder<string>("originalLanguage", props.originalLanguage!)).build(),
            ...(new Querry_list_builder<string>("excludedOriginalLanguage", props.excludedOriginalLanguage!)).build(),
            ...(new Querry_list_builder<string>("contentRating", props.content_rating!)).build(),
            ...(new Querry_list_builder<string>("excludedGroup", props.excludedGroup!)).build(),
            ...(new Querry_list_builder<string>("excludedUploaders", props.excludedUploaders!)).build(),
            includeFutureUpdates: (props.includeFutureUpdates!),
            createdAtSince: (props.createdAtSince!),
            updatedAtSince: (props.updatedAtSince!),
            publishAtSince: (props.publishAtSince!),
            ...props.order?.render(),
            "includes[]": (props.includes!)
        }
        let getted: Response<any> = await Api_Request.get_methods("chapter", {
            query: querys
        });
        let data: Array<any> = getted.data.data;
        let mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter.build_W_Any(data[index]);
        }
        return new Collection<Chapter>(mangaArray, getted.data.limit, getted.data.offset, getted.data.total);
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
    public static async getAOfflineChapter(chapterID : string): Promise<Chapter_withAllIncludes>{
        if(await DeskApiRequest.ping() == true){
            let response : Response<any> = await DeskApiRequest.get_methods(`chapter/${chapterID}`);
            return Chapter_withAllIncludes.build_W_Any(response.data.data);
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAOfflineChapter_Data(chapterID : string) : Promise<Array<string>> {
        if(await DeskApiRequest.ping() == true){
            let response : Response<{
                data : Array<string>,
                result : string,
                type : string
            }> = await DeskApiRequest.get_methods(`chapter/${chapterID}/data`);
            return response.data.data;
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAOfflineChapter_Data_Saver(chapterID : string) : Promise<Array<string>> {
        if(await DeskApiRequest.ping() == true){
            let response : Response<{
                data : Array<string>,
                result : string,
                type : string
            }> = await DeskApiRequest.get_methods(`chapter/${chapterID}/data-saver`);
            return response.data.data;
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public async getOfflineChapter_Data_Saver() : Promise<Array<string>>{
        return Chapter.getAOfflineChapter_Data_Saver(this.get_id());
    }
    public async getOfflineChapter_Data() : Promise<Array<string>>{
        return Chapter.getAOfflineChapter_Data(this.get_id());
    }
    public static async getAOfflineChapter_Data_Image(chapterID : string, filename : string) : Promise<string> {
        if(await DeskApiRequest.ping() == true){
            return DeskApiRequest.get_url() + `chapter/${chapterID}/data/${filename}`;
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAOfflineChapter_Data_Saver_Image(chapterID : string, filename : string) : Promise<string> {
        if(await DeskApiRequest.ping() == true){
            return DeskApiRequest.get_url() + `chapter/${chapterID}/data/${filename}`;
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public async getOfflineChapter_Data_Saver_Image(filename : string) : Promise<string>{
        return Chapter.getAOfflineChapter_Data_Saver_Image(this.get_id(), filename);
    }
    public async getOfflineChapter_Data_Image(filename : string) : Promise<string>{
        return Chapter.getAOfflineChapter_Data_Image(this.get_id(), filename);
    }
    public static async getAll_downloaded_chap() : Promise<Array<string>> {
        if(await DeskApiRequest.ping() == true){
            let response : Response<{
                result : string,
                type : string, 
                data : Array<string>
            }> = await DeskApiRequest.get_methods(`chapter/all`, {
                responseType : ResponseType.JSON
            });
            return response.data.data;
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public async get_translated_Lang() : Promise<Lang>{
        return await (await Languages.initialize()).getLang_byTwo_letter(this.get_translatedLanguage());
    }
    public get_manga_id() : string{
        return this.get_some_relationship("manga")[0].get_id();
    }
    public async get_manga() : Promise<Manga>{
        return Manga.getMangaByID(this.get_manga_id());
    }
    public get_user_id() : string{
        return this.get_some_relationship("user")[0].get_id()
    }
    public get_scanlations_groups_id() : Array<string>{
        let returns : Array<string> = new Array<string>(this.get_some_relationshipLength(RelationshipsTypes.scanlation_group()));
        let index = 0;
        this.get_some_relationship(RelationshipsTypes.scanlation_group()).forEach(element => {
            returns[index] = element.get_id();
        });
        return returns;
    }
    protected get_scanlation_group_attr_byID(id : string) : Attribute{
        let to_compare = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        for (let index = 0; index < to_compare.length; index++) {
            const element = to_compare[index];
            if(element.get_id() == id){
                return element
            }
        }
        throw new Error("can't find your scanlation group attribute");
    }
    public async get_scanlation_group_byID(id : string): Promise<Group>{
        try {
            return Group.get_groupById(this.get_scanlation_group_attr_byID(id).get_id());
        } catch (error) {
            throw error
        }
    }
    public async get_offlineDataImages() : Promise<Array<string>>{
        let data = await Chapter.getAOfflineChapter_Data(this.get_id());
        let returns : Array<string> = new Array<string>(data.length);
        for (let index = 0; index < data.length; index++) {
            returns[index] = await Chapter.getAOfflineChapter_Data_Image(this.get_id(), data[index]);
        }
        return returns;
    }
    public async get_offlineDataSaverImages(): Promise<Array<string>>{
        let data = await Chapter.getAOfflineChapter_Data_Saver(this.get_id());
        let returns : Array<string> = new Array<string>(data.length);
        for (let index = 0; index < data.length; index++) {
            returns[index] = await Chapter.getAOfflineChapter_Data_Saver_Image(this.get_id(), data[index]);
        }
        return returns;
    }
    public async get_onlineDataImages(): Promise<Array<string>>{
        let at_home = await At_Home.getAt_Home_wChID(this.get_id());
        return at_home.get_data_ImgURL();
    }
    public async get_onlineDataSaverImages(): Promise<Array<string>>{
        let at_home = await At_Home.getAt_Home_wChID(this.get_id());
        return at_home.get_dataSaver_ImgURL();
    }
    public async get_dataImages(): Promise<Array<string>>{
        try {
            return await this.get_offlineDataImages();
        } catch (error) {
            await emit("warn", {
                payload : "Changing to online mode"
            });
            return await this.get_onlineDataImages();
        }
    }
    public async get_dataSaverImages(): Promise<Array<string>>{
        try {
            return await this.get_offlineDataSaverImages();
        } catch (error) {
            await emit("warn", {
                payload : "Changing to online mode"
            });
            return await this.get_onlineDataSaverImages();
        }
    }
    public static async download(chapterID : string) : Promise<Array<string>>{
        if(await DeskApiRequest.ping() == true){
            let response = await invoke<string>("plugin:mangadex-desktop-api|download_chapter", { chapterId : chapterID });
            let response_Json : {
                result : string,
                dir : string,
                downloaded : Array<string>
            } = JSON.parse(response);
            return response_Json.downloaded;
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public static async download_data_saver(chapterID : string) : Promise<Array<string>>{
        if(await DeskApiRequest.ping() == true){
            let response = await invoke<string>("plugin:mangadex-desktop-api|download_chapter_data_saver_mode", { chapterId : chapterID });
            let response_Json : {
                result : string,
                dir : string,
                downloaded : Array<string>
            } = JSON.parse(response);
            return response_Json.downloaded;
        }else{
            throw new Error("The offline server isn't started");
        }
    }
    public async download_this() : Promise<Array<string>>{
        return await Chapter.download(this.get_id());
    }
    public async download_this_data_saver() : Promise<Array<string>>{
        return await Chapter.download_data_saver(this.get_id());
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
        let to_input: Array<Chapter_withAllIncludes> = new Array<Chapter_withAllIncludes>(this.count);
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
        let ids: Array<string> = [object.id];
        let others: Array<any> = object.others;
        for (let index = 0; index < others.length; index++) {
            ids.push(others[index]);
        }
        let instance: Chapters = new Chapters(object.chapter, ids, object.count);
        return instance;
    }
    public static async build_wANY2(object: any): Promise<Chapters>{
        let instance: Chapters = Chapters.build_wANY(object);
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
    public get_userUploader(): Promise<User> {
        return new Promise((resolve, reject) => {
            try{
                resolve(this.get_uploader())
            }catch(e){
                reject(e);
            }
        });
    }
    public get_groupUploaders(): Promise<Group[]> {
        return new Promise((resolve, reject) => {
            try{
                resolve(this.get_groups());
            }catch(e){
                reject(e)
            }
        });
    }
    public get_manga(): Promise<Manga>{
        return new Promise((resolve, reject) => {
            try{
                resolve(this.manga)
            }catch(e){
                reject(e)
            }
        });
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
        let attributes :any = object.attributes;
        let relationships: any = object.relationships;
        let instance: Chapter_withAllIncludes = new Chapter_withAllIncludes(
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
        try {
            instance.set_relationships_Wany(relationships);
        } catch (error) {
            
        }
        
//        console.log("relationship builded")
        try {
            let groups_any: Array<any> = Attribute.get_some_relationship(relationships, "scanlation_group");
            let groups : Array<Group> = []
            for (let index = 0; index < groups_any.length; index++) {
                groups[index] = Group.build_wANY(groups_any[index]);
            }
            instance.set_groups(groups);
        } catch (error) {
            
        }
//        console.log("group builded")
        try {
            instance.set_manga(Manga_2.build_any(Attribute.get_some_relationship(relationships, "manga")[0]));
        } catch (error) {
            
        }
        try {
            instance.set_uploader(User.build_wANY(Attribute.get_some_relationship(relationships, "user")[0]));
        } catch (error) {
            
        }
        //console.log("relationship builded")
        
//        console.log("uploader builded")
        return instance;
    }
    public static async get_ChapterbyId(id: string): Promise<Chapter_withAllIncludes> {
        let getted: Response<any> = await Api_Request.get_methods("chapter/" + id + "?" + serialize({
                "includes[0]" : "manga",
                "includes[1]" : "user",
                "includes[2]" : "scanlation_group"
            }), {
        });
        let instance: Chapter_withAllIncludes = Chapter_withAllIncludes.build_W_Any(getted.data.data);
        return instance;
    }
    public static async search(props : 
        {
            offset_limits: Offset_limits,
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
        }
    ): Promise<Collection<Chapter_withAllIncludes>>{
        let querys: any = {
            limit: JSON.stringify(props.offset_limits.get_limits()),
            offset: JSON.stringify(props.offset_limits.get_offset()),
            ...(new Querry_list_builder<string>("ids", props.ids!)).build(),
            title: (props.title!),
            ...(new Querry_list_builder<string>("groups", props.group!)).build(),
            uploader: (props.uploader!),
            manga: (props.manga!),
            volume: JSON.stringify(props.volume!),
            ...(new Querry_list_builder<string>("translatedLanguage", props.translatedLanguage!)).build(),
            ...(new Querry_list_builder<string>("originalLanguage", props.originalLanguage!)).build(),
            ...(new Querry_list_builder<string>("excludedOriginalLanguage", props.excludedOriginalLanguage!)).build(),
            ...(new Querry_list_builder<string>("contentRating", props.content_rating!)).build(),
            ...(new Querry_list_builder<string>("excludedGroup", props.excludedGroup!)).build(),
            ...(new Querry_list_builder<string>("excludedUploaders", props.excludedUploaders!)).build(),
            includeFutureUpdates: (props.includeFutureUpdates!),
            createdAtSince: (props.createdAtSince!),
            updatedAtSince: (props.updatedAtSince!),
            publishAtSince: (props.publishAtSince!),
            ...props.order?.render()
        }
        let getted: Response<any> = await Api_Request.get_methods("chapter?" + 
            serialize(new Querry_list_builder<string>("includes", [
                "manga",
                "user",
                "scanlation_group"
            ]).build())
        , {
            query: querys
        });
        let data: Array<any> = getted.data.data;
        let mangaArray: Array<Chapter_withAllIncludes> = new Array<Chapter_withAllIncludes>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter_withAllIncludes.build_W_Any(data[index]);
        }
        return new Collection<Chapter_withAllIncludes>(mangaArray, getted.data.limit, getted.data.offset, getted.data.total);
    }
    public async get_scanlation_group_byID(id: string): Promise<Group> {
        for (let index = 0; index < this.groups.length; index++) {
            const element = this.groups[index];
            if(element.get_id() == id){
                return element;
            }
        }
        throw new Error("can't find your scanlation group in this chapter");
    }
}