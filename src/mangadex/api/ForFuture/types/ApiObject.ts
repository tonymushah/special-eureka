export type ApiObject<T> = {
    result: string,
    response : string,
    data : T,
    limit?: number,
    offset? : number,
    total? : number
}