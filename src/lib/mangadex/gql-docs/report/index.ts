import { graphql } from "@mangadex/gql/gql";
import type { CreateReportParam, ListReportParams, ReportCategory } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createInfiniteQuery, createMutation, createQuery } from "@tanstack/svelte-query";

export const currentUserReports = graphql(`
	query currentUserReports($params: ListReportParams) {
		report {
			list(params: $params) {
				limit
				offset
				total
				data {
					id
					attributes {
						details
						objectId
						status
						createdAt
					}
				}
			}
		}
	}
`);

export const currentUserReportReason = graphql(`
	query currentUserReportReason($category: ReportCategory!) {
		report {
			listReasonsByCaterogy(params:  {
			   category: $category
			}) {
				data {
					id
					attributes {
						reason
						category
						detailsRequired
					}
				}
				limit
				offset
				total
			}
		}
	}
`);

export const sendReport = graphql(`
	mutation sendReport($params: CreateReportParam!) {
		report {
			create(params: $params) 
		}
	}
`);

/**
 * Must only called inside of a component
 */
export function createCurrentUserReportsQuery(params?: ListReportParams) {
	return createInfiniteQuery(() => ({
		queryKey: ["current-user", "report", "lists", JSON.stringify(params)],
		async queryFn({ pageParam }) {
			const res = await client.query(currentUserReports, {
				params: pageParam
			}).toPromise();
			if (res.data) {
				return res.data.report.list;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("no data??");
			}
		},
		initialPageParam: params,
		getNextPageParam(lastPage) {
			const nextOffset = lastPage.offset + lastPage.limit;
			if (nextOffset >= lastPage.total) {
				return null
			} else {
				return {
					...lastPage,
					offset: nextOffset
				};
			}
		},
		getPreviousPageParam(firstPage) {
			const previousOffset = firstPage.offset - firstPage.limit;
			if (previousOffset <= 0) {
				return null
			} else {
				return {
					...firstPage,
					offset: previousOffset
				}
			}
		},
		networkMode: "online",
	}), () => mangadexQueryClient)
}

/**
 * Must only called inside of a component
 */
export function createReportReasonListQuery(category?: ReportCategory) {
	return createQuery(() => ({
		queryKey: ["report", "reasons", category],
		async queryFn() {
			if (category == undefined) {
				throw new Error("Invalid category entry");
			}
			const res = await client.query(currentUserReportReason, {
				category
			}).toPromise();
			if (res.data) {
				return res.data.report.listReasonsByCaterogy.data
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("no data??");
			}
		},
		networkMode: "online",
		enabled: category != undefined
	}), () => mangadexQueryClient);
};

/**
 * Must only called inside of a component
 */
export function createSendReportMutation() {
	return createMutation(() => ({
		mutationKey: ["send", "report"],
		async mutationFn(params: CreateReportParam) {
			const res = await client.mutation(sendReport, {
				params
			}).toPromise();
			if (res.error) {
				throw res.error
			} else if (res.data) {
				return res.data
			} else {
				throw new Error("no data??");
			}
		},
		networkMode: "online"
	}), () => mangadexQueryClient);
}
