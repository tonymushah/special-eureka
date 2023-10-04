import * as Chakra from "@chakra-ui/react";
import useState from "./useState";

export default function FeedButton() {
    const { navigate, isOnTo } = useState("feed");
    return (
        <Chakra.Button variant={isOnTo ? "solid" : "outline"} onClick={(e) => {
            e.preventDefault();
            navigate({
                "preventScrollReset": true
            });
        }} >
            Feeds
        </Chakra.Button>
    );
}