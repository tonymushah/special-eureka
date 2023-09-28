import { Offset_limits } from "../../internal/Utils";
import Collection from "../Collection";
import { Cover } from "../Cover";
import CoverSearchType from "../SearchType/Cover";

export default class CoverCollection extends Collection<Cover>{
    private prev_search_type!: CoverSearchType;
    /**
     * Getter $prev_search_type
     * @return {CoverSearchType}
     */
    public get $prev_search_type(): CoverSearchType {
        return this.prev_search_type;
    }

    /**
     * Setter $prev_search_type
     * @param {CoverSearchType} value
     */
    public set $prev_search_type(value: CoverSearchType) {
        this.prev_search_type = value;
    }
    constructor(data: Cover[], limit: number, offset: number, total: number, previous_search_type: CoverSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<Cover>> {
        const current_offset_limits = offset_limits;
        this.$prev_search_type.offset_Limits = current_offset_limits;
        return (Cover.search(this.prev_search_type));
    }
}
