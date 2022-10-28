import { Api_Request } from "../internal/Api_Request";
import { Response } from "@tauri-apps/api/http";
import { Chapters } from "./Chapter";
import { Volume } from "./Volume";
import { Manga } from "./Manga";
import { Querry_list_builder } from "../internal/Utils";
import { getCurrent } from "@tauri-apps/api/window";

export class Aggregate{
    private count: number;
    private volumes: Array<Volume>;
    public set_count(count: number){
        this.count = count;
    }
    public set_volumes(volumes: Array<Volume>){
        this.volumes = volumes;
    }
    public get_count(): number{
        return this.count;
    }
    public get_volumes(): Array<Volume>{
        return this.volumes;
    }
    public constructor(count: number, volumes: Array<Volume>){
        this.set_count(count);
        this.set_volumes(volumes);
    }
    public static build_wANY(object: any): Aggregate{
        var volumes_length: number = 0;
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                volumes_length = volumes_length + 1;
            }
        }
        var volumes_: Array<Volume> = new Array<Volume>(volumes_length);
        let index: number = 0;
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                volumes_[index] = Volume.build_wANY(object[key]);
                index = index + 1;
            }
        }
        var instance: Aggregate = new Aggregate(volumes_length, volumes_);
        return instance;
    }
    public static async build_wANY2(object: any): Promise<Aggregate>{
        var volumes_length: number = 0;
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                volumes_length = volumes_length + 1;
            }
        }
        var volumes_: Array<Volume> = new Array<Volume>(volumes_length);
        let index: number = 0;
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                volumes_[index] = await Volume.build_wANY2(object[key]);
                index = index + 1;
            }
        }
        var instance: Aggregate = new Aggregate(volumes_length, volumes_);
        return instance;
    }
    public static async get_aggregate(
        mangaID: string, 
        translatedLanguage?: Array<string>,
        groups? : Array<string>
    ): Promise<Aggregate>{
        var getted: Response<any> = await Api_Request.get_methods(
            Manga.get_request_a() + mangaID + "/aggregate",
            {
                query: {
                    ...(new Querry_list_builder("translatedLanguage", translatedLanguage!)).build(),
                    ...(new Querry_list_builder("groups", groups!)).build()
                }
            }
            );
        return Aggregate.build_wANY(getted.data.volumes);
    }
    public async getNext(id: string) : Promise<string>{
        for (let index = 0; index < this.volumes.length; index++) {
            const volume = this.volumes[index];
            try {
                let result: string | boolean = volume.getNext(id);
                if(typeof result == "boolean"){
                    let index_to_use = index + 1;
                    if(index_to_use >= this.get_volumes().length){
                        throw Error("this chapter has no next chapter");
                    }else{
                        return this.volumes[index + 1].get_chapters()[0].get_ids()[0];
                    }
                }else{
                    return result!;
                }
            } catch (error) {
                
            }
        }
        throw Error("this chapter "+ id +" has no next chapter");
    }
    public async getPrevious(id: string) : Promise<string>{
        for (let index = 0; index < this.volumes.length; index++) {
            const volume = this.volumes[index];
            try {
                let result: string | boolean = volume.getPrevious(id);
                if(typeof result == "boolean"){
                    let index_to_use = index - 1;
                    if(index_to_use >= this.get_volumes().length){
                        throw Error("this chapter has no previous chapter");
                    }else{
                        return this.volumes[index - 1].get_chapters()[0].get_ids()[0];
                    }
                }else{
                    return result!;
                }
            } catch (error) {
                
            }
        }
        throw Error("this chapter "+ id +" has no previous chapter");
    }
    public async getCurrent(id: string): Promise<string>{
        for (let index = 0; index < this.volumes.length; index++) {
            const volume = this.volumes[index];
            try {
                return volume.getCurrent(id);
            } catch (error) {
                
            }
        }
        throw Error("this chapter "+ id +" isn't in this manga");
    }
}