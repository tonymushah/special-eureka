import { Offset_limits } from "../internal/Utils";

export abstract class Collection<T>{
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
    public next_offset_limit(): Offset_limits{
        let new_offset = this.get_offset() + this.get_limit();
            if(new_offset <= this.get_total() && new_offset >= 0){
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                return current_offset_limits;
            }else{
                throw (new Error("no next page"));
            }
    }
    public previous_offset_limit(): Offset_limits{
        let new_offset = this.get_offset() - this.get_limit();
            if(new_offset <= this.get_total() && new_offset >= 0){
                let current_offset_limits = new Offset_limits();
                current_offset_limits.set_limits(this.get_limit());
                current_offset_limits.set_offset(new_offset);
                return current_offset_limits;
            }else{
                throw (new Error("no previous page"));
            }
    }
    public abstract next(): Promise<Collection<T>>;
    public abstract previous() : Promise<Collection<T>>;
}