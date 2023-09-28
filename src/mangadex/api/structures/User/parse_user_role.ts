import { UserRole } from "./UserRole";

export function parse_user_role(str: string): UserRole {
    switch (str) {
        case UserRole.Admin:
            return UserRole.Admin;
        case UserRole.Banned:
            return UserRole.Banned;
        case UserRole.Contributor:
            return UserRole.Contributor;
        case UserRole.Designer:
            return UserRole.Designer;
        case UserRole.Developer:
            return UserRole.Developer;
        case UserRole.Forum_Moderator:
            return UserRole.Forum_Moderator;
        case UserRole.Global_Moderator:
            return UserRole.Global_Moderator;
        case UserRole.Group_Leader:
            return UserRole.Group_Leader;
        case UserRole.Group_Member:
            return UserRole.Group_Member;
        case UserRole.Guest:
            return UserRole.Guest;
        case UserRole.Md_At_Home:
            return UserRole.Md_At_Home;
        case UserRole.Member:
            return UserRole.Member;
        case UserRole.Power_Uploader:
            return UserRole.Power_Uploader;
        case UserRole.Public_Relations:
            return UserRole.Public_Relations;
        case UserRole.Staff:
            return UserRole.Staff;
        case UserRole.Unverified:
            return UserRole.Unverified;
        case UserRole.User:
            return UserRole.User;
        case UserRole.VIP:
            return UserRole.VIP;
        default:
            return UserRole.Unknown;
    }
}
