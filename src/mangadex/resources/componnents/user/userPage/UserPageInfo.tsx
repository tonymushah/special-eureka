import { ExternalLinkIcon } from "@chakra-ui/icons";
import * as Chakra from "@chakra-ui/react";
import { Box, Heading } from "@chakra-ui/react";
import { ExtLink } from "@commons-res/components/ExtLink";
import { User } from "@mangadex/api/structures/User";
import UserGroups from "@mangadex/resources/componnents/user/userPage/UserGroups";
import UserUploadsNumber from "@mangadex/resources/componnents/user/userPage/UserUploadsNumber";
import { hashQueryKey } from "@tanstack/react-query";
import RoleTag from "../roleTag";

export default function UserPageInfo(props: {
    user: User
}) {

    return (
        <Box>
            <ExtLink
                href={`https://mangadex.org/user/${props.user.get_id()}`}
            >
                <Chakra.Button colorScheme={"orange"} rightIcon={<ExternalLinkIcon />}>
                    Open on Mangadex
                </Chakra.Button>
            </ExtLink>
            <Box>
                <Chakra.Heading fontFamily={"inherit"} size={"md"}>Uploads : <UserUploadsNumber user_id={props.user.get_id()} /></Chakra.Heading>
            </Box>
            <Box>
                <Chakra.HStack>
                    <Heading fontFamily={"inherit"} size={"md"}>Roles : </Heading>
                    {
                        props.user.get_roles().map((value) => (
                            <RoleTag key={hashQueryKey([value])} role={value}/>
                        ))
                    }
                </Chakra.HStack>
            </Box>
            <Box>
                <Chakra.Heading fontFamily={"inherit"} size={"md"}>Groups</Chakra.Heading>
                <UserGroups
                    {...props}
                />
            </Box>
        </Box>
    );
}