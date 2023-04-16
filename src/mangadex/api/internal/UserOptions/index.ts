import { Store } from "tauri-plugin-store-api";
import { Lang, Languages } from "../Utils";

export enum UserOptionsKeys{
    languages = "languages",
    serverAutoStart = "serv-auto-start",
    mangalistOption = "mangaList-option"
}

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
}