import {IncomingMessage, OutgoingHttpHeaders, request} from "http";
import Request from "./Request";
import Response from "./Response";

export default class Client {
    readonly host: string;
    readonly port: number;
    readonly headers: OutgoingHttpHeaders;

    constructor(host: string, port: number, headers: OutgoingHttpHeaders = {}) {
        this.host = host;
        this.port = port;
        this.headers = Object.assign({
            "content-type": "application/json",
        }, headers);
    }

    public async do(req: Request): Promise<Response> {
        return new Promise((resolve, reject) => {
            const rq = request({
                hostname: this.host,
                port: this.port,
                path: req.path,
                method: req.method,
                headers: Object.assign({}, this.headers, req.headers),
            }, (res: IncomingMessage) => {
                const len = parseInt(res.headers["content-length"], 10) || 4096;
                const data = new Uint8Array(len);
                res.on("data", (chunk) => {
                    data.set(chunk as Uint8Array);
                });
                res.on("end", () => {
                    const rs = new Response(res.statusCode, data, res.headers);
                    resolve(rs);
                });
                res.on("error", reject);
            });
            rq.on("error", reject);
            if (req.body !== null) {
                rq.write(req.body);
            }
            rq.end();
        });
    }

    public async get(path: string): Promise<Response> {
        return this.do(new Request("GET", path));
    }

    public async post(path: string, body: Uint8Array): Promise<Response> {
        return this.do(new Request("POST", path, body));
    }

    public async postJson(path: string, data: any): Promise<Response> {
        const enc = new TextEncoder();
        const json = JSON.stringify(data);
        const body = enc.encode(json);
        return this.post(path, body);
    }

    public async put(path: string, body: Uint8Array): Promise<Response> {
        return this.do(new Request("PUT", path, body));
    }

    public async putJson(path: string, data: any): Promise<Response> {
        const enc = new TextEncoder();
        const json = JSON.stringify(data);
        const body = enc.encode(json);
        return this.post(path, body);
    }

    public async delete(path: string, body: Uint8Array): Promise<Response> {
        return this.do(new Request("DELETE", path, body));
    }

    public async deleteJson(path: string, data: any): Promise<Response> {
        const enc = new TextEncoder();
        const json = JSON.stringify(data);
        const body = enc.encode(json);
        return this.post(path, body);
    }
}