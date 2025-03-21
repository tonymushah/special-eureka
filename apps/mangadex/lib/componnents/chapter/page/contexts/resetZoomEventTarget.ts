export const resetZoomEventTarget = new EventTarget();

const RESET_ZOOM_EVENT_KEY = "resetZoom";

export function resetZoom() {
	resetZoomEventTarget.dispatchEvent(new Event(RESET_ZOOM_EVENT_KEY));
}

export function addListenerToResetZoomEventTarget(callback: EventListenerOrEventListenerObject) {
	resetZoomEventTarget.addEventListener(RESET_ZOOM_EVENT_KEY, callback);
	return () => {
		resetZoomEventTarget.removeEventListener(RESET_ZOOM_EVENT_KEY, callback);
	};
}
