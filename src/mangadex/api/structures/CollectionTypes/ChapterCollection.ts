import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import ChapterSearchType from "../SearchType/Chapter";
import { Chapter } from "../Chapter";
export default class ChapterCollection extends Collection<Chapter> {
    private prev_search_type!: ChapterSearchType;
    /**
     * Getter $prev_search_type
     * @return {ChapterSearchType}
     */
    public get $prev_search_type(): ChapterSearchType {
        return this.prev_search_type;
    }

    /**
     * Setter $prev_search_type
     * @param {ChapterSearchType} value
     */
    public set $prev_search_type(value: ChapterSearchType) {
        this.prev_search_type = value;
    }
    constructor(
        data: Chapter[],
        limit: number,
        offset: number,
        total: number,
        previous_search_type: ChapterSearchType
    ) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public get_by_Offset_limit(
        offset_limits: Offset_limits
    ): Promise<Collection<Chapter>> {
        const current_offset_limits = offset_limits;
        this.$prev_search_type.offset_limits = current_offset_limits;
        return Chapter.search(this.prev_search_type);
    }
}
