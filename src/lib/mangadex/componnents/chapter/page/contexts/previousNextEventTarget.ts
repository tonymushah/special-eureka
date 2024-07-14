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
