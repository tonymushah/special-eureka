import get_value_and_random_if_undefined from "./get_value_and_random_if_undefined";
import manga_title_to_lang_map from "./record-to-map/manga-title-to-lang-map";

export default function get_value_from_title_and_random_if_undefined(
	title: Record<string, string>,
	key: string
): string | undefined {
	const data = manga_title_to_lang_map(title);
	return get_value_and_random_if_undefined(data, key);
}
