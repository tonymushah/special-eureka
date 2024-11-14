import { isLoggedSubDoc, userMeSubDoc } from "@mangadex/gql-docs/userMe";
import type { UserRole } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { readable } from "svelte/store";
import { v4 } from "uuid";
import { sub_end } from ".";

export type UserMeSubData = {
    name: string,
    roles: UserRole[]
};

export const userMe = readable<UserMeSubData | undefined>(undefined, (set) => {
    const subId = v4();
    const sub = client.subscription(userMeSubDoc, {
        sub_id: subId
    }).subscribe((res) => {
        if (res.data?.watchUserMe) {
            const watchUserMe = res.data.watchUserMe;
            set({
                name: watchUserMe.username,
                roles: watchUserMe.roles
            })
        } else {
            set(undefined)
        }
    });
    return () => {
        sub.unsubscribe();
        sub_end(subId);
    }
});

export const isLogged = readable<boolean>(false, (set) => {
    const subId = v4();
    const sub = client.subscription(isLoggedSubDoc, {
        sub_id: subId
    }).subscribe((res) => {
        if (res.data?.watchIsLogged) {
            set(res.data.watchIsLogged);
        } else {
            set(false);
        }
    });
    return () => {
        sub.unsubscribe();
        sub_end(subId);
    }
});
