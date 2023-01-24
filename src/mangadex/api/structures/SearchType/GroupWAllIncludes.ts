import { Client } from "@tauri-apps/api/http";
import { Offset_limits, Order } from "../../internal/Utils";

export default interface Group_WithAllRelationShip_SearchType {
  offset_Limits: Offset_limits;
  name?: string | undefined;
  ids?: string[] | undefined;
  focusedLanguage?: string[] | undefined;
  order?: Order | undefined;
  client? : Client;
}
