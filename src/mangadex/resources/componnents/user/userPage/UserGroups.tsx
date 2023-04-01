import { Box, Wrap, WrapItem } from "@chakra-ui/react";
import { Attribute } from "@mangadex/api/structures/Attributes";
import { User } from "@mangadex/api/structures/User";
import Group_Simple_Element_ByID from "@mangadex/resources/componnents/groups/Group_Simple_Element_byID";

export default function UserGroups(props: {
    user: User
}) {
    const groups: Attribute[] = props.user.get_some_relationship("scanlation_group");
    return (
        <Box>
            <Wrap>
                {
                    groups.map((value) => (
                        <WrapItem
                            key={value.get_id()}>
                            <Group_Simple_Element_ByID
                                id={value.get_id()}
                            />
                        </WrapItem>
                    ))
                }
            </Wrap>
        </Box>
    );
}