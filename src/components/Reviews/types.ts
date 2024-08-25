export interface IGPost {
  thumbnail_url: string
  id: string
  caption: string
  media_url: string
  media_type: string
  permalink: string
}

export interface InstagramPostsResponse {
  data: []
  paging: {
    cursors: { before: string; after: string }
    next: string
    previous: string
  }
}
