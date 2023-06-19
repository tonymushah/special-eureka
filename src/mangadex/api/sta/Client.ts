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
  DeleteApiclientParams,
  ErrorResponse,
  GetApiclientData,
  GetApiclientParams,
  GetApiclientSecretData,
  GetListApiclientsData,
  GetListApiclientsParams,
  PostCreateApiclientData,
  PostEditApiclientData,
  PostRegenerateApiclientSecretData,
  PostRegenerateApiclientSecretPayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Client<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags ApiClient
   * @name GetListApiclients
   * @summary List own Api Clients
   * @request GET:/client
   * @secure
   */
  getListApiclients = (query: GetListApiclientsParams, params: RequestParams = {}) =>
    this.http.request<GetListApiclientsData, any>({
      path: `/client`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ApiClient
   * @name PostCreateApiclient
   * @summary Create ApiClient
   * @request POST:/client
   * @secure
   */
  postCreateApiclient = (data: ApiClientCreate, params: RequestParams = {}) =>
    this.http.request<PostCreateApiclientData, ErrorResponse>({
      path: `/client`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ApiClient
   * @name GetApiclient
   * @summary Get Api Client by ID
   * @request GET:/client/{id}
   * @secure
   */
  getApiclient = ({ id, ...query }: GetApiclientParams, params: RequestParams = {}) =>
    this.http.request<GetApiclientData, ErrorResponse>({
      path: `/client/${id}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ApiClient
   * @name PostEditApiclient
   * @summary Edit ApiClient
   * @request POST:/client/{id}
   * @secure
   */
  postEditApiclient = (id: string, data: ApiClientEdit, params: RequestParams = {}) =>
    this.http.request<PostEditApiclientData, ErrorResponse>({
      path: `/client/${id}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags ApiClient
   * @name DeleteApiclient
   * @summary Delete Api Client
   * @request DELETE:/client/{id}
   * @secure
   */
  deleteApiclient = ({ id, ...query }: DeleteApiclientParams, params: RequestParams = {}) =>
    this.http.request<DeleteApiclientData, ErrorResponse>({
      path: `/client/${id}`,
      method: "DELETE",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ApiClient
   * @name GetApiclientSecret
   * @summary Get Secret for Client by ID
   * @request GET:/client/{id}/secret
   * @secure
   */
  getApiclientSecret = (id: string, params: RequestParams = {}) =>
    this.http.request<GetApiclientSecretData, ErrorResponse>({
      path: `/client/${id}/secret`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags ApiClient
   * @name PostRegenerateApiclientSecret
   * @summary Regenerate Client Secret
   * @request POST:/client/{id}/secret
   * @secure
   */
  postRegenerateApiclientSecret = (
    id: string,
    data: PostRegenerateApiclientSecretPayload,
    params: RequestParams = {},
  ) =>
    this.http.request<PostRegenerateApiclientSecretData, ErrorResponse>({
      path: `/client/${id}/secret`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
