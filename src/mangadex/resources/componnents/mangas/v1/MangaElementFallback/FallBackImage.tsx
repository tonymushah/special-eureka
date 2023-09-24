import * as Chakra from "@chakra-ui/react";

export function FallBackImage() {
    return (
        <Chakra.Skeleton
            borderTopLeftRadius={"10px"}
            borderBottomLeftRadius={"10px"}
            height={"160px"} 
            cursor={"wait"}
        />
    );
}
