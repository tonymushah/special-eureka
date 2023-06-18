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
  GetStatisticsChaptersData,
  GetStatisticsChapterUuidData,
  GetStatisticsGroupsData,
  GetStatisticsGroupUuidData,
  GetStatisticsMangaData,
  GetStatisticsMangaUuidData,
} from "./data-contracts";

export namespace Statistics {
  /**
   * No description
   * @tags Statistics
   * @name GetStatisticsChapterUuid
   * @summary Get statistics about given chapter
   * @request GET:/statistics/chapter/{uuid}
   * @secure
   */
  export namespace GetStatisticsChapterUuid {
    export type RequestParams = {
      /** @format uuid */
      uuid: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetStatisticsChapterUuidData;
  }

  /**
   * No description
   * @tags Statistics
   * @name GetStatisticsChapters
   * @summary Get statistics about given chapters
   * @request GET:/statistics/chapter
   * @secure
   */
  export namespace GetStatisticsChapters {
    export type RequestParams = {};
    export type RequestQuery = {
      "chapter[]": string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetStatisticsChaptersData;
  }

  /**
   * No description
   * @tags Statistics
   * @name GetStatisticsGroupUuid
   * @summary Get statistics about given scanlation group
   * @request GET:/statistics/group/{uuid}
   * @secure
   */
  export namespace GetStatisticsGroupUuid {
    export type RequestParams = {
      /** @format uuid */
      uuid: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetStatisticsGroupUuidData;
  }

  /**
   * No description
   * @tags Statistics
   * @name GetStatisticsGroups
   * @summary Get statistics about given groups
   * @request GET:/statistics/group
   * @secure
   */
  export namespace GetStatisticsGroups {
    export type RequestParams = {};
    export type RequestQuery = {
      "group[]": string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetStatisticsGroupsData;
  }

  /**
   * No description
   * @tags Statistics
   * @name GetStatisticsMangaUuid
   * @summary Get statistics about given Manga
   * @request GET:/statistics/manga/{uuid}
   * @secure
   */
  export namespace GetStatisticsMangaUuid {
    export type RequestParams = {
      /** @format uuid */
      uuid: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetStatisticsMangaUuidData;
  }

  /**
   * No description
   * @tags Statistics
   * @name GetStatisticsManga
   * @summary Find statistics about given Manga
   * @request GET:/statistics/manga
   * @secure
   */
  export namespace GetStatisticsManga {
    export type RequestParams = {};
    export type RequestQuery = {
      "manga[]": string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetStatisticsMangaData;
  }
}
