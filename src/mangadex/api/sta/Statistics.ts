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
  GetStatisticsChaptersParams,
  GetStatisticsChapterUuidData,
  GetStatisticsGroupsData,
  GetStatisticsGroupsParams,
  GetStatisticsGroupUuidData,
  GetStatisticsMangaData,
  GetStatisticsMangaParams,
  GetStatisticsMangaUuidData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Statistics<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Statistics
   * @name GetStatisticsChapterUuid
   * @summary Get statistics about given chapter
   * @request GET:/statistics/chapter/{uuid}
   * @secure
   */
  getStatisticsChapterUuid = (uuid: string, params: RequestParams = {}) =>
    this.http.request<GetStatisticsChapterUuidData, any>({
      path: `/statistics/chapter/${uuid}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Statistics
   * @name GetStatisticsChapters
   * @summary Get statistics about given chapters
   * @request GET:/statistics/chapter
   * @secure
   */
  getStatisticsChapters = (query: GetStatisticsChaptersParams, params: RequestParams = {}) =>
    this.http.request<GetStatisticsChaptersData, any>({
      path: `/statistics/chapter`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Statistics
   * @name GetStatisticsGroupUuid
   * @summary Get statistics about given scanlation group
   * @request GET:/statistics/group/{uuid}
   * @secure
   */
  getStatisticsGroupUuid = (uuid: string, params: RequestParams = {}) =>
    this.http.request<GetStatisticsGroupUuidData, any>({
      path: `/statistics/group/${uuid}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Statistics
   * @name GetStatisticsGroups
   * @summary Get statistics about given groups
   * @request GET:/statistics/group
   * @secure
   */
  getStatisticsGroups = (query: GetStatisticsGroupsParams, params: RequestParams = {}) =>
    this.http.request<GetStatisticsGroupsData, any>({
      path: `/statistics/group`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Statistics
   * @name GetStatisticsMangaUuid
   * @summary Get statistics about given Manga
   * @request GET:/statistics/manga/{uuid}
   * @secure
   */
  getStatisticsMangaUuid = (uuid: string, params: RequestParams = {}) =>
    this.http.request<GetStatisticsMangaUuidData, any>({
      path: `/statistics/manga/${uuid}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Statistics
   * @name GetStatisticsManga
   * @summary Find statistics about given Manga
   * @request GET:/statistics/manga
   * @secure
   */
  getStatisticsManga = (query: GetStatisticsMangaParams, params: RequestParams = {}) =>
    this.http.request<GetStatisticsMangaData, any>({
      path: `/statistics/manga`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
