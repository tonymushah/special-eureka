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
  GetReportReasonsByCategoryData,
  GetReportsData,
  PostReportData,
  PostReportPayload,
  ReferenceExpansionReport,
} from "./data-contracts";

export namespace Report {
  /**
   * No description
   * @tags Report
   * @name GetReportReasonsByCategory
   * @summary Get a list of report reasons
   * @request GET:/report/reasons/{category}
   * @secure
   */
  export namespace GetReportReasonsByCategory {
    export type RequestParams = {
      category: "manga" | "chapter" | "scanlation_group" | "user" | "author";
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetReportReasonsByCategoryData;
  }

  /**
   * No description
   * @tags Report
   * @name GetReports
   * @summary Get a list of reports by the user
   * @request GET:/report
   * @secure
   */
  export namespace GetReports {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
      category?: "manga" | "chapter" | "scanlation_group" | "user" | "author";
      /**
       * @format uuid
       * @minLength 36
       * @maxLength 36
       */
      reasonId?: string;
      /**
       * @format uuid
       * @minLength 36
       * @maxLength 36
       */
      objectId?: string;
      status?: "waiting" | "accepted" | "refused" | "autoresolved";
      /** @default {"createdAt":"desc"} */
      order?: {
        createdAt?: "asc" | "desc";
      };
      /** Reference expansion options for user report entities or lists */
      "includes[]"?: ReferenceExpansionReport;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetReportsData;
  }

  /**
   * No description
   * @tags Report
   * @name PostReport
   * @summary Create a new Report
   * @request POST:/report
   * @secure
   */
  export namespace PostReport {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PostReportPayload;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostReportData;
  }
}
