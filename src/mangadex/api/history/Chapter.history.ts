import { Store } from 'tauri-plugin-store-api';
import HistoryInput from './HistoryInput';

export default class Chapter_history extends Store{
    constructor() {
        super(".mdx-chapter.history");
    }
    public async addChapter(id : string){
        if((await this.has("history")) == false){
            await this.set("history", []);
        }
        let last_history : Array<HistoryInput> | null = await this.get<Array<HistoryInput>>("history");
        let current : Array<HistoryInput> = [{
            id : id,
            date : new Date()
        }];
        current.push(...last_history!);
        await this.set("history", current);
    }
    public async getChapters() : Promise<Array<HistoryInput>>{
        let last_history : Array<HistoryInput> | null = await this.get<Array<HistoryInput>>("history");
        if(last_history != null){
            return last_history;
        }else{
            throw new Error("Your reading history is null")
        }
    }
}