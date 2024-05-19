import { MultipartValueSingle } from "superagent";
import supertest, { Test, Response, Request, CallbackHandler } from "supertest";
import TestAgent from "supertest/lib/agent";
const apiLogger = require('superagent-logger');
import fs from 'fs';

/**
 * Represents the available HTTP methods for API calls.
 */
export enum ApiMethods {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    TRACE = 'TRACE'
}

export class ApiCall {

    private readonly _endpoint: string;
    private readonly _agent: TestAgent<Test>;
    private readonly req: Test;
    private res: Response | undefined = undefined;

    constructor(endpoint: string, method: ApiMethods) {
        this._endpoint = endpoint;
        this._agent = supertest.agent(this._endpoint);
        this.req = this.getTest(method);
    }

    private getTest(method: ApiMethods) {
        switch (method) {
            case ApiMethods.GET:
                return this._agent.get('');
                break;

            case ApiMethods.POST:
                return this._agent.post('');
                break;

            case ApiMethods.POST:
                return this._agent.patch('');
                break;

            case ApiMethods.PUT:
                return this._agent.put('');
                break;

            case ApiMethods.DELETE:
                return this._agent.delete('');
                break;

            case ApiMethods.HEAD:
                return this._agent.head('');
                break;

            case ApiMethods.OPTIONS:
                return this._agent.options('');
                break;

            case ApiMethods.TRACE:
                return this._agent.trace('');
                break;

            default:
                throw new Error('Invalid HTTP method provided.');
        }
    }

    /**
     * Sets the headers for the API call.
     * @param headers - The headers to be set.
     * @returns The ApiCall instance.
     */
    public setHeaders(headers: Record<string, string>): ApiCall {
        this.req.set(headers);
        return this;
    }

    /**
     * Sets a single header for the API call.
     * @param key - The header key.
     * @param value - The header value.
     * @returns The ApiCall instance.
     */
    public setHeader(key: string, value: string): ApiCall {
        this.req.set(key, value);
        return this;
    }

    /**
     * Unsets a header for the API call.
     * @param key - The header key to be unset.
     * @returns The ApiCall instance.
     */
    public unsetHeader(key: string): ApiCall {
        this.req.unset(key);
        return this;
    }

    /**
     * Sets the content type for the API call.
     * @param value - The content type value.
     * @returns The ApiCall instance.
     */
    public setContentType(
        value:
            | 'form'
            | 'json'
            | 'text'
            | 'png'
            | 'application/json'
            | 'application/x-www-form-urlencoded'
            | 'application/octet-stream'
            | 'text/plain'
            | 'multipart/form-data'
            | string
    ): ApiCall {
        this.req.type(value);
        return this;
    }

    /**
     * Sets a query parameter for the API call.
     * @param key - The query parameter key.
     * @param value - The query parameter value.
     * @returns The ApiCall instance.
     */
    public setQueryParam(key: string, value: string): ApiCall {
        this.req.query({ key, value });
        return this;
    }

    /**
     * Sets multiple query parameters for the API call.
     * @param query - The query parameters as key-value pairs.
     * @returns The ApiCall instance.
     */
    public setQueryParams(query: Record<string, string>): ApiCall {
        this.req.query(query);
        return this;
    }

    /**
     * Sets the query for the API call.
     * @param query - The query string.
     * @returns The ApiCall instance.
     */
    public setQuery(query: string): ApiCall {
        this.req.query(query);
        return this;
    }

    /**
     * Sets the body for the API call.
     * @param body - The body of the API call.
     * @returns The ApiCall instance.
     */
    public setBody(body: string | Record<string, object>): ApiCall {
        this.req.send(body);
        return this;
    }

    /**
     * Sets the form body for the API call.
     * @param body - The form body of the API call.
     * @returns The ApiCall instance.
     */
    public setFormBody(body: FormData): ApiCall {
        this.req.send(body);
        return this;
    }

    /**
     * Attaches a file to the API call.
     * @param fieldName - The field name of the file.
     * @param file - The file to be attached.
     * @param options - Optional options for the attached file.
     * @returns The ApiCall instance.
     */
    public attach(
        fieldName: string,
        file: MultipartValueSingle,
        options?:
            | string
            | {
                filename?: string | undefined;
                contentType?: string | undefined;
            }
    ): ApiCall {
        this.req.attach(fieldName, file, options);
        return this;
    }

    /**
     * Attaches an image file to the API call.
     * @param fieldName - The field name of the image file.
     * @param file - The image file to be attached.
     * @returns The ApiCall instance.
     */
    public attachImage(fieldName: string, file: MultipartValueSingle): ApiCall {
        this.req.attach(fieldName, file);
        return this;
    }

    /**
     * Sets the error handler for the API call.
     * @param handler - The error handler function.
     * @returns The ApiCall instance.
     */
    public setOnceErrorHandler(handler: (err: any) => void): ApiCall {
        this.req.once('error', handler);
        return this;
    }

    /**
     * Sets the error handler for the API call.
     * @param handler - The error handler function.
     * @returns The ApiCall instance.
     */
    public setOnErrorHandler(handler: (err: any) => void): ApiCall {
        this.req.on('error', handler);
        return this;
    }

    /**
     * Sets the response handler for the API call.
     * @param handler - The response handler function.
     * @returns The ApiCall instance.
     */
    public setOnceResponseHandler(handler: (err: any) => void): ApiCall {
        this.req.once('response', handler);
        return this;
    }

    /**
     * Sets the response handler for the API call.
     * @param handler - The response handler function.
     * @returns The ApiCall instance.
     */
    public setOnResponseHandler(handler: (err: any) => void): ApiCall {
        this.req.on('response', handler);
        return this;
    }

    /**
     * Directs the API call to the specified IP address.
     * @param ipAddress - The IP address to direct the API call to.
     * @returns The ApiCall instance.
     */
    public directRequestTo(ipAddress: string): ApiCall {
        this.req.connect(ipAddress);
        return this;
    }

    /**
     * Enables or disables trusting the local host for the API call.
     * @param enable - Whether to enable or disable trusting the local host.
     * @returns The ApiCall instance.
     */
    public trustLocalHost(enable: boolean = true): ApiCall {
        this.req.trustLocalhost(enable);
        return this;
    }

    /**
     * Directs the API call to the specified IP addresses.
     * @param ipAddresses - The IP addresses to direct the API call to.
     * @returns The ApiCall instance.
     */
    public directRequestsTo(ipAddresses: Record<string, string>): ApiCall {
        this.req.connect(ipAddresses);
        return this;
    }

    /**
     * Sets the success condition for the API call.
     * @param callback - The callback function to determine the success condition.
     * @returns The ApiCall instance.
     */
    public setSuccessCondition(callback: (res: Response) => boolean): ApiCall {
        this.req.ok(callback);
        return this;
    }

    /**
     * Sets a multipart field for the API call.
     * @param fieldName - The field name.
     * @param fieldValue - The field value.
     * @returns The ApiCall instance.
     */
    public setMultipartField(fieldName: string,
        fieldValue:
            | (string | number | boolean | Buffer | fs.ReadStream)
            | Array<string | number | boolean | Buffer | fs.ReadStream>): ApiCall {
        this.req.field(fieldName, fieldValue);
        return this;
    }

    /**
     * Sets the body type for the API call.
     * @param type - The type of the API call.
     * @returns The ApiCall instance.
     */
    public setType(type: 'json' | 'form' = 'json'): ApiCall {
        this.req.send(type);
        return this;
    }

    /**
     * Disables TLS certificates for the API call.
     * @returns The ApiCall instance.
     */
    public disableTLSCerts(): ApiCall {
        this.req.disableTLSCerts();
        return this;
    }

    /**
     * Sets the CA certificate for the API call.
     * @param ca - The CA certificate.
     * @returns The ApiCall instance.
     */
    public setCaCertificate(ca: string): ApiCall {
        this.req.ca(ca);
        return this;
    }

    /**
     * Aborts the API call.
     * @returns The ApiCall instance.
     */
    public abort(): ApiCall {
        this.req.abort();
        return this;
    }

    /**
     * Enable API call logging.
     * @param outgoing - log outgoing call
     * @param timestamp - log timestamp
     * @returns The ApiCall instance.
     */
    public enableLogging(outgoing: boolean = true, timestamp: boolean = true): ApiCall {
        this.req.use(apiLogger({ outgoing, timestamp }));
        return this;
    }

    /**
     * Sets the client private key for the API call.
     * @param pvtKey - The client private key.
     * @returns The ApiCall instance.
     */
    public setClientPvtKey(pvtKey: string): ApiCall {
        this.req.key(pvtKey);
        return this;
    }

    /**
     * Sets the client certificate for the API call.
     * @param clientCert - The client certificate.
     * @returns The ApiCall instance.
     */
    public setClientCertificate(clientCert: string): ApiCall {
        this.req.cert(clientCert);
        return this;
    }

    /**
     * Sets the accept type for the API call.
     * @param type - The accept type.
     * @returns The ApiCall instance.
     */
    public setAccept(type: 'json' | 'png' | 'application/json' | 'string' = 'json'): ApiCall {
        this.req.send(type);
        return this;
    }

    /**
     * Sets the bearer authentication token for the API call.
     * @param token - The bearer authentication token.
     * @returns The ApiCall instance.
     */
    public setBearerAuthToken(token: string): ApiCall {
        this.req.set('Authorization', `Bearer ${token}`);
        return this;
    }

    /**
     * Sets the basic authentication token for the API call.
     * @param token - The basic authentication token.
     * @returns The ApiCall instance.
     */
    public setBasicAuthToken(token: string): ApiCall {
        this.req.set('Authorization', `Basic ${token}`);
        return this;
    }

    /**
     * Sets the digest authentication token for the API call.
     * @param token - The digest authentication token.
     * @returns The ApiCall instance.
     */
    public setDigestAuthToken(token: string): ApiCall {
        this.req.set('Authorization', `Digest ${token}`);
        return this;
    }

    /**
     * Sets the bearer authentication for the API call.
     * @param token - The bearer authentication token.
     * @returns The ApiCall instance.
     */
    public setBearerAuth(token: string): ApiCall {
        this.req.auth(token, { type: 'bearer' });
        return this;
    }

    /**
     * Sets the authentication for the API call.
     * @param user - The username for authentication.
     * @param password - The password for authentication.
     * @param option - The authentication option.
     * @returns The ApiCall instance.
     */
    public setAuth(user: string, password: string, option: { type: 'auto' | 'basic' }): ApiCall {
        this.req.auth(user, password, option);
        return this;
    }

    /**
     * Sets the basic authentication for the API call.
     * @param user - The username for basic authentication.
     * @param password - The password for basic authentication.
     * @returns The ApiCall instance.
     */
    public setBasicAuth(user: string, password: string): ApiCall {
        this.req.auth(user, password, { type: 'basic' });
        return this;
    }

    /**
     * Sets the serializer for the API call.
     * @param serializer - The serializer.
     * @returns The ApiCall instance.
     */
    public setSerialize(serializer: (obj: any) => string): ApiCall {
        this.req.serialize(serializer);
        return this;
    }

    /**
     * Sets the parser for the API call.
     * @param parser - The parser.
     * @returns The ApiCall instance.
     */
    public setParser(parser: ((str: string) => any) | ((res: Response, callback: (err: Error | null, body: any) => void) => void)): ApiCall {
        this.req.parse(parser);
        return this;
    }

    /**
     * Sets the retry count and callback for the API call.
     * @param count - The number of retries.
     * @param callback - The callback function to handle retries.
     * @returns The ApiCall instance.
     */
    public setRetry(count: number, callback?: (err: Error, re: Response) => void): ApiCall {
        this.req.retry(count, callback);
        return this;
    }

    /**
     * Sets the redirect count for the API call.
     * @param count - The number of redirects.
     * @returns The ApiCall instance.
     */
    public setRedirect(count: number): ApiCall {
        this.req.redirects(count);
        return this;
    }

    /**
     * Sets the plugin for the API call. Provided method will be executed before API call.
     * @param fn - The plugin function.
     * @returns The ApiCall instance.
     */
    public setPlugin(fn: (req: Request) => void): ApiCall {
        this.req.use(fn);
        return this;
    }

    /**
     * Sets the timeout for the API call.
     * @param ms - The timeout in milliseconds.
     * @returns The ApiCall instance.
     */
    public setTimeout(ms: number | { deadline?: number | undefined; response?: number | undefined }): ApiCall {
        this.req.timeout(ms);
        return this;
    }

    /**
     * Clears the timeout for the API call.
     * @returns The ApiCall instance.
     */
    public clearTimeout(): ApiCall {
        this.req.clearTimeout();
        return this;
    }

    /**
     * Enables or disables HTTP/2 for the API call.
     * @param enable - Whether to enable or disable HTTP/2.
     * @returns The ApiCall instance.
     */
    public enableHttp2(enable: boolean): ApiCall {
        this.req.http2(enable);
        return this;
    }

    /**
     * Enables or disables buffering for the API call.
     * @param enable - Whether to enable or disable buffering.
     * @returns The ApiCall instance.
     */
    public setBuffer(enable: boolean): ApiCall {
        this.req.buffer(enable);
        return this;
    }

    /**
     * Get the request as JSON.
     * @returns A promise that resolves
     */
    public getReqAsJson(enable: boolean): { method: string; url: string; data?: string | object; headers: Array<string | string[]> } {
        return this.req.toJSON();
    }

    // /**
    //  * Sends a GET request to the specified path.
    //  * @param path - The path of the GET request.
    //  * @returns A promise that resolves to the response.
    //  */
    // public async get(path: string): Promise<Response> {
    //     try {
    //         logger.info(`Making /GET API request for ${path}.`);
    //         this.res = await this.req.get(path);
    //         return this.res;
    //     } catch (err) {
    //         logger.error(`Error on making /GET API request for ${path}.`);
    //         throw err;
    //     }
    // }

    // /**
    //  * Sends a POST request to the specified path.
    //  * @param path - The path of the POST request.
    //  * @returns A promise that resolves to the response.
    //  */
    // public async post(path: string): Promise<Response> {
    //     try {
    //         logger.info(`Making /POST API request for ${path}.`);
    //         this.res = await this.req.post(path);
    //         return this.res;
    //     } catch (err) {
    //         logger.error(`Error on making /POST API request for ${path}.`);
    //         throw err;
    //     }
    // }

    // /**
    //  * Sends a PUT request to the specified path.
    //  * @param path - The path of the PUT request.
    //  * @returns A promise that resolves to the response.
    //  */
    // public async put(path: string): Promise<Response> {
    //     try {
    //         logger.info(`Making /PUT API request for ${path}`);
    //         this.res = await this.req.put(path);
    //         return this.res;
    //     } catch (err) {
    //         logger.error(`Error on making /PUT API request for ${path}.`);
    //         throw err;
    //     }
    // }

    // /**
    //  * Sends a PATCH request to the specified path.
    //  * @param path - The path of the PATCH request.
    //  * @returns A promise that resolves to the response.
    //  */
    // public async patch(path: string): Promise<Response> {
    //     try {
    //         logger.info(`Making /PATCH API request for ${path}`);
    //         this.res = await this.req.patch(path);
    //         return this.res;
    //     } catch (err) {
    //         logger.error(`Error on making /PATCH API request for ${path}.`);
    //         throw err;
    //     }
    // }

    // /**
    //  * Sends a DELETE request to the specified path.
    //  * @param path - The path of the DELETE request.
    //  * @returns A promise that resolves to the response.
    //  */
    // public async delete(path: string): Promise<Response> {
    //     try {
    //         logger.info(`Making /DELETE API request for ${path}`);
    //         this.res = await this.req.delete(path);
    //         return this.res;
    //     } catch (err) {
    //         logger.error(`Error on making /DELETE API request for ${path}.`);
    //         throw err;
    //     }
    // }

    // /**
    //  * Sends a HEAD request to the specified path.
    //  * @param path - The path of the HEAD request.
    //  * @returns A promise that resolves to the response.
    //  */
    // public async head(path: string): Promise<Response> {
    //     try {
    //         logger.info(`Making /HEAD API request for ${path}`);
    //         this.res = await this.req.head(path);
    //         return this.res;
    //     } catch (err) {
    //         logger.error(`Error on making /HEAD API request for ${path}.`);
    //         throw err;
    //     }
    // }

    // /**
    //  * Sends a TRACE request to the specified path.
    //  * @param path - The path of the TRACE request.
    //  * @returns A promise that resolves to the response.
    //  */
    // public async trace(path: string): Promise<Response> {
    //     try {
    //         logger.info(`Making /TRACE API request for ${path}`);
    //         this.res = await this.req.trace(path);
    //         return this.res;
    //     } catch (err) {
    //         logger.error(`Error on making /TRACE API request for ${path}.`);
    //         throw err;
    //     }
    // }

    // /**
    //  * Sends an OPTIONS request to the specified path.
    //  * @param path - The path of the OPTIONS request.
    //  * @returns A promise that resolves to the response.
    //  */
    // public async option(path: string): Promise<Response> {
    //     try {
    //         logger.info(`Making /OPTION API request for ${path}`);
    //         this.res = await this.req.options(path);
    //         return this.res;
    //     } catch (err) {
    //         logger.error(`Error on making /OPTION API request for ${path}.`);
    //         throw err;
    //     }
    // }

    // /**
    //  * Sends a CHECKOUT request to the specified path.
    //  * @param path - The path of the CHECKOUT request.
    //  * @returns A promise that resolves to the response.
    //  */
    // public async checkout(path: string): Promise<Response> {
    //     try {
    //         logger.info(`Making /CHECKOUT API request for ${path}`);
    //         this.res = await this.req.checkout(path);
    //         return this.res;
    //     } catch (err) {
    //         logger.error(`Error on making /CHECKOUT API request for ${path}.`);
    //         throw err;
    //     }
    // }

    /**
     * Assert response status to match the given value.
     * @param status - expected response status code.
     * @returns The ApiCall instance.
     */
    public expectStatus(status: number): ApiCall {
        this.req.expect(status);
        return this;
    }


    /**
     * Assert response to match the provided checks.
     * @param checker - callback with all the checks on the response, e.g. res => res.body.should.have.property('name');
     * @returns The ApiCall instance.
     */
    public expectResponse(checker: (res: Response) => any): ApiCall {
        this.req.expect(checker);
        return this;
    }

    /**
     * Assert response body to match the given value.
     * @param status - expected response body.
     * @returns The ApiCall instance.
     */
    public expectBody(body: object): ApiCall {
        this.req.expect(body);
        return this;
    }

    public expectField(fieldName: string, value: string): ApiCall {
        this.req.expect(fieldName, value);
        return this;
    }

    /**
     * Gets the response text of the API call.
     * @returns The response text.
     */
    public getResponseText(): string {
        if (this.res) {
            return this.res.text;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Gets the response body of the API call.
     * @returns The response body.
     */
    public getResponseBody(): any {
        if (this.res) {
            return this.res.body;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Gets the response headers of the API call.
     * @returns All response headers.
     */
    public getResponseHeaders(): { [p: string]: string } {
        if (this.res) {
            return this.res?.headers;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Gets a specific response header of the API call.
     * @param headerName - The name of the header.
     * @returns The value of the response header.
     */
    public getResponseHeader(headerName: string): string | undefined {
        if (this.res) {
            return this.res.get(headerName);
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Gets the content type of the API response.
     * @returns The content type of the API response.
     */
    public getResponseContentType(): string {
        if (this.res) {
            return this.res.type;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Gets the status code of the API response.
     * @returns The status code of the API response.
     */
    public getResponseStatusCode(): number {
        if (this.res) {
            return this.res.statusCode;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Gets the raw response object of the API call.
     * @returns The raw response object.
     */
    public getRawResponse(): Response | undefined {
        return this.res;
    }

    /**
     * Gets the raw request object of the API call.
     * @returns The raw request object.
     */
    public getRawRequest(): Request {
        return this.req;
    }

    /**
     * Checks if the API call received a client error response.
     * @returns True if the API call received a client error response, false otherwise.
     */
    public clientErrorResponse(): boolean {
        if (this.res) {
            return this.res.clientError;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Checks if the API call received a server error response.
     * @returns True if the API call received a server error response, false otherwise.
     */
    public serverErrorResponse(): boolean {
        if (this.res) {
            return this.res.serverError;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Checks if the API call received a successful response.
     * @returns True if the API call received a successful response, false otherwise.
     */
    public okResponse(): boolean {
        if (this.res) {
            return this.res.ok;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Checks if the API call received an unauthorized response.
     * @returns True if the API call received an unauthorized response, false otherwise.
     */
    public unAuthorizedResponse(): boolean {
        if (this.res) {
            return this.res.unauthorized;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Gets the XHR object of the API call.
     * @returns The XHR object.
     */
    public getXHR(): any {
        if (this.res) {
            return this.res.xhr;
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }
    }

    /**
     * Pipe the API response to a file.
     * @param filePath file where response to be written.
     */
    public pipeResponseToFile(filePath: string): void {
        if (this.res) {
            try {
                this.res.pipe(fs.createWriteStream(filePath));
            } catch (err) {
                throw err;
            }
        }
        else {
            throw Error(`Response is undefined. Make sure to call the API call method first.`);
        }

    }

    /**
     * Makes the API call using the provided optional callback handler for request and response.
     * @param callback - The callback handler for request and response.
     * @retrun API Response
     */
    public end(callback?: (err: any, res: Response) => void): void {
        this.req.end(callback);
    }

    /**
     * Completes the API call request.
     * Experimental: May have bug. 
     * @param onrejected 
     * @returns 
     */
    public async done(
        onfulfilled?: ((value: Response) => any) | null,
        onrejected?: ((reason: any) => any) | null
    ): Promise<Response | undefined> {
        try {
            this.res = await this.req.then(onfulfilled, onrejected);
        } catch (err) {
            throw err;
        }
        return this.res
    }
}
