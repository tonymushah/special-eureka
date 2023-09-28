import { Client } from "@tauri-apps/api/http";
import {
    Asc_Desc, Offset_limits,
    Order
} from "../../internal/Utils";
import DeskApiRequest from "../../offline/DeskApiRequest";
import {
    LocalizedString,
    MangaAttributes, Manga as StaManga
} from "../../sta/data-contracts";
import { Cover } from "../Cover";
import { Tag } from "../Tag";
import { Manga } from "./Manga";


export class Manga_2 extends Manga {
    private constructor(
        id: string,
        title: LocalizedString,
        description: LocalizedString,
        alt_title: LocalizedString[],
        status: string,
        last_chapter: string | null,
        last_volume: string | null,
        update_at: string,
        created_at: string,
        tags: Array<Tag>
    ) {
        super(
            id,
            title,
            description,
            alt_title,
            status,
            last_chapter,
            last_volume,
            update_at,
            created_at,
            tags
        );
    }
    public static build_any(object: StaManga /*
    please only input the real data please
    */

    ): Manga_2 {
        const attributes: MangaAttributes = object.attributes;
        //let relationships: any = object.relationships;
        const tags: Array<Tag> = new Array<Tag>(attributes.tags.length);
        for (let index = 0; index < attributes.tags.length; index++) {
            tags[index] = Tag.build_withAny(attributes.tags[index]);
        }
        const instance = new Manga_2(
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
        //instance.set_relationships_Wany(relationships);
        instance.set_avaible_language(attributes.availableTranslatedLanguages);
        instance.set_links(attributes.links);
        instance.set_ranting(attributes.contentRating);
        instance.set_demographic(attributes.publicationDemographic);
        instance.set_state(attributes.state);
        instance.set_originalLanguage(attributes.originalLanguage);
        instance.$latestUploadedChapter = attributes.latestUploadedChapter;
        instance.set_related(object.related);
        return instance;
    }
    public async get_online_coverArt(client?: Client): Promise<Cover> {
        const orders: Order = new Order();
        orders.set_volume(Asc_Desc.desc());
        try {
            const cover = (await Cover.search(
                {
                    offset_Limits: new Offset_limits(),
                    mangaIDs: [
                        this.get_id()
                    ],
                    order: orders,
                    client: client
                }
            ));
            return cover.get_data()[0];
        } catch (error) {
            throw new Error("No cover art for this manga " + this.get_title().en);
        }
    }
    public async get_cover_art(client?: Client): Promise<Cover> {
        if ((await DeskApiRequest.ping(client)) == true) {
            try {
                return await Manga.getOfflineMangaCover(this.get_id(), client);
            } catch (error) {
                return await this.get_online_coverArt(client);
            }
        } else {
            return await this.get_online_coverArt(client);
        }
    }
}
