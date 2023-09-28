import { Client, Response } from "@tauri-apps/api/http";
import { stringify } from "qs";
import { Api_Request } from "../../internal/Api_Request";
import { GetStatisticsMangaData, GetStatisticsMangaUuidData } from "../../sta/data-contracts";
import Comments from "../Comments";
import { MangaStats_Distribution } from "./MangaStats_Distribution";

export default class Statistics_Manga {
    private mangaID!: string;
    private follows!: number;
    private average!: number;
    private baeysian!: number;
    private distribution?: MangaStats_Distribution;
    public comments?: Comments;

    public static distr_length: Array<number> = [1, 10];
    public set_mangaID(mangaID: string) {
        this.mangaID = mangaID;
    }
    public set_follows(follows: number) {
        this.follows = follows;
    }
    public set_average(average: number) {
        this.average = average;
    }
    public set_baeysian(baeysian: number) {
        this.baeysian = baeysian;
    }
    public set_distribution(distribution?: MangaStats_Distribution) {
        this.distribution = distribution;
    }
    public set_comments(comments?: Comments) {
        this.comments = comments;
    }

    public get_mangaID(): string {
        return this.mangaID;
    }
    public get_follows(): number {
        return this.follows;
    }
    public get_average(): number {
        return this.average;
    }
    public get_baeysian(): number {
        return this.baeysian;
    }
    public get_distribution(): MangaStats_Distribution | undefined {
        return this.distribution;
    }
    public get_comments(): Comments | undefined {
        return this.comments;
    }
    public constructor(
        mangaID: string,
        follows: number,
        average: number,
        baeysian: number,
        distribution?: MangaStats_Distribution
    ) {
        this.set_mangaID(mangaID);
        this.set_follows(follows);
        this.set_average(average);
        this.set_baeysian(baeysian);
        this.set_distribution(distribution);
    }
    public static async get_statsBy_MangaID(id: string, client?: Client): Promise<Statistics_Manga> {
        const responses: Response<GetStatisticsMangaUuidData> = await Api_Request.get_methods("statistics/manga/" + id, undefined, client);
        const stats_not_TS = (responses.data.statistics)[id];
        const rating = stats_not_TS.rating;
        const instance = new Statistics_Manga(
            id,
            stats_not_TS.follows,
            rating.average ?? 0,
            rating.bayesian,
            rating.distribution
        );
        instance.set_comments(stats_not_TS.comments ?? undefined);
        return instance;
    }
    public static async get_quick_statsBy_MangaID(id: Array<string>, client?: Client): Promise<Array<Statistics_Manga>> {
        const responses: Response<GetStatisticsMangaData> = await Api_Request.get_methods("statistics/manga/?" + stringify({
            manga: id
        }), undefined, client);
        const to_return: Array<Statistics_Manga> = new Array<Statistics_Manga>(id.length);
        for (let index = 0; index < to_return.length; index++) {
            const stats_not_TS = (responses.data.statistics)[id[index]];
            const rating = stats_not_TS.rating;
            to_return[index] = new Statistics_Manga(
                id[index],
                stats_not_TS.follows,
                rating.average ?? 0,
                rating.bayesian,
                undefined
            );
            to_return[index].set_comments(stats_not_TS.comments ?? undefined);
        }
        return to_return;
    }
    public get_distribution_sum(): number {
        if (this.distribution != undefined){
            return (
                this.distribution[1] +
                this.distribution[2] +
                this.distribution[3] +
                this.distribution[4] +
                this.distribution[5] +
                this.distribution[6] +
                this.distribution[7] +
                this.distribution[8] +
                this.distribution[9] +
                this.distribution[10]
            );
        }else {
            return 0;
        }
    }
    public get_distribution_length(): number {
        return 10;
    }
}

