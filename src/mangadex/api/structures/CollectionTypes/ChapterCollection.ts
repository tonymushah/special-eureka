import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import ChapterSearchType from "../SearchType/Chapter";
import {Chapter} from "../Chapter";
export default class ChapterCollection extends Collection<Chapter>{
    private prev_search_type: ChapterSearchType;
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
    constructor(data: Chapter[], limit: number, offset: number, total: number, previous_search_type: ChapterSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<Chapter>> {
        return new Promise((resolve, reject) => {
            try {
                let current_offset_limits = this.next_offset_limit();
                this.$prev_search_type.offset_limits = current_offset_limits;
                resolve(Chapter.search(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });

    }
    public previous(): Promise<Collection<Chapter>> {
        return new Promise((resolve, reject) => {
            try {
                let current_offset_limits = this.previous_offset_limit();
                this.$prev_search_type.offset_limits = current_offset_limits;
                resolve(Chapter.search(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });

    }
}