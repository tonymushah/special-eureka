import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { sub_end } from "@mangadex/utils";
import { get, readable, type Writable } from "svelte/store";
import { v4 } from "uuid";

export const subscription = graphql(`
    subscription defaultThemeProfileKeySubscription($subID: UUID!) {
        watchThemeProfileDefaultName(subId: $subID)
    }
`);

export const mutation = graphql(`
    mutation updateDefaultThemeProfileKey($key: String) {
        userOption {
            setDefaultThemeProfile(name: $key)
        }
    }
`);

const readable_sub = readable<string | undefined>(undefined, (set) => {
    const subID = v4();
    const sub = client.subscription(subscription, {
        subID
    }).subscribe((v) => {
        const data = v.data?.watchThemeProfileDefaultName;
        set(data == null ? undefined : data);
    })
    return () => {
        sub.unsubscribe()
        sub_end(subID);
    }
})

const defaultThemeProfileKey: Writable<string | undefined> = {
    subscribe(run, invalidate) {
        return readable_sub.subscribe(run, invalidate)
    },
    set(value) {
        client.mutation(mutation, {
            key: value
        })
    },
    update(updater) {
        client.mutation(mutation, {
            key: updater(get(readable_sub))
        })
    },
}

export default defaultThemeProfileKey;
