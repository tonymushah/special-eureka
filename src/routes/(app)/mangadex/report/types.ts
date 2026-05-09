import type { ResultOf } from "@graphql-typed-document-node/core";
import type { ReportAttributesFrag } from "@mangadex/gql-docs/report";

type ReportAttributes = ResultOf<typeof ReportAttributesFrag>;

// TODO migrate as store
export enum ReportStatusMode {
	Table,
	Card
}

export type ReportData = {
	id: string;
} & Omit<ReportAttributes, "createdAt"> & {
	createdAt: Date | string
};