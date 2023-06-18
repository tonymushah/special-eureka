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
  GetAuthCheckData,
  Login,
  PostAuthLoginData,
  PostAuthLogoutData,
  PostAuthRefreshData,
  RefreshToken,
} from "./data-contracts";

export namespace Auth {
  /**
   * No description
   * @tags Authentication
   * @name PostAuthLogin
   * @summary Login
   * @request POST:/auth/login
   * @deprecated
   */
  export namespace PostAuthLogin {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = Login;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostAuthLoginData;
  }

  /**
   * @description The returned list of permissions is computed depending on the generic role permissions that the token user has, their personal overrides, and the OpenID scopes of the token (we do not offer granular token permissions yet)
   * @tags Authentication
   * @name GetAuthCheck
   * @summary Check the set of permissions associated with the current token
   * @request GET:/auth/check
   * @secure
   */
  export namespace GetAuthCheck {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAuthCheckData;
  }

  /**
   * No description
   * @tags Authentication
   * @name PostAuthLogout
   * @summary Logout
   * @request POST:/auth/logout
   * @deprecated
   * @secure
   */
  export namespace PostAuthLogout {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PostAuthLogoutData;
  }

  /**
   * No description
   * @tags Authentication
   * @name PostAuthRefresh
   * @summary Refresh token
   * @request POST:/auth/refresh
   * @deprecated
   */
  export namespace PostAuthRefresh {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RefreshToken;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostAuthRefreshData;
  }
}
