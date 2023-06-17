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
  CreateAccount,
  ErrorResponse,
  GetAccountActivateCodeData,
  GetAccountAvailableData,
  GetAccountAvailableParams,
  PostAccountActivateResendData,
  PostAccountCreateData,
  PostAccountRecoverCodeData,
  PostAccountRecoverData,
  RecoverCompleteBody,
  SendAccountActivationCode,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Account<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Account
   * @name GetAccountAvailable
   * @summary Account username available
   * @request GET:/account/available
   * @deprecated
   */
  getAccountAvailable = (query: GetAccountAvailableParams, params: RequestParams = {}) =>
    this.http.request<GetAccountAvailableData, ErrorResponse>({
      path: `/account/available`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name PostAccountCreate
   * @summary Create Account
   * @request POST:/account/create
   * @deprecated
   */
  postAccountCreate = (data: CreateAccount, params: RequestParams = {}) =>
    this.http.request<PostAccountCreateData, ErrorResponse>({
      path: `/account/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name GetAccountActivateCode
   * @summary Activate account
   * @request POST:/account/activate/{code}
   * @deprecated
   */
  getAccountActivateCode = (code: string, params: RequestParams = {}) =>
    this.http.request<GetAccountActivateCodeData, ErrorResponse>({
      path: `/account/activate/${code}`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name PostAccountActivateResend
   * @summary Resend Activation code
   * @request POST:/account/activate/resend
   * @deprecated
   */
  postAccountActivateResend = (data: SendAccountActivationCode, params: RequestParams = {}) =>
    this.http.request<PostAccountActivateResendData, ErrorResponse>({
      path: `/account/activate/resend`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description You can only request Account Recovery once per Hour for the same Email Address
   *
   * @tags Account
   * @name PostAccountRecover
   * @summary Recover given Account
   * @request POST:/account/recover
   * @deprecated
   */
  postAccountRecover = (data: SendAccountActivationCode, params: RequestParams = {}) =>
    this.http.request<PostAccountRecoverData, ErrorResponse>({
      path: `/account/recover`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name PostAccountRecoverCode
   * @summary Complete Account recover
   * @request POST:/account/recover/{code}
   * @deprecated
   */
  postAccountRecoverCode = (code: string, data: RecoverCompleteBody, params: RequestParams = {}) =>
    this.http.request<PostAccountRecoverCodeData, ErrorResponse>({
      path: `/account/recover/${code}`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
