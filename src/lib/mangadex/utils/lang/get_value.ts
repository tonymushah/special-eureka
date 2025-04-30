import type { LangDataMap } from ".";

export default function get_value(data: LangDataMap, key: string): string | undefined {
	return data.get(key);
}
