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
