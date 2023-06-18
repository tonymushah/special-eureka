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
  AuthorCreate,
  AuthorEdit,
  DeleteAuthorIdData,
  ErrorResponse,
  GetAuthorData,
  GetAuthorIdData,
  GetAuthorIdParams,
  GetAuthorParams,
  PostAuthorData,
  PutAuthorIdData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Author<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Author
   * @name GetAuthor
   * @summary Author list
   * @request GET:/author
   */
  getAuthor = (query: GetAuthorParams, params: RequestParams = {}) =>
    this.http.request<GetAuthorData, ErrorResponse>({
      path: `/author`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Author
   * @name PostAuthor
   * @summary Create Author
   * @request POST:/author
   * @secure
   */
  postAuthor = (data: AuthorCreate, params: RequestParams = {}) =>
    this.http.request<PostAuthorData, ErrorResponse>({
      path: `/author`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Author
   * @name GetAuthorId
   * @summary Get Author
   * @request GET:/author/{id}
   */
  getAuthorId = ({ id, ...query }: GetAuthorIdParams, params: RequestParams = {}) =>
    this.http.request<GetAuthorIdData, ErrorResponse>({
      path: `/author/${id}`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Author
   * @name PutAuthorId
   * @summary Update Author
   * @request PUT:/author/{id}
   * @secure
   */
  putAuthorId = (id: string, data: AuthorEdit, params: RequestParams = {}) =>
    this.http.request<PutAuthorIdData, ErrorResponse>({
      path: `/author/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Author
   * @name DeleteAuthorId
   * @summary Delete Author
   * @request DELETE:/author/{id}
   * @secure
   */
  deleteAuthorId = (id: string, params: RequestParams = {}) =>
    this.http.request<DeleteAuthorIdData, ErrorResponse>({
      path: `/author/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
