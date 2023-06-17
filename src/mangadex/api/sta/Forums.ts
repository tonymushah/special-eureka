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

import { ErrorResponse, ForumsThreadCreateData, ForumsThreadCreatePayload } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Forums<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Creates a thread in the forums for the given resource, which backs the comments functionality. A thread is only created if it doesn't exist yet; otherwise the preexisting thread is returned.
   *
   * @tags Forums
   * @name ForumsThreadCreate
   * @summary Create forums thread
   * @request POST:/forums/thread
   * @secure
   */
  forumsThreadCreate = (data: ForumsThreadCreatePayload, params: RequestParams = {}) =>
    this.http.request<ForumsThreadCreateData, ErrorResponse>({
      path: `/forums/thread`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
