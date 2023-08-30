import { HStack, Icon, Link, LinkBox, LinkOverlay, Tooltip } from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import { Group } from "@mangadex/api/structures/Group";
import { RiGroupFill } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { MangaDexPath } from ".";

export function OnCatch(props: { src: Group; }) {
    return <Tooltip
        label={`This group has ${props.src.getMembersID().length} members`}
    >
        <LinkBox
            borderRadius={"10px"}
            border={"1px"}
            borderColor={"black"}
            p={1}
            _hover={{
                backgroundColor: "gray.100"
            }}
        >
            <HStack>
                <Icon as={RiGroupFill} />
                <TryCatch
                    catch={() => (
                        <Link>
                            {props.src.get_name()}
                        </Link>
                    )}
                >
                    <LinkOverlay _hover={{
                        color: "orange",
                        textDecoration: "none"
                    }} color={"inherit"} textDecoration={"none"} as={RouterLink} to={MangaDexPath + "/group/" + props.src.get_id()}>
                        {props.src.get_name()}
                    </LinkOverlay>
                </TryCatch>
            </HStack>
        </LinkBox>
    </Tooltip>;
}
