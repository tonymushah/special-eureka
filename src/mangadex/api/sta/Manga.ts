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
  ChapterReadMarkerBatch,
  CommitMangaDraftData,
  CommitMangaDraftPayload,
  DeleteMangaIdData,
  DeleteMangaIdFollowData,
  DeleteMangaIdListListIdData,
  DeleteMangaRelationIdData,
  ErrorResponse,
  GetMangaAggregateData,
  GetMangaAggregateParams,
  GetMangaChapterReadmarkers2Data,
  GetMangaChapterReadmarkers2Params,
  GetMangaChapterReadmarkersData,
  GetMangaDraftsData,
  GetMangaDraftsParams,
  GetMangaIdData,
  GetMangaIdDraftData,
  GetMangaIdDraftParams,
  GetMangaIdFeedData,
  GetMangaIdFeedParams,
  GetMangaIdParams,
  GetMangaIdStatusData,
  GetMangaRandomData,
  GetMangaRandomParams,
  GetMangaRelationData,
  GetMangaRelationParams,
  GetMangaStatusData,
  GetMangaStatusParams,
  GetMangaTagData,
  GetSearchMangaData,
  GetSearchMangaParams,
  MangaCreate,
  MangaRelationCreate,
  PostMangaChapterReadmarkersData,
  PostMangaChapterReadmarkersParams,
  PostMangaData,
  PostMangaIdFollowData,
  PostMangaIdListListIdData,
  PostMangaIdStatusData,
  PostMangaRelationData,
  PutMangaIdData,
  PutMangaIdPayload,
  UpdateMangaStatus,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Manga<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Search a list of Manga.
   *
   * @tags Manga
   * @name GetSearchManga
   * @summary Manga list
   * @request GET:/manga
   */
  getSearchManga = (query: GetSearchMangaParams, params: RequestParams = {}) =>
    this.http.request<GetSearchMangaData, ErrorResponse>({
      path: `/manga`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Create a new Manga.
   *
   * @tags Manga
   * @name PostManga
   * @summary Create Manga
   * @request POST:/manga
   * @secure
   */
  postManga = (data: MangaCreate, params: RequestParams = {}) =>
    this.http.request<PostMangaData, ErrorResponse>({
      path: `/manga`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name GetMangaAggregate
   * @summary Get Manga volumes & chapters
   * @request GET:/manga/{id}/aggregate
   */
  getMangaAggregate = ({ id, ...query }: GetMangaAggregateParams, params: RequestParams = {}) =>
    this.http.request<GetMangaAggregateData, any>({
      path: `/manga/${id}/aggregate`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Get Manga.
   *
   * @tags Manga
   * @name GetMangaId
   * @summary Get Manga
   * @request GET:/manga/{id}
   */
  getMangaId = ({ id, ...query }: GetMangaIdParams, params: RequestParams = {}) =>
    this.http.request<GetMangaIdData, ErrorResponse>({
      path: `/manga/${id}`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name PutMangaId
   * @summary Update Manga
   * @request PUT:/manga/{id}
   * @secure
   */
  putMangaId = (id: string, data: PutMangaIdPayload, params: RequestParams = {}) =>
    this.http.request<PutMangaIdData, ErrorResponse>({
      path: `/manga/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name DeleteMangaId
   * @summary Delete Manga
   * @request DELETE:/manga/{id}
   * @secure
   */
  deleteMangaId = (id: string, params: RequestParams = {}) =>
    this.http.request<DeleteMangaIdData, ErrorResponse>({
      path: `/manga/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags CustomList
   * @name PostMangaIdListListId
   * @summary Add Manga in CustomList
   * @request POST:/manga/{id}/list/{listId}
   * @secure
   */
  postMangaIdListListId = (id: string, listId: string, params: RequestParams = {}) =>
    this.http.request<PostMangaIdListListIdData, ErrorResponse>({
      path: `/manga/${id}/list/${listId}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags CustomList
   * @name DeleteMangaIdListListId
   * @summary Remove Manga in CustomList
   * @request DELETE:/manga/{id}/list/{listId}
   * @secure
   */
  deleteMangaIdListListId = (id: string, listId: string, params: RequestParams = {}) =>
    this.http.request<DeleteMangaIdListListIdData, ErrorResponse>({
      path: `/manga/${id}/list/${listId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name DeleteMangaIdFollow
   * @summary Unfollow Manga
   * @request DELETE:/manga/{id}/follow
   * @secure
   */
  deleteMangaIdFollow = (id: string, params: RequestParams = {}) =>
    this.http.request<DeleteMangaIdFollowData, ErrorResponse>({
      path: `/manga/${id}/follow`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name PostMangaIdFollow
   * @summary Follow Manga
   * @request POST:/manga/{id}/follow
   * @secure
   */
  postMangaIdFollow = (id: string, params: RequestParams = {}) =>
    this.http.request<PostMangaIdFollowData, ErrorResponse>({
      path: `/manga/${id}/follow`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name GetMangaIdFeed
   * @summary Manga feed
   * @request GET:/manga/{id}/feed
   */
  getMangaIdFeed = ({ id, ...query }: GetMangaIdFeedParams, params: RequestParams = {}) =>
    this.http.request<GetMangaIdFeedData, ErrorResponse>({
      path: `/manga/${id}/feed`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description A list of chapter ids that are marked as read for the specified manga
   *
   * @tags ReadMarker
   * @name GetMangaChapterReadmarkers
   * @summary Manga read markers
   * @request GET:/manga/{id}/read
   * @secure
   */
  getMangaChapterReadmarkers = (id: string, params: RequestParams = {}) =>
    this.http.request<GetMangaChapterReadmarkersData, any>({
      path: `/manga/${id}/read`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description Send a lot of chapter ids for one manga to mark as read and/or unread
   *
   * @tags ReadMarker
   * @name PostMangaChapterReadmarkers
   * @summary Manga read markers batch
   * @request POST:/manga/{id}/read
   * @secure
   */
  postMangaChapterReadmarkers = (
    { id, ...query }: PostMangaChapterReadmarkersParams,
    data: ChapterReadMarkerBatch,
    params: RequestParams = {},
  ) =>
    this.http.request<PostMangaChapterReadmarkersData, any>({
      path: `/manga/${id}/read`,
      method: "POST",
      query: query,
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description A list of chapter ids that are marked as read for the given manga ids
   *
   * @tags ReadMarker
   * @name GetMangaChapterReadmarkers2
   * @summary Manga read markers
   * @request GET:/manga/read
   * @secure
   */
  getMangaChapterReadmarkers2 = (query: GetMangaChapterReadmarkers2Params, params: RequestParams = {}) =>
    this.http.request<GetMangaChapterReadmarkers2Data, any>({
      path: `/manga/read`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name GetMangaRandom
   * @summary Get a random Manga
   * @request GET:/manga/random
   */
  getMangaRandom = (query: GetMangaRandomParams, params: RequestParams = {}) =>
    this.http.request<GetMangaRandomData, any>({
      path: `/manga/random`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name GetMangaTag
   * @summary Tag list
   * @request GET:/manga/tag
   */
  getMangaTag = (params: RequestParams = {}) =>
    this.http.request<GetMangaTagData, any>({
      path: `/manga/tag`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name GetMangaStatus
   * @summary Get all Manga reading status for logged User
   * @request GET:/manga/status
   * @secure
   */
  getMangaStatus = (query: GetMangaStatusParams, params: RequestParams = {}) =>
    this.http.request<GetMangaStatusData, any>({
      path: `/manga/status`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name GetMangaIdStatus
   * @summary Get a Manga reading status
   * @request GET:/manga/{id}/status
   * @secure
   */
  getMangaIdStatus = (id: string, params: RequestParams = {}) =>
    this.http.request<GetMangaIdStatusData, ErrorResponse>({
      path: `/manga/${id}/status`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name PostMangaIdStatus
   * @summary Update Manga reading status
   * @request POST:/manga/{id}/status
   * @secure
   */
  postMangaIdStatus = (id: string, data: UpdateMangaStatus, params: RequestParams = {}) =>
    this.http.request<PostMangaIdStatusData, ErrorResponse>({
      path: `/manga/${id}/status`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name GetMangaIdDraft
   * @summary Get a specific Manga Draft
   * @request GET:/manga/draft/{id}
   * @secure
   */
  getMangaIdDraft = ({ id, ...query }: GetMangaIdDraftParams, params: RequestParams = {}) =>
    this.http.request<GetMangaIdDraftData, ErrorResponse>({
      path: `/manga/draft/${id}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name CommitMangaDraft
   * @summary Submit a Manga Draft
   * @request POST:/manga/draft/{id}/commit
   * @secure
   */
  commitMangaDraft = (id: string, data: CommitMangaDraftPayload, params: RequestParams = {}) =>
    this.http.request<CommitMangaDraftData, ErrorResponse>({
      path: `/manga/draft/${id}/commit`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name GetMangaDrafts
   * @summary Get a list of Manga Drafts
   * @request GET:/manga/draft
   * @secure
   */
  getMangaDrafts = (query: GetMangaDraftsParams, params: RequestParams = {}) =>
    this.http.request<GetMangaDraftsData, ErrorResponse>({
      path: `/manga/draft`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name GetMangaRelation
   * @summary Manga relation list
   * @request GET:/manga/{mangaId}/relation
   */
  getMangaRelation = ({ mangaId, ...query }: GetMangaRelationParams, params: RequestParams = {}) =>
    this.http.request<GetMangaRelationData, ErrorResponse>({
      path: `/manga/${mangaId}/relation`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Create a new Manga relation.
   *
   * @tags Manga
   * @name PostMangaRelation
   * @summary Create Manga relation
   * @request POST:/manga/{mangaId}/relation
   * @secure
   */
  postMangaRelation = (mangaId: string, data: MangaRelationCreate, params: RequestParams = {}) =>
    this.http.request<PostMangaRelationData, ErrorResponse>({
      path: `/manga/${mangaId}/relation`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Manga
   * @name DeleteMangaRelationId
   * @summary Delete Manga relation
   * @request DELETE:/manga/{mangaId}/relation/{id}
   * @secure
   */
  deleteMangaRelationId = (mangaId: string, id: string, params: RequestParams = {}) =>
    this.http.request<DeleteMangaRelationIdData, ErrorResponse>({
      path: `/manga/${mangaId}/relation/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
