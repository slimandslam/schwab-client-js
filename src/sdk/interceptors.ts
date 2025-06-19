import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

/**
 * - Axios interceptor called prior initiating request
 * - Appends `Authentication` header to request using generated authentication token
 * @param config - see {@link InternalAxiosRequestConfig}
 * @returns Promise resolving {@link InternalAxiosRequestConfig}
 */
export const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    // add logic for applying auth token to headers
    config.headers.set("Authorization", `Bearer TOKEN`);
    config.headers.set("Accept", "application/json");
    
    return config;
};

/**
 * Intercepts requests that have errors prior to making request
 * @param error - the thrown error, see {@link Error}
 * @returns Promise that rejects the thrown {@link Error}
 */
export const onRequestError = (error: Error): Promise<Error> => Promise.reject(error);

/**
 * Interceptor called after a call has returned a successful response
 * @param response - the success response, see {@link AxiosResponse}
 * @returns Promise that resolves {@link AxiosResponse}
 */
export const onResponse = (response: AxiosResponse): Promise<AxiosResponse> => Promise.resolve(response);

/**
 * Interceptor called after a call has failed
 * @param error - the returned error, see {@link AxiosError}
 * @returns Promise that rejects {@link AxiosError}
 */
export const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    throw new Error(
        `Error: ${error.response} - ${error.response?.status} - Details: ${error.stack}`,
    );
};
