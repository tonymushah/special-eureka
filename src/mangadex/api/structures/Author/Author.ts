import { Client } from "@tauri-apps/api/http";
import { stringify } from "qs";
import { Api_Request } from "../../internal/Api_Request";
import { Offset_limits, RelationshipsTypes } from "../../internal/Utils";
import { AuthorAttributes, AuthorResponse, GetAuthorData, LocalizedString, Relationship, Author as StaAuthor } from "../../sta/data-contracts";
import Attribute from "../Attributes";
import Collection from "../Collection";
import AuthorCollection from "../CollectionTypes/AuthorCollection";
import Manga from "../Manga";
import AuthorSearchType from "../SearchType/Author";

export default class Author extends Attribute {
    private name!: string;
    private imageUrl!: string | null;
    private biography!: LocalizedString;
    twitter!: string | null;
    pixiv!: string | null;
    melonBook!: string | null;
    fanbox!: string | null;
    booth!: string | null;
    nicoVideo!: string | null;
    skeb!: string | null;
    fantia!: string | null;
    tumblr!: string | null;
    youtube!: string | null;
    weibo!: string | null;
    naver!: string | null;
    website!: string | null;
    private works: Collection<Manga> | undefined;
    public has_socials() {
        if (
            this.twitter != null ||
            this.pixiv != null ||
            this.melonBook != null ||
            this.fanbox != null ||
            this.booth != null ||
            this.nicoVideo != null ||
            this.skeb != null ||
            this.fantia != null ||
            this.tumblr != null ||
            this.youtube != null ||
            this.weibo != null ||
            this.naver != null ||
            this.website != null
        ) {
            return true;
        } else {
            return false;
        }
    }
    public set_Name(name: string) {
        this.name = name;
    }
    public set_biography(biography: LocalizedString) {
        this.biography = biography;
    }
    public set_imageUrl(imageUrl: string | null) {
        this.imageUrl = imageUrl;
    }
    public set_works(works: Collection<Manga>) {
        this.works = works;
    }
    public get_biography(): LocalizedString {
        return this.biography;
    }
    public get_Name(): string {
        return this.name;
    }
    public get_imageUrl(): string | null {
        return this.imageUrl;
    }
    public get_works(): Collection<Manga> | undefined {
        return this.works;
    }
    public async build_Works(client?: Client) {
        const works_id = this.get_some_relationship("manga").map((d) => d.get_id());
        if (works_id.length != 0) {
            this.set_works((await Manga.search({
                offset_Limits: new Offset_limits(),
                client: client,
                mangaIDs: works_id
            })));
        }

    }
    public constructor(id: string, name: string, imageUrl: string | null) {
        super(id, "author");
        this.set_Name(name);
        this.set_imageUrl(imageUrl);
    }
    public static build_wANY(object: StaAuthor): Author {
        const attributes: AuthorAttributes = object.attributes;
        const relationships: Relationship[] = object.relationships;
        const instance: Author = new Author(
            object.id,
            attributes.name,
            attributes.imageUrl
        );
        instance.twitter = attributes.twitter;
        instance.pixiv = attributes.pixiv;
        instance.melonBook = attributes.melonBook;
        instance.fanbox = attributes.fanBox;
        instance.booth = attributes.booth;
        instance.nicoVideo = attributes.nicoVideo;
        instance.skeb = attributes.skeb;
        instance.fantia = attributes.fantia;
        instance.tumblr = attributes.tumblr;
        instance.naver = attributes.naver;
        instance.weibo = attributes.weibo;
        instance.website = attributes.website;
        instance.youtube = attributes.youtube;
        instance.set_biography(attributes.biography);
        try {
            instance.set_relationships_Wany(relationships);
            // eslint-disable-next-line no-empty
        } catch (error) {
        }
        return instance;
    }
    public getUrl_twitter(): string | null {
        if (this.twitter == null) {
            return null;
        } else {
            return "https://twitter.com/" + this.twitter;
        }
    }
    public getUrl_pixiv(): string | null {
        if (this.pixiv == null) {
            return null;
        } else {
            return "https://pixiv.net/" + this.pixiv;
        }
    }
    public getUrl_melonBook(): string | null {
        if (this.melonBook == null) {
            return null;
        } else {
            return "https://melonbooks.co.jp/" + this.melonBook;
        }
    }
    public getUrl_fanbox(): string | null {
        if (this.fanbox == null) {
            return null;
        } else {
            return "https://fanbox.cc/" + this.fanbox;
        }
    }
    public getUrl_booth(): string | null {
        if (this.booth == null) {
            return null;
        } else {
            return "https://booth.pm/" + this.booth;
        }
    }
    public getUrl_nicoVideo(): string | null {
        if (this.nicoVideo == null) {
            return null;
        } else {
            return "https://nicovideo.jp/" + this.nicoVideo;
        }
    }
    public getUrl_skeb(): string | null {
        if (this.skeb == null) {
            return null;
        } else {
            return "https://skeb.jp/" + this.skeb;
        }
    }
    public getUrl_fantia(): string | null {
        if (this.fantia == null) {
            return null;
        } else {
            return "https://fantia.jp/" + this.fantia;
        }
    }
    public getUrl_tumblr(): string | null {
        if (this.tumblr == null) {
            return null;
        } else {
            return "https://tumblr.com/" + this.tumblr;
        }
    }
    public getUrl_youtube(): string | null {
        if (this.youtube == null) {
            return null;
        } else {
            return "https://www.youtube.com/" + this.youtube;
        }
    }
    public getUrl_weibo(domain = "cn"): string | null {
        if (this.weibo == null) {
            return null;
        } else {
            return "https://weibo." + domain + "/" + this.weibo;
        }
    }
    public getUrl_naver(): string | null {
        if (this.naver == null) {
            return null;
        } else {
            return "https://naver.com/" + this.naver;
        }
    }
    public getUrl_website(): string | null {
        if (this.website == null) {
            return null;
        } else {
            return "https://" + this.website;
        }
    }
    public static get_request_a(): string {
        return "author/";
    }
    public static async getAuthorById(id: string, client?: Client): Promise<Author> {
        try {
            const getted = await Api_Request.get_methods<AuthorResponse>(Author.get_request_a() + id, undefined, client);
            const instance: Author = Author.build_wANY(getted.data.data);
            return instance;
        } catch (error) {
            if (typeof error == "string") {
                throw new Error(error);
            } else {
                throw new Error("Unknown Error ;(", {
                    cause: error
                });
            }
        }
    }
    public static async searchAuthor(
        {
            offset_Limits = new Offset_limits(),
            name,
            ids,
            order,
            includes,
            client
        }: AuthorSearchType
    ): Promise<Collection<Author>> {
        const querys = {
            limit: offset_Limits.get_limits(),
            offset: offset_Limits.get_offset(),
            name: name,
            order,
            ids,
            includes
        };
        const getted = await Api_Request.get_methods<GetAuthorData>(Author.get_request_a() + "?" +
            stringify(querys)
            , undefined, client);
        const data = getted.data.data;
        const authorArray: Array<Author> = new Array<Author>(data.length);
        for (let index = 0; index < data.length; index++) {
            authorArray[index] = Author.build_wANY(data[index]);
        }
        return new AuthorCollection(authorArray, getted.data.limit, getted.data.offset, getted.data.total, {
            offset_Limits: offset_Limits,
            name: name,
            ids: ids,
            order: order,
            includes: includes
        });
    }
    public get_key_word(): string;
    public get_key_word(isArtist?: boolean): string {
        if (isArtist == undefined || !isArtist) {
            return RelationshipsTypes.author();
        } else {
            return RelationshipsTypes.artist();
        }
    }
}