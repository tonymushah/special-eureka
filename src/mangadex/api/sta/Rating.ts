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
  DeleteRatingMangaIdData,
  ErrorResponse,
  GetRatingData,
  GetRatingParams,
  PostRatingMangaIdData,
  PostRatingMangaIdPayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Rating<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Rating
   * @name GetRating
   * @summary Get your ratings
   * @request GET:/rating
   * @secure
   */
  getRating = (query: GetRatingParams, params: RequestParams = {}) =>
    this.http.request<GetRatingData, ErrorResponse>({
      path: `/rating`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Rating
   * @name PostRatingMangaId
   * @summary Create or update Manga rating
   * @request POST:/rating/{mangaId}
   * @secure
   */
  postRatingMangaId = (mangaId: string, data: PostRatingMangaIdPayload, params: RequestParams = {}) =>
    this.http.request<PostRatingMangaIdData, ErrorResponse>({
      path: `/rating/${mangaId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Rating
   * @name DeleteRatingMangaId
   * @summary Delete Manga rating
   * @request DELETE:/rating/{mangaId}
   * @secure
   */
  deleteRatingMangaId = (mangaId: string, params: RequestParams = {}) =>
    this.http.request<DeleteRatingMangaIdData, ErrorResponse>({
      path: `/rating/${mangaId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
