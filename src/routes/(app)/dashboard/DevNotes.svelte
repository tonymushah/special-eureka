<script lang="ts">
	import { goto } from "$app/navigation";
	import { type Routes } from "$lib/ROUTES";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import openNewWindow from "@special-eureka/core/commands/openNewWindow";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
	import { openUrl } from "@tauri-apps/plugin-opener";
	const a_ulCttMenuEvHandlerProvider = function (href: Routes) {
		return registerContextMenuEvent({
			preventDefault: true,
			stopPropagation: true,
			additionalMenus() {
				return [
					ContextMenuItemProvider.menuItem({
						text: "Open",
						action() {
							goto(href);
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: "Open in a new window",
						action() {
							openNewWindow(currentLocationWithNewPath(href));
						}
					})
				];
			}
		});
	};
</script>

<h2>Developper note</h2>

{#snippet a_li(href: Routes, text: string)}
	<a oncontextmenu={a_ulCttMenuEvHandlerProvider(href)} {href}>{text}</a>
{/snippet}

<section class="content">
	<p>
		Hi, it is <a
			id="tonymushah"
			href="#tonymushah"
			onclick={() => {
				openUrl("https://github.com/tonymushah");
			}}
			onkeypress={(e) => {
				if (e.key == "Enter") {
					openUrl("https://github.com/tonymushah");
				}
			}}
			oncontextmenu={(e) => {
				e.preventDefault();
			}}
		>
			Tony <i>Mushah</i>
		</a>
		<i>again</i>. It was been a long time isn't it? Well, it was been two years already since the
		last release. <i>Kind of...</i>
	</p>
	<p>
		Anyway, after all that time, I am pround (and finally ready to be shitstormed if it failed) to
		present this new 0.2.0 version.<br /> A lot of code rewrite, improvements, features,
		<i>bugs...</i>
	</p>
	<div>
		<h3>Release notes (non-exhaustive)</h3>
		<ul>
			<li>UI rework <i>(lol)</i></li>
			<li>
				Added {@render a_li("/mangadex/settings/themes", "Customable themes")}
			</li>
			<li>
				Added {@render a_li("/mangadex/settings/content-profiles", "Content Profiles")}
			</li>
			<li>
				Added {@render a_li("/mangadex/settings/auth", "Authentification")}
			</li>
			<li>
				Added {@render a_li(
					"/mangadex/settings/offline-data",
					"Allow directory change for offline data"
				)}
			</li>
			<li>
				Added {@render a_li("/mangadex/titles/library", "MD Library")} with {@render a_li(
					"/mangadex/titles/library/export/my-anime-list",
					"MyAnimeList XML support"
				)} and {@render a_li("/mangadex/titles/library/export/csv", "CSV export")}
			</li>
			<li>Added Mutli-select for manga and chapter lists</li>
			<li>
				Added {@render a_li(
					"/mangadex/settings/general-settings",
					"data-saver, force port 443, custom item per page"
				)} support
			</li>
			<li>Support for chapter read markers (for online only)</li>
			<li>Export chapters/title ids list as txt<i>?</i></li>
			<li>
				<b
					onclick={() => {
						openNewWindow();
					}}
				>
					Multi-Window support
				</b>
			</li>
		</ul>
		<p><i>I dunno what features make this version and the 0.1.7 one diffent</i></p>
		<div>
			<h3>Features notes</h3>
			<ol>
				<li>
					You can reload the current window by pressing: <blockquote>
						<span class="key">Alt</span> + <span class="key">R</span>
					</blockquote>
				</li>
				<li>
					You can navigate back by pressing : <blockquote>
						<span class="key">Alt</span> + <span class="key">ArrowLeft (&Leftarrow;)</span>
					</blockquote>
				</li>
				<li>
					You can also navigate forward by pressing: <blockquote>
						<span class="key">Alt</span> + <span class="key">ArrowRight (&Rightarrow;)</span>
					</blockquote>
				</li>
				<li>
					On MangaDex chapter page on single/double page mode, you can zoom by using your <b>
						mousewheel
					</b>, navigate between pages by using
					<blockquote>
						<span class="key">ArrowLeft (&Leftarrow;)</span> and
						<span class="key">ArrowRight (&Rightarrow;)</span>
					</blockquote>
				</li>
			</ol>
		</div>
		<p><i>You can't change those key bindings</i>.</p>
		<p>Anyway, that is it <i>maybe</i>.</p>
	</div>
</section>

<style lang="scss">
	h2 {
		margin: 0px;
		text-align: center;
		text-decoration: underline;
	}
	.content {
		padding: 0em 2em;
		margin: 0;
		position: relative;
		padding-top: 1em;
		display: grid;
		gap: 12px;
		p {
			margin: 0px;
		}
	}
	a {
		color: #ffed4d;
	}
	span.key {
		padding: 1px 16px;
		border: 2px solid #dcdcdc;
		box-shadow: 0px 4px 0px #dcdcdc;
		background-color: #6f3aa9;
		font-family: "Latin Modern Mono", "Times New Roman", Times, serif;
		font-size: 24px;
		border-radius: 4px;
	}
</style>
