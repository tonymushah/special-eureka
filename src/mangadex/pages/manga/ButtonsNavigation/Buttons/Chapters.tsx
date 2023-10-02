import * as Chakra from "@chakra-ui/react";
import useState from "./useState";

export default function ChaptersButton() {
    const { navigate, isOnTo } = useState();
    return (
        <Chakra.Button variant={isOnTo ? "solid" : "outline"} onClick={(e) => {
            e.preventDefault();
            navigate({
                "preventScrollReset": true
            });
        }} >
            Chapters
        </Chakra.Button>
    );
}