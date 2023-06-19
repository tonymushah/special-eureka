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

import { PostCaptchaSolveData, PostCaptchaSolvePayload } from "./data-contracts";

export namespace Captcha {
  /**
   * @description Captchas can be solved explicitly through this endpoint, another way is to add a `X-Captcha-Result` header to any request. The same logic will verify the captcha and is probably more convenient because it takes one less request. Authentication is optional. Captchas are tracked for both the client ip and for the user id, if you are logged in you want to send your session token but that is not required.
   * @tags Captcha
   * @name PostCaptchaSolve
   * @summary Solve Captcha
   * @request POST:/captcha/solve
   * @secure
   */
  export namespace PostCaptchaSolve {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PostCaptchaSolvePayload;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostCaptchaSolveData;
  }
}
