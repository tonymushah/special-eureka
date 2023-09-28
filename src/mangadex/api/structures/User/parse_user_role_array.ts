import { UserRole } from "./UserRole";
import { parse_user_role } from "./parse_user_role";

export function parse_user_role_array(array: Array<string>) : UserRole[]{
    return array.map(parse_user_role);
}
