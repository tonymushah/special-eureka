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

import { GetPingData } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Ping<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Returns a plaintext response containing only the word "pong" if the API is healthy
   *
   * @tags Infrastructure
   * @name GetPing
   * @summary Ping healthcheck
   * @request GET:/ping
   */
  getPing = (params: RequestParams = {}) =>
    this.http.request<GetPingData, any>({
      path: `/ping`,
      method: "GET",
      ...params,
    });
}
