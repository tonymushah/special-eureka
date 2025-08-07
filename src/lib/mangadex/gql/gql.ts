/* eslint-disable */
import * as types from "./graphql";
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
	"\n\tquery customlistPageQuery($id: UUID!, $private: Boolean) {\n\t\tcustomList {\n\t\t\tget(id: $id, private: $private) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\tvisibility\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\ttitlesIds\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CustomlistPageQueryDocument;
	"\n\tquery isChapterDownloaded($id: UUID!) {\n\t\tchapter {\n\t\t\tisDownloaded(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n": typeof types.IsChapterDownloadedDocument;
	"\n\tsubscription watchChapterDownloadState($id: UUID!) {\n\t\twatchDownloadState(objectId: $id) {\n\t\t\thasFailed\n\t\t\tisDownloaded\n\t\t}\n\t}\n": typeof types.WatchChapterDownloadStateDocument;
	"\n\tquery recentlyAddedHome {\n\t\thome {\n\t\t\trecentlyUploaded {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tpages\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\tvolume\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmanga {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RecentlyAddedHomeDocument;
	"\n\tquery homePopularTitle {\n\t\thome {\n\t\t\tpopularTitles {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.HomePopularTitleDocument;
	"\n\tquery recentlyAddedHomeQuery {\n\t\thome {\n\t\t\trecentlyAdded(params: { limit: 15 }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RecentlyAddedHomeQueryDocument;
	"\n\tquery seasonal {\n\t\thome {\n\t\t\tseasonal {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.SeasonalDocument;
	"\n\tquery staffPicks {\n\t\thome {\n\t\t\tstaffPicks {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.StaffPicksDocument;
	"\n\tquery getUserLoggedCustomLists($offset: Int, $limit: Int) {\n\t\tcustomList {\n\t\t\tcurrentLoggedLists(params: { limit: $limit, offset: $offset }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetUserLoggedCustomListsDocument;
	"\n\tmutation addOrRemoveTitleToCustomList(\n\t\t$manga_id: UUID!\n\t\t$addTo: [UUID!]!\n\t\t$removeFrom: [UUID!]!\n\t) {\n\t\tmanga {\n\t\t\taddToListBatch(customLists: $addTo, mangaId: $manga_id)\n\t\t\tremoveFromListBatch(customLists: $removeFrom, mangaId: $manga_id)\n\t\t}\n\t}\n": typeof types.AddOrRemoveTitleToCustomListDocument;
	"\n\tmutation createCustomList($mangaId: UUID!, $visibility: CustomListVisibility!, $name: String!) {\n\t\tcustomList {\n\t\t\tcreate(params: { manga: [$mangaId], visibility: $visibility, name: $name }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CreateCustomListDocument;
	"\n\tmutation createEmptyCustomList($visibility: CustomListVisibility!, $name: String!) {\n\t\tcustomList {\n\t\t\tcreate(params: { visibility: $visibility, name: $name }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CreateEmptyCustomListDocument;
	"\n\tmutation mangaListMutation($style: MangaListStyle!) {\n\t\tuserOption {\n\t\t\tsetMangaListStyle(mangaListStyle: $style)\n\t\t}\n\t}\n": typeof types.MangaListMutationDocument;
	"\n\tsubscription mangaListStyleSub {\n\t\twatchMangaListStyle\n\t}\n": typeof types.MangaListStyleSubDocument;
	"\n\tquery mangaAggregate($id: UUID!, $size: Int = 3) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tchunked(chunkSize: $size, isReversed: true) {\n\t\t\t\t\tids\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tcount\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.MangaAggregateDocument;
	"\n\tquery getMangaAggregateChapter($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids, includeExternalUrl: EXCLUDE }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangaAggregateChapterDocument;
	"\n\tquery chapterAggregateComments($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ChapterAggregateCommentsDocument;
	"\n\tquery getMangaCovers($id: UUID!, $offset: Int = 0, $limit: Int = 10) {\n\t\tcover {\n\t\t\tlist(\n\t\t\t\tparams: {\n\t\t\t\t\tmangaIds: [$id]\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: { volume: ASCENDING }\n\t\t\t\t}\n\t\t\t) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tfileName\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tlocale\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\ttotal\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangaCoversDocument;
	"\n\tquery getRelatedTitlesData($ids: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetRelatedTitlesDataDocument;
	"\n\tquery getMangatoReadAggregate($id: UUID!) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tdefault {\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangatoReadAggregateDocument;
	"\n\tquery authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {\n\t\tauthor {\n\t\t\tlist(params: { name: $name, offset: $offset, limit: $limit }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AuthorSearchFetcherDocument;
	"\n\tmutation multiChapterDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tdownload(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n": typeof types.MultiChapterDownloadBaseDocument;
	"\n\tmutation multiChapterCancelDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n": typeof types.MultiChapterCancelDownloadBaseDocument;
	"\n\tmutation removeMultipleChapterMutationBase($id: UUID!) {\n\t\tchapter {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n": typeof types.RemoveMultipleChapterMutationBaseDocument;
	"\n\tquery getChaptersIDsAsFeed($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(feedContent: false, chapterListParams:  {\n\t\t\t\tchapterIds: $ids\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetChaptersIDsAsFeedDocument;
	"\n\tmutation justDownloadingTitle($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id){\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n": typeof types.JustDownloadingTitleDocument;
	"\n\tmutation addTitleToListBatch($mangas: [UUID!]!, $customList: UUID!) {\n\t\tcustomList {\n\t\t\taddMangaBatch(listId: $customList, mangaIds: $mangas)\n\t\t}\n\t}\n": typeof types.AddTitleToListBatchDocument;
	"\n\tquery getTitleTitles($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: {\n\t\t\t\tmangaIds: $titles\n\t\t\t}, excludeContentProfile: true) {\n\t\t\t\tdata{\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetTitleTitlesDocument;
	"\n\tmutation updateReadingStatuses($titles: [UUID!]!, $status: ReadingStatus) {\n\t\tmanga {\n\t\t\tupdateReadingStatusBatch(mangaIds: $titles, status: $status)\n\t\t}\n\t}\n": typeof types.UpdateReadingStatusesDocument;
	"\n\tmutation followTitlesBatch($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tfollowBatch(mangaIds: $titles)\n\t\t}\n\t}\n": typeof types.FollowTitlesBatchDocument;
	"\n\tmutation unfollowTitlesBatch($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tunfollowBatch(mangaIds: $titles)\n\t\t}\n\t}\n": typeof types.UnfollowTitlesBatchDocument;
	"\n\tquery userMeOnSidebarFooter {\n\t\tuser {\n\t\t\tme {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserMeOnSidebarFooterDocument;
	"\n\tmutation setSidebarDirection($direction: Direction!) {\n\t\tuserOption {\n\t\t\tsetSidebarDirection(direction: $direction)\n\t\t}\n\t}\n": typeof types.SetSidebarDirectionDocument;
	"\n\tsubscription watchDefaultContentProfile {\n\t\twatchContentProfileDefault {\n\t\t\toriginalLanguages\n\t\t\tpublicationDemographic\n\t\t\tincludedTags\n\t\t\tincludedTagsMode\n\t\t\texcludedTags\n\t\t\texcludedTagsMode\n\t\t\tstatus\n\t\t\texcludedOriginalLanguage\n\t\t\ttranslatedLanguages\n\t\t\tcontentRating\n\t\t\texcludedGroups\n\t\t\texcludedUploaders\n\t\t}\n\t}\n": typeof types.WatchDefaultContentProfileDocument;
	"\n\tmutation updateDefaultContentProfile($entry: ContentProfileInput!) {\n\t\tuserOption {\n\t\t\tupdateDefaultContentProfile(profile: $entry) {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UpdateDefaultContentProfileDocument;
	"\n\tquery getDefaultContentProfile {\n\t\tuserOption {\n\t\t\tgetDefaultContentProfile {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetDefaultContentProfileDocument;
	"\n\tsubscription watchDefaultContentProfileKey {\n\t\twatchContentProfileDefaultName\n\t}\n": typeof types.WatchDefaultContentProfileKeyDocument;
	"\n\tmutation updateDefaultContentProfileKey($name: String) {\n\t\tuserOption {\n\t\t\tsetDefaultContentProfileKey(name: $name)\n\t\t}\n\t}\n": typeof types.UpdateDefaultContentProfileKeyDocument;
	"\n\tsubscription watchContentProfiles {\n\t\twatchContentProfiles {\n\t\t\tname\n\t\t\tvalue {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n": typeof types.WatchContentProfilesDocument;
	"\n\tmutation updateContentProfiles($entries: [ContentProfileEntryInput!]!) {\n\t\tuserOption {\n\t\t\tsetContentProfiles(entries: $entries)\n\t\t}\n\t}\n": typeof types.UpdateContentProfilesDocument;
	"\n\tmutation updateContentProfile($name: String!, $entry: ContentProfileInput) {\n\t\tuserOption {\n\t\t\tsetContentProfile(name: $name, profile: $entry) {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UpdateContentProfileDocument;
	"\n\tmutation downloadChapterMutation($id: UUID!, $quality: DownloadMode) {\n\t\tchapter {\n\t\t\tdownload(id: $id, quality: $quality) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n": typeof types.DownloadChapterMutationDocument;
	"\n\tmutation cancelDownloadChapterMutation($id: UUID!) {\n\t\tchapter {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n": typeof types.CancelDownloadChapterMutationDocument;
	"\n\tsubscription chapterDownloadState($id: UUID!, $deferred: Boolean) {\n\t\twatchChapterDownloadState(chapterId: $id, deferred: $deferred) {\n\t\t\tisPending\n\t\t\tisDone\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\terror\n\t\t\tdownloading {\n\t\t\t\tisPreloading\n\t\t\t\tisFetchingData\n\t\t\t\tfetchingImage {\n\t\t\t\t\tfilename\n\t\t\t\t\tindex\n\t\t\t\t\tlen\n\t\t\t\t}\n\t\t\t\tisFetchingAtHomeData\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ChapterDownloadStateDocument;
	"\n\tmutation removeDownloadedChapter($id: UUID!) {\n\t\tchapter {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n": typeof types.RemoveDownloadedChapterDocument;
	"\n\tquery chapterDownloadStateQ($id: UUID!) {\n\t\tdownloadState {\n\t\t\tchapter(chapterId: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ChapterDownloadStateQDocument;
	"\n\tmutation downloadCover($id: UUID!) {\n\t\tcover {\n\t\t\tdownload(id: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n": typeof types.DownloadCoverDocument;
	"\n\tmutation cancelDownloadCover($id: UUID!) {\n\t\tcover {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n": typeof types.CancelDownloadCoverDocument;
	"\n\tquery coverDownloadState($id: UUID!) {\n\t\tdownloadState {\n\t\t\tcover(coverId: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CoverDownloadStateDocument;
	"\n\tsubscription coverDownloadSub($id: UUID!, $deferred: Boolean) {\n\t\twatchCoverDownloadState(coverId: $id, deferred: $deferred) {\n\t\t\tisDone\n\t\t\tisPending\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\tdownloading\n\t\t\terror\n\t\t}\n\t}\n": typeof types.CoverDownloadSubDocument;
	"\n\tmutation coverRemoveMutation($id: UUID!) {\n\t\tcover {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n": typeof types.CoverRemoveMutationDocument;
	"\n\tmutation downloadManga($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n": typeof types.DownloadMangaDocument;
	"\n\tmutation cancelDownloadManga($id: UUID!) {\n\t\tmanga {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n": typeof types.CancelDownloadMangaDocument;
	"\n\tquery mangaDownloadState($id: UUID!) {\n\t\tdownloadState {\n\t\t\tmanga(mangaId: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n": typeof types.MangaDownloadStateDocument;
	"\n\tsubscription mangaDownloadSub($id: UUID!, $deferred: Boolean) {\n\t\twatchMangaDownloadState(mangaId: $id, deferred: $deferred) {\n\t\t\tisDone\n\t\t\tisPending\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\tdownloading\n\t\t\terror\n\t\t}\n\t}\n": typeof types.MangaDownloadSubDocument;
	"\n\tmutation mangaRemoveMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n": typeof types.MangaRemoveMutationDocument;
	"\n\tquery allTags {\n\t\ttag {\n\t\t\tlist {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tgroup\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AllTagsDocument;
	"\n\tsubscription rtlSidebarSub {\n\t\twatchSidebarDirection\n\t}\n": typeof types.RtlSidebarSubDocument;
	"\n\tsubscription userMe {\n\t\twatchUserMe {\n\t\t\tusername\n\t\t\troles\n\t\t}\n\t}\n": typeof types.UserMeDocument;
	"\n\tsubscription isLogged {\n\t\twatchIsLogged\n\t}\n": typeof types.IsLoggedDocument;
	"\n\tquery authCheck {\n\t\tauth {\n\t\t\tcheck {\n\t\t\t\tisAuthenticated\n\t\t\t\troles\n\t\t\t\tpermissions\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AuthCheckDocument;
	"\n\tsubscription chapterFeedStyleSub {\n\t\twatchChapterFeedStyle\n\t}\n": typeof types.ChapterFeedStyleSubDocument;
	"\n\tmutation updateChapterFeedStyle($style: ChapterFeedStyle!) {\n\t\tuserOption {\n\t\t\tsetChapterFeedStyle(style: $style)\n\t\t}\n\t}\n": typeof types.UpdateChapterFeedStyleDocument;
	"\n\tsubscription chapterLayoutSubscription {\n\t\twatchChapterLayout {\n\t\t\tdrawer\n\t\t\tsidebar\n\t\t}\n\t}\n": typeof types.ChapterLayoutSubscriptionDocument;
	"\n\tmutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode) {\n\t\tuserOption {\n\t\t\tsetChapterLayout(sidebar: $sidebar, drawer: $drawer) {\n\t\t\t\tsidebar\n\t\t\t\tdrawer\n\t\t\t}\n\t\t}\n\t}\n": typeof types.SetChapterLayoutDocument;
	"\n\tsubscription chapterQualitySubscription {\n\t\twatchChapterQuality\n\t}\n": typeof types.ChapterQualitySubscriptionDocument;
	"\n\tmutation chapterQualityMutation($quality: DownloadMode) {\n\t\tuserOption {\n\t\t\tsetChapterQuality(quality: $quality)\n\t\t}\n\t}\n": typeof types.ChapterQualityMutationDocument;
	"\n\tsubscription currentClientInfo {\n\t\twatchClientInfo {\n\t\t\tclientSecret\n\t\t\tclientId\n\t\t}\n\t}\n": typeof types.CurrentClientInfoDocument;
	"\n\tmutation setAuthClient($clientId: String!, $clientSecret: String!) {\n\t\toauth {\n\t\t\tsetClientInfo(clientId: $clientId, clientSecret: $clientSecret)\n\t\t}\n\t}\n": typeof types.SetAuthClientDocument;
	"\n\tmutation resetAuthClient {\n\t\toauth {\n\t\t\tclearClientInfo\n\t\t}\n\t}\n": typeof types.ResetAuthClientDocument;
	"\n\tsubscription mangaFollowingStatusSubscription($id: UUID!) {\n\t\twatchIsFollowingManga(mangaId: $id)\n\t}\n": typeof types.MangaFollowingStatusSubscriptionDocument;
	"\n\tquery mangaFollowingStatusQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingManga(id: $id)\n\t\t}\n\t}\n": typeof types.MangaFollowingStatusQueryDocument;
	"\n\tmutation followMangaMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n": typeof types.FollowMangaMutationDocument;
	"\n\tmutation unfollowMangaMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n": typeof types.UnfollowMangaMutationDocument;
	"\n\tsubscription mangaRatingSubscription($id: UUID!) {\n\t\twatchRating(mangaId: $id) {\n\t\t\trating\n\t\t}\n\t}\n": typeof types.MangaRatingSubscriptionDocument;
	"\n\tquery getMangaRating($id: UUID!) {\n\t\trating {\n\t\t\tlists(mangaIds: [$id]) {\n\t\t\t\trating\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangaRatingDocument;
	"\n\tmutation updateMangaRating($id: UUID!, $rating: Int!) {\n\t\trating {\n\t\t\tcreateUpdate(params: { mangaId: $id, rating: $rating })\n\t\t}\n\t}\n": typeof types.UpdateMangaRatingDocument;
	"\n\tmutation deleteMangaRating($id: UUID!) {\n\t\trating {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n": typeof types.DeleteMangaRatingDocument;
	"\n\tsubscription mangaReadingStatusSubscription($id: UUID!) {\n\t\twatchMangaReadingState(mangaId: $id)\n\t}\n": typeof types.MangaReadingStatusSubscriptionDocument;
	"\n\tquery mangaReadingStatusQuery($id: UUID!) {\n\t\tmanga {\n\t\t\treadingStatus(id: $id)\n\t\t}\n\t}\n": typeof types.MangaReadingStatusQueryDocument;
	"\n\tmutation mangaReadingStatusMutation($id: UUID!, $status: ReadingStatus) {\n\t\tmanga {\n\t\t\tupdateReadingStatus(id: $id, status: $status)\n\t\t}\n\t}\n": typeof types.MangaReadingStatusMutationDocument;
	"\n\tquery offlineConfig {\n\t\tuserOption {\n\t\t\tgetOfflineConfig {\n\t\t\t\tdataDir\n\t\t\t\tmangasDir\n\t\t\t\tcoversDir\n\t\t\t\tchaptersDir\n\t\t\t}\n\t\t}\n\t}\n": typeof types.OfflineConfigDocument;
	"\n\tmutation updateOfflineConfig($cfg: OfflineConfigInput!) {\n\t\tuserOption {\n\t\t\tsetOfflineConfig(cfg: $cfg) {\n\t\t\t\tdataDir\n\t\t\t\tmangasDir\n\t\t\t\tcoversDir\n\t\t\t\tchaptersDir\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UpdateOfflineConfigDocument;
	"\n\tsubscription serverIconState {\n\t\twatchIsAppMounted\n\t}\n": typeof types.ServerIconStateDocument;
	"\n\tsubscription pageLimitSubscription {\n\t\twatchPageLimit\n\t}\n": typeof types.PageLimitSubscriptionDocument;
	"\n\tmutation setPageLimit($limit: Int) {\n\t\tuserOption {\n\t\t\tsetPageLimit(value: $limit)\n\t\t}\n\t}\n": typeof types.SetPageLimitDocument;
	"\n\tsubscription paginationStyleUpdate {\n\t\twatchPaginationStyle\n\t}\n": typeof types.PaginationStyleUpdateDocument;
	"\n\tmutation updatePaginationStyle($style: PaginationStyle!) {\n\t\tuserOption {\n\t\t\tsetPaginationStyle(style: $style)\n\t\t}\n\t}\n": typeof types.UpdatePaginationStyleDocument;
	"\n\tsubscription defaultThemeProfileSubscription {\n\t\twatchThemeProfileDefault {\n\t\t\ttextColor\n\t\t\tmainBackground\n\t\t\taccents {\n\t\t\t\tdefault {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl1 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl2 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl3 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl4 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl5 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t}\n\t\t\tmidTone\n\t\t\tcontrast {\n\t\t\t\tl1\n\t\t\t}\n\t\t\tscrollbar {\n\t\t\t\tdefault\n\t\t\t\thovered\n\t\t\t}\n\t\t\tbutton {\n\t\t\t\tdefault\n\t\t\t\talternate\n\t\t\t}\n\t\t\tprimary {\n\t\t\t\tprimary\n\t\t\t\tprimary1\n\t\t\t\tprimary2\n\t\t\t}\n\t\t\tstatus {\n\t\t\t\tred\n\t\t\t\tgrey\n\t\t\t\tgreen\n\t\t\t\tyellow\n\t\t\t\tblue\n\t\t\t\tgrey\n\t\t\t\tpurple\n\t\t\t}\n\t\t\tindication {\n\t\t\t\tblue\n\t\t\t}\n\t\t\tdanger {\n\t\t\t\tdefault\n\t\t\t\tl1\n\t\t\t\tl2\n\t\t\t}\n\t\t}\n\t}\n": typeof types.DefaultThemeProfileSubscriptionDocument;
	"\n\tmutation updateDefaultTheme($theme: MangaDexThemeInput!) {\n\t\tuserOption {\n\t\t\tupdateDefaultTheme(theme: $theme) {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UpdateDefaultThemeDocument;
	"\n\tsubscription defaultThemeProfileKeySubscription {\n\t\twatchThemeProfileDefaultName\n\t}\n": typeof types.DefaultThemeProfileKeySubscriptionDocument;
	"\n\tmutation updateDefaultThemeProfileKey($key: String) {\n\t\tuserOption {\n\t\t\tsetDefaultThemeProfile(name: $key)\n\t\t}\n\t}\n": typeof types.UpdateDefaultThemeProfileKeyDocument;
	"\n\tsubscription themeProfilesSubscription {\n\t\twatchThemesProfile {\n\t\t\tname\n\t\t\tvalue {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ThemeProfilesSubscriptionDocument;
	"\n\tmutation updateThemeProfiles($themes: [ThemeProfileEntryInput!]!) {\n\t\tuserOption {\n\t\t\tsetThemeProfiles(entries: $themes)\n\t\t}\n\t}\n": typeof types.UpdateThemeProfilesDocument;
	"\n\tmutation updateThemeProfile($name: String!, $theme: MangaDexThemeInput) {\n\t\tuserOption {\n\t\t\tsetThemeProfile(name: $name, theme: $theme) {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UpdateThemeProfileDocument;
	"\n\tquery coverImage(\n\t\t$cover_id: UUID!\n\t\t$manga_id: UUID!\n\t\t$filename: String!\n\t\t$mode: CoverImageQuality\n\t) {\n\t\tcover {\n\t\t\tgetImage(coverId: $cover_id, mangaId: $manga_id, filename: $filename, mode: $mode)\n\t\t}\n\t}\n": typeof types.CoverImageDocument;
	"\n\tquery favicon($url: Url!) {\n\t\tutils {\n\t\t\tfavicon(url: $url)\n\t\t}\n\t}\n": typeof types.FaviconDocument;
	"\n\tquery getLanguageFromStr($lang: String!) {\n\t\tutils {\n\t\t\tstrToLanguage(input: $lang)\n\t\t}\n\t}\n": typeof types.GetLanguageFromStrDocument;
	"\n\tquery getAuthExpiration {\n\t\tuserOption {\n\t\t\tgetAuthDateTimeLimit\n\t\t}\n\t}\n": typeof types.GetAuthExpirationDocument;
	"\n\t\t\t\tmutation mountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.MountAppStateDocument;
	"\n\t\t\t\tmutation unmountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tunmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.UnmountAppStateDocument;
	"\n\tquery chaptersStats($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ChaptersStatsDocument;
};
const documents: Documents = {
	"\n\tquery customlistPageQuery($id: UUID!, $private: Boolean) {\n\t\tcustomList {\n\t\t\tget(id: $id, private: $private) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\tvisibility\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\ttitlesIds\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CustomlistPageQueryDocument,
	"\n\tquery isChapterDownloaded($id: UUID!) {\n\t\tchapter {\n\t\t\tisDownloaded(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n":
		types.IsChapterDownloadedDocument,
	"\n\tsubscription watchChapterDownloadState($id: UUID!) {\n\t\twatchDownloadState(objectId: $id) {\n\t\t\thasFailed\n\t\t\tisDownloaded\n\t\t}\n\t}\n":
		types.WatchChapterDownloadStateDocument,
	"\n\tquery recentlyAddedHome {\n\t\thome {\n\t\t\trecentlyUploaded {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tpages\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\tvolume\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmanga {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.RecentlyAddedHomeDocument,
	"\n\tquery homePopularTitle {\n\t\thome {\n\t\t\tpopularTitles {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.HomePopularTitleDocument,
	"\n\tquery recentlyAddedHomeQuery {\n\t\thome {\n\t\t\trecentlyAdded(params: { limit: 15 }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.RecentlyAddedHomeQueryDocument,
	"\n\tquery seasonal {\n\t\thome {\n\t\t\tseasonal {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.SeasonalDocument,
	"\n\tquery staffPicks {\n\t\thome {\n\t\t\tstaffPicks {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.StaffPicksDocument,
	"\n\tquery getUserLoggedCustomLists($offset: Int, $limit: Int) {\n\t\tcustomList {\n\t\t\tcurrentLoggedLists(params: { limit: $limit, offset: $offset }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetUserLoggedCustomListsDocument,
	"\n\tmutation addOrRemoveTitleToCustomList(\n\t\t$manga_id: UUID!\n\t\t$addTo: [UUID!]!\n\t\t$removeFrom: [UUID!]!\n\t) {\n\t\tmanga {\n\t\t\taddToListBatch(customLists: $addTo, mangaId: $manga_id)\n\t\t\tremoveFromListBatch(customLists: $removeFrom, mangaId: $manga_id)\n\t\t}\n\t}\n":
		types.AddOrRemoveTitleToCustomListDocument,
	"\n\tmutation createCustomList($mangaId: UUID!, $visibility: CustomListVisibility!, $name: String!) {\n\t\tcustomList {\n\t\t\tcreate(params: { manga: [$mangaId], visibility: $visibility, name: $name }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n":
		types.CreateCustomListDocument,
	"\n\tmutation createEmptyCustomList($visibility: CustomListVisibility!, $name: String!) {\n\t\tcustomList {\n\t\t\tcreate(params: { visibility: $visibility, name: $name }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n":
		types.CreateEmptyCustomListDocument,
	"\n\tmutation mangaListMutation($style: MangaListStyle!) {\n\t\tuserOption {\n\t\t\tsetMangaListStyle(mangaListStyle: $style)\n\t\t}\n\t}\n":
		types.MangaListMutationDocument,
	"\n\tsubscription mangaListStyleSub {\n\t\twatchMangaListStyle\n\t}\n":
		types.MangaListStyleSubDocument,
	"\n\tquery mangaAggregate($id: UUID!, $size: Int = 3) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tchunked(chunkSize: $size, isReversed: true) {\n\t\t\t\t\tids\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tcount\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.MangaAggregateDocument,
	"\n\tquery getMangaAggregateChapter($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids, includeExternalUrl: EXCLUDE }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetMangaAggregateChapterDocument,
	"\n\tquery chapterAggregateComments($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ChapterAggregateCommentsDocument,
	"\n\tquery getMangaCovers($id: UUID!, $offset: Int = 0, $limit: Int = 10) {\n\t\tcover {\n\t\t\tlist(\n\t\t\t\tparams: {\n\t\t\t\t\tmangaIds: [$id]\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: { volume: ASCENDING }\n\t\t\t\t}\n\t\t\t) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tfileName\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tlocale\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\ttotal\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetMangaCoversDocument,
	"\n\tquery getRelatedTitlesData($ids: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetRelatedTitlesDataDocument,
	"\n\tquery getMangatoReadAggregate($id: UUID!) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tdefault {\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetMangatoReadAggregateDocument,
	"\n\tquery authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {\n\t\tauthor {\n\t\t\tlist(params: { name: $name, offset: $offset, limit: $limit }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.AuthorSearchFetcherDocument,
	"\n\tmutation multiChapterDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tdownload(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n":
		types.MultiChapterDownloadBaseDocument,
	"\n\tmutation multiChapterCancelDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n":
		types.MultiChapterCancelDownloadBaseDocument,
	"\n\tmutation removeMultipleChapterMutationBase($id: UUID!) {\n\t\tchapter {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n":
		types.RemoveMultipleChapterMutationBaseDocument,
	"\n\tquery getChaptersIDsAsFeed($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(feedContent: false, chapterListParams:  {\n\t\t\t\tchapterIds: $ids\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetChaptersIDsAsFeedDocument,
	"\n\tmutation justDownloadingTitle($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id){\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n":
		types.JustDownloadingTitleDocument,
	"\n\tmutation addTitleToListBatch($mangas: [UUID!]!, $customList: UUID!) {\n\t\tcustomList {\n\t\t\taddMangaBatch(listId: $customList, mangaIds: $mangas)\n\t\t}\n\t}\n":
		types.AddTitleToListBatchDocument,
	"\n\tquery getTitleTitles($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: {\n\t\t\t\tmangaIds: $titles\n\t\t\t}, excludeContentProfile: true) {\n\t\t\t\tdata{\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetTitleTitlesDocument,
	"\n\tmutation updateReadingStatuses($titles: [UUID!]!, $status: ReadingStatus) {\n\t\tmanga {\n\t\t\tupdateReadingStatusBatch(mangaIds: $titles, status: $status)\n\t\t}\n\t}\n":
		types.UpdateReadingStatusesDocument,
	"\n\tmutation followTitlesBatch($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tfollowBatch(mangaIds: $titles)\n\t\t}\n\t}\n":
		types.FollowTitlesBatchDocument,
	"\n\tmutation unfollowTitlesBatch($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tunfollowBatch(mangaIds: $titles)\n\t\t}\n\t}\n":
		types.UnfollowTitlesBatchDocument,
	"\n\tquery userMeOnSidebarFooter {\n\t\tuser {\n\t\t\tme {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserMeOnSidebarFooterDocument,
	"\n\tmutation setSidebarDirection($direction: Direction!) {\n\t\tuserOption {\n\t\t\tsetSidebarDirection(direction: $direction)\n\t\t}\n\t}\n":
		types.SetSidebarDirectionDocument,
	"\n\tsubscription watchDefaultContentProfile {\n\t\twatchContentProfileDefault {\n\t\t\toriginalLanguages\n\t\t\tpublicationDemographic\n\t\t\tincludedTags\n\t\t\tincludedTagsMode\n\t\t\texcludedTags\n\t\t\texcludedTagsMode\n\t\t\tstatus\n\t\t\texcludedOriginalLanguage\n\t\t\ttranslatedLanguages\n\t\t\tcontentRating\n\t\t\texcludedGroups\n\t\t\texcludedUploaders\n\t\t}\n\t}\n":
		types.WatchDefaultContentProfileDocument,
	"\n\tmutation updateDefaultContentProfile($entry: ContentProfileInput!) {\n\t\tuserOption {\n\t\t\tupdateDefaultContentProfile(profile: $entry) {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n":
		types.UpdateDefaultContentProfileDocument,
	"\n\tquery getDefaultContentProfile {\n\t\tuserOption {\n\t\t\tgetDefaultContentProfile {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetDefaultContentProfileDocument,
	"\n\tsubscription watchDefaultContentProfileKey {\n\t\twatchContentProfileDefaultName\n\t}\n":
		types.WatchDefaultContentProfileKeyDocument,
	"\n\tmutation updateDefaultContentProfileKey($name: String) {\n\t\tuserOption {\n\t\t\tsetDefaultContentProfileKey(name: $name)\n\t\t}\n\t}\n":
		types.UpdateDefaultContentProfileKeyDocument,
	"\n\tsubscription watchContentProfiles {\n\t\twatchContentProfiles {\n\t\t\tname\n\t\t\tvalue {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n":
		types.WatchContentProfilesDocument,
	"\n\tmutation updateContentProfiles($entries: [ContentProfileEntryInput!]!) {\n\t\tuserOption {\n\t\t\tsetContentProfiles(entries: $entries)\n\t\t}\n\t}\n":
		types.UpdateContentProfilesDocument,
	"\n\tmutation updateContentProfile($name: String!, $entry: ContentProfileInput) {\n\t\tuserOption {\n\t\t\tsetContentProfile(name: $name, profile: $entry) {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n":
		types.UpdateContentProfileDocument,
	"\n\tmutation downloadChapterMutation($id: UUID!, $quality: DownloadMode) {\n\t\tchapter {\n\t\t\tdownload(id: $id, quality: $quality) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n":
		types.DownloadChapterMutationDocument,
	"\n\tmutation cancelDownloadChapterMutation($id: UUID!) {\n\t\tchapter {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n":
		types.CancelDownloadChapterMutationDocument,
	"\n\tsubscription chapterDownloadState($id: UUID!, $deferred: Boolean) {\n\t\twatchChapterDownloadState(chapterId: $id, deferred: $deferred) {\n\t\t\tisPending\n\t\t\tisDone\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\terror\n\t\t\tdownloading {\n\t\t\t\tisPreloading\n\t\t\t\tisFetchingData\n\t\t\t\tfetchingImage {\n\t\t\t\t\tfilename\n\t\t\t\t\tindex\n\t\t\t\t\tlen\n\t\t\t\t}\n\t\t\t\tisFetchingAtHomeData\n\t\t\t}\n\t\t}\n\t}\n":
		types.ChapterDownloadStateDocument,
	"\n\tmutation removeDownloadedChapter($id: UUID!) {\n\t\tchapter {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n":
		types.RemoveDownloadedChapterDocument,
	"\n\tquery chapterDownloadStateQ($id: UUID!) {\n\t\tdownloadState {\n\t\t\tchapter(chapterId: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n":
		types.ChapterDownloadStateQDocument,
	"\n\tmutation downloadCover($id: UUID!) {\n\t\tcover {\n\t\t\tdownload(id: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n":
		types.DownloadCoverDocument,
	"\n\tmutation cancelDownloadCover($id: UUID!) {\n\t\tcover {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n":
		types.CancelDownloadCoverDocument,
	"\n\tquery coverDownloadState($id: UUID!) {\n\t\tdownloadState {\n\t\t\tcover(coverId: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n":
		types.CoverDownloadStateDocument,
	"\n\tsubscription coverDownloadSub($id: UUID!, $deferred: Boolean) {\n\t\twatchCoverDownloadState(coverId: $id, deferred: $deferred) {\n\t\t\tisDone\n\t\t\tisPending\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\tdownloading\n\t\t\terror\n\t\t}\n\t}\n":
		types.CoverDownloadSubDocument,
	"\n\tmutation coverRemoveMutation($id: UUID!) {\n\t\tcover {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n":
		types.CoverRemoveMutationDocument,
	"\n\tmutation downloadManga($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n":
		types.DownloadMangaDocument,
	"\n\tmutation cancelDownloadManga($id: UUID!) {\n\t\tmanga {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n":
		types.CancelDownloadMangaDocument,
	"\n\tquery mangaDownloadState($id: UUID!) {\n\t\tdownloadState {\n\t\t\tmanga(mangaId: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n":
		types.MangaDownloadStateDocument,
	"\n\tsubscription mangaDownloadSub($id: UUID!, $deferred: Boolean) {\n\t\twatchMangaDownloadState(mangaId: $id, deferred: $deferred) {\n\t\t\tisDone\n\t\t\tisPending\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\tdownloading\n\t\t\terror\n\t\t}\n\t}\n":
		types.MangaDownloadSubDocument,
	"\n\tmutation mangaRemoveMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n":
		types.MangaRemoveMutationDocument,
	"\n\tquery allTags {\n\t\ttag {\n\t\t\tlist {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tgroup\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.AllTagsDocument,
	"\n\tsubscription rtlSidebarSub {\n\t\twatchSidebarDirection\n\t}\n":
		types.RtlSidebarSubDocument,
	"\n\tsubscription userMe {\n\t\twatchUserMe {\n\t\t\tusername\n\t\t\troles\n\t\t}\n\t}\n":
		types.UserMeDocument,
	"\n\tsubscription isLogged {\n\t\twatchIsLogged\n\t}\n": types.IsLoggedDocument,
	"\n\tquery authCheck {\n\t\tauth {\n\t\t\tcheck {\n\t\t\t\tisAuthenticated\n\t\t\t\troles\n\t\t\t\tpermissions\n\t\t\t}\n\t\t}\n\t}\n":
		types.AuthCheckDocument,
	"\n\tsubscription chapterFeedStyleSub {\n\t\twatchChapterFeedStyle\n\t}\n":
		types.ChapterFeedStyleSubDocument,
	"\n\tmutation updateChapterFeedStyle($style: ChapterFeedStyle!) {\n\t\tuserOption {\n\t\t\tsetChapterFeedStyle(style: $style)\n\t\t}\n\t}\n":
		types.UpdateChapterFeedStyleDocument,
	"\n\tsubscription chapterLayoutSubscription {\n\t\twatchChapterLayout {\n\t\t\tdrawer\n\t\t\tsidebar\n\t\t}\n\t}\n":
		types.ChapterLayoutSubscriptionDocument,
	"\n\tmutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode) {\n\t\tuserOption {\n\t\t\tsetChapterLayout(sidebar: $sidebar, drawer: $drawer) {\n\t\t\t\tsidebar\n\t\t\t\tdrawer\n\t\t\t}\n\t\t}\n\t}\n":
		types.SetChapterLayoutDocument,
	"\n\tsubscription chapterQualitySubscription {\n\t\twatchChapterQuality\n\t}\n":
		types.ChapterQualitySubscriptionDocument,
	"\n\tmutation chapterQualityMutation($quality: DownloadMode) {\n\t\tuserOption {\n\t\t\tsetChapterQuality(quality: $quality)\n\t\t}\n\t}\n":
		types.ChapterQualityMutationDocument,
	"\n\tsubscription currentClientInfo {\n\t\twatchClientInfo {\n\t\t\tclientSecret\n\t\t\tclientId\n\t\t}\n\t}\n":
		types.CurrentClientInfoDocument,
	"\n\tmutation setAuthClient($clientId: String!, $clientSecret: String!) {\n\t\toauth {\n\t\t\tsetClientInfo(clientId: $clientId, clientSecret: $clientSecret)\n\t\t}\n\t}\n":
		types.SetAuthClientDocument,
	"\n\tmutation resetAuthClient {\n\t\toauth {\n\t\t\tclearClientInfo\n\t\t}\n\t}\n":
		types.ResetAuthClientDocument,
	"\n\tsubscription mangaFollowingStatusSubscription($id: UUID!) {\n\t\twatchIsFollowingManga(mangaId: $id)\n\t}\n":
		types.MangaFollowingStatusSubscriptionDocument,
	"\n\tquery mangaFollowingStatusQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingManga(id: $id)\n\t\t}\n\t}\n":
		types.MangaFollowingStatusQueryDocument,
	"\n\tmutation followMangaMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n":
		types.FollowMangaMutationDocument,
	"\n\tmutation unfollowMangaMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n":
		types.UnfollowMangaMutationDocument,
	"\n\tsubscription mangaRatingSubscription($id: UUID!) {\n\t\twatchRating(mangaId: $id) {\n\t\t\trating\n\t\t}\n\t}\n":
		types.MangaRatingSubscriptionDocument,
	"\n\tquery getMangaRating($id: UUID!) {\n\t\trating {\n\t\t\tlists(mangaIds: [$id]) {\n\t\t\t\trating\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetMangaRatingDocument,
	"\n\tmutation updateMangaRating($id: UUID!, $rating: Int!) {\n\t\trating {\n\t\t\tcreateUpdate(params: { mangaId: $id, rating: $rating })\n\t\t}\n\t}\n":
		types.UpdateMangaRatingDocument,
	"\n\tmutation deleteMangaRating($id: UUID!) {\n\t\trating {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n":
		types.DeleteMangaRatingDocument,
	"\n\tsubscription mangaReadingStatusSubscription($id: UUID!) {\n\t\twatchMangaReadingState(mangaId: $id)\n\t}\n":
		types.MangaReadingStatusSubscriptionDocument,
	"\n\tquery mangaReadingStatusQuery($id: UUID!) {\n\t\tmanga {\n\t\t\treadingStatus(id: $id)\n\t\t}\n\t}\n":
		types.MangaReadingStatusQueryDocument,
	"\n\tmutation mangaReadingStatusMutation($id: UUID!, $status: ReadingStatus) {\n\t\tmanga {\n\t\t\tupdateReadingStatus(id: $id, status: $status)\n\t\t}\n\t}\n":
		types.MangaReadingStatusMutationDocument,
	"\n\tquery offlineConfig {\n\t\tuserOption {\n\t\t\tgetOfflineConfig {\n\t\t\t\tdataDir\n\t\t\t\tmangasDir\n\t\t\t\tcoversDir\n\t\t\t\tchaptersDir\n\t\t\t}\n\t\t}\n\t}\n":
		types.OfflineConfigDocument,
	"\n\tmutation updateOfflineConfig($cfg: OfflineConfigInput!) {\n\t\tuserOption {\n\t\t\tsetOfflineConfig(cfg: $cfg) {\n\t\t\t\tdataDir\n\t\t\t\tmangasDir\n\t\t\t\tcoversDir\n\t\t\t\tchaptersDir\n\t\t\t}\n\t\t}\n\t}\n":
		types.UpdateOfflineConfigDocument,
	"\n\tsubscription serverIconState {\n\t\twatchIsAppMounted\n\t}\n":
		types.ServerIconStateDocument,
	"\n\tsubscription pageLimitSubscription {\n\t\twatchPageLimit\n\t}\n":
		types.PageLimitSubscriptionDocument,
	"\n\tmutation setPageLimit($limit: Int) {\n\t\tuserOption {\n\t\t\tsetPageLimit(value: $limit)\n\t\t}\n\t}\n":
		types.SetPageLimitDocument,
	"\n\tsubscription paginationStyleUpdate {\n\t\twatchPaginationStyle\n\t}\n":
		types.PaginationStyleUpdateDocument,
	"\n\tmutation updatePaginationStyle($style: PaginationStyle!) {\n\t\tuserOption {\n\t\t\tsetPaginationStyle(style: $style)\n\t\t}\n\t}\n":
		types.UpdatePaginationStyleDocument,
	"\n\tsubscription defaultThemeProfileSubscription {\n\t\twatchThemeProfileDefault {\n\t\t\ttextColor\n\t\t\tmainBackground\n\t\t\taccents {\n\t\t\t\tdefault {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl1 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl2 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl3 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl4 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl5 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t}\n\t\t\tmidTone\n\t\t\tcontrast {\n\t\t\t\tl1\n\t\t\t}\n\t\t\tscrollbar {\n\t\t\t\tdefault\n\t\t\t\thovered\n\t\t\t}\n\t\t\tbutton {\n\t\t\t\tdefault\n\t\t\t\talternate\n\t\t\t}\n\t\t\tprimary {\n\t\t\t\tprimary\n\t\t\t\tprimary1\n\t\t\t\tprimary2\n\t\t\t}\n\t\t\tstatus {\n\t\t\t\tred\n\t\t\t\tgrey\n\t\t\t\tgreen\n\t\t\t\tyellow\n\t\t\t\tblue\n\t\t\t\tgrey\n\t\t\t\tpurple\n\t\t\t}\n\t\t\tindication {\n\t\t\t\tblue\n\t\t\t}\n\t\t\tdanger {\n\t\t\t\tdefault\n\t\t\t\tl1\n\t\t\t\tl2\n\t\t\t}\n\t\t}\n\t}\n":
		types.DefaultThemeProfileSubscriptionDocument,
	"\n\tmutation updateDefaultTheme($theme: MangaDexThemeInput!) {\n\t\tuserOption {\n\t\t\tupdateDefaultTheme(theme: $theme) {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UpdateDefaultThemeDocument,
	"\n\tsubscription defaultThemeProfileKeySubscription {\n\t\twatchThemeProfileDefaultName\n\t}\n":
		types.DefaultThemeProfileKeySubscriptionDocument,
	"\n\tmutation updateDefaultThemeProfileKey($key: String) {\n\t\tuserOption {\n\t\t\tsetDefaultThemeProfile(name: $key)\n\t\t}\n\t}\n":
		types.UpdateDefaultThemeProfileKeyDocument,
	"\n\tsubscription themeProfilesSubscription {\n\t\twatchThemesProfile {\n\t\t\tname\n\t\t\tvalue {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ThemeProfilesSubscriptionDocument,
	"\n\tmutation updateThemeProfiles($themes: [ThemeProfileEntryInput!]!) {\n\t\tuserOption {\n\t\t\tsetThemeProfiles(entries: $themes)\n\t\t}\n\t}\n":
		types.UpdateThemeProfilesDocument,
	"\n\tmutation updateThemeProfile($name: String!, $theme: MangaDexThemeInput) {\n\t\tuserOption {\n\t\t\tsetThemeProfile(name: $name, theme: $theme) {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UpdateThemeProfileDocument,
	"\n\tquery coverImage(\n\t\t$cover_id: UUID!\n\t\t$manga_id: UUID!\n\t\t$filename: String!\n\t\t$mode: CoverImageQuality\n\t) {\n\t\tcover {\n\t\t\tgetImage(coverId: $cover_id, mangaId: $manga_id, filename: $filename, mode: $mode)\n\t\t}\n\t}\n":
		types.CoverImageDocument,
	"\n\tquery favicon($url: Url!) {\n\t\tutils {\n\t\t\tfavicon(url: $url)\n\t\t}\n\t}\n":
		types.FaviconDocument,
	"\n\tquery getLanguageFromStr($lang: String!) {\n\t\tutils {\n\t\t\tstrToLanguage(input: $lang)\n\t\t}\n\t}\n":
		types.GetLanguageFromStrDocument,
	"\n\tquery getAuthExpiration {\n\t\tuserOption {\n\t\t\tgetAuthDateTimeLimit\n\t\t}\n\t}\n":
		types.GetAuthExpirationDocument,
	"\n\t\t\t\tmutation mountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t":
		types.MountAppStateDocument,
	"\n\t\t\t\tmutation unmountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tunmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t":
		types.UnmountAppStateDocument,
	"\n\tquery chaptersStats($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ChaptersStatsDocument
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery customlistPageQuery($id: UUID!, $private: Boolean) {\n\t\tcustomList {\n\t\t\tget(id: $id, private: $private) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\tvisibility\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\ttitlesIds\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery customlistPageQuery($id: UUID!, $private: Boolean) {\n\t\tcustomList {\n\t\t\tget(id: $id, private: $private) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\tvisibility\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\ttitlesIds\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery isChapterDownloaded($id: UUID!) {\n\t\tchapter {\n\t\t\tisDownloaded(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery isChapterDownloaded($id: UUID!) {\n\t\tchapter {\n\t\t\tisDownloaded(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription watchChapterDownloadState($id: UUID!) {\n\t\twatchDownloadState(objectId: $id) {\n\t\t\thasFailed\n\t\t\tisDownloaded\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription watchChapterDownloadState($id: UUID!) {\n\t\twatchDownloadState(objectId: $id) {\n\t\t\thasFailed\n\t\t\tisDownloaded\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery recentlyAddedHome {\n\t\thome {\n\t\t\trecentlyUploaded {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tpages\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\tvolume\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmanga {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery recentlyAddedHome {\n\t\thome {\n\t\t\trecentlyUploaded {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tpages\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\tvolume\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmanga {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery homePopularTitle {\n\t\thome {\n\t\t\tpopularTitles {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery homePopularTitle {\n\t\thome {\n\t\t\tpopularTitles {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery recentlyAddedHomeQuery {\n\t\thome {\n\t\t\trecentlyAdded(params: { limit: 15 }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery recentlyAddedHomeQuery {\n\t\thome {\n\t\t\trecentlyAdded(params: { limit: 15 }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery seasonal {\n\t\thome {\n\t\t\tseasonal {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery seasonal {\n\t\thome {\n\t\t\tseasonal {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery staffPicks {\n\t\thome {\n\t\t\tstaffPicks {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery staffPicks {\n\t\thome {\n\t\t\tstaffPicks {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getUserLoggedCustomLists($offset: Int, $limit: Int) {\n\t\tcustomList {\n\t\t\tcurrentLoggedLists(params: { limit: $limit, offset: $offset }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getUserLoggedCustomLists($offset: Int, $limit: Int) {\n\t\tcustomList {\n\t\t\tcurrentLoggedLists(params: { limit: $limit, offset: $offset }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation addOrRemoveTitleToCustomList(\n\t\t$manga_id: UUID!\n\t\t$addTo: [UUID!]!\n\t\t$removeFrom: [UUID!]!\n\t) {\n\t\tmanga {\n\t\t\taddToListBatch(customLists: $addTo, mangaId: $manga_id)\n\t\t\tremoveFromListBatch(customLists: $removeFrom, mangaId: $manga_id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation addOrRemoveTitleToCustomList(\n\t\t$manga_id: UUID!\n\t\t$addTo: [UUID!]!\n\t\t$removeFrom: [UUID!]!\n\t) {\n\t\tmanga {\n\t\t\taddToListBatch(customLists: $addTo, mangaId: $manga_id)\n\t\t\tremoveFromListBatch(customLists: $removeFrom, mangaId: $manga_id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation createCustomList($mangaId: UUID!, $visibility: CustomListVisibility!, $name: String!) {\n\t\tcustomList {\n\t\t\tcreate(params: { manga: [$mangaId], visibility: $visibility, name: $name }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation createCustomList($mangaId: UUID!, $visibility: CustomListVisibility!, $name: String!) {\n\t\tcustomList {\n\t\t\tcreate(params: { manga: [$mangaId], visibility: $visibility, name: $name }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation createEmptyCustomList($visibility: CustomListVisibility!, $name: String!) {\n\t\tcustomList {\n\t\t\tcreate(params: { visibility: $visibility, name: $name }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation createEmptyCustomList($visibility: CustomListVisibility!, $name: String!) {\n\t\tcustomList {\n\t\t\tcreate(params: { visibility: $visibility, name: $name }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation mangaListMutation($style: MangaListStyle!) {\n\t\tuserOption {\n\t\t\tsetMangaListStyle(mangaListStyle: $style)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation mangaListMutation($style: MangaListStyle!) {\n\t\tuserOption {\n\t\t\tsetMangaListStyle(mangaListStyle: $style)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription mangaListStyleSub {\n\t\twatchMangaListStyle\n\t}\n"
): (typeof documents)["\n\tsubscription mangaListStyleSub {\n\t\twatchMangaListStyle\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery mangaAggregate($id: UUID!, $size: Int = 3) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tchunked(chunkSize: $size, isReversed: true) {\n\t\t\t\t\tids\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tcount\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery mangaAggregate($id: UUID!, $size: Int = 3) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tchunked(chunkSize: $size, isReversed: true) {\n\t\t\t\t\tids\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tcount\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getMangaAggregateChapter($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids, includeExternalUrl: EXCLUDE }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getMangaAggregateChapter($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids, includeExternalUrl: EXCLUDE }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery chapterAggregateComments($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery chapterAggregateComments($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getMangaCovers($id: UUID!, $offset: Int = 0, $limit: Int = 10) {\n\t\tcover {\n\t\t\tlist(\n\t\t\t\tparams: {\n\t\t\t\t\tmangaIds: [$id]\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: { volume: ASCENDING }\n\t\t\t\t}\n\t\t\t) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tfileName\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tlocale\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\ttotal\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getMangaCovers($id: UUID!, $offset: Int = 0, $limit: Int = 10) {\n\t\tcover {\n\t\t\tlist(\n\t\t\t\tparams: {\n\t\t\t\t\tmangaIds: [$id]\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: { volume: ASCENDING }\n\t\t\t\t}\n\t\t\t) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tfileName\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tlocale\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\ttotal\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getRelatedTitlesData($ids: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getRelatedTitlesData($ids: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getMangatoReadAggregate($id: UUID!) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tdefault {\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getMangatoReadAggregate($id: UUID!) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tdefault {\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {\n\t\tauthor {\n\t\t\tlist(params: { name: $name, offset: $offset, limit: $limit }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {\n\t\tauthor {\n\t\t\tlist(params: { name: $name, offset: $offset, limit: $limit }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation multiChapterDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tdownload(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation multiChapterDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tdownload(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation multiChapterCancelDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation multiChapterCancelDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation removeMultipleChapterMutationBase($id: UUID!) {\n\t\tchapter {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation removeMultipleChapterMutationBase($id: UUID!) {\n\t\tchapter {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getChaptersIDsAsFeed($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(feedContent: false, chapterListParams:  {\n\t\t\t\tchapterIds: $ids\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getChaptersIDsAsFeed($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(feedContent: false, chapterListParams:  {\n\t\t\t\tchapterIds: $ids\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation justDownloadingTitle($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id){\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation justDownloadingTitle($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id){\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation addTitleToListBatch($mangas: [UUID!]!, $customList: UUID!) {\n\t\tcustomList {\n\t\t\taddMangaBatch(listId: $customList, mangaIds: $mangas)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation addTitleToListBatch($mangas: [UUID!]!, $customList: UUID!) {\n\t\tcustomList {\n\t\t\taddMangaBatch(listId: $customList, mangaIds: $mangas)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getTitleTitles($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: {\n\t\t\t\tmangaIds: $titles\n\t\t\t}, excludeContentProfile: true) {\n\t\t\t\tdata{\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getTitleTitles($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: {\n\t\t\t\tmangaIds: $titles\n\t\t\t}, excludeContentProfile: true) {\n\t\t\t\tdata{\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateReadingStatuses($titles: [UUID!]!, $status: ReadingStatus) {\n\t\tmanga {\n\t\t\tupdateReadingStatusBatch(mangaIds: $titles, status: $status)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateReadingStatuses($titles: [UUID!]!, $status: ReadingStatus) {\n\t\tmanga {\n\t\t\tupdateReadingStatusBatch(mangaIds: $titles, status: $status)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation followTitlesBatch($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tfollowBatch(mangaIds: $titles)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation followTitlesBatch($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tfollowBatch(mangaIds: $titles)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation unfollowTitlesBatch($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tunfollowBatch(mangaIds: $titles)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation unfollowTitlesBatch($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tunfollowBatch(mangaIds: $titles)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userMeOnSidebarFooter {\n\t\tuser {\n\t\t\tme {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userMeOnSidebarFooter {\n\t\tuser {\n\t\t\tme {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation setSidebarDirection($direction: Direction!) {\n\t\tuserOption {\n\t\t\tsetSidebarDirection(direction: $direction)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation setSidebarDirection($direction: Direction!) {\n\t\tuserOption {\n\t\t\tsetSidebarDirection(direction: $direction)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription watchDefaultContentProfile {\n\t\twatchContentProfileDefault {\n\t\t\toriginalLanguages\n\t\t\tpublicationDemographic\n\t\t\tincludedTags\n\t\t\tincludedTagsMode\n\t\t\texcludedTags\n\t\t\texcludedTagsMode\n\t\t\tstatus\n\t\t\texcludedOriginalLanguage\n\t\t\ttranslatedLanguages\n\t\t\tcontentRating\n\t\t\texcludedGroups\n\t\t\texcludedUploaders\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription watchDefaultContentProfile {\n\t\twatchContentProfileDefault {\n\t\t\toriginalLanguages\n\t\t\tpublicationDemographic\n\t\t\tincludedTags\n\t\t\tincludedTagsMode\n\t\t\texcludedTags\n\t\t\texcludedTagsMode\n\t\t\tstatus\n\t\t\texcludedOriginalLanguage\n\t\t\ttranslatedLanguages\n\t\t\tcontentRating\n\t\t\texcludedGroups\n\t\t\texcludedUploaders\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateDefaultContentProfile($entry: ContentProfileInput!) {\n\t\tuserOption {\n\t\t\tupdateDefaultContentProfile(profile: $entry) {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateDefaultContentProfile($entry: ContentProfileInput!) {\n\t\tuserOption {\n\t\t\tupdateDefaultContentProfile(profile: $entry) {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getDefaultContentProfile {\n\t\tuserOption {\n\t\t\tgetDefaultContentProfile {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getDefaultContentProfile {\n\t\tuserOption {\n\t\t\tgetDefaultContentProfile {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription watchDefaultContentProfileKey {\n\t\twatchContentProfileDefaultName\n\t}\n"
): (typeof documents)["\n\tsubscription watchDefaultContentProfileKey {\n\t\twatchContentProfileDefaultName\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateDefaultContentProfileKey($name: String) {\n\t\tuserOption {\n\t\t\tsetDefaultContentProfileKey(name: $name)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateDefaultContentProfileKey($name: String) {\n\t\tuserOption {\n\t\t\tsetDefaultContentProfileKey(name: $name)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription watchContentProfiles {\n\t\twatchContentProfiles {\n\t\t\tname\n\t\t\tvalue {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription watchContentProfiles {\n\t\twatchContentProfiles {\n\t\t\tname\n\t\t\tvalue {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateContentProfiles($entries: [ContentProfileEntryInput!]!) {\n\t\tuserOption {\n\t\t\tsetContentProfiles(entries: $entries)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateContentProfiles($entries: [ContentProfileEntryInput!]!) {\n\t\tuserOption {\n\t\t\tsetContentProfiles(entries: $entries)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateContentProfile($name: String!, $entry: ContentProfileInput) {\n\t\tuserOption {\n\t\t\tsetContentProfile(name: $name, profile: $entry) {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateContentProfile($name: String!, $entry: ContentProfileInput) {\n\t\tuserOption {\n\t\t\tsetContentProfile(name: $name, profile: $entry) {\n\t\t\t\toriginalLanguages\n\t\t\t\tpublicationDemographic\n\t\t\t\tincludedTags\n\t\t\t\tincludedTagsMode\n\t\t\t\texcludedTags\n\t\t\t\texcludedTagsMode\n\t\t\t\tstatus\n\t\t\t\texcludedOriginalLanguage\n\t\t\t\ttranslatedLanguages\n\t\t\t\tcontentRating\n\t\t\t\texcludedGroups\n\t\t\t\texcludedUploaders\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation downloadChapterMutation($id: UUID!, $quality: DownloadMode) {\n\t\tchapter {\n\t\t\tdownload(id: $id, quality: $quality) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation downloadChapterMutation($id: UUID!, $quality: DownloadMode) {\n\t\tchapter {\n\t\t\tdownload(id: $id, quality: $quality) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation cancelDownloadChapterMutation($id: UUID!) {\n\t\tchapter {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation cancelDownloadChapterMutation($id: UUID!) {\n\t\tchapter {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription chapterDownloadState($id: UUID!, $deferred: Boolean) {\n\t\twatchChapterDownloadState(chapterId: $id, deferred: $deferred) {\n\t\t\tisPending\n\t\t\tisDone\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\terror\n\t\t\tdownloading {\n\t\t\t\tisPreloading\n\t\t\t\tisFetchingData\n\t\t\t\tfetchingImage {\n\t\t\t\t\tfilename\n\t\t\t\t\tindex\n\t\t\t\t\tlen\n\t\t\t\t}\n\t\t\t\tisFetchingAtHomeData\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription chapterDownloadState($id: UUID!, $deferred: Boolean) {\n\t\twatchChapterDownloadState(chapterId: $id, deferred: $deferred) {\n\t\t\tisPending\n\t\t\tisDone\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\terror\n\t\t\tdownloading {\n\t\t\t\tisPreloading\n\t\t\t\tisFetchingData\n\t\t\t\tfetchingImage {\n\t\t\t\t\tfilename\n\t\t\t\t\tindex\n\t\t\t\t\tlen\n\t\t\t\t}\n\t\t\t\tisFetchingAtHomeData\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation removeDownloadedChapter($id: UUID!) {\n\t\tchapter {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation removeDownloadedChapter($id: UUID!) {\n\t\tchapter {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery chapterDownloadStateQ($id: UUID!) {\n\t\tdownloadState {\n\t\t\tchapter(chapterId: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery chapterDownloadStateQ($id: UUID!) {\n\t\tdownloadState {\n\t\t\tchapter(chapterId: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation downloadCover($id: UUID!) {\n\t\tcover {\n\t\t\tdownload(id: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation downloadCover($id: UUID!) {\n\t\tcover {\n\t\t\tdownload(id: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation cancelDownloadCover($id: UUID!) {\n\t\tcover {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation cancelDownloadCover($id: UUID!) {\n\t\tcover {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery coverDownloadState($id: UUID!) {\n\t\tdownloadState {\n\t\t\tcover(coverId: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery coverDownloadState($id: UUID!) {\n\t\tdownloadState {\n\t\t\tcover(coverId: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription coverDownloadSub($id: UUID!, $deferred: Boolean) {\n\t\twatchCoverDownloadState(coverId: $id, deferred: $deferred) {\n\t\t\tisDone\n\t\t\tisPending\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\tdownloading\n\t\t\terror\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription coverDownloadSub($id: UUID!, $deferred: Boolean) {\n\t\twatchCoverDownloadState(coverId: $id, deferred: $deferred) {\n\t\t\tisDone\n\t\t\tisPending\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\tdownloading\n\t\t\terror\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation coverRemoveMutation($id: UUID!) {\n\t\tcover {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation coverRemoveMutation($id: UUID!) {\n\t\tcover {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation downloadManga($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation downloadManga($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation cancelDownloadManga($id: UUID!) {\n\t\tmanga {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation cancelDownloadManga($id: UUID!) {\n\t\tmanga {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery mangaDownloadState($id: UUID!) {\n\t\tdownloadState {\n\t\t\tmanga(mangaId: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery mangaDownloadState($id: UUID!) {\n\t\tdownloadState {\n\t\t\tmanga(mangaId: $id) {\n\t\t\t\thasFailed\n\t\t\t\tisDownloaded\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription mangaDownloadSub($id: UUID!, $deferred: Boolean) {\n\t\twatchMangaDownloadState(mangaId: $id, deferred: $deferred) {\n\t\t\tisDone\n\t\t\tisPending\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\tdownloading\n\t\t\terror\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription mangaDownloadSub($id: UUID!, $deferred: Boolean) {\n\t\twatchMangaDownloadState(mangaId: $id, deferred: $deferred) {\n\t\t\tisDone\n\t\t\tisPending\n\t\t\tisCanceled\n\t\t\tisOfflineAppStateNotLoaded\n\t\t\tdownloading\n\t\t\terror\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation mangaRemoveMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation mangaRemoveMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery allTags {\n\t\ttag {\n\t\t\tlist {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tgroup\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery allTags {\n\t\ttag {\n\t\t\tlist {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tgroup\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription rtlSidebarSub {\n\t\twatchSidebarDirection\n\t}\n"
): (typeof documents)["\n\tsubscription rtlSidebarSub {\n\t\twatchSidebarDirection\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription userMe {\n\t\twatchUserMe {\n\t\t\tusername\n\t\t\troles\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription userMe {\n\t\twatchUserMe {\n\t\t\tusername\n\t\t\troles\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription isLogged {\n\t\twatchIsLogged\n\t}\n"
): (typeof documents)["\n\tsubscription isLogged {\n\t\twatchIsLogged\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery authCheck {\n\t\tauth {\n\t\t\tcheck {\n\t\t\t\tisAuthenticated\n\t\t\t\troles\n\t\t\t\tpermissions\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery authCheck {\n\t\tauth {\n\t\t\tcheck {\n\t\t\t\tisAuthenticated\n\t\t\t\troles\n\t\t\t\tpermissions\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription chapterFeedStyleSub {\n\t\twatchChapterFeedStyle\n\t}\n"
): (typeof documents)["\n\tsubscription chapterFeedStyleSub {\n\t\twatchChapterFeedStyle\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateChapterFeedStyle($style: ChapterFeedStyle!) {\n\t\tuserOption {\n\t\t\tsetChapterFeedStyle(style: $style)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateChapterFeedStyle($style: ChapterFeedStyle!) {\n\t\tuserOption {\n\t\t\tsetChapterFeedStyle(style: $style)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription chapterLayoutSubscription {\n\t\twatchChapterLayout {\n\t\t\tdrawer\n\t\t\tsidebar\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription chapterLayoutSubscription {\n\t\twatchChapterLayout {\n\t\t\tdrawer\n\t\t\tsidebar\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode) {\n\t\tuserOption {\n\t\t\tsetChapterLayout(sidebar: $sidebar, drawer: $drawer) {\n\t\t\t\tsidebar\n\t\t\t\tdrawer\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode) {\n\t\tuserOption {\n\t\t\tsetChapterLayout(sidebar: $sidebar, drawer: $drawer) {\n\t\t\t\tsidebar\n\t\t\t\tdrawer\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription chapterQualitySubscription {\n\t\twatchChapterQuality\n\t}\n"
): (typeof documents)["\n\tsubscription chapterQualitySubscription {\n\t\twatchChapterQuality\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation chapterQualityMutation($quality: DownloadMode) {\n\t\tuserOption {\n\t\t\tsetChapterQuality(quality: $quality)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation chapterQualityMutation($quality: DownloadMode) {\n\t\tuserOption {\n\t\t\tsetChapterQuality(quality: $quality)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription currentClientInfo {\n\t\twatchClientInfo {\n\t\t\tclientSecret\n\t\t\tclientId\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription currentClientInfo {\n\t\twatchClientInfo {\n\t\t\tclientSecret\n\t\t\tclientId\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation setAuthClient($clientId: String!, $clientSecret: String!) {\n\t\toauth {\n\t\t\tsetClientInfo(clientId: $clientId, clientSecret: $clientSecret)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation setAuthClient($clientId: String!, $clientSecret: String!) {\n\t\toauth {\n\t\t\tsetClientInfo(clientId: $clientId, clientSecret: $clientSecret)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation resetAuthClient {\n\t\toauth {\n\t\t\tclearClientInfo\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation resetAuthClient {\n\t\toauth {\n\t\t\tclearClientInfo\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription mangaFollowingStatusSubscription($id: UUID!) {\n\t\twatchIsFollowingManga(mangaId: $id)\n\t}\n"
): (typeof documents)["\n\tsubscription mangaFollowingStatusSubscription($id: UUID!) {\n\t\twatchIsFollowingManga(mangaId: $id)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery mangaFollowingStatusQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingManga(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery mangaFollowingStatusQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingManga(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation followMangaMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation followMangaMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation unfollowMangaMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation unfollowMangaMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription mangaRatingSubscription($id: UUID!) {\n\t\twatchRating(mangaId: $id) {\n\t\t\trating\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription mangaRatingSubscription($id: UUID!) {\n\t\twatchRating(mangaId: $id) {\n\t\t\trating\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getMangaRating($id: UUID!) {\n\t\trating {\n\t\t\tlists(mangaIds: [$id]) {\n\t\t\t\trating\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getMangaRating($id: UUID!) {\n\t\trating {\n\t\t\tlists(mangaIds: [$id]) {\n\t\t\t\trating\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateMangaRating($id: UUID!, $rating: Int!) {\n\t\trating {\n\t\t\tcreateUpdate(params: { mangaId: $id, rating: $rating })\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateMangaRating($id: UUID!, $rating: Int!) {\n\t\trating {\n\t\t\tcreateUpdate(params: { mangaId: $id, rating: $rating })\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation deleteMangaRating($id: UUID!) {\n\t\trating {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation deleteMangaRating($id: UUID!) {\n\t\trating {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription mangaReadingStatusSubscription($id: UUID!) {\n\t\twatchMangaReadingState(mangaId: $id)\n\t}\n"
): (typeof documents)["\n\tsubscription mangaReadingStatusSubscription($id: UUID!) {\n\t\twatchMangaReadingState(mangaId: $id)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery mangaReadingStatusQuery($id: UUID!) {\n\t\tmanga {\n\t\t\treadingStatus(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery mangaReadingStatusQuery($id: UUID!) {\n\t\tmanga {\n\t\t\treadingStatus(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation mangaReadingStatusMutation($id: UUID!, $status: ReadingStatus) {\n\t\tmanga {\n\t\t\tupdateReadingStatus(id: $id, status: $status)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation mangaReadingStatusMutation($id: UUID!, $status: ReadingStatus) {\n\t\tmanga {\n\t\t\tupdateReadingStatus(id: $id, status: $status)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery offlineConfig {\n\t\tuserOption {\n\t\t\tgetOfflineConfig {\n\t\t\t\tdataDir\n\t\t\t\tmangasDir\n\t\t\t\tcoversDir\n\t\t\t\tchaptersDir\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery offlineConfig {\n\t\tuserOption {\n\t\t\tgetOfflineConfig {\n\t\t\t\tdataDir\n\t\t\t\tmangasDir\n\t\t\t\tcoversDir\n\t\t\t\tchaptersDir\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateOfflineConfig($cfg: OfflineConfigInput!) {\n\t\tuserOption {\n\t\t\tsetOfflineConfig(cfg: $cfg) {\n\t\t\t\tdataDir\n\t\t\t\tmangasDir\n\t\t\t\tcoversDir\n\t\t\t\tchaptersDir\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateOfflineConfig($cfg: OfflineConfigInput!) {\n\t\tuserOption {\n\t\t\tsetOfflineConfig(cfg: $cfg) {\n\t\t\t\tdataDir\n\t\t\t\tmangasDir\n\t\t\t\tcoversDir\n\t\t\t\tchaptersDir\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription serverIconState {\n\t\twatchIsAppMounted\n\t}\n"
): (typeof documents)["\n\tsubscription serverIconState {\n\t\twatchIsAppMounted\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription pageLimitSubscription {\n\t\twatchPageLimit\n\t}\n"
): (typeof documents)["\n\tsubscription pageLimitSubscription {\n\t\twatchPageLimit\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation setPageLimit($limit: Int) {\n\t\tuserOption {\n\t\t\tsetPageLimit(value: $limit)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation setPageLimit($limit: Int) {\n\t\tuserOption {\n\t\t\tsetPageLimit(value: $limit)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription paginationStyleUpdate {\n\t\twatchPaginationStyle\n\t}\n"
): (typeof documents)["\n\tsubscription paginationStyleUpdate {\n\t\twatchPaginationStyle\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updatePaginationStyle($style: PaginationStyle!) {\n\t\tuserOption {\n\t\t\tsetPaginationStyle(style: $style)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updatePaginationStyle($style: PaginationStyle!) {\n\t\tuserOption {\n\t\t\tsetPaginationStyle(style: $style)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription defaultThemeProfileSubscription {\n\t\twatchThemeProfileDefault {\n\t\t\ttextColor\n\t\t\tmainBackground\n\t\t\taccents {\n\t\t\t\tdefault {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl1 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl2 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl3 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl4 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl5 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t}\n\t\t\tmidTone\n\t\t\tcontrast {\n\t\t\t\tl1\n\t\t\t}\n\t\t\tscrollbar {\n\t\t\t\tdefault\n\t\t\t\thovered\n\t\t\t}\n\t\t\tbutton {\n\t\t\t\tdefault\n\t\t\t\talternate\n\t\t\t}\n\t\t\tprimary {\n\t\t\t\tprimary\n\t\t\t\tprimary1\n\t\t\t\tprimary2\n\t\t\t}\n\t\t\tstatus {\n\t\t\t\tred\n\t\t\t\tgrey\n\t\t\t\tgreen\n\t\t\t\tyellow\n\t\t\t\tblue\n\t\t\t\tgrey\n\t\t\t\tpurple\n\t\t\t}\n\t\t\tindication {\n\t\t\t\tblue\n\t\t\t}\n\t\t\tdanger {\n\t\t\t\tdefault\n\t\t\t\tl1\n\t\t\t\tl2\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription defaultThemeProfileSubscription {\n\t\twatchThemeProfileDefault {\n\t\t\ttextColor\n\t\t\tmainBackground\n\t\t\taccents {\n\t\t\t\tdefault {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl1 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl2 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl3 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl4 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t\tl5 {\n\t\t\t\t\tdefault\n\t\t\t\t\thover\n\t\t\t\t\tactive\n\t\t\t\t}\n\t\t\t}\n\t\t\tmidTone\n\t\t\tcontrast {\n\t\t\t\tl1\n\t\t\t}\n\t\t\tscrollbar {\n\t\t\t\tdefault\n\t\t\t\thovered\n\t\t\t}\n\t\t\tbutton {\n\t\t\t\tdefault\n\t\t\t\talternate\n\t\t\t}\n\t\t\tprimary {\n\t\t\t\tprimary\n\t\t\t\tprimary1\n\t\t\t\tprimary2\n\t\t\t}\n\t\t\tstatus {\n\t\t\t\tred\n\t\t\t\tgrey\n\t\t\t\tgreen\n\t\t\t\tyellow\n\t\t\t\tblue\n\t\t\t\tgrey\n\t\t\t\tpurple\n\t\t\t}\n\t\t\tindication {\n\t\t\t\tblue\n\t\t\t}\n\t\t\tdanger {\n\t\t\t\tdefault\n\t\t\t\tl1\n\t\t\t\tl2\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateDefaultTheme($theme: MangaDexThemeInput!) {\n\t\tuserOption {\n\t\t\tupdateDefaultTheme(theme: $theme) {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateDefaultTheme($theme: MangaDexThemeInput!) {\n\t\tuserOption {\n\t\t\tupdateDefaultTheme(theme: $theme) {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription defaultThemeProfileKeySubscription {\n\t\twatchThemeProfileDefaultName\n\t}\n"
): (typeof documents)["\n\tsubscription defaultThemeProfileKeySubscription {\n\t\twatchThemeProfileDefaultName\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateDefaultThemeProfileKey($key: String) {\n\t\tuserOption {\n\t\t\tsetDefaultThemeProfile(name: $key)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateDefaultThemeProfileKey($key: String) {\n\t\tuserOption {\n\t\t\tsetDefaultThemeProfile(name: $key)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription themeProfilesSubscription {\n\t\twatchThemesProfile {\n\t\t\tname\n\t\t\tvalue {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription themeProfilesSubscription {\n\t\twatchThemesProfile {\n\t\t\tname\n\t\t\tvalue {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateThemeProfiles($themes: [ThemeProfileEntryInput!]!) {\n\t\tuserOption {\n\t\t\tsetThemeProfiles(entries: $themes)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateThemeProfiles($themes: [ThemeProfileEntryInput!]!) {\n\t\tuserOption {\n\t\t\tsetThemeProfiles(entries: $themes)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateThemeProfile($name: String!, $theme: MangaDexThemeInput) {\n\t\tuserOption {\n\t\t\tsetThemeProfile(name: $name, theme: $theme) {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateThemeProfile($name: String!, $theme: MangaDexThemeInput) {\n\t\tuserOption {\n\t\t\tsetThemeProfile(name: $name, theme: $theme) {\n\t\t\t\ttextColor\n\t\t\t\tmainBackground\n\t\t\t\taccents {\n\t\t\t\t\tdefault {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl1 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl2 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl3 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl4 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t\tl5 {\n\t\t\t\t\t\tdefault\n\t\t\t\t\t\thover\n\t\t\t\t\t\tactive\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tmidTone\n\t\t\t\tcontrast {\n\t\t\t\t\tl1\n\t\t\t\t}\n\t\t\t\tscrollbar {\n\t\t\t\t\tdefault\n\t\t\t\t\thovered\n\t\t\t\t}\n\t\t\t\tbutton {\n\t\t\t\t\tdefault\n\t\t\t\t\talternate\n\t\t\t\t}\n\t\t\t\tprimary {\n\t\t\t\t\tprimary\n\t\t\t\t\tprimary1\n\t\t\t\t\tprimary2\n\t\t\t\t}\n\t\t\t\tstatus {\n\t\t\t\t\tred\n\t\t\t\t\tgrey\n\t\t\t\t\tgreen\n\t\t\t\t\tyellow\n\t\t\t\t\tblue\n\t\t\t\t\tgrey\n\t\t\t\t\tpurple\n\t\t\t\t}\n\t\t\t\tindication {\n\t\t\t\t\tblue\n\t\t\t\t}\n\t\t\t\tdanger {\n\t\t\t\t\tdefault\n\t\t\t\t\tl1\n\t\t\t\t\tl2\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery coverImage(\n\t\t$cover_id: UUID!\n\t\t$manga_id: UUID!\n\t\t$filename: String!\n\t\t$mode: CoverImageQuality\n\t) {\n\t\tcover {\n\t\t\tgetImage(coverId: $cover_id, mangaId: $manga_id, filename: $filename, mode: $mode)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery coverImage(\n\t\t$cover_id: UUID!\n\t\t$manga_id: UUID!\n\t\t$filename: String!\n\t\t$mode: CoverImageQuality\n\t) {\n\t\tcover {\n\t\t\tgetImage(coverId: $cover_id, mangaId: $manga_id, filename: $filename, mode: $mode)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery favicon($url: Url!) {\n\t\tutils {\n\t\t\tfavicon(url: $url)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery favicon($url: Url!) {\n\t\tutils {\n\t\t\tfavicon(url: $url)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getLanguageFromStr($lang: String!) {\n\t\tutils {\n\t\t\tstrToLanguage(input: $lang)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getLanguageFromStr($lang: String!) {\n\t\tutils {\n\t\t\tstrToLanguage(input: $lang)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getAuthExpiration {\n\t\tuserOption {\n\t\t\tgetAuthDateTimeLimit\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getAuthExpiration {\n\t\tuserOption {\n\t\t\tgetAuthDateTimeLimit\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\t\t\t\tmutation mountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"
): (typeof documents)["\n\t\t\t\tmutation mountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\t\t\t\tmutation unmountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tunmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"
): (typeof documents)["\n\t\t\t\tmutation unmountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tunmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery chaptersStats($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery chaptersStats($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];

export function graphql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
