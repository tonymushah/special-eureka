import { Offset_limits, Order } from "../../internal/Utils";

export default interface ChapterSearchType {
  offset_limits: Offset_limits;
  ids?: Array<string>;
  title?: string;
  group?: Array<string>;
  uploader?: any;
  manga?: string;
  volume?: any;
  translatedLanguage?: Array<string>;
  originalLanguage?: Array<string>;
  excludedOriginalLanguage?: Array<string>;
  content_rating?: Array<string>;
  excludedGroup?: Array<string>;
  excludedUploaders?: Array<string>;
  includeFutureUpdates?: number;
  createdAtSince?: string;
  updatedAtSince?: string;
  publishAtSince?: string;
  order?: Order;
  includes?: string;
}
