import { getMangaDexPath } from "@mangadex/index";
import { Group } from "@mangadex/api/structures/Group";
import { OnCatch } from "./OnCatch";
import { Vanilla } from "./Vanilla";

export const MangaDexPath = getMangaDexPath();

export default function Group_Simple_Element(props: {
    src: Group
}) {
    // [x] split try catch in a componnent
    try {
        return (
            <Vanilla src={props.src}/>
        );
    } catch (e) {
        return (
            <OnCatch src={props.src}/>
        );
    }

}