import type { Unsubscriber } from "svelte/store";

export const previousNextEventTarget = new EventTarget();

const NEXT_EVENT_KEY = "next";

export function fireChapterNextEvent() {
	previousNextEventTarget.dispatchEvent(new Event(NEXT_EVENT_KEY));
}

export function addListenerToChapterNextEventTarget(callback: EventListenerOrEventListenerObject) {
	previousNextEventTarget.addEventListener(NEXT_EVENT_KEY, callback);
	return () => {
		previousNextEventTarget.removeEventListener(NEXT_EVENT_KEY, callback);
	};
}

const PREVIOUS_EVENT_KEY = "previous";

export function fireChapterPreviousEvent() {
	previousNextEventTarget.dispatchEvent(new Event(PREVIOUS_EVENT_KEY));
}

export function addListenerToChapterPreviousEventTarget(
	callback: EventListenerOrEventListenerObject
) {
	previousNextEventTarget.addEventListener(PREVIOUS_EVENT_KEY, callback);
	return () => {
		previousNextEventTarget.removeEventListener(PREVIOUS_EVENT_KEY, callback);
	};
}

export class SelectChapterEvent extends Event {
	static EVENT_KEY = "select";
	id: string;
	constructor(id: string) {
		super(SelectChapterEvent.EVENT_KEY);
		this.id = id;
	}
}

type SelectEventListener = (event: SelectChapterEvent) => void;

export function addListenerToSelectChapterEventTarget(callback: SelectEventListener): Unsubscriber {
	const callback_: EventListener = (event) => {
		if (event instanceof SelectChapterEvent) {
			callback(event);
		}
	};
	previousNextEventTarget.addEventListener(SelectChapterEvent.EVENT_KEY, callback_);
	return () => {
		previousNextEventTarget.removeEventListener(SelectChapterEvent.EVENT_KEY, callback_);
	};
}

export function fireSelectChapterEvent(event: string | SelectChapterEvent) {
	if (event instanceof SelectChapterEvent) {
		previousNextEventTarget.dispatchEvent(event);
	} else if (typeof event == "string") {
		previousNextEventTarget.dispatchEvent(new SelectChapterEvent(event));
	}
}
