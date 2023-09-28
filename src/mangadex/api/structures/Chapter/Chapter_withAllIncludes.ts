import { Client, Response } from "@tauri-apps/api/http";
import { stringify } from "qs";
import { Api_Request } from "../../internal/Api_Request";
import DeskApiRequest from "../../offline/DeskApiRequest";
import { ChapterAttributes, GetChapterData, GetChapterIdData, Relationship, ScanlationGroup, Chapter as StaChapter } from "../../sta/data-contracts";
import GetChapterByIdResult from ".././additonal_types/GetChapterByIdResult";
import Attribute from "../Attributes";
import { Collection } from "../Collection";
import Chapter_WAllIncludesCollection from "../CollectionTypes/Chapter_WAllIncludesCollection";
import { Group } from "../Group";
import { Manga, Manga_2 } from "../Manga";
import Chapter_withAllIncludes_SearchType from "../SearchType/Chapter_WAllIncludes";
import { User } from "../User";
import Chapter from "./Chapter";

export default class Chapter_withAllIncludes extends Chapter {
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