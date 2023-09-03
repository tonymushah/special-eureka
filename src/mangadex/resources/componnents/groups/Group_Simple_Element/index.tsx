import { getMangaDexPath } from "@mangadex/index";
import { Group } from "@mangadex/api/structures/Group";
import { OnCatch } from "./OnCatch";
import { Vanilla } from "./Vanilla";
import TryCatch from "@commons-res/components/TryCatch";

export const MangaDexPath = getMangaDexPath();

export default function Group_Simple_Element(props: {
    src: Group
}) {
    // [x] split try catch in a componnent
    return (
        <TryCatch
            catch={<OnCatch src={props.src} />}
        >
            <Vanilla src={props.src} />
        </TryCatch>
    );
}