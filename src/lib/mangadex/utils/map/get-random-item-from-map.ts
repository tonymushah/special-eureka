import getRandomKey from "./getRadomKey";

export default function get_random_item_from_map<K = unknown, V = unknown>(map: Map<K, V>): [K, V | undefined] {
    const key = getRandomKey(map);
    return [key, map.get(key)]
}