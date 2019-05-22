export * from './Episode'
import { Author } from './Author'
export { Author }

// from https://github.com/jpmonette/feed
export interface Item {
  /**
   * (episode/item level): only the episode title—no episode number, season number, or show title. This can be used with any show and episode type.
   *
   * new 2017 tag: https://theaudacitytopodcast.com/how-to-start-using-the-new-itunes-podcast-tags-for-ios-11-tap316/
   */
  title: string
  id?: string
  /**
   * This tag contains the link to your website and will be displayed next to your Podcast cover art.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#link
   */
  link: string
  date: Date
  description?: string
  content?: string
  guid?: string
  image?: string
  author?: Author[]
  contributor?: Author[]
  published?: Date

  /**
   * This tag contains copyright information about your Podcast.
   * The tag is free text and can include dates, for example: Apple Computer 2005.
   * You do not need to include the copyright symbol in the tag, it will automatically be displayed in iTunes.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#copyright
   */
  copyright?: string
  extensions?: Extension[]
  itunes?: ITunesItem
  [index: string]: any
}

export interface ITunesItem {
  mp3URL: string
  enclosureLength: number
  /**
   * Use this inside an <item> element to prevent that episode from appearing in the iTunes Podcast directory. Use this inside a <channel> element to prevent the entire podcast from appearing in the iTunes Podcast directory.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#block
   */
  block?: boolean
  /**
   * This tag specifies the artwork for the Channel and Item(s). This artwork can be larger than the maximum allowed by RSS. Details on the size recommendations are in the section below.
   * Preferred size:
   *  300 pixels x 300 pixels at 72 dpi
   * Minimum size:
   *  170 pixels x 170 pixels square at 72 dpi
   * Format:
   *  JPG, PNG, uncompressed
   *
   * https://feedforall.com/itune-tutorial-tags.htm#image
   */
  image?: string
  /**
   * This tag is for informational purposes only and will allow users to know the duration prior to download.
   * The tag is formatted: HH:MM:SS
   * This tag is applicable to the Item element only.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#duration
   */
  duration: number
  explicit?: boolean
  /**
   * This tag allows users to search on text keywords.
   * Limited to 255 characters or less, plain text, no HTML, words must be separated by spaces.
   * This tag is applicable to the Item element only.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#keywords
   */
  keywords?: string[]
  subtitle: string
  /**
   * (episode/item level): “full” for normal episodes; “trailer” to promote an upcoming show, season, or episode; or “bonus” for extra content related to a show, season, or episode.
   *
   * new 2017 tag: https://theaudacitytopodcast.com/how-to-start-using-the-new-itunes-podcast-tags-for-ios-11-tap316/
   */
  episodeType: 'full' | 'trailer' | 'bonus'
  /**
   *  (episode/item level): any number to indicate the current episode number, which can be relative to the entire show (like “316”), or relative to the current season (like “5”). This can be used with any show and episode type.
   *
   * new 2017 tag: https://theaudacitytopodcast.com/how-to-start-using-the-new-itunes-podcast-tags-for-ios-11-tap316/
   */
  episode?: number
  /**
   *  (episode/item level): any number to indicate the season in which this episode belongs. This can be used with any show and episode type.
   *
   * new 2017 tag: https://theaudacitytopodcast.com/how-to-start-using-the-new-itunes-podcast-tags-for-ios-11-tap316/
   */

  season?: number
  /**
   *  (episode/item level): this updated (but not new) tag is for your full show notes. It will display below the title and summary.
   *
   * new 2017 tag: https://theaudacitytopodcast.com/how-to-start-using-the-new-itunes-podcast-tags-for-ios-11-tap316/
   *
   */
  contentEncoded?: string
}

export interface FeedOptions {
  id: string
  title: string
  updated?: Date
  generator?: string

  feed?: string
  feedLinks?: any
  hub?: string
  decorateURL?: (url: string) => string

  author: Author

  /**
   * This tag contains the link to your website and will be displayed next to your Podcast cover art.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#link
   */
  link?: string
  description?: string
  image?: string
  favicon?: string
  /**
   * This tag contains copyright information about your Podcast.
   * The tag is free text and can include dates, for example: Apple Computer 2005.
   * You do not need to include the copyright symbol in the tag, it will automatically be displayed in iTunes.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#copyright
   */
  copyright: string
}

export interface Feed {
  options: FeedOptions
  items: Item[]
  categories: string[]
  contributors: Author[]
  extensions: Extension[]
}

export interface Extension {
  name: string
  objects: string
}

export type ITunesCategory = {
  cat: string
  child?: string
}
/**
 * This tag contains the e-mail address that will be used to contact the owner of the Podcast for communication specifically about their Podcast on iTunes.
 * It will not be publicly displayed on iTunes.
 * This tag is applicable to the Channel element only.
 *
 * https://feedforall.com/itune-tutorial-tags.htm#owner
 */
export type ITunesOwner = {
  name: string
  email: string
}
export type ITunesChannelFields = {
  /**
   * Use this inside an <item> element to prevent that episode from appearing in the iTunes Podcast directory. Use this inside a <channel> element to prevent the entire podcast from appearing in the iTunes Podcast directory.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#block
   */
  block?: boolean
  /**
   * At the Channel level, this tag is a long description that will appear next to your Podcast cover art when a user selects your Podcast.
   * At the Item level, this tag is a long description that will be displayed in an expanded window when users click on an episode.
   * Limited to 4000 characters or less, plain text, no HTML
   *
   * 2017 update:  (episode/item level): this updated (but not new) tag is best for a short description of your episode. It will display above the full show notes.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#summary
   */
  summary: string
  /**
   * At the Channel level this tag contains the name of the person or company that is most widely attributed to publishing the Podcast and will be displayed immediately underneath the title of the Podcast.
   * If applicable, at the item level, this tag can contain information about the person(s) featured on a specific episode.
   *
   * https://feedforall.com/itune-tutorial-tags.htm#author
   */
  author: string
  /**
   * This tag allows users to search on text keywords.
   * Limited to 255 characters or less, plain text, no HTML, words must be separated by spaces.
   * This tag is applicable to the Item element only? (check this)
   *
   * https://feedforall.com/itune-tutorial-tags.htm#keywords
   */
  keywords: string[]
  /** https://feedforall.com/itune-tutorial-tags.htm#category */
  categories: ITunesCategory[]
  /**
   * This tag specifies the artwork for the Channel and Item(s). This artwork can be larger than the maximum allowed by RSS. Details on the size recommendations are in the section below.
   * Preferred size:
   *  300 pixels x 300 pixels at 72 dpi
   * Minimum size:
   *  170 pixels x 170 pixels square at 72 dpi
   * Format:
   *  JPG, PNG, uncompressed
   *
   * https://feedforall.com/itune-tutorial-tags.htm#image
   */
  image: string
  /** https://feedforall.com/itune-tutorial-tags.htm#explicit */
  explicit: boolean
  owner: ITunesOwner
  /**
   * At the Channel level, this tag is a short description that provides general information about the Podcast. It will appear next to your Podcast as users browse through listings of Podcasts.
   * At the Item level, this tag is a short description that provides specific information for each episode.
   * Limited to 255 characters or less, plain text, no HTML
   *
   * https://feedforall.com/itune-tutorial-tags.htm#subtitle
   * */
  subtitle?: string
  /**
   * (show/channel level): “episodic” for non-chronological episodes that will behave as they have for years and download the latest episode, or “serial” for chronological episodes that should be consumed oldest to newest.
   *
   * new 2017 tag: https://theaudacitytopodcast.com/how-to-start-using-the-new-itunes-podcast-tags-for-ios-11-tap316/
   */
  type: 'episodic' | 'serial'
}
