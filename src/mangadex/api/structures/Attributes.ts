import { Client, Response } from "@tauri-apps/api/http";
import { Api_Request } from "../internal/Api_Request";
import { Relationship } from "../sta/data-contracts";
export type IdType = {
    id: string,
    type: string
}
export type IdTypeWRelated = IdType & {
    related: string
}
export class Attribute {
    private id!: string;
    private type!: string;
    private relationships: Array<Attribute> = [];
    private related?: string;
    // [x] set args
    public set_id(id: string) {
        this.id = id;
    }
    public set_type(type: string) {
        this.type = type;
    }
    public set_relationships(relationships: Array<Attribute> | undefined) {
        this.relationships = relationships ?? [];
    }
    public set_relationships_Wany(relationships: Relationship[]) {
        const getted: Array<Attribute> = new Array<Attribute>(relationships.length);
        for (let index = 0; index < getted.length; index++) {
            getted[index] = Attribute.build_wRelated_any(relationships[index], relationships[index].related);
        }
        this.set_relationships(getted);
    }
    public set_related(related: string | undefined) {
        this.related = related;
    }
    // [x] get args
    public get_id(): string {
        return this.id;
    }
    public get_type(): string {
        return this.type;
    }
    public get_relationships(): Array<Attribute> {
        return this.relationships;
    }
    public get_related(): string | undefined {
        return this.related;
    }
    // [x] constructor default
    public constructor(id: string, type: string) {
        this.set_id(id);
        this.set_type(type);
    }
    // [x] builder with just a simple object
    public static build_wAny(object: {
        id: string,
        type: string
    }): Attribute {
        return new Attribute(object.id, object.type);
    }
    // [x] constructor with related 
    public static build_wRelated(id: string, type: string, related: string | undefined): Attribute {
        const instance: Attribute = new Attribute(id, type);
        instance.set_related(related);
        return instance;
    }
    public static build_wRelated_any(object: IdType /*it's the secret information lol*/, related: string | undefined): Attribute {
        const instance: Attribute = Attribute.build_wAny(object);
        instance.set_related(related);
        return instance;
    }
    // [x] construtor with relationship simple array
    // [x] part 1 : with id and type arg
    public static build_wRelations(id: string, type: string, relationship: Array<Attribute> | undefined): Attribute {
        const instance: Attribute = new Attribute(id, type);
        instance.set_relationships(relationship);
        return instance;
    }
    public static build_wRelations_Any(id: string, type: string, relationship: IdTypeWRelated[]): Attribute {
        const instance: Attribute = new Attribute(id, type);
        const getted: Array<Attribute> = new Array<Attribute>(relationship.length);
        for (let index = 0; index < getted.length; index++) {
            getted[index] = Attribute.build_wRelated_any(relationship[index], relationship[index].related);
        }
        return instance;
    }
    // [x] part 2 : with an object arg
    public static build_wARelations(object: IdType, relationship: Array<Attribute>): Attribute {
        const instance: Attribute = Attribute.build_wAny(object);
        instance.set_relationships(relationship);
        return instance;
    }
    public static build_wARelations_Any(object: IdType, relationship: IdTypeWRelated[]): Attribute {
        const instance: Attribute = Attribute.build_wAny(object);
        const getted: Array<Attribute> = new Array<Attribute>(relationship.length);
        for (let index = 0; index < getted.length; index++) {
            getted[index] = Attribute.build_wRelated_any(relationship[index], relationship[index].related);
        }
        return instance;
    }
    // [x] get an object via the attribute id and type
    public async get_any_byTypeID<T = unknown>(client?: Client): Promise<T> {
        try {
            const getted: Promise<Response<T>> = Api_Request.get_methods(this.get_type() + "/" + this.get_id(), undefined, client);
            const to_use = await getted;
            return to_use.data;
        } catch (error) {
            if (typeof error == "string") {
                throw new Error(error);
            } else {
                throw new Error("Unexpected error", {
                    cause: error
                });
            }
        }
    }
    public get_some_relationshipLength(name: string): number {
        let length = 0;
        if (this.relationships != undefined) {
            for (let index = 0; index < this.relationships.length; index++) {
                const to_use = this.relationships[index];
                if (to_use.get_type().localeCompare(name) == 0) {
                    length = length + 1;
                }
            }
        }
        return length;
    }
    public get_some_relationship(name: string): Array<Attribute> {
        const returns: Array<Attribute> = [];
        if (this.relationships != undefined) {
            for (let index = 0; index < this.relationships.length; index++) {
                const to_use = this.relationships[index];
                if (to_use.get_type().localeCompare(name) == 0) {
                    returns.push(to_use);
                }
            }
        }
        return returns;
    }
    public get_key_word(): string {
        return "";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static get_some_relationship(relationships: Relationship[], name: string): Array<any> {
        const array = [];
        let index = 0;
        for (let index1 = 0; index1 < relationships.length; index1++) {
            const element = relationships[index1];
            if (name.localeCompare(element.type) == 0) {
                array[index] = element;
                index = index + 1;
            }
        }
        return array;
    }
}