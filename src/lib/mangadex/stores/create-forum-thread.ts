import { createMutation } from "@tanstack/svelte-query";
import { mangadexQueryClient } from "..";
import { graphql } from "@mangadex/gql";
import type { ForumThreadType } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";

const mutation = graphql(`
	mutation createForumThread($id: UUID!, $threadType: ForumThreadType!) {
		forums {
			createThread(params: {
				id: $id,
				type: $threadType
			}) {
				forumId
				forumUrl
				repliesCount
			}
		}
	}
`);

export const createForumThread = () => createMutation(() => ({
	mutationKey: ["create", "forum", "thread"],
	async mutationFn({ id, threadType }: { id: string, threadType: ForumThreadType }) {
		const res = await client.mutation(mutation, {
			id,
			threadType
		}).toPromise();
		if (res.error) {
			throw res.error;
		} else if (res.data) {
			return res.data.forums.createThread
		} else {
			throw new Error("No response?");
		}
	}
}), () => mangadexQueryClient);