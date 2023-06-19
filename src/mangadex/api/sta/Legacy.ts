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

import { ErrorResponse, MappingIdBody, PostLegacyMappingData } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Legacy<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Legacy
   * @name PostLegacyMapping
   * @summary Legacy ID mapping
   * @request POST:/legacy/mapping
   */
  postLegacyMapping = (data: MappingIdBody, params: RequestParams = {}) =>
    this.http.request<PostLegacyMappingData, ErrorResponse>({
      path: `/legacy/mapping`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
