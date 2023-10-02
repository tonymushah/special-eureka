import * as Chakra from "@chakra-ui/react";
import useState from "./useState";

export default function CoverButton() {
    const { navigate, isOnTo } = useState("covers");
    return (
        <Chakra.Button variant={isOnTo ? "solid" : "outline"} onClick={(e) => {
            e.preventDefault();
            navigate({
                "preventScrollReset": true
            });
        }} >
            Covers
        </Chakra.Button>
    );
}