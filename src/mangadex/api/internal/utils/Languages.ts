import { Lang } from "./Lang";
import langs from "@mangadex/resources/json/lang.json";
export class Languages{
    private langs!: Array<Lang>;
    private set_langs(langs: Array<Lang>){
        this.langs = langs;
    }

    public get_langs(): Array<Lang>{
        return this.langs;
    }
    private constructor(langs: Array<Lang>){
        this.set_langs(langs);
    }
    public static async initialize(): Promise<Languages>{
        const array: Array<Lang> = [];
        const res = langs;
        let index = 0;
        res.forEach(element => {
            array[index] = new Lang(element.name, element.two_letter, element.three_letter, element.flag_icon ?? "");
            index = index + 1;
        });
        return new Languages(array);
    }
    public getLang_byName(name: string): Lang{
        for (let index = 0; index < this.langs.length; index++) {
            const selected_lang = this.langs[index];
            if(selected_lang.get_name() == name){
                return selected_lang;
            }
        }
        throw new Error("can't find lang by : " + name);
    }
    public getLang_byTwo_letter(two_letter: string): Lang{
        for (let index = 0; index < this.langs.length; index++) {
            const selected_lang = this.langs[index];
            if(selected_lang.get_two_letter() == two_letter){
                return selected_lang;
            }
        }
        throw new Error("can't find lang by : " + two_letter);
    }
    public getLang_byThree_letter(three_letter: string): Array<Lang>{
            const array : Array<Lang>= [];
            let array_i  = 0;
            for (let index = 0; index < this.langs.length; index++) {
                const selected_lang = this.langs[index];
                if(selected_lang.get_two_letter() == three_letter){
                    array[array_i] = selected_lang;
                    array_i = array_i + 1;
                }
            }
        return array;
    }
}