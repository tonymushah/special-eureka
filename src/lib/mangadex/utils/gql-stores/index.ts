import type {
	AnyVariables,
	Client,
	DocumentInput,
	OperationContext,
	OperationResult
} from "@urql/svelte";
import type { Readable, Writable } from "svelte/store";

export type SpecialQueryInput<Data, Variables extends AnyVariables = AnyVariables> = {
	client: Client;
	query: DocumentInput<Data, Variables>;
	variable: Variables;
	context?: Partial<OperationContext>;
};

export type SpecialQueryResult<Data, Variables extends AnyVariables = AnyVariables> = Writable<
	OperationResult<Data, Variables> | undefined
> & {
	execute: () => Promise<void>;
	isFetching: Readable<boolean>;
};
