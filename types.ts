export type Account = {
    id: number,
    username: string,
    email: string,
    token: string,
    avatar_url: string,
    created_at: string,
}

export type VideoType = {
    id: number,
    uuid: string,
    file: string,
    allow_comments: boolean,
    show_likes: boolean,
    likes?: number
    dislikes?: number
    default_comments_sort: CommentsSort,
    title: string,
    short_title : string
    short_description : string
    thumbnail: string,
    duration: number,
    formated_duration: string
    views: number,
    route: string
    user: TinyUserType,
    comments: number
    publication_date: Date
    first_comment?: {
        content: string,
        user_avatar: string
    },
    suggested: TinyVideoType[]
}

export type TinyVideoType = {
    id: number,
    uuid: string,
    title: string,
    short_title : string,
    thumbnail: string,
    formated_duration: string,
    views: number,
    route: string,
    publication_date: string,
    user: TinyUserType
    is_private?: boolean
}

export type SearchVideoType = {
    title: string,
    user: string
    views: string,
    formated_duration: string,
    publication_date: number,
    thumbnail: string,
    url: string,
    uuid: string,
    _formatted: {
        title: string,
        user: string,
        views: string,
        publication_date: string,
        thumbnail: string,
        url: string,
        uuid: string
    }
}

export type UserType = {
    id: number,
    username : string,
    slug: string,
    avatar: string,
    banner: string,
    show_subscribers: boolean
    subscribers?: number
    videos_count: number
    short_description: string
    description: string | null
    website: string | null
    country_code: string | null
    country?: string | null
    views: number
    created_at: Date,
    pinned_video: TinyVideoType,
    videos: TinyVideoType[],
    playlists: {
        id: number,
        title: string,
        videos: TinyVideoType[],
    }
}

export type TinyUserType = {
    id: number,
    username : string,
    slug: string,
    avatar: string,
    show_subscribers: boolean
    subscribers?: number
    videos_count: number
    created_at: Date,
}


export type PlaylistType = {
    id: number,
    uuid: string,
    title: string,
    thumbnail?: string,
    description: string,
    icon: string,
    videos_count?: number
    user: TinyUserType,
    videos: TinyVideoType[]
}

export type TinyPlaylistType = {
    id: number,
    uuid: string,
    title: string,
    thumbnail?: string,
    icon: string,
    status: string,
    has_video?: boolean,
    videos_count?: number
}

export type CommentType = {
    id: number,
    content: string,
    is_long: boolean,
    created_at: string
    user: UserType,
    is_updated: boolean,
    likes_count: number,
    dislikes_count: number,
    is_pinned: boolean
    is_author_reply: boolean,
    author: {
        username: string,
        avatar: string
    }
    replies?: CommentType[]
}

export type UserVideosSort = 'latest' | 'popular' | 'oldest'

export type CommentsSort = 'top' | 'newest'

export type Paginator<T> = {
    data: T[],
    links: {
        next: string
    },
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        per_page: number,
        to: number,
        total: number
    }
}
export type Search = {
    total: number,
    items: SearchVideoType[]
}