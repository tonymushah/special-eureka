import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import { Group_WithAllRelationShip } from "../Group";
import Group_WithAllRelationShip_SearchType from "../SearchType/GroupWAllIncludes";

export default class Group_WithAllRelationShip_Collection extends Collection<Group_WithAllRelationShip>{

    private prev_search_type!: Group_WithAllRelationShip_SearchType;
    /**
     * Getter $prev_search_type
     * @return {Group_WithAllRelationShip_SearchType}
     */
    public get $prev_search_type(): Group_WithAllRelationShip_SearchType {
        return this.prev_search_type;
    }

    /**
     * Setter $prev_search_type
     * @param {Group_WithAllRelationShip_SearchType} value
     */
    public set $prev_search_type(value: Group_WithAllRelationShip_SearchType) {
        this.prev_search_type = value;
    }
    constructor(data: Group_WithAllRelationShip[], limit: number, offset: number, total: number, previous_search_type: Group_WithAllRelationShip_SearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<Group_WithAllRelationShip>> {
        const current_offset_limits = offset_limits;
        this.$prev_search_type.offset_Limits = current_offset_limits;
        return Group_WithAllRelationShip.search(this.prev_search_type);
    }
}