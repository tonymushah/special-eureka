import { graphql } from "@mangadex/gql";
import { custom, type MangadexTheme as IMangadexTheme } from "../";
import { derived, get, readable, writable, type Writable } from "svelte/store";
import { v4 } from "uuid";
import { client } from "@mangadex/gql/urql";
import { GqlThemeToITheme, IThemeToGqlThemeInput } from "../convert";
import { sub_end } from "@mangadex/utils";
import { subscriptionStore } from "@urql/svelte";

export const subscription = graphql(`
    subscription themeProfilesSubscription($subID: UUID!) {
        watchThemesProfile(subId: $subID) {
            name
            value {
                textColor
                mainBackground
                accents {
                    default {
                        default
                        hover
                        active
                    }
                    l1 {
                        default
                        hover
                        active
                    }
                    l2 {
                        default
                        hover
                        active
                    }
                    l3 {
                        default
                        hover
                        active
                    }
                    l4 {
                        default
                        hover
                        active
                    }
                    l5 {
                        default
                        hover
                        active
                    }
                }
                midTone
                contrast {
                    l1
                }
                scrollbar {
                    default
                    hovered
                }
                button {
                    default
                    alternate
                }
                primary {
                    primary
                    primary1
                    primary2
                }
                status {
                    red
                    grey
                    green
                    yellow
                    blue
                    grey
                    purple
                }
                indication {
                    blue
                }
                danger {
                    default
                    l1
                    l2
                }
            }
        }
    }
`);

export const mutation = graphql(`
    mutation updateThemeProfiles($themes: [ThemeProfileEntryInput!]!) {
        userOption {
            setThemeProfiles(entries: $themes)
        }
    }
`);

export const singleUpdateMutation = graphql(`
    mutation updateThemeProfile($name: String!, $theme: MangaDexThemeInput) {
        userOption {
            setThemeProfile(name: $name, theme: $theme) {
            textColor
            mainBackground
            accents {
                    default {
                        default
                        hover
                        active
                    }
                    l1 {
                        default
                        hover
                        active
                    }
                    l2 {
                        default
                        hover
                        active
                    }
                    l3 {
                        default
                        hover
                        active
                    }
                    l4 {
                        default
                        hover
                        active
                    }
                    l5 {
                        default
                        hover
                        active
                    }
                }
                midTone
                contrast {
                    l1
                }
                scrollbar {
                    default
                    hovered
                }
                button {
                    default
                    alternate
                }
                primary {
                    primary
                    primary1
                    primary2
                }
                status {
                    red
                    grey
                    green
                    yellow
                    blue
                    grey
                    purple
                }
                indication {
                    blue
                }
                danger {
                    default
                    l1
                    l2
                }
            }
        }
    }
`);

const sub_read = readable(new Map<string, IMangadexTheme>(), (set) => {
    const subID = v4();
    const sub = client.subscription(subscription, {
        subID
    }).subscribe((res) => {
        const data = res.data;
        console.log("new theme getted")
        if (data) {
            set(new Map(data.watchThemesProfile.sort((a, b) => {
                return a.name.localeCompare(b.name)
            }).map((entry) => ([entry.name, GqlThemeToITheme(entry.value)]))))
        }
    })
    return () => {
        sub.unsubscribe()
        sub_end(subID);
    }
})

const themes: Writable<Map<string, IMangadexTheme>> = {
    subscribe: sub_read.subscribe,
    set(value) {
        client.mutation(mutation, {
            themes: Array.from(value.entries()).map(([name, value]) => ({
                value: IThemeToGqlThemeInput(value),
                name
            }))
        }).toPromise().then(console.debug).catch(console.error)
    },
    update(updater) {
        client.mutation(mutation, {
            themes: Array.from(updater(get(sub_read)).entries()).map(([name, value]) => ({
                value: IThemeToGqlThemeInput(value),
                name
            }))
        }).toPromise().then(console.debug).catch(console.error)
    },
}

export default themes;

export function theme(name: string): Writable<IMangadexTheme | undefined> {
    const sub_read_derived = derived(sub_read, ($sub) => $sub.get(name))
    return {
        subscribe: sub_read_derived.subscribe,
        set(value) {
            client.mutation(singleUpdateMutation, {
                name,
                theme: value ? IThemeToGqlThemeInput(value) : undefined
            }).toPromise().then(console.debug).catch(console.error)
        },
        update(updater) {
            const value = updater(get(sub_read_derived));
            client.mutation(singleUpdateMutation, {
                name,
                theme: value ? IThemeToGqlThemeInput(value) : undefined
            }).toPromise().then(console.debug).catch(console.error)
        },
    }
}