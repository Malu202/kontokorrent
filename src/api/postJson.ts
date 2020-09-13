export async function postJson(url: string, body: any, token?: string) {
    let init: RequestInit = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    if (token) {
        init.headers = { ...init.headers, "Authorization": `Bearer ${token}` };
    }
    return await fetch(url, init);
}