export class Querry_list_builder<T>{
    private name!: string;
    private array!: Array<T>;

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
        let returns : any = {};
        try{
            for (let index = 0; index < this.array.length; index++) {
                const element = this.array[index];
                returns[this.$name + "[" + index +"]"] = element;
            }
        }catch(e){
            returns = null;
        }
        return returns;
    }
}