# Podcats

Make Podcast feeds with Typescript. 😺

![image](https://user-images.githubusercontent.com/6764957/51956942-ac830600-23ed-11e9-8576-20afa4e7ea7b.png)

See this in use at: https://github.com/sw-yx/react-static-podcast-hosting

## install

```
yarn add -D podcats
```

## important assumptions

this library assumes that you have a unique markdown file pointed to every podcast episode that supplies all the metadata for the rss feed.

The markdown file has dual purpose - its frontmatter and body content is used for both generating your podcast's static site (which of course you dont have to use if you really dont want to), AND to write your podcast RSS (including show notes!).

<details>
<summary><b>Expected Markdown + mp3 format</b>
</summary>

Markdown content is in `/content/week0.md`

```
---
title: YOUR TITLE HERE
episode: 0
date: 2019-01-06
mp3URL: episodes/week0.mp3
description: the first episode
---

YOUR SHOW NOTES/BLOGPOST HERE
```

and the mp3 should be in a folder that would correspond to the `mp3URL` path, e.g. `/public/episodes/week0.mp3`

Again, see https://github.com/sw-yx/react-static-podcast-hosting for live deployed example.

</details>

## Public APIs

**grabContents**

pass it an array of paths to your markdown files (see the assumptions above). No path resolution is done for you so be sure to do your own as demonstrated in the example.

```ts
import { grabContents } from 'podcats';

const myURL = 'https://yourpodcastsitehere.netlify.com';
const contentFolder = 'content'; // my markdown content is hosted at './content'
const filenames = fs.readdirSync(contentFolder).reverse();
const filepaths: string[] = filenames.map(file =>
  path.join(process.cwd(), contentFolder, file)
);
const contents = grabContents(filepaths, myURL);
```

**buildFeed**

> ⚠️ For now it requires the result of `contents` from `grabContents()` above

pass in a whole lot of configs (examples below), and get back a promise which returns a `Feed` object. call its `rss2()` method to output a string to write to a file (or respond in your Express server if you still do that sort of thing)

```ts
import { buildFeed, Author, FeedOptions, ITunesChannelFields } from 'podcats';

const myURL = 'https://yourpodcastsitehere.netlify.com';
const author: Author = {
  name: 'REACTSTATICPODCAST_AUTHOR_NAME',
  email: 'REACTSTATICPODCAST_AUTHOR_EMAIL@foo.com',
  link: 'https://REACTSTATICPODCAST_AUTHOR_LINK.com'
};
const feedOptions: FeedOptions = {
  // blog feed options
  title: 'React Static Podcast',
  description:
    'a podcast feed and blog generator in React and hosted on Netlify',
  link: myURL,
  id: myURL,
  copyright: 'copyright REACTSTATICPODCAST_YOURNAMEHERE',
  feedLinks: {
    atom: safeJoin(myURL, 'atom.xml'),
    json: safeJoin(myURL, 'feed.json'),
    rss: safeJoin(myURL, 'rss')
  },
  author
};
const iTunesChannelFields: ITunesChannelFields = {
  // itunes options
  summary: 'REACTSTATICPODCAST_SUMMARY_HERE',
  author: author.name,
  keywords: ['Technology'],
  categories: [
    { cat: 'Technology' },
    { cat: 'Technology', child: 'Tech News' }
  ],
  image: 'https://placekitten.com/g/1400/1400', // TODO: itunes cover art. you should customise this!
  explicit: false,
  owner: author,
  type: 'episodic'
};

// usage example inside async function
async () => {
  let feed = await buildFeed(
    contents,
    myURL,
    author,
    feedOptions,
    iTunesChannelFields
  );
  writeToFile('/public/rss/index.xml', feed.rss2());
};
```

## Exported Types

Many types have comments annotations so that they should pop up inline in your IDE. However they aren't complete and can always be better. happy to take PR's...

```ts
export type Episode = {
  frontmatter: EpisodeFrontMatter;
  body: string;
};
export type EpisodeFrontMatter = {
  title: string;
  mp3URL: string;
  date: string;
  description: string;
  episodeType?: 'full' | 'trailer' | 'bonus';
  episode?: number;
  season?: number;
  slug?: string;
};
export type Author = {
  name: string;
  email: string;
  link: string;
};
export type ITunesChannelFields = {
  block?: boolean;
  summary: string;
  author: string;
  keywords: string[];
  categories: ITunesCategory[];
  image: string;
  explicit: boolean;
  owner: ITunesOwner;
  subtitle?: string;
  type: 'episodic' | 'serial';
};
```

## TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).
