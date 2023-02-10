import { Client } from "@tauri-apps/api/http";
import { Collection } from "../Collection";
import { Manga } from "../Manga";

export default class AllDownloadedChap_Of_aMangaCollection extends Collection<string>{
    private client: Client;
    private manga_id: string;

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
    constructor(params:{data: Array<string>, limit: number, offset: number, total: number}, manga_id: string ,client: Client) {
        super(params.data, params.limit, params.offset, params.total);
        this.$client = client;
        this.$manga_id = manga_id;
    }
    public next(): Promise<Collection<string>> {
        return new Promise((resolve, reject) => {
            try {
                let current_offset_limits = this.next_offset_limit();
                resolve(Manga.getAllDownloadedChapters_ofAManga(this.$manga_id, current_offset_limits, this.client));
            } catch (error) {
                reject(error);
            }
        });
    }
    public previous(): Promise<Collection<string>> {
        return new Promise((resolve, reject) => {
            try {
                let current_offset_limits = this.previous_offset_limit();
                resolve(Manga.getAllDownloadedChapters_ofAManga(this.$manga_id, current_offset_limits, this.client));
            } catch (error) {
                reject(error);
            }
        });
    }
    
}