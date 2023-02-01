import { emit } from "@tauri-apps/api/event";
import { Client, getClient, Response, ResponseType } from "@tauri-apps/api/http";
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
import ChapterSearchType from "./SearchType/Chapter";
import Chapter_withAllIncludes_SearchType from "./SearchType/Chapter_WAllIncludes";
import { User } from "./User";

class ChapterCollection extends Collection<Chapter>{
    private prev_search_type: ChapterSearchType;
    /**
     * Getter $prev_search_type
     * @return {ChapterSearchType}
     */
    public get $prev_search_type(): ChapterSearchType {
        return this.prev_search_type;
    }

    /**
     * Setter $prev_search_type
     * @param {ChapterSearchType} value
     */
    public set $prev_search_type(value: ChapterSearchType) {
        this.prev_search_type = value;
    }
    constructor(data: Chapter[], limit: number, offset: number, total: number, previous_search_type: ChapterSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<Chapter>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() + this.get_limit();
            if (new_offset <= this.get_total() && new_offset >= 0) {
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                this.$prev_search_type.offset_limits = current_offset_limits;
                resolve(Chapter.search(this.prev_search_type));
            } else {
                reject(new Error("no next chapter"));
            }
        });

    }
    public previous(): Promise<Collection<Chapter>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() - this.get_limit();
            if (new_offset <= this.get_total() && new_offset >= 0) {
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                this.$prev_search_type.offset_limits = current_offset_limits;
                resolve(Chapter.search(this.prev_search_type));
            } else {
                reject(new Error("no previous group"));
            }
        });

    }
}

class AllDownloadedChapterCollection extends Collection<string>{
    private client: Client;
    /**
     * Getter $client
     * @return {Client}
     */
	public get $client(): Client {
		return this.client;
	}

    /**
     * Setter $client
     * @param {Client} value
     */
	public set $client(value: Client) {
		this.client = value;
	}
    constructor(params:{data: Array<string>, limit: number, offset: number, total: number}, client: Client) {
        super(params.data, params.limit, params.offset, params.total);
        this.$client = client;
    }
    public next(): Promise<Collection<string>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() + this.get_limit();
            if(new_offset <= this.get_total() && new_offset >= 0){
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                resolve(Chapter.getAll_downloaded_chap(current_offset_limits, this.client));
            }else{
                reject(new Error("no next page"));
            }
        });
    }
    public previous(): Promise<Collection<string>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() - this.get_limit();
            if(new_offset <= this.get_total() && new_offset >= 0){
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                resolve(Chapter.getAll_downloaded_chap(current_offset_limits, this.client));
            }else{
                reject(new Error("no previous page"));
            }
        });
    }
}

export class Chapter extends Attribute {
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
    public set_title(title: string) {
        this.title = title
    }
    public set_volume(volume: string) {
        this.volume = volume
    }
    public set_pages(pages: number) {
        this.pages = pages
    }
    public set_translatedLanguage(translatedLanguage: string) {
        this.translatedLanguage = translatedLanguage
    }
    public set_externalUrl(externalUrl: string) {
        this.externalUrl = externalUrl
    }
    public set_version(version: number) {
        this.version = version
    }
    public set_createdAt(createdAt: string) {
        this.createdAt = createdAt
    }
    public set_updateAt(updateAt: string) {
        this.updateAt = updateAt
    }
    public set_publishAt(publishAt: string) {
        this.publishAt = publishAt
    }
    public set_readableAt(readableAt: string) {
        this.readableAt = readableAt
    }
    public set_chapter(chapter: number) {
        this.chapNo = chapter;
    }

    public get_chapter(): number {
        return this.chapNo;
    }
    public get_title(): string {
        return this.title;
    }
    public get_volume(): string {
        return this.volume;
    }
    public get_pages(): number {
        return this.pages
    }
    public get_translatedLanguage(): string {
        return this.translatedLanguage
    }
    public get_externalUrl(): string {
        return this.externalUrl
    }
    public get_version(): number {
        return this.version
    }
    public get_createdAt(): string {
        return this.createdAt
    }
    public get_updateAt(): string {
        return this.updateAt
    }
    public get_publishAt(): string {
        return this.publishAt
    }
    public get_readableAt(): string {
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
    ) {
        super(id, "chapter");
        this.set_title(title);
        this.set_pages(pages);
        this.set_chapter(chapter);
        this.set_createdAt(createdAt);
        this.set_updateAt(updatedAt);
        this.set_publishAt(publishAt);
    }
    public static build_W_Any(object: any): Chapter {
        let attributes: any = object.attributes;
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
    public static async get_ChapterbyId(id: string, client?: Client): Promise<Chapter> {
        if (await DeskApiRequest.ping(client) == true) {
            try {
                return await Chapter.getAOfflineChapter(id, client);
            } catch (error) {
                let getted: Response<any> = await Api_Request.get_methods("chapter/" + id, undefined, client);
                let instance: Chapter = Chapter.build_W_Any(getted.data.data);
                return instance;
            }
        } else {
            let getted: Response<any> = await Api_Request.get_methods("chapter/" + id, undefined, client);
            let instance: Chapter = Chapter.build_W_Any(getted.data.data);
            return instance;
        }
    }
    public static async search(props:
        ChapterSearchType
    ): Promise<Collection<Chapter>> {
        let querys: any = {
            limit: JSON.stringify(props.offset_limits.get_limits()),
            offset: JSON.stringify(props.offset_limits.get_offset()),
            title: (props.title!),
            uploader: (props.uploader!),
            manga: (props.manga!),
            volume: JSON.stringify(props.volume!),
            includeFutureUpdates: (props.includeFutureUpdates!),
            createdAtSince: (props.createdAtSince!),
            updatedAtSince: (props.updatedAtSince!),
            publishAtSince: (props.publishAtSince!),
            ...props.order?.render(),
            "includes[]": (props.includes!)
        }
        let getted: Response<any> = await Api_Request.get_methods("chapter?" +
            serialize((new Querry_list_builder<string>("ids", props.ids!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("groups", props.group!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("translatedLanguage", props.translatedLanguage!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("originalLanguage", props.originalLanguage!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("excludedOriginalLanguage", props.excludedOriginalLanguage!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("contentRating", props.content_rating!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("excludedGroup", props.excludedGroup!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("excludedUploaders", props.excludedUploaders!)).build())
            , {
                query: querys
            }, props.client);
        let data: Array<any> = getted.data.data;
        let mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter.build_W_Any(data[index]);
        }
        return new ChapterCollection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total, props);
    }
    public async get_groupUploaders(client?: Client): Promise<Array<Group>> {
        let group_atribs: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        let groups: Array<Group> = new Array<Group>(group_atribs.length);
        for (let index = 0; index < group_atribs.length; index++) {
            const element = group_atribs[index];
            groups[index] = await Group.get_groupById(element.get_id(), client);
        }
        return groups;
    }
    public get_userUploader(client?: Client): Promise<User> {
        return User.getUserById(this.get_some_relationship(RelationshipsTypes.user())[0].get_id(), client);
    }
    public async getAggregateList(client?: Client): Promise<Aggregate> {
        let manga_id: string = this.get_some_relationship("manga")[0].get_id();
        let groupss: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        let groups: Array<string> = Array<string>(this.get_some_relationshipLength(RelationshipsTypes.scanlation_group()));
        for (let index = 0; index < groups.length; index++) {
            const element = groupss[index];
            groups[index] = element.get_id();
        }
        return Aggregate.get_aggregate(this.getAggregateList_options(client));
    }
    public getAggregateList_options(client?: Client): {
        mangaID: string,
        translatedLanguage?: Array<string>,
        groups?: Array<string>,
        client?: Client
    } {

        let manga_id: string = this.get_some_relationship("manga")[0].get_id();
        let groupss: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        let groups: Array<string> = Array<string>(this.get_some_relationshipLength(RelationshipsTypes.scanlation_group()));
        for (let index = 0; index < groups.length; index++) {
            const element = groupss[index];
            groups[index] = element.get_id();
        }
        return ({
            mangaID: manga_id,
            translatedLanguage: [this.get_translatedLanguage()],
            groups: groups,
            client: client
        });
    }
    public async get_next(aggregate_list?: Aggregate): Promise<string> {
        if (aggregate_list === undefined) {
            return (await this.getAggregateList()).getNext(this.get_id());
        } else {
            return aggregate_list.getNext(this.get_id());
        }

    }
    public async get_previous(aggregate_list?: Aggregate): Promise<string> {
        if (aggregate_list === undefined) {
            return (await this.getAggregateList()).getPrevious(this.get_id());
        } else {
            return aggregate_list.getPrevious(this.get_id());
        }
    }
    public async get_current(aggregate_list?: Aggregate): Promise<string> {
        if (aggregate_list === undefined) {
            return (await this.getAggregateList()).getCurrent(this.get_id());
        } else {
            return aggregate_list.getCurrent(this.get_id());
        }

    }
    public static async getAOfflineChapter(chapterID: string, client?: Client): Promise<Chapter_withAllIncludes> {
        if (await DeskApiRequest.ping(client) == true) {
            let response: Response<any> = await DeskApiRequest.get_methods(`chapter/${chapterID}`, undefined, client);
            return Chapter_withAllIncludes.build_W_Any(response.data.data);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAOfflineChapter_Data(chapterID: string, client?: Client): Promise<Array<string>> {
        if (await DeskApiRequest.ping(client) == true) {
            let response: Response<{
                data: Array<string>,
                result: string,
                type: string
            }> = await DeskApiRequest.get_methods(`chapter/${chapterID}/data`, undefined, client);
            return response.data.data;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAOfflineChapter_Data_Saver(chapterID: string, client?: Client): Promise<Array<string>> {
        if (await DeskApiRequest.ping(client) == true) {
            let response: Response<{
                data: Array<string>,
                result: string,
                type: string
            }> = await DeskApiRequest.get_methods(`chapter/${chapterID}/data-saver`, undefined, client);
            return response.data.data;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async is_chapter_downloaded(chapterID: string, client?: Client): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Chapter.getAOfflineChapter(chapterID, client).then(() => {
                resolve(true);
            }).catch(() => {
                resolve(false)
            })
        });
    }
    public async getOfflineChapter_Data_Saver(client?: Client): Promise<Array<string>> {
        return Chapter.getAOfflineChapter_Data_Saver(this.get_id(), client);
    }
    public async getOfflineChapter_Data(client?: Client): Promise<Array<string>> {
        return Chapter.getAOfflineChapter_Data(this.get_id(), client);
    }
    public static async getAOfflineChapter_Data_Image(chapterID: string, filename: string, client?: Client): Promise<string> {
        if (await DeskApiRequest.ping(client) == true) {
            return DeskApiRequest.get_url() + `chapter/${chapterID}/data/${filename}`;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAOfflineChapter_Data_Saver_Image(chapterID: string, filename: string, client?: Client): Promise<string> {
        if (await DeskApiRequest.ping(client) == true) {
            return DeskApiRequest.get_url() + `chapter/${chapterID}/data/${filename}`;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public async getOfflineChapter_Data_Saver_Image(filename: string, client?: Client): Promise<string> {
        return Chapter.getAOfflineChapter_Data_Saver_Image(this.get_id(), filename, client);
    }
    public async getOfflineChapter_Data_Image(filename: string, client?: Client): Promise<string> {
        return Chapter.getAOfflineChapter_Data_Image(this.get_id(), filename, client);
    }
    public static async getAll_downloaded_chap(offset_limits? : Offset_limits,client?: Client): Promise<Collection<string>> {
        if(offset_limits == undefined){
            offset_limits = new Offset_limits();
        }
        if(client == undefined){
            client = await getClient();
        }
        if (await DeskApiRequest.ping(client) == true) {
            let response: Response<{
                result: string,
                type: string,
                data: {
                    data: Array<string>,
                    offset: number,
                    limit: number,
                    total: number
                }
            }> = await DeskApiRequest.get_methods(`chapter`, {
                query : {
                    offset: JSON.stringify(offset_limits.get_offset()),
                    limit: JSON.stringify(offset_limits.get_limits())
                }
            }, client);
            return new AllDownloadedChapterCollection(response.data.data, client);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public async get_translated_Lang(): Promise<Lang> {
        return await (await Languages.initialize()).getLang_byTwo_letter(this.get_translatedLanguage());
    }
    public get_manga_id(): string {
        return this.get_some_relationship("manga")[0].get_id();
    }
    public async get_manga(client?: Client): Promise<Manga> {
        return Manga.getMangaByID(this.get_manga_id(), client);
    }
    public get_user_id(): string {
        return this.get_some_relationship("user")[0].get_id()
    }
    public get_scanlations_groups_id(): Array<string> {
        let returns: Array<string> = new Array<string>(this.get_some_relationshipLength(RelationshipsTypes.scanlation_group()));
        let index = 0;
        this.get_some_relationship(RelationshipsTypes.scanlation_group()).forEach(element => {
            returns[index] = element.get_id();
        });
        return returns;
    }
    protected get_scanlation_group_attr_byID(id: string): Attribute {
        let to_compare = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        for (let index = 0; index < to_compare.length; index++) {
            const element = to_compare[index];
            if (element.get_id() == id) {
                return element
            }
        }
        throw new Error("can't find your scanlation group attribute");
    }
    public async get_scanlation_group_byID(id: string, client?: Client): Promise<Group> {
        try {
            return Group.get_groupById(this.get_scanlation_group_attr_byID(id).get_id(), client);
        } catch (error) {
            throw error
        }
    }
    public async get_offlineDataImages(client?: Client): Promise<Array<string>> {
        let data = await Chapter.getAOfflineChapter_Data(this.get_id(), client);
        let returns: Array<string> = new Array<string>(data.length);
        for (let index = 0; index < data.length; index++) {
            returns[index] = await Chapter.getAOfflineChapter_Data_Image(this.get_id(), data[index], client);
        }
        return returns;
    }
    public async get_offlineDataSaverImages(client?: Client): Promise<Array<string>> {
        let data = await Chapter.getAOfflineChapter_Data_Saver(this.get_id(), client);
        let returns: Array<string> = new Array<string>(data.length);
        for (let index = 0; index < data.length; index++) {
            returns[index] = await Chapter.getAOfflineChapter_Data_Saver_Image(this.get_id(), data[index], client);
        }
        return returns;
    }
    public async get_onlineDataImages(client?: Client): Promise<Array<string>> {
        let at_home = await At_Home.getAt_Home_wChID(this.get_id(), undefined, client);
        return at_home.get_data_ImgURL();
    }
    public async get_onlineDataSaverImages(client?: Client): Promise<Array<string>> {
        let at_home = await At_Home.getAt_Home_wChID(this.get_id(), undefined, client);
        return at_home.get_dataSaver_ImgURL();
    }
    public async get_dataImages(client?: Client): Promise<Array<string>> {
        try {
            return await this.get_offlineDataImages(client);
        } catch (error) {
            return await this.get_onlineDataImages(client);
        }
    }
    public async get_dataSaverImages(client?: Client): Promise<Array<string>> {
        try {
            return await this.get_offlineDataSaverImages(client);
        } catch (error) {
            await emit("warn", {
                payload: "Changing to online mode"
            });
            return await this.get_onlineDataSaverImages(client);
        }
    }
    public static async download(chapterID: string, client?: Client): Promise<Array<string>> {
        if (await DeskApiRequest.ping(client) == true) {
            let response = await invoke<string>("plugin:mangadex-desktop-api|download_chapter", { chapterId: chapterID });
            let response_Json: {
                result: string,
                dir: string,
                downloaded: Array<string>
            } = JSON.parse(response);
            return response_Json.downloaded;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async download_data_saver(chapterID: string, client?: Client): Promise<Array<string>> {
        if (await DeskApiRequest.ping(client) == true) {
            let response = await invoke<string>("plugin:mangadex-desktop-api|download_chapter_data_saver_mode", { chapterId: chapterID });
            let response_Json: {
                result: string,
                dir: string,
                downloaded: Array<string>
            } = JSON.parse(response);
            return response_Json.downloaded;
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public async download_this(client?: Client): Promise<Array<string>> {
        return await Chapter.download(this.get_id(), client);
    }
    public async download_this_data_saver(client?: Client): Promise<Array<string>> {
        return await Chapter.download_data_saver(this.get_id(), client);
    }
}
export class Chapters {
    private name: string;
    private ids: Array<string>;
    private count: number;
    private chapters: Array<Chapter_withAllIncludes>;
    public set_name(name: string) {
        this.name = name;
    }
    public set_ids(ids: Array<string>) {
        this.ids = ids;
    }
    public set_count(count: number) {
        this.count = count;
    }
    public set_chapters(chapters: Array<Chapter_withAllIncludes>) {
        this.chapters = chapters;
    }
    public get_name(): string {
        return this.name;
    }
    public get_ids(): Array<string> {
        return this.ids;
    }
    public get_count(): number {
        return this.count;
    }
    public get_chapters(): Array<Chapter_withAllIncludes> {
        return this.chapters;
    }
    public constructor(name: string, ids: Array<string>, count: number) {
        this.set_name(name);
        this.set_ids(ids);
        this.set_count(count);
    }
    public async initialize_chapters(client?: Client) {
        let to_input: Array<Chapter_withAllIncludes> = new Array<Chapter_withAllIncludes>(this.count);
        for (let index = 0; index < to_input.length; index++) {
            to_input[index] = await Chapter_withAllIncludes.get_ChapterbyId(this.ids[index], client);
        }
        this.set_chapters(to_input);
    }
    public async initialize_and_get_Chapters(client?: Client): Promise<Array<Chapter_withAllIncludes>> {
        await this.initialize_chapters(client);
        return this.get_chapters();
    }
    public static build_wANY(object: any): Chapters {
        let ids: Array<string> = [object.id];
        let others: Array<any> = object.others;
        for (let index = 0; index < others.length; index++) {
            ids.push(others[index]);
        }
        let instance: Chapters = new Chapters(object.chapter, ids, object.count);
        return instance;
    }
    public static async build_wANY2(object: any): Promise<Chapters> {
        let instance: Chapters = Chapters.build_wANY(object);
        await instance.initialize_chapters();
        return instance;
    }
    public get_key_word(): string {
        return RelationshipsTypes.chapter();
    }
    public is_there(id: string): boolean {
        for (let index = 0; index < this.ids.length; index++) {
            if (this.ids[index] == id) {
                return true;
            }
        }
        return false;
    }

}

class Chapter_WAllIncludesCollection extends Collection<Chapter_withAllIncludes>{
    private prev_search_type: Chapter_withAllIncludes_SearchType;
    /**
     * Getter $prev_search_type
     * @return {Chapter_withAllIncludes_SearchType}
     */
    public get $prev_search_type(): Chapter_withAllIncludes_SearchType {
        return this.prev_search_type;
    }

    /**
     * Setter $prev_search_type
     * @param {Chapter_withAllIncludes_SearchType} value
     */
    public set $prev_search_type(value: Chapter_withAllIncludes_SearchType) {
        this.prev_search_type = value;
    }
    constructor(data: Chapter_withAllIncludes[], limit: number, offset: number, total: number, previous_search_type: Chapter_withAllIncludes_SearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<Chapter_withAllIncludes>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() + this.get_limit();
            if (new_offset <= this.get_total() && new_offset >= 0) {
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                this.$prev_search_type.offset_limits = current_offset_limits;
                resolve(Chapter_withAllIncludes.search(this.prev_search_type));
            } else {
                reject(new Error("no next chapter"));
            }
        });

    }
    public previous(): Promise<Collection<Chapter_withAllIncludes>> {
        return new Promise((resolve, reject) => {
            let new_offset = this.get_offset() - this.get_limit();
            if (new_offset <= this.get_total() && new_offset >= 0) {
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                this.$prev_search_type.offset_limits = current_offset_limits;
                resolve(Chapter_withAllIncludes.search(this.prev_search_type));
            } else {
                reject(new Error("no previous group"));
            }
        });
    }
}

export class Chapter_withAllIncludes extends Chapter {
    private groups: Array<Group>;
    private uploader: User;
    private manga: Manga;
    public set_groups(groups: Array<Group>) {
        this.groups = groups;
    }
    public set_uploader(uploader: User) {
        this.uploader = uploader;
    }
    public set_manga(manga: Manga) {
        this.manga = manga;
    }
    public get_groups(): Array<Group> {
        return this.groups;
    }
    public get_uploader(): User {
        return this.uploader;
    }
    public get_userUploader(): Promise<User> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.get_uploader())
            } catch (e) {
                reject(e);
            }
        });
    }
    public get_groupUploaders(): Promise<Group[]> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.get_groups());
            } catch (e) {
                reject(e)
            }
        });
    }
    public get_manga(): Promise<Manga> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.manga)
            } catch (e) {
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
    ) {
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
    public static build_W_Any(object: any): Chapter_withAllIncludes {
        let attributes: any = object.attributes;
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
            let groups: Array<Group> = []
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
    public static async get_ChapterbyId(id: string, client?: Client): Promise<Chapter_withAllIncludes> {
        let getted: Response<any> = await Api_Request.get_methods("chapter/" + id + "?" + serialize({
            "includes[0]": "manga",
            "includes[1]": "user",
            "includes[2]": "scanlation_group"
        }), {
        }, client);
        let instance: Chapter_withAllIncludes = Chapter_withAllIncludes.build_W_Any(getted.data.data);
        return instance;
    }
    public static async search(props:
        Chapter_withAllIncludes_SearchType
    ): Promise<Collection<Chapter_withAllIncludes>> {
        let querys: any = {
            limit: JSON.stringify(props.offset_limits.get_limits()),
            offset: JSON.stringify(props.offset_limits.get_offset()),
            title: (props.title!),
            uploader: (props.uploader!),
            manga: (props.manga!),
            volume: JSON.stringify(props.volume!),
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
            ]).build()) +
            "&" + serialize((new Querry_list_builder<string>("ids", props.ids!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("groups", props.group!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("translatedLanguage", props.translatedLanguage!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("originalLanguage", props.originalLanguage!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("excludedOriginalLanguage", props.excludedOriginalLanguage!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("contentRating", props.content_rating!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("excludedGroup", props.excludedGroup!)).build()) +
            "&" +
            serialize((new Querry_list_builder<string>("excludedUploaders", props.excludedUploaders!)).build())

            , {
                query: querys
            }, props.client);
        let data: Array<any> = getted.data.data;
        let mangaArray: Array<Chapter_withAllIncludes> = new Array<Chapter_withAllIncludes>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter_withAllIncludes.build_W_Any(data[index]);
        }
        return new Chapter_WAllIncludesCollection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total, props);
    }
    public async get_scanlation_group_byID(id: string): Promise<Group> {
        for (let index = 0; index < this.groups.length; index++) {
            const element = this.groups[index];
            if (element.get_id() == id) {
                return element;
            }
        }
        throw new Error("can't find your scanlation group in this chapter");
    }
}