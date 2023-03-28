import UserPageInfo_ from "@mangadex/resources/componnents/user/userPage/UserPageInfo";
import { useUserPageOutlet } from ".";

export default function UserPageInfo(){
    const outlet_context = useUserPageOutlet();
    return(
        <UserPageInfo_ {...outlet_context}/>
    );
}