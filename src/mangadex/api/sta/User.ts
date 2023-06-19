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
  DeleteUserIdData,
  ErrorResponse,
  GetReadingHistoryData,
  GetUserData,
  GetUserFollowsGroupData,
  GetUserFollowsGroupIdData,
  GetUserFollowsGroupParams,
  GetUserFollowsListData,
  GetUserFollowsListIdData,
  GetUserFollowsListParams,
  GetUserFollowsMangaData,
  GetUserFollowsMangaFeedData,
  GetUserFollowsMangaFeedParams,
  GetUserFollowsMangaIdData,
  GetUserFollowsMangaParams,
  GetUserFollowsUserData,
  GetUserFollowsUserIdData,
  GetUserFollowsUserParams,
  GetUserIdData,
  GetUserIdListData,
  GetUserIdListParams,
  GetUserListData,
  GetUserListParams,
  GetUserMeData,
  GetUserParams,
  PostUserDeleteCodeData,
  PostUserEmailData,
  PostUserEmailPayload,
  PostUserPasswordData,
  PostUserPasswordPayload,
  Response,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description This will list public and private CustomList
   *
   * @tags CustomList
   * @name GetUserList
   * @summary Get logged User CustomList list
   * @request GET:/user/list
   * @secure
   */
  getUserList = (query: GetUserListParams, params: RequestParams = {}) =>
    this.http.request<GetUserListData, any>({
      path: `/user/list`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description This will list only public CustomList
   *
   * @tags CustomList
   * @name GetUserIdList
   * @summary Get User's CustomList list
   * @request GET:/user/{id}/list
   */
  getUserIdList = ({ id, ...query }: GetUserIdListParams, params: RequestParams = {}) =>
    this.http.request<GetUserIdListData, any>({
      path: `/user/${id}/list`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name GetUser
   * @summary User list
   * @request GET:/user
   * @secure
   */
  getUser = (query: GetUserParams, params: RequestParams = {}) =>
    this.http.request<GetUserData, any>({
      path: `/user`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name GetUserId
   * @summary Get User
   * @request GET:/user/{id}
   */
  getUserId = (id: string, params: RequestParams = {}) =>
    this.http.request<GetUserIdData, any>({
      path: `/user/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name DeleteUserId
   * @summary Delete User
   * @request DELETE:/user/{id}
   * @deprecated
   * @secure
   */
  deleteUserId = (id: string, params: RequestParams = {}) =>
    this.http.request<DeleteUserIdData, any>({
      path: `/user/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name PostUserDeleteCode
   * @summary Approve User deletion
   * @request POST:/user/delete/{code}
   * @deprecated
   */
  postUserDeleteCode = (code: string, params: RequestParams = {}) =>
    this.http.request<PostUserDeleteCodeData, any>({
      path: `/user/delete/${code}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name PostUserPassword
   * @summary Update User password
   * @request POST:/user/password
   * @deprecated
   * @secure
   */
  postUserPassword = (data: PostUserPasswordPayload, params: RequestParams = {}) =>
    this.http.request<PostUserPasswordData, any>({
      path: `/user/password`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name PostUserEmail
   * @summary Update User email
   * @request POST:/user/email
   * @deprecated
   * @secure
   */
  postUserEmail = (data: PostUserEmailPayload, params: RequestParams = {}) =>
    this.http.request<PostUserEmailData, any>({
      path: `/user/email`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Feed
   * @name GetUserFollowsMangaFeed
   * @summary Get logged User followed Manga feed (Chapter list)
   * @request GET:/user/follows/manga/feed
   * @secure
   */
  getUserFollowsMangaFeed = (query: GetUserFollowsMangaFeedParams, params: RequestParams = {}) =>
    this.http.request<GetUserFollowsMangaFeedData, ErrorResponse>({
      path: `/user/follows/manga/feed`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name GetUserMe
   * @summary Logged User details
   * @request GET:/user/me
   * @secure
   */
  getUserMe = (params: RequestParams = {}) =>
    this.http.request<GetUserMeData, any>({
      path: `/user/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Follows
   * @name GetUserFollowsGroup
   * @summary Get logged User followed Groups
   * @request GET:/user/follows/group
   * @secure
   */
  getUserFollowsGroup = (query: GetUserFollowsGroupParams, params: RequestParams = {}) =>
    this.http.request<GetUserFollowsGroupData, any>({
      path: `/user/follows/group`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Follows
   * @name GetUserFollowsGroupId
   * @summary Check if logged User follows a Group
   * @request GET:/user/follows/group/{id}
   * @secure
   */
  getUserFollowsGroupId = (id: string, params: RequestParams = {}) =>
    this.http.request<GetUserFollowsGroupIdData, Response>({
      path: `/user/follows/group/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Follows
   * @name GetUserFollowsUser
   * @summary Get logged User followed User list
   * @request GET:/user/follows/user
   * @secure
   */
  getUserFollowsUser = (query: GetUserFollowsUserParams, params: RequestParams = {}) =>
    this.http.request<GetUserFollowsUserData, any>({
      path: `/user/follows/user`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Follows
   * @name GetUserFollowsUserId
   * @summary Check if logged User follows a User
   * @request GET:/user/follows/user/{id}
   * @secure
   */
  getUserFollowsUserId = (id: string, params: RequestParams = {}) =>
    this.http.request<GetUserFollowsUserIdData, Response>({
      path: `/user/follows/user/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Follows
   * @name GetUserFollowsManga
   * @summary Get logged User followed Manga list
   * @request GET:/user/follows/manga
   * @secure
   */
  getUserFollowsManga = (query: GetUserFollowsMangaParams, params: RequestParams = {}) =>
    this.http.request<GetUserFollowsMangaData, any>({
      path: `/user/follows/manga`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Follows
   * @name GetUserFollowsMangaId
   * @summary Check if logged User follows a Manga
   * @request GET:/user/follows/manga/{id}
   * @secure
   */
  getUserFollowsMangaId = (id: string, params: RequestParams = {}) =>
    this.http.request<GetUserFollowsMangaIdData, Response>({
      path: `/user/follows/manga/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Follows
   * @name GetUserFollowsList
   * @summary Get logged User followed CustomList list
   * @request GET:/user/follows/list
   * @secure
   */
  getUserFollowsList = (query: GetUserFollowsListParams, params: RequestParams = {}) =>
    this.http.request<GetUserFollowsListData, any>({
      path: `/user/follows/list`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Follows
   * @name GetUserFollowsListId
   * @summary Check if logged User follows a CustomList
   * @request GET:/user/follows/list/{id}
   * @secure
   */
  getUserFollowsListId = (id: string, params: RequestParams = {}) =>
    this.http.request<GetUserFollowsListIdData, Response>({
      path: `/user/follows/list/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ReadMarker
   * @name GetReadingHistory
   * @summary Get users reading history
   * @request GET:/user/history
   * @secure
   */
  getReadingHistory = (params: RequestParams = {}) =>
    this.http.request<GetReadingHistoryData, ErrorResponse>({
      path: `/user/history`,
      method: "GET",
      secure: true,
      ...params,
    });
}
