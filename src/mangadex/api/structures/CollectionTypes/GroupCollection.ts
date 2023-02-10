import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import { Group } from "../Group";
import GroupSearchType from "../SearchType/Group";

export default class GroupCollection extends Collection<Group>{
    private prev_search_type : GroupSearchType;
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
    constructor(data : Group[], limit : number, offset : number, total: number, previous_search_type: GroupSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public next(): Promise<Collection<Group>> {
        return new Promise((resolve, reject) => {
            try {
                let current_offset_limits = this.next_offset_limit();
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(Group.search(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });
        
    }
    public previous(): Promise<Collection<Group>> {
        return new Promise<Collection<Group>>((resolve, reject) => {
            try {
                let current_offset_limits = this.previous_offset_limit();
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(Group.search(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });
        
    }
}
