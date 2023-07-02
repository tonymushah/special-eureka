export class Asc_Desc{
    private static ASC = "asc";
    private static DESC = "desc";
    public static asc():string{
        return Asc_Desc.ASC;
    }
    public static desc():string{
        return Asc_Desc.DESC;
    }
    public static array(): Array<string>{
        return [
            Asc_Desc.ASC, 
            Asc_Desc.DESC
        ];
    }
}