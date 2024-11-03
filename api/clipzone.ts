import {jsonFetch} from '@/functions/api'
import * as Device from "expo-device";
import {Account, CommentsSort, PlaylistType, UserType, UserVideosSort, VideoType, TinyVideoType, Paginator, CommentType, Search, TinyPlaylistType, TinyUserType, ReportReason} from "@/types";

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
    return jsonFetch(API_URL + '/logout', 'POST');
}

export async function getVideos(page: number = 1): Promise<Paginator<TinyVideoType>> {
    return jsonFetch(API_URL + `/videos?page=`+ page);
}

export async function getVideo(uuid: string): Promise<VideoType> {
    return jsonFetch(API_URL + `/videos/${uuid}`);
}

export async function getUser(id: number): Promise<UserType> {
    return jsonFetch(API_URL + `/users/${id}`);
}

export async function getUserVideos(userId: number, page: number = 1, sort?: UserVideosSort): Promise<Paginator<TinyVideoType>> {
    return jsonFetch(API_URL + `/users/${userId}/videos?page=${page}&sort=${sort}`);
}

export async function getUserPlaylists(userId: number, page: number = 1, sort?: string): Promise<Paginator<TinyPlaylistType>> {
    return jsonFetch(API_URL + `/users/${userId}/playlists?page=${page}&sort=${sort}`);
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

export async function getReplies(video_uuid: string, comment_id: number, page: number = 1): Promise<Paginator<CommentType>> {
    return jsonFetch(API_URL + `/videos/${video_uuid}/comments/${comment_id}/replies?page=`+ page);
}

export async function getPlaylist(uuid: string): Promise<PlaylistType> {
    return jsonFetch(API_URL + `/playlists/${uuid}`);
}

export async function getSubscriptionsVideos(page: number = 1): Promise<Paginator<TinyVideoType>> {
    return jsonFetch(API_URL + `/users/subscriptions-videos?page=`+ page);
}

export async function getSubscriptionsChannels(page: number = 1): Promise<Paginator<TinyUserType>> {
    return jsonFetch(API_URL + `/users/subscriptions-channels?page=`+ page);
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