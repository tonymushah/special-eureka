import { ReadingStatus } from "@mangadex/gql/graphql";
import getClient from "@mangadex/gql/urql/getClient";
import type { Client } from "@urql/svelte";
import { libraryTitleMapQuery } from ".";

export async function titleStatusMap(options?: TitleStatusMapOptions): Promise<Map<string, ReadingStatus>> {
	const gqlClient = options?.client ?? await getClient();
	const res = await gqlClient.query(libraryTitleMapQuery, {}).toPromise();
	if (res.error) {
		throw res.error
	}
	return new Map(res.data?.manga.getMangaStatus.map((title) => [title.id, title.status]));
}

type TitleStatusMapOptions = {
	client?: Client;
};

export async function titleStatus(titleId: string, options?: TitleStatusMapOptions): Promise<ReadingStatus | undefined> {
	return (await titleStatusMap(options)).get(titleId)
}

export default async function isInLibrary(titleId: string, options?: TitleStatusMapOptions): Promise<boolean> {
	try {
		const status = await titleStatus(titleId, options);
		return status != undefined
	} catch {
		return false;
	}
}

export async function isInLibraryUnlessDropped(titleId: string, options?: TitleStatusMapOptions): Promise<boolean> {
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