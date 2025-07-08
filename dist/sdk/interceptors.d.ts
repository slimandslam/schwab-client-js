import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
/**
 * - Axios interceptor called prior initiating request
 * - Appends `Authentication` header to request using generated authentication token
 * @param config - see {@link InternalAxiosRequestConfig}
 * @returns Promise resolving {@link InternalAxiosRequestConfig}
 */
export declare const onRequest: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>;
/**
 * Intercepts requests that have errors prior to making request
 * @param error - the thrown error, see {@link Error}
 * @returns Promise that rejects the thrown {@link Error}
 */
export declare const onRequestError: (error: Error) => Promise<Error>;
/**
 * Interceptor called after a call has returned a successful response
 * @param response - the success response, see {@link AxiosResponse}
 * @returns Promise that resolves {@link AxiosResponse}
 */
export declare const onResponse: (response: AxiosResponse) => Promise<AxiosResponse>;
/**
 * Interceptor called after a call has failed
 * @param error - the returned error, see {@link AxiosError}
 * @returns Promise that rejects {@link AxiosError}
 */
export declare const onResponseError: (error: AxiosError) => Promise<AxiosError>;
//# sourceMappingURL=interceptors.d.ts.map