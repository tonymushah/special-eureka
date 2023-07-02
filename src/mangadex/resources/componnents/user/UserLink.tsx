import { User, UserRole } from "@mangadex/api/structures/User";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { getMangaDexPath } from "@mangadex/index";
import * as CSS from "csstype";
import React from "react";

const MangaDexPath = getMangaDexPath();

export default function UserLink({user} : {
    user : User
}){
    const color : CSS.Property.Color = React.useMemo(() => {
        const roles = user.get_roles();
        if(roles.includes(UserRole.Admin)) {
            return "orange";
        }else if (roles.includes(UserRole.Banned)){
            return "red";
        }else if (roles.includes(UserRole.Contributor)){
            return "blue";
        }else if (roles.includes(UserRole.Designer)){
            return "green";
        }else if (roles.includes(UserRole.Developer)){
            return "teal";
        }else if (roles.includes(UserRole.Forum_Moderator)){
            return "gray";
        }else if (roles.includes(UserRole.Power_Uploader)){
            return "green";
        }
        return "base";
    }, [user]);
    return (
        <Link as={ReactRouterLink} color={color} to={MangaDexPath + `/user/${user.get_id()}`} noOfLines={1} size={"sm"}>{user.get_username()}</Link>
    );
}