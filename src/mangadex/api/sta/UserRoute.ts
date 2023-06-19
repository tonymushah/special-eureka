/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  DeleteUserIdData,
  GetReadingHistoryData,
  GetUserData,
  GetUserFollowsGroupData,
  GetUserFollowsGroupIdData,
  GetUserFollowsListData,
  GetUserFollowsListIdData,
  GetUserFollowsMangaData,
  GetUserFollowsMangaFeedData,
  GetUserFollowsMangaIdData,
  GetUserFollowsUserData,
  GetUserFollowsUserIdData,
  GetUserIdData,
  GetUserIdListData,
  GetUserListData,
  GetUserMeData,
  PostUserDeleteCodeData,
  PostUserEmailData,
  PostUserEmailPayload,
  PostUserPasswordData,
  PostUserPasswordPayload,
  ReferenceExpansionChapter,
  ReferenceExpansionManga,
  ReferenceExpansionScanlationGroup,
} from "./data-contracts";

export namespace User {
  /**
   * @description This will list public and private CustomList
   * @tags CustomList
   * @name GetUserList
   * @summary Get logged User CustomList list
   * @request GET:/user/list
   * @secure
   */
  export namespace GetUserList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 0
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserListData;
  }

  /**
   * @description This will list only public CustomList
   * @tags CustomList
   * @name GetUserIdList
   * @summary Get User's CustomList list
   * @request GET:/user/{id}/list
   */
  export namespace GetUserIdList {
    export type RequestParams = {
      /**
       * User ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {
      /**
       * @min 0
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserIdListData;
  }

  /**
   * No description
   * @tags User
   * @name GetUser
   * @summary User list
   * @request GET:/user
   * @secure
   */
  export namespace GetUser {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 0
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
      /** User ids (limited to 100 per request) */
      "ids[]"?: string[];
      username?: string;
      order?: {
        username?: "asc" | "desc";
      };
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserData;
  }

  /**
   * No description
   * @tags User
   * @name GetUserId
   * @summary Get User
   * @request GET:/user/{id}
   */
  export namespace GetUserId {
    export type RequestParams = {
      /**
       * User ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserIdData;
  }

  /**
   * No description
   * @tags User
   * @name DeleteUserId
   * @summary Delete User
   * @request DELETE:/user/{id}
   * @deprecated
   * @secure
   */
  export namespace DeleteUserId {
    export type RequestParams = {
      /**
       * User ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteUserIdData;
  }

  /**
   * No description
   * @tags User
   * @name PostUserDeleteCode
   * @summary Approve User deletion
   * @request POST:/user/delete/{code}
   * @deprecated
   */
  export namespace PostUserDeleteCode {
    export type RequestParams = {
      /**
       * User delete code
       * @format uuid
       */
      code: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PostUserDeleteCodeData;
  }

  /**
   * No description
   * @tags User
   * @name PostUserPassword
   * @summary Update User password
   * @request POST:/user/password
   * @deprecated
   * @secure
   */
  export namespace PostUserPassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PostUserPasswordPayload;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostUserPasswordData;
  }

  /**
   * No description
   * @tags User
   * @name PostUserEmail
   * @summary Update User email
   * @request POST:/user/email
   * @deprecated
   * @secure
   */
  export namespace PostUserEmail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PostUserEmailPayload;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostUserEmailData;
  }

  /**
   * No description
   * @tags Feed
   * @name GetUserFollowsMangaFeed
   * @summary Get logged User followed Manga feed (Chapter list)
   * @request GET:/user/follows/manga/feed
   * @secure
   */
  export namespace GetUserFollowsMangaFeed {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 500
       * @default 100
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
      "translatedLanguage[]"?: string[];
      "originalLanguage[]"?: string[];
      "excludedOriginalLanguage[]"?: string[];
      /** @default ["safe","suggestive","erotica"] */
      "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
      "excludedGroups[]"?: string[];
      "excludedUploaders[]"?: string[];
      /** @default "1" */
      includeFutureUpdates?: "0" | "1";
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
       */
      createdAtSince?: string;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
       */
      updatedAtSince?: string;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
       */
      publishAtSince?: string;
      order?: {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
      };
      /** Reference expansion options for chapter entities or lists */
      "includes[]"?: ReferenceExpansionChapter;
      includeEmptyPages?: 0 | 1;
      includeFuturePublishAt?: 0 | 1;
      includeExternalUrl?: 0 | 1;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserFollowsMangaFeedData;
  }

  /**
   * No description
   * @tags User
   * @name GetUserMe
   * @summary Logged User details
   * @request GET:/user/me
   * @secure
   */
  export namespace GetUserMe {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserMeData;
  }

  /**
   * No description
   * @tags Follows
   * @name GetUserFollowsGroup
   * @summary Get logged User followed Groups
   * @request GET:/user/follows/group
   * @secure
   */
  export namespace GetUserFollowsGroup {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
      /** Reference expansion options for scanlation group entities or lists */
      "includes[]"?: ReferenceExpansionScanlationGroup;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserFollowsGroupData;
  }

  /**
   * No description
   * @tags Follows
   * @name GetUserFollowsGroupId
   * @summary Check if logged User follows a Group
   * @request GET:/user/follows/group/{id}
   * @secure
   */
  export namespace GetUserFollowsGroupId {
    export type RequestParams = {
      /**
       * Scanlation Group id
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserFollowsGroupIdData;
  }

  /**
   * No description
   * @tags Follows
   * @name GetUserFollowsUser
   * @summary Get logged User followed User list
   * @request GET:/user/follows/user
   * @secure
   */
  export namespace GetUserFollowsUser {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserFollowsUserData;
  }

  /**
   * No description
   * @tags Follows
   * @name GetUserFollowsUserId
   * @summary Check if logged User follows a User
   * @request GET:/user/follows/user/{id}
   * @secure
   */
  export namespace GetUserFollowsUserId {
    export type RequestParams = {
      /**
       * User id
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserFollowsUserIdData;
  }

  /**
   * No description
   * @tags Follows
   * @name GetUserFollowsManga
   * @summary Get logged User followed Manga list
   * @request GET:/user/follows/manga
   * @secure
   */
  export namespace GetUserFollowsManga {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
      /** Reference expansion options for manga entities or lists */
      "includes[]"?: ReferenceExpansionManga;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserFollowsMangaData;
  }

  /**
   * No description
   * @tags Follows
   * @name GetUserFollowsMangaId
   * @summary Check if logged User follows a Manga
   * @request GET:/user/follows/manga/{id}
   * @secure
   */
  export namespace GetUserFollowsMangaId {
    export type RequestParams = {
      /**
       * Manga id
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserFollowsMangaIdData;
  }

  /**
   * No description
   * @tags Follows
   * @name GetUserFollowsList
   * @summary Get logged User followed CustomList list
   * @request GET:/user/follows/list
   * @secure
   */
  export namespace GetUserFollowsList {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserFollowsListData;
  }

  /**
   * No description
   * @tags Follows
   * @name GetUserFollowsListId
   * @summary Check if logged User follows a CustomList
   * @request GET:/user/follows/list/{id}
   * @secure
   */
  export namespace GetUserFollowsListId {
    export type RequestParams = {
      /**
       * CustomList id
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserFollowsListIdData;
  }

  /**
   * No description
   * @tags ReadMarker
   * @name GetReadingHistory
   * @summary Get users reading history
   * @request GET:/user/history
   * @secure
   */
  export namespace GetReadingHistory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetReadingHistoryData;
  }
}
