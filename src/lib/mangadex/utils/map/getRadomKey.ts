// returns random key from Set or Map
export default function getRandomKey<K = unknown, V = unknown>(collection: Map<K, V>): K {
    const keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}