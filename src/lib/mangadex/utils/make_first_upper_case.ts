export default function make_first_upper_case(input: string): string {
	const _input = input.substring(1);
	return input[0].toUpperCase() + _input;
}
