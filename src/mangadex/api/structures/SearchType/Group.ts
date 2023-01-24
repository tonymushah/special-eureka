import { Client } from "@tauri-apps/api/http";
import { Offset_limits, Order } from "../../internal/Utils";

export default interface GroupSearchType {
  offset_Limits: Offset_limits;
  name?: string;
  ids?: Array<string>;
  focusedLanguage?: Array<string>;
  includes?: string;
  order?: Order;
  client?: Client
}
