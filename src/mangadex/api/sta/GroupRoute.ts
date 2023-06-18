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
  CreateScanlationGroup,
  DeleteGroupIdData,
  DeleteGroupIdFollowData,
  GetGroupIdData,
  GetSearchGroupData,
  PostGroupData,
  PostGroupIdFollowData,
  PutGroupIdData,
  ReferenceExpansionScanlationGroup,
  ScanlationGroupEdit,
} from "./data-contracts";

export namespace Group {
  /**
   * No description
   * @tags ScanlationGroup
   * @name GetSearchGroup
   * @summary Scanlation Group list
   * @request GET:/group
   */
  export namespace GetSearchGroup {
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
      /** ScanlationGroup ids (limited to 100 per request) */
      "ids[]"?: string[];
      name?: string;
      focusedLanguage?: string;
      /** Reference expansion options for scanlation group entities or lists */
      "includes[]"?: ReferenceExpansionScanlationGroup;
      /** @default {"latestUploadedChapter":"desc"} */
      order?: {
        name?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        followedCount?: "asc" | "desc";
        relevance?: "asc" | "desc";
      };
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetSearchGroupData;
  }

  /**
   * No description
   * @tags ScanlationGroup
   * @name PostGroup
   * @summary Create Scanlation Group
   * @request POST:/group
   * @secure
   */
  export namespace PostGroup {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateScanlationGroup;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostGroupData;
  }

  /**
   * No description
   * @tags ScanlationGroup
   * @name GetGroupId
   * @summary Get Scanlation Group
   * @request GET:/group/{id}
   */
  export namespace GetGroupId {
    export type RequestParams = {
      /**
       * Scanlation Group ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {
      /** Reference expansion options for scanlation group entities or lists */
      "includes[]"?: ReferenceExpansionScanlationGroup;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetGroupIdData;
  }

  /**
   * No description
   * @tags ScanlationGroup
   * @name PutGroupId
   * @summary Update Scanlation Group
   * @request PUT:/group/{id}
   * @secure
   */
  export namespace PutGroupId {
    export type RequestParams = {
      /**
       * Scanlation Group ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ScanlationGroupEdit;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PutGroupIdData;
  }

  /**
   * No description
   * @tags ScanlationGroup
   * @name DeleteGroupId
   * @summary Delete Scanlation Group
   * @request DELETE:/group/{id}
   * @secure
   */
  export namespace DeleteGroupId {
    export type RequestParams = {
      /**
       * Scanlation Group ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteGroupIdData;
  }

  /**
   * No description
   * @tags ScanlationGroup
   * @name PostGroupIdFollow
   * @summary Follow Scanlation Group
   * @request POST:/group/{id}/follow
   * @secure
   */
  export namespace PostGroupIdFollow {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PostGroupIdFollowData;
  }

  /**
   * No description
   * @tags ScanlationGroup
   * @name DeleteGroupIdFollow
   * @summary Unfollow Scanlation Group
   * @request DELETE:/group/{id}/follow
   * @secure
   */
  export namespace DeleteGroupIdFollow {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteGroupIdFollowData;
  }
}
