import { Client } from "@tauri-apps/api/http";
import { RelationshipsTypes } from "../internal/Utils";
import { Attribute } from "./Attributes";
import { Api_Request } from "../internal/Api_Request";
import { Response } from "@tauri-apps/api/http";


export class Tag extends Attribute {
    private name: any;
    private description: Array<any> | null;
    private group: string;
    // [x] set for all args
    public set_name(name: any) {
        this.name = name;
    }
    public set_description(description: Array<any> | null) {
        this.description = description;
    }
    public set_group(group: string) {
        this.group = group;
    }
    // [x] set for all args
    public get_name(): any {
        return this.name;
    }
    public get_description(): Array<any> | null {
        return this.description;
    }
    public get_group(): string {
        return this.group;
    }
    // [x] default constructor
    public constructor(id: string, name: any, description: Array<any>, group: string) {
        super(id, "tag");
        this.set_name(name);
        this.set_group(group);
        this.set_description(description);
    }
    // [ ] constructor with the object id and type
    public static build_withAny(object: any): Tag {
        const attributes = object.attributes;
        const relationship = object.relationships;
        const instance: Tag = new Tag(object.id, attributes.name, attributes.description, attributes.group);
        const getted: Array<Attribute> = new Array<Attribute>(relationship.length);
        for (let index = 0; index < getted.length; index++) {
            getted[index] = Attribute.build_wRelated_any(relationship[index], relationship[index].related);
        }
        instance.set_relationships(getted);
        return instance;
    }
    // [ ] constructor but with any object
    public get_key_word(): string {
        return RelationshipsTypes.tag();
    }
    public static async get_all_tag(client: Client): Promise<Array<Tag>> {
        const result: Response<any> = (await Api_Request.get_methods("manga/tag", undefined, client));
        const data: Array<Tag> = [];
        const result_data: Array<any> = result.data.data;
        result_data.forEach(element => {
            data.push(Tag.build_withAny(element));
        });
        return data;
    }
}