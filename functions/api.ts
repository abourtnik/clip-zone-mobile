export async function jsonFetch(
    url: string,
    method: string = 'GET',
    json?: Object
) {

    const body = json ? JSON.stringify(json) : undefined;

    const response = await fetch(url, {
        method,
        body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 204) {
        return null
    }

    const data = await response.json();

    if (response.ok) {
        return data;
    }

    throw new Error(data?.message ?? 'Oups une erreur s\'est produite')
}