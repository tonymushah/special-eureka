import { download_chapter, download_chapter_data_saver } from "@mangadex/plugin";
import { emit } from "@tauri-apps/api/event";
import { Client, getClient, Response } from "@tauri-apps/api/http";
import { stringify } from "qs";
import { Api_Request } from "../internal/Api_Request";
import { Lang, Languages, Offset_limits, RelationshipsTypes } from "../internal/Utils";
import DeskApiRequest from "../offline/DeskApiRequest";
import { ChapterAttributes, ChapterVolumeAggregateData, GetChapterData, GetChapterIdData, Relationship, ScanlationGroup, Chapter as StaChapter } from "../sta/data-contracts";
import GetChapterByIdResult from "./additonal_types/GetChapterByIdResult";
import IsDownloadedResult from "./additonal_types/IsDownloadedResult";
import { Aggregate } from "./Aggregate";
import { At_Home } from "./At_home";
import Attribute from "./Attributes";
import { Collection } from "./Collection";
import AllDownloadedChapterCollection from "./CollectionTypes/AllDownloadedChapterCollection";
import Chapter_WAllIncludesCollection from "./CollectionTypes/Chapter_WAllIncludesCollection";
import ChapterCollection from "./CollectionTypes/ChapterCollection";
import { Group } from "./Group";
import { Manga, Manga_2 } from "./Manga";
import { AggregateListOptions } from "./SearchType/AggregateListOptions";
import ChapterSearchType from "./SearchType/Chapter";
import Chapter_withAllIncludes_SearchType from "./SearchType/Chapter_WAllIncludes";
import { User } from "./User";

export type ChapterDowloadResult = {
    result: string,
    dir: string,
    downloaded: Array<string>,
    errors: Array<string>
}

export class Chapter extends Attribute {
    private title?: string;
    private volume!: string;
    private pages!: number;
    private translatedLanguage!: string;
    private externalUrl?: string;
    private version!: number;
    private createdAt!: string;
    private updateAt!: string;
    private publishAt!: string;
    private readableAt!: string;
    private chapNo!: number;
    public set_title(title?: string) {
        this.title = title;
    }
    public set_volume(volume: string) {
        this.volume = volume;
    }
    public set_pages(pages: number) {
        this.pages = pages;
    }
    public set_translatedLanguage(translatedLanguage: string) {
        this.translatedLanguage = translatedLanguage;
    }
    public set_externalUrl(externalUrl?: string) {
        this.externalUrl = externalUrl;
    }
    public set_version(version: number) {
        this.version = version;
    }
    public set_createdAt(createdAt: string) {
        this.createdAt = createdAt;
    }
    public set_updateAt(updateAt: string) {
        this.updateAt = updateAt;
    }
    public set_publishAt(publishAt: string) {
        this.publishAt = publishAt;
    }
    public set_readableAt(readableAt: string) {
        this.readableAt = readableAt;
    }
    public set_chapter(chapter: number) {
        this.chapNo = chapter;
    }

    public get_chapter(): number {
        return this.chapNo;
    }
    public get_title(): string | undefined {
        return this.title;
    }
    public get_volume(): string {
        return this.volume;
    }
    public get_pages(): number {
        return this.pages;
    }
    public get_translatedLanguage(): string {
        return this.translatedLanguage;
    }
    public get_externalUrl(): string | undefined {
        return this.externalUrl;
    }
    public get_version(): number {
        return this.version;
    }
    public get_createdAt(): string {
        return this.createdAt;
    }
    public get_updateAt(): string {
        return this.updateAt;
    }
    public get_publishAt(): string {
        return this.publishAt;
    }
    public get_readableAt(): string {
        return this.readableAt;
    }
    public constructor(
        id: string,
        title: string | undefined,
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
    public static build_W_Any(object: StaChapter): Chapter {
        const attributes: ChapterAttributes = object.attributes;
        const relationships: Relationship[] = object.relationships;
        const instance: Chapter = new Chapter(
            object.id,
            attributes.title ?? undefined,
            attributes.pages,
            Number.parseFloat(attributes.chapter ?? "-1") ?? -1,
            attributes.createdAt,
            attributes.updatedAt,
            attributes.publishAt
        );
        const externalUrl = attributes.externalUrl ?? "";
        instance.set_externalUrl(externalUrl.length == 0 ? undefined : externalUrl);
        instance.set_translatedLanguage(attributes.translatedLanguage);
        instance.set_readableAt(attributes.readableAt);
        instance.set_version(attributes.version);
        instance.set_volume(attributes.volume ?? "");
        try {
            instance.set_relationships_Wany(relationships);
            // eslint-disable-next-line no-empty
        } catch (error) {

        }

        return instance;
    }
    public static async get_OnlineChapterbyId(id: string, client?: Client): Promise<Chapter> {
        const getted = await Api_Request.get_methods<GetChapterIdData>("chapter/" + id, undefined, client);
        const instance: Chapter = Chapter.build_W_Any(getted.data.data);
        return instance;
    }
    public static async get_ChapterbyId(id: string, client?: Client): Promise<GetChapterByIdResult> {
        if (await DeskApiRequest.ping(client) == true) {

            try {
                const getted = await Chapter.getAOfflineChapter(id, client);
                const result: GetChapterByIdResult = {
                    data: getted.data,
                    hasFailed: getted.hasFailed,
                    isDownloaded: true
                };
                return result;
            } catch (error) {
                return {
                    data: await Chapter.get_OnlineChapterbyId(id, client),
                    isDownloaded: false,
                    hasFailed: false
                };
            }
        } else {
            return {
                data: await Chapter.get_OnlineChapterbyId(id, client),
                isDownloaded: false,
                hasFailed: false
            };
        }
    }
    public static async search(props:
        ChapterSearchType
    ): Promise<Collection<Chapter>> {
        const querys = {
            limit: props.offset_limits.get_limits(),
            offset: props.offset_limits.get_offset(),
            title: props.title,
            uploader: props.uploader,
            manga: props.manga,
            volume: props.volume,
            includeFutureUpdates: props.includeFutureUpdates,
            createdAtSince: props.createdAtSince,
            updatedAtSince: props.updatedAtSince,
            publishAtSince: props.publishAtSince,
            order: props.order,
            includes: props.includes,
            includeExternalUrl: "0",
            includeEmptyPages: "0",
            ids: props.ids,
            groups: props.group,
            translatedLanguage: props.translatedLanguage,
            originalLanguage: props.originalLanguage,
            excludedOriginalLanguage: props.excludedOriginalLanguage,
            contentRating: props.content_rating,
            excludedGroup: props.excludedGroup,
            excludedUploaders: props.excludedUploaders
        };
        const getted = await Api_Request.get_methods<GetChapterData>("chapter?" +
            stringify(querys), undefined, props.client);
        const data = getted.data.data;
        const mangaArray: Array<Chapter> = new Array<Chapter>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Chapter.build_W_Any(data[index]);
        }
        return new ChapterCollection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total, props);
    }
    public async get_groupUploaders(client?: Client): Promise<Array<Group>> {
        const group_atribs: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        const groups: Array<Group> = new Array<Group>(group_atribs.length);
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
        const groupss: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        const groups: Array<string> = Array<string>(this.get_some_relationshipLength(RelationshipsTypes.scanlation_group()));
        for (let index = 0; index < groups.length; index++) {
            const element = groupss[index];
            groups[index] = element.get_id();
        }
        return Aggregate.get_aggregate(this.getAggregateList_options(client));
    }
    public getAggregateList_options(client?: Client): AggregateListOptions {

        const manga_id: string = this.get_some_relationship("manga")[0].get_id();
        const groupss: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        const groups: Array<string> = Array<string>(this.get_some_relationshipLength(RelationshipsTypes.scanlation_group()));
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
    public static async getAOfflineChapter(chapterID: string, client?: Client): Promise<{ data: Chapter_withAllIncludes, hasFailed: boolean }> {
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<GetChapterIdData> = await DeskApiRequest.get_methods(`chapter/${chapterID}`, undefined, client);
            const hasFailed: boolean = JSON.parse(response.headers["x-download-failed"]);
            return {
                data: Chapter_withAllIncludes.build_W_Any(response.data.data),
                hasFailed: hasFailed
            };
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async getAOfflineChapter_Data(chapterID: string, client?: Client): Promise<Array<string>> {
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<{
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
            const response: Response<{
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
        return new Promise((resolve) => {
            Chapter.getAOfflineChapter(chapterID, client).then(() => {
                resolve(true);
            }).catch(() => {
                resolve(false);
            });
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
    public static async getAll_downloaded_chap({
        offset_limits,
        include_fails,
        only_fails
    }: {
        offset_limits?: Offset_limits,
        include_fails?: boolean,
        only_fails?: boolean
    }, client?: Client): Promise<Collection<string>> {
        if (offset_limits == undefined) {
            offset_limits = new Offset_limits();
        }
        if (client == undefined) {
            client = await getClient();
        }
        if (await DeskApiRequest.ping(client) == true) {
            const response: Response<{
                result: string,
                type: string,
                data: {
                    data: Array<string>,
                    offset: number,
                    limit: number,
                    total: number
                }
            }> = await DeskApiRequest.get_methods(`chapter?${stringify({
                offset: JSON.stringify(offset_limits.get_offset()),
                limit: JSON.stringify(offset_limits.get_limits()),
                include_fails,
                only_fails
            })}`, {
            }, client);
            return new AllDownloadedChapterCollection({
                ...response.data.data,
                _params: {
                    include_fails,
                    only_fails
                }
            }, client);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public async get_translated_Lang(): Promise<Lang> {
        return (await Languages.initialize()).getLang_byTwo_letter(this.get_translatedLanguage());
    }
    public get_manga_id(): string {
        return this.get_some_relationship("manga")[0].get_id();
    }
    public async get_manga(client?: Client): Promise<Manga> {
        return (await Manga.getMangaByID(this.get_manga_id(), client)).manga;
    }
    public get_user_id(): string {
        return this.get_some_relationship("user")[0].get_id();
    }
    public get_scanlations_groups_id(): Array<string> {
        const returns: Array<string> = new Array<string>(this.get_some_relationshipLength(RelationshipsTypes.scanlation_group()));
        const index = 0;
        this.get_some_relationship(RelationshipsTypes.scanlation_group()).forEach(element => {
            returns[index] = element.get_id();
        });
        return returns;
    }
    protected get_scanlation_group_attr_byID(id: string): Attribute {
        const to_compare = this.get_some_relationship(RelationshipsTypes.scanlation_group());
        for (let index = 0; index < to_compare.length; index++) {
            const element = to_compare[index];
            if (element.get_id() == id) {
                return element;
            }
        }
        throw new Error("can't find your scanlation group attribute");
    }
    public async get_scanlation_group_byID(id: string, client?: Client): Promise<Group> {
        return Group.get_groupById(this.get_scanlation_group_attr_byID(id).get_id(), client);
    }
    public async get_offlineDataImages(client?: Client): Promise<Array<string>> {
        const data = await Chapter.getAOfflineChapter_Data(this.get_id(), client);
        const returns: Array<string> = new Array<string>(data.length);
        for (let index = 0; index < data.length; index++) {
            returns[index] = await Chapter.getAOfflineChapter_Data_Image(this.get_id(), data[index], client);
        }
        return returns;
    }
    public async get_offlineDataSaverImages(client?: Client): Promise<Array<string>> {
        const data = await Chapter.getAOfflineChapter_Data_Saver(this.get_id(), client);
        const returns: Array<string> = new Array<string>(data.length);
        for (let index = 0; index < data.length; index++) {
            returns[index] = await Chapter.getAOfflineChapter_Data_Saver_Image(this.get_id(), data[index], client);
        }
        return returns;
    }
    public async get_onlineDataImages(client?: Client): Promise<Array<string>> {
        const at_home = await At_Home.getAt_Home_wChID(this.get_id(), undefined, client);
        return at_home.get_data_ImgURL();
    }
    public async get_onlineDataSaverImages(client?: Client): Promise<Array<string>> {
        const at_home = await At_Home.getAt_Home_wChID(this.get_id(), undefined, client);
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
    public static async download(chapterID: string, client?: Client): Promise<ChapterDowloadResult> {
        if (await DeskApiRequest.ping(client) == true) {
            return await download_chapter(chapterID);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public static async download_data_saver(chapterID: string, client?: Client): Promise<ChapterDowloadResult> {
        if (await DeskApiRequest.ping(client) == true) {
            return await download_chapter_data_saver(chapterID);
        } else {
            throw new Error("The offline server isn't started");
        }
    }
    public async download_this(client?: Client): Promise<ChapterDowloadResult> {
        return await Chapter.download(this.get_id(), client);
    }
    public async download_this_data_saver(client?: Client): Promise<ChapterDowloadResult> {
        return await Chapter.download_data_saver(this.get_id(), client);
    }
    public static async delete_a_downloaded_chapter(id: string, client?: Client) {
        if (await DeskApiRequest.ping(client) == true) {
            await DeskApiRequest.delete_methods(`chapter/${id}`, {

            }, client);
        } else {
            throw new Error("Can't ping the offline server");

        }
    }
    public async delete(client?: Client) {
        await Chapter.delete_a_downloaded_chapter(this.get_id(), client);
    }
    public static async downloaded(chap_id: string, client?: Client): Promise<IsDownloadedResult> {
        try {
            const data = await Chapter_withAllIncludes.getAOfflineChapter(chap_id, client);
            return {
                isDownloaded: true,
                hasFailed: data.hasFailed
            };
        } catch (error) {
            return {
                isDownloaded: false,
                hasFailed: false
            };
        }
    }
}
export class Chapters {
    private name!: string;
    private ids!: Array<string>;
    private count!: number;
    private chapters!: Array<Chapter_withAllIncludes>;
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
        const to_input: Array<Chapter_withAllIncludes> = new Array<Chapter_withAllIncludes>(this.count);
        for (let index = 0; index < to_input.length; index++) {
            const element = (await Chapter_withAllIncludes.get_ChapterbyId(this.ids[index], client)).data;
            if (element instanceof Chapter_withAllIncludes) to_input[index] = element;
        }
        this.set_chapters(to_input);
    }
    public async initialize_and_get_Chapters(client?: Client): Promise<Array<Chapter_withAllIncludes>> {
        await this.initialize_chapters(client);
        return this.get_chapters();
    }
    public static build_wANY(object: ChapterVolumeAggregateData): Chapters {
        const ids: Array<string> = [object.id];
        const others: Array<string> = object.others;
        for (let index = 0; index < others.length; index++) {
            ids.push(others[index]);
        }
        const instance: Chapters = new Chapters(object.chapter, ids, object.count);
        return instance;
    }
    public static async build_wANY2(object: ChapterVolumeAggregateData): Promise<Chapters> {
        const instance: Chapters = Chapters.build_wANY(object);
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

export class Chapter_withAllIncludes extends Chapter {
    private groups!: Array<Group>;
    private uploader!: User;
    private manga!: Manga;
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
                resolve(this.get_uploader());
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
                reject(e);
            }
        });
    }
    public get_manga(): Promise<Manga> {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.manga);
            } catch (e) {
                reject(e);
            }
        });
    }
    public constructor(
        id: string,
        title: string | undefined,
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
        );
    }
    public static build_W_Any(object: StaChapter): Chapter_withAllIncludes {
        const attributes: ChapterAttributes = object.attributes;
        const relationships: Relationship[] = object.relationships;
        const instance: Chapter_withAllIncludes = new Chapter_withAllIncludes(
            object.id,
            attributes.title ?? undefined,
            attributes.pages,
            Number.parseFloat(attributes.chapter ?? "-1") ?? -1,
            attributes.createdAt,
            attributes.updatedAt,
            attributes.publishAt
        );
        const externalUrl = attributes.externalUrl ?? "";
        instance.set_externalUrl(externalUrl.length == 0 ? undefined : externalUrl);
        instance.set_translatedLanguage(attributes.translatedLanguage);
        instance.set_readableAt(attributes.readableAt);
        instance.set_version(attributes.version);
        instance.set_volume(attributes.volume ?? "");
        try {
            instance.set_relationships_Wany(relationships);
            // eslint-disable-next-line no-empty
        } catch (error) {

        }
        //        console.log("relationship builded")
        try {
            const groups_any: Array<ScanlationGroup> = Attribute.get_some_relationship(relationships, "scanlation_group");
            const groups: Array<Group> = [];
            for (let index = 0; index < groups_any.length; index++) {
                groups[index] = Group.build_wANY(groups_any[index]);
            }
            instance.set_groups(groups);
            // eslint-disable-next-line no-empty
        } catch (error) {

        }
        //        console.log("group builded")
        try {
            instance.set_manga(Manga_2.build_any(Attribute.get_some_relationship(relationships, "manga")[0]));
            // eslint-disable-next-line no-empty
        } catch (error) {

        }
        try {
            instance.set_uploader(User.build_wANY(Attribute.get_some_relationship(relationships, "user")[0]));
            // eslint-disable-next-line no-empty
        } catch (error) {

        }
        //console.log("relationship builded")

        //        console.log("uploader builded")
        return instance;
    }
    public static async get_OnlineChapterbyId(id: string, client?: Client | undefined): Promise<Chapter_withAllIncludes> {
        const getted: Response<GetChapterIdData> = await Api_Request.get_methods("chapter/" + id + "?" + stringify({
            includes: ["manga", "user", "scanlation_group"]
        }), {
        }, client);
        const instance: Chapter_withAllIncludes = Chapter_withAllIncludes.build_W_Any(getted.data.data);
        return instance;
    }
    public static async get_ChapterbyId(id: string, client?: Client): Promise<GetChapterByIdResult> {
        if (await DeskApiRequest.ping(client) == true) {
            try {
                return {
                    isDownloaded: true,
                    ...(await Chapter.getAOfflineChapter(id, client))
                };
            } catch (error) {
                return {
                    data: await Chapter_withAllIncludes.get_OnlineChapterbyId(id, client),
                    isDownloaded: false,
                    hasFailed: false
                };
            }
        } else {
            return {
                data: await Chapter_withAllIncludes.get_OnlineChapterbyId(id, client),
                isDownloaded: false,
                hasFailed: false
            };
        }
    }
    public static async search(props:
        Chapter_withAllIncludes_SearchType
    ): Promise<Collection<Chapter_withAllIncludes>> {
        const querys = {
            limit: props.offset_limits.get_limits(),
            offset: props.offset_limits.get_offset(),
            title: props.title,
            uploader: props.uploader,
            manga: props.manga,
            volume: props.volume,
            includeFutureUpdates: props.includeFutureUpdates,
            createdAtSince: props.createdAtSince,
            updatedAtSince: props.updatedAtSince,
            publishAtSince: props.publishAtSince,
            order: props.order,
            includes: [
                "manga",
                "user",
                "scanlation_group"
            ],
            includeExternalUrl: "0",
            includeEmptyPages: "0",
            ids: props.ids,
            "groups[]": props.group,
            translatedLanguage: props.translatedLanguage,
            originalLanguage: props.originalLanguage,
            excludedOriginalLanguage: props.excludedOriginalLanguage,
            contentRating: props.content_rating,
            excludedGroup: props.excludedGroup,
            excludedUploaders: props.excludedUploaders
        };
        const getted: Response<GetChapterData> = await Api_Request.get_methods("chapter?" +
            stringify(querys)
            , undefined, props.client);
        const data = getted.data.data;
        const mangaArray: Array<Chapter_withAllIncludes> = new Array<Chapter_withAllIncludes>(data.length);
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
    public get_manga_id(): string {
        return this.manga.get_id();
    }
    public get_user_id(): string {
        return this.uploader.get_id();
    }
}