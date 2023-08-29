import { HStack, Icon, Link, LinkBox, LinkOverlay, Skeleton, Tooltip } from "@chakra-ui/react";
import TryCatch from "@commons-res/components/TryCatch";
import { getMangaDexPath } from "@mangadex/index";
import { Group } from "@mangadex/api/structures/Group";
import { RiGroupFill } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { MangaDexPath } from ".";
import { useLeaderQuery } from "./useLeaderQuery";

export function Vanilla(props: { src: Group; }) {
    const leader_query = useLeaderQuery(props);
    return (
        <Tooltip
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
                        catch={() => OnCatch(props)}
                    >
                        <LinkOverlay _hover={{
                            color: "orange",
                            textDecoration: "none"
                        }} color={"inherit"} textDecoration={"none"} as={RouterLink} to={MangaDexPath + "/group/" + props.src.get_id()}>
                            {props.src.get_name()}
                        </LinkOverlay>
                    </TryCatch>
                    <HStack
                        bg={"gray.100"}
                        textAlign={"center"}
                        borderRadius={"5px"}
                    >
                        <React.Fragment>Leader : &nbsp;</React.Fragment>
                        {leader_query.isLoading ? (
                            <Skeleton height={"10px"} />
                        ) : (
                            leader_query.isSuccess ? (
                                <Link _hover={{
                                    color: "orange",
                                    textDecoration: "none"
                                }} color={"inherit"} textDecoration={"none"} as={RouterLink} to={`${getMangaDexPath()}/user/${leader_query.data.get_id()}`}>{leader_query.data.get_username()}</Link>
                            ) : (
                                <React.Fragment />
                            )
                        )}
                    </HStack>
                </HStack>
            </LinkBox>
        </Tooltip>
    );
}

function OnCatch(props: { src: Group; }): React.ReactNode {
    return (
        <Link>
            {
                props.src.get_name()
            }
        </Link>
    );
}
