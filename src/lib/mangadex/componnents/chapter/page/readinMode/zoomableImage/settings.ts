import { writable, type Writable, readable } from "svelte/store";

// TODO integrate with Tauri backend
export const resetZoomKey = writable("Escape");

function genZoomSpeedValue(init: number): Writable<number> {
	const writable_ = writable(init);
	const set = function (value: number) {
		writable_.set(Math.abs(value));
	};
	return {
		subscribe(run, invalidate) {
			return writable_.subscribe(run, invalidate);
		},
		set,
		update(updater) {
			writable_.update((v) => {
				return Math.abs(updater(v));
			});
		}
	};
}

// TODO integrate with Tauri backend
export const zoomSpeedValue: Writable<number> = genZoomSpeedValue(1);
