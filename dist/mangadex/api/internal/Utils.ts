import { getClient, Response } from "@tauri-apps/api/http";
import { Author } from "../structures/Author";

export class And_Or{
    private static AND: string = "AND";
    private static OR: string = "OR";
    public static and():string{
        return And_Or.AND;
    }
    public static or():string{
        return And_Or.OR;
    }
    public static array(): Array<string>{
        return [
            And_Or.AND, 
            And_Or.OR
        ];
    }
}

export class Status{
    private static ONGOING: string = "ongoing";
    private static COMPLETED: string = "completed";
    private static HIATUS: string = "hiatus";
    private static CANCELLED: string = "cancelled";
    public static ongoing(): string{
        return Status.ONGOING;
    }
    public static completed(): string{
        return Status.COMPLETED;
    }
    public static hiatus(): string{
        return Status.HIATUS;
    }
    public static cancelled(): string{
        return Status.CANCELLED;
    }
    public static array(): Array<string>{
        return [
            Status.ONGOING,
            Status.COMPLETED,
            Status.HIATUS,
            Status.CANCELLED
        ];
    }
}

export class Demographic{
    private static SHOUJO: string = "shoujo";
    private static JOSEI: string = "josei";
    private static SHOUNEN: string = "shounen";
    private static SEINEN: string = "seinen";
    private static NONE: string = "none";
    public static shoujo(): string{
        return Demographic.SHOUJO;
    }
    public static josei(): string{
        return Demographic.JOSEI;
    }
    public static shounen(): string{
        return Demographic.SHOUNEN;
    }
    public static seinen(): string{
        return Demographic.SEINEN;
    }
    public static none(): string{
        return Demographic.NONE;
    }
    public static array(): Array<string>{
        return [
            Demographic.SHOUJO,
            Demographic.JOSEI,
            Demographic.SHOUNEN,
            Demographic.SEINEN,
            Demographic.NONE
        ];
    }
}

export class ContentRating{
    private static SAFE: string = "safe";
    private static SUGGESTIVE: string = "suggestive";
    private static EROTICA: string = "erotica";
    private static PORNOGRAPHIC: string = "pornographic";
    public static safe(): string{
        return ContentRating.SAFE;
    }
    public static suggestive(): string{
        return ContentRating.SUGGESTIVE;
    }
    public static erotica(): string{
        return ContentRating.EROTICA;
    }
    public static pornographic(): string{
        return ContentRating.PORNOGRAPHIC;
    }
    public static array(): Array<string>{
        return [
            ContentRating.SAFE,
            ContentRating.SUGGESTIVE,
            ContentRating.EROTICA,
            ContentRating.PORNOGRAPHIC
        ];
    }
}

export class Includes{
    private static MANGA: string = "manga";
    private static CHAPTER: string = "chapter";
    private static COVER_ART: string = "cover_art";
    private static AUTHOR: string = "author";
    private static ARTIST: string = "artist";
    private static SCANLATION_GROUP: string = "scanlation_group";
    private static TAG: string = "tag";
    private static USER: string = "user";
    private static CUSTOM_LIST: string = "custom_list";
    public static manga(): string{
        return Includes.MANGA
    }
    public static chapter(): string{
        return Includes.CHAPTER
    }
    public static cover_art(): string{
        return Includes.COVER_ART
    }
    public static author(): string{
        return Includes.AUTHOR
    }
    public static artist(): string{
        return Includes.ARTIST
    }
    public static scanlation_group(): string{
        return Includes.SCANLATION_GROUP
    }
    public static tag(): string{
        return Includes.TAG
    }
    public static user(): string{
        return Includes.USER
    }
    public static custom_list(): string{
        return Includes.CUSTOM_LIST
    }
    public static array(): Array<string>{
        return [
            Includes.MANGA,
            Includes.CHAPTER,
            Includes.COVER_ART,
            Includes.AUTHOR,
            Includes.ARTIST,
            Includes.SCANLATION_GROUP,
            Includes.TAG,
            Includes.USER,
            Includes.CUSTOM_LIST
        ];
    }
}

export class Asc_Desc{
    private static ASC: string = "asc";
    private static DESC: string = "desc";
    public static asc():string{
        return Asc_Desc.ASC;
    }
    public static desc():string{
        return Asc_Desc.DESC;
    }
    public static array(): Array<string>{
        return [
            Asc_Desc.ASC, 
            Asc_Desc.DESC
        ];
    }
}

export class Offset_limits{
    private limits: number; 
    private offset: number;
    public set_limits(limits: number){
        this.limits = limits;
    }
    public set_offset(offset: number){
        this.offset = offset;
    }
    public get_limits(): number{
        return this.limits;
    }
    public get_offset(): number{
        return this.offset;
    }
    public constructor(){
        this.set_limits(10);
        this.set_offset(0);
    }
    public static build(limits: number, offset: number): Offset_limits{
        var instance: Offset_limits = new Offset_limits();
        instance.set_limits(limits);
        instance.set_offset(offset);
        return instance;
    }
}

export class Author_Artists{
    private authors: Array<Author>;
    private artists: Array<Author>;
    public filtred: Array<Author>;
    public is_filtred_have_this(object: Author): boolean{
        if(this.filtred == null || this.filtred.length == 0){
            return false;
        }else{
            for (let index = 0; index < this.filtred.length; index++) {
                const elementu = this.filtred[index];
                if(elementu.get_Name().localeCompare(object.get_Name()) == 0){
                    return true;
                }
            }
            return false;
        }
    }
    public initialise_filtred(){
        this.filtred = [];
        var authors: Array<Author> = this.authors;
        for (const key in this.artists) {
            if (Object.prototype.hasOwnProperty.call(this.artists, key)) {
                const element = this.artists[key];
                authors.push(element);
            }
        }
        for (let index = 0; index < authors.length; index++) {
            const elements = authors[index];
            if(!this.is_filtred_have_this(elements)){
                this.filtred.push(elements);
            }
        }
    }
    public constructor(authors: Array<Author>, artists: Array<Author>){
        this.authors = authors;
        this.artists = artists;
        this.initialise_filtred();
    }
}

export class Order{
    private title: string;
    private createdAt: string;
    private updatedAt: string;
    private publishAt: string;
    private readableAt: string;
    private volume: string;
    private chapter: string;
    private latestUploadedChapter: string;
    private followedCount : string;
    private relevance : string;
    public set_createdAt(createdAt: string){
        this.createdAt = createdAt;
    }
    public set_title(title: string){
        this.title = title;
    }
    public set_updatedAt(updatedAt: string){
        this.updatedAt = updatedAt;
    }
    public set_publishAt(publishAt: string){
        this.publishAt = publishAt;
    }
    public set_readableAt(readableAt: string){
        this.readableAt = readableAt;
    }
    public set_volume(volume: string){
        this.volume = volume;
    }
    public set_chapter(chapter: string){
        this.chapter = chapter;
    }
    public set_latestUploadedChapter(latestUploadedChapter: string){
        this.latestUploadedChapter = latestUploadedChapter;
    }
    public set_followedCount(followedCount: string){
        this.followedCount = followedCount;
    }
    public set_relevance(relevance: string){
        this.relevance = relevance;
    }
    public constructor(
        createdAt?: string,
        updatedAt?: string,
        publishAt?: string,
        readableAt?: string,
        volume?: string,
        chapter?: string,
        latestUploadedChapter?: string,
        followedCount? : string,
        relevance? : string,
        title?: string
    ){
        this.set_createdAt(createdAt!);
        this.set_updatedAt(updatedAt!);
        this.set_publishAt(publishAt!);
        this.set_readableAt(readableAt!);
        this.set_volume(volume!);
        this.set_chapter(chapter!);
        this.set_latestUploadedChapter(latestUploadedChapter!);
        this.set_followedCount(followedCount!);
        this.set_relevance(relevance!);
        this.set_title(title!);
    }
    public render(): any{
        return ({
            "order[createdAt]": this.createdAt,
            "order[updatedAt]": this.updatedAt,
            "order[readableAt]": this.readableAt,
            "order[volume]": this.volume,
            "order[chapter]": this.chapter,
            "order[latestUploadedChapter]": this.latestUploadedChapter,
            "order[publishAt]": this.publishAt,
            "order[relevance]": this.relevance,
            "order[followedCount]": this.followedCount,
            "order[title]": this.title
        });
    }

}

export class RelationshipsTypes{
    public static manga(): string{
        return "manga";
    }
    public static chapter(): string{
        return "chapter";
    }
    public static cover_art(): string{
        return "cover_art";
    }
    public static author(): string{
        return "author";
    }
    public static artist(): string{
        return "artist";
    }
    public static scanlation_group(): string{
        return "scanlation_group";
    }
    public static tag(): string{
        return "tag";
    }
    public static user(): string{
        return "user";
    }
    public static custom_list(): string{
        return "custom_list";
    }
}

export class MangaLinksData{
    private al: string;
    private ap: string;
    private bw: string;
    private mu: string;
    private nu: string;
    private kt: string;
    private amz: string;
    private ebj: string;
    private mal: string;
    private cdj: string;
    private raw: string;
    private engtl: string;
    public set_al(al: string){
        this.al = al;
    }
    public set_ap(ap: string){
        this.ap = ap;
    }
    public set_bw(bw: string){
        this.bw = bw;
    }
    public set_mu(mu: string){
        this.mu = mu;
    }
    public set_nu(nu: string){
        this.nu = nu;
    }
    public set_kt(kt: string){
        this.kt = kt;
    }
    public set_amz(amz: string){
        this.amz = amz;
    }
    public set_ebj(ebj: string){
        this.ebj = ebj;
    }
    public set_mal(mal: string){
        this.mal = mal;
    }
    public set_cdj(cdj: string){
        this.cdj = cdj;
    }
    public set_raw(raw: string){
        this.raw = raw;
    }
    public set_engtl(engtl: string){
        this.engtl = engtl;
    }
    
    public get_al(): string{
        return this.al;
    }
    public get_ap(): string{
        return this.ap;
    }
    public get_bw(): string{
        return this.bw;
    }
    public get_mu(): string{
        return this.mu;
    }
    public get_nu(): string{
        return this.nu;
    }
    public get_kt(): string{
        return this.kt;
    }
    public get_amz(): string{
        return this.amz;
    }
    public get_ebj(): string{
        return this.ebj;
    }
    public get_mal(): string{
        return this.mal;
    }
    public get_cdj(): string{
        return this.cdj;
    }
    public get_raw(): string{
        return this.raw;
    }
    public get_engtl(): string{
        return this.engtl;
    }
    constructor(
        al: string,
        ap: string,
        bw: string,
        mu: string,
        nu: string,
        kt: string,
        amz: string,
        ebj: string,
        mal: string,
        cdj: string,
        raw: string,
        engtl: string,
    ){
        this.set_al(al);
        this.set_ap(ap);
        this.set_bw(bw);
        this.set_mu(mu);
        this.set_nu(nu);
        this.set_kt(kt);
        this.set_amz(amz);
        this.set_ebj(ebj);
        this.set_mal(mal);
        this.set_cdj(cdj);
        this.set_engtl(engtl);
        this.set_raw(raw);
    }
    public url_anilist(): string | null{
        if(this.al != null){
            return ("https://anilist.co/manga/" + this.al);
        }else{
            return null;
        }
    }
    public url_mangaupdates(): string | null{
        if(this.mu != null){
            return ("https://www.mangaupdates.com/series.html?id=" + this.mu);
        }else{
            return null;
        }
    }
    public url_novelupdates(): string | null{
        if(this.nu != null){
            return ("https://www.novelupdates.com/series/" + this.nu);
        }else{
            return null;
        }
    }
    public url_animeplanet(): string | null{
        if(this.ap != null){
            return ("https://www.anime-planet.com/manga/" + this.ap);
        }else{
            return null;
        }
    }
    public url_bookWalker(): string | null{
        if(this.bw != null){
            return ("https://bookwalker.jp/" + this.bw);
        }else{
            return null;
        }
    }
    public url_kitsu_io(): string | null{
        if(this.kt != null){
            if(this.kt.length == ("" + parseInt(this.kt)).length){
                return ("https://kitsu.io/api/edge/manga/" + this.kt);
            }else{
                return ("https://kitsu.io/api/edge/manga?filter"+ this.kt + "={" + this.kt +"}");
            }
        }else{
            return null;
        }
    }
    public url_amazon(): string | null{
        if(this.amz != null){
            return this.amz;
        }else{
            return null;
        }
    }
    public url_ebj(): string | null{
        if(this.ebj != null){
            return this.ebj;
        }else{
            return null;
        }
    }
    public url_myanimelist(): string | null{
        if(this.mal != null){
            return ("https://myanimelist.net/manga/" + this.mal);
        }else{
            return null
        }
    }
    public url_CDJapan(): string | null{
        if(this.cdj != null){
            return this.cdj;
        }else{
            return null;
        }
    }
    public url_raw(): string | null{
        if(this.raw != null){
            return this.raw;
        }else{
            return null;
        }
    }
    public url_engtl(): string | null{
        if(this.engtl != null){
            return this.engtl;
        }else{
            return null;
        }
    }
    public read_or_buy(): any{
        return ({
            "Official Raw" : this.url_raw()!,
            "Official English" : this.url_engtl()!,
            "Book Walker" : this.url_bookWalker()!,
            "Amazon" : this.url_amazon()!,
            "eBookJapan" : this.url_ebj()!,
            "CDJapan" : this.url_CDJapan()!
        });
    }
    public track(): any{
        return ({
            "MangaUpdates" : this.url_mangaupdates()!,
            "NovelUpdates" : this.url_novelupdates()!,
            "AniList" : this.url_anilist()!,
            "AnimePlanet" : this.url_animeplanet()!,
            "Kitso" : this.url_kitsu_io()!,
            "MyAnimeList" : this.url_myanimelist()!
        });
    }
    public static build_wAny(object: any): MangaLinksData{
        return new MangaLinksData(
            object.al,
            object.ap,
            object.bw,
            object.mu,
            object.nu,
            object.kt,
            object.amz,
            object.ebj,
            object.mal,
            object.cdj,
            object.raw,
            object.engtl
        );
    }
}

export class Manga_related{
    public static monochrome(): string{
        return "monochrome";
    }
    public static colored(): string{
        return "colored";
    }
    public static preserialization(): string{
        return "preserialization";
    }
    public static serialization(): string{
        return "serialization";
    }
    public static prequel(): string{
        return "prequel";
    }
    public static sequel(): string{
        return "sequel";
    }
    public static main_story(): string{
        return "main_story";
    }
    public static side_story(): string{
        return "side_story";
    }
    public static adapted_from(): string{
        return "adapted_from";
    }
    public static spin_off(): string{
        return "spin_off";
    }
    public static based_on(): string{
        return "based_on";
    }
    public static doujinshi(): string{
        return "doujinshi";
    }
    public static same_franchise(): string{
        return "same_franchise";
    }
    public static shared_universe(): string{
        return "shared_universe";
    }
    public static alternate_story(): string{
        return "alternate_story";
    }
    public static alternate_version(): string{
        return "alternate_version";
    }
}

export class Reading_status{
    public static reading(): string{
        return "reading";
    }
    public static on_hold(): string{
        return "on_hold";
    }
    public static plan_to_read(): string{
        return "plan_to_read";
    }
    public static dropped(): string{
        return "dropped";
    }
    public static re_reading(): string{
        return "re_reading";
    }
    public static completed(): string{
        return "completed";
    }
    public static array(): Array<string>{
        return [
            Reading_status.reading(),
            Reading_status.on_hold(),
            Reading_status.plan_to_read(),
            Reading_status.dropped(),
            Reading_status.re_reading(),
            Reading_status.completed()
        ];
    }
}

export class Lang{
    private name: string;
    private two_letter: string;
    private three_letter: string;
    public set_name(name: string){
        this.name = name;
    }
    public set_two_letter(two_letter: string){
        this.two_letter = two_letter;
    }
    public set_three_letter(three_letter: string){
        this.three_letter = three_letter;
    }

    public get_name(): string{
        return this.name;
    }
    public get_two_letter(): string{
        return this.two_letter ;
    }
    public get_three_letter(): string{
        return this.three_letter;
    }
    public constructor(name: string, two_letter: string, three_letter: string){
        this.set_name(name);
        this.set_two_letter(two_letter);
        this.set_three_letter(three_letter);
    }
}
export class Languages{
    private langs : Array<Lang>;
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
        let array: Array<Lang> = [];
        var res : Response<any> = await (await getClient()).get("http://localhost:9305/mangadex/resources/json/lang.json");
        let index: number = 0;
        res.data.forEach(element => {
            array[index] = new Lang(element.name, element.two_letter, element.three_letter);
            index = index + 1;
        });
        return new Languages(array);
    }
    public getLang_byName(name: string): Lang{
        for (let index = 0; index < this.langs.length; index++) {
            const selected_lang = this.langs[index];
            if(selected_lang.get_name() == name){
                return selected_lang
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
            var array : Array<Lang>= [];
            let array_i : number = 0;
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

export class Alt_title{
    public to_use: Array<any>;
    public set_to_use(to_use: Array<any>){
        this.to_use = to_use;
    }
    public get_to_use(): Array<any>{
        return this.to_use;
    }
    public constructor(to_use: Array<any>){
        this.set_to_use(to_use);
    }
    public get_lang(name: string): Array<string> | null{
        let alt_title: Array<string> = [];
        for (let index = 0; index < this.to_use.length; index++) {
            const element = this.to_use[index];
            for (const key in element) {
                if (Object.prototype.hasOwnProperty.call(element, key) ) {
                    const elements = element[key];
                    if(key == name){
                        alt_title.push(elements);
                    }
                }
            }
        }
        return alt_title;
    }
    public get_quicklang(): string | undefined{
        let alt_title: Array<string> = [];
        for (let index = 0; index < this.to_use.length; index++) {
            const element = this.to_use[index];
            for (const key in element) {
                if (Object.prototype.hasOwnProperty.call(element, key) ) {
                    return element[key];
                }
            }
        }
    }
}

export class Lang_and_Data{
    private language: Lang;
    private data: string;
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
    public static async initializeByAltTitle_obj(alt_title: any): Promise<Lang_and_Data>{
        for (const key in alt_title) {
            if (Object.prototype.hasOwnProperty.call(alt_title, key)) {
                const data = alt_title[key];
                return new Lang_and_Data(data, ((await Languages.initialize()).getLang_byTwo_letter(key)));
            }
        }
        throw new Error("Type mismatch...");
    }
    public static async initializeArrayByAltTitle_obj(alt_titles: Array<any>): Promise<Array<Lang_and_Data>>{
        let returns : Array<Lang_and_Data> = [];
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
    public static async initializeByDesc(desc: any): Promise<Array<Lang_and_Data>>{
        let array: Array<Lang_and_Data> = []
        let index : number= 0;
        for (const key in desc) {
            if (Object.prototype.hasOwnProperty.call(desc, key)) {
                const data = desc[key];
                array[index] = new Lang_and_Data(data, ((await Languages.initialize()).getLang_byTwo_letter(key)));
                index = index + 1;
            }
        }
        return array;
    }
    public static find_data_by_lang2l(two_letter: string, to_use: Array<Lang_and_Data>):Lang_and_Data | undefined{
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

export class MGDate{
    private to_use: Date;
    public set_To_use(MGDat: Date){
        this.to_use = MGDat;
    }
    public get_To_use(): Date{
        return this.to_use;
    }
    public get_isoFormat_string(): string{
        return this.to_use.toISOString().split(".")[0];
    }
    public constructor(to_use: Date){
        this.set_To_use(to_use);
    }
}
export function make_first_UpperCare(input: string): string{
    return input.charAt(0).toUpperCase() + input.slice(1);
}

export class Querry_list_builder<T>{
    private name: string;
    private array: Array<T>;

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $array
     * @param {Array<T>} value
     */
	public set $array(value: Array<T>) {
		this.array = value;
	}
    

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $array
     * @return {Array<T>}
     */
	public get $array(): Array<T> {
		return this.array;
	}


	constructor(name: string, array: Array<T>) {
        this.$name = (name);
        this.$array = (array);
	}
    public build(): any{
        let returns : any = {}
        try{
            for (let index = 0; index < this.array.length; index++) {
                const element = this.array[index];
                returns[this.$name + "[" + index + "]"] = element;
            }
        }catch(e){
            returns = null;
        }
        return returns;
    }
}

export const serialize = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}