import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import { Manga } from "../Manga";
import MangaSearchType from "../SearchType/Manga";
export default class MangaCollection extends Collection<Manga>{
    
    private prev_search_type!: MangaSearchType;
    /**
     * Getter $prev_search_type
     * @return {MangaSearchType}
     */
	public get $prev_search_type(): MangaSearchType {
		return this.prev_search_type;
	}

    /**
     * Setter $prev_search_type
     * @param {MangaSearchType} value
     */
	public set $prev_search_type(value: MangaSearchType) {
		this.prev_search_type = value;
	}
    constructor(data : Manga[], limit : number, offset : number, total: number, previous_search_type: MangaSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<Manga>> {
        return new Promise((resolve, reject) => {
            try {
                let current_offset_limits = this.next_offset_limit();
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(Manga.search(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });
        
    }
    public previous(): Promise<Collection<Manga>> {
        return new Promise((resolve, reject) => {
            try {
                let current_offset_limits = this.previous_offset_limit();
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(Manga.search(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });
        
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<Manga>> {
        let current_offset_limits = offset_limits;
        this.$prev_search_type.offset_Limits = current_offset_limits;
        return (Manga.search(this.prev_search_type));
    }
}