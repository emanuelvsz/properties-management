import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import { DTO } from "@core/domain/types/index";
import { BackendClient } from "@infra/api/clients";

type HTTPVerbs = "get" | "post" | "put" | "delete" | "patch";
/**
 * Options for mocking an axios HTTP request while using _interceptRequest_ function.
 *
 * @param method the HTTP method of the request to be mocked
 * @param statusCode the HTTP status code you want to be returned. It's 200 by default
 * @param body the response body you want
 * @param error the error you want to return on the response - if defined, the return will the a Promise with rejection
 */
interface ResponseOptions {
	statusCode?: number;
	data?: DTO | DTO[];
	error?: Error | AxiosError;
}

/**
 * ## How it works?
 *
 * Mocks the next axios client HTTP request based on the type of the HTTP Method (get, post, put, patch or
 * delete) and pathname. Behind of the scenes, it implements jest.spyOn on a provided axios HTTP client.
 *
 * @param {ResponseOptions} options options with attributes that you want to return in the next call
 * @param {AxiosInstance} client axios instance you want to mock
 *
 * ----------------
 * ## Examples
 * @example
 * RequestInterceptor.default.get('/product', { data: { 'name': 'Mary Jane' } });
 * @returns Promise.resolve({ status: 200, data: { 'name': 'Mary Jane' } })
 * ----------------
 * @example
 * RequestInterceptor.default.post('/product', { statusCode: 201});
 * @returns Promise.resolve({ status: 200, data: undefined })
 * ----------------
 * @example
 * RequestInterceptor.default.post('/product', { statusCode: 404, error: new Error('resource not found')});
 * @returns Promise.reject({ response: { status: 404, data: undefined }, error: AxiosError({ message: 'resource not found' })})
 */
class RequestInterceptor {
	DEFAULT_STATUS_CODE = 200;

	constructor(private client: AxiosInstance) {
		this.get = this.get.bind(this);
		this.post = this.post.bind(this);
		this.put = this.put.bind(this);
		this.delete = this.delete.bind(this);
		this.patch = this.patch.bind(this);
	}

	static default = new RequestInterceptor(BackendClient);

	static with = (clientInstance: AxiosInstance) =>
		new RequestInterceptor(clientInstance);

	get(pathname: string, options?: ResponseOptions) {
		return this.interceptRequest("get", pathname, options);
	}

	post(pathname: string, options?: ResponseOptions) {
		return this.interceptRequest("post", pathname, options);
	}

	put(pathname: string, options?: ResponseOptions) {
		return this.interceptRequest("put", pathname, options);
	}

	delete(pathname: string, options?: ResponseOptions) {
		return this.interceptRequest("delete", pathname, options);
	}

	patch(pathname: string, options?: ResponseOptions) {
		return this.interceptRequest("patch", pathname, options);
	}

	interceptRequest(
		method: HTTPVerbs,
		pathname: string,
		options: ResponseOptions = {}
	) {
		const clientSpy: jest.SpyInstance = jest.spyOn(this.client, method);
		clientSpy.mockImplementationOnce((reqPathname: string, reqBody?: DTO) => {
			if (pathname !== reqPathname) {
				return this.client.request({ method, url: reqPathname, data: reqBody });
			}
			const {
				statusCode = this.DEFAULT_STATUS_CODE,
				data = {},
				error
			} = options;
			const response = { status: statusCode, data } as AxiosResponse;
			if (error) {
				return Promise.reject(
					new AxiosError(
						error.message,
						statusCode?.toString(),
						undefined,
						response
					)
				);
			}
			return Promise.resolve(response);
		});
		return this;
	}
}

export { RequestInterceptor };
export type { ResponseOptions };
