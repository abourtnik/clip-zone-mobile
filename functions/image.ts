import {getToken} from "@/functions/tokenService";

type ImageSource = {
    uri?: string,
    headers?: {
        Authorization?: string
    }
}

export async function getSource(url?: string) : Promise<ImageSource> {

    const token = await getToken();

    return {
        uri: url,
        ...(token && {headers:  {'Authorization': 'Bearer ' + token}})
    }
}