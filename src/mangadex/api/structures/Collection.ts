export class Collection{
    private data: Array<any>;
    private limit: number;
    private offset: number;
    private set_data(data: Array<any>){
        this.data = data;
    }
    private set_limit(limit: number){
        this.limit = limit;
    }
    private set_offset(offset: number){
        this.offset = offset;
    }
    public get_data(): Array<any>{
        return this.data;
    }
    public get_limit(): number{
        return this.limit;
    }
    public get_offset(): number{
        return this.offset;
    }
    public constructor(data: Array<any>, limit: number, offset: number){
        this.set_data(data);
        this.set_limit(limit);
        this.set_offset(offset)
    }
    public static build_with_any(to_use: any): Collection{
        return new Collection(to_use.data, to_use.limit, to_use.offset);
    }
}