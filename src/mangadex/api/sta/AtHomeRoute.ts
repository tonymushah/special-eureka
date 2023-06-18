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

import { GetAtHomeServerChapterIdData } from "./data-contracts";

export namespace AtHome {
  /**
   * No description
   * @tags AtHome
   * @name GetAtHomeServerChapterId
   * @summary Get MangaDex@Home server URL
   * @request GET:/at-home/server/{chapterId}
   */
  export namespace GetAtHomeServerChapterId {
    export type RequestParams = {
      /**
       * Chapter ID
       * @format uuid
       */
      chapterId: string;
    };
    export type RequestQuery = {
      /**
       * Force selecting from MangaDex@Home servers that use the standard HTTPS port 443.
       *
       * While the conventional port for HTTPS traffic is 443 and servers are encouraged to use it, it is not a hard requirement as it technically isn't
       * anything special.
       *
       * However, some misbehaving school/office network will at time block traffic to non-standard ports, and setting this flag to `true` will ensure
       * selection of a server that uses these.
       * @default false
       */
      forcePort443?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAtHomeServerChapterIdData;
  }
}
