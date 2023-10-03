import { Button } from "@chakra-ui/react";
import useState from "./useState";

export default function ToFeedButton(){
    const {navigate, isOnTo}  = useState("feeds");
    return (
        <Button variant={isOnTo ? "solid" : "outline"} 
            onClick={() => navigate({
                preventScrollReset : true
            })}
        >
            Feed
        </Button>
    );
}