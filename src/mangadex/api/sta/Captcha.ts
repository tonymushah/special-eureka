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

import { ErrorResponse, PostCaptchaSolveData, PostCaptchaSolvePayload } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Captcha<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Captchas can be solved explicitly through this endpoint, another way is to add a `X-Captcha-Result` header to any request. The same logic will verify the captcha and is probably more convenient because it takes one less request. Authentication is optional. Captchas are tracked for both the client ip and for the user id, if you are logged in you want to send your session token but that is not required.
   *
   * @tags Captcha
   * @name PostCaptchaSolve
   * @summary Solve Captcha
   * @request POST:/captcha/solve
   * @secure
   */
  postCaptchaSolve = (data: PostCaptchaSolvePayload, params: RequestParams = {}) =>
    this.http.request<PostCaptchaSolveData, ErrorResponse>({
      path: `/captcha/solve`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
