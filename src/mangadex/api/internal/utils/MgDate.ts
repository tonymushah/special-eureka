export class MGDate{
    private to_use!: Date;
    public set_To_use(MGDat: Date){
        this.to_use = MGDat;
    }
    public get_To_use(): Date{
        return this.to_use;
    }
    public get_isoFormat_string(): string{
        return this.to_use.toISOString().split(".")[0];
    }
    public constructor(to_use: Date){
        this.set_To_use(to_use);
    }
}