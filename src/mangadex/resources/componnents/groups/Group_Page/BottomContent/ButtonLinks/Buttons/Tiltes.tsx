import { Button } from "@chakra-ui/react";
import useState from "./useState";

export default function ToTitlesButton() {
    const { navigate, isOnTo } = useState("titles");
    return (
        <Button variant={isOnTo ? "solid" : "outline"}
            onClick={() => navigate({
                preventScrollReset: true
            })}
        >
            Titles
        </Button>
    );
}