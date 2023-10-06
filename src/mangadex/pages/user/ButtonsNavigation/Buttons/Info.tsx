import * as Chakra from "@chakra-ui/react";
import useState from "./useState";

export default function InfoButton() {
    const { navigate, isOnTo } = useState();
    return (
        <Chakra.Button variant={isOnTo ? "solid" : "outline"} onClick={(e) => {
            e.preventDefault();
            navigate({
                "preventScrollReset": true
            });
        }} >
            User Information
        </Chakra.Button>
    );
}