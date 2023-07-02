import { Author } from "@mangadex/api/structures/Author";

export class Author_Artists{
    private authors: Array<Author>;
    private artists: Array<Author>;
    public filtred!: Array<Author>;
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
        const authors: Array<Author> = this.authors;
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
