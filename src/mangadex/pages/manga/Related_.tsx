import { useManga } from ".";
import Related from "../../resources/componnents/mangas/Mainpage/Related";

export default function Related_() {
    const { toUse } = useManga();
    return (
        <Related src={toUse} />
    );
}