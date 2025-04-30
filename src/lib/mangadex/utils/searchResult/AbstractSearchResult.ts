export type PaginationData = {
	offset: number;
	limit: number;
	total: number;
};
// TODO Add pagination methods
export default abstract class AbstractSearchResult<T> {
	data: T[];
	abstract hasNext(): boolean;
	abstract next(): Promise<AbstractSearchResult<T>>;
	constructor(data: T[]) {
		this.data = data;
	}
	public abstract get paginationData(): PaginationData;
}
