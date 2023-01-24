import { Client } from "@tauri-apps/api/http";
import { Offset_limits, Order } from "../../internal/Utils";

export default interface AuthorSearchType {
  offset_Limits: Offset_limits;
  name?: string;
  ids?: Array<string>;
  order?: Order;
  includes?: Array<string>;
  client? : Client
}
