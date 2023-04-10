import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import {Chapter} from "../Chapter";
import { Client } from "@tauri-apps/api/http";
export default class AllDownloadedChapterCollection extends Collection<string>{
    
    private client!: Client;
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
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<string>> {
        return Chapter.getAll_downloaded_chap(offset_limits, this.client);
    }
}