import { Language } from "@mangadex/gql/graphql";

export const language_list = Object.entries(Language).map(([, l]) => l);
