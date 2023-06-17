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
  CustomListCreate,
  CustomListEdit,
  DeleteListIdData,
  FollowListIdData,
  FollowListIdPayload,
  GetListIdData,
  GetListIdFeedData,
  PostListData,
  PutListIdData,
  ReferenceExpansionChapter,
  UnfollowListIdData,
  UnfollowListIdPayload,
} from "./data-contracts";

export namespace List {
  /**
   * No description
   * @tags CustomList
   * @name PostList
   * @summary Create CustomList
   * @request POST:/list
   * @secure
   */
  export namespace PostList {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CustomListCreate;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostListData;
  }

  /**
   * No description
   * @tags CustomList
   * @name GetListId
   * @summary Get CustomList
   * @request GET:/list/{id}
   */
  export namespace GetListId {
    export type RequestParams = {
      /**
       * CustomList ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetListIdData;
  }

  /**
   * @description The size of the body is limited to 8KB.
   * @tags CustomList
   * @name PutListId
   * @summary Update CustomList
   * @request PUT:/list/{id}
   * @secure
   */
  export namespace PutListId {
    export type RequestParams = {
      /**
       * CustomList ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CustomListEdit;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PutListIdData;
  }

  /**
   * No description
   * @tags CustomList
   * @name DeleteListId
   * @summary Delete CustomList
   * @request DELETE:/list/{id}
   * @secure
   */
  export namespace DeleteListId {
    export type RequestParams = {
      /**
       * CustomList ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteListIdData;
  }

  /**
   * @description The request body is empty
   * @tags CustomList
   * @name FollowListId
   * @summary Follow CustomList
   * @request POST:/list/{id}/follow
   * @secure
   */
  export namespace FollowListId {
    export type RequestParams = {
      /**
       * CustomList ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = FollowListIdPayload;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = FollowListIdData;
  }

  /**
   * @description The request body is empty
   * @tags CustomList
   * @name UnfollowListId
   * @summary Unfollow CustomList
   * @request DELETE:/list/{id}/follow
   * @secure
   */
  export namespace UnfollowListId {
    export type RequestParams = {
      /**
       * CustomList ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UnfollowListIdPayload;
    export type RequestHeaders = {};
    export type ResponseBody = UnfollowListIdData;
  }

  /**
   * No description
   * @tags Feed
   * @name GetListIdFeed
   * @summary CustomList Manga feed
   * @request GET:/list/{id}/feed
   */
  export namespace GetListIdFeed {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
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
    export type ResponseBody = GetListIdFeedData;
  }
}
