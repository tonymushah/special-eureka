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
  AbandonUploadSessionData,
  BeginEditSession,
  BeginEditSessionData,
  BeginUploadSession,
  BeginUploadSessionData,
  CommitUploadSession,
  CommitUploadSessionData,
  DeleteUploadedSessionFileData,
  DeleteUploadedSessionFilesData,
  DeleteUploadedSessionFilesPayload,
  ErrorResponse,
  GetUploadSessionData,
  PutUploadSessionFileData,
  PutUploadSessionFilePayload,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Upload<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Upload
   * @name GetUploadSession
   * @summary Get the current User upload session
   * @request GET:/upload
   * @secure
   */
  getUploadSession = (params: RequestParams = {}) =>
    this.http.request<GetUploadSessionData, ErrorResponse>({
      path: `/upload`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name BeginUploadSession
   * @summary Start an upload session
   * @request POST:/upload/begin
   * @secure
   */
  beginUploadSession = (data: BeginUploadSession, params: RequestParams = {}) =>
    this.http.request<BeginUploadSessionData, any>({
      path: `/upload/begin`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name BeginEditSession
   * @summary Start an edit chapter session
   * @request POST:/upload/begin/{chapterId}
   * @secure
   */
  beginEditSession = (chapterId: string, data: BeginEditSession, params: RequestParams = {}) =>
    this.http.request<BeginEditSessionData, ErrorResponse>({
      path: `/upload/begin/${chapterId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name PutUploadSessionFile
   * @summary Upload images to the upload session
   * @request POST:/upload/{uploadSessionId}
   * @secure
   */
  putUploadSessionFile = (uploadSessionId: string, data: PutUploadSessionFilePayload, params: RequestParams = {}) =>
    this.http.request<PutUploadSessionFileData, ErrorResponse>({
      path: `/upload/${uploadSessionId}`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name AbandonUploadSession
   * @summary Abandon upload session
   * @request DELETE:/upload/{uploadSessionId}
   * @secure
   */
  abandonUploadSession = (uploadSessionId: string, params: RequestParams = {}) =>
    this.http.request<AbandonUploadSessionData, any>({
      path: `/upload/${uploadSessionId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name CommitUploadSession
   * @summary Commit the upload session and specify chapter data
   * @request POST:/upload/{uploadSessionId}/commit
   * @secure
   */
  commitUploadSession = (uploadSessionId: string, data: CommitUploadSession, params: RequestParams = {}) =>
    this.http.request<CommitUploadSessionData, any>({
      path: `/upload/${uploadSessionId}/commit`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name DeleteUploadedSessionFile
   * @summary Delete an uploaded image from the Upload Session
   * @request DELETE:/upload/{uploadSessionId}/{uploadSessionFileId}
   * @secure
   */
  deleteUploadedSessionFile = (uploadSessionId: string, uploadSessionFileId: string, params: RequestParams = {}) =>
    this.http.request<DeleteUploadedSessionFileData, any>({
      path: `/upload/${uploadSessionId}/${uploadSessionFileId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name DeleteUploadedSessionFiles
   * @summary Delete a set of uploaded images from the Upload Session
   * @request DELETE:/upload/{uploadSessionId}/batch
   * @secure
   */
  deleteUploadedSessionFiles = (
    uploadSessionId: string,
    data: DeleteUploadedSessionFilesPayload,
    params: RequestParams = {},
  ) =>
    this.http.request<DeleteUploadedSessionFilesData, any>({
      path: `/upload/${uploadSessionId}/batch`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
