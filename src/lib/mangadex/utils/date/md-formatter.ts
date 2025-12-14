function get_js_date_offset_str(date: Date): string {
	const offset_min = Math.abs(date.getTimezoneOffset() % 60);
	const offset_hour = (date.getTimezoneOffset() - offset_min) / 60;
	let offset_hour_str: string;
	const offset_hour_abs = Math.abs(offset_hour);
	if (offset_hour_abs < 10) {
		offset_hour_str = `0${offset_hour_abs}`;
	} else {
		offset_hour_str = `${offset_hour_abs}`;
	}
	let offset_min_str: string;
	if (offset_min < 10) {
		offset_min_str = `0${offset_min}`;
	} else {
		offset_min_str = `0${offset_min}`;
	}
	if (offset_hour >= 0) {
		return `+${offset_hour_str}:${offset_min_str}`;
	} else {
		return `-${offset_hour_str}:${offset_min_str}`;
	}
}

export default function format_js_date_to_rs_md_date_time_str(date: Date): string {
	const offset_hour_str = get_js_date_offset_str(date);
	const year = date.getFullYear();
	const month = fmt_num_ten(date.getMonth() + 1);
	const date_ = fmt_num_ten(date.getDate());
	const hours = fmt_num_ten(date.getHours());
	const mins = fmt_num_ten(date.getMinutes());
	const secs = fmt_num_ten(date.getSeconds());
	return `${year}-${month}-${date_}T${hours}:${mins}:${secs}${offset_hour_str}`;
}

function fmt_num_ten(number: number) {
	if (number < 10) {
		return `0${number}`;
	} else {
		return `${number}`;
	}
}
