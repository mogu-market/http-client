import {OutgoingHttpHeaders} from "http";

/**
 * @class Request
 * @classdesc Client request object.
 */
export default class Request {
    readonly method: string;
    readonly path: string;
    readonly body: Uint8Array;
    readonly headers: OutgoingHttpHeaders;

    /**
     * @constructor
     * @param {string} method
     * @param {string} path
     * @param {Uint8Array} body
     * @param {OutgoingHttpHeaders} headers
     */
    constructor(method: string, path: string, body: Uint8Array = null, headers: OutgoingHttpHeaders = {}) {
        this.method = method;
        this.path = path;
        this.body = body;
        this.headers = headers;
    }
}