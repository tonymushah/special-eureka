import { Offset_limits } from "../../internal/Utils";
import { Collection } from "../Collection";
import UserSearchType from "../SearchType/User";
import { User } from "../User";

export default class UserCollection extends Collection<User> {
    
    private prev_search_type!: UserSearchType;
    /**
     * Getter $prev_search_type
     * @return {UserSearchType}
     */
    public get $prev_search_type(): UserSearchType {
        return this.prev_search_type;
    }

    /**
     * Setter $prev_search_type
     * @param {UserSearchType} value
     */
    public set $prev_search_type(value: UserSearchType) {
        this.prev_search_type = value;
    }
    constructor(
        data: User[],
        limit: number,
        offset: number,
        total: number,
        previous_search_type: UserSearchType
    ) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<User>> {
        let current_offset_limits = offset_limits;
        this.$prev_search_type.offset_Limits = current_offset_limits;
        return (User.search(this.prev_search_type));
    }
}
