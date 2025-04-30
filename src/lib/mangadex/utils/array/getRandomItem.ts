// get random item from a Set
export default function getRandomItem<T = unknown>(set: Set<T>): T {
	const items = Array.from(set);
	return items[Math.floor(Math.random() * items.length)];
}
