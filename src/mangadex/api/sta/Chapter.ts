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
  ErrorResponse,
  GetChapterData,
  GetChapterIdData,
  GetChapterIdParams,
  GetChapterParams,
  PutChapterIdData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Chapter<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Chapter list. If you want the Chapters of a given Manga, please check the feed endpoints.
   *
   * @tags Chapter
   * @name GetChapter
   * @summary Chapter list
   * @request GET:/chapter
   */
  getChapter = (query: GetChapterParams, params: RequestParams = {}) =>
    this.http.request<GetChapterData, ErrorResponse>({
      path: `/chapter`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Chapter
   * @name GetChapterId
   * @summary Get Chapter
   * @request GET:/chapter/{id}
   */
  getChapterId = ({ id, ...query }: GetChapterIdParams, params: RequestParams = {}) =>
    this.http.request<GetChapterIdData, ErrorResponse>({
      path: `/chapter/${id}`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Chapter
   * @name PutChapterId
   * @summary Update Chapter
   * @request PUT:/chapter/{id}
   * @secure
   */
  putChapterId = (id: string, data: ChapterEdit, params: RequestParams = {}) =>
    this.http.request<PutChapterIdData, ErrorResponse>({
      path: `/chapter/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Chapter
   * @name DeleteChapterId
   * @summary Delete Chapter
   * @request DELETE:/chapter/{id}
   * @secure
   */
  deleteChapterId = (id: string, params: RequestParams = {}) =>
    this.http.request<DeleteChapterIdData, ErrorResponse>({
      path: `/chapter/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
