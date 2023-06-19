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
  DeleteRatingMangaIdData,
  GetRatingData,
  PostRatingMangaIdData,
  PostRatingMangaIdPayload,
} from "./data-contracts";

export namespace Rating {
  /**
   * No description
   * @tags Rating
   * @name GetRating
   * @summary Get your ratings
   * @request GET:/rating
   * @secure
   */
  export namespace GetRating {
    export type RequestParams = {};
    export type RequestQuery = {
      manga: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRatingData;
  }

  /**
   * No description
   * @tags Rating
   * @name PostRatingMangaId
   * @summary Create or update Manga rating
   * @request POST:/rating/{mangaId}
   * @secure
   */
  export namespace PostRatingMangaId {
    export type RequestParams = {
      /** @format uuid */
      mangaId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PostRatingMangaIdPayload;
    export type RequestHeaders = {};
    export type ResponseBody = PostRatingMangaIdData;
  }

  /**
   * No description
   * @tags Rating
   * @name DeleteRatingMangaId
   * @summary Delete Manga rating
   * @request DELETE:/rating/{mangaId}
   * @secure
   */
  export namespace DeleteRatingMangaId {
    export type RequestParams = {
      /** @format uuid */
      mangaId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteRatingMangaIdData;
  }
}
