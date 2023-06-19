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
  ErrorResponse,
  GetReportReasonsByCategoryData,
  GetReportsData,
  GetReportsParams,
  PostReportData,
  PostReportPayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Report<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Report
   * @name GetReportReasonsByCategory
   * @summary Get a list of report reasons
   * @request GET:/report/reasons/{category}
   * @secure
   */
  getReportReasonsByCategory = (
    category: "manga" | "chapter" | "scanlation_group" | "user" | "author",
    params: RequestParams = {},
  ) =>
    this.http.request<GetReportReasonsByCategoryData, ErrorResponse>({
      path: `/report/reasons/${category}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Report
   * @name GetReports
   * @summary Get a list of reports by the user
   * @request GET:/report
   * @secure
   */
  getReports = (query: GetReportsParams, params: RequestParams = {}) =>
    this.http.request<GetReportsData, ErrorResponse>({
      path: `/report`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Report
   * @name PostReport
   * @summary Create a new Report
   * @request POST:/report
   * @secure
   */
  postReport = (data: PostReportPayload, params: RequestParams = {}) =>
    this.http.request<PostReportData, ErrorResponse>({
      path: `/report`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
