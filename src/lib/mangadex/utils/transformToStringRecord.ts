export function transformToStringRecord(obj: Record<string, unknown>): Record<string, string> {
	return Object.entries(obj).reduce(
		(acc, [key, value]) => {
			if (typeof value == "string") {
				acc[key] = value;
			}
			return acc;
		},
		{} as Record<string, string>
	);
}

export function transformToStringRecords(
	objs: Record<string, unknown>[]
): Record<string, string>[] {
	return objs.map((obj) => transformToStringRecord(obj));
}