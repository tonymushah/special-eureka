import { Client } from "@tauri-apps/api/http";
import { RelationshipsTypes } from "../../internal/Utils";
import { ChapterVolumeAggregateData } from "../../sta/data-contracts";
import Chapter_withAllIncludes from "./Chapter_withAllIncludes";

export default class Chapters {
    private name!: string;
    private ids!: Array<string>;
    private count!: number;
    private chapters!: Array<Chapter_withAllIncludes>;
    public set_name(name: string) {
        this.name = name;
    }
    public set_ids(ids: Array<string>) {
        this.ids = ids;
    }
    public set_count(count: number) {
        this.count = count;
    }
    public set_chapters(chapters: Array<Chapter_withAllIncludes>) {
        this.chapters = chapters;
    }
    public get_name(): string {
        return this.name;
    }
    public get_ids(): Array<string> {
        return this.ids;
    }
    public get_count(): number {
        return this.count;
    }
    public get_chapters(): Array<Chapter_withAllIncludes> {
        return this.chapters;
    }
    public constructor(name: string, ids: Array<string>, count: number) {
        this.set_name(name);
        this.set_ids(ids);
        this.set_count(count);
    }
    public async initialize_chapters(client?: Client) {
        const to_input: Array<Chapter_withAllIncludes> = new Array<Chapter_withAllIncludes>(this.count);
        for (let index = 0; index < to_input.length; index++) {
            const element = (await Chapter_withAllIncludes.get_ChapterbyId(this.ids[index], client)).data;
            if (element instanceof Chapter_withAllIncludes) to_input[index] = element;
        }
        this.set_chapters(to_input);
    }
    public async initialize_and_get_Chapters(client?: Client): Promise<Array<Chapter_withAllIncludes>> {
        await this.initialize_chapters(client);
        return this.get_chapters();
    }
    public static build_wANY(object: ChapterVolumeAggregateData): Chapters {
        const ids: Array<string> = [object.id];
        const others: Array<string> = object.others;
        for (let index = 0; index < others.length; index++) {
            ids.push(others[index]);
        }
        const instance: Chapters = new Chapters(object.chapter, ids, object.count);
        return instance;
    }
    public static async build_wANY2(object: ChapterVolumeAggregateData): Promise<Chapters> {
        const instance: Chapters = Chapters.build_wANY(object);
        await instance.initialize_chapters();
        return instance;
    }
    public get_key_word(): string {
        return RelationshipsTypes.chapter();
    }
    public is_there(id: string): boolean {
        for (let index = 0; index < this.ids.length; index++) {
            if (this.ids[index] == id) {
                return true;
            }
        }
        return false;
    }

}
