import { Button } from "@chakra-ui/react";
import useState from "./useState";

export default function ToGroupDetailsButton(){
    const {navigate, isOnTo}  = useState();
    return (
        <Button variant={isOnTo ? "solid" : "outline"} 
            onClick={() => navigate({
                preventScrollReset : true
            })}
        >
            Group Details
        </Button>
    );
}