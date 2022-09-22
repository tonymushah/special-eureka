import { Api_Request } from "../internal/Api_Request";
import { Response } from "@tauri-apps/api/http";
import { Chapters } from "./Chapter";
import { Volume } from "./Volume";

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
}