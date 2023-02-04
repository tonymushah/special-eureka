import { Client } from "@tauri-apps/api/http";

export type AggregateListOptions = {
  mangaID: string;
  translatedLanguage?: Array<string>;
  groups?: Array<string>;
  client?: Client;
};
