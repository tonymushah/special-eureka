import type { ReportAttributes } from "@mangadex/gql/graphql";

// TODO migrate as store
export enum ReportStatusMode {
	Table,
	Card
};

export type ReportData = {
	id: string,
} & ReportAttributes