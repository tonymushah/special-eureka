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
  CoverEdit,
  DeleteCoverData,
  EditCoverData,
  GetCoverData,
  GetCoverIdData,
  ReferenceExpansionCoverArt,
  UploadCoverData,
  UploadCoverPayload,
} from "./data-contracts";

export namespace Cover {
  /**
   * No description
   * @tags Cover
   * @name GetCover
   * @summary CoverArt list
   * @request GET:/cover
   */
  export namespace GetCover {
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
      /** Manga ids (limited to 100 per request) */
      "manga[]"?: string[];
      /** Covers ids (limited to 100 per request) */
      "ids[]"?: string[];
      /** User ids (limited to 100 per request) */
      "uploaders[]"?: string[];
      /** Locales of cover art (limited to 100 per request) */
      "locales[]"?: string[];
      order?: {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        volume?: "asc" | "desc";
      };
      /** Reference expansion options for cover art entities or lists */
      "includes[]"?: ReferenceExpansionCoverArt;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCoverData;
  }

  /**
   * No description
   * @tags Cover
   * @name UploadCover
   * @summary Upload Cover
   * @request POST:/cover/{mangaOrCoverId}
   * @secure
   */
  export namespace UploadCover {
    export type RequestParams = {
      /**
       * Is Manga UUID on POST
       * @format uuid
       */
      mangaOrCoverId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UploadCoverPayload;
    export type RequestHeaders = {
      /** @default "multipart/form-data" */
      "Content-Type": string;
    };
    export type ResponseBody = UploadCoverData;
  }

  /**
   * No description
   * @tags Cover
   * @name GetCoverId
   * @summary Get Cover
   * @request GET:/cover/{mangaOrCoverId}
   */
  export namespace GetCoverId {
    export type RequestParams = {
      /**
       * Is Manga UUID on POST
       * @format uuid
       */
      mangaOrCoverId: string;
    };
    export type RequestQuery = {
      /** Reference expansion options for cover art entities or lists */
      "includes[]"?: ReferenceExpansionCoverArt;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCoverIdData;
  }

  /**
   * No description
   * @tags Cover
   * @name EditCover
   * @summary Edit Cover
   * @request PUT:/cover/{mangaOrCoverId}
   * @secure
   */
  export namespace EditCover {
    export type RequestParams = {
      /**
       * Is Manga UUID on POST
       * @format uuid
       */
      mangaOrCoverId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CoverEdit;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = EditCoverData;
  }

  /**
   * No description
   * @tags Cover
   * @name DeleteCover
   * @summary Delete Cover
   * @request DELETE:/cover/{mangaOrCoverId}
   * @secure
   */
  export namespace DeleteCover {
    export type RequestParams = {
      /**
       * Is Manga UUID on POST
       * @format uuid
       */
      mangaOrCoverId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteCoverData;
  }
}
