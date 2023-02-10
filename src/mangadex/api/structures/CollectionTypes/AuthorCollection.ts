import { Offset_limits } from "../../internal/Utils";
import { Author } from "../Author";
import { Collection } from "../Collection";
import AuthorSearchType from "../SearchType/Author";
export default class AuthorCollection extends Collection<Author>{
    private prev_search_type : AuthorSearchType;
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
    public next(): Promise<Collection<Author>> {
        return new Promise((resolve, reject) => {
            try {
                let current_offset_limits = this.next_offset_limit();
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(Author.searchAuthor(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });
    }
    public previous(): Promise<Collection<Author>> {
        return new Promise((resolve, reject) => {
            try {
                let current_offset_limits = this.previous_offset_limit();
                this.$prev_search_type.offset_Limits = current_offset_limits;
                resolve(Author.searchAuthor(this.prev_search_type));
            } catch (error) {
                reject(error);
            }
        });
    }
}
