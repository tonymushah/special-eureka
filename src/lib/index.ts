// place files you want to import through the `$lib` alias in this folder.

import type { Readable } from "svelte/store";

export type StoreOrVal<T> = T | Readable<T>;