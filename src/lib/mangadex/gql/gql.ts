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
	"\n\tquery isChapterDownloaded($id: UUID!) {\n\t\tchapter {\n\t\t\tisDownloaded(id: $id) {\n\t\t\t\tisDownloaded\n\t\t\t\thasFailed\n\t\t\t}\n\t\t}\n\t}\n": typeof types.IsChapterDownloadedDocument;
	"\n\tsubscription watchChapterDownloadState($id: UUID!) {\n\t\twatchDownloadState(objectId: $id) {\n\t\t\thasFailed\n\t\t\tisDownloaded\n\t\t}\n\t}\n": typeof types.WatchChapterDownloadStateDocument;
	"\n\tquery recentlyAddedHome {\n\t\thome {\n\t\t\trecentlyUploaded {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tpages\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\tvolume\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmanga {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RecentlyAddedHomeDocument;
	"\n\tquery homePopularTitle {\n\t\thome {\n\t\t\tpopularTitles {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.HomePopularTitleDocument;
	"\n\tquery recentlyAddedHomeQuery {\n\t\thome {\n\t\t\trecentlyAdded(params: { limit: 15 }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RecentlyAddedHomeQueryDocument;
	"\n\tquery seasonal {\n\t\thome {\n\t\t\tseasonal {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.SeasonalDocument;
	"\n\tquery staffPicks {\n\t\thome {\n\t\t\tstaffPicks {\n\t\t\t\tid\n\t\t\t\trelationships {\n\t\t\t\t\ttitles {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\taltTitles\n\t\t\t\t\t\t\tstate\n\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\tstatus\n\t\t\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.StaffPicksDocument;
	"\n\tmutation mangaListMutation($style: MangaListStyle!) {\n\t\tuserOption {\n\t\t\tsetMangaListStyle(mangaListStyle: $style)\n\t\t}\n\t}\n": typeof types.MangaListMutationDocument;
	"\n\tsubscription mangaListStyleSub {\n\t\twatchMangaListStyle\n\t}\n": typeof types.MangaListStyleSubDocument;
	"\n\tquery mangaAggregate($id: UUID!, $size: Int = 3) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tchunked(chunkSize: $size) {\n\t\t\t\t\tids\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tcount\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.MangaAggregateDocument;
	"\n\tquery getMangaAggregateChapter($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangaAggregateChapterDocument;
	"\n\tquery chapterAggregateComments($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ChapterAggregateCommentsDocument;
	"\n\tquery getMangaCovers($id: UUID!, $offset: Int = 0, $limit: Int = 10) {\n\t\tcover {\n\t\t\tlist(\n\t\t\t\tparams: {\n\t\t\t\t\tmangaIds: [$id]\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: { volume: ASCENDING }\n\t\t\t\t}\n\t\t\t) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tfileName\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tlocale\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\ttotal\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangaCoversDocument;
	"\n\tquery getRelatedTitlesData($ids: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetRelatedTitlesDataDocument;
	"\n\tquery authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {\n\t\tauthor {\n\t\t\tlist(params: { name: $name, offset: $offset, limit: $limit }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AuthorSearchFetcherDocument;
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
	"\n\tsubscription chapterFeedStyleSub {\n\t\twatchChapterFeedStyle\n\t}\n": typeof types.ChapterFeedStyleSubDocument;
	"\n\tmutation updateChapterFeedStyle($style: ChapterFeedStyle!) {\n\t\tuserOption {\n\t\t\tsetChapterFeedStyle(style: $style)\n\t\t}\n\t}\n": typeof types.UpdateChapterFeedStyleDocument;
	"\n\tsubscription chapterQualitySubscription {\n\t\twatchChapterQuality\n\t}\n": typeof types.ChapterQualitySubscriptionDocument;
	"\n\tmutation chapterQualityMutation($quality: DownloadMode) {\n\t\tuserOption {\n\t\t\tsetChapterQuality(quality: $quality)\n\t\t}\n\t}\n": typeof types.ChapterQualityMutationDocument;
	"\n\tsubscription currentClientInfo {\n\t\twatchClientInfo {\n\t\t\tclientSecret\n\t\t\tclientId\n\t\t}\n\t}\n": typeof types.CurrentClientInfoDocument;
	"\n\tmutation setAuthClient($clientId: String!, $clientSecret: String!) {\n\t\toauth {\n\t\t\tsetClientInfo(clientId: $clientId, clientSecret: $clientSecret)\n\t\t}\n\t}\n": typeof types.SetAuthClientDocument;
	"\n\tmutation resetAuthClient {\n\t\toauth {\n\t\t\tclearClientInfo\n\t\t}\n\t}\n": typeof types.ResetAuthClientDocument;
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
	"\n\t\t\tquery coverImage(\n\t\t\t\t$cover_id: UUID!\n\t\t\t\t$manga_id: UUID!\n\t\t\t\t$filename: String!\n\t\t\t\t$mode: CoverImageQuality\n\t\t\t) {\n\t\t\t\tcover {\n\t\t\t\t\tgetImage(\n\t\t\t\t\t\tcoverId: $cover_id\n\t\t\t\t\t\tmangaId: $manga_id\n\t\t\t\t\t\tfilename: $filename\n\t\t\t\t\t\tmode: $mode\n\t\t\t\t\t)\n\t\t\t\t}\n\t\t\t}\n\t\t": typeof types.CoverImageDocument;
	"\n\tquery favicon($url: Url!) {\n\t\tutils {\n\t\t\tfavicon(url: $url)\n\t\t}\n\t}\n": typeof types.FaviconDocument;
	"\n\tquery getLanguageFromStr($lang: String!) {\n\t\tutils {\n\t\t\tstrToLanguage(input: $lang)\n\t\t}\n\t}\n": typeof types.GetLanguageFromStrDocument;
	"\n\t\t\t\tmutation mountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.MountAppStateDocument;
	"\n\t\t\t\tmutation unmountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tunmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t": typeof types.UnmountAppStateDocument;
	"\n\tquery chaptersStats($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ChaptersStatsDocument;
	"\n\tquery authorsSearch($params: AuthorListParams!) {\n\t\tauthor {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tworks {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AuthorsSearchDocument;
	"\n\tquery authorPageQuery($id: UUID!) {\n\t\tauthor {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\timageUrl\n\t\t\t\t\tbiography\n\t\t\t\t\ttwitter\n\t\t\t\t\tpixiv\n\t\t\t\t\tmelonBook\n\t\t\t\t\tfanBox\n\t\t\t\t\tbooth\n\t\t\t\t\tnicoVideo\n\t\t\t\t\tskeb\n\t\t\t\t\tfantia\n\t\t\t\t\ttumblr\n\t\t\t\t\tyoutube\n\t\t\t\t\tweibo\n\t\t\t\t\tnaver\n\t\t\t\t\twebsite\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { authorOrArtist: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.AuthorPageQueryDocument;
	"\n\tquery getChapterPageData($id: UUID!) {\n\t\tchapter {\n\t\t\tpages(id: $id) {\n\t\t\t\tdata\n\t\t\t\tdataSaver\n\t\t\t}\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tvolume\n\t\t\t\t\tchapter\n\t\t\t\t\tpages\n\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\texternalUrl\n\t\t\t\t\treadableAt\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetChapterPageDataDocument;
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
	"\n\tquery scanalationGroupSearch($params: ScanlationGroupListParams!) {\n\t\tscanlationGroup {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmembers {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ScanalationGroupSearchDocument;
	"\n\tquery groupPageQuery($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tgetUnique(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\twebsite\n\t\t\t\t\ttwitter\n\t\t\t\t\tname\n\t\t\t\t\taltNames\n\t\t\t\t\tircServer\n\t\t\t\t\tircChannel\n\t\t\t\t\tcontactEmail\n\t\t\t\t\tmangaUpdates\n\t\t\t\t\tfocusedLanguages\n\t\t\t\t\tlocked\n\t\t\t\t\tofficial\n\t\t\t\t\tverified\n\t\t\t\t\texLicensed\n\t\t\t\t\tpublishDelay\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tdescription\n\t\t\t\t\tdiscord\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tleader {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmembers {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { group: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t\tstatistics {\n\t\t\tgroup {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { groups: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GroupPageQueryDocument;
	"\n\tquery scanlationUploadsFeed(\n\t\t$group: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tgroups: [$group]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.ScanlationUploadsFeedDocument;
	"\n\tmutation loginMutation($username: Username!, $password: Password!) {\n\t\toauth {\n\t\t\tlogin(password: $password, username: $username)\n\t\t}\n\t}\n": typeof types.LoginMutationDocument;
	"\n\tmutation logoutMutation {\n\t\toauth {\n\t\t\tlogout\n\t\t}\n\t}\n": typeof types.LogoutMutationDocument;
	"\n\tsubscription listenToMangaTasksIDs {\n\t\twatchMangaTasksList\n\t}\n": typeof types.ListenToMangaTasksIDsDocument;
	"\n\tsubscription listenToChapterTasksIDs {\n\t\twatchChaptersTasksList\n\t}\n": typeof types.ListenToChapterTasksIDsDocument;
	"\n\tsubscription listenToCoverTasksIDs {\n\t\twatchCoverTasksList\n\t}\n": typeof types.ListenToCoverTasksIDsDocument;
	"\n\tquery getMangaHihi($id: UUID!) {\n\t\tmanga {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\taltTitles\n\t\t\t\t\tstate\n\t\t\t\t\tstatus\n\t\t\t\t\tdescription\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\tyear\n\t\t\t\t\tcontentRating\n\t\t\t\t\tpublicationDemographic\n\t\t\t\t\tlastVolume\n\t\t\t\t\tlastChapter\n\t\t\t\t\tlatestUploadedChapter\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\toriginalLanguage\n\t\t\t\t\tlinks {\n\t\t\t\t\t\thasNoLinks\n\t\t\t\t\t\tamazon\n\t\t\t\t\t\tanilist\n\t\t\t\t\t\tanimePlanet\n\t\t\t\t\t\tbookWalker\n\t\t\t\t\t\tcdJapan\n\t\t\t\t\t\tebookJapan\n\t\t\t\t\t\tenglishTranslation\n\t\t\t\t\t\tkitsu\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tmyAnimeList\n\t\t\t\t\t\tnovelUpdates\n\t\t\t\t\t\traw\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgroup\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tartists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcoverArt {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\tlocale\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\trelated\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.GetMangaHihiDocument;
	"\n\tquery mangaStatistics($id: UUID!) {\n\t\tstatistics {\n\t\t\tmanga {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t\tfollowCount\n\t\t\t\t\trating {\n\t\t\t\t\t\tbayesian\n\t\t\t\t\t\tdistrubution {\n\t\t\t\t\t\t\tr1\n\t\t\t\t\t\t\tr2\n\t\t\t\t\t\t\tr3\n\t\t\t\t\t\t\tr4\n\t\t\t\t\t\t\tr5\n\t\t\t\t\t\t\tr6\n\t\t\t\t\t\t\tr7\n\t\t\t\t\t\t\tr8\n\t\t\t\t\t\t\tr9\n\t\t\t\t\t\t\tr10\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.MangaStatisticsDocument;
	"\n\tquery randomTitle($options: MangaRandomParams) {\n\t\tmanga {\n\t\t\trandom(params: $options) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n": typeof types.RandomTitleDocument;
	"\n\tquery defaultMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlist(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.DefaultMangaSearchQueryDocument;
	"\n\tquery offlineMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlistOffline(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.OfflineMangaSearchQueryDocument;
	"\n\tquery userSearch($params: UserListParam!) {\n\t\tuser {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserSearchDocument;
	"\n\tquery userPageQuery($id: UUID!) {\n\t\tuser {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tgroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { uploaders: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserPageQueryDocument;
	"\n\tquery userCustomLists($params: UserCustomListParams!) {\n\t\tcustomList {\n\t\t\tgetUserLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserCustomListsDocument;
	"\n\tquery userUploadsFeed(\n\t\t$user: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tuploaders: [$user]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.UserUploadsFeedDocument;
};
const documents: Documents = {
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
	"\n\tmutation mangaListMutation($style: MangaListStyle!) {\n\t\tuserOption {\n\t\t\tsetMangaListStyle(mangaListStyle: $style)\n\t\t}\n\t}\n":
		types.MangaListMutationDocument,
	"\n\tsubscription mangaListStyleSub {\n\t\twatchMangaListStyle\n\t}\n":
		types.MangaListStyleSubDocument,
	"\n\tquery mangaAggregate($id: UUID!, $size: Int = 3) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tchunked(chunkSize: $size) {\n\t\t\t\t\tids\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tcount\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.MangaAggregateDocument,
	"\n\tquery getMangaAggregateChapter($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetMangaAggregateChapterDocument,
	"\n\tquery chapterAggregateComments($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ChapterAggregateCommentsDocument,
	"\n\tquery getMangaCovers($id: UUID!, $offset: Int = 0, $limit: Int = 10) {\n\t\tcover {\n\t\t\tlist(\n\t\t\t\tparams: {\n\t\t\t\t\tmangaIds: [$id]\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\torder: { volume: ASCENDING }\n\t\t\t\t}\n\t\t\t) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tfileName\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tlocale\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\ttotal\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetMangaCoversDocument,
	"\n\tquery getRelatedTitlesData($ids: [UUID!]!) {\n\t\tmanga {\n\t\t\tlist(params: { mangaIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tdescription\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetRelatedTitlesDataDocument,
	"\n\tquery authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {\n\t\tauthor {\n\t\t\tlist(params: { name: $name, offset: $offset, limit: $limit }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.AuthorSearchFetcherDocument,
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
	"\n\tsubscription chapterFeedStyleSub {\n\t\twatchChapterFeedStyle\n\t}\n":
		types.ChapterFeedStyleSubDocument,
	"\n\tmutation updateChapterFeedStyle($style: ChapterFeedStyle!) {\n\t\tuserOption {\n\t\t\tsetChapterFeedStyle(style: $style)\n\t\t}\n\t}\n":
		types.UpdateChapterFeedStyleDocument,
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
	"\n\t\t\tquery coverImage(\n\t\t\t\t$cover_id: UUID!\n\t\t\t\t$manga_id: UUID!\n\t\t\t\t$filename: String!\n\t\t\t\t$mode: CoverImageQuality\n\t\t\t) {\n\t\t\t\tcover {\n\t\t\t\t\tgetImage(\n\t\t\t\t\t\tcoverId: $cover_id\n\t\t\t\t\t\tmangaId: $manga_id\n\t\t\t\t\t\tfilename: $filename\n\t\t\t\t\t\tmode: $mode\n\t\t\t\t\t)\n\t\t\t\t}\n\t\t\t}\n\t\t":
		types.CoverImageDocument,
	"\n\tquery favicon($url: Url!) {\n\t\tutils {\n\t\t\tfavicon(url: $url)\n\t\t}\n\t}\n":
		types.FaviconDocument,
	"\n\tquery getLanguageFromStr($lang: String!) {\n\t\tutils {\n\t\t\tstrToLanguage(input: $lang)\n\t\t}\n\t}\n":
		types.GetLanguageFromStrDocument,
	"\n\t\t\t\tmutation mountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t":
		types.MountAppStateDocument,
	"\n\t\t\t\tmutation unmountAppState {\n\t\t\t\t\tofflineAppState {\n\t\t\t\t\t\tunmountOfflineAppState\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t":
		types.UnmountAppStateDocument,
	"\n\tquery chaptersStats($ids: [UUID!]!) {\n\t\tstatistics {\n\t\t\tchapter {\n\t\t\t\tlist(ids: $ids) {\n\t\t\t\t\tid\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ChaptersStatsDocument,
	"\n\tquery authorsSearch($params: AuthorListParams!) {\n\t\tauthor {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tworks {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.AuthorsSearchDocument,
	"\n\tquery authorPageQuery($id: UUID!) {\n\t\tauthor {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\timageUrl\n\t\t\t\t\tbiography\n\t\t\t\t\ttwitter\n\t\t\t\t\tpixiv\n\t\t\t\t\tmelonBook\n\t\t\t\t\tfanBox\n\t\t\t\t\tbooth\n\t\t\t\t\tnicoVideo\n\t\t\t\t\tskeb\n\t\t\t\t\tfantia\n\t\t\t\t\ttumblr\n\t\t\t\t\tyoutube\n\t\t\t\t\tweibo\n\t\t\t\t\tnaver\n\t\t\t\t\twebsite\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { authorOrArtist: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.AuthorPageQueryDocument,
	"\n\tquery getChapterPageData($id: UUID!) {\n\t\tchapter {\n\t\t\tpages(id: $id) {\n\t\t\t\tdata\n\t\t\t\tdataSaver\n\t\t\t}\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tvolume\n\t\t\t\t\tchapter\n\t\t\t\t\tpages\n\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\texternalUrl\n\t\t\t\t\treadableAt\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetChapterPageDataDocument,
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
	"\n\tquery scanalationGroupSearch($params: ScanlationGroupListParams!) {\n\t\tscanlationGroup {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmembers {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ScanalationGroupSearchDocument,
	"\n\tquery groupPageQuery($id: UUID!) {\n\t\tscanlationGroup {\n\t\t\tgetUnique(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\twebsite\n\t\t\t\t\ttwitter\n\t\t\t\t\tname\n\t\t\t\t\taltNames\n\t\t\t\t\tircServer\n\t\t\t\t\tircChannel\n\t\t\t\t\tcontactEmail\n\t\t\t\t\tmangaUpdates\n\t\t\t\t\tfocusedLanguages\n\t\t\t\t\tlocked\n\t\t\t\t\tofficial\n\t\t\t\t\tverified\n\t\t\t\t\texLicensed\n\t\t\t\t\tpublishDelay\n\t\t\t\t\tcreatedAt\n\t\t\t\t\tdescription\n\t\t\t\t\tdiscord\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tleader {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmembers {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { group: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t\tstatistics {\n\t\t\tgroup {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { groups: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.GroupPageQueryDocument,
	"\n\tquery scanlationUploadsFeed(\n\t\t$group: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tgroups: [$group]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.ScanlationUploadsFeedDocument,
	"\n\tmutation loginMutation($username: Username!, $password: Password!) {\n\t\toauth {\n\t\t\tlogin(password: $password, username: $username)\n\t\t}\n\t}\n":
		types.LoginMutationDocument,
	"\n\tmutation logoutMutation {\n\t\toauth {\n\t\t\tlogout\n\t\t}\n\t}\n":
		types.LogoutMutationDocument,
	"\n\tsubscription listenToMangaTasksIDs {\n\t\twatchMangaTasksList\n\t}\n":
		types.ListenToMangaTasksIDsDocument,
	"\n\tsubscription listenToChapterTasksIDs {\n\t\twatchChaptersTasksList\n\t}\n":
		types.ListenToChapterTasksIDsDocument,
	"\n\tsubscription listenToCoverTasksIDs {\n\t\twatchCoverTasksList\n\t}\n":
		types.ListenToCoverTasksIDsDocument,
	"\n\tquery getMangaHihi($id: UUID!) {\n\t\tmanga {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\taltTitles\n\t\t\t\t\tstate\n\t\t\t\t\tstatus\n\t\t\t\t\tdescription\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\tyear\n\t\t\t\t\tcontentRating\n\t\t\t\t\tpublicationDemographic\n\t\t\t\t\tlastVolume\n\t\t\t\t\tlastChapter\n\t\t\t\t\tlatestUploadedChapter\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\toriginalLanguage\n\t\t\t\t\tlinks {\n\t\t\t\t\t\thasNoLinks\n\t\t\t\t\t\tamazon\n\t\t\t\t\t\tanilist\n\t\t\t\t\t\tanimePlanet\n\t\t\t\t\t\tbookWalker\n\t\t\t\t\t\tcdJapan\n\t\t\t\t\t\tebookJapan\n\t\t\t\t\t\tenglishTranslation\n\t\t\t\t\t\tkitsu\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tmyAnimeList\n\t\t\t\t\t\tnovelUpdates\n\t\t\t\t\t\traw\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgroup\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tartists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcoverArt {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\tlocale\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\trelated\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.GetMangaHihiDocument,
	"\n\tquery mangaStatistics($id: UUID!) {\n\t\tstatistics {\n\t\t\tmanga {\n\t\t\t\tget(id: $id) {\n\t\t\t\t\tcomments {\n\t\t\t\t\t\tthreadUrl\n\t\t\t\t\t\trepliesCount\n\t\t\t\t\t}\n\t\t\t\t\tfollowCount\n\t\t\t\t\trating {\n\t\t\t\t\t\tbayesian\n\t\t\t\t\t\tdistrubution {\n\t\t\t\t\t\t\tr1\n\t\t\t\t\t\t\tr2\n\t\t\t\t\t\t\tr3\n\t\t\t\t\t\t\tr4\n\t\t\t\t\t\t\tr5\n\t\t\t\t\t\t\tr6\n\t\t\t\t\t\t\tr7\n\t\t\t\t\t\t\tr8\n\t\t\t\t\t\t\tr9\n\t\t\t\t\t\t\tr10\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.MangaStatisticsDocument,
	"\n\tquery randomTitle($options: MangaRandomParams) {\n\t\tmanga {\n\t\t\trandom(params: $options) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n":
		types.RandomTitleDocument,
	"\n\tquery defaultMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlist(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.DefaultMangaSearchQueryDocument,
	"\n\tquery offlineMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlistOffline(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.OfflineMangaSearchQueryDocument,
	"\n\tquery userSearch($params: UserListParam!) {\n\t\tuser {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tusername\n\t\t\t\t\t\troles\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserSearchDocument,
	"\n\tquery userPageQuery($id: UUID!) {\n\t\tuser {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tgroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { uploaders: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserPageQueryDocument,
	"\n\tquery userCustomLists($params: UserCustomListParams!) {\n\t\tcustomList {\n\t\t\tgetUserLists(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t\tvisibility\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\ttitlesIds\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserCustomListsDocument,
	"\n\tquery userUploadsFeed(\n\t\t$user: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tuploaders: [$user]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n":
		types.UserUploadsFeedDocument
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
	source: "\n\tquery mangaAggregate($id: UUID!, $size: Int = 3) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tchunked(chunkSize: $size) {\n\t\t\t\t\tids\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tcount\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery mangaAggregate($id: UUID!, $size: Int = 3) {\n\t\tmanga {\n\t\t\taggregate(params: { mangaId: $id }) {\n\t\t\t\tchunked(chunkSize: $size) {\n\t\t\t\t\tids\n\t\t\t\t\tvolumes {\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tcount\n\t\t\t\t\t\tchapters {\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tcount\n\t\t\t\t\t\t\tids\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getMangaAggregateChapter($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getMangaAggregateChapter($ids: [UUID!]!) {\n\t\tchapter {\n\t\t\tlist(params: { chapterIds: $ids }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tvolume\n\t\t\t\t\t\tchapter\n\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\treadableAt\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tquery authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {\n\t\tauthor {\n\t\t\tlist(params: { name: $name, offset: $offset, limit: $limit }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery authorSearchFetcher($name: String!, $offset: Int! = 0, $limit: Int! = 10) {\n\t\tauthor {\n\t\t\tlist(params: { name: $name, offset: $offset, limit: $limit }) {\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\toffset\n\t\t\t\tlimit\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\t\t\tquery coverImage(\n\t\t\t\t$cover_id: UUID!\n\t\t\t\t$manga_id: UUID!\n\t\t\t\t$filename: String!\n\t\t\t\t$mode: CoverImageQuality\n\t\t\t) {\n\t\t\t\tcover {\n\t\t\t\t\tgetImage(\n\t\t\t\t\t\tcoverId: $cover_id\n\t\t\t\t\t\tmangaId: $manga_id\n\t\t\t\t\t\tfilename: $filename\n\t\t\t\t\t\tmode: $mode\n\t\t\t\t\t)\n\t\t\t\t}\n\t\t\t}\n\t\t"
): (typeof documents)["\n\t\t\tquery coverImage(\n\t\t\t\t$cover_id: UUID!\n\t\t\t\t$manga_id: UUID!\n\t\t\t\t$filename: String!\n\t\t\t\t$mode: CoverImageQuality\n\t\t\t) {\n\t\t\t\tcover {\n\t\t\t\t\tgetImage(\n\t\t\t\t\t\tcoverId: $cover_id\n\t\t\t\t\t\tmangaId: $manga_id\n\t\t\t\t\t\tfilename: $filename\n\t\t\t\t\t\tmode: $mode\n\t\t\t\t\t)\n\t\t\t\t}\n\t\t\t}\n\t\t"];
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
	source: "\n\tquery authorPageQuery($id: UUID!) {\n\t\tauthor {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\timageUrl\n\t\t\t\t\tbiography\n\t\t\t\t\ttwitter\n\t\t\t\t\tpixiv\n\t\t\t\t\tmelonBook\n\t\t\t\t\tfanBox\n\t\t\t\t\tbooth\n\t\t\t\t\tnicoVideo\n\t\t\t\t\tskeb\n\t\t\t\t\tfantia\n\t\t\t\t\ttumblr\n\t\t\t\t\tyoutube\n\t\t\t\t\tweibo\n\t\t\t\t\tnaver\n\t\t\t\t\twebsite\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { authorOrArtist: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery authorPageQuery($id: UUID!) {\n\t\tauthor {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tname\n\t\t\t\t\timageUrl\n\t\t\t\t\tbiography\n\t\t\t\t\ttwitter\n\t\t\t\t\tpixiv\n\t\t\t\t\tmelonBook\n\t\t\t\t\tfanBox\n\t\t\t\t\tbooth\n\t\t\t\t\tnicoVideo\n\t\t\t\t\tskeb\n\t\t\t\t\tfantia\n\t\t\t\t\ttumblr\n\t\t\t\t\tyoutube\n\t\t\t\t\tweibo\n\t\t\t\t\tnaver\n\t\t\t\t\twebsite\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tmanga {\n\t\t\tlist(params: { authorOrArtist: $id }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery getChapterPageData($id: UUID!) {\n\t\tchapter {\n\t\t\tpages(id: $id) {\n\t\t\t\tdata\n\t\t\t\tdataSaver\n\t\t\t}\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tvolume\n\t\t\t\t\tchapter\n\t\t\t\t\tpages\n\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\texternalUrl\n\t\t\t\t\treadableAt\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getChapterPageData($id: UUID!) {\n\t\tchapter {\n\t\t\tpages(id: $id) {\n\t\t\t\tdata\n\t\t\t\tdataSaver\n\t\t\t}\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\tvolume\n\t\t\t\t\tchapter\n\t\t\t\t\tpages\n\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\texternalUrl\n\t\t\t\t\treadableAt\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\troles\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tquery scanalationGroupSearch($params: ScanlationGroupListParams!) {\n\t\tscanlationGroup {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmembers {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery scanalationGroupSearch($params: ScanlationGroupListParams!) {\n\t\tscanlationGroup {\n\t\t\tlist(params: $params) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tname\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tmembers {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tquery scanlationUploadsFeed(\n\t\t$group: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tgroups: [$group]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery scanlationUploadsFeed(\n\t\t$group: UUID!\n\t\t$translatedLanguages: [Language!]! = []\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$order: ChapterSortOrder! = { publishAt: DESCENDING }\n\t\t$mangaListParams: MangaListParams = {}\n\t) {\n\t\tchapter {\n\t\t\tlistWithGroupByManga(\n\t\t\t\tchapterListParams: {\n\t\t\t\t\toffset: $offset\n\t\t\t\t\tlimit: $limit\n\t\t\t\t\ttranslatedLanguages: $translatedLanguages\n\t\t\t\t\tgroups: [$group]\n\t\t\t\t\torder: $order\n\t\t\t\t}\n\t\t\t\tmangaListParams: $mangaListParams\n\t\t\t) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\t\tlastVolume\n\t\t\t\t\t\t\tlastChapter\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tchapters {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\ttitle\n\t\t\t\t\t\t\tchapter\n\t\t\t\t\t\t\tvolume\n\t\t\t\t\t\t\ttranslatedLanguage\n\t\t\t\t\t\t\texternalUrl\n\t\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t\t\treadableAt\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tscanlationGroups {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\tuser {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\t\troles\n\t\t\t\t\t\t\t\t\tusername\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tquery getMangaHihi($id: UUID!) {\n\t\tmanga {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\taltTitles\n\t\t\t\t\tstate\n\t\t\t\t\tstatus\n\t\t\t\t\tdescription\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\tyear\n\t\t\t\t\tcontentRating\n\t\t\t\t\tpublicationDemographic\n\t\t\t\t\tlastVolume\n\t\t\t\t\tlastChapter\n\t\t\t\t\tlatestUploadedChapter\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\toriginalLanguage\n\t\t\t\t\tlinks {\n\t\t\t\t\t\thasNoLinks\n\t\t\t\t\t\tamazon\n\t\t\t\t\t\tanilist\n\t\t\t\t\t\tanimePlanet\n\t\t\t\t\t\tbookWalker\n\t\t\t\t\t\tcdJapan\n\t\t\t\t\t\tebookJapan\n\t\t\t\t\t\tenglishTranslation\n\t\t\t\t\t\tkitsu\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tmyAnimeList\n\t\t\t\t\t\tnovelUpdates\n\t\t\t\t\t\traw\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgroup\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tartists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcoverArt {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\tlocale\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\trelated\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery getMangaHihi($id: UUID!) {\n\t\tmanga {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\ttitle\n\t\t\t\t\taltTitles\n\t\t\t\t\tstate\n\t\t\t\t\tstatus\n\t\t\t\t\tdescription\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\tyear\n\t\t\t\t\tcontentRating\n\t\t\t\t\tpublicationDemographic\n\t\t\t\t\tlastVolume\n\t\t\t\t\tlastChapter\n\t\t\t\t\tlatestUploadedChapter\n\t\t\t\t\tavailableTranslatedLanguages\n\t\t\t\t\toriginalLanguage\n\t\t\t\t\tlinks {\n\t\t\t\t\t\thasNoLinks\n\t\t\t\t\t\tamazon\n\t\t\t\t\t\tanilist\n\t\t\t\t\t\tanimePlanet\n\t\t\t\t\t\tbookWalker\n\t\t\t\t\t\tcdJapan\n\t\t\t\t\t\tebookJapan\n\t\t\t\t\t\tenglishTranslation\n\t\t\t\t\t\tkitsu\n\t\t\t\t\t\tmangaUpdates\n\t\t\t\t\t\tmyAnimeList\n\t\t\t\t\t\tnovelUpdates\n\t\t\t\t\t\traw\n\t\t\t\t\t}\n\t\t\t\t\ttags {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\tgroup\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tauthorArtists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tauthors {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tartists {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcoverArt {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\tlocale\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tmanga {\n\t\t\t\t\t\tid\n\t\t\t\t\t\trelated\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tquery randomTitle($options: MangaRandomParams) {\n\t\tmanga {\n\t\t\trandom(params: $options) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery randomTitle($options: MangaRandomParams) {\n\t\tmanga {\n\t\t\trandom(params: $options) {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery defaultMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlist(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery defaultMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlist(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
	source: "\n\tquery offlineMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlistOffline(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery offlineMangaSearchQuery($params: MangaListParams!, $excludeContentProfile: Boolean) {\n\t\tmanga {\n\t\t\tlistOffline(params: $params, excludeContentProfile: $excludeContentProfile) {\n\t\t\t\tlimit\n\t\t\t\toffset\n\t\t\t\ttotal\n\t\t\t\tdata {\n\t\t\t\t\tid\n\t\t\t\t\tattributes {\n\t\t\t\t\t\tdescription\n\t\t\t\t\t\tyear\n\t\t\t\t\t\ttitle\n\t\t\t\t\t\tstatus\n\t\t\t\t\t\tstate\n\t\t\t\t\t\toriginalLanguage\n\t\t\t\t\t\ttags {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t\tcontentRating\n\t\t\t\t\t}\n\t\t\t\t\trelationships {\n\t\t\t\t\t\tcoverArt {\n\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\tfileName\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
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
	source: "\n\tquery userPageQuery($id: UUID!) {\n\t\tuser {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tgroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { uploaders: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"
): (typeof documents)["\n\tquery userPageQuery($id: UUID!) {\n\t\tuser {\n\t\t\tget(id: $id) {\n\t\t\t\tid\n\t\t\t\tattributes {\n\t\t\t\t\tusername\n\t\t\t\t\troles\n\t\t\t\t}\n\t\t\t\trelationships {\n\t\t\t\t\tgroups {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tattributes {\n\t\t\t\t\t\t\tname\n\t\t\t\t\t\t}\n\t\t\t\t\t\trelationships {\n\t\t\t\t\t\t\tleader {\n\t\t\t\t\t\t\t\tid\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tchapter {\n\t\t\tlist(params: { uploaders: [$id] }) {\n\t\t\t\ttotal\n\t\t\t}\n\t\t}\n\t}\n"];
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

export function graphql(source: string) {
	return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
	TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
