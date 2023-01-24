import { Client } from "@tauri-apps/api/http";
import { Offset_limits, Order } from "../../internal/Utils";

export default interface CoverSearchType {
  offset_Limits: Offset_limits;
  mangaIDs?: Array<string>;
  ids?: Array<string>;
  uploaders?: Array<string>;
  locales?: Array<string>;
  order?: Order;
  includes?: string;
  client? : Client;
}
