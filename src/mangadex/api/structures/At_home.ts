import { Client, Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Chapter } from "./Chapter";
export class At_Home{
    private chapter!: Chapter;
    private baseUrl!: string;
    private hash!: string;
    private data!: Array<string>;
    private dataSaver!: Array<string>;
    public set_chapter(chapter: Chapter){
        this.chapter = chapter;
    }
    public set_baseUrl(baseUrl: string){
        this.baseUrl = baseUrl;
    }
    public set_hash(hash: string){
        this.hash = hash;
    }
    public set_data(data: Array<string>){
        this.data = data;
    }
    public set_dataSaver(dataSaver: Array<string>){
        this.dataSaver = dataSaver;
    }

    public get_chapter(): Chapter{
        return this.chapter;
    }
    public get_baseUrl(): string{
        return this.baseUrl;
    }
    public get_hash(): string{
        return this.hash;
    }
    public get_data(): Array<string>{
        return this.data;
    }
    public get_dataSaver(): Array<string>{
        return this.dataSaver;
    }
    public constructor(
        baseUrl: string, 
        hash: string, 
        data: Array<string>, 
        dataSaver: Array<string>
    ){
        this.set_baseUrl(baseUrl);
        this.set_hash(hash);
        this.set_data(data);
        this.set_dataSaver(dataSaver);
    }
    public static build_W_Chapter(
        chapter: Chapter,
        baseUrl: string, 
        hash: string, 
        data: Array<string>, 
        dataSaver: Array<string>
    ):At_Home{
        const instance: At_Home = new At_Home(
            baseUrl,
            hash,
            data,
            dataSaver
        );
        instance.set_chapter(chapter);
        return instance;
    }
    public static build_wAny(object: any): At_Home{
        const chapter: any = object.chapter;
        const instance: At_Home = new At_Home(
            object.baseUrl, 
            chapter.hash, 
            chapter.data,
            chapter.dataSaver
        );
        return instance;
    }
    public get_data_ImgURL(): Array<string>{
        const instance: Array<string> = new Array<string>(this.data.length);
        for (let index = 0; index < instance.length; index++) {
            instance[index] = "" + this.baseUrl + "/" + "data" + "/" + this.hash + "/" + this.data[index];
        }
        return instance;
    }
    public get_dataSaver_ImgURL(): Array<string>{
        const instance: Array<string> = new Array<string>(this.dataSaver.length);
        for (let index = 0; index < instance.length; index++) {
            instance[index] = "" + this.baseUrl + "/" + "data-saver" + "/" + this.hash + "/" + this.dataSaver[index];
        }
        return instance;
    }
    public static async getAt_Home_wChID(id: string, forcePort443?: boolean, client?: Client): Promise<At_Home>{
        const querys: any = {
            forcePort443: (forcePort443)
        };
        try{
            const request: Promise<Response<any>> = Api_Request.get_methods("at-home/server/" + id, {
                query: querys
            }, client);
            const getted: Response<any> = await request;
            return At_Home.build_wAny(getted.data);
        }catch(e){
            throw new Error(e);
        }
    }
}