import { Chapter as StaChapter } from "@mangadex/api/sta/data-contracts";
import { Chapter } from "@mangadex/api/structures/Chapter";
import chapter_json from "./250f091f-4166-4831-9f45-89ff54bf433b.json";

const chapter_data: StaChapter = chapter_json.data;

const chapter = Chapter.build_W_Any(chapter_data);

export { default as images } from "./images";

export default chapter;