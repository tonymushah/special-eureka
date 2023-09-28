import { Offset_limits } from "../../internal/Utils";
import Collection from "../Collection";
import { Group } from "../Group";
import GroupSearchType from "../SearchType/Group";

export default class GroupCollection extends Collection<Group>{

    private prev_search_type!: GroupSearchType;
    /**
     * Getter $prev_search_type
     * @return {GroupSearchType}
     */
    public get $prev_search_type(): GroupSearchType {
        return this.prev_search_type;
    }

    /**
     * Setter $prev_search_type
     * @param {GroupSearchType} value
     */
    public set $prev_search_type(value: GroupSearchType) {
        this.prev_search_type = value;
    }
    constructor(data: Group[], limit: number, offset: number, total: number, previous_search_type: GroupSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<Group>> {
        const current_offset_limits = offset_limits;
        this.$prev_search_type.offset_Limits = current_offset_limits;
        return (Group.search(this.prev_search_type));
    }
}
