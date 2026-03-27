export function isAprilsFoolsDay() {
	const currentDate = new Date();
	return currentDate.getDate() == 1 && currentDate.getMonth() == 3;
}
