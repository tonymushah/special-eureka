import { Client } from "@tauri-apps/api/http";
import { Offset_limits, Order } from "../../internal/Utils";

export default interface MangaSearchType {
  offset_Limits: Offset_limits;
  title?: string;
  authors?: Array<string>;
  artists?: Array<string>;
  year?: number;
  includedTags?: Array<string>;
  includedTagsMode?: string;
  excludedTags?: Array<string>;
  excludedTagsMode?: string;
  status?: Array<string>;
  originalLanguage?: Array<string>;
  excludedOriginalLanguage?: Array<string>;
  availableTranslatedLanguage?: Array<string>;
  publicationDemographic?: Array<string>;
  mangaIDs?: Array<string>;
  createdAtSince?: string;
  updatedAtSince?: string;
  order?: Order;
  includes?: string;
  hasAvailableChapters?: boolean;
  latestUploadedChapter?: boolean;
  group?: string;
  client? : Client;
  authorOrArtist?: string
}
