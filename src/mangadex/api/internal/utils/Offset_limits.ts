export class Offset_limits{
    private limits = 0; 
    private offset = 10;
    public set_limits(limits: number) : Offset_limits{
        this.limits = limits;
        return this;
    }
    public set_offset(offset: number): Offset_limits{
        this.offset = offset;
        return this;
    }
    public get_limits(): number{
        return this.limits;
    }
    public get_offset(): number{
        return this.offset;
    }
    public constructor(offset? : number, limit?: number){
        this.set_limits(limit ?? 10);
        this.set_offset(offset ?? 0);
    }
    public static build(limits: number, offset: number): Offset_limits{
        const instance: Offset_limits = new Offset_limits();
        instance.set_limits(limits);
        instance.set_offset(offset);
        return instance;
    }
}