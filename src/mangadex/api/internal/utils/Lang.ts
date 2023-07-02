export class Lang{
    private name!: string;
    private two_letter!: string;
    private three_letter!: string;
    private flag_icon!: string;
    public set_flag_icon(flag_icon : string){
        this.flag_icon = flag_icon;
    }
    public set_name(name: string){
        this.name = name;
    }
    public set_two_letter(two_letter: string){
        this.two_letter = two_letter;
    }
    public set_three_letter(three_letter: string){
        this.three_letter = three_letter;
    }

    public get_name(): string{
        return this.name;
    }
    public get_two_letter(): string{
        return this.two_letter ;
    }
    public get_three_letter(): string{
        return this.three_letter;
    }
    public get_flag_icon(): string{
        return this.flag_icon;
    }
    public constructor(name: string, two_letter: string, three_letter: string, flag_icon : string){
        this.set_name(name);
        this.set_two_letter(two_letter);
        this.set_three_letter(three_letter);
        this.set_flag_icon(flag_icon);
    }
}