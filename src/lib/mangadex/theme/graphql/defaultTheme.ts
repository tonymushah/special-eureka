import { graphql } from "@mangadex/gql";
import { get, readable, type Updater, type Writable } from "svelte/store";
import { custom, type MangadexTheme } from "..";
import { client } from "@mangadex/gql/urql";
import { v4 } from "uuid";
import { GqlThemeToITheme, IThemeToGqlThemeInput } from "../convert";
import { sub_end } from "@mangadex/utils";
import { debounce } from "lodash";

export const subscription = graphql(`
    subscription defaultThemeProfileSubscription($subID: UUID!) {
        watchThemeProfileDefault(subId: $subID) {
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
`);

export const mutation = graphql(`
    mutation updateDefaultTheme($theme: MangaDexThemeInput!) {
        userOption {
            updateDefaultTheme(theme: $theme) {
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

const readSub = readable<MangadexTheme>(custom, (set) => {
    const subID = v4();
    const unsub = client.subscription(subscription, {
        subID
    }).subscribe((res) => {
        const data = res.data;
        if (data) {
            set(GqlThemeToITheme(data.watchThemeProfileDefault))
        }
    });
    return () => {
        unsub.unsubscribe(),
            sub_end(subID)
    }
})

const debounce_defaultTheme_set = debounce((value: MangadexTheme) => {
    if (value != custom) {
        console.log("theme update")
        client.mutation(mutation, {
            theme: IThemeToGqlThemeInput(value)
        }).toPromise().then(console.debug).catch(console.error)
    }
}, 150)

const debounce_defaultTheme_update = debounce((updater: Updater<MangadexTheme>) => {
    const value = updater(get(readSub));
    if (value != custom) {
        client.mutation(mutation, {
            theme: IThemeToGqlThemeInput(value)
        }).toPromise().then(console.debug).catch(console.error)
    }
}, 150)

const defaultTheme: Writable<MangadexTheme> = {
    subscribe(run, invalidate) {
        return readSub.subscribe(run, invalidate)
    },
    set(value) {
        debounce_defaultTheme_set(value)
    },
    update(updater) {
        debounce_defaultTheme_update(updater)
    },
}

export default defaultTheme;