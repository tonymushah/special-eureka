export const waitAsync = (time: number) =>
	new Promise((resolve) => {
		setTimeout(resolve, time);
	});

export const flexRender = <TProps extends object>(comp: any, props: TProps) => {
	if (typeof comp === "function") {
		return comp(props);
	}
	return comp;
};

export function millify(num: number): string {
	return new Intl.NumberFormat("en-US", {
		notation: "compact"
	}).format(num);
}
