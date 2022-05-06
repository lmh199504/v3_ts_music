const stopPropagation = (event) => event.stopPropagation();
export function preventDefault(event :Event, isStopPropagation: boolean) :void {
	if (typeof event.cancelable !== "boolean" || event.cancelable) {
		event.preventDefault();
	}
	if (isStopPropagation) {
		stopPropagation(event);
	}
}

export function getScrollTop(el: HTMLElement): number {
  const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
}
export function getScrollLeft(el: HTMLElement): number {
  const top = "scrollTop" in el ? el.scrollLeft : el.pageXOffset;
  return Math.max(top, 0);
}