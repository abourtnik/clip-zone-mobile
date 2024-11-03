export type Account = {
    id: number,
    username: string,
    email: string,
    token: string,
    avatar_url: string,
    is_premium: boolean,
    created_at: string,
}

export type VideoType = {
    id: number,
    uuid: string,
    file: string,
    allow_comments: boolean,
    show_likes: boolean,
    likes?: number
    liked_by_auth_user?: boolean
    disliked_by_auth_user?: boolean
    reported_by_auth_user?: boolean
    report_at?: Date
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
    publication_date: string | number,
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
    subscribed_by_auth_user?: boolean
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
    playlists: [{
        id: number,
        title: string,
        videos: TinyVideoType[],
    }]
}

export type TinyUserType = {
    id: number,
    username : string,
    slug: string,
    avatar: string,
    show_subscribers: boolean
    subscribers?: number
    subscribed_by_auth_user?: boolean
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
    parsed_content: string,
    short_content: string,
    is_long: boolean,
    user: {
      id: number,
      username: string,
      avatar: string
      route: string,
      is_video_author: boolean
    },
    video_uuid: string,
    created_at: Date
    is_updated: boolean,
    likes_count: number,
    dislikes_count: number,
    liked_by_auth_user?: boolean,
    disliked_by_auth_user?: boolean,
    can_delete?: boolean,
    can_update?: boolean,
    can_report?: boolean,
    can_pin?: boolean,
    is_reply: boolean,
    is_pinned?: boolean,
    has_replies?: boolean,
    is_video_author_reply?: boolean,
    is_video_author_like?: boolean,
    video_author?: {
        username: string,
        avatar: string
    },
    reported_at?: string,
    replies?: {
        data: CommentType[],
        links: {
            next: string | null
        },
        meta: {
            total: number
        }
    },
}

export type UserVideosSort = 'latest' | 'popular' | 'oldest'

export type CommentsSort = 'top' | 'newest'

export type InteractionType = 'Video' | 'Comment'

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

export const REPORT_REASONS : string[] = [
    "Sexual Content",
    "Violent or repulsive content",
    "Hateful or abusive content",
    "Harassment or bullying",
    "Harmful or dangerous acts",
    "Misinformation",
    "Child abuse",
    "Promotes terrorism",
    "Infringes my rights",
    "Captions issue"
];

export type ReportReason = typeof REPORT_REASONS[number];