import { isLoggedSubDoc, userMeSubDoc } from "@mangadex/gql-docs/userMe";
import type { UserRole } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { readable } from "svelte/store";

export type UserMeSubData = {
	name: string;
	roles: UserRole[];
};

export const userMe = readable<UserMeSubData | undefined>(undefined, (set) => {
	const sub = client.subscription(userMeSubDoc, {}).subscribe((res) => {
		if (res.data?.watchUserMe) {
			const watchUserMe = res.data.watchUserMe;
			set({
				name: watchUserMe.username,
				roles: watchUserMe.roles
			});
		} else {
			set(undefined);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});

export const isLogged = readable<boolean>(false, (set) => {
	const sub = client.subscription(isLoggedSubDoc, {}).subscribe((res) => {
		if (res.data?.watchIsLogged) {
			set(res.data.watchIsLogged);
		} else {
			set(false);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});
