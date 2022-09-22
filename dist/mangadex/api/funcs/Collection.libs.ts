import { isArrayLiteralExpression } from "typescript";
import { Collection } from "../structures/Collection";
import { Manga } from '../structures/Manga';

export function manga_collection(collection: Collection): Array<Manga> {
    var array = new Array<Manga>(collection.get_limit());
    for (let index = 0; index < array.length; index++) {
        array[index] = Manga.build_any(collection.get_data()[index]);
    }
    return array;
}