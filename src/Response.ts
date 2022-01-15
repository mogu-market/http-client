import {IncomingHttpHeaders} from "http";

/**
 * @class Response
 * @classdesc Client response object.
 */
export default class Response {
    readonly status: number;
    readonly body: Uint8Array;
    readonly headers: IncomingHttpHeaders;

    /**
     * @constructor
     * @param {number} status
     * @param {Uint8Array} body
     * @param {IncomingHttpHeaders} headers
     */
    constructor(status: number, body: Uint8Array, headers: IncomingHttpHeaders) {
        this.status = status;
        this.body = body;
        this.headers = headers;
    }

    /**
     * @name text
     * @desc Returns body as text.
     * @returns string
     * @public
     */
    public text(): string {
        const dec = new TextDecoder();
        return dec.decode(this.body);
    }

    /**
     * @name json
     * @desc Returns body as json object.
     * @returns any
     * @public
     */
    public json(): any {
        return JSON.parse(this.text());
    }
}


