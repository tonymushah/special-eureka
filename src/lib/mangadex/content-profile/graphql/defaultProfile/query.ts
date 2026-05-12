import { graphql } from "@mangadex/gql";

export const subscription = graphql(`
	subscription watchDefaultContentProfile {
		watchContentProfileDefault {
			...ContentProfileItem
		}
	}
`);

export const mutation = graphql(`
	mutation updateDefaultContentProfile($entry: ContentProfileInput!) {
		userOption {
			updateDefaultContentProfile(profile: $entry) {
				...ContentProfileItem
			}
		}
	}
`);

export const query = graphql(`
	query getDefaultContentProfile {
		userOption {
			getDefaultContentProfile {
				...ContentProfileItem
			}
		}
	}
`);