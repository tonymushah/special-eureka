import { ReadingStatus } from "@mangadex/gql/graphql";
import getClient from "@mangadex/gql/urql/getClient";
import { mangadexQueryClient } from "@mangadex/index";
import { createQuery } from "@tanstack/svelte-query";
import type { Client } from "@urql/svelte";
import { libraryTitleMapQuery } from ".";

export async function titleStatusMap(
	options?: TitleStatusMapOptions
): Promise<Map<string, ReadingStatus>> {
	const gqlClient = options?.client ?? (await getClient());
	const res = await gqlClient.query(libraryTitleMapQuery, {}).toPromise();
	if (res.error) {
		throw res.error;
	}
	return new Map(res.data?.manga.getMangaStatus.map((title) => [title.id, title.status]));
}

type TitleStatusMapOptions = {
	client?: Client;
};

export async function titleStatus(
	titleId: string,
	options?: TitleStatusMapOptions
): Promise<ReadingStatus | undefined> {
	return (await titleStatusMap(options)).get(titleId);
}

export default async function isInLibrary(
	titleId: string,
	options?: TitleStatusMapOptions
): Promise<boolean> {
	try {
		const status = await titleStatus(titleId, options);
		return status != undefined;
	} catch {
		return false;
	}
}

export const titleStatusMapQuery = createQuery(() => ({
	networkMode: "online",
	queryKey: ["title", "status", "map", "query"],
	async queryFn() {
		return await titleStatusMap()
	}
}), () => mangadexQueryClient);

export function isInLibrarySync(titleId: string, library: Map<string, ReadingStatus>): boolean {
	const status = library.get(titleId);
	return status != undefined;
}

export function isInLibraryUnlessDroppedSync(
	titleId: string,
	library: Map<string, ReadingStatus>
): boolean {
	const status = library.get(titleId);
	if (status != undefined) {
		if (status != ReadingStatus.Dropped) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

export async function isInLibraryUnlessDropped(
	titleId: string,
	options?: TitleStatusMapOptions
): Promise<boolean> {
	try {
		const status = await titleStatus(titleId, options);
		if (status != undefined) {
			if (status != ReadingStatus.Dropped) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} catch {
		return false;
	}
}
