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
	"\n\tquery getMangaAggregateChapter($ids: [UUID!]!, $feedContent: Boolean) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids, includeExternalUrl: EXCLUDE }, feedContent: $feedContent) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangaAggregateChapterDocument;
	"\n\tquery chapterAggregateComments($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ChapterAggregateCommentsDocument;
	"\n\tquery getMangaCovers($id: UUID!, $offset: Int = 0, $limit: Int = 10) {\n\t\tcover {\n\t\t\tlist(\n\t\t\t\tparams: {\n\t\t\t\t\tmangaIds: [$id]\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: { volume: ASCENDING }\n\t\t\t\t}\n\t\t\t) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tfileName\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tlocale\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\ttotal\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangaCoversDocument;
	"\n\tquery getRelatedTitlesData($ids: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetRelatedTitlesDataDocument;
	"\n\tquery getMangatoReadAggregate($id: UUID!) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tdefault {\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangatoReadAggregateDocument;
	"\n\tquery authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {\n\t\tauthor {\n\t\t\tlist(params: { name: $name, offset: $offset, limit: $limit }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AuthorSearchFetcherDocument;
	"\n\tmutation multiChapterDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tdownload(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n": typeof types.MultiChapterDownloadBaseDocument;
	"\n\tmutation multiChapterCancelDownloadBase($id: UUID!) {\n\t\tchapter {\n\t\t\tcancelDownload(id: $id)\n\t\t}\n\t}\n": typeof types.MultiChapterCancelDownloadBaseDocument;
	"\n\tmutation removeMultipleChapterMutationBase($id: UUID!) {\n\t\tchapter {\n\t\t\tremove(id: $id)\n\t\t}\n\t}\n": typeof types.RemoveMultipleChapterMutationBaseDocument;
	"\n\tquery getChaptersIDsAsFeed($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(feedContent: false, chapterListParams: { chapterIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetChaptersIDsAsFeedDocument;
	"\n\tmutation justDownloadingTitle($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n": typeof types.JustDownloadingTitleDocument;
	"\n\tmutation addTitleToListBatch($mangas: [UUID!]!, $customList: UUID!) {\n\t\tcustomList {\n\t\t\taddMangaBatch(listId: $customList, mangaIds: $mangas)\n\t\t}\n\t}\n": typeof types.AddTitleToListBatchDocument;
	"\n\tquery getTitleTitles($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $titles }, excludeContentProfile: true) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetTitleTitlesDocument;
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
	"\n\tmutation loginMutation($username: Username!, $password: Password!) {\n\t\toauth {\n\t\t\tlogin(password: $password, username: $username)\n\t\t}\n\t}\n": typeof types.LoginMutationDocument;
	"\n\tmutation logoutMutation {\n\t\toauth {\n\t\t\tlogout\n\t\t}\n\t}\n": typeof types.LogoutMutationDocument;
	"\n\tquery authorPageQuery($id: UUID!) {\n\t\tauthor {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\timageUrl\n\t\t\t\t\tbiography\n\t\t\t\t\ttwitter\n\t\t\t\t\tpixiv\n\t\t\t\t\tmelonBook\n\t\t\t\t\tfanBox\n\t\t\t\t\tbooth\n\t\t\t\t\tnicoVideo\n\t\t\t\t\tskeb\n\t\t\t\t\tfantia\n\t\t\t\t\ttumblr\n\t\t\t\t\tyoutube\n\t\t\t\t\tweibo\n\t\t\t\t\tnaver\n\t\t\t\t\twebsite\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { authorOrArtist: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AuthorPageQueryDocument;
	"\n\tquery authorsSearch($params: AuthorListParams!) {\n\t\tauthor {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tworks {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AuthorsSearchDocument;
	"\n\tsubscription subToChapterImageFit {\n\t\twatchImageFit\n\t}\n": typeof types.SubToChapterImageFitDocument;
	"\n\tmutation updateChapterImageFit($imageFit: ImageFit!) {\n\t\tuserOption {\n\t\t\tsetImageFit(imageFit: $imageFit)\n\t\t}\n\t}\n": typeof types.UpdateChapterImageFitDocument;
	"\n\tsubscription subToChapterLongstripImageWidth {\n\t\twatchLongstripImageWidth\n\t}\n": typeof types.SubToChapterLongstripImageWidthDocument;
	"\n\tmutation updateChapterLongstripImageWidth($width: Float!) {\n\t\tuserOption {\n\t\t\tsetLongstripImageWidth(width: $width)\n\t\t}\n\t}\n": typeof types.UpdateChapterLongstripImageWidthDocument;
	"\n\tsubscription subToChapterReadingDirection {\n\t\twatchPageDirection\n\t}\n": typeof types.SubToChapterReadingDirectionDocument;
	"\n\tmutation updateChapterReadingDirection($direction: Direction!) {\n\t\tuserOption {\n\t\t\tsetPageDirection(direction: $direction)\n\t\t}\n\t}\n": typeof types.UpdateChapterReadingDirectionDocument;
	"\n\tsubscription subToChapterReadingMode {\n\t\twatchReadingMode\n\t}\n": typeof types.SubToChapterReadingModeDocument;
	"\n\tmutation updateChapterReadingMode($mode: ReadingMode!) {\n\t\tuserOption {\n\t\t\tsetReadingMode(mode: $mode)\n\t\t}\n\t}\n": typeof types.UpdateChapterReadingModeDocument;
	"\n\tquery getChapterRelated($mangaId: UUID!, $langs: Language!, $groups: [UUID!]!) {\n\t\tmanga {\n\t\t\taggregate(\n\t\t\t\tparams: { groups: $groups, mangaId: $mangaId, translatedLanguage: [$langs] }\n\t\t\t) {\n\t\t\t\tdefault(isReversed: true) {\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetChapterRelatedDocument;
	"\n\tquery chapterPageThread($id: UUID!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ChapterPageThreadDocument;
	"\n\tquery getChapterPageData($id: UUID!) {\n\t\tchapter {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tvolume\n\t\t\t\t\tchapter\n\t\t\t\t\tpages\n\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\texternalUrl\n\t\t\t\t\treadableAt\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\t\tisLongstrip\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetChapterPageDataDocument;
	"\n\tmutation exportChapterPage($id: UUID!, $page: Int!, $exportPath: String!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $id, mode: $mode) {\n\t\t\t\texportPage(page: $page, exportPath: $exportPath)\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ExportChapterPageDocument;
	"\n\tmutation setContentProfileBlur($blur: Boolean!) {\n\t\tuserOption {\n\t\t\tsetContentProfileBlur(blur: $blur)\n\t\t}\n\t}\n": typeof types.SetContentProfileBlurDocument;
	"\n\tsubscription subContentProfileBlur {\n\t\twatchContentProfileBlur\n\t}\n": typeof types.SubContentProfileBlurDocument;
	"\n\tquery getContentProfileBlur {\n\t\tuserOption {\n\t\t\tgetContentProfileBlur\n\t\t}\n\t}\n": typeof types.GetContentProfileBlurDocument;
	"\n\tmutation setContentProfileWarningMode($mode: ContentProfileWarningMode!) {\n\t\tuserOption {\n\t\t\tsetContentProfileWarningMode(mode: $mode)\n\t\t}\n\t}\n": typeof types.SetContentProfileWarningModeDocument;
	"\n\tquery getContentProfileWarningMode {\n\t\tuserOption {\n\t\t\tgetContentProfileWarningMode\n\t\t}\n\t}\n": typeof types.GetContentProfileWarningModeDocument;
	"\n\tsubscription subContentProfileWarningMode {\n\t\twatchContentProfileWarningMode\n\t}\n": typeof types.SubContentProfileWarningModeDocument;
	"\n\tsubscription listenToMangaTasksIDs {\n\t\twatchMangaTasksList\n\t}\n": typeof types.ListenToMangaTasksIDsDocument;
	"\n\tsubscription listenToChapterTasksIDs {\n\t\twatchChaptersTasksList\n\t}\n": typeof types.ListenToChapterTasksIDsDocument;
	"\n\tsubscription listenToCoverTasksIDs {\n\t\twatchCoverTasksList\n\t}\n": typeof types.ListenToCoverTasksIDsDocument;
	"\n\tmutation exportIdsToTxt($uuids: [UUID!]!, $path: String!) {\n\t\texport {\n\t\t\tuuidsToAsTxt(file: $path, uuids: $uuids)\n\t\t}\n\t}\n": typeof types.ExportIdsToTxtDocument;
	"\n\tmutation setForcePort443($force: Boolean!) {\n\t\tuserOption {\n\t\t\tsetForcePort443(force: $force)\n\t\t}\n\t}\n": typeof types.SetForcePort443Document;
	"\n\tsubscription subForce443 {\n\t\twatchForcePort443\n\t}\n": typeof types.SubForce443Document;
	"\n\tquery groupPageQuery($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tgetUnique(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\twebsite\n\t\t\t\t\ttwitter\n\t\t\t\t\tname\n\t\t\t\t\taltNames\n\t\t\t\t\tircServer\n\t\t\t\t\tircChannel\n\t\t\t\t\tcontactEmail\n\t\t\t\t\tmangaUpdates\n\t\t\t\t\tfocusedLanguages\n\t\t\t\t\tlocked\n\t\t\t\t\tofficial\n\t\t\t\t\tverified\n\t\t\t\t\texLicensed\n\t\t\t\t\tpublishDelay\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tdescription\n\t\t\t\t\tdiscord\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tleader {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmembers {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { group: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t\tstatistics {\n\t\t\tgroup {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { groups: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GroupPageQueryDocument;
	"\n\tmutation followScanlationGroupMutation($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n": typeof types.FollowScanlationGroupMutationDocument;
	"\n\tmutation unfollowScanlationGroupMutation($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n": typeof types.UnfollowScanlationGroupMutationDocument;
	"\n\tquery isFollowingScanlationGroupQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingGroup(id: $id)\n\t\t}\n\t}\n": typeof types.IsFollowingScanlationGroupQueryDocument;
	"\n\tquery groupStatisticsQuery($id: UUID!) {\n\t\tstatistics {\n\t\t\tgroup{\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadId\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GroupStatisticsQueryDocument;
	"\n\tquery scanlationUploadsFeed(\n\t\t$group: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tgroups: [$group]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ScanlationUploadsFeedDocument;
	"\n\tquery scanalationGroupSearch($params: ScanlationGroupListParams!) {\n\t\tscanlationGroup {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tdiscord\n\t\t\t\t\t\twebsite\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmembers {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ScanalationGroupSearchDocument;
	"\n\tquery userFollowedGroups($offset: Int, $limit: Int) {\n\t\tfollows {\n\t\t\tgroups(params:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\taltNames\n\t\t\t\t\t\tdiscord\n\t\t\t\t\t\tircServer\n\t\t\t\t\t\tircChannel\n\t\t\t\t\t\tofficial\n\t\t\t\t\t\tverified\n\t\t\t\t\t\twebsite\n\t\t\t\t\t\ttwitter\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tcontactEmail\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserFollowedGroupsDocument;
	"\n\tquery currentUserLibraryCompleted($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tcompleted(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CurrentUserLibraryCompletedDocument;
	"\n\tquery currentUserLibraryDropped($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tdropped(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CurrentUserLibraryDroppedDocument;
	"\n\tmutation exportLibraryToCSV($options: ExportMDLibraryToCSVOptions!) {\n\t\tlibrary {\n\t\t\texportAsCsv(options: $options)\n\t\t}\n\t}\n": typeof types.ExportLibraryToCsvDocument;
	"\n\tmutation exportLibraryToMyAnimeList($options: MdlibraryToMyAnimeListExportOption!) {\n\t\tlibrary {\n\t\t\texportAsMyAnimeList(options: $options)\n\t\t}\n\t}\n": typeof types.ExportLibraryToMyAnimeListDocument;
	"\n\tquery currentUserLibraryUnfiltered($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tunfiltered(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CurrentUserLibraryUnfilteredDocument;
	"\n\tquery libraryTitleMap($status: ReadingStatus) {\n\t\tmanga {\n\t\t\tgetMangaStatus(status: $status) {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n": typeof types.LibraryTitleMapDocument;
	"\n\tquery currentUserLibraryOnHold($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tonHold(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CurrentUserLibraryOnHoldDocument;
	"\n\tquery currentUserLibraryPlanToRead($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tplanToRead(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CurrentUserLibraryPlanToReadDocument;
	"\n\tquery currentUserLibraryReReading($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\treReading(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CurrentUserLibraryReReadingDocument;
	"\n\tquery currentUserLibraryReading($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\treading(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CurrentUserLibraryReadingDocument;
	"\n\tquery librarySize {\n\t\tlibrary {\n\t\t\tsize {\n\t\t\t\tunfiltered\n\t\t\t\tcompleted\n\t\t\t\tdropped\n\t\t\t\tplanToRead\n\t\t\t\treading\n\t\t\t\treReading\n\t\t\t\tonHold\n\t\t\t}\n\t\t}\n\t}\n": typeof types.LibrarySizeDocument;
	"\n\tquery currentUserCustomLists($params: CurrentLoggedLists!) {\n\t\tcustomList {\n\t\t\tcurrentLoggedLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CurrentUserCustomListsDocument;
	"\n\tmutation exportCustomListsToCSV($options: ExportCustomListsToCSVOptions!) {\n\t\tcustomList {\n\t\t\texport {\n\t\t\t\tasCsv(option: $options)\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ExportCustomListsToCsvDocument;
	"\n\tmutation exportCustomListsToMAL($options: MdcustomListsToMyAnimeListExportOption!) {\n\t\tcustomList {\n\t\t\texport {\n\t\t\t\tasMyAnimeList(option: $options)\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ExportCustomListsToMalDocument;
	"\n\tmutation deleteCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n": typeof types.DeleteCustomListMutationDocument;
	"\n\tquery customListChapterFeed(\n\t\t$feedParam: CustomListMangaFeedParams!\n\t\t$mangaParam: MangaListParams\n\t\t$private: Boolean\n\t) {\n\t\tfeed {\n\t\t\tcustomListFeedGrouped(\n\t\t\t\tfeedParams: $feedParam\n\t\t\t\tmangaListParams: $mangaParam\n\t\t\t\tprivate: $private\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CustomListChapterFeedDocument;
	"\n\tmutation followCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n": typeof types.FollowCustomListMutationDocument;
	"\n\tmutation unfollowCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n": typeof types.UnfollowCustomListMutationDocument;
	"\n\tquery isFollowingCustomListQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingCustomList(id: $id)\n\t\t}\n\t}\n": typeof types.IsFollowingCustomListQueryDocument;
	"\n\tquery getCustomListVersion1($id: UUID!) {\n\t\tcustomList {\n\t\t\tget(id: $id, private: true) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tversion\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetCustomListVersion1Document;
	"\n\tmutation updateCustomListVisibility1(\n\t\t$id: UUID!\n\t\t$visibility: CustomListVisibility!\n\t\t$version: Int!\n\t) {\n\t\tcustomList {\n\t\t\tupdate(params: { listId: $id, version: $version, visibility: $visibility }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UpdateCustomListVisibility1Document;
	"\n\tquery userFollowedCustomLists($limit: Int, $offset: Int) {\n\t\tfollows {\n\t\t\tcustomLists(param:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles \n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserFollowedCustomListsDocument;
	"\n\tsubscription listenToChapterReadMarker($id: UUID!) {\n\t\twatchReadMarker(chapterId: $id)\n\t}\n": typeof types.ListenToChapterReadMarkerDocument;
	"\n\tsubscription listenToAnyChapterReadMarker {\n\t\twatchReadMarkers {\n\t\t\tchapter\n\t\t\tread\n\t\t}\n\t}\n": typeof types.ListenToAnyChapterReadMarkerDocument;
	"\n\tmutation mutateReadMarkersBatch($unreads: [UUID!]!, $read: [UUID!]!, $updateHistory: Boolean) {\n\t\treadMarker {\n\t\t\treadMarkersBatch(\n\t\t\t\tchapterIdsRead: $read\n\t\t\t\tchapterIdsUnread: $unreads\n\t\t\t\tupdateHistory: $updateHistory\n\t\t\t)\n\t\t}\n\t}\n": typeof types.MutateReadMarkersBatchDocument;
	"\n\tquery chaptersReadMarkers($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tchapterReadMarkers(chapters: $ids)\n\t\t}\n\t}\n": typeof types.ChaptersReadMarkersDocument;
	"\n\tquery mangaReadMarkers($id: UUID!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkersByMangaId(mangaId: $id)\n\t\t}\n\t}\n": typeof types.MangaReadMarkersDocument;
	"\n\tquery mangasReadMarkers($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkers(mangaIds: $ids)\n\t\t}\n\t}\n": typeof types.MangasReadMarkersDocument;
	"\n\tquery mangasReadMarkersGrouped($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkersGrouped(mangaIds: $ids) {\n\t\t\t\tmangaId\n\t\t\t\tchapters\n\t\t\t}\n\t\t}\n\t}\n": typeof types.MangasReadMarkersGroupedDocument;
	"\n\tsubscription rtlSidebarSub {\n\t\twatchSidebarDirection\n\t}\n": typeof types.RtlSidebarSubDocument;
	"\n\tquery tagPopulatTitlesQuery($id: UUID!, $params: TagPopularList) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\tpopularInfSection(params: $params) {\n\t\t\t\t\tlimit\n\t\t\t\t\toffset\n\t\t\t\t\ttotal\n\t\t\t\t\tdata {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tyear\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.TagPopulatTitlesQueryDocument;
	"\n\tquery tagRecentlyPopularQuery($id: UUID!) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\trecentlyAdded {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tyear\n\t\t\t\t\t\taltTitles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.TagRecentlyPopularQueryDocument;
	"\n\tquery tagTopTenQuery($id: UUID!) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\ttopTen {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tyear\n\t\t\t\t\t\taltTitles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.TagTopTenQueryDocument;
	"\n\tmutation exportTitlesToCSV($options: ExportIdsLibraryToCSVOptions!) {\n\t\tmanga {\n\t\t\texport {\n\t\t\t\tidsAsCsv(options: $options)\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ExportTitlesToCsvDocument;
	"\n\tmutation exportTitlesToMAL($options: MdidsToMyAnimeListExportOption!) {\n\t\tmanga {\n\t\t\texport {\n\t\t\t\tidsAsMyAnimeList(options: $options)\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ExportTitlesToMalDocument;
	"\n\tquery userLoggedChapterFeed(\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: MangaFeedSortOrder! = { readableAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tfeed {\n\t\t\tuserLoggedMangaFeedGrouped(\n\t\t\t\tfeedParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: $order\n\t\t\t\t\ttranslatedLanguage: $translatedLanguages\n\t\t\t\t\tincludeFutureUpdates: EXCLUDE\n\t\t\t\t\tincludeExternalUrl: EXCLUDE\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserLoggedChapterFeedDocument;
	"\n\tquery getMangaHihi($id: UUID!) {\n\t\tmanga {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\taltTitles\n\t\t\t\t\tstate\n\t\t\t\t\tstatus\n\t\t\t\t\tdescription\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\tyear\n\t\t\t\t\tcontentRating\n\t\t\t\t\tpublicationDemographic\n\t\t\t\t\tlastVolume\n\t\t\t\t\tlastChapter\n\t\t\t\t\tlatestUploadedChapter\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\toriginalLanguage\n\t\t\t\t\tlinks {\n\t\t\t\t\t\thasNoLinks\n\t\t\t\t\t\tamazon\n\t\t\t\t\t\tanilist\n\t\t\t\t\t\tanimePlanet\n\t\t\t\t\t\tbookWalker\n\t\t\t\t\t\tcdJapan\n\t\t\t\t\t\tebookJapan\n\t\t\t\t\t\tenglishTranslation\n\t\t\t\t\t\tkitsu\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tmyAnimeList\n\t\t\t\t\t\tnovelUpdates\n\t\t\t\t\t\traw\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgroup\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tartists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcoverArt {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\tlocale\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\trelated\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangaHihiDocument;
	"\n\tmutation followTitleMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n": typeof types.FollowTitleMutationDocument;
	"\n\tmutation unfollowTitleMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n": typeof types.UnfollowTitleMutationDocument;
	"\n\tquery isFollowingTitleQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingManga(id: $id)\n\t\t}\n\t}\n": typeof types.IsFollowingTitleQueryDocument;
	"\n\tquery mangaStatistics($id: UUID!) {\n\t\tstatistics {\n\t\t\tmanga {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t\tfollowCount\n\t\t\t\t\trating {\n\t\t\t\t\t\tbayesian\n\t\t\t\t\t\tdistrubution {\n\t\t\t\t\t\t\tr1\n\t\t\t\t\t\t\tr2\n\t\t\t\t\t\t\tr3\n\t\t\t\t\t\t\tr4\n\t\t\t\t\t\t\tr5\n\t\t\t\t\t\t\tr6\n\t\t\t\t\t\t\tr7\n\t\t\t\t\t\t\tr8\n\t\t\t\t\t\t\tr9\n\t\t\t\t\t\t\tr10\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.MangaStatisticsDocument;
	"\n\tquery latestUploadsPageQuery($offset: Int, $limit: Int) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\tincludeEmptyPages: EXCLUDE\n\t\t\t\t\tincludeExternalUrl: EXCLUDE\n\t\t\t\t\tincludeFutureUpdates: EXCLUDE\n\t\t\t\t\tincludeFuturePublishAt: EXCLUDE\n\t\t\t\t\torder: { readableAt: DESCENDING }\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t}\n\t\t\t\tfeedContent: true\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.LatestUploadsPageQueryDocument;
	"\n\tquery randomTitle($options: MangaRandomParams) {\n\t\tmanga {\n\t\t\trandom(params: $options) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RandomTitleDocument;
	"\n\tquery recentlyAddedPageQuery($params: MangaListParams) {\n\t\thome {\n\t\t\trecentlyAdded(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RecentlyAddedPageQueryDocument;
	"\n\tquery defaultMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlist(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.DefaultMangaSearchQueryDocument;
	"\n\tquery offlineMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlistOffline(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.OfflineMangaSearchQueryDocument;
	"\n\tquery userFollowedTitles($limit: Int, $offset: Int) {\n\t\tfollows {\n\t\t\tmangas(params:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserFollowedTitlesDocument;
	"\n\tquery userPageQuery($id: UUID!) {\n\t\tuser {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tgroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { uploaders: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserPageQueryDocument;
	"\n\tmutation followUserMutation($id: UUID!) {\n\t\tuser {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n": typeof types.FollowUserMutationDocument;
	"\n\tmutation unfollowUserMutation($id: UUID!) {\n\t\tuser {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n": typeof types.UnfollowUserMutationDocument;
	"\n\tquery isFollowingUserQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingUser(id: $id)\n\t\t}\n\t}\n": typeof types.IsFollowingUserQueryDocument;
	"\n\tquery userCustomLists($params: UserCustomListParams!) {\n\t\tcustomList {\n\t\t\tgetUserLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserCustomListsDocument;
	"\n\tquery userUploadsFeed(\n\t\t$user: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tuploaders: [$user]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserUploadsFeedDocument;
	"\n\tquery userSearch($params: UserListParam!) {\n\t\tuser {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserSearchDocument;
	"\n\tquery userFollowedUsers($offset: Int, $limit: Int) {\n\t\tfollows {\n\t\t\tusers(param:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tgroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserFollowedUsersDocument;
	"\n\tsubscription userMe {\n\t\twatchUserMe {\n\t\t\tusername\n\t\t\troles\n\t\t}\n\t}\n": typeof types.UserMeDocument;
	"\n\tsubscription isLogged {\n\t\twatchIsLogged\n\t}\n": typeof types.IsLoggedDocument;
	"\n\tquery authCheck {\n\t\tauth {\n\t\t\tcheck {\n\t\t\t\tisAuthenticated\n\t\t\t\troles\n\t\t\t\tpermissions\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AuthCheckDocument;
	"\n\tsubscription chapterPagesSubscription($chapter: UUID!, $mode: DownloadMode) {\n\t\tgetChapterPages(chapter: $chapter, mode: $mode) {\n\t\t\tpages\n\t\t\tindex\n\t\t\tsize {\n\t\t\t\twidth\n\t\t\t\theight\n\t\t\t}\n\t\t\turl\n\t\t}\n\t}\n": typeof types.ChapterPagesSubscriptionDocument;
	"\n\tmutation startChapterPagesCaching($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tstartCaching\n\t\t\t}\n\t\t}\n\t}\n": typeof types.StartChapterPagesCachingDocument;
	"\n\tmutation fetchingChapterPagesMetadata($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tfetchMetadata\n\t\t\t}\n\t\t}\n\t}\n": typeof types.FetchingChapterPagesMetadataDocument;
	"\n\tmutation refetchChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\trefetchPage(page: $page)\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RefetchChapterPageDocument;
	"\n\tmutation resendChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tresendPage(page: $page)\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ResendChapterPageDocument;
	"\n\tmutation resendChapterPages($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tresendAll\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ResendChapterPagesDocument;
	"\n\tmutation refetchIncompletesPages($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\trefetchIncompletes\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RefetchIncompletesPagesDocument;
	"\n\tsubscription chapterFeedStyleSub {\n\t\twatchChapterFeedStyle\n\t}\n": typeof types.ChapterFeedStyleSubDocument;
	"\n\tmutation updateChapterFeedStyle($style: ChapterFeedStyle!) {\n\t\tuserOption {\n\t\t\tsetChapterFeedStyle(style: $style)\n\t\t}\n\t}\n": typeof types.UpdateChapterFeedStyleDocument;
	"\n\tsubscription chapterLayoutSubscription {\n\t\twatchChapterLayout {\n\t\t\tdrawer\n\t\t\tsidebar\n\t\t\tprogress\n\t\t}\n\t}\n": typeof types.ChapterLayoutSubscriptionDocument;
	"\n\tmutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode, $progress: ProgressMode) {\n\t\tuserOption {\n\t\t\tsetChapterLayout(sidebar: $sidebar, drawer: $drawer, progress: $progress) {\n\t\t\t\tsidebar\n\t\t\t\tdrawer\n\t\t\t\tprogress\n\t\t\t}\n\t\t}\n\t}\n": typeof types.SetChapterLayoutDocument;
	"\n\tsubscription chapterQualitySubscription {\n\t\twatchChapterQuality\n\t}\n": typeof types.ChapterQualitySubscriptionDocument;
	"\n\tmutation chapterQualityMutation($quality: DownloadMode) {\n\t\tuserOption {\n\t\t\tsetChapterQuality(quality: $quality)\n\t\t}\n\t}\n": typeof types.ChapterQualityMutationDocument;
	"\n\tsubscription currentClientInfo {\n\t\twatchClientInfo {\n\t\t\tclientSecret\n\t\t\tclientId\n\t\t}\n\t}\n": typeof types.CurrentClientInfoDocument;
	"\n\tmutation setAuthClient($clientId: String!, $clientSecret: String!) {\n\t\toauth {\n\t\t\tsetClientInfo(clientId: $clientId, clientSecret: $clientSecret)\n\t\t}\n\t}\n": typeof types.SetAuthClientDocument;
	"\n\tmutation resetAuthClient {\n\t\toauth {\n\t\t\tclearClientInfo\n\t\t}\n\t}\n": typeof types.ResetAuthClientDocument;
	"\n\tmutation createForumThread($id: UUID!, $threadType: ForumThreadType!) {\n\t\tforums {\n\t\t\tcreateThread(params: {\n\t\t\t\tid: $id,\n\t\t\t\ttype: $threadType\n\t\t\t}) {\n\t\t\t\tforumId\n\t\t\t\tforumUrl\n\t\t\t\trepliesCount\n\t\t\t}\n\t\t}\n\t}\n": typeof types.CreateForumThreadDocument;
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
	"\n\tquery getMangaAggregateChapter($ids: [UUID!]!, $feedContent: Boolean) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids, includeExternalUrl: EXCLUDE }, feedContent: $feedContent) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
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
	"\n\tquery getChaptersIDsAsFeed($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(feedContent: false, chapterListParams: { chapterIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetChaptersIDsAsFeedDocument,
	"\n\tmutation justDownloadingTitle($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n":
		types.JustDownloadingTitleDocument,
	"\n\tmutation addTitleToListBatch($mangas: [UUID!]!, $customList: UUID!) {\n\t\tcustomList {\n\t\t\taddMangaBatch(listId: $customList, mangaIds: $mangas)\n\t\t}\n\t}\n":
		types.AddTitleToListBatchDocument,
	"\n\tquery getTitleTitles($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $titles }, excludeContentProfile: true) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
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
	"\n\tmutation loginMutation($username: Username!, $password: Password!) {\n\t\toauth {\n\t\t\tlogin(password: $password, username: $username)\n\t\t}\n\t}\n":
		types.LoginMutationDocument,
	"\n\tmutation logoutMutation {\n\t\toauth {\n\t\t\tlogout\n\t\t}\n\t}\n":
		types.LogoutMutationDocument,
	"\n\tquery authorPageQuery($id: UUID!) {\n\t\tauthor {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\timageUrl\n\t\t\t\t\tbiography\n\t\t\t\t\ttwitter\n\t\t\t\t\tpixiv\n\t\t\t\t\tmelonBook\n\t\t\t\t\tfanBox\n\t\t\t\t\tbooth\n\t\t\t\t\tnicoVideo\n\t\t\t\t\tskeb\n\t\t\t\t\tfantia\n\t\t\t\t\ttumblr\n\t\t\t\t\tyoutube\n\t\t\t\t\tweibo\n\t\t\t\t\tnaver\n\t\t\t\t\twebsite\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { authorOrArtist: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.AuthorPageQueryDocument,
	"\n\tquery authorsSearch($params: AuthorListParams!) {\n\t\tauthor {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tworks {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.AuthorsSearchDocument,
	"\n\tsubscription subToChapterImageFit {\n\t\twatchImageFit\n\t}\n":
		types.SubToChapterImageFitDocument,
	"\n\tmutation updateChapterImageFit($imageFit: ImageFit!) {\n\t\tuserOption {\n\t\t\tsetImageFit(imageFit: $imageFit)\n\t\t}\n\t}\n":
		types.UpdateChapterImageFitDocument,
	"\n\tsubscription subToChapterLongstripImageWidth {\n\t\twatchLongstripImageWidth\n\t}\n":
		types.SubToChapterLongstripImageWidthDocument,
	"\n\tmutation updateChapterLongstripImageWidth($width: Float!) {\n\t\tuserOption {\n\t\t\tsetLongstripImageWidth(width: $width)\n\t\t}\n\t}\n":
		types.UpdateChapterLongstripImageWidthDocument,
	"\n\tsubscription subToChapterReadingDirection {\n\t\twatchPageDirection\n\t}\n":
		types.SubToChapterReadingDirectionDocument,
	"\n\tmutation updateChapterReadingDirection($direction: Direction!) {\n\t\tuserOption {\n\t\t\tsetPageDirection(direction: $direction)\n\t\t}\n\t}\n":
		types.UpdateChapterReadingDirectionDocument,
	"\n\tsubscription subToChapterReadingMode {\n\t\twatchReadingMode\n\t}\n":
		types.SubToChapterReadingModeDocument,
	"\n\tmutation updateChapterReadingMode($mode: ReadingMode!) {\n\t\tuserOption {\n\t\t\tsetReadingMode(mode: $mode)\n\t\t}\n\t}\n":
		types.UpdateChapterReadingModeDocument,
	"\n\tquery getChapterRelated($mangaId: UUID!, $langs: Language!, $groups: [UUID!]!) {\n\t\tmanga {\n\t\t\taggregate(\n\t\t\t\tparams: { groups: $groups, mangaId: $mangaId, translatedLanguage: [$langs] }\n\t\t\t) {\n\t\t\t\tdefault(isReversed: true) {\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetChapterRelatedDocument,
	"\n\tquery chapterPageThread($id: UUID!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ChapterPageThreadDocument,
	"\n\tquery getChapterPageData($id: UUID!) {\n\t\tchapter {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tvolume\n\t\t\t\t\tchapter\n\t\t\t\t\tpages\n\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\texternalUrl\n\t\t\t\t\treadableAt\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\t\tisLongstrip\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetChapterPageDataDocument,
	"\n\tmutation exportChapterPage($id: UUID!, $page: Int!, $exportPath: String!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $id, mode: $mode) {\n\t\t\t\texportPage(page: $page, exportPath: $exportPath)\n\t\t\t}\n\t\t}\n\t}\n":
		types.ExportChapterPageDocument,
	"\n\tmutation setContentProfileBlur($blur: Boolean!) {\n\t\tuserOption {\n\t\t\tsetContentProfileBlur(blur: $blur)\n\t\t}\n\t}\n":
		types.SetContentProfileBlurDocument,
	"\n\tsubscription subContentProfileBlur {\n\t\twatchContentProfileBlur\n\t}\n":
		types.SubContentProfileBlurDocument,
	"\n\tquery getContentProfileBlur {\n\t\tuserOption {\n\t\t\tgetContentProfileBlur\n\t\t}\n\t}\n":
		types.GetContentProfileBlurDocument,
	"\n\tmutation setContentProfileWarningMode($mode: ContentProfileWarningMode!) {\n\t\tuserOption {\n\t\t\tsetContentProfileWarningMode(mode: $mode)\n\t\t}\n\t}\n":
		types.SetContentProfileWarningModeDocument,
	"\n\tquery getContentProfileWarningMode {\n\t\tuserOption {\n\t\t\tgetContentProfileWarningMode\n\t\t}\n\t}\n":
		types.GetContentProfileWarningModeDocument,
	"\n\tsubscription subContentProfileWarningMode {\n\t\twatchContentProfileWarningMode\n\t}\n":
		types.SubContentProfileWarningModeDocument,
	"\n\tsubscription listenToMangaTasksIDs {\n\t\twatchMangaTasksList\n\t}\n":
		types.ListenToMangaTasksIDsDocument,
	"\n\tsubscription listenToChapterTasksIDs {\n\t\twatchChaptersTasksList\n\t}\n":
		types.ListenToChapterTasksIDsDocument,
	"\n\tsubscription listenToCoverTasksIDs {\n\t\twatchCoverTasksList\n\t}\n":
		types.ListenToCoverTasksIDsDocument,
	"\n\tmutation exportIdsToTxt($uuids: [UUID!]!, $path: String!) {\n\t\texport {\n\t\t\tuuidsToAsTxt(file: $path, uuids: $uuids)\n\t\t}\n\t}\n":
		types.ExportIdsToTxtDocument,
	"\n\tmutation setForcePort443($force: Boolean!) {\n\t\tuserOption {\n\t\t\tsetForcePort443(force: $force)\n\t\t}\n\t}\n":
		types.SetForcePort443Document,
	"\n\tsubscription subForce443 {\n\t\twatchForcePort443\n\t}\n": types.SubForce443Document,
	"\n\tquery groupPageQuery($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tgetUnique(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\twebsite\n\t\t\t\t\ttwitter\n\t\t\t\t\tname\n\t\t\t\t\taltNames\n\t\t\t\t\tircServer\n\t\t\t\t\tircChannel\n\t\t\t\t\tcontactEmail\n\t\t\t\t\tmangaUpdates\n\t\t\t\t\tfocusedLanguages\n\t\t\t\t\tlocked\n\t\t\t\t\tofficial\n\t\t\t\t\tverified\n\t\t\t\t\texLicensed\n\t\t\t\t\tpublishDelay\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tdescription\n\t\t\t\t\tdiscord\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tleader {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmembers {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { group: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t\tstatistics {\n\t\t\tgroup {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { groups: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.GroupPageQueryDocument,
	"\n\tmutation followScanlationGroupMutation($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n":
		types.FollowScanlationGroupMutationDocument,
	"\n\tmutation unfollowScanlationGroupMutation($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n":
		types.UnfollowScanlationGroupMutationDocument,
	"\n\tquery isFollowingScanlationGroupQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingGroup(id: $id)\n\t\t}\n\t}\n":
		types.IsFollowingScanlationGroupQueryDocument,
	"\n\tquery groupStatisticsQuery($id: UUID!) {\n\t\tstatistics {\n\t\t\tgroup{\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadId\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GroupStatisticsQueryDocument,
	"\n\tquery scanlationUploadsFeed(\n\t\t$group: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tgroups: [$group]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ScanlationUploadsFeedDocument,
	"\n\tquery scanalationGroupSearch($params: ScanlationGroupListParams!) {\n\t\tscanlationGroup {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tdiscord\n\t\t\t\t\t\twebsite\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmembers {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ScanalationGroupSearchDocument,
	"\n\tquery userFollowedGroups($offset: Int, $limit: Int) {\n\t\tfollows {\n\t\t\tgroups(params:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\taltNames\n\t\t\t\t\t\tdiscord\n\t\t\t\t\t\tircServer\n\t\t\t\t\t\tircChannel\n\t\t\t\t\t\tofficial\n\t\t\t\t\t\tverified\n\t\t\t\t\t\twebsite\n\t\t\t\t\t\ttwitter\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tcontactEmail\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserFollowedGroupsDocument,
	"\n\tquery currentUserLibraryCompleted($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tcompleted(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CurrentUserLibraryCompletedDocument,
	"\n\tquery currentUserLibraryDropped($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tdropped(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CurrentUserLibraryDroppedDocument,
	"\n\tmutation exportLibraryToCSV($options: ExportMDLibraryToCSVOptions!) {\n\t\tlibrary {\n\t\t\texportAsCsv(options: $options)\n\t\t}\n\t}\n":
		types.ExportLibraryToCsvDocument,
	"\n\tmutation exportLibraryToMyAnimeList($options: MdlibraryToMyAnimeListExportOption!) {\n\t\tlibrary {\n\t\t\texportAsMyAnimeList(options: $options)\n\t\t}\n\t}\n":
		types.ExportLibraryToMyAnimeListDocument,
	"\n\tquery currentUserLibraryUnfiltered($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tunfiltered(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CurrentUserLibraryUnfilteredDocument,
	"\n\tquery libraryTitleMap($status: ReadingStatus) {\n\t\tmanga {\n\t\t\tgetMangaStatus(status: $status) {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n":
		types.LibraryTitleMapDocument,
	"\n\tquery currentUserLibraryOnHold($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tonHold(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CurrentUserLibraryOnHoldDocument,
	"\n\tquery currentUserLibraryPlanToRead($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tplanToRead(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CurrentUserLibraryPlanToReadDocument,
	"\n\tquery currentUserLibraryReReading($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\treReading(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CurrentUserLibraryReReadingDocument,
	"\n\tquery currentUserLibraryReading($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\treading(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CurrentUserLibraryReadingDocument,
	"\n\tquery librarySize {\n\t\tlibrary {\n\t\t\tsize {\n\t\t\t\tunfiltered\n\t\t\t\tcompleted\n\t\t\t\tdropped\n\t\t\t\tplanToRead\n\t\t\t\treading\n\t\t\t\treReading\n\t\t\t\tonHold\n\t\t\t}\n\t\t}\n\t}\n":
		types.LibrarySizeDocument,
	"\n\tquery currentUserCustomLists($params: CurrentLoggedLists!) {\n\t\tcustomList {\n\t\t\tcurrentLoggedLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CurrentUserCustomListsDocument,
	"\n\tmutation exportCustomListsToCSV($options: ExportCustomListsToCSVOptions!) {\n\t\tcustomList {\n\t\t\texport {\n\t\t\t\tasCsv(option: $options)\n\t\t\t}\n\t\t}\n\t}\n":
		types.ExportCustomListsToCsvDocument,
	"\n\tmutation exportCustomListsToMAL($options: MdcustomListsToMyAnimeListExportOption!) {\n\t\tcustomList {\n\t\t\texport {\n\t\t\t\tasMyAnimeList(option: $options)\n\t\t\t}\n\t\t}\n\t}\n":
		types.ExportCustomListsToMalDocument,
	"\n\tmutation deleteCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n":
		types.DeleteCustomListMutationDocument,
	"\n\tquery customListChapterFeed(\n\t\t$feedParam: CustomListMangaFeedParams!\n\t\t$mangaParam: MangaListParams\n\t\t$private: Boolean\n\t) {\n\t\tfeed {\n\t\t\tcustomListFeedGrouped(\n\t\t\t\tfeedParams: $feedParam\n\t\t\t\tmangaListParams: $mangaParam\n\t\t\t\tprivate: $private\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.CustomListChapterFeedDocument,
	"\n\tmutation followCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n":
		types.FollowCustomListMutationDocument,
	"\n\tmutation unfollowCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n":
		types.UnfollowCustomListMutationDocument,
	"\n\tquery isFollowingCustomListQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingCustomList(id: $id)\n\t\t}\n\t}\n":
		types.IsFollowingCustomListQueryDocument,
	"\n\tquery getCustomListVersion1($id: UUID!) {\n\t\tcustomList {\n\t\t\tget(id: $id, private: true) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tversion\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetCustomListVersion1Document,
	"\n\tmutation updateCustomListVisibility1(\n\t\t$id: UUID!\n\t\t$visibility: CustomListVisibility!\n\t\t$version: Int!\n\t) {\n\t\tcustomList {\n\t\t\tupdate(params: { listId: $id, version: $version, visibility: $visibility }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n":
		types.UpdateCustomListVisibility1Document,
	"\n\tquery userFollowedCustomLists($limit: Int, $offset: Int) {\n\t\tfollows {\n\t\t\tcustomLists(param:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles \n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserFollowedCustomListsDocument,
	"\n\tsubscription listenToChapterReadMarker($id: UUID!) {\n\t\twatchReadMarker(chapterId: $id)\n\t}\n":
		types.ListenToChapterReadMarkerDocument,
	"\n\tsubscription listenToAnyChapterReadMarker {\n\t\twatchReadMarkers {\n\t\t\tchapter\n\t\t\tread\n\t\t}\n\t}\n":
		types.ListenToAnyChapterReadMarkerDocument,
	"\n\tmutation mutateReadMarkersBatch($unreads: [UUID!]!, $read: [UUID!]!, $updateHistory: Boolean) {\n\t\treadMarker {\n\t\t\treadMarkersBatch(\n\t\t\t\tchapterIdsRead: $read\n\t\t\t\tchapterIdsUnread: $unreads\n\t\t\t\tupdateHistory: $updateHistory\n\t\t\t)\n\t\t}\n\t}\n":
		types.MutateReadMarkersBatchDocument,
	"\n\tquery chaptersReadMarkers($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tchapterReadMarkers(chapters: $ids)\n\t\t}\n\t}\n":
		types.ChaptersReadMarkersDocument,
	"\n\tquery mangaReadMarkers($id: UUID!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkersByMangaId(mangaId: $id)\n\t\t}\n\t}\n":
		types.MangaReadMarkersDocument,
	"\n\tquery mangasReadMarkers($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkers(mangaIds: $ids)\n\t\t}\n\t}\n":
		types.MangasReadMarkersDocument,
	"\n\tquery mangasReadMarkersGrouped($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkersGrouped(mangaIds: $ids) {\n\t\t\t\tmangaId\n\t\t\t\tchapters\n\t\t\t}\n\t\t}\n\t}\n":
		types.MangasReadMarkersGroupedDocument,
	"\n\tsubscription rtlSidebarSub {\n\t\twatchSidebarDirection\n\t}\n":
		types.RtlSidebarSubDocument,
	"\n\tquery tagPopulatTitlesQuery($id: UUID!, $params: TagPopularList) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\tpopularInfSection(params: $params) {\n\t\t\t\t\tlimit\n\t\t\t\t\toffset\n\t\t\t\t\ttotal\n\t\t\t\t\tdata {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tyear\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.TagPopulatTitlesQueryDocument,
	"\n\tquery tagRecentlyPopularQuery($id: UUID!) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\trecentlyAdded {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tyear\n\t\t\t\t\t\taltTitles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.TagRecentlyPopularQueryDocument,
	"\n\tquery tagTopTenQuery($id: UUID!) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\ttopTen {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tyear\n\t\t\t\t\t\taltTitles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.TagTopTenQueryDocument,
	"\n\tmutation exportTitlesToCSV($options: ExportIdsLibraryToCSVOptions!) {\n\t\tmanga {\n\t\t\texport {\n\t\t\t\tidsAsCsv(options: $options)\n\t\t\t}\n\t\t}\n\t}\n":
		types.ExportTitlesToCsvDocument,
	"\n\tmutation exportTitlesToMAL($options: MdidsToMyAnimeListExportOption!) {\n\t\tmanga {\n\t\t\texport {\n\t\t\t\tidsAsMyAnimeList(options: $options)\n\t\t\t}\n\t\t}\n\t}\n":
		types.ExportTitlesToMalDocument,
	"\n\tquery userLoggedChapterFeed(\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: MangaFeedSortOrder! = { readableAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tfeed {\n\t\t\tuserLoggedMangaFeedGrouped(\n\t\t\t\tfeedParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: $order\n\t\t\t\t\ttranslatedLanguage: $translatedLanguages\n\t\t\t\t\tincludeFutureUpdates: EXCLUDE\n\t\t\t\t\tincludeExternalUrl: EXCLUDE\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserLoggedChapterFeedDocument,
	"\n\tquery getMangaHihi($id: UUID!) {\n\t\tmanga {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\taltTitles\n\t\t\t\t\tstate\n\t\t\t\t\tstatus\n\t\t\t\t\tdescription\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\tyear\n\t\t\t\t\tcontentRating\n\t\t\t\t\tpublicationDemographic\n\t\t\t\t\tlastVolume\n\t\t\t\t\tlastChapter\n\t\t\t\t\tlatestUploadedChapter\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\toriginalLanguage\n\t\t\t\t\tlinks {\n\t\t\t\t\t\thasNoLinks\n\t\t\t\t\t\tamazon\n\t\t\t\t\t\tanilist\n\t\t\t\t\t\tanimePlanet\n\t\t\t\t\t\tbookWalker\n\t\t\t\t\t\tcdJapan\n\t\t\t\t\t\tebookJapan\n\t\t\t\t\t\tenglishTranslation\n\t\t\t\t\t\tkitsu\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tmyAnimeList\n\t\t\t\t\t\tnovelUpdates\n\t\t\t\t\t\traw\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgroup\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tartists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcoverArt {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\tlocale\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\trelated\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetMangaHihiDocument,
	"\n\tmutation followTitleMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n":
		types.FollowTitleMutationDocument,
	"\n\tmutation unfollowTitleMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n":
		types.UnfollowTitleMutationDocument,
	"\n\tquery isFollowingTitleQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingManga(id: $id)\n\t\t}\n\t}\n":
		types.IsFollowingTitleQueryDocument,
	"\n\tquery mangaStatistics($id: UUID!) {\n\t\tstatistics {\n\t\t\tmanga {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t\tfollowCount\n\t\t\t\t\trating {\n\t\t\t\t\t\tbayesian\n\t\t\t\t\t\tdistrubution {\n\t\t\t\t\t\t\tr1\n\t\t\t\t\t\t\tr2\n\t\t\t\t\t\t\tr3\n\t\t\t\t\t\t\tr4\n\t\t\t\t\t\t\tr5\n\t\t\t\t\t\t\tr6\n\t\t\t\t\t\t\tr7\n\t\t\t\t\t\t\tr8\n\t\t\t\t\t\t\tr9\n\t\t\t\t\t\t\tr10\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.MangaStatisticsDocument,
	"\n\tquery latestUploadsPageQuery($offset: Int, $limit: Int) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\tincludeEmptyPages: EXCLUDE\n\t\t\t\t\tincludeExternalUrl: EXCLUDE\n\t\t\t\t\tincludeFutureUpdates: EXCLUDE\n\t\t\t\t\tincludeFuturePublishAt: EXCLUDE\n\t\t\t\t\torder: { readableAt: DESCENDING }\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t}\n\t\t\t\tfeedContent: true\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.LatestUploadsPageQueryDocument,
	"\n\tquery randomTitle($options: MangaRandomParams) {\n\t\tmanga {\n\t\t\trandom(params: $options) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n":
		types.RandomTitleDocument,
	"\n\tquery recentlyAddedPageQuery($params: MangaListParams) {\n\t\thome {\n\t\t\trecentlyAdded(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.RecentlyAddedPageQueryDocument,
	"\n\tquery defaultMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlist(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.DefaultMangaSearchQueryDocument,
	"\n\tquery offlineMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlistOffline(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.OfflineMangaSearchQueryDocument,
	"\n\tquery userFollowedTitles($limit: Int, $offset: Int) {\n\t\tfollows {\n\t\t\tmangas(params:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserFollowedTitlesDocument,
	"\n\tquery userPageQuery($id: UUID!) {\n\t\tuser {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tgroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { uploaders: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserPageQueryDocument,
	"\n\tmutation followUserMutation($id: UUID!) {\n\t\tuser {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n":
		types.FollowUserMutationDocument,
	"\n\tmutation unfollowUserMutation($id: UUID!) {\n\t\tuser {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n":
		types.UnfollowUserMutationDocument,
	"\n\tquery isFollowingUserQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingUser(id: $id)\n\t\t}\n\t}\n":
		types.IsFollowingUserQueryDocument,
	"\n\tquery userCustomLists($params: UserCustomListParams!) {\n\t\tcustomList {\n\t\t\tgetUserLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserCustomListsDocument,
	"\n\tquery userUploadsFeed(\n\t\t$user: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tuploaders: [$user]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserUploadsFeedDocument,
	"\n\tquery userSearch($params: UserListParam!) {\n\t\tuser {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserSearchDocument,
	"\n\tquery userFollowedUsers($offset: Int, $limit: Int) {\n\t\tfollows {\n\t\t\tusers(param:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tgroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserFollowedUsersDocument,
	"\n\tsubscription userMe {\n\t\twatchUserMe {\n\t\t\tusername\n\t\t\troles\n\t\t}\n\t}\n":
		types.UserMeDocument,
	"\n\tsubscription isLogged {\n\t\twatchIsLogged\n\t}\n": types.IsLoggedDocument,
	"\n\tquery authCheck {\n\t\tauth {\n\t\t\tcheck {\n\t\t\t\tisAuthenticated\n\t\t\t\troles\n\t\t\t\tpermissions\n\t\t\t}\n\t\t}\n\t}\n":
		types.AuthCheckDocument,
	"\n\tsubscription chapterPagesSubscription($chapter: UUID!, $mode: DownloadMode) {\n\t\tgetChapterPages(chapter: $chapter, mode: $mode) {\n\t\t\tpages\n\t\t\tindex\n\t\t\tsize {\n\t\t\t\twidth\n\t\t\t\theight\n\t\t\t}\n\t\t\turl\n\t\t}\n\t}\n":
		types.ChapterPagesSubscriptionDocument,
	"\n\tmutation startChapterPagesCaching($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tstartCaching\n\t\t\t}\n\t\t}\n\t}\n":
		types.StartChapterPagesCachingDocument,
	"\n\tmutation fetchingChapterPagesMetadata($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tfetchMetadata\n\t\t\t}\n\t\t}\n\t}\n":
		types.FetchingChapterPagesMetadataDocument,
	"\n\tmutation refetchChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\trefetchPage(page: $page)\n\t\t\t}\n\t\t}\n\t}\n":
		types.RefetchChapterPageDocument,
	"\n\tmutation resendChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tresendPage(page: $page)\n\t\t\t}\n\t\t}\n\t}\n":
		types.ResendChapterPageDocument,
	"\n\tmutation resendChapterPages($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tresendAll\n\t\t\t}\n\t\t}\n\t}\n":
		types.ResendChapterPagesDocument,
	"\n\tmutation refetchIncompletesPages($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\trefetchIncompletes\n\t\t\t}\n\t\t}\n\t}\n":
		types.RefetchIncompletesPagesDocument,
	"\n\tsubscription chapterFeedStyleSub {\n\t\twatchChapterFeedStyle\n\t}\n":
		types.ChapterFeedStyleSubDocument,
	"\n\tmutation updateChapterFeedStyle($style: ChapterFeedStyle!) {\n\t\tuserOption {\n\t\t\tsetChapterFeedStyle(style: $style)\n\t\t}\n\t}\n":
		types.UpdateChapterFeedStyleDocument,
	"\n\tsubscription chapterLayoutSubscription {\n\t\twatchChapterLayout {\n\t\t\tdrawer\n\t\t\tsidebar\n\t\t\tprogress\n\t\t}\n\t}\n":
		types.ChapterLayoutSubscriptionDocument,
	"\n\tmutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode, $progress: ProgressMode) {\n\t\tuserOption {\n\t\t\tsetChapterLayout(sidebar: $sidebar, drawer: $drawer, progress: $progress) {\n\t\t\t\tsidebar\n\t\t\t\tdrawer\n\t\t\t\tprogress\n\t\t\t}\n\t\t}\n\t}\n":
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
	"\n\tmutation createForumThread($id: UUID!, $threadType: ForumThreadType!) {\n\t\tforums {\n\t\t\tcreateThread(params: {\n\t\t\t\tid: $id,\n\t\t\t\ttype: $threadType\n\t\t\t}) {\n\t\t\t\tforumId\n\t\t\t\tforumUrl\n\t\t\t\trepliesCount\n\t\t\t}\n\t\t}\n\t}\n":
		types.CreateForumThreadDocument,
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
	source: "\n\tquery getMangaAggregateChapter($ids: [UUID!]!, $feedContent: Boolean) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids, includeExternalUrl: EXCLUDE }, feedContent: $feedContent) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getMangaAggregateChapter($ids: [UUID!]!, $feedContent: Boolean) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids, includeExternalUrl: EXCLUDE }, feedContent: $feedContent) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tquery getChaptersIDsAsFeed($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(feedContent: false, chapterListParams: { chapterIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getChaptersIDsAsFeed($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(feedContent: false, chapterListParams: { chapterIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation justDownloadingTitle($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation justDownloadingTitle($id: UUID!) {\n\t\tmanga {\n\t\t\tdownload(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tquery getTitleTitles($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $titles }, excludeContentProfile: true) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getTitleTitles($titles: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $titles }, excludeContentProfile: true) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tmutation loginMutation($username: Username!, $password: Password!) {\n\t\toauth {\n\t\t\tlogin(password: $password, username: $username)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation loginMutation($username: Username!, $password: Password!) {\n\t\toauth {\n\t\t\tlogin(password: $password, username: $username)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation logoutMutation {\n\t\toauth {\n\t\t\tlogout\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation logoutMutation {\n\t\toauth {\n\t\t\tlogout\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery authorPageQuery($id: UUID!) {\n\t\tauthor {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\timageUrl\n\t\t\t\t\tbiography\n\t\t\t\t\ttwitter\n\t\t\t\t\tpixiv\n\t\t\t\t\tmelonBook\n\t\t\t\t\tfanBox\n\t\t\t\t\tbooth\n\t\t\t\t\tnicoVideo\n\t\t\t\t\tskeb\n\t\t\t\t\tfantia\n\t\t\t\t\ttumblr\n\t\t\t\t\tyoutube\n\t\t\t\t\tweibo\n\t\t\t\t\tnaver\n\t\t\t\t\twebsite\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { authorOrArtist: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery authorPageQuery($id: UUID!) {\n\t\tauthor {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\timageUrl\n\t\t\t\t\tbiography\n\t\t\t\t\ttwitter\n\t\t\t\t\tpixiv\n\t\t\t\t\tmelonBook\n\t\t\t\t\tfanBox\n\t\t\t\t\tbooth\n\t\t\t\t\tnicoVideo\n\t\t\t\t\tskeb\n\t\t\t\t\tfantia\n\t\t\t\t\ttumblr\n\t\t\t\t\tyoutube\n\t\t\t\t\tweibo\n\t\t\t\t\tnaver\n\t\t\t\t\twebsite\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { authorOrArtist: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery authorsSearch($params: AuthorListParams!) {\n\t\tauthor {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tworks {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery authorsSearch($params: AuthorListParams!) {\n\t\tauthor {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tworks {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription subToChapterImageFit {\n\t\twatchImageFit\n\t}\n"
): (typeof documents)["\n\tsubscription subToChapterImageFit {\n\t\twatchImageFit\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateChapterImageFit($imageFit: ImageFit!) {\n\t\tuserOption {\n\t\t\tsetImageFit(imageFit: $imageFit)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateChapterImageFit($imageFit: ImageFit!) {\n\t\tuserOption {\n\t\t\tsetImageFit(imageFit: $imageFit)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription subToChapterLongstripImageWidth {\n\t\twatchLongstripImageWidth\n\t}\n"
): (typeof documents)["\n\tsubscription subToChapterLongstripImageWidth {\n\t\twatchLongstripImageWidth\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateChapterLongstripImageWidth($width: Float!) {\n\t\tuserOption {\n\t\t\tsetLongstripImageWidth(width: $width)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateChapterLongstripImageWidth($width: Float!) {\n\t\tuserOption {\n\t\t\tsetLongstripImageWidth(width: $width)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription subToChapterReadingDirection {\n\t\twatchPageDirection\n\t}\n"
): (typeof documents)["\n\tsubscription subToChapterReadingDirection {\n\t\twatchPageDirection\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateChapterReadingDirection($direction: Direction!) {\n\t\tuserOption {\n\t\t\tsetPageDirection(direction: $direction)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateChapterReadingDirection($direction: Direction!) {\n\t\tuserOption {\n\t\t\tsetPageDirection(direction: $direction)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription subToChapterReadingMode {\n\t\twatchReadingMode\n\t}\n"
): (typeof documents)["\n\tsubscription subToChapterReadingMode {\n\t\twatchReadingMode\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateChapterReadingMode($mode: ReadingMode!) {\n\t\tuserOption {\n\t\t\tsetReadingMode(mode: $mode)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateChapterReadingMode($mode: ReadingMode!) {\n\t\tuserOption {\n\t\t\tsetReadingMode(mode: $mode)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getChapterRelated($mangaId: UUID!, $langs: Language!, $groups: [UUID!]!) {\n\t\tmanga {\n\t\t\taggregate(\n\t\t\t\tparams: { groups: $groups, mangaId: $mangaId, translatedLanguage: [$langs] }\n\t\t\t) {\n\t\t\t\tdefault(isReversed: true) {\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getChapterRelated($mangaId: UUID!, $langs: Language!, $groups: [UUID!]!) {\n\t\tmanga {\n\t\t\taggregate(\n\t\t\t\tparams: { groups: $groups, mangaId: $mangaId, translatedLanguage: [$langs] }\n\t\t\t) {\n\t\t\t\tdefault(isReversed: true) {\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery chapterPageThread($id: UUID!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery chapterPageThread($id: UUID!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getChapterPageData($id: UUID!) {\n\t\tchapter {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tvolume\n\t\t\t\t\tchapter\n\t\t\t\t\tpages\n\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\texternalUrl\n\t\t\t\t\treadableAt\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\t\tisLongstrip\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getChapterPageData($id: UUID!) {\n\t\tchapter {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tvolume\n\t\t\t\t\tchapter\n\t\t\t\t\tpages\n\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\texternalUrl\n\t\t\t\t\treadableAt\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\t\tisLongstrip\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation exportChapterPage($id: UUID!, $page: Int!, $exportPath: String!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $id, mode: $mode) {\n\t\t\t\texportPage(page: $page, exportPath: $exportPath)\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation exportChapterPage($id: UUID!, $page: Int!, $exportPath: String!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $id, mode: $mode) {\n\t\t\t\texportPage(page: $page, exportPath: $exportPath)\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation setContentProfileBlur($blur: Boolean!) {\n\t\tuserOption {\n\t\t\tsetContentProfileBlur(blur: $blur)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation setContentProfileBlur($blur: Boolean!) {\n\t\tuserOption {\n\t\t\tsetContentProfileBlur(blur: $blur)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription subContentProfileBlur {\n\t\twatchContentProfileBlur\n\t}\n"
): (typeof documents)["\n\tsubscription subContentProfileBlur {\n\t\twatchContentProfileBlur\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getContentProfileBlur {\n\t\tuserOption {\n\t\t\tgetContentProfileBlur\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getContentProfileBlur {\n\t\tuserOption {\n\t\t\tgetContentProfileBlur\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation setContentProfileWarningMode($mode: ContentProfileWarningMode!) {\n\t\tuserOption {\n\t\t\tsetContentProfileWarningMode(mode: $mode)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation setContentProfileWarningMode($mode: ContentProfileWarningMode!) {\n\t\tuserOption {\n\t\t\tsetContentProfileWarningMode(mode: $mode)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getContentProfileWarningMode {\n\t\tuserOption {\n\t\t\tgetContentProfileWarningMode\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getContentProfileWarningMode {\n\t\tuserOption {\n\t\t\tgetContentProfileWarningMode\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription subContentProfileWarningMode {\n\t\twatchContentProfileWarningMode\n\t}\n"
): (typeof documents)["\n\tsubscription subContentProfileWarningMode {\n\t\twatchContentProfileWarningMode\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription listenToMangaTasksIDs {\n\t\twatchMangaTasksList\n\t}\n"
): (typeof documents)["\n\tsubscription listenToMangaTasksIDs {\n\t\twatchMangaTasksList\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription listenToChapterTasksIDs {\n\t\twatchChaptersTasksList\n\t}\n"
): (typeof documents)["\n\tsubscription listenToChapterTasksIDs {\n\t\twatchChaptersTasksList\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription listenToCoverTasksIDs {\n\t\twatchCoverTasksList\n\t}\n"
): (typeof documents)["\n\tsubscription listenToCoverTasksIDs {\n\t\twatchCoverTasksList\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation exportIdsToTxt($uuids: [UUID!]!, $path: String!) {\n\t\texport {\n\t\t\tuuidsToAsTxt(file: $path, uuids: $uuids)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation exportIdsToTxt($uuids: [UUID!]!, $path: String!) {\n\t\texport {\n\t\t\tuuidsToAsTxt(file: $path, uuids: $uuids)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation setForcePort443($force: Boolean!) {\n\t\tuserOption {\n\t\t\tsetForcePort443(force: $force)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation setForcePort443($force: Boolean!) {\n\t\tuserOption {\n\t\t\tsetForcePort443(force: $force)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription subForce443 {\n\t\twatchForcePort443\n\t}\n"
): (typeof documents)["\n\tsubscription subForce443 {\n\t\twatchForcePort443\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery groupPageQuery($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tgetUnique(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\twebsite\n\t\t\t\t\ttwitter\n\t\t\t\t\tname\n\t\t\t\t\taltNames\n\t\t\t\t\tircServer\n\t\t\t\t\tircChannel\n\t\t\t\t\tcontactEmail\n\t\t\t\t\tmangaUpdates\n\t\t\t\t\tfocusedLanguages\n\t\t\t\t\tlocked\n\t\t\t\t\tofficial\n\t\t\t\t\tverified\n\t\t\t\t\texLicensed\n\t\t\t\t\tpublishDelay\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tdescription\n\t\t\t\t\tdiscord\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tleader {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmembers {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { group: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t\tstatistics {\n\t\t\tgroup {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { groups: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery groupPageQuery($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tgetUnique(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\twebsite\n\t\t\t\t\ttwitter\n\t\t\t\t\tname\n\t\t\t\t\taltNames\n\t\t\t\t\tircServer\n\t\t\t\t\tircChannel\n\t\t\t\t\tcontactEmail\n\t\t\t\t\tmangaUpdates\n\t\t\t\t\tfocusedLanguages\n\t\t\t\t\tlocked\n\t\t\t\t\tofficial\n\t\t\t\t\tverified\n\t\t\t\t\texLicensed\n\t\t\t\t\tpublishDelay\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tdescription\n\t\t\t\t\tdiscord\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tleader {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmembers {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { group: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t\tstatistics {\n\t\t\tgroup {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { groups: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation followScanlationGroupMutation($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation followScanlationGroupMutation($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation unfollowScanlationGroupMutation($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation unfollowScanlationGroupMutation($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery isFollowingScanlationGroupQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingGroup(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery isFollowingScanlationGroupQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingGroup(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery groupStatisticsQuery($id: UUID!) {\n\t\tstatistics {\n\t\t\tgroup{\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadId\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery groupStatisticsQuery($id: UUID!) {\n\t\tstatistics {\n\t\t\tgroup{\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadId\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery scanlationUploadsFeed(\n\t\t$group: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tgroups: [$group]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery scanlationUploadsFeed(\n\t\t$group: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tgroups: [$group]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery scanalationGroupSearch($params: ScanlationGroupListParams!) {\n\t\tscanlationGroup {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tdiscord\n\t\t\t\t\t\twebsite\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmembers {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery scanalationGroupSearch($params: ScanlationGroupListParams!) {\n\t\tscanlationGroup {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tdiscord\n\t\t\t\t\t\twebsite\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmembers {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userFollowedGroups($offset: Int, $limit: Int) {\n\t\tfollows {\n\t\t\tgroups(params:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\taltNames\n\t\t\t\t\t\tdiscord\n\t\t\t\t\t\tircServer\n\t\t\t\t\t\tircChannel\n\t\t\t\t\t\tofficial\n\t\t\t\t\t\tverified\n\t\t\t\t\t\twebsite\n\t\t\t\t\t\ttwitter\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tcontactEmail\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userFollowedGroups($offset: Int, $limit: Int) {\n\t\tfollows {\n\t\t\tgroups(params:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\taltNames\n\t\t\t\t\t\tdiscord\n\t\t\t\t\t\tircServer\n\t\t\t\t\t\tircChannel\n\t\t\t\t\t\tofficial\n\t\t\t\t\t\tverified\n\t\t\t\t\t\twebsite\n\t\t\t\t\t\ttwitter\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tcontactEmail\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery currentUserLibraryCompleted($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tcompleted(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery currentUserLibraryCompleted($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tcompleted(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery currentUserLibraryDropped($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tdropped(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery currentUserLibraryDropped($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tdropped(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation exportLibraryToCSV($options: ExportMDLibraryToCSVOptions!) {\n\t\tlibrary {\n\t\t\texportAsCsv(options: $options)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation exportLibraryToCSV($options: ExportMDLibraryToCSVOptions!) {\n\t\tlibrary {\n\t\t\texportAsCsv(options: $options)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation exportLibraryToMyAnimeList($options: MdlibraryToMyAnimeListExportOption!) {\n\t\tlibrary {\n\t\t\texportAsMyAnimeList(options: $options)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation exportLibraryToMyAnimeList($options: MdlibraryToMyAnimeListExportOption!) {\n\t\tlibrary {\n\t\t\texportAsMyAnimeList(options: $options)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery currentUserLibraryUnfiltered($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tunfiltered(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery currentUserLibraryUnfiltered($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tunfiltered(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery libraryTitleMap($status: ReadingStatus) {\n\t\tmanga {\n\t\t\tgetMangaStatus(status: $status) {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery libraryTitleMap($status: ReadingStatus) {\n\t\tmanga {\n\t\t\tgetMangaStatus(status: $status) {\n\t\t\t\tid\n\t\t\t\tstatus\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery currentUserLibraryOnHold($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tonHold(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery currentUserLibraryOnHold($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tonHold(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery currentUserLibraryPlanToRead($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tplanToRead(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery currentUserLibraryPlanToRead($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\tplanToRead(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery currentUserLibraryReReading($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\treReading(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery currentUserLibraryReReading($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\treReading(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery currentUserLibraryReading($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\treading(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery currentUserLibraryReading($param: UserLibrarySectionParam) {\n\t\tlibrary {\n\t\t\treading(param: $param) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery librarySize {\n\t\tlibrary {\n\t\t\tsize {\n\t\t\t\tunfiltered\n\t\t\t\tcompleted\n\t\t\t\tdropped\n\t\t\t\tplanToRead\n\t\t\t\treading\n\t\t\t\treReading\n\t\t\t\tonHold\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery librarySize {\n\t\tlibrary {\n\t\t\tsize {\n\t\t\t\tunfiltered\n\t\t\t\tcompleted\n\t\t\t\tdropped\n\t\t\t\tplanToRead\n\t\t\t\treading\n\t\t\t\treReading\n\t\t\t\tonHold\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery currentUserCustomLists($params: CurrentLoggedLists!) {\n\t\tcustomList {\n\t\t\tcurrentLoggedLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery currentUserCustomLists($params: CurrentLoggedLists!) {\n\t\tcustomList {\n\t\t\tcurrentLoggedLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation exportCustomListsToCSV($options: ExportCustomListsToCSVOptions!) {\n\t\tcustomList {\n\t\t\texport {\n\t\t\t\tasCsv(option: $options)\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation exportCustomListsToCSV($options: ExportCustomListsToCSVOptions!) {\n\t\tcustomList {\n\t\t\texport {\n\t\t\t\tasCsv(option: $options)\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation exportCustomListsToMAL($options: MdcustomListsToMyAnimeListExportOption!) {\n\t\tcustomList {\n\t\t\texport {\n\t\t\t\tasMyAnimeList(option: $options)\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation exportCustomListsToMAL($options: MdcustomListsToMyAnimeListExportOption!) {\n\t\tcustomList {\n\t\t\texport {\n\t\t\t\tasMyAnimeList(option: $options)\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation deleteCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation deleteCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tdelete(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery customListChapterFeed(\n\t\t$feedParam: CustomListMangaFeedParams!\n\t\t$mangaParam: MangaListParams\n\t\t$private: Boolean\n\t) {\n\t\tfeed {\n\t\t\tcustomListFeedGrouped(\n\t\t\t\tfeedParams: $feedParam\n\t\t\t\tmangaListParams: $mangaParam\n\t\t\t\tprivate: $private\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery customListChapterFeed(\n\t\t$feedParam: CustomListMangaFeedParams!\n\t\t$mangaParam: MangaListParams\n\t\t$private: Boolean\n\t) {\n\t\tfeed {\n\t\t\tcustomListFeedGrouped(\n\t\t\t\tfeedParams: $feedParam\n\t\t\t\tmangaListParams: $mangaParam\n\t\t\t\tprivate: $private\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation followCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation followCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation unfollowCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation unfollowCustomListMutation($id: UUID!) {\n\t\tcustomList {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery isFollowingCustomListQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingCustomList(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery isFollowingCustomListQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingCustomList(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getCustomListVersion1($id: UUID!) {\n\t\tcustomList {\n\t\t\tget(id: $id, private: true) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tversion\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getCustomListVersion1($id: UUID!) {\n\t\tcustomList {\n\t\t\tget(id: $id, private: true) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tversion\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation updateCustomListVisibility1(\n\t\t$id: UUID!\n\t\t$visibility: CustomListVisibility!\n\t\t$version: Int!\n\t) {\n\t\tcustomList {\n\t\t\tupdate(params: { listId: $id, version: $version, visibility: $visibility }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation updateCustomListVisibility1(\n\t\t$id: UUID!\n\t\t$visibility: CustomListVisibility!\n\t\t$version: Int!\n\t) {\n\t\tcustomList {\n\t\t\tupdate(params: { listId: $id, version: $version, visibility: $visibility }) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userFollowedCustomLists($limit: Int, $offset: Int) {\n\t\tfollows {\n\t\t\tcustomLists(param:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles \n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userFollowedCustomLists($limit: Int, $offset: Int) {\n\t\tfollows {\n\t\t\tcustomLists(param:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles \n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription listenToChapterReadMarker($id: UUID!) {\n\t\twatchReadMarker(chapterId: $id)\n\t}\n"
): (typeof documents)["\n\tsubscription listenToChapterReadMarker($id: UUID!) {\n\t\twatchReadMarker(chapterId: $id)\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tsubscription listenToAnyChapterReadMarker {\n\t\twatchReadMarkers {\n\t\t\tchapter\n\t\t\tread\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription listenToAnyChapterReadMarker {\n\t\twatchReadMarkers {\n\t\t\tchapter\n\t\t\tread\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation mutateReadMarkersBatch($unreads: [UUID!]!, $read: [UUID!]!, $updateHistory: Boolean) {\n\t\treadMarker {\n\t\t\treadMarkersBatch(\n\t\t\t\tchapterIdsRead: $read\n\t\t\t\tchapterIdsUnread: $unreads\n\t\t\t\tupdateHistory: $updateHistory\n\t\t\t)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation mutateReadMarkersBatch($unreads: [UUID!]!, $read: [UUID!]!, $updateHistory: Boolean) {\n\t\treadMarker {\n\t\t\treadMarkersBatch(\n\t\t\t\tchapterIdsRead: $read\n\t\t\t\tchapterIdsUnread: $unreads\n\t\t\t\tupdateHistory: $updateHistory\n\t\t\t)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery chaptersReadMarkers($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tchapterReadMarkers(chapters: $ids)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery chaptersReadMarkers($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tchapterReadMarkers(chapters: $ids)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery mangaReadMarkers($id: UUID!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkersByMangaId(mangaId: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery mangaReadMarkers($id: UUID!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkersByMangaId(mangaId: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery mangasReadMarkers($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkers(mangaIds: $ids)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery mangasReadMarkers($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkers(mangaIds: $ids)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery mangasReadMarkersGrouped($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkersGrouped(mangaIds: $ids) {\n\t\t\t\tmangaId\n\t\t\t\tchapters\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery mangasReadMarkersGrouped($ids: [UUID!]!) {\n\t\treadMarker {\n\t\t\tmangaReadMarkersGrouped(mangaIds: $ids) {\n\t\t\t\tmangaId\n\t\t\t\tchapters\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tquery tagPopulatTitlesQuery($id: UUID!, $params: TagPopularList) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\tpopularInfSection(params: $params) {\n\t\t\t\t\tlimit\n\t\t\t\t\toffset\n\t\t\t\t\ttotal\n\t\t\t\t\tdata {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tyear\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery tagPopulatTitlesQuery($id: UUID!, $params: TagPopularList) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\tpopularInfSection(params: $params) {\n\t\t\t\t\tlimit\n\t\t\t\t\toffset\n\t\t\t\t\ttotal\n\t\t\t\t\tdata {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tyear\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery tagRecentlyPopularQuery($id: UUID!) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\trecentlyAdded {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tyear\n\t\t\t\t\t\taltTitles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery tagRecentlyPopularQuery($id: UUID!) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\trecentlyAdded {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tyear\n\t\t\t\t\t\taltTitles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery tagTopTenQuery($id: UUID!) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\ttopTen {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tyear\n\t\t\t\t\t\taltTitles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery tagTopTenQuery($id: UUID!) {\n\t\ttag {\n\t\t\tpage(id: $id) {\n\t\t\t\ttopTen {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tyear\n\t\t\t\t\t\taltTitles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation exportTitlesToCSV($options: ExportIdsLibraryToCSVOptions!) {\n\t\tmanga {\n\t\t\texport {\n\t\t\t\tidsAsCsv(options: $options)\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation exportTitlesToCSV($options: ExportIdsLibraryToCSVOptions!) {\n\t\tmanga {\n\t\t\texport {\n\t\t\t\tidsAsCsv(options: $options)\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation exportTitlesToMAL($options: MdidsToMyAnimeListExportOption!) {\n\t\tmanga {\n\t\t\texport {\n\t\t\t\tidsAsMyAnimeList(options: $options)\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation exportTitlesToMAL($options: MdidsToMyAnimeListExportOption!) {\n\t\tmanga {\n\t\t\texport {\n\t\t\t\tidsAsMyAnimeList(options: $options)\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userLoggedChapterFeed(\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: MangaFeedSortOrder! = { readableAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tfeed {\n\t\t\tuserLoggedMangaFeedGrouped(\n\t\t\t\tfeedParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: $order\n\t\t\t\t\ttranslatedLanguage: $translatedLanguages\n\t\t\t\t\tincludeFutureUpdates: EXCLUDE\n\t\t\t\t\tincludeExternalUrl: EXCLUDE\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userLoggedChapterFeed(\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: MangaFeedSortOrder! = { readableAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tfeed {\n\t\t\tuserLoggedMangaFeedGrouped(\n\t\t\t\tfeedParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: $order\n\t\t\t\t\ttranslatedLanguage: $translatedLanguages\n\t\t\t\t\tincludeFutureUpdates: EXCLUDE\n\t\t\t\t\tincludeExternalUrl: EXCLUDE\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getMangaHihi($id: UUID!) {\n\t\tmanga {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\taltTitles\n\t\t\t\t\tstate\n\t\t\t\t\tstatus\n\t\t\t\t\tdescription\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\tyear\n\t\t\t\t\tcontentRating\n\t\t\t\t\tpublicationDemographic\n\t\t\t\t\tlastVolume\n\t\t\t\t\tlastChapter\n\t\t\t\t\tlatestUploadedChapter\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\toriginalLanguage\n\t\t\t\t\tlinks {\n\t\t\t\t\t\thasNoLinks\n\t\t\t\t\t\tamazon\n\t\t\t\t\t\tanilist\n\t\t\t\t\t\tanimePlanet\n\t\t\t\t\t\tbookWalker\n\t\t\t\t\t\tcdJapan\n\t\t\t\t\t\tebookJapan\n\t\t\t\t\t\tenglishTranslation\n\t\t\t\t\t\tkitsu\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tmyAnimeList\n\t\t\t\t\t\tnovelUpdates\n\t\t\t\t\t\traw\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgroup\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tartists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcoverArt {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\tlocale\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\trelated\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getMangaHihi($id: UUID!) {\n\t\tmanga {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\taltTitles\n\t\t\t\t\tstate\n\t\t\t\t\tstatus\n\t\t\t\t\tdescription\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\tyear\n\t\t\t\t\tcontentRating\n\t\t\t\t\tpublicationDemographic\n\t\t\t\t\tlastVolume\n\t\t\t\t\tlastChapter\n\t\t\t\t\tlatestUploadedChapter\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\toriginalLanguage\n\t\t\t\t\tlinks {\n\t\t\t\t\t\thasNoLinks\n\t\t\t\t\t\tamazon\n\t\t\t\t\t\tanilist\n\t\t\t\t\t\tanimePlanet\n\t\t\t\t\t\tbookWalker\n\t\t\t\t\t\tcdJapan\n\t\t\t\t\t\tebookJapan\n\t\t\t\t\t\tenglishTranslation\n\t\t\t\t\t\tkitsu\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tmyAnimeList\n\t\t\t\t\t\tnovelUpdates\n\t\t\t\t\t\traw\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgroup\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tartists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcoverArt {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\tlocale\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\trelated\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation followTitleMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation followTitleMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation unfollowTitleMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation unfollowTitleMutation($id: UUID!) {\n\t\tmanga {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery isFollowingTitleQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingManga(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery isFollowingTitleQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingManga(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery mangaStatistics($id: UUID!) {\n\t\tstatistics {\n\t\t\tmanga {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t\tfollowCount\n\t\t\t\t\trating {\n\t\t\t\t\t\tbayesian\n\t\t\t\t\t\tdistrubution {\n\t\t\t\t\t\t\tr1\n\t\t\t\t\t\t\tr2\n\t\t\t\t\t\t\tr3\n\t\t\t\t\t\t\tr4\n\t\t\t\t\t\t\tr5\n\t\t\t\t\t\t\tr6\n\t\t\t\t\t\t\tr7\n\t\t\t\t\t\t\tr8\n\t\t\t\t\t\t\tr9\n\t\t\t\t\t\t\tr10\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery mangaStatistics($id: UUID!) {\n\t\tstatistics {\n\t\t\tmanga {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t\tfollowCount\n\t\t\t\t\trating {\n\t\t\t\t\t\tbayesian\n\t\t\t\t\t\tdistrubution {\n\t\t\t\t\t\t\tr1\n\t\t\t\t\t\t\tr2\n\t\t\t\t\t\t\tr3\n\t\t\t\t\t\t\tr4\n\t\t\t\t\t\t\tr5\n\t\t\t\t\t\t\tr6\n\t\t\t\t\t\t\tr7\n\t\t\t\t\t\t\tr8\n\t\t\t\t\t\t\tr9\n\t\t\t\t\t\t\tr10\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery latestUploadsPageQuery($offset: Int, $limit: Int) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\tincludeEmptyPages: EXCLUDE\n\t\t\t\t\tincludeExternalUrl: EXCLUDE\n\t\t\t\t\tincludeFutureUpdates: EXCLUDE\n\t\t\t\t\tincludeFuturePublishAt: EXCLUDE\n\t\t\t\t\torder: { readableAt: DESCENDING }\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t}\n\t\t\t\tfeedContent: true\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery latestUploadsPageQuery($offset: Int, $limit: Int) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\tincludeEmptyPages: EXCLUDE\n\t\t\t\t\tincludeExternalUrl: EXCLUDE\n\t\t\t\t\tincludeFutureUpdates: EXCLUDE\n\t\t\t\t\tincludeFuturePublishAt: EXCLUDE\n\t\t\t\t\torder: { readableAt: DESCENDING }\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t}\n\t\t\t\tfeedContent: true\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery randomTitle($options: MangaRandomParams) {\n\t\tmanga {\n\t\t\trandom(params: $options) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery randomTitle($options: MangaRandomParams) {\n\t\tmanga {\n\t\t\trandom(params: $options) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery recentlyAddedPageQuery($params: MangaListParams) {\n\t\thome {\n\t\t\trecentlyAdded(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery recentlyAddedPageQuery($params: MangaListParams) {\n\t\thome {\n\t\t\trecentlyAdded(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery defaultMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlist(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery defaultMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlist(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery offlineMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlistOffline(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery offlineMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlistOffline(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userFollowedTitles($limit: Int, $offset: Int) {\n\t\tfollows {\n\t\t\tmangas(params:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userFollowedTitles($limit: Int, $offset: Int) {\n\t\tfollows {\n\t\t\tmangas(params:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tpublicationDemographic\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userPageQuery($id: UUID!) {\n\t\tuser {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tgroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { uploaders: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userPageQuery($id: UUID!) {\n\t\tuser {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tgroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { uploaders: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation followUserMutation($id: UUID!) {\n\t\tuser {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation followUserMutation($id: UUID!) {\n\t\tuser {\n\t\t\tfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation unfollowUserMutation($id: UUID!) {\n\t\tuser {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation unfollowUserMutation($id: UUID!) {\n\t\tuser {\n\t\t\tunfollow(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery isFollowingUserQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingUser(id: $id)\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery isFollowingUserQuery($id: UUID!) {\n\t\tfollows {\n\t\t\tisFollowingUser(id: $id)\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userCustomLists($params: UserCustomListParams!) {\n\t\tcustomList {\n\t\t\tgetUserLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userCustomLists($params: UserCustomListParams!) {\n\t\tcustomList {\n\t\t\tgetUserLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userUploadsFeed(\n\t\t$user: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tuploaders: [$user]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userUploadsFeed(\n\t\t$user: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tuploaders: [$user]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userSearch($params: UserListParam!) {\n\t\tuser {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userSearch($params: UserListParam!) {\n\t\tuser {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery userFollowedUsers($offset: Int, $limit: Int) {\n\t\tfollows {\n\t\t\tusers(param:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tgroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userFollowedUsers($offset: Int, $limit: Int) {\n\t\tfollows {\n\t\t\tusers(param:  {\n\t\t\t   limit: $limit\n\t\t\t   offset: $offset\n\t\t\t}) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tgroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tsubscription chapterPagesSubscription($chapter: UUID!, $mode: DownloadMode) {\n\t\tgetChapterPages(chapter: $chapter, mode: $mode) {\n\t\t\tpages\n\t\t\tindex\n\t\t\tsize {\n\t\t\t\twidth\n\t\t\t\theight\n\t\t\t}\n\t\t\turl\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription chapterPagesSubscription($chapter: UUID!, $mode: DownloadMode) {\n\t\tgetChapterPages(chapter: $chapter, mode: $mode) {\n\t\t\tpages\n\t\t\tindex\n\t\t\tsize {\n\t\t\t\twidth\n\t\t\t\theight\n\t\t\t}\n\t\t\turl\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation startChapterPagesCaching($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tstartCaching\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation startChapterPagesCaching($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tstartCaching\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation fetchingChapterPagesMetadata($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tfetchMetadata\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation fetchingChapterPagesMetadata($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tfetchMetadata\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation refetchChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\trefetchPage(page: $page)\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation refetchChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\trefetchPage(page: $page)\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation resendChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tresendPage(page: $page)\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation resendChapterPage($chapter: UUID!, $mode: DownloadMode, $page: Int!) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tresendPage(page: $page)\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation resendChapterPages($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tresendAll\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation resendChapterPages($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\tresendAll\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation refetchIncompletesPages($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\trefetchIncompletes\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation refetchIncompletesPages($chapter: UUID!, $mode: DownloadMode) {\n\t\tchapter {\n\t\t\tpagesCache(id: $chapter, mode: $mode) {\n\t\t\t\trefetchIncompletes\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tsubscription chapterLayoutSubscription {\n\t\twatchChapterLayout {\n\t\t\tdrawer\n\t\t\tsidebar\n\t\t\tprogress\n\t\t}\n\t}\n"
): (typeof documents)["\n\tsubscription chapterLayoutSubscription {\n\t\twatchChapterLayout {\n\t\t\tdrawer\n\t\t\tsidebar\n\t\t\tprogress\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tmutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode, $progress: ProgressMode) {\n\t\tuserOption {\n\t\t\tsetChapterLayout(sidebar: $sidebar, drawer: $drawer, progress: $progress) {\n\t\t\t\tsidebar\n\t\t\t\tdrawer\n\t\t\t\tprogress\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation setChapterLayout($sidebar: SidebarMode, $drawer: DrawerMode, $progress: ProgressMode) {\n\t\tuserOption {\n\t\t\tsetChapterLayout(sidebar: $sidebar, drawer: $drawer, progress: $progress) {\n\t\t\t\tsidebar\n\t\t\t\tdrawer\n\t\t\t\tprogress\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tmutation createForumThread($id: UUID!, $threadType: ForumThreadType!) {\n\t\tforums {\n\t\t\tcreateThread(params: {\n\t\t\t\tid: $id,\n\t\t\t\ttype: $threadType\n\t\t\t}) {\n\t\t\t\tforumId\n\t\t\t\tforumUrl\n\t\t\t\trepliesCount\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tmutation createForumThread($id: UUID!, $threadType: ForumThreadType!) {\n\t\tforums {\n\t\t\tcreateThread(params: {\n\t\t\t\tid: $id,\n\t\t\t\ttype: $threadType\n\t\t\t}) {\n\t\t\t\tforumId\n\t\t\t\tforumUrl\n\t\t\t\trepliesCount\n\t\t\t}\n\t\t}\n\t}\n"];
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
