export class Order{
    private title!: string;
    private createdAt!: string;
    private updatedAt!: string;
    private publishAt!: string;
    private readableAt!: string;
    private volume!: string;
    private chapter!: string;
    private latestUploadedChapter!: string;
    private followedCount!: string;
    private relevance!: string;
    public set_createdAt(createdAt: string){
        this.createdAt = createdAt;
        return this;
    }
    public set_title(title: string){
        this.title = title;
        return this;
    }
    public set_updatedAt(updatedAt: string){
        this.updatedAt = updatedAt;
        return this;
    }
    public set_publishAt(publishAt: string){
        this.publishAt = publishAt;
        return this;
    }
    public set_readableAt(readableAt: string){
        this.readableAt = readableAt;
        return this;
    }
    public set_volume(volume: string){
        this.volume = volume;
        return this;
    }
    public set_chapter(chapter: string){
        this.chapter = chapter;
        return this;
    }
    public set_latestUploadedChapter(latestUploadedChapter: string){
        this.latestUploadedChapter = latestUploadedChapter;
        return this;
    }
    public set_followedCount(followedCount: string){
        this.followedCount = followedCount;
        return this;
    }
    public set_relevance(relevance: string){
        this.relevance = relevance;
        return this;
    }
    public constructor(
        createdAt?: string,
        updatedAt?: string,
        publishAt?: string,
        readableAt?: string,
        volume?: string,
        chapter?: string,
        latestUploadedChapter?: string,
        followedCount? : string,
        relevance? : string,
        title?: string
    ){
        this.set_createdAt(createdAt!);
        this.set_updatedAt(updatedAt!);
        this.set_publishAt(publishAt!);
        this.set_readableAt(readableAt!);
        this.set_volume(volume!);
        this.set_chapter(chapter!);
        this.set_latestUploadedChapter(latestUploadedChapter!);
        this.set_followedCount(followedCount!);
        this.set_relevance(relevance!);
        this.set_title(title!);
    }
    public render(): Record<string, string>{
        return ({
            "order[createdAt]": this.createdAt,
            "order[updatedAt]": this.updatedAt,
            "order[readableAt]": this.readableAt,
            "order[volume]": this.volume,
            "order[chapter]": this.chapter,
            "order[latestUploadedChapter]": this.latestUploadedChapter,
            "order[publishAt]": this.publishAt,
            "order[relevance]": this.relevance,
            "order[followedCount]": this.followedCount,
            "order[title]": this.title
        });
    }

}