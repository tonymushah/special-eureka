import { Offset_limits, Order } from "../../internal/Utils";

export default interface UserSearchType {
  offset_Limits: Offset_limits;
  username?: string;
  ids?: Array<string>;
  order?: Order;
}
