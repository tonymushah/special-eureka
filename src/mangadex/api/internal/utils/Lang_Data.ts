import { LocalizedString } from "@mangadex/api/sta/data-contracts";
import { Lang } from "./Lang";
import { Languages } from "./Languages";

export class Lang_and_Data{
    private language!: Lang;
    private data!: string;
    public set_language(language: Lang){
        this.language = language;
    }
    public set_data(data: string){
        this.data = data;
    }
    public get_language(): Lang{
        return this.language;
    }
    public get_data(): string{
        return this.data;
    }
    public constructor(data: string, language: Lang){
        this.set_data(data);
        this.set_language(language);
    }
    public static async initializeByTwo_letter(data: string, two_letter: string): Promise<Lang_and_Data>{
        return new Lang_and_Data(data, ((await Languages.initialize()).getLang_byTwo_letter(two_letter)));
    }
    public static async initializeByAltTitle_obj(alt_title: LocalizedString): Promise<Lang_and_Data>{
        for (const key in alt_title) {
            if (Object.prototype.hasOwnProperty.call(alt_title, key)) {
                const data = alt_title[key];
                return new Lang_and_Data(data, ((await Languages.initialize()).getLang_byTwo_letter(key)));
            }
        }
        throw new Error("Type mismatch...");
    }
    public static async initializeArrayByAltTitle_obj(alt_titles: Array<LocalizedString>): Promise<Array<Lang_and_Data>>{
        const returns : Array<Lang_and_Data> = [];
        let index0 = 0;
        for (let index = 0; index < alt_titles.length; index++) {
            const alt_title = alt_titles[index];
            for (const key in alt_title) {
                if (Object.prototype.hasOwnProperty.call(alt_title, key)) {
                    const data = alt_title[key];
                    returns[index0] = new Lang_and_Data(data, ((await Languages.initialize()).getLang_byTwo_letter(key)));
                    index0 = index0 + 1;
                }
            }
        }
        return returns;
        //throw new Error("Type mismatch...");
    }
    public static async initializeByDesc(desc: LocalizedString): Promise<Array<Lang_and_Data>>{
        const array: Array<Lang_and_Data> = [];
        let index = 0;
        for (const key in desc) {
            if (Object.prototype.hasOwnProperty.call(desc, key)) {
                const data = desc[key];
                array[index] = new Lang_and_Data(data, ((await Languages.initialize()).getLang_byTwo_letter(key)));
                index = index + 1;
            }
        }
        return array;
    }
    public static find_data_by_lang2l(two_letter: string, to_use: Array<Lang_and_Data>): Lang_and_Data | undefined{
        for (const key in to_use) {
            if (Object.prototype.hasOwnProperty.call(to_use, key)) {
                const element = to_use[key];
                if (element.get_language().get_two_letter() == two_letter) {
                    return element;
                }
            }
        }
    }
}