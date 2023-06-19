import { HStack, Icon, Link, LinkBox, LinkOverlay, Skeleton, Tooltip } from "@chakra-ui/react";
import { useHTTPClient } from "@commons-res/components/HTTPClientProvider";
import TryCatch from "@commons-res/components/TryCatch";
import { getMangaDexPath } from "@mangadex";
import { Group } from "@mangadex/api/structures/Group";
import {
    useQuery
} from "@tanstack/react-query";
import { RiGroupFill } from "react-icons/ri";
import { Link as RouterLink } from "react-router-dom";

const MangaDexPath = getMangaDexPath();

export default function Group_Simple_Element(props: {
    src: Group
}) {
    const client = useHTTPClient();
    try {
        const leader_queryKey = ["mdx", "user", props.src.getLeaderID()];
        const leader_query = useQuery(leader_queryKey, () => {
            return props.src.getLeader(client);
        }, {
            staleTime: Infinity
        });
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
                            catch={
                                () => (
                                    <Link>
                                        {props.src.get_name()}
                                    </Link>
                                )
                            }
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
                            <>Leader : &nbsp;</>
                            {
                                leader_query.isLoading ? (
                                    <Skeleton height={"10px"} />
                                ) : (
                                    leader_query.isSuccess ? (
                                        <Link _hover={{
                                            color: "orange",
                                            textDecoration: "none"
                                        }} color={"inherit"} textDecoration={"none"} as={RouterLink} to={`${getMangaDexPath()}/user/${leader_query.data.get_id()}`}>{
                                                leader_query.data.get_username()
                                            }</Link>
                                    ) : (
                                        <></>
                                    )
                                )
                            }
                        </HStack>
                    </HStack>
                </LinkBox>
            </Tooltip>
        );
    } catch (e) {
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
                            catch={
                                () => (
                                    <Link>
                                        {props.src.get_name()}
                                    </Link>
                                )
                            }
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
            </Tooltip>
        );
    }

}
