import type { LangDataMap } from "..";

export default function manga_altTitle_to_lang_map(_data: Record<string, string>[]): LangDataMap {
	const res: Map<string, string> = new Map();
	_data.forEach((data) => {
		for (const key in data) {
			if (Object.prototype.hasOwnProperty.call(data, key)) {
				const element = data[key];
				res.set(key, element);
			}
		}
	});
	return res;
}
