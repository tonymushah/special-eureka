/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\t\t\t\t\tquery userMeOnSidebarFooter {\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tme {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t": types.UserMeOnSidebarFooterDocument,
    "\n\t\t\tsubscription serverIconState($sub_id: UUID!) {\n\t\t\t\twatchIsAppMounted(subId: $sub_id)\n\t\t\t}\n\t\t": types.ServerIconStateDocument,
    "\n    subscription rtlSidebarSub($sub_id: UUID!) {\n        watchSidebarDirection(subId: $sub_id)\n    }\n": types.RtlSidebarSubDocument,
    "\n    subscription userMe($sub_id: UUID!) {\n        watchUserMe(subId: $sub_id) {\n            username\n            roles\n        }\n    }\n": types.UserMeDocument,
    "\n    subscription isLogged($sub_id: UUID!) {\n        watchIsLogged(subId: $sub_id)\n    }  \n": types.IsLoggedDocument,
    "\n\t\t\t\tmutation mountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": types.MountAppStateDocument,
    "\n\t\t\t\tmutation unmountAppState {\n\t\t\t\t    offlineAppState {\n\t\t\t\t\t    unmountOfflineAppState\n\t\t\t\t    }\n\t\t\t    }\n\t\t\t": types.UnmountAppStateDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\t\tquery userMeOnSidebarFooter {\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tme {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t"): (typeof documents)["\n\t\t\t\t\tquery userMeOnSidebarFooter {\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tme {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\tsubscription serverIconState($sub_id: UUID!) {\n\t\t\t\twatchIsAppMounted(subId: $sub_id)\n\t\t\t}\n\t\t"): (typeof documents)["\n\t\t\tsubscription serverIconState($sub_id: UUID!) {\n\t\t\t\twatchIsAppMounted(subId: $sub_id)\n\t\t\t}\n\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription rtlSidebarSub($sub_id: UUID!) {\n        watchSidebarDirection(subId: $sub_id)\n    }\n"): (typeof documents)["\n    subscription rtlSidebarSub($sub_id: UUID!) {\n        watchSidebarDirection(subId: $sub_id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription userMe($sub_id: UUID!) {\n        watchUserMe(subId: $sub_id) {\n            username\n            roles\n        }\n    }\n"): (typeof documents)["\n    subscription userMe($sub_id: UUID!) {\n        watchUserMe(subId: $sub_id) {\n            username\n            roles\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    subscription isLogged($sub_id: UUID!) {\n        watchIsLogged(subId: $sub_id)\n    }  \n"): (typeof documents)["\n    subscription isLogged($sub_id: UUID!) {\n        watchIsLogged(subId: $sub_id)\n    }  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\tmutation mountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"): (typeof documents)["\n\t\t\t\tmutation mountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\t\t\t\tmutation unmountAppState {\n\t\t\t\t    offlineAppState {\n\t\t\t\t\t    unmountOfflineAppState\n\t\t\t\t    }\n\t\t\t    }\n\t\t\t"): (typeof documents)["\n\t\t\t\tmutation unmountAppState {\n\t\t\t\t    offlineAppState {\n\t\t\t\t\t    unmountOfflineAppState\n\t\t\t\t    }\n\t\t\t    }\n\t\t\t"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;