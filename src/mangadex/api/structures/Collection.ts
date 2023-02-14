import { Offset_limits } from "../internal/Utils";

export abstract class Collection<T>{
    private data!: Array<T>;
    private limit!: number;
    private offset!: number;
    private total!: number;
    private set_data(data: Array<T>) {
        this.data = data;
    }
    private set_limit(limit: number) {
        this.limit = limit;
    }
    private set_offset(offset: number) {
        this.offset = offset;
    }
    private set_total(total: number) {
        this.total = total;
    }
    public get_data(): Array<T> {
        return this.data;
    }
    public get_limit(): number {
        return this.limit;
    }
    public get_offset(): number {
        return this.offset;
    }
    public get_total(): number {
        return this.total;
    }
    public constructor(data: Array<T>, limit: number, offset: number, total: number) {
        this.set_data(data);
        this.set_limit(limit);
        this.set_offset(offset);
        this.set_total(total);
    }
    public next_offset_limit(): Offset_limits {
        let new_offset = this.get_offset() + this.get_limit();
        if (new_offset <= this.get_total() && new_offset >= 0) {
            let current_offset_limits = new Offset_limits();
            current_offset_limits.set_limits(this.get_limit());
            current_offset_limits.set_offset(new_offset);
            return current_offset_limits;
        } else {
            throw (new Error("no next page"));
        }
    }
    public previous_offset_limit(): Offset_limits {
        let new_offset = this.get_offset() - this.get_limit();
        if (new_offset <= this.get_total() && new_offset >= 0) {
            let current_offset_limits = new Offset_limits();
            current_offset_limits.set_limits(this.get_limit());
            current_offset_limits.set_offset(new_offset);
            return current_offset_limits;
        } else {
            throw (new Error("no previous page"));
        }
    }
    public abstract get_by_Offset_limit(offset_limits: Offset_limits): Promise<Collection<T>>;
    public async next(): Promise<Collection<T>> {
        let current_offset_limits = this.next_offset_limit();
        return (this.get_by_Offset_limit(current_offset_limits));
    }
    public async previous(): Promise<Collection<T>> {
        let current_offset_limits = this.previous_offset_limit();
        return this.get_by_Offset_limit(current_offset_limits)
    }
    public get_number_of_page(): number{
        let number_page = Math.floor(this.total / this.limit);
        let number_element_plus = this.total % this.limit;
        if(number_element_plus == 0){
            number_page = number_page - 1;
        }
        return number_page;
    }
    public get_current_page(): number{
        if(this.offset % this.limit != 0){
            throw new Error("(offset % limit) should be 0");
        }else{
            return this.offset / this.limit;
        }
    }
    public async get_offset_limit_by_number_page(page: number) : Promise<Offset_limits>{
        if(page < 0 || page > this.get_number_of_page()){
            throw new Error("page invalid");
        }else{
            let current_offset_limits = new Offset_limits();
            current_offset_limits.set_limits(this.limit);
            current_offset_limits.set_offset(this.limit * page);
            return current_offset_limits
        }
    }
    public async get_by_number_page(page: number): Promise<Collection<T>>{
        let offset_Limits = await this.get_offset_limit_by_number_page(page);
        return this.get_by_Offset_limit(offset_Limits);
    }
    public get_first_page(): Promise<Collection<T>>{
        return this.get_by_number_page(0);
    }
    public get_last_page(): Promise<Collection<T>>{
        return this.get_by_number_page(this.get_number_of_page());
    }
}