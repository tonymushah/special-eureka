import { stringify } from "qs";
import { Api_Request } from "../internal/Api_Request";
import { sort_volumes } from "../internal/Utils";
import Desktop_Api_Request from "../offline/DeskApiRequest";
import { GetMangaAggregateData, VolumesAggregateData } from "../sta/data-contracts";
import { Manga } from "./Manga";
import { AggregateListOptions } from "./SearchType/AggregateListOptions";
import { Volume } from "./Volume";

export class Aggregate {
    private count!: number;
    private volumes!: Array<Volume>;
    public set_count(count: number) {
        this.count = count;
    }
    public set_volumes(volumes: Array<Volume>) {
        this.volumes = volumes;
    }
    public get_count(): number {
        return this.count;
    }
    public get_volumes(): Array<Volume> {
        return this.volumes;
    }
    public constructor(count: number, volumes: Array<Volume>) {
        this.set_count(count);
        this.set_volumes(sort_volumes(volumes));
    }
    public static build_wANY(object: VolumesAggregateData): Aggregate {
        let volumes_length = 0;
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                volumes_length = volumes_length + 1;
            }
        }
        const volumes_: Array<Volume> = new Array<Volume>(volumes_length);
        let index = 0;
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                volumes_[index] = Volume.build_wANY(object[key]);
                index = index + 1;
            }
        }
        const instance: Aggregate = new Aggregate(volumes_length, volumes_);
        return instance;
    }
    public static async build_wANY2(object: VolumesAggregateData): Promise<Aggregate> {
        let volumes_length = 0;
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                volumes_length = volumes_length + 1;
            }
        }
        const volumes_: Array<Volume> = new Array<Volume>(volumes_length);
        let index = 0;
        for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                volumes_[index] = await Volume.build_wANY2(object[key]);
                index = index + 1;
            }
        }
        const instance: Aggregate = new Aggregate(volumes_length, volumes_);
        return instance;
    }
    public static async get_aggregate(props: AggregateListOptions): Promise<Aggregate> {
        try {
            const {
                mangaID,
                translatedLanguage,
                groups,
                client
            } = props;
            const getted = await Api_Request.get_methods<GetMangaAggregateData>(
                Manga.get_request_a() + mangaID + "/aggregate?" + 
                stringify({
                    translatedLanguage,
                    groups
                })
                , undefined, client);
            return Aggregate.build_wANY(getted.data.volumes);
        } catch (error) {
            if (typeof error === "string") {
                throw new Error(error);
            } else {
                throw new Error(JSON.stringify(error));
            }
        }
    }
    public static async get_aggregate_offline({
        mangaID,
        client
    }: AggregateListOptions): Promise<Aggregate> {
        try {
            const getted = await Desktop_Api_Request.get_methods<GetMangaAggregateData>(
                Manga.get_request_a() + mangaID + "/aggregate"
                , undefined, client);
            return Aggregate.build_wANY(getted.data.volumes);
        } catch (error) {
            if (typeof error === "string") {
                throw new Error(error);
            } else {
                throw new Error(JSON.stringify(error));
            }
        }
    }
    public async getNext(id: string): Promise<string> {
        for (let index = 0; index < this.volumes.length; index++) {
            const volume = this.volumes[index];
            try {
                const result: string | boolean = volume.getNext(id);
                if (typeof result == "boolean") {
                    const index_to_use = index + 1;
                    if (index_to_use >= this.get_volumes().length) {
                        throw Error("this chapter has no next chapter");
                    } else {
                        return this.volumes[index + 1].get_chapters()[0].get_ids()[0];
                    }
                } else {
                    return result;
                }
            // eslint-disable-next-line no-empty
            } catch (error) {}
        }
        throw Error("this chapter " + id + " has no next chapter");
    }
    public async getPrevious(id: string): Promise<string> {
        for (let index = 0; index < this.volumes.length; index++) {
            const volume = this.volumes[index];
            try {
                const result: string | boolean = volume.getPrevious(id);
                if (typeof result == "boolean") {
                    const index_to_use = index - 1;
                    if (index_to_use >= this.get_volumes().length) {
                        throw Error("this chapter has no previous chapter");
                    } else {
                        return this.volumes[index - 1].get_chapters()[0].get_ids()[0];
                    }
                } else {
                    return result;
                }
            // eslint-disable-next-line no-empty
            } catch (error) {}
        }
        throw Error("this chapter " + id + " has no previous chapter");
    }
    public async getCurrent(id: string): Promise<string> {
        for (let index = 0; index < this.volumes.length; index++) {
            const volume = this.volumes[index];
            try {
                return volume.getCurrent(id);
            // eslint-disable-next-line no-empty
            } catch (error) {}
        }
        throw Error("this chapter " + id + " isn't in this manga");
    }
    public sortVolumesChapters() {
        this.volumes.forEach((v) => {
            v.sort_volume();
        });
    }
}