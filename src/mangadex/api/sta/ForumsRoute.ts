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

import { ForumsThreadCreateData, ForumsThreadCreatePayload } from "./data-contracts";

export namespace Forums {
  /**
   * @description Creates a thread in the forums for the given resource, which backs the comments functionality. A thread is only created if it doesn't exist yet; otherwise the preexisting thread is returned.
   * @tags Forums
   * @name ForumsThreadCreate
   * @summary Create forums thread
   * @request POST:/forums/thread
   * @secure
   */
  export namespace ForumsThreadCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ForumsThreadCreatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = ForumsThreadCreateData;
  }
}
