import is_tag_gore from "./is_tag_gore";
import is_tag_sexual_violence from "./is_tag_sexual_violence";

export default function is_tag_danger(id: string): boolean {
	return is_tag_gore(id) || is_tag_sexual_violence(id);
}
