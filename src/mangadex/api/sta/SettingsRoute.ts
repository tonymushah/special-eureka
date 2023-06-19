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
  GetSettingsData,
  GetSettingsTemplateData,
  GetSettingsTemplateVersionData,
  PostSettingsData,
  PostSettingsPayload,
  PostSettingsTemplateData,
  PostSettingsTemplatePayload,
} from "./data-contracts";

export namespace Settings {
  /**
   * No description
   * @tags Settings
   * @name GetSettingsTemplate
   * @summary Get latest Settings template
   * @request GET:/settings/template
   * @secure
   */
  export namespace GetSettingsTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetSettingsTemplateData;
  }

  /**
   * No description
   * @tags Settings
   * @name PostSettingsTemplate
   * @summary Create Settings template
   * @request POST:/settings/template
   * @secure
   */
  export namespace PostSettingsTemplate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PostSettingsTemplatePayload;
    export type RequestHeaders = {};
    export type ResponseBody = PostSettingsTemplateData;
  }

  /**
   * No description
   * @tags Settings
   * @name GetSettingsTemplateVersion
   * @summary Get Settings template by version id
   * @request GET:/settings/template/{version}
   * @secure
   */
  export namespace GetSettingsTemplateVersion {
    export type RequestParams = {
      /** @format uuid */
      version: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetSettingsTemplateVersionData;
  }

  /**
   * No description
   * @tags Settings
   * @name GetSettings
   * @summary Get an User Settings
   * @request GET:/settings
   * @secure
   */
  export namespace GetSettings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetSettingsData;
  }

  /**
   * No description
   * @tags Settings
   * @name PostSettings
   * @summary Create or update an User Settings
   * @request POST:/settings
   * @secure
   */
  export namespace PostSettings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = PostSettingsPayload;
    export type RequestHeaders = {};
    export type ResponseBody = PostSettingsData;
  }
}
