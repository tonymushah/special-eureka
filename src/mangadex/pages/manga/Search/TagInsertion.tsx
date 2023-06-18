import { Tag as MangadexTag } from "@mangadex/api/structures/Tag";

export enum TagInsertionMode {
    Include,
    Exclude,
}

export type TagInsertion = {
    id: string,
    mode: TagInsertionMode
}

export function is_in_tag_insertion(tag: string | MangadexTag, to_use: Array<TagInsertion>): boolean {
    return (find_in_tag_insertion(tag, to_use) != undefined);
}

export function find_in_tag_insertion(tag: string | MangadexTag, to_use: Array<TagInsertion>): TagInsertion | undefined {
    return to_use.find((v) => {
        if (typeof tag == "string") {
            return v.id == tag;
        } else {
            return v.id == tag.get_id();
        }
    });
}

export function add_tag_insertion(input: TagInsertion, to_use: Array<TagInsertion>): TagInsertion {
    const selected = find_in_tag_insertion(input.id, to_use);
    if (selected == undefined) {
        to_use.push(input);
    }
    return input;
}

export function find_index_tag_insertion(tag: string | MangadexTag, to_use: Array<TagInsertion>): number {
    return to_use.findIndex((v) => {
        if (typeof tag == "string") {
            return v.id == tag;
        } else {
            return v.id == tag.get_id();
        }
    });
}

export function remove_tag_insertion(tag: string | MangadexTag, to_use: Array<TagInsertion>) {
    const selected = find_in_tag_insertion(tag, to_use);
    if (selected != undefined) {
        const index = find_index_tag_insertion(tag, to_use);
        if (index >= 0) {
            to_use.splice(index);
        }
    }
}

export function change_mode_tag_insertion(tag: string | MangadexTag, mode: TagInsertionMode, to_use: Array<TagInsertion>) {
    const d = find_index_tag_insertion(tag, to_use);
    if (d !== undefined) {
        to_use[d].mode = mode;
    }
}

export function toggle_tag_insertion(tag: string | MangadexTag, to_use: Array<TagInsertion>) {
    const data = find_in_tag_insertion(tag, to_use);
    if (data != undefined) {
        if (data.mode == TagInsertionMode.Include) {
            data.mode = TagInsertionMode.Exclude;
        } else if (data.mode == TagInsertionMode.Exclude) {
            remove_tag_insertion(tag, to_use);
        }
    } else {
        add_tag_insertion({
            id: typeof tag == "string" ? tag : tag.get_id(),
            mode: TagInsertionMode.Include
        }, to_use);
    }
}

export function get_mode_tag_insertion(tag: string | MangadexTag, to_use: Array<TagInsertion>): TagInsertionMode | undefined {
    return find_in_tag_insertion(tag, to_use)?.mode;
}

export function get_tag_index(array: Array<string>, element_: string): number {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.localeCompare(element_) == 0) {
            return index;
        }
    }
    return -1;
}

