import type {OutgoingHttpHeaders} from "http";
import Client from "./src/Client";

/**
 * @name createClient
 * @desc Creates a new http client
 * @param {string} host
 * @param {number} port
 * @param {OutgoingHttpHeaders} headers
 * @returns Client
 */
export default function createClient(host: string, port: number, headers: OutgoingHttpHeaders = {}): Client {
    return new Client(host, port, headers);
}



