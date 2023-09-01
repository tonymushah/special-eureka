import { Client } from "@tauri-apps/api/http";
import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import { Manga } from "../Manga";
export default class AllDownloadedMangaCollection extends Collection<string>{
    
    private client?: Client;
    /**
     * Getter $client
     * @return {Client}
     */
	public get $client(): Client | undefined {
		return this.client;
	}

    /**
     * Setter $client
     * @param {Client} value
     */
	public set $client(value: Client | undefined) {
		this.client = value;
	}
    constructor(params:{data: Array<string>, limit: number, offset: number, total: number}, client?: Client) {
        super(params.data, params.limit, params.offset, params.total);
        this.$client = client;
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<string>> {
        return Manga.getAllOfflineMangaID(offset_limits, this.$client);
    }
}