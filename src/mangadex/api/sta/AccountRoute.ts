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
  CreateAccount,
  GetAccountActivateCodeData,
  GetAccountAvailableData,
  PostAccountActivateResendData,
  PostAccountCreateData,
  PostAccountRecoverCodeData,
  PostAccountRecoverData,
  RecoverCompleteBody,
  SendAccountActivationCode,
} from "./data-contracts";

export namespace Account {
  /**
   * No description
   * @tags Account
   * @name GetAccountAvailable
   * @summary Account username available
   * @request GET:/account/available
   * @deprecated
   */
  export namespace GetAccountAvailable {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Username to check for avaibility
       * @minLength 1
       * @maxLength 64
       * @pattern ^[a-zA-Z0-9_-]+$
       */
      username: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAccountAvailableData;
  }

  /**
   * No description
   * @tags Account
   * @name PostAccountCreate
   * @summary Create Account
   * @request POST:/account/create
   * @deprecated
   */
  export namespace PostAccountCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateAccount;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostAccountCreateData;
  }

  /**
   * No description
   * @tags Account
   * @name GetAccountActivateCode
   * @summary Activate account
   * @request POST:/account/activate/{code}
   * @deprecated
   */
  export namespace GetAccountActivateCode {
    export type RequestParams = {
      /** @pattern [0-9a-fA-F-]+ */
      code: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAccountActivateCodeData;
  }

  /**
   * No description
   * @tags Account
   * @name PostAccountActivateResend
   * @summary Resend Activation code
   * @request POST:/account/activate/resend
   * @deprecated
   */
  export namespace PostAccountActivateResend {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SendAccountActivationCode;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostAccountActivateResendData;
  }

  /**
   * @description You can only request Account Recovery once per Hour for the same Email Address
   * @tags Account
   * @name PostAccountRecover
   * @summary Recover given Account
   * @request POST:/account/recover
   * @deprecated
   */
  export namespace PostAccountRecover {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = SendAccountActivationCode;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostAccountRecoverData;
  }

  /**
   * No description
   * @tags Account
   * @name PostAccountRecoverCode
   * @summary Complete Account recover
   * @request POST:/account/recover/{code}
   * @deprecated
   */
  export namespace PostAccountRecoverCode {
    export type RequestParams = {
      code: string;
    };
    export type RequestQuery = {};
    export type RequestBody = RecoverCompleteBody;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostAccountRecoverCodeData;
  }
}
