import { Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Manga } from "./Manga";

export class Statistics{
    private mangaID: string;
    private follows: number;
    private average: number;
    private baeysian: number;
    private distribution: any;
    public static distr_length: Array<number> = [1, 10];
    public set_mangaID(mangaID: string){
        this.mangaID = mangaID;
    }
    public set_follows(follows: number){
        this.follows = follows;
    }
    public set_average(average: number){
        this.average = average;
    }
    public set_baeysian(baeysian: number){
        this.baeysian = baeysian;
    }
    public set_distribution(distribution: any){
        this.distribution = distribution;
    }

    public get_mangaID(): string{
        return this.mangaID;
    }
    public get_follows(): number{
        return this.follows;
    }
    public get_average(): number{
        return this.average;
    }
    public get_baeysian(): number{
        return this.baeysian;
    }
    public get_distribution(): any{
        return this.distribution
    }
    public constructor(
        mangaID: string,
        follows: number,
        average: number,
        baeysian: number,
        distribution: any
    ){
        this.set_mangaID(mangaID);
        this.set_follows(follows);
        this.set_average(average);
        this.set_baeysian(baeysian);
        this.set_distribution(distribution);
    }
    public static async get_statsBy_MangaID(id: string): Promise<Statistics>{
        let responses: Response<any> = await Api_Request.get_methods("statistics/manga/" + id);
        var stats_not_TS: any = (responses.data.statistics)[id];
        var rating: any = stats_not_TS.rating;
        return new Statistics(
            id,
            stats_not_TS.follows,
            rating.average,
            rating.baeysian,
            rating.distribution
        );
    }
    public static async get_quick_statsBy_MangaID(id: string): Promise<Statistics>{
        let responses: Response<any> = await Api_Request.get_methods("statistics/manga/", {
            query : {
                "manga[]" : id
            }
        });
        var stats_not_TS: any = (responses.data.statistics)[id];
        var rating: any = stats_not_TS.rating;
        return new Statistics(
            id,
            stats_not_TS.follows,
            rating.average,
            rating.baeysian,
            rating.distribution
        );
    }
}