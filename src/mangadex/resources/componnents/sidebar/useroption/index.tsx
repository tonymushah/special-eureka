import React from "react";
import * as Chakra from "@chakra-ui/react";
import useUserOptionModal from "@mangadex/resources/hooks/userOptions/ModalContext";

export default function SideBarUserOption(props: React.PropsWithChildren) {
    const { changeOption } = useUserOptionModal();
    return (
        <React.Fragment>
            <Chakra.Box onClick={() => {
                changeOption(true);
            }}>
                {
                    props.children
                }
            </Chakra.Box>
        </React.Fragment>
    );
}