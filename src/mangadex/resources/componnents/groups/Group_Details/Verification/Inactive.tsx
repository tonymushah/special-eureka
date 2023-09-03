import * as ChakraIcon from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { useGroupRouteOutletContext } from "@mangadex/pages/groups/page";


export function Inactive() {
    const { group: src } = useGroupRouteOutletContext();
    return (
        <Chakra.HStack>
            {src.get_inactive() ? (
                <Chakra.Button>
                    <ChakraIcon.CheckIcon boxSize={"1em"} color={"green"} />
                </Chakra.Button>
            ) : (
                <Chakra.Button>
                    <ChakraIcon.SmallCloseIcon boxSize={"1em"} color={"red"} />
                </Chakra.Button>
            )}
            <Chakra.Text>
                Inactive
            </Chakra.Text>
        </Chakra.HStack>
    );
}
