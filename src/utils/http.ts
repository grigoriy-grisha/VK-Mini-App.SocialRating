export interface ResponseHTTP<R> {
    data: R;

    result: boolean;
    status: number;
    error: null | string;
    path: string;
    timestamp: Date;
}

class Http {
    baseUrl = "https://sr-server.b-44.team/api/v1";

    async post<T, R>(path: string, body?: T): Promise<ResponseHTTP<R>> {
        const response = await fetch(this.baseUrl + path, {
            method : "POST",
            body   : body ? JSON.stringify(body) : "",
            headers: {
                Authorization : location.href,
                "Content-Type": "application/json;charset=utf-8",
            },
        });

        return response.json();
    }

    //todo добавить params
    async get<T, R>(path: string): Promise<ResponseHTTP<R>> {
        const response = await fetch(this.baseUrl + path, {
            method : "GET",
            headers: {
                Authorization : location.href,
                "Content-Type": "application/json;charset=utf-8",
            },
        });

        return response.json();
    }
}

export const http = new Http();
