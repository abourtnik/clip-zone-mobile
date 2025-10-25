import {jsonFetch} from '@/functions/api'
import * as Device from "expo-device";
import {
    Account,
    CommentsSort,
    PlaylistType,
    UserType,
    UserVideosSort,
    VideoType,
    TinyVideoType,
    Paginator,
    CommentType,
    Search,
    TinyPlaylistType,
    TinyUserType,
    ReportReason,
    ResponsesPaginator,
    CursorPaginator,
    MyVideoType
} from "@/types";

const API_URL =  process.env.EXPO_PUBLIC_API_ENDPOINT + '/api';
const API_URL_FILE = process.env.EXPO_PUBLIC_API_ENDPOINT

export async function login(username: string, password: string): Promise<Account> {
    return jsonFetch(API_URL + '/login', 'POST', {
        'username': username,
        'password': password,
        'device_name': Device.deviceName
    })
}

export async function logout(): Promise<void> {
    return jsonFetch(API_URL + '/me/logout', 'POST');
}

export async function getVideos(cursor: string | null): Promise<CursorPaginator<TinyVideoType>> {
    return jsonFetch(API_URL + `/videos` + (cursor ? `?cursor=` + cursor  : ''));
}

export async function getVideo(uuid: string): Promise<VideoType> {
    return jsonFetch(API_URL + `/videos/${uuid}`);
}

export async function getUser(id: number): Promise<UserType> {
    return jsonFetch(API_URL + `/users/${id}`);
}

export async function getUserVideos(userId: number, cursor: string | null, sort?: UserVideosSort): Promise<CursorPaginator<TinyVideoType>> {
    return jsonFetch(API_URL + `/users/${userId}/videos?sort=${sort}` + (cursor ? `&cursor=` + cursor  : ''));
}

export async function getUserPlaylists(userId: number, cursor: string | null): Promise<CursorPaginator<TinyPlaylistType>> {
    return jsonFetch(API_URL + `/users/${userId}/playlists` + (cursor ? `?cursor=` + cursor  : ''));
}

export function getVideoFile(file: string): string {
    return API_URL_FILE + `/video/file/${file}`;
}

export async function search(query: string): Promise<Search> {
    return jsonFetch(API_URL + '/search?q=' + query);
}

export async function getComments(video_uuid: string, page: number = 1, sort?: CommentsSort): Promise<Paginator<CommentType>> {
    return jsonFetch(API_URL + `/videos/${video_uuid}/comments?sort=${sort}&page=`+ page);
}

export async function getCommentsReplies(video_uuid: string, comment_id: number, page: number = 1): Promise<ResponsesPaginator> {
    return jsonFetch(API_URL + `/videos/${video_uuid}/comments/${comment_id}/replies?page=`+ page);
}

export async function getPlaylist(uuid: string): Promise<PlaylistType> {
    return jsonFetch(API_URL + `/playlists/${uuid}`);
}

export async function getSubscriptionsVideos(cursor: string | null): Promise<CursorPaginator<TinyVideoType>> {
    return jsonFetch(API_URL + `/me/subscriptions-videos` + (cursor ? `?cursor=` + cursor  : ''));
}

export async function getSubscriptionsChannels(cursor: string | null): Promise<CursorPaginator<TinyUserType>> {
    return jsonFetch(API_URL + `/me/subscriptions-channels` + (cursor ? `?cursor=` + cursor  : ''));
}

export async function getMyVideos(cursor: string | null): Promise<CursorPaginator<MyVideoType>> {
    return jsonFetch(API_URL + `/me/videos`+ (cursor ? `?cursor=` + cursor  : ''));
}

export async function getMyPlaylists(cursor: string | null): Promise<CursorPaginator<TinyPlaylistType>> {
    return jsonFetch(API_URL + `/me/playlists`+ (cursor ? `?cursor=` + cursor  : ''));
}

export async function subscribe(user_id: number): Promise<void> {
    return jsonFetch(API_URL + `/subscribe/${user_id}`, 'POST');
}

export async function interact(type: 'like' | 'dislike', id: number): Promise<void> {
    return jsonFetch(API_URL + `/${type}`, 'POST', {
        'model': 'App\\Models\\Video',
        'id': id
    });
}
export async function report(id: number, reason: ReportReason): Promise<void> {
    return jsonFetch(API_URL + `/report`, 'POST', {
        'reason': reason,
        'comment': null,
        'type': 'App\\Models\\Video',
        'id': id
    });
}

export async function deleteVideo(uuid: string): Promise<void> {
    return jsonFetch(API_URL + `/videos/${uuid}`, 'DELETE');
}

export async function deletePlaylist(uuid: string): Promise<void> {
    return jsonFetch(API_URL + `/playlists/${uuid}`, 'DELETE');
}
export async function viewVideo(uuid: string): Promise<VideoType> {
    return jsonFetch(API_URL + `/videos/${uuid}/view`, 'POST');
}