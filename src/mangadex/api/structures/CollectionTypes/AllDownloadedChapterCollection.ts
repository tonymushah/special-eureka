import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import {Chapter} from "../Chapter";
import { Client } from "@tauri-apps/api/http";

export type AllDownloadedChapterCollectionParams = {
    include_fails?: boolean,
    only_fails?: boolean
}
export default class AllDownloadedChapterCollection extends Collection<string>{
    
    private client!: Client;
    private _params?: AllDownloadedChapterCollectionParams;
    public get params(): AllDownloadedChapterCollectionParams | undefined {
        return this._params;
    }
    public set params(value: AllDownloadedChapterCollectionParams | undefined) {
        this._params = value;
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
    constructor(params:{data: Array<string>, limit: number, offset: number, total: number, _params?: AllDownloadedChapterCollectionParams}, client: Client) {
        super(params.data, params.limit, params.offset, params.total);
        this.$client = client;
        this._params = params._params;
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<string>> {
        return Chapter.getAll_downloaded_chap({
            offset_limits,
            ...this._params
        }, this.client);
    }
}