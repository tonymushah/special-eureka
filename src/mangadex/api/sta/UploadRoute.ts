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
  GetUploadSessionData,
  PutUploadSessionFileData,
  PutUploadSessionFilePayload,
} from "./data-contracts";

export namespace Upload {
  /**
   * No description
   * @tags Upload
   * @name GetUploadSession
   * @summary Get the current User upload session
   * @request GET:/upload
   * @secure
   */
  export namespace GetUploadSession {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetUploadSessionData;
  }

  /**
   * No description
   * @tags Upload
   * @name BeginUploadSession
   * @summary Start an upload session
   * @request POST:/upload/begin
   * @secure
   */
  export namespace BeginUploadSession {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BeginUploadSession;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = BeginUploadSessionData;
  }

  /**
   * No description
   * @tags Upload
   * @name BeginEditSession
   * @summary Start an edit chapter session
   * @request POST:/upload/begin/{chapterId}
   * @secure
   */
  export namespace BeginEditSession {
    export type RequestParams = {
      /** @format uuid */
      chapterId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = BeginEditSession;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = BeginEditSessionData;
  }

  /**
   * No description
   * @tags Upload
   * @name PutUploadSessionFile
   * @summary Upload images to the upload session
   * @request POST:/upload/{uploadSessionId}
   * @secure
   */
  export namespace PutUploadSessionFile {
    export type RequestParams = {
      /** @format uuid */
      uploadSessionId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PutUploadSessionFilePayload;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PutUploadSessionFileData;
  }

  /**
   * No description
   * @tags Upload
   * @name AbandonUploadSession
   * @summary Abandon upload session
   * @request DELETE:/upload/{uploadSessionId}
   * @secure
   */
  export namespace AbandonUploadSession {
    export type RequestParams = {
      /** @format uuid */
      uploadSessionId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AbandonUploadSessionData;
  }

  /**
   * No description
   * @tags Upload
   * @name CommitUploadSession
   * @summary Commit the upload session and specify chapter data
   * @request POST:/upload/{uploadSessionId}/commit
   * @secure
   */
  export namespace CommitUploadSession {
    export type RequestParams = {
      /** @format uuid */
      uploadSessionId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CommitUploadSession;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = CommitUploadSessionData;
  }

  /**
   * No description
   * @tags Upload
   * @name DeleteUploadedSessionFile
   * @summary Delete an uploaded image from the Upload Session
   * @request DELETE:/upload/{uploadSessionId}/{uploadSessionFileId}
   * @secure
   */
  export namespace DeleteUploadedSessionFile {
    export type RequestParams = {
      /** @format uuid */
      uploadSessionId: string;
      /** @format uuid */
      uploadSessionFileId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteUploadedSessionFileData;
  }

  /**
   * No description
   * @tags Upload
   * @name DeleteUploadedSessionFiles
   * @summary Delete a set of uploaded images from the Upload Session
   * @request DELETE:/upload/{uploadSessionId}/batch
   * @secure
   */
  export namespace DeleteUploadedSessionFiles {
    export type RequestParams = {
      /** @format uuid */
      uploadSessionId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = DeleteUploadedSessionFilesPayload;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = DeleteUploadedSessionFilesData;
  }
}
