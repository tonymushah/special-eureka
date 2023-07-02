import { LocalizedString } from "@mangadex/api/sta/data-contracts";
import randomInteger from "random-int";

export class Alt_title {
    public to_use!: Array<LocalizedString>;
    public set_to_use(to_use: Array<LocalizedString>) {
        this.to_use = to_use;
    }
    public get_to_use(): Array<LocalizedString> {
        return this.to_use;
    }
    public constructor(to_use: Array<LocalizedString>) {
        this.set_to_use(to_use);
    }
    public get_lang(name: string): Array<string> | null {
        const alt_title: Array<string> = [];
        for (let index = 0; index < this.to_use.length; index++) {
            const element = this.to_use[index];
            for (const key in element) {
                if (Object.prototype.hasOwnProperty.call(element, key)) {
                    const elements = element[key];
                    if (key == name) {
                        alt_title.push(elements);
                    }
                }
            }
        }
        return alt_title;
    }
    public get_quicklang(): string | undefined {
        for (let index = 0; index < this.to_use.length; index++) {
            const element = this.to_use[index];
            for (const key in element) {
                if (Object.prototype.hasOwnProperty.call(element, key)) {
                    return element[key];
                }
            }
        }
    }
    public get_random_lang(): string | undefined {
        const element = this.to_use[randomInteger(0, this.to_use.length - 1)];
        for (const key in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) {
                return element[key];
            }
        }
    }
}
