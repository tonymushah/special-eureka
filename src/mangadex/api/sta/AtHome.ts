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

import { ErrorResponse, GetAtHomeServerChapterIdData, GetAtHomeServerChapterIdParams } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class AtHome<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags AtHome
   * @name GetAtHomeServerChapterId
   * @summary Get MangaDex@Home server URL
   * @request GET:/at-home/server/{chapterId}
   */
  getAtHomeServerChapterId = ({ chapterId, ...query }: GetAtHomeServerChapterIdParams, params: RequestParams = {}) =>
    this.http.request<GetAtHomeServerChapterIdData, ErrorResponse>({
      path: `/at-home/server/${chapterId}`,
      method: "GET",
      query: query,
      ...params,
    });
}
