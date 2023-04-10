export class Upload{
    protected static url = "https://uploads.mangadex.org/";
    public static make_upload_url(to_use: string): string{
        return (Upload.url + to_use);
    }
}