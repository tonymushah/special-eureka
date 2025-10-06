# Special Eureka

[![build-test](https://github.com/tonymushah/special-eureka/actions/workflows/build.yaml/badge.svg)](https://github.com/tonymushah/special-eureka/actions/workflows/build.yaml)

A desktop manga reader which support for :

- the [Mangadex](https://mangadex.org) website.

It's build in [Tauri](https://tauri.app) and [Svelte](https://svelte.dev)

## Features

### Mangadex

- Accurate UI (pretty much the same as in Mangadex)
- Chapter Downloading
- Offline Chapter Reading
- Single Page, Double Page, WideStrip, LongStrip Reading Mode
- RTL Support for Chapter Reading
- Zoom for Chapter Reading (Single Page and Double Page Only)
- Custom themes
- Content Profiles
- Authentification
- Export MD library or MDList to CSV or MyAnimeList XML.

## Why I Created this project??

I love reading manga.

There is many website that allows you to read manga for free like [Mangadex](https://mangadex.org), [Manga Plus](https://mangaplus.shueisha.co.jp/updates), [RawKuma](https://rawkuma.com/) for raws.

The problem is that these are website, you need internet connection to access them.
And me, who live in a country where internet connection is SLOW and EXPENSIVE, want to read manga without worrying about internet connection.

There was two solutions :

- be rich (which i can't do due to my complicated situations)
- create or use a tool that allow me to download manga from website

I decided to take the second solution.

There is some great alternatives like : [mangadesk](https://github.com/darylhjd/mangadesk) and [Mangal](https://github.com/metafates/mangal) for Terminal, or [Mihon](https://mihon.app/) for Mobile, etc,... (i recommend visiting [wotaku](https://wotaku.moe/) if you want to know more about those).

But they don't satisfy my own need, like :

- Having a desktop app 😅
- Reading Chapter and Manga on both offline and online
- Having the same user experience as the website
- Zoom for chapter
- Customization
- Exports
- etc,...

So with those goals in mind, i decided to create my own manga reader app for Desktop.

### Why choosing Tauri??

[Tauri](https://tauri.app) is a toolkit for building desktop apps (they will support mobile soon too!), kinda like [Electron](https://www.electronjs.org/) but built in [Rust](https://rust-lang.org).

Now, i wanted to use [Tauri](https://tauri.app) for fun, just to see of how can it go and such.
But even if the Tauri ecosystem is still growing, it has so many great features that make me fall off.

### Why did the v0.1.x latest version from 2023?

I wasn't satisfied with the tech stack...
It was buggy, wonky and didn't statisfy my long term developpement goals.
So I spend the last two years rewriting the entire stack from scratch.
It was difficult but it was worth it.

### Why use Svelte??

The old React stack was buggy and wonky...
It is still kind of it right now, but the Svelte stack allow more control over the code.

### Is there going to be a mobile version of this??

I don't (or never even) plan on releasing a mobile version this app.
I want to focus on the desktop experience first.

## Bug reporting

If you find a bug or something like that, please create an issue.

## Feedbacks

If you want to give some feedback, please put them to :

### [Feedbacks Discussions](https://github.com/tonymushah/special-eureka/discussions/categories/feedbacks)

## Using the source directly

Before we start, make sure you have meet the [Tauri Prerequisites](https://tauri.app/start/prerequisites/) and done the [Tauri Quick Start With Vite](https://tauri.app/start/frontend/vite/).

And, this project also use [pnpm](https://pnpm.io) as a package manager, so make sure you have installed it.

If that's done, then let's get started.

First, clone the repository

```bash
git clone https://github.com/tonymushah/special-eureka.git
```

Second, install the frontend dependencies:

```bash
pnpm install
```

Note : Make sure you have [pnpm](https://pnpm.io) installed

Last, but at least :

```bash
pnpm dev
```

The build might take a long time, like 30 minutes so i recommend doing something else in the meantime.

__Note:__ The CSS might not load proprely in Linux. If this happens, retry the command. If it still persist, edit the css a little bit.

### Building a standlone binary

There might be some edge cases where you want a portable release. _We are working on [it](https://github.com/tonymushah/special-eureka/issues/926)_.

In the meantime, you can build a standlone binary by running:

```bash
pnpm build:no-bundle
```

## License

GPL-3.0 license
