export class ContentRating{
    private static SAFE = "safe";
    private static SUGGESTIVE = "suggestive";
    private static EROTICA = "erotica";
    private static PORNOGRAPHIC = "pornographic";
    public static safe(): string{
        return ContentRating.SAFE;
    }
    public static suggestive(): string{
        return ContentRating.SUGGESTIVE;
    }
    public static erotica(): string{
        return ContentRating.EROTICA;
    }
    public static pornographic(): string{
        return ContentRating.PORNOGRAPHIC;
    }
    public static array(): Array<string>{
        return [
            ContentRating.SAFE,
            ContentRating.SUGGESTIVE,
            ContentRating.EROTICA,
            ContentRating.PORNOGRAPHIC
        ];
    }
}
