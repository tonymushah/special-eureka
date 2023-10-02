import * as Chakra from "@chakra-ui/react";
import useState from "./useState";

export default function RelatedButton() {
    const { navigate, isOnTo } = useState("related");
    return (
        <Chakra.Button variant={isOnTo ? "solid" : undefined} onClick={(e) => {
            e.preventDefault();
            navigate({
                "preventScrollReset": true
            });
        }} >
            Related
        </Chakra.Button>
    );
}