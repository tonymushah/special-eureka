import { Offset_limits } from "../../internal/Utils";
import { Author } from "../Author";
import { Collection } from "../Collection";
import AuthorSearchType from "../SearchType/Author";
export default class AuthorCollection extends Collection<Author>{
    private prev_search_type! : AuthorSearchType;
    /**
     * Getter $prev_search_type
     * @return {AuthorSearchType}
     */
	public get $prev_search_type(): AuthorSearchType {
		return this.prev_search_type;
	}

    /**
     * Setter $prev_search_type
     * @param {AuthorSearchType} value
     */
	public set $prev_search_type(value: AuthorSearchType) {
		this.prev_search_type = value;
	}
    constructor(data : Author[], limit : number, offset : number, total: number, previous_search_type: AuthorSearchType) {
        super(data, limit, offset, total);
        this.$prev_search_type = previous_search_type;
    }
    public get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<Author>> {
        const current_offset_limits = offset_limits;
        this.$prev_search_type.offset_Limits = current_offset_limits;
        return Author.searchAuthor(this.prev_search_type);
    }
}
