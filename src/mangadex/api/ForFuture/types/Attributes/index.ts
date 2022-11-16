export type Attributes<T> = {
    id: string,
    type : string,
    attributes?: T,
    relationships?: Array<Attributes<any>>
}
