import { Feed } from './feed';
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const frontmatter = require('front-matter');
const { parse } = require('date-fns');
const mp3Duration = require('mp3-duration');
import {
  EpisodeFrontMatter,
  Author,
  FeedOptions,
  ITunesChannelFields
} from './types';

//markdownIt is a markdown parser that takes my raw md files and
//translates them into HTML that we can use in the feed
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
});

// synchronously grab contents - a separate process because buildFeed needs to be async
export const grabContents = (filepaths: string[], myURL: string) => {
  return filepaths.map(filepath => {
    let { attributes, body } = frontmatter(
      fs.readFileSync(filepath, 'utf-8')
    ) as {
      attributes: EpisodeFrontMatter;
      body: string;
    };
    (attributes.slug = filepath.split('.')[0]), // todo: slugify
      // handle local links
      (body = md.render(body));
    body = body.replace(/src="\//g, `src="${myURL}/`);
    const mp3path = path.join(
      process.cwd(),
      'public',
      attributes.mp3URL
    ) as string;
    return {
      frontmatter: attributes,
      body,
      mp3path,
      filepath
    };
  });
};

// build feed is our main function to build a `Feed` object which we
// can then serialize into various formats
// USER: Customize to your own details
export const buildFeed = async (
  contents: ReturnType<typeof grabContents>,
  myURL: string,
  author: Author,
  feedOptions: FeedOptions,
  iTunesChannelFields: ITunesChannelFields
) => {
  let feed = new Feed(feedOptions, iTunesChannelFields);
  feed.addContributor(author);

  await Promise.all(
    contents.map(async ({ frontmatter: fm, body, mp3path, filepath }) => {
      feed.addItem({
        title: fm.title,
        id: safeJoin(myURL, filepath),
        link: safeJoin(myURL, fm.mp3URL),
        date: parse(fm.date),
        content: body,
        author: [author],
        description: body,
        itunes: {
          // image: // up to you to configure but per-episode image is possible
          duration: await mp3Duration(
            mp3path,
            (err: any) => err && console.error(err.message)
          ),
          // explicit: false, // optional
          // keywords: string[] // per-episode keywords possible
          subtitle: fm.description,
          episodeType: fm.episodeType || 'full',
          episode: fm.episode,
          season: fm.season,
          contentEncoded: body,
          mp3URL: safeJoin(myURL, fm.mp3URL),
          enclosureLength: fs.statSync(mp3path).size // size in bytes
        }
      });
      return {
        frontmatter: fm,
        body
      };
    })
  );

  return feed;
};

function safeJoin(a: string, b: string) {
  /** strip starting/leading slashes and only use our own */
  let a1 = a.slice(-1) === '/' ? a.slice(0, a.length - 1) : a;
  let b1 = b.slice(0) === '/' ? b.slice(1) : b;
  return `${a1}/${b1}`;
}
