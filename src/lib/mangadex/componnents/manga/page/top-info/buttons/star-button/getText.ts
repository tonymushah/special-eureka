export default function getText(number: number): string | undefined {
	switch (number) {
		case 10:
			return "Masterpiece";
		case 9:
			return "Great";
		case 8:
			return "Very Good";
		case 7:
			return "Good";
		case 6:
			return "Fine";
		case 5:
			return "Average";
		case 4:
			return "Bad";
		case 3:
			return "Very Bad";
		case 2:
			return "Horrible";
		case 1:
			return "Appalling";
		default:
			break;
	}
}
