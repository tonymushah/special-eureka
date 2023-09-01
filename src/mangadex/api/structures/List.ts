import { Client, Response, getClient } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Offset_limits, RelationshipsTypes } from "../internal/Utils";
import { Attribute } from "./Attributes";
import { Manga, Manga_with_allRelationship } from "./Manga";
import { User } from "./User";
import { CustomList, CustomListAttributes, CustomListResponse, Relationship } from "../sta/data-contracts";

type Seasonal = {
    id: string
}

export class List extends Attribute {
    private name!: string;
    private visibility!: string;
    private version!: number;
    private manga_array!: Array<Manga>;
    public set_name(name: string) {
        this.name = name;
    }
    public set_manga_array(manga_array: Array<Manga>) {
        this.manga_array = manga_array;
    }
    public set_visibility(visibility: string) {
        this.visibility = visibility;
    }
    public set_version(version: number) {
        this.version = version;
    }

    public get_manga_array(): Array<Manga> {
        return this.manga_array;
    }
    public get_name(): string {
        return this.name;
    }
    public get_visibility(): string {
        return this.visibility;
    }
    public get_version(): number {
        return this.version;
    }
    public constructor(
        id: string,
        name: string,
        visibility: string,
        version: number
    ) {
        super(id, List.get_key_word());
        this.set_name(name);
        this.set_version(version);
        this.set_visibility(visibility);
    }
    public static build_w_any(object: CustomList): List {
        const attributes: CustomListAttributes = object.attributes;
        const relationships: Relationship[] = object.relationships;
        const instance: List = new List(
            object.id,
            attributes.name,
            attributes.visibility,
            attributes.version
        );
        instance.set_relationships_Wany(relationships);
        return instance;
    }
    public async build_mangaArray(client?: Client) {
        const manga_attributes: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.manga());
        const manga_array: Array<Manga> = new Array<Manga>(manga_attributes.length);
        for (let index = 0; index < manga_attributes.length; index++) {
            const choosed = manga_attributes[index];
            manga_array[index] = (await Manga.getMangaByID(choosed.get_id(), client)).manga;
        }
        this.set_manga_array(manga_array);
    }
    public async build_and_get_mangaArray(client?: Client): Promise<Array<Manga>> {
        await this.build_mangaArray(client);
        return this.get_manga_array();
    }
    public async getUploaders(client?: Client): Promise<Array<User>> {
        const user_attributes: Array<Attribute> = this.get_some_relationship(RelationshipsTypes.user());
        const user_array: Array<User> = new Array<User>(user_attributes.length);
        for (let index = 0; index < user_attributes.length; index++) {
            const choosed = user_attributes[index];
            user_array[index] = await User.getUserById(choosed.get_id(), client);
        }
        return user_array;
    }
    public get_key_word(): string {
        return RelationshipsTypes.custom_list();
    }
    public static get_key_word(): string {
        return RelationshipsTypes.custom_list();
    }
    public static async getListByID(id: string, client?: Client): Promise<List> {
        const response: Response<CustomListResponse> = await Api_Request.get_methods("list/" + id, undefined, client);
        return List.build_w_any(response.data.data);
    }
    public static async getListByID_includes_manga(id: string, client?: Client): Promise<List> {
        const response: Response<CustomListResponse> = await Api_Request.get_methods("list/" + id, undefined, client);
        const list = List.build_w_any(response.data.data);
        const manga_ids = list.getMangaIDList();
        const newMangaOffset = new Offset_limits();
        newMangaOffset.set_limits(manga_ids.length);
        const manga_array = (await Manga_with_allRelationship.search({
            offset_Limits: newMangaOffset,
            mangaIDs: manga_ids
        })).get_data();
        list.set_manga_array(manga_array);
        return list;
    }

    public static async RgetListByID_includes_manga(id: string, client?: Client): Promise<Response<CustomListResponse>> {
        return await Api_Request.get_methods("list/" + id, {
            query: {
                "includes[]": "manga"
            }
        }, client);
    }
    public getMangaIDList(): Array<string> {
        const mangas_relationships: Array<Attribute> = this.get_some_relationship("manga");
        const returns: Array<string> = [];
        if (mangas_relationships.length != 0) {
            for (let index = 0; index < mangas_relationships.length; index++) {
                returns[index] = mangas_relationships[index].get_id();
            }
        } else {
            throw new Error("the relationship array is empty");
        }

        return returns;
    }
    public static async get_seasonal_id(client?: Client): Promise<string> {
        let isInternal = false;
        if(client == undefined){
            client = await getClient();
            isInternal = true;
        }
        const res = await client.get<Seasonal>("https://raw.githubusercontent.com/tonymushah/special-eureka/master/public/mangadex/json/seasonal.json");
        if(isInternal){
            await client.drop();
        }
        return res.data.id;
    }
}
