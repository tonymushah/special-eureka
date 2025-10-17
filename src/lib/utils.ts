export const waitAsync = (time: number) => new Promise((resolve) => {
	setTimeout(resolve, time);
});