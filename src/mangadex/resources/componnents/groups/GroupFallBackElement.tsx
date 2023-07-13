import * as Chakra from "@chakra-ui/react";

export default function GroupFallBackElement() {
    return (
        <Chakra.Box>
            <Chakra.Skeleton
                height={"30px"}
                width={"sm"}
                borderRadius={"10px"}
            />
        </Chakra.Box>
    );
}
