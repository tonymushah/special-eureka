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
  CreateScanlationGroup,
  DeleteGroupIdData,
  DeleteGroupIdFollowData,
  ErrorResponse,
  GetGroupIdData,
  GetGroupIdParams,
  GetSearchGroupData,
  GetSearchGroupParams,
  PostGroupData,
  PostGroupIdFollowData,
  PutGroupIdData,
  ScanlationGroupEdit,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Group<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags ScanlationGroup
   * @name GetSearchGroup
   * @summary Scanlation Group list
   * @request GET:/group
   */
  getSearchGroup = (query: GetSearchGroupParams, params: RequestParams = {}) =>
    this.http.request<GetSearchGroupData, ErrorResponse>({
      path: `/group`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ScanlationGroup
   * @name PostGroup
   * @summary Create Scanlation Group
   * @request POST:/group
   * @secure
   */
  postGroup = (data: CreateScanlationGroup, params: RequestParams = {}) =>
    this.http.request<PostGroupData, ErrorResponse>({
      path: `/group`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ScanlationGroup
   * @name GetGroupId
   * @summary Get Scanlation Group
   * @request GET:/group/{id}
   */
  getGroupId = ({ id, ...query }: GetGroupIdParams, params: RequestParams = {}) =>
    this.http.request<GetGroupIdData, ErrorResponse>({
      path: `/group/${id}`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags ScanlationGroup
   * @name PutGroupId
   * @summary Update Scanlation Group
   * @request PUT:/group/{id}
   * @secure
   */
  putGroupId = (id: string, data: ScanlationGroupEdit, params: RequestParams = {}) =>
    this.http.request<PutGroupIdData, ErrorResponse>({
      path: `/group/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ScanlationGroup
   * @name DeleteGroupId
   * @summary Delete Scanlation Group
   * @request DELETE:/group/{id}
   * @secure
   */
  deleteGroupId = (id: string, params: RequestParams = {}) =>
    this.http.request<DeleteGroupIdData, ErrorResponse>({
      path: `/group/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ScanlationGroup
   * @name PostGroupIdFollow
   * @summary Follow Scanlation Group
   * @request POST:/group/{id}/follow
   * @secure
   */
  postGroupIdFollow = (id: string, params: RequestParams = {}) =>
    this.http.request<PostGroupIdFollowData, ErrorResponse>({
      path: `/group/${id}/follow`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ScanlationGroup
   * @name DeleteGroupIdFollow
   * @summary Unfollow Scanlation Group
   * @request DELETE:/group/{id}/follow
   * @secure
   */
  deleteGroupIdFollow = (id: string, params: RequestParams = {}) =>
    this.http.request<DeleteGroupIdFollowData, ErrorResponse>({
      path: `/group/${id}/follow`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
