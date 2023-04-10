import { Offset_limits } from "../../internal/Utils";
import { Chapter_withAllIncludes } from "../Chapter";
import { Collection } from "../Collection";
import Chapter_withAllIncludes_SearchType from "../SearchType/Chapter_WAllIncludes";

export default class Chapter_WAllIncludesCollection extends Collection<Chapter_withAllIncludes>{
    private prev_search_type!: Chapter_withAllIncludes_SearchType;
    /**
     * Getter $prev_search_type
     * @return {Chapter_withAllIncludes_SearchType}
     */
    public get $prev_search_type(): Chapter_withAllIncludes_SearchType {
        return this.prev_search_type;
    }

    /**
     * Setter $prev_search_type
     * @param {Chapter_withAllIncludes_SearchType} value
     */
    public set $prev_search_type(value: Chapter_withAllIncludes_SearchType) {
        this.prev_search_type = value;
    }
    constructor(data: Chapter_withAllIncludes[], limit: number, offset: number, total: number, previous_search_type: Chapter_withAllIncludes_SearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<Chapter_withAllIncludes>> {
        return new Promise((resolve, reject) => {
            try {
                const current_offset_limits = this.next_offset_limit();
                this.$prev_search_type.offset_limits = current_offset_limits;
                resolve(Chapter_withAllIncludes.search(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });
    }
    public previous(): Promise<Collection<Chapter_withAllIncludes>> {
        return new Promise((resolve, reject) => {
            try {
                const current_offset_limits = this.previous_offset_limit();
                this.$prev_search_type.offset_limits = current_offset_limits;
                resolve(Chapter_withAllIncludes.search(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<Chapter_withAllIncludes>> {
        const current_offset_limits = offset_limits;
        this.$prev_search_type.offset_limits = current_offset_limits;
        return (Chapter_withAllIncludes.search(this.prev_search_type));
    }
}