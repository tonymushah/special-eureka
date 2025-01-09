import { type ComboboxOption, type Tag } from "@melt-ui/svelte";
import { derived as der, type Writable } from "svelte/store";

export function tagToComboboxOption(tag: Tag): ComboboxOption<string> {
	return {
		value: tag.id,
		label: tag.value
	};
}
export function comboBoxOptionToTag(option: ComboboxOption<string>): Tag {
	return {
		value: option.label ?? option.value,
		id: option.value
	};
}
export function tagWritableToComboboxOptionWritable(
	store: Writable<Tag[]>
): Writable<ComboboxOption<string>[]> {
	const derived_ = der(store, ($s) => {
		return $s.map((v) => tagToComboboxOption(v));
	});
	return {
		subscribe(run, invalidate) {
			return derived_.subscribe(run, invalidate);
		},
		set(value) {
			store.set(value.map((v) => comboBoxOptionToTag(v)));
		},
		update(updater) {
			store.update((inner) => {
				return updater(inner.map((v) => tagToComboboxOption(v))).map((v) =>
					comboBoxOptionToTag(v)
				);
			});
		}
	};
}
