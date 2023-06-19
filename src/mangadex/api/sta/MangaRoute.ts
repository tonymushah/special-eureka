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
  GetMangaAggregateData,
  GetMangaChapterReadmarkers2Data,
  GetMangaChapterReadmarkersData,
  GetMangaDraftsData,
  GetMangaIdData,
  GetMangaIdDraftData,
  GetMangaIdFeedData,
  GetMangaIdStatusData,
  GetMangaRandomData,
  GetMangaRelationData,
  GetMangaStatusData,
  GetMangaTagData,
  GetSearchMangaData,
  MangaCreate,
  MangaRelationCreate,
  PostMangaChapterReadmarkersData,
  PostMangaData,
  PostMangaIdFollowData,
  PostMangaIdListListIdData,
  PostMangaIdStatusData,
  PostMangaRelationData,
  PutMangaIdData,
  PutMangaIdPayload,
  ReferenceExpansionChapter,
  ReferenceExpansionManga,
  ReferenceExpansionMangaRelation,
  UpdateMangaStatus,
} from "./data-contracts";

export namespace Manga {
  /**
   * @description Search a list of Manga.
   * @tags Manga
   * @name GetSearchManga
   * @summary Manga list
   * @request GET:/manga
   */
  export namespace GetSearchManga {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 0
       * @max 100
       * @default 10
       * @pattern ^\d+$
       */
      limit?: number;
      /**
       * @min 0
       * @pattern ^\d+$
       */
      offset?: number;
      title?: string;
      /** @format uuid */
      authorOrArtist?: string;
      "authors[]"?: string[];
      "artists[]"?: string[];
      /** Year of release or none */
      year?: number | "none";
      "includedTags[]"?: string[];
      /** @default "AND" */
      includedTagsMode?: "AND" | "OR";
      "excludedTags[]"?: string[];
      /** @default "OR" */
      excludedTagsMode?: "AND" | "OR";
      "status[]"?: ("ongoing" | "completed" | "hiatus" | "cancelled")[];
      "originalLanguage[]"?: string[];
      "excludedOriginalLanguage[]"?: string[];
      "availableTranslatedLanguage[]"?: string[];
      "publicationDemographic[]"?: ("shounen" | "shoujo" | "josei" | "seinen" | "none")[];
      /** Manga ids (limited to 100 per request) */
      "ids[]"?: string[];
      /** @default ["safe","suggestive","erotica"] */
      "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
       */
      createdAtSince?: string;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
       */
      updatedAtSince?: string;
      /** @default {"latestUploadedChapter":"desc"} */
      order?: {
        title?: "asc" | "desc";
        year?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        latestUploadedChapter?: "asc" | "desc";
        followedCount?: "asc" | "desc";
        relevance?: "asc" | "desc";
        rating?: "asc" | "desc";
      };
      /** Reference expansion options for manga entities or lists */
      "includes[]"?: ReferenceExpansionManga;
      hasAvailableChapters?: "0" | "1" | "true" | "false";
      /** @format uuid */
      group?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetSearchMangaData;
  }

  /**
   * @description Create a new Manga.
   * @tags Manga
   * @name PostManga
   * @summary Create Manga
   * @request POST:/manga
   * @secure
   */
  export namespace PostManga {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MangaCreate;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostMangaData;
  }

  /**
   * No description
   * @tags Manga
   * @name GetMangaAggregate
   * @summary Get Manga volumes & chapters
   * @request GET:/manga/{id}/aggregate
   */
  export namespace GetMangaAggregate {
    export type RequestParams = {
      /**
       * Manga ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {
      "translatedLanguage[]"?: string[];
      "groups[]"?: string[];
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaAggregateData;
  }

  /**
   * @description Get Manga.
   * @tags Manga
   * @name GetMangaId
   * @summary Get Manga
   * @request GET:/manga/{id}
   */
  export namespace GetMangaId {
    export type RequestParams = {
      /**
       * Manga ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {
      /** Reference expansion options for manga entities or lists */
      "includes[]"?: ReferenceExpansionManga;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaIdData;
  }

  /**
   * No description
   * @tags Manga
   * @name PutMangaId
   * @summary Update Manga
   * @request PUT:/manga/{id}
   * @secure
   */
  export namespace PutMangaId {
    export type RequestParams = {
      /**
       * Manga ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = PutMangaIdPayload;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PutMangaIdData;
  }

  /**
   * No description
   * @tags Manga
   * @name DeleteMangaId
   * @summary Delete Manga
   * @request DELETE:/manga/{id}
   * @secure
   */
  export namespace DeleteMangaId {
    export type RequestParams = {
      /**
       * Manga ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteMangaIdData;
  }

  /**
   * No description
   * @tags CustomList
   * @name PostMangaIdListListId
   * @summary Add Manga in CustomList
   * @request POST:/manga/{id}/list/{listId}
   * @secure
   */
  export namespace PostMangaIdListListId {
    export type RequestParams = {
      /**
       * Manga ID
       * @format uuid
       */
      id: string;
      /**
       * CustomList ID
       * @format uuid
       */
      listId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PostMangaIdListListIdData;
  }

  /**
   * No description
   * @tags CustomList
   * @name DeleteMangaIdListListId
   * @summary Remove Manga in CustomList
   * @request DELETE:/manga/{id}/list/{listId}
   * @secure
   */
  export namespace DeleteMangaIdListListId {
    export type RequestParams = {
      /**
       * Manga ID
       * @format uuid
       */
      id: string;
      /**
       * CustomList ID
       * @format uuid
       */
      listId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteMangaIdListListIdData;
  }

  /**
   * No description
   * @tags Manga
   * @name DeleteMangaIdFollow
   * @summary Unfollow Manga
   * @request DELETE:/manga/{id}/follow
   * @secure
   */
  export namespace DeleteMangaIdFollow {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteMangaIdFollowData;
  }

  /**
   * No description
   * @tags Manga
   * @name PostMangaIdFollow
   * @summary Follow Manga
   * @request POST:/manga/{id}/follow
   * @secure
   */
  export namespace PostMangaIdFollow {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PostMangaIdFollowData;
  }

  /**
   * No description
   * @tags Manga
   * @name GetMangaIdFeed
   * @summary Manga feed
   * @request GET:/manga/{id}/feed
   */
  export namespace GetMangaIdFeed {
    export type RequestParams = {
      /**
       * Manga ID
       * @format uuid
       */
      id: string;
    };
    export type RequestQuery = {
      /**
       * @min 1
       * @max 500
       * @default 100
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
      "translatedLanguage[]"?: string[];
      "originalLanguage[]"?: string[];
      "excludedOriginalLanguage[]"?: string[];
      /** @default ["safe","suggestive","erotica"] */
      "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
      "excludedGroups[]"?: string[];
      "excludedUploaders[]"?: string[];
      /** @default "1" */
      includeFutureUpdates?: "0" | "1";
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
       */
      createdAtSince?: string;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
       */
      updatedAtSince?: string;
      /**
       * DateTime string with following format: YYYY-MM-DDTHH:MM:SS in timezone UTC+0
       * @pattern ^\d{4}-[0-1]\d-([0-2]\d|3[0-1])T([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$
       */
      publishAtSince?: string;
      order?: {
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
        publishAt?: "asc" | "desc";
        readableAt?: "asc" | "desc";
        volume?: "asc" | "desc";
        chapter?: "asc" | "desc";
      };
      /** Reference expansion options for chapter entities or lists */
      "includes[]"?: ReferenceExpansionChapter;
      includeEmptyPages?: 0 | 1;
      includeFuturePublishAt?: 0 | 1;
      includeExternalUrl?: 0 | 1;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaIdFeedData;
  }

  /**
   * @description A list of chapter ids that are marked as read for the specified manga
   * @tags ReadMarker
   * @name GetMangaChapterReadmarkers
   * @summary Manga read markers
   * @request GET:/manga/{id}/read
   * @secure
   */
  export namespace GetMangaChapterReadmarkers {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaChapterReadmarkersData;
  }

  /**
   * @description Send a lot of chapter ids for one manga to mark as read and/or unread
   * @tags ReadMarker
   * @name PostMangaChapterReadmarkers
   * @summary Manga read markers batch
   * @request POST:/manga/{id}/read
   * @secure
   */
  export namespace PostMangaChapterReadmarkers {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {
      /** Adding this will cause the chapter to be stored in the user's reading history */
      updateHistory?: boolean;
    };
    export type RequestBody = ChapterReadMarkerBatch;
    export type RequestHeaders = {};
    export type ResponseBody = PostMangaChapterReadmarkersData;
  }

  /**
   * @description A list of chapter ids that are marked as read for the given manga ids
   * @tags ReadMarker
   * @name GetMangaChapterReadmarkers2
   * @summary Manga read markers
   * @request GET:/manga/read
   * @secure
   */
  export namespace GetMangaChapterReadmarkers2 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Manga ids */
      "ids[]": string[];
      /** Group results by manga ids */
      grouped?: boolean;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaChapterReadmarkers2Data;
  }

  /**
   * No description
   * @tags Manga
   * @name GetMangaRandom
   * @summary Get a random Manga
   * @request GET:/manga/random
   */
  export namespace GetMangaRandom {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Reference expansion options for manga entities or lists */
      "includes[]"?: ReferenceExpansionManga;
      /** @default ["safe","suggestive","erotica"] */
      "contentRating[]"?: ("safe" | "suggestive" | "erotica" | "pornographic")[];
      "includedTags[]"?: string[];
      /** @default "AND" */
      includedTagsMode?: "AND" | "OR";
      "excludedTags[]"?: string[];
      /** @default "OR" */
      excludedTagsMode?: "AND" | "OR";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaRandomData;
  }

  /**
   * No description
   * @tags Manga
   * @name GetMangaTag
   * @summary Tag list
   * @request GET:/manga/tag
   */
  export namespace GetMangaTag {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaTagData;
  }

  /**
   * No description
   * @tags Manga
   * @name GetMangaStatus
   * @summary Get all Manga reading status for logged User
   * @request GET:/manga/status
   * @secure
   */
  export namespace GetMangaStatus {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Used to filter the list by given status */
      status?: "reading" | "on_hold" | "plan_to_read" | "dropped" | "re_reading" | "completed";
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaStatusData;
  }

  /**
   * No description
   * @tags Manga
   * @name GetMangaIdStatus
   * @summary Get a Manga reading status
   * @request GET:/manga/{id}/status
   * @secure
   */
  export namespace GetMangaIdStatus {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaIdStatusData;
  }

  /**
   * No description
   * @tags Manga
   * @name PostMangaIdStatus
   * @summary Update Manga reading status
   * @request POST:/manga/{id}/status
   * @secure
   */
  export namespace PostMangaIdStatus {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateMangaStatus;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostMangaIdStatusData;
  }

  /**
   * No description
   * @tags Manga
   * @name GetMangaIdDraft
   * @summary Get a specific Manga Draft
   * @request GET:/manga/draft/{id}
   * @secure
   */
  export namespace GetMangaIdDraft {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {
      /** Reference expansion options for manga entities or lists */
      "includes[]"?: ReferenceExpansionManga;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaIdDraftData;
  }

  /**
   * No description
   * @tags Manga
   * @name CommitMangaDraft
   * @summary Submit a Manga Draft
   * @request POST:/manga/draft/{id}/commit
   * @secure
   */
  export namespace CommitMangaDraft {
    export type RequestParams = {
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = CommitMangaDraftPayload;
    export type RequestHeaders = {};
    export type ResponseBody = CommitMangaDraftData;
  }

  /**
   * No description
   * @tags Manga
   * @name GetMangaDrafts
   * @summary Get a list of Manga Drafts
   * @request GET:/manga/draft
   * @secure
   */
  export namespace GetMangaDrafts {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * @min 1
       * @max 100
       * @default 10
       */
      limit?: number;
      /** @min 0 */
      offset?: number;
      state?: "draft" | "submitted" | "rejected";
      /** @default {"createdAt":"desc"} */
      order?: {
        title?: "asc" | "desc";
        year?: "asc" | "desc";
        createdAt?: "asc" | "desc";
        updatedAt?: "asc" | "desc";
      };
      /** Reference expansion options for manga entities or lists */
      "includes[]"?: ReferenceExpansionManga;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaDraftsData;
  }

  /**
   * No description
   * @tags Manga
   * @name GetMangaRelation
   * @summary Manga relation list
   * @request GET:/manga/{mangaId}/relation
   */
  export namespace GetMangaRelation {
    export type RequestParams = {
      /** @format uuid */
      mangaId: string;
    };
    export type RequestQuery = {
      /** Reference expansion options for manga relation entities or lists */
      "includes[]"?: ReferenceExpansionMangaRelation;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMangaRelationData;
  }

  /**
   * @description Create a new Manga relation.
   * @tags Manga
   * @name PostMangaRelation
   * @summary Create Manga relation
   * @request POST:/manga/{mangaId}/relation
   * @secure
   */
  export namespace PostMangaRelation {
    export type RequestParams = {
      /** @format uuid */
      mangaId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = MangaRelationCreate;
    export type RequestHeaders = {
      /** @default "application/json" */
      "Content-Type": string;
    };
    export type ResponseBody = PostMangaRelationData;
  }

  /**
   * No description
   * @tags Manga
   * @name DeleteMangaRelationId
   * @summary Delete Manga relation
   * @request DELETE:/manga/{mangaId}/relation/{id}
   * @secure
   */
  export namespace DeleteMangaRelationId {
    export type RequestParams = {
      /** @format uuid */
      mangaId: string;
      /** @format uuid */
      id: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteMangaRelationIdData;
  }
}
