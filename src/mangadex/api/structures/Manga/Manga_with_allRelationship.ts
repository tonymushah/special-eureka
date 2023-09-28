import {
    Client,
    Response
} from "@tauri-apps/api/http";
import { stringify } from "qs";
import { Api_Request } from "../../internal/Api_Request";
import {
    Author_Artists,
    Offset_limits,
    RelationshipsTypes
} from "../../internal/Utils";
import DeskApiRequest from "../../offline/DeskApiRequest";
import {
    MangaAttributes,
    MangaList,
    MangaResponse,
    Relationship,
    Manga as StaManga,
    Author as StaAuthor
} from "../../sta/data-contracts";
import Attribute from "../Attributes";
import { Author } from "../Author";
import Collection from "../Collection";
import Manga_withAllIncludes_Collection from "../CollectionTypes/Manga_withAllIncludes_Collection";
import { Cover } from "../Cover";
import MangaSearch_withAllIncludes from "../SearchType/MangaSearch_withAllIncludes";
import { Tag } from "../Tag";
import { GetMangaByIDResponse } from "./GetMangaByIDResponse";
import { Manga } from "./Manga";
import { Manga_2 } from "./Manga_2";


export class Manga_with_allRelationship extends Manga {
    private authors!: Array<Author>;
    private artists!: Array<Author>;
    private cover!: Cover;
    private related_manga!: Array<Manga>;

    /**
     * Getter $authors
     * @return {Array<Author>}
     */
    public get $authors(): Array<Author> {
        return this.authors;
    }

    /**
     * Setter $authors
     * @param {Array<Author>} value
     */
    public set $authors(value: Array<Author>) {
        this.authors = value;
    }

    /**
     * Getter $artists
     * @return {Array<Author>}
     */
    public get $artists(): Array<Author> {
        return this.artists;
    }

    /**
     * Setter $artists
     * @param {Array<Author>} value
     */
    public set $artists(value: Array<Author>) {
        this.artists = value;
    }

    /**
     * Getter $cover
     * @return {Cover}
     */
    public get $cover(): Cover {
        return this.cover;
    }

    /**
     * Setter $cover
     * @param {Cover} value
     */
    public set $cover(value: Cover) {
        this.cover = value;
    }

    /**
     * Getter $related_manga
     * @return {Array<Manga>}
     */
    public get $related_manga(): Array<Manga> {
        return this.related_manga;
    }

    /**
     * Setter $related_manga
     * @param {Array<Manga>} value
     */
    public set $related_manga(value: Array<Manga>) {
        this.related_manga = value;
    }


    public static build_any(object: StaManga /*
    please only input the real data please
    */

    ): Manga_with_allRelationship {
        const attributes: MangaAttributes = object.attributes;
        const relationships: Relationship[] = object.relationships;
        const tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        const instance = new Manga_with_allRelationship(
            object.id,
            attributes.title,
            attributes.description,
            attributes.altTitles,
            attributes.status,
            attributes.lastChapter,
            attributes.lastVolume,
            attributes.updatedAt,
            attributes.createdAt,
            tags
        );
        instance.set_relationships_Wany(relationships);
        try {
            const to_input_manga: Array<Manga> = [];
            const all_manga: Array<StaManga> = Attribute.get_some_relationship(relationships, "manga");
            for (let index = 0; index < all_manga.length; index++) {
                try {
                    to_input_manga[index] = Manga_2.build_any(all_manga[index]);
                    // eslint-disable-next-line no-empty
                } catch (error) {
                }
            }
            instance.$related_manga = to_input_manga.filter((value) => value != undefined || value != null);
            // eslint-disable-next-line no-empty
        } catch (error) {
        }
        try {
            const to_input_author: Array<Author> = [];
            const all_author: Array<StaAuthor> = Attribute.get_some_relationship(relationships, "author");
            for (let index = 0; index < all_author.length; index++) {
                to_input_author[index] = Author.build_wANY(all_author[index]);
            }
            instance.$authors = new Author_Artists(to_input_author, []).filtred;
            // eslint-disable-next-line no-empty
        } catch (error) { }
        try {
            const to_input_artists: Array<Author> = [];
            const all_artists: Array<StaAuthor> = Attribute.get_some_relationship(relationships, "artist");
            for (let index = 0; index < all_artists.length; index++) {
                to_input_artists[index] = Author.build_wANY(all_artists[index]);
            }
            instance.$artists = to_input_artists;
            // eslint-disable-next-line no-empty
        } catch (error) { }
        try {
            instance.$cover = Cover.build_withAny(Attribute.get_some_relationship(relationships, "cover_art")[0]);
            instance.$cover.get_relationships().push(instance);
            // eslint-disable-next-line no-empty
        } catch (error) { }
        instance.set_avaible_language(attributes.availableTranslatedLanguages);
        instance.set_links(attributes.links);
        instance.set_ranting(attributes.contentRating);
        instance.set_demographic(attributes.publicationDemographic);
        instance.set_state(attributes.state);
        instance.set_originalLanguage(attributes.originalLanguage);
        instance.$latestUploadedChapter = attributes.latestUploadedChapter;
        return instance;
    }
    public async get_author(): Promise<Array<Author>> {
        return new Author_Artists(this.$authors, []).filtred;
    }
    public async get_artist(): Promise<Array<Author>> {
        return new Promise((resolve) => {
            resolve(this.$artists);
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async get_cover_art(_client?: Client): Promise<Cover> {
        return new Promise((resolve) => {
            resolve(this.$cover);
        });
    }
    public async get_all_related_manga(): Promise<Manga[]> {
        return this.$related_manga;
    }
    public get_related_manga_byEnum_length(manga_relation_enum: string): number {
        let returns = 0;
        for (let index = 0; index < this.$related_manga.length; index++) {
            const element = this.$related_manga[index];
            if (element.get_related() == manga_relation_enum) {
                returns++;
            }
        }
        return returns;
    }
    public async get_related_manga_byEnum(manga_relation_enum: string): Promise<Manga[]> {
        const returns: Array<Manga> = new Array(this.get_related_manga_byEnum_length(manga_relation_enum));
        let index1 = 0;
        this.$related_manga.forEach(element => {
            if (element.get_related() == manga_relation_enum) {
                returns[index1] = element;
                index1++;
            }
        });
        return returns;
    }
    public async get_manga_related_by_id(mangaID: string): Promise<Manga> {
        for (let index = 0; index < this.$related_manga.length; index++) {
            const element = this.$related_manga[index];
            if (element.get_related() == mangaID) {
                return element;
            }
        }
        throw new Error("this manga " + mangaID + " is'nt related to " + this.get_id());
    }
    public async get_related_mangaID_byEnum(manga_relation_enum: string): Promise<string[]> {
        const returns: Array<string> = new Array(this.get_related_manga_byEnum_length(manga_relation_enum));
        let index1 = 0;
        this.$related_manga.forEach(element => {
            if (element.get_related() == manga_relation_enum) {
                returns[index1] = element.get_id();
                index1++;
            }
        });
        return returns;
    }
    public async get_author_byID(author_id: string): Promise<Author> {
        for (let index = 0; index < this.$authors.length; index++) {
            const element = this.$authors[index];
            if (element.get_id() == author_id) {
                return element;
            }
        }
        throw new Error(`no Author ${author_id} related to ${this.get_id()}`);
    }
    public async get_artist_byID(author_id: string): Promise<Author> {
        for (let index = 0; index < this.$artists.length; index++) {
            const element = this.$artists[index];
            if (element.get_id() == author_id) {
                return element;
            }
        }
        throw new Error(`no Artists ${author_id} related to ${this.get_id()}`);
    }
    public static async getOnlinebyID(id: string, client?: Client): Promise<Manga> {
        try {
            const getted: Promise<Response<MangaResponse>> = Api_Request.get_methods(Manga.get_request_a() + id + "?" +
                stringify({
                    includes: [
                        "manga",
                        RelationshipsTypes.artist(),
                        RelationshipsTypes.cover_art(),
                        RelationshipsTypes.author()
                    ]
                }), undefined, client);
            const to_use = await getted;
            return Manga_with_allRelationship.build_any(to_use.data.data);
        } catch (error) {
            if (typeof error == "string") {
                throw new Error(error);
            } else {
                throw new Error("Unknown error", {
                    cause: error
                });
            }
        }
    }
    public static async getMangaByID(id: string, client?: Client): Promise<GetMangaByIDResponse> {
        if (await DeskApiRequest.ping(client) == true) {
            try {
                return {
                    manga: await Manga.getOfflineMangaByID(id, client),
                    isOffline: true
                };
            } catch (e) {
                return {
                    manga: await Manga_with_allRelationship.getOnlinebyID(id, client),
                    isOffline: false
                };
            }
        } else {
            return {
                manga: await Manga_with_allRelationship.getOnlinebyID(id, client),
                isOffline: false
            };
        }
    }
    public static async search({
        offset_Limits = new Offset_limits(), title, authors, artists, year, includedTags, includedTagsMode, excludedTags, excludedTagsMode, status, originalLanguage, excludedOriginalLanguage, availableTranslatedLanguage, publicationDemographic, mangaIDs, createdAtSince, updatedAtSince, order, hasAvailableChapters, latestUploadedChapter, group, contentRating, client, authorOrArtist
    }: MangaSearch_withAllIncludes): Promise<Collection<Manga_with_allRelationship>> {
        const querys = {
            limit: offset_Limits.get_limits(),
            offset: offset_Limits.get_offset(),
            title: title,
            year: year,
            includedTagsMode,
            excludedTagsMode,
            createdAtSince,
            updatedAtSince,
            hasAvailableChapters,
            latestUploadedChapter,
            group,
            order,
            authorOrArtist,
            authors,
            artists,
            includedTags,
            excludedTags,
            status,
            originalLanguage,
            excludedOriginalLanguage,
            availableTranslatedLanguage,
            publicationDemographic,
            ids: mangaIDs,
            includes: [
                "manga",
                RelationshipsTypes.artist(),
                RelationshipsTypes.cover_art(),
                RelationshipsTypes.author()
            ],
            contentRating
        };
        const getted: Response<MangaList> = await Api_Request.get_methods("manga" + "?" +
            stringify(querys), undefined, client);
        const data: Array<StaManga> = getted.data.data;
        const mangaArray: Array<Manga_with_allRelationship> = new Array<Manga_with_allRelationship>(data.length);
        for (let index = 0; index < data.length; index++) {
            mangaArray[index] = Manga_with_allRelationship.build_any(data[index]);
        }
        return new Manga_withAllIncludes_Collection(mangaArray, getted.data.limit, getted.data.offset, getted.data.total,
            {
                offset_Limits: offset_Limits,
                title: title,
                authors: authors,
                artists: artists,
                year: year,
                includedTags: includedTags,
                includedTagsMode: includedTagsMode,
                excludedTags: excludedTags,
                excludedTagsMode: excludedTagsMode,
                status: status,
                originalLanguage: originalLanguage,
                excludedOriginalLanguage: excludedOriginalLanguage,
                availableTranslatedLanguage: availableTranslatedLanguage,
                publicationDemographic: publicationDemographic,
                mangaIDs: mangaIDs,
                createdAtSince: createdAtSince,
                updatedAtSince: updatedAtSince,
                order: order,
                hasAvailableChapters: hasAvailableChapters,
                latestUploadedChapter: latestUploadedChapter,
                group: group,
                client: client
            });
    }
}
