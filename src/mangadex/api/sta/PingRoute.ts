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

export namespace Ping {
  /**
   * @description Returns a plaintext response containing only the word "pong" if the API is healthy
   * @tags Infrastructure
   * @name GetPing
   * @summary Ping healthcheck
   * @request GET:/ping
   */
  export namespace GetPing {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPingData;
  }
}
