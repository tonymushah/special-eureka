import { getContext, setContext } from "svelte";
import { writable, type Readable } from "svelte/store";

type CoverImage = Readable<string | undefined>;

export type CoverImageMap = Map<string, CoverImage>;

type CoverImageMapEntry = { id: string; image: CoverImage };

export type CoversImageStore = Readable<CoverImageMap> & {
	get: () => CoverImageMap;
	set: (id: string, image: CoverImage) => void;
	setByBatch: (entrys: CoverImageMapEntry[]) => void;
	remove: (id: string) => void;
	removeByBatch: (ids: string[]) => void;
};

export default function coversImageStore(): CoversImageStore {
	const init = new Map<string, CoverImage>();
	const store = writable(init);
	return {
		subscribe(run, invalidate) {
			return store.subscribe(run, invalidate);
		},
		get() {
			return init;
		},
		set(id, image) {
			store.update((m) => {
				m.set(id, image);
				return m;
			});
		},
		setByBatch(entrys) {
			store.update((m) => {
				entrys.forEach(({ id, image }) => {
					m.set(id, image);
				});
				return m;
			});
		},
		remove(id) {
			store.update((m) => {
				m.delete(id);
				return m;
			});
		},
		removeByBatch(ids) {
			store.update((m) => {
				ids.forEach((id) => {
					m.delete(id);
				});
				return m;
			});
		}
	};
}

const KEY = "manga-covers-image-context";

export function getCoversImageStoreContext(): CoversImageStore {
	const context = getContext<CoversImageStore>(KEY);
	if (context) {
		return context;
	} else {
		throw new Error(`${KEY} context is undefined`);
	}
}

export function setCoversImageStoreContext(store: CoversImageStore): CoversImageStore {
	return setContext(KEY, store);
}

export function initCoverImageStoreContext(): CoversImageStore {
	return setCoversImageStoreContext(coversImageStore());
}
