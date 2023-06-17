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
  ChapterEdit,
  DeleteChapterIdData,
  GetChapterData,
  GetChapterIdData,
  PutChapterIdData,
  ReferenceExpansionChapter,
} from "./data-contracts";

export namespace Chapter {
  /**
   * @description Chapter list. If you want the Chapters of a given Manga, please check the feed endpoints.
   * @tags Chapter
   * @name GetChapter
   * @summary Chapter list
   * @request GET:/chapter
   */
  export namespace GetChapter {
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
      /** Chapter ids (limited to 100 per request) */
      "ids[]"?: string[];
      title?: string;
      "groups[]"?: string[];
      uploader?: string | string[];
      /** @format uuid */
      manga?: string;
      "volume[]"?: string | string[];
      chapter?: string | string[];
      "translatedLanguage[]"?: string[];
      "originalLanguage[]"?: string[];
      "excludedOriginalLanguage[]"?: string[];
      /** @default ["safe","suggestive","erotica"] */
      "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
      "excludedGroups[]"?: string[];
      "excludedUploaders[]"?: string[];
      /** @default "1" */
      includeFutureUpdates?: "0" | "1";
      includeEmptyPages?: 0 | 1;
      includeFuturePublishAt?: 0 | 1;
      includeExternalUrl?: 0 | 1;
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
      includes?: ("manga" | "scanlation_group" | "user")[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetChapterData;
  }

  /**
   * No description
   * @tags Chapter
   * @name GetChapterId
   * @summary Get Chapter
   * @request GET:/chapter/{id}
   */
  export namespace GetChapterId {
    export type RequestParams = {
      /**
       * Chapter ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {
      /** Reference expansion options for chapter entities or lists */
      "includes[]"?: ReferenceExpansionChapter;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetChapterIdData;
  }

  /**
   * No description
   * @tags Chapter
   * @name PutChapterId
   * @summary Update Chapter
   * @request PUT:/chapter/{id}
   * @secure
   */
  export namespace PutChapterId {
    export type RequestParams = {
      /**
       * Chapter ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ChapterEdit;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PutChapterIdData;
  }

  /**
   * No description
   * @tags Chapter
   * @name DeleteChapterId
   * @summary Delete Chapter
   * @request DELETE:/chapter/{id}
   * @secure
   */
  export namespace DeleteChapterId {
    export type RequestParams = {
      /**
       * Chapter ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteChapterIdData;
  }
}
