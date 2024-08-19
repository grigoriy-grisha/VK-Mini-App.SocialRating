export interface ResponseHTTP {
    status: number;
}

class Http {
    baseUrl = "http://localhost:3000/api/v1";

    async post<T, R>(path: string, body?: T): Promise<R & ResponseHTTP> {
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
    async get<T, R>(path: string): Promise<R & ResponseHTTP> {
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
