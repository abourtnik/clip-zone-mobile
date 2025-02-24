import {getToken} from "@/functions/tokenService";

export async function jsonFetch(
    url: string,
    method: string = 'GET',
    json?: Object
) {

    const body = json ? JSON.stringify(json) : undefined;

    const token = await getToken();

    let headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, {
        method,
        body,
        headers: headers,
    });

    if (response.status === 204) {
        return null
    }

    const data = await response.json();

    if (response.ok) {
        return data;
    }

    throw new Error(data?.message ?? 'Oups! Something went wrong!', {cause: response.status})
}