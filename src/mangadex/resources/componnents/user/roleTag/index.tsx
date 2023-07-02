import { Tag } from "@chakra-ui/react";
import { UserRole } from "@mangadex/api/structures/User";

export default function RoleTag(props : {
    role : UserRole
}){
    switch (props.role) {
        case UserRole.Admin:
            return (<Tag colorScheme={"orange"}>Administator</Tag>);
        case UserRole.Banned:
            return (<Tag colorScheme={"red"}>Banned</Tag>);
        case UserRole.Contributor:
            return (<Tag colorScheme={"messenger"}>Contributor</Tag>);
        case UserRole.Designer:
            return (<Tag colorScheme={"whatsapp"}>Designer</Tag>);
        case UserRole.Developer:
            return (<Tag colorScheme={"teal"}>Developer</Tag>);
        case UserRole.Forum_Moderator:
            return (<Tag colorScheme={"gray"} variant={"solid"}>Forum Moderator</Tag>);
        case UserRole.Global_Moderator:
            return (<Tag colorScheme={"twitter"}>Global Moderator</Tag>);
        case UserRole.Group_Leader:
            return (<Tag colorScheme={"blue"}>Group Leader</Tag>);
        case UserRole.Group_Member:
            return (<Tag>Group Member</Tag>);
        case UserRole.Guest:
            return (<Tag>Guest</Tag>);
        case UserRole.Member:
            return (<Tag>Member</Tag>);
        case UserRole.Md_At_Home:
            return (<Tag colorScheme={"orange"}>Mangadex At Home</Tag>);
        case UserRole.Power_Uploader:
            return (<Tag colorScheme={"whatsapp"}>Power Uploader</Tag>);
        case UserRole.Public_Relations:
            return (<Tag colorScheme={"pink"}>Public Relations</Tag>);
        case UserRole.Staff:
            return (<Tag colorScheme={"purple"}>Staff</Tag>);
        case UserRole.Unverified:
            return (<Tag>Unverified</Tag>);
        case UserRole.User:
            return (<Tag>User</Tag>);
        case UserRole.VIP:
            return (<Tag colorScheme={"yellow"}></Tag>);
    }
}