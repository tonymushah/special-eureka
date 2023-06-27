export class Demographic{
    private static SHOUJO = "shoujo";
    private static JOSEI = "josei";
    private static SHOUNEN = "shounen";
    private static SEINEN = "seinen";
    private static NONE = "none";
    public static shoujo(): string{
        return Demographic.SHOUJO;
    }
    public static josei(): string{
        return Demographic.JOSEI;
    }
    public static shounen(): string{
        return Demographic.SHOUNEN;
    }
    public static seinen(): string{
        return Demographic.SEINEN;
    }
    public static none(): string{
        return Demographic.NONE;
    }
    public static array(): Array<string>{
        return [
            Demographic.SHOUJO,
            Demographic.JOSEI,
            Demographic.SHOUNEN,
            Demographic.SEINEN,
            Demographic.NONE
        ];
    }
}