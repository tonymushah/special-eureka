import { Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Querry_list_builder, serialize } from "../internal/Utils";
import Comments from "./Comments";

export class Statistics_Manga{
    private mangaID: string;
    private follows: number;
    private average: number;
    private baeysian: number;
    private distribution: {
        "10" : number,
        "9" : number,
        "8" : number,
        "7" : number,
        "6" : number,
        "5" : number,
        "4" : number,
        "3" : number,
        "2" : number,
        "1" : number
    };
    private comments? : Comments

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
    public set_comments(comments : Comments){
        this.comments = comments;
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
    public get_comments(): Comments | undefined{
        return this.comments;
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
    public static async get_statsBy_MangaID(id: string): Promise<Statistics_Manga>{
        let responses: Response<any> = await Api_Request.get_methods("statistics/manga/" + id);
        let stats_not_TS: any = (responses.data.statistics)[id];
        let rating: any = stats_not_TS.rating;
        let instance = new Statistics_Manga(
            id,
            stats_not_TS.follows,
            rating.average,
            rating.baeysian,
            rating.distribution
        );
        instance.set_comments(stats_not_TS.comments);
        return instance;
    }
    public static async get_quick_statsBy_MangaID(id: Array<string>): Promise<Array<Statistics_Manga>>{
        let responses: Response<any> = await Api_Request.get_methods("statistics/manga/?" + serialize((new Querry_list_builder<string>("manga", id)).build()), {
        });
        let to_return : Array<Statistics_Manga> = new Array<Statistics_Manga>(id.length);
        for (let index = 0; index < to_return.length; index++) {
            let stats_not_TS: any = (responses.data.statistics)[id[index]];
            let rating: any = stats_not_TS.rating;
            to_return[index] = new Statistics_Manga(
                id[index],
                stats_not_TS.follows,
                rating.average,
                rating.baeysian,
                rating.distribution
            );
            to_return[index].set_comments(stats_not_TS.comments);
        }
        return to_return;
    }
    public get_distribution_sum() : number {
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
    }
    public get_distribution_length() : number{
        return 10;
    }
}

