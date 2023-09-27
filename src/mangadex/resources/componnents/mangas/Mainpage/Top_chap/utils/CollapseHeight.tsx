import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import "@commons-res/flag-icons/less/flag-icons.less";
import React from "react";

export default function CollapseHeight(props: React.PropsWithChildren) {
    const [show, setShow] = React.useState(false);

    const handleToggle = React.useCallback(() => setShow(!show), [show, setShow]);

    return (
        <React.Fragment>
            <Chakra.Box
                display={{
                    base: "inherit"
                }}
                width={"100%"}
                borderBottomRadius={"50px"}
            >
                <Chakra.Collapse 
                    in={show}
                >
                    {
                        props.children
                    }
                </Chakra.Collapse>
            </Chakra.Box>
            <Chakra.Center
            >
                <Chakra.Button display={{
                    base: "inherit"
                }} size='sm' onClick={handleToggle} m='1rem'>
                    <Chakra.HStack>
                        <Chakra.Icon
                            as={show ? ChevronUpIcon : ChevronDownIcon}
                        />
                        <Chakra.Text>
                            Show {show ? "Less" : "More"}
                        </Chakra.Text>
                        <Chakra.Icon
                            as={show ? ChevronUpIcon : ChevronDownIcon}
                        />
                    </Chakra.HStack>
                </Chakra.Button>
            </Chakra.Center>
        </React.Fragment>
    );
}
