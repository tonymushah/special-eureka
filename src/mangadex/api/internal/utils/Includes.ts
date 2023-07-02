export class Includes{
    private static MANGA = "manga";
    private static CHAPTER = "chapter";
    private static COVER_ART = "cover_art";
    private static AUTHOR = "author";
    private static ARTIST = "artist";
    private static SCANLATION_GROUP = "scanlation_group";
    private static TAG = "tag";
    private static USER = "user";
    private static CUSTOM_LIST = "custom_list";
    public static manga(): string{
        return Includes.MANGA;
    }
    public static chapter(): string{
        return Includes.CHAPTER;
    }
    public static cover_art(): string{
        return Includes.COVER_ART;
    }
    public static author(): string{
        return Includes.AUTHOR;
    }
    public static artist(): string{
        return Includes.ARTIST;
    }
    public static scanlation_group(): string{
        return Includes.SCANLATION_GROUP;
    }
    public static tag(): string{
        return Includes.TAG;
    }
    public static user(): string{
        return Includes.USER;
    }
    public static custom_list(): string{
        return Includes.CUSTOM_LIST;
    }
    public static array(): Array<string>{
        return [
            Includes.MANGA,
            Includes.CHAPTER,
            Includes.COVER_ART,
            Includes.AUTHOR,
            Includes.ARTIST,
            Includes.SCANLATION_GROUP,
            Includes.TAG,
            Includes.USER,
            Includes.CUSTOM_LIST
        ];
    }
}
