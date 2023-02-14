import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import { Manga_with_allRelationship } from "../Manga";
import MangaSearch_withAllIncludes from "../SearchType/MangaSearch_withAllIncludes";
export default class Manga_withAllIncludes_Collection extends Collection<Manga_with_allRelationship>{

    private prev_search_type!: MangaSearch_withAllIncludes;
    /**
     * Getter $prev_search_type
     * @return {MangaSearch_withAllIncludes}
     */
    public get $prev_search_type(): MangaSearch_withAllIncludes {
        return this.prev_search_type;
    }

    /**
     * Setter $prev_search_type
     * @param {MangaSearch_withAllIncludes} value
     */
    public set $prev_search_type(value: MangaSearch_withAllIncludes) {
        this.prev_search_type = value;
    }
    constructor(data: Manga_with_allRelationship[], limit: number, offset: number, total: number, previous_search_type: MangaSearch_withAllIncludes) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<Manga_with_allRelationship>> {
        let current_offset_limits = offset_limits;
        this.$prev_search_type.offset_Limits = current_offset_limits;
        return (Manga_with_allRelationship.search(this.prev_search_type));
    }
}