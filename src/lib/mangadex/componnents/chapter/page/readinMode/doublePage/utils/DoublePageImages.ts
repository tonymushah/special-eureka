import {
	writable,
	type Invalidator,
	type Readable,
	type Subscriber,
	type Unsubscriber,
	type Writable
} from "svelte/store";

type DoublePageImage = string | [string, string];

export default class DoublePageImages implements Readable<DoublePageImage[]> {
	images: Writable<DoublePageImage[]> = writable([]);
	finished: boolean = false;
	subscribe(
		run: Subscriber<DoublePageImage[]>,
		invalidate?: Invalidator<DoublePageImage[]> | undefined
	): Unsubscriber {
		return this.images.subscribe(run, invalidate);
	}
}
