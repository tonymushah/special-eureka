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
  ApiClientCreate,
  ApiClientEdit,
  DeleteApiclientData,
  GetApiclientData,
  GetApiclientSecretData,
  GetListApiclientsData,
  PostCreateApiclientData,
  PostEditApiclientData,
  PostRegenerateApiclientSecretData,
  PostRegenerateApiclientSecretPayload,
  ReferenceExpansionApiClient,
} from "./data-contracts";

export namespace Client {
  /**
   * No description
   * @tags ApiClient
   * @name GetListApiclients
   * @summary List own Api Clients
   * @request GET:/client
   * @secure
   */
  export namespace GetListApiclients {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 0
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
      state?: "requested" | "approved" | "rejected" | "autoapproved";
      name?: string;
      /** Reference expansion options for api_client entities or lists */
      "includes[]"?: ReferenceExpansionApiClient;
      /** @default {"createdAt":"desc"} */
      order?: {
        name?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
      };
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetListApiclientsData;
  }

  /**
   * No description
   * @tags ApiClient
   * @name PostCreateApiclient
   * @summary Create ApiClient
   * @request POST:/client
   * @secure
   */
  export namespace PostCreateApiclient {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ApiClientCreate;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostCreateApiclientData;
  }

  /**
   * No description
   * @tags ApiClient
   * @name GetApiclient
   * @summary Get Api Client by ID
   * @request GET:/client/{id}
   * @secure
   */
  export namespace GetApiclient {
    export type RequestParams = {
      /**
       * ApiClient ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {
      /** Reference expansion options for api_client entities or lists */
      "includes[]"?: ReferenceExpansionApiClient;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetApiclientData;
  }

  /**
   * No description
   * @tags ApiClient
   * @name PostEditApiclient
   * @summary Edit ApiClient
   * @request POST:/client/{id}
   * @secure
   */
  export namespace PostEditApiclient {
    export type RequestParams = {
      /**
       * ApiClient ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = ApiClientEdit;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostEditApiclientData;
  }

  /**
   * No description
   * @tags ApiClient
   * @name DeleteApiclient
   * @summary Delete Api Client
   * @request DELETE:/client/{id}
   * @secure
   */
  export namespace DeleteApiclient {
    export type RequestParams = {
      /**
       * ApiClient ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {
      /** @pattern ^\d+$ */
      version?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteApiclientData;
  }

  /**
   * No description
   * @tags ApiClient
   * @name GetApiclientSecret
   * @summary Get Secret for Client by ID
   * @request GET:/client/{id}/secret
   * @secure
   */
  export namespace GetApiclientSecret {
    export type RequestParams = {
      /**
       * ApiClient ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetApiclientSecretData;
  }

  /**
   * No description
   * @tags ApiClient
   * @name PostRegenerateApiclientSecret
   * @summary Regenerate Client Secret
   * @request POST:/client/{id}/secret
   * @secure
   */
  export namespace PostRegenerateApiclientSecret {
    export type RequestParams = {
      /**
       * ApiClient ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PostRegenerateApiclientSecretPayload;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostRegenerateApiclientSecretData;
  }
}
