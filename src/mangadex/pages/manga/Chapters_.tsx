import { useManga } from ".";
import { Top_Chaps } from "@mangadex/resources/componnents/mangas/Mainpage/Top_chap";

export default function Chapters_() {
    const { toUse } = useManga();
    return (
        <Top_Chaps src={toUse}></Top_Chaps>
    );
}