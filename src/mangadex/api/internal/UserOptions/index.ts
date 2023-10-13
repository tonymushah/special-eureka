import { Store } from "tauri-plugin-store-api";
import { Lang, Languages } from "../Utils";
import { ReadingMode } from "./ReadingMode";

export enum UserOptionsKeys{
    languages = "languages",
    serverAutoStart = "serv-auto-start",
    mangalistOption = "mangaList-option",
    rtlSidebar = "rtlSidebar",
    readingMode = "readingMode",
    rtlSwipperMode = "rtlSwipperMode",
    coverLocality = "cover-locality"
}

// Add onChange on every Keys
export default class UserOptions extends Store{
    constructor(){
        super(".UserOptions.speu-mangadex");
    }
    public async setLanguages(input : Array<Lang>, save? : boolean){
        const to_in = input.map((value) => value.get_two_letter());
        console.log(to_in);
        await this.set(UserOptionsKeys.languages, to_in);
        if(save == undefined || save == true){
            console.log("saving");
            await this.save();
        }
    }
    public async getLanguages() : Promise<Array<Lang>>{
        const languages = await Languages.initialize();
        const cachedLangs = (await this.get<Array<string>>(UserOptionsKeys.languages));
        if(cachedLangs == null){
            return [];
        }else{
            return cachedLangs.map((value) => languages.getLang_byTwo_letter(value));
        }
    }
    public async setServerAutoStart(input : boolean, save? : boolean){
        await this.set(UserOptionsKeys.serverAutoStart, input);
        if(save == undefined || save == true){
            await this.save();
        }
    }
    public async getServerAutoStart() : Promise<boolean>{
        return (await this.get<boolean>(UserOptionsKeys.serverAutoStart)) ?? false;
    }
    public async setMangaListOption(input: number, save? : boolean){
        await this.set(UserOptionsKeys.mangalistOption, input);
        if(save == undefined || save == true){
            await this.save();
        }
    }
    public async getMangaListOption() : Promise<number>{
        return (await this.get<number>(UserOptionsKeys.mangalistOption)) ?? 0;
    }
    public async setRtlSidebar(input: boolean, save? : boolean){
        await this.set(UserOptionsKeys.rtlSidebar, input);
        if(save == undefined || save == true){
            await this.save();
        }
    }
    public async getRtlSidebar() : Promise<boolean>{
        return (await this.get<boolean>(UserOptionsKeys.rtlSidebar)) ?? false;
    }
    public async setReadingMode(input: ReadingMode, save? : boolean){
        await this.set(UserOptionsKeys.readingMode, input);
        if(save == undefined || save == true){
            await this.save();
        }
    }
    public async getReadingMode() : Promise<ReadingMode>{
        return (await this.get<ReadingMode>(UserOptionsKeys.readingMode)) ?? ReadingMode.LongStrip;
    }
    public async setRtlSwipperMode(input: boolean, save? : boolean){
        await this.set(UserOptionsKeys.rtlSwipperMode, input);
        if(save == undefined || save == true){
            await this.save();
        }
    }
    public async getRtlSwipperMode() : Promise<boolean>{
        return (await this.get<boolean>(UserOptionsKeys.rtlSwipperMode)) ?? false;
    }
    public async setCoverLocality(input : Array<Lang>, save? : boolean){
        const to_in = input.map((value) => value.get_two_letter());
        await this.set(UserOptionsKeys.coverLocality, to_in);
        if(save == undefined || save == true){
            console.log("saving");
            await this.save();
        }
    }
    public async getCoverLocality() : Promise<Array<Lang>>{
        const languages = await Languages.initialize();
        const cachedLangs = (await this.get<Array<string>>(UserOptionsKeys.coverLocality));
        if(cachedLangs == null){
            return [languages.getLang_byTwo_letter("ja")];
        }else{
            return cachedLangs.map((value) => languages.getLang_byTwo_letter(value));
        }
    }
}