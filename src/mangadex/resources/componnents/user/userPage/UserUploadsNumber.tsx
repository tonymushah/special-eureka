import { getUserFeedQuery } from "@mangadex/resources/hooks/UserPageHooks/getUserFeedQuery";
import React from "react";

export default function UserUploadsNumber(props: {
    user_id: string
}) {
    const { query } = getUserFeedQuery(props);
    if (query.isSuccess) {
        return (
            <React.Fragment>
                {
                    query.data.get_total()
                }
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                Loading...
            </React.Fragment>
        );
    }
}
