import { createReadonlyValue, type ReadonlyValue } from "$lib";
import { Context, type Getter } from "runed";

const key = "top-manga-title";

const ctx = new Context<ReadonlyValue<string>>(key);

export function setTopMangaTitleContextStore(title: Getter<string>) {
	return ctx.set(createReadonlyValue(title));
}

export function getTopMangaTitleContextStore() {
	return ctx.get();
}
