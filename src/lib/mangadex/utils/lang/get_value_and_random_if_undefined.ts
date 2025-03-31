import type { LangDataMap } from ".";
import get_random_item_from_map from "../map/get-random-item-from-map";
import get_value from "./get_value";

export default function get_value_and_random_if_undefined(data: LangDataMap, key: string): string | undefined {
    return get_value(data, key) ?? get_random_item_from_map(data)[1];
}