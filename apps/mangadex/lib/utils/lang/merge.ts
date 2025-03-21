import type { LangDataMap } from ".";

export default function merge_lang_data(...data: LangDataMap[]): LangDataMap {
    return new Map(...data)
}