import { useProps } from "../../v1/MangaElementDef/vanilla/Props";
import MangaTitle from "../../v1/MangaTitle";

export default function Title() {
    const { src } = useProps();
    return (
        <MangaTitle
            src={src}
        />
    );
}