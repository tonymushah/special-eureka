import { useUserPageOutlet } from ".";
import UserFeed from "@mangadex/resources/componnents/user/userPage/UserFeed";

export default function UserPageFeed(){
    const outlet_context = useUserPageOutlet();
    return (
        <UserFeed user_id={outlet_context.user.get_id()}/>
    );
}