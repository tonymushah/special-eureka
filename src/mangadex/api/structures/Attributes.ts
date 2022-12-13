import { Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
export class Attribute{
    private id: string;
    private type: string;
    private relationships: Array<Attribute> | null;
    private related: string | null;
    // [x] set args
    public set_id(id:string){
        this.id = id;
    }
    public set_type(type: string){
        this.type = type;
    }
    public set_relationships(relationships: Array<Attribute> | null){
        this.relationships = relationships;
    }
    public set_relationships_Wany(relationships: any){
        let getted: Array<Attribute> = new Array<Attribute>(relationships.length);
        for (let index = 0; index < getted.length; index++) {
            getted[index] = Attribute.build_wRelated_any(relationships[index], relationships[index].related);
        }
        this.set_relationships(getted);
    }
    public set_related(related: string | null){
        this.related = related;
    }
    // [x] get args
    public get_id(): string{
        return this.id;
    }
    public get_type(): string{
        return this.type;
    }
    public get_relationships(): Array<Attribute> | null{
        return this.relationships;
    }
    public get_related(): string | null{
        return this.related;
    }
    // [x] constructor default
    public constructor(id: string, type: string){
        this.set_id(id);
        this.set_type(type);
    }
    // [x] builder with just a simple object
    public static build_wAny(object:any): Attribute{
        return new Attribute(object.id, object.type);
    }
    // [x] constructor with related 
        public static build_wRelated(id: string, type: string, related: string | null): Attribute{
            let instance : Attribute = new Attribute(id, type);
            instance.set_related(related);
            return instance;
        }
        public static build_wRelated_any(object: any /*it's the secret information lol*/, related: string | null): Attribute{
            let instance : Attribute = Attribute.build_wAny(object);
            instance.set_related(related);
            return instance;
        }
    // [x] construtor with relationship simple array
        // [x] part 1 : with id and type arg
        public static build_wRelations(id: string, type: string, relationship: Array<Attribute> | null): Attribute{
            let instance : Attribute = new Attribute(id, type);
            instance.set_relationships(relationship);
            return instance;
        }
        public static build_wRelations_Any(id: string, type: string, relationship: any): Attribute{
            let instance : Attribute = new Attribute(id, type);
            let getted: Array<Attribute> = new Array<Attribute>(relationship.length);
            for (let index = 0; index < getted.length; index++) {
                getted[index] = Attribute.build_wRelated_any(relationship[index], relationship[index].related);
            }
            return instance;
        }
        // [x] part 2 : with an object arg
        public static build_wARelations(object: any, relationship: Array<Attribute>): Attribute{
            let instance : Attribute = Attribute.build_wAny(object);
            instance.set_relationships(relationship);
            return instance;
        }
        public static build_wARelations_Any(object: any, relationship: any): Attribute{
            let instance : Attribute = Attribute.build_wAny(object);
            let getted: Array<Attribute> = new Array<Attribute>(relationship.length);
            for (let index = 0; index < getted.length; index++) {
                getted[index] = Attribute.build_wRelated_any(relationship[index], relationship[index].related);
            }
            return instance;
        }
    // [x] get an object via the attribute id and type
    public async get_any_byTypeID(): Promise<any>{
        try {
            let getted: Promise<Response<any>> = Api_Request.get_methods(this.get_type() + "/" + this.get_id());
            let to_use = await getted;
            return to_use.data.data;
        } catch (error) {
            throw new Error(error);
        }
    }
    public get_some_relationshipLength(name:string): number{
        let length: number = 0;
        for (let index = 0; index < this.relationships!.length; index++) {
            const to_use = this.relationships![index];
            if(to_use.get_type().localeCompare(name) == 0){
                length = length + 1;
            }
        }
        return length;
    }
    public get_some_relationship(name:string): Array<Attribute>{
        let length: number = 0;
        let returns: Array<Attribute> = new Array<Attribute>(this.get_some_relationshipLength(name));
        for (let index = 0; index < this.relationships!.length; index++) {
            const to_use = this.relationships![index];
            if(to_use.get_type().localeCompare(name) == 0){
                returns[length] = to_use;
                length = length + 1;
            }
        }
        return returns;
    }
    public get_key_word():string{
        return "";
    }
    public static get_some_relationship(relationships : Array<any>, name: string): Array<any>{
        let array: Array<any> = [];
        let index: number = 0;
        for (let index1 = 0; index1 < relationships!.length; index1++) {
            const element = relationships[index1];
            if(element.type == name){
                array[index] = element;
                index = index + 1;
            }
        }
        return array
    }
}