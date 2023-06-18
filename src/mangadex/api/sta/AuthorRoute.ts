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
  AuthorCreate,
  AuthorEdit,
  DeleteAuthorIdData,
  GetAuthorData,
  GetAuthorIdData,
  PostAuthorData,
  PutAuthorIdData,
  ReferenceExpansionAuthor,
} from "./data-contracts";

export namespace Author {
  /**
   * No description
   * @tags Author
   * @name GetAuthor
   * @summary Author list
   * @request GET:/author
   */
  export namespace GetAuthor {
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
      /** Author ids (limited to 100 per request) */
      "ids[]"?: string[];
      name?: string;
      order?: {
        name?: "asc" | "desc";
      };
      /** Reference expansion options for author/artist entities or lists */
      "includes[]"?: ReferenceExpansionAuthor;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAuthorData;
  }

  /**
   * No description
   * @tags Author
   * @name PostAuthor
   * @summary Create Author
   * @request POST:/author
   * @secure
   */
  export namespace PostAuthor {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = AuthorCreate;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostAuthorData;
  }

  /**
   * No description
   * @tags Author
   * @name GetAuthorId
   * @summary Get Author
   * @request GET:/author/{id}
   */
  export namespace GetAuthorId {
    export type RequestParams = {
      /**
       * Author ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {
      /** Reference expansion options for author/artist entities or lists */
      "includes[]"?: ReferenceExpansionAuthor;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAuthorIdData;
  }

  /**
   * No description
   * @tags Author
   * @name PutAuthorId
   * @summary Update Author
   * @request PUT:/author/{id}
   * @secure
   */
  export namespace PutAuthorId {
    export type RequestParams = {
      /**
       * Author ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = AuthorEdit;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PutAuthorIdData;
  }

  /**
   * No description
   * @tags Author
   * @name DeleteAuthorId
   * @summary Delete Author
   * @request DELETE:/author/{id}
   * @secure
   */
  export namespace DeleteAuthorId {
    export type RequestParams = {
      /**
       * Author ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteAuthorIdData;
  }
}
