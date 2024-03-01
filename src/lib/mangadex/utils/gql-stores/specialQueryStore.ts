import type {
	AnyVariables,
	Client,
	DocumentInput,
	OperationContext,
	OperationResult
} from "@urql/svelte";
import type { SpecialQueryResult } from ".";
import { writable } from "svelte/store";

type SpecialQueryInput<Data, Variables extends AnyVariables> = {
	client: Client;
	query: DocumentInput<Data, AnyVariables>;
	variable: Variables;
	context?: Partial<OperationContext>;
};

export default function specialQueryStore<
	Data = unknown,
	Variables extends AnyVariables = AnyVariables
>(input: SpecialQueryInput<Data, Variables>): SpecialQueryResult<Data | undefined, Variables> {
	const store = writable<OperationResult<Data, Variables> | undefined>(undefined);
	const isFetching = writable<boolean>(false);
	async function execute() {
		isFetching.set(true);
		const res = await input.client
			.query(input.query, input.variable, input.context)
			.toPromise()
			.finally(() => {
				isFetching.set(false);
			});
		store.set(res);
	}
	return {
		...store,
		execute,
		isFetching
	};
}
