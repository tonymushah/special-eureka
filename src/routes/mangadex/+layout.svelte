<script lang="ts">
	import { navigating } from "$app/stores";
	import Sidebar from "$lib/mangadex/componnents/sidebar/Sidebar.svelte";
	import isDefaultDecoration from "$lib/window-decoration/stores/isDefaultDecoration";
	import "@fontsource-variable/josefin-sans/index.css";
	import "@fontsource/poppins/latin.css";
	import MangaDexContextDataProvider from "@mangadex/componnents/MangaDexContextDataProvider.svelte";
	import { isSidebarRtl } from "@mangadex/componnents/sidebar/states/isRtl";
	import MangaDexDefaultThemeProvider from "@mangadex/componnents/theme/MangaDexDefaultThemeProvider.svelte";
	import SetTitle from "@mangadex/componnents/theme/SetTitle.svelte";
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
	import { client } from "@mangadex/gql/urql";
	import { sub_end } from "@mangadex/utils";
	import { getContextClient, setContextClient, subscriptionStore } from "@urql/svelte";
	import { onDestroy, onMount } from "svelte";
	import { v4 } from "uuid";

	setContextClient(client);
	const sub_id = v4();
	const rtl = subscriptionStore({
		client: getContextClient(),
		query: sideDirGQLDoc,
		variables: {
			sub_id
		}
	});
	onMount(() =>
		rtl.subscribe(($rtl) => isSidebarRtl.set($rtl.data?.watchSidebarDirection == Direction.Rtl))
	);

	onDestroy(() => {
		sub_end(sub_id);
	});
	$: loading = $navigating != null;
	$: isRTL = $rtl.data?.watchSidebarDirection == Direction.Rtl;
</script>

<div class="d-content">
	<style>
		html::-webkit-scrollbar {
			display: none;
		}
	</style>
	<MangaDexContextDataProvider>
		<MangaDexDefaultThemeProvider>
			<SetTitle />
			<div class="provider" class:isRTL>
				<div class="sidebar">
					<Sidebar />
				</div>
				<div
					class="inner"
					class:loading
					class:defaultDecoration={$isDefaultDecoration}
					role="button"
					tabindex="0"
					on:keydown={(e) => {
						if (loading) {
							e.stopPropagation();
							e.preventDefault();
						}
					}}
					on:click={(e) => {
						if (loading) {
							e.stopPropagation();
							e.preventDefault();
						}
					}}
				>
					<slot />
				</div>
			</div>
		</MangaDexDefaultThemeProvider>
	</MangaDexContextDataProvider>
</div>

<style lang="scss">
	.provider {
		display: flex;
		color: var(--text-color);
		width: 100%;
		height: 100%;
		.sidebar {
			width: fit-content;
		}
		.inner {
			height: -webkit-fill-available;
		}
	}
	.provider.isRTL {
		flex-direction: row-reverse;
	}
	.provider::-webkit-scrollbar {
		display: none;
	}
	.inner {
		scroll-behavior: smooth;
		overflow-y: scroll;
		width: 100%;
		transition:
			filter,
			webkit-filter 300ms ease-in-out;
		*::-webkit-scrollbar {
			width: 12px;
		}
		*::-webkit-scrollbar-thumb {
			border-radius: 0.25em;
			background-color: var(--scrollbar-color);
			transition: background-color 300ms ease-in-out;
		}
		*::-webkit-scrollbar-thumb:hover {
			background-color: var(--scrollbar-color-hover);
		}

		*::-webkit-scrollbar-track {
			background-color: var(--accent);
		}
	}
	.d-content {
		display: contents;
	}
	.inner.defaultDecoration {
		height: 100cqh;
	}
	.inner::-webkit-scrollbar {
		width: 12px;
	}
	.inner::-webkit-scrollbar-thumb {
		border-radius: 0.25em;
		background-color: var(--scrollbar-color);
		transition: background-color 300ms ease-in-out;
	}
	.inner::-webkit-scrollbar-thumb:hover {
		background-color: var(--scrollbar-color-hover);
	}

	.inner::-webkit-scrollbar-track {
		background-color: var(--accent);
	}
	.inner.loading {
		cursor: wait;
		animation-name: loading;
		animation-direction: normal;
		animation-fill-mode: both;
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
		pointer-events: none;
	}
	.inner.loading * {
		pointer-events: none;
	}
	@keyframes loading {
		from {
			filter: blur(0px);
			-webkit-filter: blur(0px);
		}
		to {
			filter: blur(10px);
			-webkit-filter: blur(10px);
		}
	}
</style>
