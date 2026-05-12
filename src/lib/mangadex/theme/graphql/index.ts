import type { ResultOf } from "@graphql-typed-document-node/core";
import { graphql } from "@mangadex/gql";

export const MangaDexThemeFrag = graphql(`
	fragment MangaDexThemeFrag on MangaDexTheme {
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
`);

export type MangaDexTheme = ResultOf<typeof MangaDexThemeFrag>;