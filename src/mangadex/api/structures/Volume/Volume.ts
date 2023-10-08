import { ChaptersVolumeAggregateData, VolumeAggregateData } from "../../sta/data-contracts";
import { Chapters } from "../Chapter";

export default class Volume {
    private name!: string;
    private count!: number;
    private chapters!: Array<Chapters>;
    public set_name(name: string) {
        this.name = name;
    }
    public set_count(count: number) {
        this.count = count;
    }
    public set_chapters(chapters: Array<Chapters>) {
        this.chapters = chapters;
    }
    public get_name(): string {
        return this.name;
    }
    public get_count(): number {
        return this.count;
    }
    public get_chapters(): Array<Chapters> {
        return this.chapters;
    }
    public constructor(name: string, count: number, chapters: Array<Chapters>) {
        this.set_name(name);
        this.set_count(count);
        this.set_chapters(chapters);
    }
    public static build_wANY(object: VolumeAggregateData): Volume {
        const chapters_getted: ChaptersVolumeAggregateData = object.chapters;
        let chapters_getted_length = 0;
        for (const key in chapters_getted) {
            if (Object.prototype.hasOwnProperty.call(chapters_getted, key)) {
                chapters_getted_length = chapters_getted_length + 1;
            }
        }
        const chapters: Array<Chapters> = new Array<Chapters>(chapters_getted_length);
        let index = 0;
        for (const key in chapters_getted) {
            if (Object.prototype.hasOwnProperty.call(chapters_getted, key)) {
                chapters[index] = Chapters.build_wANY(chapters_getted[key]);
                index = index + 1;
            }
        }
        const instance: Volume = new Volume(object.volume, object.count, chapters);
        instance.sort_volume();
        return instance;
    }
    public static async build_wANY2(object: VolumeAggregateData): Promise<Volume> {
        const chapters_getted: ChaptersVolumeAggregateData = object.chapters;
        let chapters_getted_length = 0;
        for (const key in chapters_getted) {
            if (Object.prototype.hasOwnProperty.call(chapters_getted, key)) {
                chapters_getted_length = chapters_getted_length + 1;
            }
        }
        const chapters: Array<Chapters> = new Array<Chapters>(chapters_getted_length);
        let index = 0;
        for (const key in chapters_getted) {
            if (Object.prototype.hasOwnProperty.call(chapters_getted, key)) {
                chapters[index] = await Chapters.build_wANY2(chapters_getted[key]);
                index = index + 1;
            }
        }
        const instance: Volume = new Volume(object.volume, object.count, chapters);
        instance.sort_volume();
        return instance;
    }
    public getNext(id: string): string | boolean {
        for (let index = 0; index < this.chapters.length; index++) {
            const chapters_to_use: Chapters = this.chapters[index];
            if (chapters_to_use.is_there(id) == true) {
                const index_to_use = index + 1;
                if (index_to_use >= this.chapters.length) {
                    return true;
                } else {
                    return this.chapters[index_to_use].get_ids()[0];
                }
            }
        }
        throw Error("This chapter" + id + " is not in this volume");
    }
    public getPrevious(id: string): string | boolean {
        for (let index = 0; index < this.chapters.length; index++) {
            const chapters_to_use: Chapters = this.chapters[index];
            if (chapters_to_use.is_there(id) == true) {
                const index_to_use = index - 1;
                if (index_to_use >= this.chapters.length || index_to_use < 0) {
                    return true;
                } else {
                    return this.chapters[index_to_use].get_ids()[0];
                }
            }
        }
        throw Error("This chapter" + id + " is not in this volume");
    }
    public getCurrent(id: string): string {
        for (let index = 0; index < this.chapters.length; index++) {
            const chapters_to_use: Chapters = this.chapters[index];
            if (chapters_to_use.is_there(id) == true) {
                return ("Volume " + this.name + ", Ch. " + chapters_to_use.get_name());
            }
        }
        throw Error("This chapter" + id + " is not in this volume");
    }
    public sort_volume(isReverse?: boolean) {
        this.set_chapters(this.chapters.sort((a, b) => {
            const a_num = Number(a.get_name());
            if (Number.isNaN(a_num)) {
                return 0;
            }
            const b_num = Number(b.get_name());
            if (Number.isNaN(b_num)) {
                return 0;
            }
            if(isReverse == true){
                return b_num - a_num;
            }else{
                return a_num - b_num;
            }
        }));
    }

}