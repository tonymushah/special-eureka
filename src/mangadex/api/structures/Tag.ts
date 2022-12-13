import { RelationshipsTypes } from "../internal/Utils";
import { Attribute } from "./Attributes";

export class Tag extends Attribute{
    private name: any;
    private description: Array<any> | null;
    private group: string;
    // [x] set for all args
    public set_name(name: any){
        this.name = name;
    }
    public set_description(description: Array<any> | null){
        this.description = description;
    }
    public set_group(group: string){
        this.group = group;
    }
    // [x] set for all args
    public get_name(): any{
        return this.name;
    }
    public get_description(): Array<any> | null{
        return this.description;
    }
    public get_group(): string{
        return this.group;
    }
    // [x] default constructor
    public constructor(id: string, name: any, description: Array<any>, group: string){
        super(id, "tag");
        this.set_name(name);
        this.set_group(group);
        this.set_description(description);
    }
    // [ ] constructor with the object id and type
    public static build_withAny(object: any): Tag{
        let attributes = object.attributes;
        let relationship = object.relationships;
        let instance: Tag = new Tag(object.id, attributes.name, attributes.description, attributes.group);
        let getted: Array<Attribute> = new Array<Attribute>(relationship.length);
            for (let index = 0; index < getted.length; index++) {
                getted[index] = Attribute.build_wRelated_any(relationship[index], relationship[index].related);
            }
        instance.set_relationships(getted);
        return instance;
    }
    // [ ] constructor but with any object
    public get_key_word():string{
        return RelationshipsTypes.tag();
    }
}