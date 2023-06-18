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
  GetSettingsData,
  GetSettingsTemplateData,
  GetSettingsTemplateVersionData,
  PostSettingsData,
  PostSettingsPayload,
  PostSettingsTemplateData,
  PostSettingsTemplatePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Settings<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Settings
   * @name GetSettingsTemplate
   * @summary Get latest Settings template
   * @request GET:/settings/template
   * @secure
   */
  getSettingsTemplate = (params: RequestParams = {}) =>
    this.http.request<GetSettingsTemplateData, ErrorResponse>({
      path: `/settings/template`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Settings
   * @name PostSettingsTemplate
   * @summary Create Settings template
   * @request POST:/settings/template
   * @secure
   */
  postSettingsTemplate = (data: PostSettingsTemplatePayload, params: RequestParams = {}) =>
    this.http.request<PostSettingsTemplateData, ErrorResponse>({
      path: `/settings/template`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Settings
   * @name GetSettingsTemplateVersion
   * @summary Get Settings template by version id
   * @request GET:/settings/template/{version}
   * @secure
   */
  getSettingsTemplateVersion = (version: string, params: RequestParams = {}) =>
    this.http.request<GetSettingsTemplateVersionData, ErrorResponse>({
      path: `/settings/template/${version}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Settings
   * @name GetSettings
   * @summary Get an User Settings
   * @request GET:/settings
   * @secure
   */
  getSettings = (params: RequestParams = {}) =>
    this.http.request<GetSettingsData, ErrorResponse>({
      path: `/settings`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Settings
   * @name PostSettings
   * @summary Create or update an User Settings
   * @request POST:/settings
   * @secure
   */
  postSettings = (data: PostSettingsPayload, params: RequestParams = {}) =>
    this.http.request<PostSettingsData, ErrorResponse>({
      path: `/settings`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
