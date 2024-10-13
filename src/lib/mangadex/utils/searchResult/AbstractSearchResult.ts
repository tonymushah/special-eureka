export default abstract class AbstractSearchResult<T> {
    data: T[];
    abstract hasNext(): boolean;
    abstract next(): Promise<AbstractSearchResult<T>>;
    constructor(data: T[]) {
        this.data = data;
    }
}