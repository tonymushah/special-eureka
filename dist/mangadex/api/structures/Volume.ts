import { Api_Request } from "../internal/Api_Request";
import { Response } from "@tauri-apps/api/http";
import { Chapters } from "./Chapter";

export class Volume{
    private name: string;
    private count: number;
    private chapters: Array<Chapters>;
    public set_name(name: string){
        this.name = name;
    }
    public set_count(count: number){
        this.count = count;
    }
    public set_chapters(chapters: Array<Chapters>){
        this.chapters = chapters;
    }
    public get_name(): string{
        return this.name;
    }
    public get_count(): number{
        return this.count;
    }
    public get_chapters(): Array<Chapters>{
        return this.chapters;
    }
    public constructor(name: string, count: number, chapters: Array<Chapters>){
        this.set_name(name);
        this.set_count(count);
        this.set_chapters(chapters);
    }
    public static build_wANY(object: any): Volume{
        var chapters_getted: any = object.chapters;
        var chapters_getted_length: number = 0;
        for (const key in chapters_getted) {
            if (Object.prototype.hasOwnProperty.call(chapters_getted, key)) {
                chapters_getted_length = chapters_getted_length + 1;
            }
        }
        var chapters: Array<Chapters> = new Array<Chapters>(chapters_getted_length);
        let index: number = 0;
        for (const key in chapters_getted) {
            if (Object.prototype.hasOwnProperty.call(chapters_getted, key)) {
                chapters[index] = Chapters.build_wANY(chapters_getted[key]);
                index = index + 1;
            }
        }
        var instance: Volume = new Volume(object.name, object.count, chapters);
        return instance;
    }
    public static async build_wANY2(object: any): Promise<Volume>{
        var chapters_getted: any = object.chapters;
        var chapters_getted_length: number = 0;
        for (const key in chapters_getted) {
            if (Object.prototype.hasOwnProperty.call(chapters_getted, key)) {
                chapters_getted_length = chapters_getted_length + 1;
            }
        }
        var chapters: Array<Chapters> = new Array<Chapters>(chapters_getted_length);
        let index: number = 0;
        for (const key in chapters_getted) {
            if (Object.prototype.hasOwnProperty.call(chapters_getted, key)) {
                chapters[index] = await Chapters.build_wANY2(chapters_getted[key]);
                index = index + 1;
            }
        }
        var instance: Volume = new Volume(object.name, object.count, chapters);
        return instance;
    }
}