import { Attribute } from "./Attributes";

export class Collection<T extends Attribute>{
    private data: Array<T>;
    private limit: number;
    private offset: number;
    private total: number;
    private set_data(data: Array<T>){
        this.data = data;
    }
    private set_limit(limit: number){
        this.limit = limit;
    }
    private set_offset(offset: number){
        this.offset = offset;
    }
    private set_total(total: number){
        this.total = total;
    }
    public get_data(): Array<T>{
        return this.data;
    }
    public get_limit(): number{
        return this.limit;
    }
    public get_offset(): number{
        return this.offset;
    }
    public get_total(): number{
        return this.total;
    }
    public constructor(data: Array<T>, limit: number, offset: number, total: number){
        this.set_data(data);
        this.set_limit(limit);
        this.set_offset(offset);
        this.set_total(total);
    }
    public static build_with_any<T extends Attribute>(to_use: any): Collection<T>{
        return new Collection<T>(to_use.data, to_use.limit, to_use.offset, to_use.total);
    }
}