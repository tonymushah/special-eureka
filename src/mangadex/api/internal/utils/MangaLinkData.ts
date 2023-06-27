export class MangaLinksData{
    private al!: string;
    private ap!: string;
    private bw!: string;
    private mu!: string;
    private nu!: string;
    private kt!: string;
    private amz!: string;
    private ebj!: string;
    private mal!: string;
    private cdj!: string;
    private raw!: string;
    private engtl!: string;
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
            return null;
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