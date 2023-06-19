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

import { MappingIdBody, PostLegacyMappingData } from "./data-contracts";

export namespace Legacy {
  /**
   * No description
   * @tags Legacy
   * @name PostLegacyMapping
   * @summary Legacy ID mapping
   * @request POST:/legacy/mapping
   */
  export namespace PostLegacyMapping {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MappingIdBody;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostLegacyMappingData;
  }
}
