import { Offset_limits } from "../../internal/Utils";
import Collection from "../Collection";
import UserSearchType from "../SearchType/User";
import { User } from "../User";

export default class UserCollectionWToken extends Collection<User>{

    private prev_search_type!: UserSearchType;
    private token!: string;
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
    /**
     * Getter $token
     * @return {string}
     */
    public get $token(): string {
        return this.token;
    }

    /**
     * Setter $token
     * @param {string} value
     */
    public set $token(value: string) {
        this.token = value;
    }
    constructor(data: User[], limit: number, offset: number, total: number, token: string, previous_search_type: UserSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
        this.$token = token;
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<User>> {
        const current_offset_limits = offset_limits;
        this.$prev_search_type.offset_Limits = current_offset_limits;
        return (User.search_user_wtoken(this.$token, this.prev_search_type));
    }
}
