import { Offset_limits } from "../../internal/Utils";
import Collection from "../Collection";
import { Client } from "@tauri-apps/api/http";
import { Cover } from "../Cover";
import Manga from "../Manga";

export default class AllDownloadedMangaCovers_Cover extends Collection<Cover>{

    private client!: Client;
    private manga_id!: string;

    /**
     * Getter $manga_id
     * @return {string}
     */
    public get $manga_id(): string {
        return this.manga_id;
    }

    /**
     * Setter $manga_id
     * @param {string} value
     */
    public set $manga_id(value: string) {
        this.manga_id = value;
    }

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
    constructor(params: { data: Array<Cover>, limit: number, offset: number, total: number }, manga_id: string, client: Client) {
        super(params.data, params.limit, params.offset, params.total);
        this.$client = client;
        this.$manga_id = manga_id;
    }
    public async get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<Cover>> {
        const getted = await Manga.getAllDownloadedCover_ofAManga(this.$manga_id, offset_limits, this.client);
        const data = await Promise.all(getted.get_data().map((id) => Cover.getAOfflineCover(id)));
        return new AllDownloadedMangaCovers_Cover({
            data,
            limit: getted.get_limit(),
            offset: getted.get_offset(),
            total: getted.get_total()
        }, this.$manga_id, this.$client);
    }
}