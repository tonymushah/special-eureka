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
  ErrorResponse,
  GetCoverData,
  GetCoverIdData,
  GetCoverIdParams,
  GetCoverParams,
  UploadCoverData,
  UploadCoverPayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Cover<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Cover
   * @name GetCover
   * @summary CoverArt list
   * @request GET:/cover
   */
  getCover = (query: GetCoverParams, params: RequestParams = {}) =>
    this.http.request<GetCoverData, ErrorResponse>({
      path: `/cover`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Cover
   * @name UploadCover
   * @summary Upload Cover
   * @request POST:/cover/{mangaOrCoverId}
   * @secure
   */
  uploadCover = (mangaOrCoverId: string, data: UploadCoverPayload, params: RequestParams = {}) =>
    this.http.request<UploadCoverData, ErrorResponse>({
      path: `/cover/${mangaOrCoverId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Cover
   * @name GetCoverId
   * @summary Get Cover
   * @request GET:/cover/{mangaOrCoverId}
   */
  getCoverId = ({ mangaOrCoverId, ...query }: GetCoverIdParams, params: RequestParams = {}) =>
    this.http.request<GetCoverIdData, ErrorResponse>({
      path: `/cover/${mangaOrCoverId}`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Cover
   * @name EditCover
   * @summary Edit Cover
   * @request PUT:/cover/{mangaOrCoverId}
   * @secure
   */
  editCover = (mangaOrCoverId: string, data: CoverEdit, params: RequestParams = {}) =>
    this.http.request<EditCoverData, ErrorResponse>({
      path: `/cover/${mangaOrCoverId}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Cover
   * @name DeleteCover
   * @summary Delete Cover
   * @request DELETE:/cover/{mangaOrCoverId}
   * @secure
   */
  deleteCover = (mangaOrCoverId: string, params: RequestParams = {}) =>
    this.http.request<DeleteCoverData, ErrorResponse>({
      path: `/cover/${mangaOrCoverId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
