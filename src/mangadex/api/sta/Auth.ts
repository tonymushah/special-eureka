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
  ErrorResponse,
  GetAuthCheckData,
  Login,
  PostAuthLoginData,
  PostAuthLogoutData,
  PostAuthRefreshData,
  RefreshToken,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Authentication
   * @name PostAuthLogin
   * @summary Login
   * @request POST:/auth/login
   * @deprecated
   */
  postAuthLogin = (data: Login, params: RequestParams = {}) =>
    this.http.request<PostAuthLoginData, ErrorResponse>({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description The returned list of permissions is computed depending on the generic role permissions that the token user has, their personal overrides, and the OpenID scopes of the token (we do not offer granular token permissions yet)
   *
   * @tags Authentication
   * @name GetAuthCheck
   * @summary Check the set of permissions associated with the current token
   * @request GET:/auth/check
   * @secure
   */
  getAuthCheck = (params: RequestParams = {}) =>
    this.http.request<GetAuthCheckData, any>({
      path: `/auth/check`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name PostAuthLogout
   * @summary Logout
   * @request POST:/auth/logout
   * @deprecated
   * @secure
   */
  postAuthLogout = (params: RequestParams = {}) =>
    this.http.request<PostAuthLogoutData, ErrorResponse>({
      path: `/auth/logout`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name PostAuthRefresh
   * @summary Refresh token
   * @request POST:/auth/refresh
   * @deprecated
   */
  postAuthRefresh = (data: RefreshToken, params: RequestParams = {}) =>
    this.http.request<PostAuthRefreshData, ErrorResponse>({
      path: `/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
