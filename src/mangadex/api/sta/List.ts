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
  CustomListCreate,
  CustomListEdit,
  DeleteListIdData,
  ErrorResponse,
  FollowListIdData,
  FollowListIdPayload,
  GetListIdData,
  GetListIdFeedData,
  GetListIdFeedParams,
  PostListData,
  PutListIdData,
  UnfollowListIdData,
  UnfollowListIdPayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class List<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags CustomList
   * @name PostList
   * @summary Create CustomList
   * @request POST:/list
   * @secure
   */
  postList = (data: CustomListCreate, params: RequestParams = {}) =>
    this.http.request<PostListData, ErrorResponse>({
      path: `/list`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CustomList
   * @name GetListId
   * @summary Get CustomList
   * @request GET:/list/{id}
   */
  getListId = (id: string, params: RequestParams = {}) =>
    this.http.request<GetListIdData, ErrorResponse>({
      path: `/list/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * @description The size of the body is limited to 8KB.
   *
   * @tags CustomList
   * @name PutListId
   * @summary Update CustomList
   * @request PUT:/list/{id}
   * @secure
   */
  putListId = (id: string, data: CustomListEdit, params: RequestParams = {}) =>
    this.http.request<PutListIdData, ErrorResponse>({
      path: `/list/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags CustomList
   * @name DeleteListId
   * @summary Delete CustomList
   * @request DELETE:/list/{id}
   * @secure
   */
  deleteListId = (id: string, params: RequestParams = {}) =>
    this.http.request<DeleteListIdData, ErrorResponse>({
      path: `/list/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description The request body is empty
   *
   * @tags CustomList
   * @name FollowListId
   * @summary Follow CustomList
   * @request POST:/list/{id}/follow
   * @secure
   */
  followListId = (id: string, data: FollowListIdPayload, params: RequestParams = {}) =>
    this.http.request<FollowListIdData, ErrorResponse>({
      path: `/list/${id}/follow`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description The request body is empty
   *
   * @tags CustomList
   * @name UnfollowListId
   * @summary Unfollow CustomList
   * @request DELETE:/list/{id}/follow
   * @secure
   */
  unfollowListId = (id: string, data: UnfollowListIdPayload, params: RequestParams = {}) =>
    this.http.request<UnfollowListIdData, ErrorResponse>({
      path: `/list/${id}/follow`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Feed
   * @name GetListIdFeed
   * @summary CustomList Manga feed
   * @request GET:/list/{id}/feed
   */
  getListIdFeed = ({ id, ...query }: GetListIdFeedParams, params: RequestParams = {}) =>
    this.http.request<GetListIdFeedData, ErrorResponse>({
      path: `/list/${id}/feed`,
      method: "GET",
      query: query,
      ...params,
    });
}
