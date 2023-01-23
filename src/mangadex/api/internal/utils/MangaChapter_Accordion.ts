import { Chapter } from "../../structures/Chapter";

export default class MangaChapter_Accordion{
    private mangaid : string;
    private chapters : Array<Chapter>;
    /**
     * Getter $mangaid
     * @return {string}
     */
	public get $mangaid(): string {
		return this.mangaid;
	}

    /**
     * Setter $mangaid
     * @param {string} value
     */
	public set $mangaid(value: string) {
		this.mangaid = value;
	}

    /**
     * Getter $chapters
     * @return {Array<Chapter>}
     */
	public get $chapters(): Array<Chapter> {
		return this.chapters;
	}

    /**
     * Setter $chapters
     * @param {Array<Chapter>} value
     */
	public set $chapters(value: Array<Chapter>) {
		this.chapters = value;
	}


    public constructor(mangaID? : string, chapters? : Array<Chapter>){
        if(mangaID !== undefined){
            this.$mangaid = mangaID
        }
        if(chapters !== undefined){
            this.$chapters = chapters;
        }
    }
    public isChapterThere(chapter: string | Chapter) : boolean{
        if(chapter instanceof Chapter){
            for (let index = 0; index < this.$chapters.length; index++) {
                const element = this.$chapters[index];
                if(element.get_id() == chapter.get_id()){
                    return true;
                }
            }
        }else{
            for (let index = 0; index < this.$chapters.length; index++) {
                const element = this.$chapters[index];
                if(element.get_id() == chapter){
                    return true;
                }
            }
        }
        return false;
    }
    public isChapterRelated_manga_id(chapter: Chapter) : boolean{
        try {
            let manga_id = chapter.get_manga_id();
            if(manga_id == this.$mangaid){
                return true;
            }else{
                return false;
            }
        } catch (error) {
            return false;
        }
    }
    public insertChapter(chapter : Chapter){
        if(this.$chapters == undefined){
            this.$chapters = new Array<Chapter>();
        }
        //if(this.isChaptersAtItsLimits()){
        //    throw new Error("the container is already full");
        //}
        if(this.isChapterRelated_manga_id(chapter) == true && this.isChapterThere(chapter) == false){
            this.$chapters.push(chapter);
        }
    }
}